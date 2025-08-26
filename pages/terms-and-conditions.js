import React from 'react';
// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/router';
import SEOHead from '../components/SEOHead';
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../components/InternalLinksGrid';
import Footer from '../components/Footer';
import CustomHeader from '../components/CustomHeader';

const TermsAndConditionsPage = () => {
  // const router = useRouter();

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
            <CustomHeader />

        {/* Header */}
        {/* <div className="flex items-center mb-6">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="p-2 text-gray-600 hover:text-[#FF9D42]"
          >
            <i className="fas fa-arrow-left text-xl" />
          </Button>
          <h1 className="text-2xl font-bold text-center text-[#FF9D42] ml-4">Terms & Conditions</h1>
        </div> */}

        {/* Content */}
        <div className="max-w-4xl mx-auto bg-white mt-11 rounded-xl shadow-lg p-6 space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Terms & Conditions</h1>
          </div>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Disclaimer:</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                This document constitutes the complete terms and conditions for using AstroSight services. Users are responsible for reading, understanding, and complying with these terms before using our services.
              </p>
              <p>
                This document is an electronic record generated under the provisions of the Information Technology Act, 2000 and the applicable rules, including any amendments. This document is published in line with Rule 3(1) of the Information Technology (Intermediaries Guidelines) Rules, 2011, which mandates the publication of the website&apos;s terms of use, privacy policy, and rules for user access and interaction on <a href="https://astrosight.ai" className="text-[#FF9D42] hover:underline">https://astrosight.ai</a>.
              </p>
            </div>
          </section>

          <div className="text-center my-6">
            <p className="text-gray-600 font-medium">Last updated: August 11, 2025</p>
          </div>

          <section>
            <div className="space-y-3 text-gray-700">
              <p>
                By accessing and using AstroSight (&quot;the App&quot;), you accept and agree to be bound by the terms and provision of this agreement. These terms apply to the entire website/application and any email or other type of communication between you and AstroSight. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use our website or services.
              </p>
              <p>
                Our website uses cookies; by using our website or agreeing to these terms and conditions, you consent to our use of cookies in accordance with the terms of our privacy policy.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Service Description</h3>
            <div className="space-y-3 text-gray-700">
              <p>AstroSight is an astrology application that provides:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Personalized astrological readings and predictions</li>
                <li>Daily, weekly, and monthly horoscopes</li>
                <li>Birth chart analysis and interpretations</li>
                <li>Compatibility reports and relationship insights</li>
                <li>Premium astrological consultations and features</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Acceptable Use</h3>
            <div className="space-y-3 text-gray-700">
              <p>You must not:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Use our website in any way that is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity</li>
                <li>Access or otherwise interact with our website using any robot, spider or other automated means except for the purpose of search engine indexing</li>
                <li>Transmit offensive or unlawful content or disrupt the normal operation of the site</li>
              </ul>
              <p>
                You must ensure that all the information you supply to us through our website, or in relation to our website, is true, accurate, current, complete and non-misleading.
              </p>
              <p>As a user of AstroSight, you agree to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Use the service responsibly and in accordance with these terms</li>
                <li>Provide accurate information when creating your account</li>
                <li>Keep your login credentials secure and confidential</li>
                <li>Respect other users and maintain appropriate conduct</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">User Accounts</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                You must be at least 13 years old to use AstroSight. Users between 13-18 must have parental consent. We recommend parental guidance for all users under 18 when using astrological services.
              </p>
              <p>
                We reserve the right to terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Product & Service Information</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Important Disclaimer:</strong> The astrological information, predictions, and advice provided by AstroSight are for entertainment and informational purposes only. They should not be considered as professional advice for medical, financial, legal, or relationship decisions. Users should use their own judgment and consult qualified professionals for important decisions.
              </p>
              <p>If you choose to purchase premium features:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>All payments are processed securely through our payment partners</li>
                <li>Subscription terms and pricing are clearly displayed at the time of purchase</li>
                <li>Refund policies apply as per our stated terms for each service</li>
                <li>Premium features are subject to availability and may change without notice</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Intellectual Property Rights</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                All content in AstroSight, including but not limited to text, graphics, logos, images, audio clips, and software, is owned by AstroSight or its content suppliers and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from our content without explicit written permission.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Privacy Policy</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices regarding the collection and use of your personal information.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Limitation of Liability</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                AstroSight and its affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Your use or inability to use the service</li>
                <li>Any errors or omissions in the astrological content</li>
                <li>Decisions made based on astrological predictions</li>
                <li>Technical issues or service interruptions</li>
                <li>Unauthorized access to your personal information</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Indemnification</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                You agree to indemnify, defend, and hold harmless AstroSight and its affiliates, directors, officers, employees, and agents from and against all claims, liabilities, damages, losses, or expenses, including reasonable legal fees, arising out of your use of the website or your violation of these Terms & Conditions.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Governing Law</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of competent jurisdiction in India.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Changes to Terms</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Continued use of the service after changes constitutes acceptance of the new terms. Users will be notified of significant changes via email or in-app notifications.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Contact Information</h3>
            <div className="space-y-3 text-gray-700">
              <p>For questions about these Terms of Service, please contact us at:</p>
              <div className="bg-[#FFF6E9] p-4 rounded-lg space-y-1">
                <p><strong>Email:</strong> admin@astrosight.ai</p>
                <p><strong>Website:</strong> <a href="https://astrosight.ai" className="text-[#FF9D42] hover:underline">https://astrosight.ai</a></p>
                <p><strong>Address:</strong> Astrosight Services Pvt Ltd, 27th Main, PP Layout, Uttarahalli, Bengaluru - 560061</p>
                <p><strong>Phone:</strong> +918660128377</p>
              </div>
            </div>
          </section>

          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              By using AstroSight, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>
        
        {/* Internal Links Section */}
        <div className="mt-12 space-y-8">
          <InternalLinksGrid />
          <HoroscopeNavigation />
          <CompatibilityLinksGrid />
          <ReportLinksGrid />
          <RecentBlogLinks />
        </div>
      </div>
      
    <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>    </>
  );
};

export default TermsAndConditionsPage;
