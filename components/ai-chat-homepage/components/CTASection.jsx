import React from 'react';
import Link from 'next/link';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from 'next/image';
const CTASection = () => {
  const ctaOptions = [
    {
      id: 'primary',
      title: 'Start Your Free Cosmic Conversation',
      description: 'Begin your personalized astrological journey with our AI. No credit card required.',
      buttonText: 'Chat Now - It\'s Free',
      buttonVariant: 'default',
      buttonIcon: 'MessageCircle',
      link: '/live-ai-interaction-center',
      highlight: true,
      features: [
        'Instant personalized insights',
        'No registration required',
        'End-to-end encrypted',
        'Available 24/7'
      ]
    },
    {
      id: 'secondary',
      title: 'Explore Sample Readings',
      description: 'See detailed examples of AI-generated reports and discover what\'s possible.',
      buttonText: 'View Sample Reports',
      buttonVariant: 'outline',
      buttonIcon: 'FileText',
      link: '/personalized-insights-hub',
      highlight: false,
      features: [
        'Real anonymized examples',
        'Different report types',
        'Interactive previews',
        'No commitment needed'
      ]
    },
    {
      id: 'discovery',
      title: 'Meet Our AI & Expert Network',
      description: 'Learn about our technology and connect with human astrologers when you need them.',
      buttonText: 'Discover Our Approach',
      buttonVariant: 'ghost',
      buttonIcon: 'Users',
      link: '/expert-network-human-connection',
      highlight: false,
      features: [
        'AI methodology explained',
        'Expert astrologer profiles',
        'Hybrid AI-human approach',
        'Transparent process'
      ]
    }
  ];

  const trustStats = [
    {
      icon: 'MessageSquare',
      number: '100K+',
      label: 'Conversations',
      description: 'Personalized chats completed'
    },
    {
      icon: 'Users',
      number: '25K+',
      label: 'Happy Users',
      description: 'People finding cosmic clarity'
    },
    {
      icon: 'Star',
      number: '4.9/5',
      label: 'User Rating',
      description: 'Average satisfaction score'
    },
    {
      icon: 'Shield',
      number: '100%',
      label: 'Private',
      description: 'Encrypted conversations'
    }
  ];

  return (
    <section className="py-20   relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="cosmic-particles">
          <div className="cosmic-particle" style={{ left: '5%', top: '15%', animationDelay: '0s' }}></div>
          <div className="cosmic-particle" style={{ left: '20%', top: '80%', animationDelay: '2s' }}></div>
          <div className="cosmic-particle" style={{ left: '70%', top: '20%', animationDelay: '4s' }}></div>
          <div className="cosmic-particle" style={{ left: '90%', top: '70%', animationDelay: '1s' }}></div>
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Statistics */}
        <div className="text-center mb-16">
                    <div className="flex items-start p-3 justify-center md:gap-[18px] gap-[9px] mb-6">
                      {/* Left pattern image */}
                      <Image
                        alt="Heading pattern"
                        src="/hed.png"
                        width={250}
                        height={250}
                        loading="lazy"
                        decoding="async"
                        className="md:w-10 w-[40px] md:h-[40px] h-[30px] -rotate-90"
                        style={{ color: 'transparent' }}
                      />
                      
                      
                    <h2 className="text-4xl font-bold font-kohinoor lg:text-[36px] text-center">
            Join Thousands Finding Their <span className="text-[#cf4526] font-kohinoor">Cosmic Truth</span>
          </h2>
                      {/* Right pattern image rotated 180 degrees */}
                      <Image
                        alt="Heading pattern"
                        src="/hed.png"
                        width={250}
                        height={250}
                        loading="lazy"
                        decoding="async"
                        className="md:w-10 w-[40px] md:h-[40px] h-[30px] rotate-90"
                        style={{ color: 'transparent' }}
                      />
                    </div>
          
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-12">
            Experience the difference of AI that truly understands your unique astrological blueprint.
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {trustStats?.map((stat) => (
              <div key={stat?.label} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 cosmic-glow">
                  <Icon name={stat?.icon} size={32} color="white" />
                </div>
                <div className="text-3xl font-headline font-bold text-foreground mb-1">{stat?.number}</div>
                <div className="font-semibold text-primary mb-1">{stat?.label}</div>
                <div className="text-sm text-text-secondary">{stat?.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Options */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {ctaOptions?.map((option) => (
            <div 
              key={option?.id} 
              className={`relative bg-card rounded-2xl p-8 border transition-all duration-300 ${
                option?.highlight 
                  ? 'border-primary shadow-2xl cosmic-glow scale-105' 
                  : 'border-border shadow-lg hover:shadow-xl card-hover'
              }`}
            >
              {option?.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-headline font-bold mb-3">{option?.title}</h3>
                <p className="text-text-secondary leading-relaxed">{option?.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {option?.features?.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Icon name="Check" size={16} color="var(--color-success)" className="flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={option?.link} className="block">
                <Button
                  variant={option?.buttonVariant}
                  size="lg"
                  fullWidth
                  iconName={option?.buttonIcon}
                  iconPosition="left"
                  className={`font-semibold ${option?.highlight ? 'cosmic-glow' : ''}`}
                >
                  {option?.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Final Trust Message */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 lg:p-12 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Icon name="Shield" size={32} color="var(--color-success)" />
              <Icon name="Heart" size={32} color="var(--color-primary)" />
              <Icon name="Sparkles" size={32} color="var(--color-accent)" />
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-headline font-bold mb-4">
              Your Cosmic Journey Starts Here
            </h3>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              Experience the first AI astrology platform that combines ancient wisdom with modern intelligence. 
              Your conversations are private, your insights are personalized, and your cosmic truth awaits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Clock" size={16} />
                <span>Available 24/7</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="CreditCard" size={16} />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Zap" size={16} />
                <span>Instant insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;