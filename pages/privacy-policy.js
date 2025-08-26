import React from 'react';
// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/router';
import SEOHead from '../components/SEOHead';
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../components/InternalLinksGrid';
import Footer from '../components/Footer';
import CustomHeader from '../components/CustomHeader';
import Link from 'next/link';


const PrivacyPolicyPage = () => {
  // const router = useRouter();

  return (
    <>
      <SEOHead
        title="Privacy Policy - AstroSight | Data Protection & Privacy"
        description="Learn about AstroSight's privacy policy, data protection practices, and how we handle your personal information securely and responsibly."
        keywords="AstroSight privacy policy, data protection, personal information, astrology app privacy, secure data handling"
        canonical="https://astrosight.ai/privacy-policy"
        ogImage="https://astrosight.ai/images/privacy-policy.jpg"
      />
                  <CustomHeader />

      <div className="min-h-screen bg-[#FFF6E9] p-4">
        {/* Header */}
        {/* <div className="flex items-center mb-6">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="p-2 text-gray-600 hover:text-[#FF9D42]"
          >
            <i className="fas fa-arrow-left text-xl" />
          </Button>
          <h1 className="text-2xl font-bold text-[#FF9D42] ml-4">Privacy Policy</h1>
        </div> */}

        {/* Content */}
        <div className="max-w-4xl mx-auto bg-white mt-11 rounded-xl shadow-lg p-6 space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Privacy Policy</h2>
            <p className="text-gray-600 font-medium">Last updated: August 11, 2025</p>
          </div>

          <section>
            <div className="space-y-3 text-gray-700">
              <p>
                This document is an electronic record generated under the provisions of the Information Technology Act, 2000 and the applicable rules, including any amendments. This Privacy Policy is published in accordance with Rule 3(1) of the Information Technology (Intermediaries Guidelines) Rules, 2011 and Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
              </p>
              <p>
                Astrosight Services Pvt Ltd (&quot;AstroSight,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, store, and safeguard your personal information when you visit our website <Link href="https://astrosight.ai" className="text-[#FF9D42] hover:underline">https://astrosight.ai</Link> or use our services.
              </p>
              <p>
                By using AstroSight, you acknowledge that you have read and understood this Privacy Policy and consent to the collection, use, and disclosure of your information as described herein.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Information We Collect</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Personal Information</h4>
                <p className="text-gray-700 mb-2">We collect information you provide directly to us, including:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                  <li>Account Information: Name, email address, phone number, date of birth, time of birth, place of birth</li>
                  <li>Profile Information: Gender, preferred language, marital status, occupation (optional)</li>
                  <li>Contact Details: Address, alternative phone numbers</li>
                  <li>Communication: Information from your interactions with our customer service team</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Payment Information</h4>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                  <li>Billing Information: Billing name, billing address, and payment method when you purchase our services</li>
                  <li>Payment Processing: We use third-party payment gateways/aggregators including CC Avenue to process your payments</li>
                  <li>Important: We NEVER collect or store your credit card number, expiry date, or other sensitive payment details on our servers</li>
                  <li>All payment data is encrypted and processed through Payment Card Industry Data Security Standard (PCI-DSS) compliant systems</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Usage Information</h4>
                <p className="text-gray-700 mb-2">We automatically collect certain information about your use of our services, including:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                  <li>Device Information: IP address, browser type, operating system, device identifiers</li>
                  <li>Usage Data: Pages visited, time spent on our platform, features used</li>
                  <li>Location Data: General location information (city/region level) for service personalization</li>
                  <li>Session Data: Information about your astrological consultations and app interactions</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Astrological Information</h4>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                  <li>Birth Details: Date, time, and place of birth for chart calculations</li>
                  <li>Consultation Records: Questions asked, readings provided, astrologer interactions</li>
                  <li>Preferences: Astrological interests, notification preferences, service preferences</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">How We Use Your Information</h3>
            <p className="text-gray-700 mb-3">We use the collected information to:</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Service Provision</h4>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                  <li>Provide personalized astrological readings and predictions</li>
                  <li>Generate birth charts and compatibility reports</li>
                  <li>Facilitate consultations with astrologers</li>
                  <li>Send daily, weekly, and monthly horoscopes</li>
                  <li>Deliver premium features and services</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Communication</h4>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                  <li>Communicate with you about your orders, inquiries, or service requests</li>
                  <li>Send promotional emails or newsletters (with your consent)</li>
                  <li>Provide customer support and respond to your questions</li>
                  <li>Send service-related notifications and updates</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Platform Improvement</h4>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                  <li>Analyze usage patterns to improve our services</li>
                  <li>Conduct research and analysis for service enhancement</li>
                  <li>Develop new features and astrological tools</li>
                  <li>Ensure platform security and prevent fraud</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Legal Compliance</h4>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                  <li>Comply with applicable laws and regulations</li>
                  <li>Respond to legal requests and prevent illegal activities</li>
                  <li>Protect our rights and the rights of our users</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Information Sharing and Disclosure</h3>
            <p className="text-gray-700 mb-3">We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy:</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Service Providers</h4>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                  <li>Astrologers: We share necessary information with our verified astrologers to provide consultations</li>
                  <li>Payment Processors: CC Avenue and other payment partners receive billing information for transaction processing</li>
                  <li>Technology Partners: Cloud storage providers, analytics services, and communication platforms</li>
                  <li>Delivery Partners: For physical product deliveries (if applicable)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Legal Requirements</h4>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                  <li>When required by law, court order, or government request</li>
                  <li>To protect our rights, property, or safety, or that of our users</li>
                  <li>In connection with legal proceedings or investigations</li>
                  <li>To comply with regulatory requirements</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Business Transfers</h4>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                  <li>In the event of a merger, acquisition, or sale of assets, user information may be transferred to the acquiring entity</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Data Security</h3>
            <p className="text-gray-700 mb-3">We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Security Measures</h4>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                  <li>Encryption: All sensitive data is encrypted in transit and at rest</li>
                  <li>Access Controls: Limited access to personal information on a need-to-know basis</li>
                  <li>Regular Audits: Periodic security assessments and vulnerability testing</li>
                  <li>Secure Servers: Data stored on secure servers with appropriate firewalls and monitoring</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Payment Security</h4>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                  <li>All payment processing is handled by PCI-DSS compliant payment gateways</li>
                  <li>We do not store credit card information on our servers</li>
                  <li>Payment data is encrypted using industry-standard protocols</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Data Retention</h3>
            <p className="text-gray-700 mb-3">We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy, unless a longer retention period is required by law.</p>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Retention Periods</h4>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                <li>Account Information: Retained while your account is active and for a reasonable period after deactivation</li>
                <li>Consultation Records: Maintained to provide ongoing astrological insights and service continuity</li>
                <li>Payment Records: Retained as required by financial regulations and tax laws</li>
                <li>Usage Data: Anonymized and aggregated for analytical purposes</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Your Rights</h3>
            <p className="text-gray-700 mb-2">You have the right to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
              <li>Access: Request access to your personal information</li>
              <li>Correction: Update or correct inaccurate information</li>
              <li>Deletion: Request deletion of your personal information (subject to legal requirements)</li>
              <li>Portability: Request a copy of your data in a portable format</li>
              <li>Objection: Object to certain uses of your personal information</li>
              <li>Withdrawal: Withdraw consent for marketing communications</li>
            </ul>
            <p className="text-gray-700 mt-2">To exercise these rights, contact us at <Link href="mailto:admin@astrosight.ai" className="text-[#FF9D42] hover:underline">admin@astrosight.ai</Link>.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Cookies and Tracking</h3>
            <p className="text-gray-700 mb-2">We use cookies and similar tracking technologies to enhance your experience on our platform:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
              <li>Essential Cookies: Required for basic platform functionality</li>
              <li>Analytics Cookies: Help us understand user behavior and improve our services</li>
              <li>Marketing Cookies: Used for personalized advertising (with your consent)</li>
            </ul>
            <p className="text-gray-700 mt-2">You can manage cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Children&apos;s Privacy</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will delete that information immediately.
              </p>
              <p>
                <strong>Parental Guidance:</strong> We recommend parental supervision for users between 13-18 when using astrological services.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">International Transfers</h3>
            <p className="text-gray-700 mb-2">Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information during such transfers, including:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
              <li>Adequate data protection laws in destination countries</li>
              <li>Standard contractual clauses with international partners</li>
              <li>Regular monitoring of data protection standards</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Third-Party Services</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">CC Avenue Integration</h4>
                <p className="text-gray-700">
                  We use CC Avenue as our primary payment gateway. CC Avenue&apos;s privacy practices are governed by their own privacy policy, which can be found at: <a href="https://www.ccavenue.com/privacy-policy" className="text-[#FF9D42] hover:underline">https://www.ccavenue.com/privacy-policy</a>.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Other Third Parties</h4>
                <p className="text-gray-700">
                  We may integrate with other third-party services for analytics, communication, and service enhancement. Each third party operates under their own privacy policies.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Updates to This Policy</h3>
            <p className="text-gray-700 mb-2">We may update this privacy policy from time to time. We will notify you of any changes by:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
              <li>Posting the new policy on this page with an updated &quot;Last updated&quot; date</li>
              <li>Sending email notifications for material changes</li>
              <li>In-app notifications for significant policy updates</li>
            </ul>
            <p className="text-gray-700 mt-2">Your continued use of our services after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Disclaimer on Astrological Consultations</h3>
            <p className="text-gray-700 mb-2"><strong>Important Notice:</strong> While we are committed to protecting your data and privacy during consultations, please note that:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
              <li>Astrological information is viewed by our verified astrologers and quality assurance team</li>
              <li>You assume responsibility and risk when sharing sensitive information during consultations</li>
              <li>Apply reasonable judgment when providing financial or highly personal details to astrologers</li>
              <li>AstroSight does not guarantee the accuracy of astrological predictions</li>
              <li>All consultations are for entertainment and guidance purposes only</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">Contact Information</h3>
            <p className="text-gray-700 mb-3">If you have any questions about this Privacy Policy or our practices, please contact us at:</p>
            <div className="bg-[#FFF6E9] p-4 rounded-lg space-y-1">
              <p><strong>Email:</strong> <a href="mailto:admin@astrosight.ai" className="text-[#FF9D42] hover:underline">admin@astrosight.ai</a></p>
              <p><strong>Address:</strong> AstroSight Services Pvt Ltd, 27th Cross, Purnapragnya Layout, Poornapragna Housing Society L, Poornapragna Housing Society Layout, Bengaluru, Karnataka 560061, India</p>
              <p><strong>Phone:</strong> +918660128377</p>
              <p><strong>Website:</strong> <a href="https://astrosight.ai" className="text-[#FF9D42] hover:underline">https://astrosight.ai</a></p>
            </div>
          </section>

          <section>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 font-medium">
                <strong>Effective Date:</strong> This Privacy Policy is effective as of the date last updated above.
              </p>
            </div>
          </section>

          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              By using AstroSight, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
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

export default PrivacyPolicyPage;
