import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Footer from '../components/Footer';
const BirthChartCalculator = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new dynamic route
    router.replace('/report/birth-chart-calculator');
  }, [router]);

  return (
    <>
      <Head>
        <title>Birth Chart Calculator | AstroSight</title>
        <meta name="description" content="Redirecting to Birth Chart Calculator..." />
      </Head>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to Birth Chart Calculator...</p>
        </div>
              {/* Additional Info Section */}
                <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Why Choose Our Astrology Calculators?
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="text-4xl mb-4">🎯</div>
                      <h3 className="text-xl font-semibold mb-2">Accurate Calculations</h3>
                      <p className="text-gray-600">
                        Based on traditional Vedic astrology principles with modern precision
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-4">🚀</div>
                      <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
                      <p className="text-gray-600">
                        Get your astrological insights immediately with our fast calculators
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-4">💝</div>
                      <h3 className="text-xl font-semibold mb-2">Completely Free</h3>
                      <p className="text-gray-600">
                        All our astrology tools are free to use with no hidden charges
                      </p>
                    </div>
                  </div>
                </div>
      
                {/* SEO Content */}
                <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    Comprehensive Astrology Tools for Everyone
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 mb-4">
                      Welcome to AstroSight&apos;s comprehensive collection of astrology calculators and tools. 
                      Whether you&apos;re a beginner exploring astrology or an experienced practitioner, our 
                      free calculators provide accurate insights based on Vedic astrology principles.
                    </p>
                    <p className="text-gray-700 mb-4">
                      Our birth chart calculator generates detailed natal charts with precise planetary 
                      positions, while our compatibility calculator helps you understand relationship 
                      dynamics. The Dasha calculator reveals your planetary periods and their influence 
                      on different life phases.
                    </p>
                    <p className="text-gray-700">
                      We&apos;re continuously expanding our toolkit with new calculators for numerology, 
                      palmistry, tarot, gemstone recommendations, and more. Each tool is designed 
                      to provide meaningful insights into your personality, relationships, career, 
                      and life path.
                    </p>
                  </div>
                </div>
            <Footer />
      </div>
     
    </>
  );

};

export default BirthChartCalculator;
