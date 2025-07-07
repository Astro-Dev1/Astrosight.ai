import React, { useEffect, useState } from 'react';

function LeadEditModal({ lead, open, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(lead || {});
  useEffect(() => { setForm(lead || {}); }, [lead]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">Edit Lead</h2>
        <div className="space-y-2">
          {Object.entries(form).map(([key, value]) => (
            key !== '_id' && key !== '__v' && key !== 'receivedAt' && key !== 'createdAt' && key !== 'updatedAt' &&
            (typeof value !== 'object' ? (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700">{key}</label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={form[key] || ''}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))
                  }
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
        <div className="flex justify-between mt-6">
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => onDelete(form)}>Delete</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => onSave(form)}>Save</button>
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

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Gallabox Leads Dashboard</h1>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow">
     <thead>
  <tr className="bg-orange-200 text-black">
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
  </tr>
</thead>
<tbody>
  {leads.map((lead) => (
    <tr key={lead._id} className="border-b hover:bg-orange-50 cursor-pointer" onClick={() => { setSelectedLead(lead); setModalOpen(true); }}>
      <td className="py-2 px-3">{lead.conversationId}</td>
      <td className="py-2 px-3">{lead.name}</td>
      <td className="py-2 px-3">{lead.phoneNumber}</td>
      <td className="py-2 px-3">{lead.dateOfBirth ? new Date(lead.dateOfBirth).toLocaleDateString() : ''}</td>
      <td className="py-2 px-3">{lead.timeOfBirth}</td>
      <td className="py-2 px-3">{lead.placeOfBirth}</td>
      <td className="py-2 px-3">{lead.gender}</td>
      <td className="py-2 px-3">{lead.trouble}</td>
      <td className="py-2 px-3">{lead.questions?.question1 || ''}</td>
      <td className="py-2 px-3">{lead.questions?.question2 || ''}</td>
      <td className="py-2 px-3">{lead.questions?.question3 || ''}</td>
      <td className="py-2 px-3">{lead.receivedAt ? new Date(lead.receivedAt).toLocaleString() : ''}</td>
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
