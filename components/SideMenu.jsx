"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faNewspaper,
  faHeart,
  faCalendarAlt,
  faBrain,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const SideMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const menuItems = [
    { name: 'Home', href: '/', icon: faHome },
    { name: 'AI Chat', href: '/ai-chat-homepage', icon: faBrain },
    { name: 'Compatibility', href: '/compatibility', icon: faHeart },
    { name: 'Horoscope', href: '/horoscope/today-horoscope', icon: faCalendarAlt },
    { name: 'Panchanga', href: '/panchanga', icon: faCalendarAlt },
    { name: 'Blog', href: '/blog', icon: faNewspaper },
  ];

  const handleLoginClick = () => {
    window.open('https://app.astrosight.ai/auth', '_blank');
    onClose();
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0  bg-opacity-19 z-60"
        onClick={onClose}
      />
      
      {/* Side Menu */}
      <div className="fixed top-0 left-0 h-full w-80 shadow-2xl z-50 transform transition-transform duration-300 bg-white border-r-4 border-orange-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-orange-200 bg-orange-50">
          <div className="flex items-center space-x-2">
            <Image
              src="/log.png"
              alt="AstroSight Logo"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5 text-orange-600" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6 bg-white">
          <nav>
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-orange-50 hover:shadow-md transition-all duration-200 group w-full border border-transparent hover:border-orange-200"
                  >
                    <FontAwesomeIcon 
                      icon={item.icon} 
                      className="w-5 h-5 text-orange-600 group-hover:text-orange-700" 
                    />
                    <span className="text-gray-800 group-hover:text-orange-800 font-medium">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Login Button - Moved to Bottom */}
        <div className="border-t border-orange-200 p-4 bg-orange-50">
          <button
            onClick={handleLoginClick}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
            <span>Login to AstroSight</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
