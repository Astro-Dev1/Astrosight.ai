import React from 'react';
import Link from 'next/link';

const CustomLinkButton = ({ headline, buttonText, buttonPath }) => {
  return (
    <div className="bg-gradient-to-r from-orange-400 via-orange-200 to-white  p-6 rounded-lg shadow-lg text-center">
      {/* Headline */}
      <h2 className="text-2xl font-semibold text-orange-800 mb-4">
        {headline}
      </h2>

      {/* Button as Link */}
      <Link
        href={buttonPath}
        className="bg-gradient-to-r from-orange-400 via-orange-200 to-white 
                   text-orange-900 font-medium px-6 py-3 rounded-md shadow-md 
                   hover:from-orange-500 hover:to-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default CustomLinkButton;
