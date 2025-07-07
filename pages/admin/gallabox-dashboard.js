import React, { useEffect, useState } from 'react';

// Function to convert place name to coordinates using Google Geocoding API
async function getCoordinatesFromPlace(placeName) {
  try {
    // Use a more robust geocoding service or fallback
    console.log('Getting coordinates for:', placeName);
    
    // Try with Google Maps API first
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (googleApiKey) {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(placeName)}&key=${googleApiKey}`);
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        console.log('Google Maps coordinates:', location);
        return {
          latitude: location.lat,
          longitude: location.lng
        };
      }
    }
    
    // Fallback to OpenStreetMap Nominatim API (free)
    const nominatimResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}&limit=1`);
    const nominatimData = await nominatimResponse.json();
    
    if (nominatimData && nominatimData.length > 0) {
      console.log('Nominatim coordinates:', { lat: nominatimData[0].lat, lon: nominatimData[0].lon });
      return {
        latitude: parseFloat(nominatimData[0].lat),
        longitude: parseFloat(nominatimData[0].lon)
      };
    }
    
    throw new Error('No coordinates found for this place');
  } catch (error) {
    console.error('Geocoding error:', error);
    // Fallback coordinates (Delhi, India)
    console.log('Using fallback coordinates for Delhi');
    return {
      latitude: 28.6139,
      longitude: 77.2090
    };
  }
}

