import Link from 'next/link';

export default function Footer() {
    const types = ["today", "weekly", "monthly", "yearly"];

  return (
    <footer className=" justify-center font-kohinoor py-8">
      {/* About Section */}
      <div className="text-center px-4 mb-6">
        <h2 className="text-3xl font-kohinoor font-bold text-white border-b-2 border-[#cf4526] inline-block pb-1">
          About AstroSight
        </h2>
        <p className="text-sm font-kohinoor text-white mt-3">
          AstroSight is the leading platform for online astrology predictions. <br />
          Get insights into your future with our expert astrologers and personalized reports.
        </p>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {/* Recent Blogs Section */}
        {/* Horoscopes Section */}
        <div>
          <h3 className="font-bold mb-4 border-b-2 font-kohinoor border-[#cf4526] pb-1 inline-block text-white">
            Horoscopes
          </h3>
          <div className="space-y-2">
            {[
              'aries',
              'taurus',
              
              
            ].map((sign) => (
              <div key={sign}>
                {types.map((type) => (
                  <Link key={type} href={`/horoscope/${type}-horoscope/${sign}`} className="hover:underline font-kohinoor text-white">
                    {sign.charAt(0).toUpperCase() + sign.slice(1)} {type.charAt(0).toUpperCase() + type.slice(1)} Horoscope <br />
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Compatibility Section */}
        <div>
          <h3 className="font-bold font-kohinoor mb-4 border-b-2 border-[#cf4526] pb-1 inline-block text-white">
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
                <Link href={`/compatibility/${sign}`} className="hover:underline font-kohinoor text-white">
                  {sign.charAt(0).toUpperCase() + sign.slice(1)} Compatibility
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-4 border-b-2 border-[#cf4526] pb-1 inline-block font-kohinoor text-white">
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
                <Link href={`/blog/${blog.slug}`} className="hover:underline font-kohinoor text-white">
                  {blog.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* Policies & Info Section */}
        <div>
          <h3 className="font-bold mb-4 border-b-2 border-[#cf4526] pb-1 inline-block font-kohinoor text-white">
            Policies & Info
          </h3>
          <div className="space-y-2">
            <div>
              <Link href="/privacy-policy" className="hover:underline font-kohinoor text-white">
                Privacy Policy
              </Link>
            </div>
            <div>
              <Link href="/terms-and-conditions" className="hover:underline font-kohinoor text-white">
                Terms and Conditions
              </Link>
            </div>
            <div>
              <Link href="/contact" className="hover:underline font-kohinoor text-white">
                Contact Us
              </Link>
            </div>
            <div>
              <Link href="/shipping-policy" className="hover:underline font-kohinoor text-white">
                Shipping Policy
              </Link>
            </div>
            
            <div>
              <Link href="/panchanga" className="hover:underline font-kohinoor text-white">
                Panchanga
              </Link>
            </div>
            <div>
              <Link href="/refund-and-return-policy" className="hover:underline font-kohinoor   text-white">
                Refund and Return Policy
              </Link>
            </div>
            <div>
              <Link href="/about-us" className="hover:underline font-kohinoor   text-white">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Social Media Links */}
      <div className="flex justify-center my-7 gap-6">
        {/* Facebook */}
        <a
          href="https://www.facebook.com/astrosight"
          aria-label="Facebook"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
        >
          <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7 text-blue-600 bg-white rounded-full p-[2px]">
            <path d="M13.6 21v-7.2h2.187l.326-2.53H13.6v-1.614c0-.732.203-1.232 1.254-1.232H16V6.039C15.807 6.013 15.027 5.96 14.109 5.96c-2.009 0-3.049 1.145-3.049 3.25V11.27H8V13.8h3.06V21h2.54z" />
          </svg>
        </a>
        {/* Instagram */}
        <a
          href="https://www.instagram.com/astrosight.ai/#"
          aria-label="Instagram"
          target="_blank"
          rel="noopener noreferrer"
           className="hover:scale-110 transition-transform"
        >
          <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7 bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-full p-[2px] text-white">
            <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zm5 2a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 6zm0 2a3 3 0 1 1 0 6A3 3 0 0 1 12 8zm6-1a1 1 0 1 0 .001 2.001A1 1 0 0 0 18 7z" />
          </svg>
        </a>
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/company/astrosight-ai/"
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
        >
          <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7 text-[#0A66C2] bg-white rounded-full p-[2px]">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zM7 19h-3v-9h3v9zm-1-10.3c-.966 0-1.75-.785-1.75-1.75S5.034 5.2 6 5.2s1.75.784 1.75 1.75-.784 1.75-1.75 1.75zM19 19h-3v-4.903c0-1.172-.021-2.681-1.632-2.681-1.631 0-1.882 1.276-1.882 2.596V19h-3v-9h2.882v1.233h.041c.403-.764 1.384-1.57 2.85-1.57 3.048 0 3.611 2.007 3.611 4.618V19z" />
          </svg>
        </a>
        {/* YouTube */}
        <a
          href="https://youtube.com/@astrosightai"
          aria-label="YouTube"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
        >
          <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7 text-red-600 bg-white rounded-full p-[2px]">
            <path d="M23.498 6.186a2.997 2.997 0 0 0-2.127-2.123C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.371.563A2.997 2.997 0 0 0 .502 6.186C0 8.034 0 12 0 12s0 3.966.502 5.814a2.995 2.995 0 0 0 2.127 2.122C4.6 20.5 12 20.5 12 20.5s7.4 0 9.371-.563a2.995 2.995 0 0 0 2.127-2.122C24 15.966 24 12 24 12s0-3.966-.502-5.814zM9.545 15.568v-7.136l6.545 3.568-6.545 3.568z" />
          </svg>
        </a>
      </div>
      

      {/* Footer Bottom */}
      <div className="text-center mt-8 text-sm text-white">
        <p>&copy; 2025 Powered by AstroSight. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
