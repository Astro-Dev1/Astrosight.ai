import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const DashaCalculator = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new dynamic route
    router.replace('/report/dasha-calculator');
  }, [router]);

  return (
    <>
      <Head>
        <title>Dasha Calculator | AstroSight</title>
        <meta name="description" content="Redirecting to Dasha Calculator..." />
      </Head>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to Dasha Calculator...</p>
        </div>
      </div>
    </>
  );
};

export default DashaCalculator;
