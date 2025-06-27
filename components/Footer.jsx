import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg bg-gradient-to-br from-rose-200 to-white justify-center font-serif  py-8">
      {/* About Section */}
      <div className="text-center px-4 mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-rose-500 bg-clip-text text-transparent   border-b-2 border-yellow-600 inline-block pb-1">
          About AstroSight
        </h2>
        <p className="text-sm bg-gradient-to-r from-purple-500 to-rose-500 bg-clip-text text-transparent mt-3">
          AstroSight is the leading platform for online astrology predictions. <br />
          Get insights into your future with our expert astrologers and personalized reports.
        </p>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto bg-gradient-to-r from-purple-500 to-rose-500 bg-clip-text text-transparent px-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {/* Recent Blogs Section */}
       

        {/* Horoscopes Section */}
        <div>
          <h3 className="font-bold mb-4 border-b-2 border-yellow-600 pb-1 inline-block">
            Horoscopes
          </h3>
          <div className="space-y-2">
            {[
              'aries',
              'taurus',
              'gemini',
              'cancer',
              'leo',
              'virgo',
              'libra',
              'scorpio',
              'sagittarius',
              'capricorn',
              'aquarius',
              'pisces',
            ].map((sign) => (
              <div key={sign}>
                <Link href={`/horoscope/Todays/${sign}`} className="hover:underline">
                  {sign.charAt(0).toUpperCase() + sign.slice(1)} Horoscope
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Compatibility Section */}
        <div>
          <h3 className="font-bold mb-4 border-b-2 border-yellow-600 pb-1 inline-block">
            Compatibility
          </h3>
          <div className="space-y-2">
            {[
              'aries',
              'taurus',
              'gemini',
              'cancer',
              'leo',
              'virgo',
              'libra',
              'scorpio',
              'sagittarius',
              'capricorn',
              'aquarius',
              'pisces',
            ].map((sign) => (
              <div key={sign}>
                <Link href={`/compatibility/${sign}`} className="hover:underline">
                  {sign.charAt(0).toUpperCase() + sign.slice(1)} Compatibility
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-4 border-b-2 border-yellow-600 pb-1 inline-block">
            Recent Blogs
          </h3>
          <div className="space-y-2">
            {[
              {
                title: 'Ultimate Guide to Astrology-Based Diwali Home Decor',
                slug: 'ultimate-guide-to-astrology-based-diwali-home-decor-for-2024',
              },
              {
                title: 'Powerful Diwali Rituals to Resolve Kundali Doshas',
                slug: 'powerful-diwali-rituals-to-resolve-kundali-doshas-and-planetary-imbalances',
              },
              {
                title: 'Diwali 2024 Puja Muhurat',
                slug: 'diwali-2024-puja-muhurat-your-complete-guide-to-auspicious-timings',
              },
              {
                title: 'Understanding Saturn’s Impact on Financial Life',
                slug: 'understanding-saturns-impact-on-your-financial-life',
              },
            ].map((blog) => (
              <div key={blog.slug}>
                <Link href={`/blog/${blog.slug}`} className="hover:underline">
                  {blog.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* Policies & Info Section */}
        <div>
          <h3 className="font-bold mb-4 border-b-2 border-yellow-600 pb-1 inline-block">
            Policies & Info
          </h3>
          <div className="space-y-2">
            <div>
              <Link href="/PrivacyPolicy" className="hover:underline">
                Privacy Policy
              </Link>
            </div>
            <div>
              <Link href="/TermsAndConditions" className="hover:underline">
                Terms and Conditions
              </Link>
            </div>
            <div>
              <Link href="/contact" className="hover:underline">
                Contact Us
              </Link>
            </div>
            <div>
              <Link href="/shipping-policy" className="hover:underline">
                Shipping Policy
              </Link>
            </div>
            <div>
              <Link href="/cancellation-refund-policy" className="hover:underline">
                Cancellation / Refund Policy
              </Link>
            </div>
            <div>
              <Link href="/panchanga" className="hover:underline">
                Panchanga
              </Link>
            </div>
            <div>
              <Link href="/guidance-report" className="hover:underline">
                Guidance Report
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-8 text-sm">
        <p>&copy; 2025 Powered by TheNewsism. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