function LeadEditModal({ lead, open, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(lead || {});
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  useEffect(() => { setForm(lead || {}); }, [lead]);
  
  // Handle PDF Generation
  const handleGeneratePDF = async () => {
    // Validate required fields
    const requiredFields = ['name', 'dateOfBirth', 'timeOfBirth', 'placeOfBirth'];
    const missingFields = requiredFields.filter(field => !form[field]);
    
    if (missingFields.length > 0) {
      alert(`Missing required fields: ${missingFields.join(', ')}`);
      return;
    }

    setIsGeneratingPDF(true);
    try {
      // Get coordinates from place of birth
      console.log('Converting place to coordinates:', form.placeOfBirth);
      const coordinates = await getCoordinatesFromPlace(form.placeOfBirth || '');
      console.log('Coordinates received:', coordinates);
      
      // Prepare payload similar to your form submission
      const now = new Date();
      const orderNumber = `gallabox_${now.toISOString().replace(/[-:.TZ]/g, '')}`;
      
      const payload = {
        dateOfBirth: form.dateOfBirth,
        gender: form.gender || 'Male', // Default if not specified
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        name: form.name,
        orderNumber,
        placeOfBirth: form.placeOfBirth,
        question: form.questions?.question1 || form.trouble || '',
        timeOfBirth: form.timeOfBirth,
        timezone: 5.5, // Default Indian timezone
        language: 'en' // Default to English, you can make this configurable
      };

      // Step 1: Get astrology data
      console.log('Sending payload to astrology API:', payload);
      const res = await fetch('https://rwg3x907l6.execute-api.ap-south-1.amazonaws.com/prod/free_report/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Astrology API failed: ${res.status} - ${errorText}`);
      }
      
      const data = await res.json();
      console.log('Astrology API response:', data);

      // Step 2: Generate PDF
      console.log('Generating PDF with data...');
      const pdfRes = await fetch('/api/pdfgenerator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...data.data, 
          name: payload.name,
          phone: form.phoneNumber
        })
      });

      if (pdfRes.ok) {
        const pdfData = await pdfRes.json();
        console.log('PDF generated successfully:', pdfData);
        
        // Step 3: Save to database
        await fetch('/api/free-report-submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            ...payload, 
            agenttyp: 'gallabox_admin',
            generatedAt: new Date().toISOString(),
            pdfUrl: pdfData.pdfUrl || pdfData.url
          }),
        });

        alert(`PDF generated successfully for ${form.name}! Check the system for the generated report.`);
      } else {
        const errorData = await pdfRes.text();
        throw new Error(`PDF generation failed: ${pdfRes.status} - ${errorData}`);
      }
    } catch (err) {
      console.error('PDF generation error:', err);
      alert(`Error generating PDF: ${err.message}`);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] shadow-lg relative flex flex-col">
        <button className="absolute top-4 right-4 text-xl z-10 hover:bg-gray-100 rounded p-1" onClick={onClose}>&times;</button>
        
        {/* Fixed Header */}
        <div className="p-6 pb-4 border-b">
          <h2 className="text-xl font-bold">Edit Lead</h2>
          
          {/* Status indicator for PDF generation */}
          {isGeneratingPDF && (
            <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                <span className="text-blue-700">Generating PDF report... Please wait.</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 pt-4">
          <div className="space-y-2">
            {Object.entries(form).map(([key, value]) => (
              key !== '_id' && key !== '__v' && key !== 'receivedAt' && key !== 'createdAt' && key !== 'updatedAt' &&
              (typeof value !== 'object' ? (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700">{key}</label>
                  <input
                    className="w-full border rounded px-2 py-1"
                    value={form[key] || ''}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  />
                </div>
              ) : null)
            ))}
            {/* Questions */}
            {form.questions && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Questions</label>
                <input className="w-full border rounded px-2 py-1 mb-1" value={form.questions.question1 || ''} onChange={e => setForm(f => ({ ...f, questions: { ...f.questions, question1: e.target.value } }))} placeholder="Question 1" />
                <input className="w-full border rounded px-2 py-1 mb-1" value={form.questions.question2 || ''} onChange={e => setForm(f => ({ ...f, questions: { ...f.questions, question2: e.target.value } }))} placeholder="Question 2" />
                <input className="w-full border rounded px-2 py-1" value={form.questions.question3 || ''} onChange={e => setForm(f => ({ ...f, questions: { ...f.questions, question3: e.target.value } }))} placeholder="Question 3" />
              </div>
            )}
          </div>
        </div>
        
        {/* Fixed Footer */}
        <div className="p-6 pt-4 border-t bg-gray-50 rounded-b-xl">
          <div className="flex justify-between">
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" 
              onClick={() => onDelete(form)}
            >
              Delete
            </button>
            <div className="flex gap-2">
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50" 
                onClick={handleGeneratePDF}
                disabled={isGeneratingPDF}
              >
                {isGeneratingPDF ? 'Generating...' : 'Generate PDF'}
              </button>
              <button 
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" 
                onClick={() => onSave(form)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GallaboxDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [generatingPDFs, setGeneratingPDFs] = useState(new Set()); // Track which PDFs are generating
  const [selectedLeads, setSelectedLeads] = useState(new Set()); // For bulk operations
  const [bulkGenerating, setBulkGenerating] = useState(false);

  useEffect(() => {
    async function fetchLeads() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://ycxn3ykohf.execute-api.ap-south-1.amazonaws.com//gallabox/leads');
        if (!res.ok) throw new Error('Failed to fetch leads');
        const data = await res.json();
        setLeads(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  // Handle checkbox selection
  const handleSelectLead = (leadId, isSelected) => {
    setSelectedLeads(prev => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(leadId);
      } else {
        newSet.delete(leadId);
      }
      return newSet;
    });
  };

  // Handle select all
  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedLeads(new Set(leads.map(lead => lead._id)));
    } else {
      setSelectedLeads(new Set());
    }
  };

  // Bulk PDF generation
  async function handleBulkPDFGeneration() {
    if (selectedLeads.size === 0) {
      alert('Please select leads to generate PDFs for.');
      return;
    }

    const selectedLeadObjects = leads.filter(lead => selectedLeads.has(lead._id));
    const validLeads = selectedLeadObjects.filter(lead => 
      lead.name && lead.dateOfBirth && lead.timeOfBirth && lead.placeOfBirth
    );

    if (validLeads.length === 0) {
      alert('No valid leads selected. Please ensure leads have name, DOB, time, and place of birth.');
      return;
    }

    if (validLeads.length !== selectedLeadObjects.length) {
      const invalidCount = selectedLeadObjects.length - validLeads.length;
      if (!confirm(`${invalidCount} leads have missing required fields and will be skipped. Continue with ${validLeads.length} valid leads?`)) {
        return;
      }
    }

    setBulkGenerating(true);
    let successCount = 0;
    let errorCount = 0;

    for (const lead of validLeads) {
      try {
        await handleQuickPDFGenerationInternal(lead);
        successCount++;
      } catch (error) {
        console.error(`Failed to generate PDF for ${lead.name}:`, error);
        errorCount++;
      }
    }

    setBulkGenerating(false);
    setSelectedLeads(new Set());
    alert(`Bulk PDF generation complete!\nSuccessful: ${successCount}\nFailed: ${errorCount}`);
  }

  // Internal function for PDF generation (without UI updates for bulk)
  async function handleQuickPDFGenerationInternal(lead) {
    const coordinates = await getCoordinatesFromPlace(lead.placeOfBirth);
    
    const now = new Date();
    const orderNumber = `gallabox_${now.toISOString().replace(/[-:.TZ]/g, '')}`;
    
    const payload = {
      dateOfBirth: lead.dateOfBirth,
      gender: lead.gender || 'Male',
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      name: lead.name,
      orderNumber,
      placeOfBirth: lead.placeOfBirth,
      question: lead.questions?.question1 || lead.trouble || '',
      timeOfBirth: lead.timeOfBirth,
      timezone: 5.5,
      language: 'en'
    };

    const res = await fetch('https://rwg3x907l6.execute-api.ap-south-1.amazonaws.com/prod/free_report/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Astrology API failed: ${res.status} - ${errorText}`);
    }
    
    const data = await res.json();

    const pdfRes = await fetch('/api/pdfgenerator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...data.data, 
        name: payload.name,
        phone: lead.phoneNumber
      })
    });

    if (!pdfRes.ok) {
      const errorData = await pdfRes.text();
      throw new Error(`PDF generation failed: ${pdfRes.status} - ${errorData}`);
    }

    const pdfData = await pdfRes.json();
    
    await fetch('/api/free-report-submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...payload, 
        agenttyp: 'gallabox_bulk',
        generatedAt: new Date().toISOString(),
        pdfUrl: pdfData.pdfUrl || pdfData.url
      }),
    });
  }

  async function handleSave(updatedLead) {
    try {
      const res = await fetch(`https://ycxn3ykohf.execute-api.ap-south-1.amazonaws.com//gallabox/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLead.questions ? { ...updatedLead, questions: updatedLead.questions } : updatedLead),
      });
      if (!res.ok) throw new Error('Failed to update lead');
      setLeads(leads => leads.map(l => l._id === updatedLead._id ? { ...l, ...updatedLead } : l));
      setModalOpen(false);
    } catch (err) {
      alert('Error updating lead: ' + err.message);
    }
  }
  async function handleDelete(leadToDelete) {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`https://ycxn3ykohf.execute-api.ap-south-1.amazonaws.com//gallabox/lead/${leadToDelete.whatsappMessageId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete lead');
      setLeads(leads => leads.filter(l => l._id !== leadToDelete._id));
      setModalOpen(false);
    } catch (err) {
      alert('Error deleting lead: ' + err.message);
    }
  }

  // Generate PDF directly from table
  async function handleQuickPDFGeneration(lead, event) {
    event.stopPropagation(); // Prevent opening modal
    
    // Validate required fields
    const requiredFields = ['name', 'dateOfBirth', 'timeOfBirth', 'placeOfBirth'];
    const missingFields = requiredFields.filter(field => !lead[field]);
    
    if (missingFields.length > 0) {
      alert(`Cannot generate PDF. Missing required fields: ${missingFields.join(', ')}`);
      return;
    }

    setGeneratingPDFs(prev => new Set([...prev, lead._id]));
    
    try {
      // Get coordinates from place of birth
      const coordinates = await getCoordinatesFromPlace(lead.placeOfBirth);
      
      const now = new Date();
      const orderNumber = `gallabox_${now.toISOString().replace(/[-:.TZ]/g, '')}`;
      
      const payload = {
        dateOfBirth: lead.dateOfBirth,
        gender: lead.gender || 'Male',
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        name: lead.name,
        orderNumber,
        placeOfBirth: lead.placeOfBirth,
        question: lead.questions?.question1 || lead.trouble || '',
        timeOfBirth: lead.timeOfBirth,
        timezone: 5.5,
        language: 'en'
      };

      // Get astrology data
      const res = await fetch('https://rwg3x907l6.execute-api.ap-south-1.amazonaws.com/prod/free_report/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Astrology API failed: ${res.status} - ${errorText}`);
      }
      
      const data = await res.json();

      // Generate PDF
      const pdfRes = await fetch('/api/pdfgenerator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...data.data, 
          name: payload.name,
          phone: lead.phoneNumber
        })
      });

      if (pdfRes.ok) {
        const pdfData = await pdfRes.json();
        
        // Save to database
        await fetch('/api/free-report-submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            ...payload, 
            agenttyp: 'gallabox_quick',
            generatedAt: new Date().toISOString(),
            pdfUrl: pdfData.pdfUrl || pdfData.url
          }),
        });

        alert(`PDF generated successfully for ${lead.name}!`);
      } else {
        const errorData = await pdfRes.text();
        throw new Error(`PDF generation failed: ${pdfRes.status} - ${errorData}`);
      }
    } catch (err) {
      console.error('Quick PDF generation error:', err);
      alert(`Error generating PDF for ${lead.name}: ${err.message}`);
    } finally {
      setGeneratingPDFs(prev => {
        const newSet = new Set(prev);
        newSet.delete(lead._id);
        return newSet;
      });
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Gallabox Leads Dashboard</h1>
      
      {/* Bulk Actions */}
      {leads.length > 0 && (
        <div className="mb-4 bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {selectedLeads.size} of {leads.length} selected
              </span>
              <button
                onClick={() => handleSelectAll(selectedLeads.size !== leads.length)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {selectedLeads.size === leads.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <button
              onClick={handleBulkPDFGeneration}
              disabled={selectedLeads.size === 0 || bulkGenerating}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {bulkGenerating ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating PDFs...
                </div>
              ) : (
                `Generate PDFs (${selectedLeads.size})`
              )}
            </button>
          </div>
        </div>
      )}

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow">
     <thead>
  <tr className="bg-orange-200 text-black">
    <th className="py-2 px-3">
      <input 
        type="checkbox" 
        checked={selectedLeads.size === leads.length && leads.length > 0}
        onChange={(e) => handleSelectAll(e.target.checked)}
        className="rounded"
      />
    </th>
    <th className="py-2 px-3">Conversation ID</th>
    <th className="py-2 px-3">Name</th>
    <th className="py-2 px-3">Phone</th>
    <th className="py-2 px-3">DOB</th>
    <th className="py-2 px-3">Time</th>
    <th className="py-2 px-3">Place</th>
    <th className="py-2 px-3">Gender</th>
    <th className="py-2 px-3">Trouble</th>
    <th className="py-2 px-3">Question 1</th>
    <th className="py-2 px-3">Question 2</th>
    <th className="py-2 px-3">Question 3</th>
    <th className="py-2 px-3">Received At</th>
    <th className="py-2 px-3">Actions</th>
  </tr>
</thead>
<tbody>
  {leads.map((lead) => (
    <tr key={lead._id} className="border-b hover:bg-orange-50">
      <td className="py-2 px-3">
        <input 
          type="checkbox" 
          checked={selectedLeads.has(lead._id)}
          onChange={(e) => handleSelectLead(lead._id, e.target.checked)}
          className="rounded"
        />
      </td>
      <td className="py-2 px-3 cursor-pointer" onClick={() => { setSelectedLead(lead); setModalOpen(true); }}>{lead.conversationId}</td>
      <td className="py-2 px-3 cursor-pointer" onClick={() => { setSelectedLead(lead); setModalOpen(true); }}>{lead.name}</td>
      <td className="py-2 px-3 cursor-pointer" onClick={() => { setSelectedLead(lead); setModalOpen(true); }}>{lead.phoneNumber}</td>
      <td className="py-2 px-3 cursor-pointer" onClick={() => { setSelectedLead(lead); setModalOpen(true); }}>{lead.dateOfBirth ? new Date(lead.dateOfBirth).toLocaleDateString() : ''}</td>
      <td className="py-2 px-3 cursor-pointer" onClick={() => { setSelectedLead(lead); setModalOpen(true); }}>{lead.timeOfBirth}</td>
      <td className="py-2 px-3 cursor-pointer" onClick={() => { setSelectedLead(lead); setModalOpen(true); }}>{lead.placeOfBirth}</td>
      <td className="py-2 px-3 cursor-pointer" onClick={() => { setSelectedLead(lead); setModalOpen(true); }}>{lead.gender}</td>
      <td className="py-2 px-3 cursor-pointer" onClick={() => { setSelectedLead(lead); setModalOpen(true); }}>{lead.trouble}</td>
      <td className="py-2 px-3 cursor-pointer" onClick={() => { setSelectedLead(lead); setModalOpen(true); }}>{lead.questions?.question1 || ''}</td>
      <td className="py-2 px-3 cursor-pointer" onClick={() => { setSelectedLead(lead); setModalOpen(true); }}>{lead.questions?.question2 || ''}</td>
      <td className="py-2 px-3 cursor-pointer" onClick={() => { setSelectedLead(lead); setModalOpen(true); }}>{lead.questions?.question3 || ''}</td>
      <td className="py-2 px-3 cursor-pointer" onClick={() => { setSelectedLead(lead); setModalOpen(true); }}>{lead.receivedAt ? new Date(lead.receivedAt).toLocaleString() : ''}</td>
      <td className="py-2 px-3">
        <button
          onClick={(e) => handleQuickPDFGeneration(lead, e)}
          disabled={generatingPDFs.has(lead._id)}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {generatingPDFs.has(lead._id) ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
              PDF...
            </div>
          ) : (
            'Generate PDF'
          )}
        </button>
      </td>
    </tr>
  ))}
</tbody>
{modalOpen && (
  <LeadEditModal
    lead={selectedLead}
    open={modalOpen}
    onClose={() => setModalOpen(false)}
    onSave={handleSave}
    onDelete={handleDelete}
  />
)}
          </table>
        </div>
      )}
    </div>
  );
}
