import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ title, description, icon, link }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-astro-dark-beige p-6 hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="mb-4 text-astro-orange">{icon}</div>
      <h3 className="text-xl font-serif font-medium mb-3 text-astro-text">{title}</h3>
      <p className="text-astro-text-light mb-6 flex-grow">{description}</p>
      <Link 
        to={link} 
        className="text-astro-orange hover:text-astro-light-orange transition-colors duration-300 font-medium text-sm flex items-center"
      >
        Learn more
      </Link>
    </div>
  );
};

export default ServiceCard;
