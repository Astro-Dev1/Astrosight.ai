import React from 'react';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

const PrivacyPolicyPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Privacy Policy - AstroSight | Data Protection & Privacy</title>
        <meta name="description" content="Learn about AstroSight's privacy policy, data protection practices, and how we handle your personal information securely and responsibly." />
        <meta name="keywords" content="AstroSight privacy policy, data protection, personal information, astrology app privacy, secure data handling" />
        <meta property="og:title" content="Privacy Policy - AstroSight" />
        <meta property="og:description" content="AstroSight's comprehensive privacy policy outlining our data protection practices and commitment to user privacy." />
        <meta property="og:url" content="https://astrosight.ai/privacy-policy" />
        <link rel="canonical" href="https://astrosight.ai/privacy-policy" />
      </Head>
      
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
        <h1 className="text-2xl font-bold text-[#FF9D42] ml-4">Privacy Policy</h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">AstroSight Privacy Policy</h2>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">1. Information We Collect</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Personal Information:</strong> We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Name, phone number, and email address</li>
              <li>Date, time, and place of birth for astrological calculations</li>
              <li>Gender and language preferences</li>
              <li>Profile information and preferences</li>
            </ul>
            <p>
              <strong>Usage Information:</strong> We automatically collect certain information about your use of our services, including:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Device information and identifiers</li>
              <li>Log data and analytics</li>
              <li>App usage patterns and preferences</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">2. How We Use Your Information</h3>
          <div className="space-y-3 text-gray-700">
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Provide personalized astrological readings and predictions</li>
              <li>Generate birth charts and compatibility reports</li>
              <li>Send you notifications about daily horoscopes and updates</li>
              <li>Improve our services and develop new features</li>
              <li>Communicate with you about our services</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">3. Information Sharing</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>With service providers who assist us in operating our app</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or acquisition</li>
              <li>With your explicit consent</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">4. Data Security</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">5. Data Retention</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">6. Your Rights</h3>
          <div className="space-y-3 text-gray-700">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and personal information</li>
              <li>Object to processing of your information</li>
              <li>Data portability</li>
            </ul>
          </div>
        </section>        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">7. Children&apos;s Privacy</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will delete that information immediately.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">8. International Data Transfers</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information during such transfers.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">9. Changes to This Policy</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the Last updated date.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">10. Contact Us</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              If you have any questions about this privacy policy or our practices, please contact us at:
            </p>
            <div className="bg-[#FFF6E9] p-4 rounded-lg">
              <p><strong>Email:</strong> support@astrosight.com</p>
              <p><strong>Address:</strong> [Your Company Address]</p>
              <p><strong>Phone:</strong> [Your Contact Number]</p>
            </div>
          </div>
        </section>

        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            By using AstroSight, you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
