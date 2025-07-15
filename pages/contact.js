import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
// import axios from 'axios';
import Head from 'next/head';
import Section from '../components/Section'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
export default function Contact() {
  const [openIndex, setOpenIndex] = useState(null);
  const faqData = [
    {
      question: "How do I book AstroAnswer’s services?",
      answer: (
        <>
          You can book our services from their respective pages. <br />
          <div className="mt-2">
          <strong>For Guidance Report:</strong>
          <a
            href="/guidance-report"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200 ease-in-out"
          >
            Book Guidance Report
          </a>
        </div>
        <div className="mt-2">
          <strong>For Booking a 1:1 Consultation Call with our Astrologer:</strong>
          <a
            href="/consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200 ease-in-out"
          >
            Book 1:1 Consultation
          </a>
        </div>
      </>
      ),
    },
    {
      question: "How will I receive my Guidance Report?",
      answer: "Your personalized Guidance Report will be delivered digitally to your email and WhatsApp within 24 hours of payment.",
    },
    {
      question: "Are the reports prepared by expert astrologers?",
      answer: "Yes, every report is carefully crafted by our team of experienced astrologers, ensuring accuracy and valuable insights.",
    },
    {
      question: "Can I book a one-on-one consultation with an astrologer?",
      answer: "Yes, we offer consultation calls of varying durations (15 minutes, 30 minutes, and 1 hour) to address your specific concerns. Visit our Consultation page to book your session.",
    },
    {
      question: "What is the refund policy if I’m unsatisfied with the report?",
      answer: "As per our policy, refunds are not provided once the report is delivered. Refunds may only be issued for payment-related issues, such as accidental double payments.",
    },
    {
      question: "Can I cancel my order after payment?",
      answer: "Cancellations are typically not accepted once details and payment are submitted. If the order hasn’t been processed (usually within 20 minutes), a cancellation request may be considered.",
    },
    {
      question: "How secure is my personal information?",
      answer: "We implement robust security measures to protect your data. Your information is used solely for creating your report and is never shared with third parties.",
    },
    {
      question: "Do you provide physical copies of the reports?",
      answer: "No, our services are entirely digital. Reports and consultations are delivered electronically for your convenience.",
    },
    {
      question: "What if I don’t receive my report within 24 hours?",
      answer: "If you haven’t received your report within 24 hours, please contact us via WhatsApp at 9964128377 or email at astrosight.ai@gmail.com, and our support team will assist you promptly.",
    },
    {
      question: "I’m having trouble with the payment process. What should I do?",
      answer: "If you face any payment issues, please contact us immediately. We’ll help resolve the issue and ensure your order is processed.",
    },
  ];
  

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
    heardAboutUs: '',
    preferredContactMethod: 'email'
  });
  const [status, setStatus] = useState(null);

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Uncomment the below line to send form data to the backend or API
      // await axios.post('/api/contact', formData);
      setStatus('Message sent successfully!');
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Head>
      <link rel="icon" href="/logo.png" />
        <title>Contact Astro Answer - Get Expert Vedic Astrology Consultation</title>
        <meta name="description" content="Connect with our expert Vedic astrologers for personalized consultations. Reach us via WhatsApp, email, or our contact form for astrology readings and spiritual guidance." />
        <meta name="keywords" content="contact astrologer, astrology consultation, book reading, Vedic astrology services, spiritual guidance, WhatsApp consultation, astrology support" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Astro Answer - Professional Astrology Consultations" />
        <meta property="og:description" content="Get in touch with our expert Vedic astrologers. Multiple contact options available including WhatsApp, email, and direct consultations." />
        <meta property="og:url" content="https://astrosight.ai/contact" />
        <meta property="og:image" content="https://astrosight.ai/images/contact-cover.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Astro Answer - Book Your Consultation" />
        <meta name="twitter:description" content="Reach out for professional Vedic astrology readings and spiritual guidance. Easy booking process and multiple contact options available." />
        <meta name="twitter:image" content="https://astrosight.ai/images/contact-cover.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://astrosight.ai/contact" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Astro Answer",
            "description": "Contact page for Vedic astrology consultations and services",
            "url": "https://astrosight.ai/contact",
            "provider": {
              "@type": "Organization",
              "name": "Astro Answer",
              "logo": {
                "@type": "ImageObject",
                "url": "https://astrosight.ai/logo.png"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+91-9964128377",
                  "contactType": "customer service",
                  "contactOption": "WhatsApp",
                  "areaServed": "Worldwide",
                  "availableLanguage": ["English", "Hindi", "Kannada"],
                  "email": "astrosight.ai@gmail.com"
                }
              ],
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://astrosight.ai/contact"
            },
            "potentialAction": {
              "@type": "ContactAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://astrosight.ai/contact",
                "inLanguage": "en",
                "actionPlatform": [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform"
                ]
              },
              "result": {
                "@type": "Message",
                "name": "Contact Form Submission"
              }
            }
          })}
        </script>
      </Head>

      <div className="bg-orange-50">
        <Header />

        <h1 className="text-3xl font-semibold text-orange-700 mb-6 text-center">Contact Us</h1>
        {/* Contact Information Section */}
        <Section title="We're Here to Guide You">
        <p className="text-lg text-center mb-4">Reach out to us through any of the following methods:</p>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-xl text-orange-600">Preferred Contact Methods</h3>
            <ul className="list-disc pl-6">
              <li>WhatsApp: 9964128377</li>
              <li>Email: admin@astrosight.ai</li>
              <li>Registered addres:1417, 1st main road BSK 1st stage 2nd Block Bengaluru 560061</li>
            </ul>
          </div>
          <p className="text-center text-lg">Mon-Sat: 9:00 AM to 6:00 PM</p>
        </div>
      </Section>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-orange-100 p-8 rounded-lg shadow-lg mt-12">
          {status && <p className="text-center mb-4 text-green-600">{status}</p>}

          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2 text-orange-700">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2 text-orange-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block font-medium mb-2 text-orange-700">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="subject" className="block font-medium mb-2 text-orange-700">Subject:</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="general">General Inquiry</option>
              <option value="service">Service Inquiry</option>
              <option value="technical">Technical Issue</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block font-medium mb-2 text-orange-700">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="heard-about-us" className="block font-medium mb-2 text-orange-700">How Did You Hear About Us?</label>
            <input
              type="text"
              id="heard-about-us"
              name="heard-about-us"
              value={formData.heardAboutUs}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="preferred-contact-method" className="block font-medium mb-2 text-orange-700">Preferred Contact Method:</label>
            <select
              id="preferred-contact-method"
              name="preferred-contact-method"
              value={formData.preferredContactMethod}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
        <Section>
      <dev className="text-center">
        <h2 className="text-2xl font-semibold text-orange-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => handleToggle(index)}>
                <h3 className="text-xl font-semibold text-orange-800">{faq.question}</h3>
                {openIndex === index ? (
                  <FaChevronUp className="text-orange-500" />
                ) : (
                  <FaChevronDown className="text-orange-500" />
                )}
              </div>
              {openIndex === index && <p className="mt-4 text-gray-700">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </dev>
    </Section>
        {/* </Container> */}
        <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </div>
    </>
  );
}
