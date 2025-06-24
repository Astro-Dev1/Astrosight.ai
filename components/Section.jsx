import React from 'react';

const Section = ({ title, children }) => {
  return (
    <div className="max-w-4xl mx-auto mt-8 pt-6  bg-white   rounded-lg shadow-sm">
      <h2 className="text-3xl font-semibold text-orange-600 mb-6 text-center">{title}</h2>
      <div className="p-4 bg-orange-200 bg-opacity-50 backdrop-blur-lg rounded-b-lg shadow-lg mb-6">
        {children}
      </div>
    </div>
  );
};

export default Section;
