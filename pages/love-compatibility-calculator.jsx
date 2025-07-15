import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const LoveCompatibilityCalculator = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new dynamic route
    router.replace('/report/love-compatibility-calculator');
  }, [router]);

  return (
    <>
      <Head>
        <title>Love Compatibility Calculator | AstroSight</title>
        <meta name="description" content="Redirecting to Love Compatibility Calculator..." />
      </Head>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to Love Compatibility Calculator...</p>
        </div>
      </div>
    </>
  );
};

export default LoveCompatibilityCalculator;
