import React from 'react';
// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/router';
import SEOHead from '../components/SEOHead';
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../components/InternalLinksGrid';
import Footer from '../components/Footer';
import CustomHeader from '../components/CustomHeader';

const RefundAndReturnPolicyPage = () => {
//   const router = useRouter();

  return (
    <>
      <SEOHead
        title="Refund and Return Policy - AstroSight | Returns & Exchanges"
        description="Learn about AstroSight's refund and return policy, including return procedures, refund timelines, and exchange guidelines for our products and services."
        keywords="AstroSight refund policy, return policy, exchange policy, astrology app refunds, return procedure"
        canonical="https://astrosight.ai/refund-policy"
        ogImage="https://astrosight.ai/images/refund-policy.jpg"
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
          <h1 className="text-2xl font-bold text-[#FF9D42] ml-4">Refund and Return Policy</h1>
        </div> */}

        {/* Content */}
        <div className="max-w-4xl mx-auto bg-white mt-11 rounded-xl shadow-lg p-6 space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Refund and Return Policy</h2>
          </div>

          <section>
            <div className="space-y-3 text-gray-700">
              <p>
                Thank you for shopping with <strong>Astrosight Services Pvt Ltd. </strong>We value your satisfaction and strive to provide quality products. Please review our refund and return policy below.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">1. Returns</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                We accept returns of products within <strong>3</strong> days of purchase.
              </p>
              <p>
                Items must be unused, in their original packaging, and in the same condition as received.
              </p>
              <p>
                To complete your return, we require a receipt or proof of purchase.
              </p>
              <p>
                <strong>Note:</strong> Certain items are non-returnable, including: digital products, customised products.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">2. Refunds</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                Once we receive and inspect your return, we will notify you of the approval or rejection of your refund.
              </p>
              <div className="ml-4 space-y-1 text-gray-700">
                <p>·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Approved refunds will be sent to you within 7 business days.</p>
                <p>·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A partial refund may be issued at our discretion for items that are not in their original condition, are damaged, or have missing parts for reasons not due to our error.</p>
                <p>·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Refunds will be issued through a method communicated to you at the time of approval.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">3. Exchanges</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                To initiate a return or exchange, please contact our customer support at <a href="mailto:admin@astrosight.ai" className="text-[#FF9D42] hover:underline">admin@astrosight.ai</a> or submit a return request through <a href="https://astrosight.ai/returns" className="text-[#FF9D42] hover:underline">https://astrosight.ai/returns</a> Our team will guide you through the process and provide necessary instructions.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">4. Shipping Returns</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                You are responsible for paying your own shipping costs for returning your item. Shipping costs are non-refundable.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">5. Force Majeure / Exceptional Circumstances</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                We are not liable for any delays in processing returns, exchanges, or refunds caused by circumstances beyond our reasonable control, including but not limited to natural disasters, strikes, government actions, or disruptions in transport or payment systems.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">6. Governing Law</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                This Refund and Cancellation Policy shall be governed by and construed in accordance with the laws of India, including the Consumer Protection Act, 2019, and other applicable laws. Any disputes arising under or in connection with this policy shall be subject to the exclusive jurisdiction of the courts located in Bengaluru.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#FF9D42] mb-3">7. Contact Us</h3>
            <div className="space-y-3 text-gray-700">
              <p>For questions or concerns regarding this policy, please contact us at:</p>
              <div className="bg-[#FFF6E9] p-4 rounded-lg space-y-1">
                <p><strong>Email:</strong> <a href="mailto:admin@astrosight.ai" className="text-[#FF9D42] hover:underline">admin@astrosight.ai</a></p>
                <p><strong>Phone:</strong> +918660128377</p>
                <p><strong>Address: </strong>Astrosight Services Pvt Ltd, 27th Main, P P Layout, Uttarahalli, Bengaluru 560061</p>
              </div>
            </div>
          </section>

          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              By using AstroSight, you acknowledge that you have read, understood, and agree to be bound by this Refund and Return Policy.
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

export default RefundAndReturnPolicyPage;
