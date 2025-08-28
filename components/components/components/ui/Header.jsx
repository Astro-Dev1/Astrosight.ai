import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import Icon from '../AppIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'AI Chat', path: '/ai-chat-homepage', icon: 'MessageCircle' },
    { name: 'Live Interaction', path: '/live-ai-interaction-center', icon: 'Zap' },
    { name: 'Insights Hub', path: '/personalized-insights-hub', icon: 'Brain' },
    { name: 'Expert Network', path: '/expert-network-human-connection', icon: 'Users' }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-cosmic border-b border-border">
      <div className="cosmic-particles">
        <div className="cosmic-particle" style={{ left: '10%', animationDelay: '0s' }}></div>
        <div className="cosmic-particle" style={{ left: '25%', animationDelay: '2s' }}></div>
        <div className="cosmic-particle" style={{ left: '40%', animationDelay: '4s' }}></div>
        <div className="cosmic-particle" style={{ left: '60%', animationDelay: '1s' }}></div>
        <div className="cosmic-particle" style={{ left: '80%', animationDelay: '3s' }}></div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/ai-chat-homepage" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center cosmic-glow">
                <Icon name="Sparkles" size={24} color="white" className="group-hover:animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-bold text-xl gradient-text">
                AstroSight AI
              </span>
              <span className="font-mono text-xs text-text-secondary hidden sm:block">
                Intelligent Mysticism
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-cosmic'
                    : 'text-foreground hover:bg-muted hover:text-primary'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}
          </nav>

          {/* Trust Indicators */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 trust-indicator">
              <Icon name="Shield" size={16} color="var(--color-success)" />
              <span className="text-xs text-text-secondary font-mono">Encrypted</span>
            </div>
            <div className="flex items-center space-x-2 trust-indicator">
              <Icon name="Users" size={16} color="var(--color-primary)" />
              <span className="text-xs text-text-secondary font-mono">100K+ Chats</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              iconName="MessageSquare"
              iconPosition="left"
              className="font-inter"
            >
              Free Chat
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Sparkles"
              iconPosition="left"
              className="cosmic-glow font-inter"
            >
              Start Reading
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/98 backdrop-blur-cosmic">
            <div className="px-4 py-4 space-y-3">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-cosmic'
                      : 'text-foreground hover:bg-muted hover:text-primary'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.name}</span>
                </Link>
              ))}
              
              {/* Mobile Trust Indicators */}
              <div className="flex items-center justify-center space-x-6 pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} color="var(--color-success)" />
                  <span className="text-xs text-text-secondary font-mono">Encrypted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} color="var(--color-primary)" />
                  <span className="text-xs text-text-secondary font-mono">100K+ Chats</span>
                </div>
              </div>
              
              {/* Mobile CTA Buttons */}
              <div className="flex flex-col space-y-3 pt-4">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="MessageSquare"
                  iconPosition="left"
                  className="font-inter"
                >
                  Start Free Chat
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  iconName="Sparkles"
                  iconPosition="left"
                  className="cosmic-glow font-inter"
                >
                  Get Your Reading
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;