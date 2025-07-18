import Image from 'next/image';
import Link from 'next/link';


const Hero = () => {
  return (
    <section className="py-3 md:py-10 lg:py-3 bg-gradient-to-b from-astro-light-beige to-white min-h-[calc(100vh-64px)] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left column - Text content */}
          <div className="space-y-6 animate-fade-in text-center  text-[25.4px] lg:text-left">
          <div className='text-3xl/8 text-[#3A3026] px-auto font-semibold'><span className="text-[#FF6D3F] text-3xl">astrosight</span>, Transforming Ancient Astrological Wisdom Into Actionable Modern Guidance
          </div>
          <div className="md:flex md:flex-row md:items-start md:justify-between">
  <p className="text-base/5 sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
  Receive AI-Powered Horoscopes, Unlock Your Cosmic Blueprint, and Find Answers to Life&apos;s Burning Questions
  </p>

  <div className="hidden md:flex relative -top-3 flex-col items-center lg:items-center  md:mt-0 md:ml-6">
  
    <img
      src="/QR_code_for_mobile_English_Wikipedia.svg.png"
      alt="QR Code for App Download"
      width={300}
      height={300}
      className="rounded-lg"
    />
      <p className="text-gray-600 text-center text-[12px] 
    ">Scan to download</p>
  </div>

</div>
<div className="flex flex-row lg:hidden items-center justify-center gap-4">
              <Link href="https://astrosight.com/download" passHref>
              <div class="flex mt-3 md:w-48 md:h-14 w-[150px] h-[45px] bg-black text-white rounded-lg items-center justify-center cursor-pointer hover:shadow-xl"><div class="mr-3"><svg viewBox="30 336.7 120.9 129.2" width="20"><path fill="#FFD400" d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"></path><path fill="#FF3333" d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"></path><path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"></path><path fill="#3BCCFF" d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"></path></svg></div><div><div class="md:text-xs text-[12px] uppercase">Download on</div><div class="md:text-xl text-sm font-semibold font-sans -mt-1">Play Store</div></div></div>

              </Link>
              <Link href="https://astrosight.com/download" passHref>
              <div class="flex mt-3 md:w-48 md:h-14 w-[150px] h-[45px] bg-black text-white rounded-lg items-center justify-center cursor-pointer hover:shadow-xl"><div class="mr-3"><svg viewBox="0 0 384 512" width="20"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg></div><div><div class="md:text-xs text-[12px] uppercase">Download on</div><div class="md:text-xl text-sm font-semibold font-sans -mt-1">Play Store</div></div></div>

              </Link>
            </div>
            
            
          </div>

          {/* Right column - Image */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
      <picture>
        {/* Desktop image for lg (1024px) and above */}
        <source
          media="(min-width: 1024px)"
          srcSet="/Untitled design (5) (1).webp"
          width={328}
          height={516}
        />
        {/* Mobile image for below lg */}
        <source
          media="(max-width: 1023px)"
          srcSet="/Untitled design (6) (1).webp"
          width={328}
          height={299.88}
        />
        {/* Fallback Image component */}
        <Image
          src="/Untitled design (6) (1).webp" // Default for browsers without picture support
          alt="Guidance Report Preview"
          width={328}
          height={299.88}
          className="w-full h-[299.88px] lg:h-[516px] rounded-2xl object-cover"
          priority
          sizes="(max-width: 1023px) 100vw, (min-width: 1024px) 328px"
        />
      </picture>
    </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;