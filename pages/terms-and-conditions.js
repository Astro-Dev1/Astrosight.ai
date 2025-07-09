import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import SEOHead from '../components/SEOHead';

const TermsAndConditionsPage = () => {
  const router = useRouter();

  return (
    <>
      <SEOHead
        title="Terms & Conditions - AstroSight | Service Agreement"
        description="Read AstroSight's terms and conditions, service agreement, and user guidelines for our astrology platform and services."
        keywords="AstroSight terms conditions, service agreement, astrology app terms, user guidelines, legal terms"
        canonical="https://astrosight.ai/terms-and-conditions"
        ogImage="https://astrosight.ai/images/terms-conditions.jpg"
      />
      
      <div className="min-h-screen bg-[#FFF6E9] p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="p-2 text-gray-600 hover:text-[#FF9D42]"
        >
          <i className="fas fa-arrow-left text-xl" />
        </Button>
        <h1 className="text-2xl font-bold text-[#FF9D42] ml-4">Terms & Conditions</h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">AstroSight Terms & Conditions</h2>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">1. Acceptance of Terms</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              By accessing and using AstroSight (&quot;the App&quot;), you accept and agree to be bound by the terms and provision of this agreement. These terms apply to the entire website and any email or other type of communication between you and AstroSight.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">2. Description of Service</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              AstroSight is an astrology application that provides:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Daily horoscopes and personalized predictions</li>
              <li>Birth chart calculations and interpretations</li>
              <li>Compatibility analysis between individuals</li>
              <li>Panchanga (Hindu calendar) information</li>
              <li>Educational content about astrology</li>
              <li>AI-powered astrological insights</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">3. User Responsibilities</h3>
          <div className="space-y-3 text-gray-700">
            <p>As a user of AstroSight, you agree to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Provide accurate and truthful information during registration</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Use the service only for personal, non-commercial purposes</li>
              <li>Not attempt to reverse engineer or hack the application</li>
              <li>Not share or distribute content from the app without permission</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">4. Nature of Astrological Content</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Important Disclaimer:</strong> The astrological information, predictions, and advice provided by AstroSight are for entertainment and informational purposes only. They should not be considered as:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Professional medical, legal, or financial advice</li>
              <li>Absolute predictions of future events</li>
              <li>Guarantees of specific outcomes</li>
              <li>Substitutes for professional consultation</li>
            </ul>
            <p>
              Users should use their own judgment and consult qualified professionals for important decisions.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">5. Subscription and Payments</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              If you choose to purchase premium features:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>All purchases are final and non-refundable unless required by law</li>
              <li>Subscription fees are charged in advance</li>
              <li>Auto-renewal can be cancelled at any time through your account settings</li>
              <li>Prices may change with notice to existing subscribers</li>
              <li>Free trial periods may be offered at our discretion</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">6. Intellectual Property</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              All content in AstroSight, including but not limited to text, graphics, logos, images, audio clips, and software, is owned by AstroSight or its content suppliers and is protected by copyright and other intellectual property laws.
            </p>
          </div>        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">7. Privacy and Data Protection</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices regarding the collection and use of your personal information.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">8. Limitation of Liability</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              AstroSight and its affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Use or inability to use the service</li>
              <li>Reliance on astrological predictions or advice</li>
              <li>Technical issues or service interruptions</li>
              <li>Loss of data or personal information</li>
              <li>Any decisions made based on app content</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">9. Termination</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              We reserve the right to terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
            </p>
          </div>        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">10. Age Restrictions</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              You must be at least 13 years old to use AstroSight. Users between 13-18 must have parental consent. We recommend parental guidance for all users under 18 when using astrological services.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">11. Governing Law</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              These terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of [Your Jurisdiction].
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">12. Changes to Terms</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">13. Contact Information</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-[#FFF6E9] p-4 rounded-lg">
              <p><strong>Email:</strong> legal@astrosight.com</p>
              <p><strong>Address:</strong> [Your Company Address]</p>
              <p><strong>Phone:</strong> [Your Contact Number]</p>
            </div>
          </div>
        </section>

        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            By using AstroSight, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditionsPage;
