import React from 'react';
import Icon from '../../components/AppIcon';
import Image from 'next/image';

const TrustBuildingSection = () => {
  const trustSections = [
    {
      id: 1,
      icon: "Brain",
      title: "Ancient Wisdom Meets AI Precision",
      description: "Our AI is trained on thousands of years of astrological knowledge, combined with modern psychological insights and personalized conversation patterns.",
      features: [
        "Comprehensive astrological database integration",
        "Real-time birth chart analysis and interpretation",
        "Continuous learning from every conversation",
        "Transparent methodology and source citations"
      ],
      gradient: "from-primary to-accent"
    },
    {
      id: 2,
      icon: "MessageSquare",
      title: "Real Conversations, Real Insights",
      description: "See how our AI creates meaningful, personalized guidance through genuine understanding of your unique cosmic blueprint.",
      features: [
        "Personalized responses based on your birth chart",
        "Empathetic questioning that reveals deeper insights",
        "Context-aware conversations that build over time",
        "Anonymous testimonials from real users"
      ],
      gradient: "from-secondary to-cosmic-purple"
    },
    {
      id: 3,
      icon: "Shield",
      title: "Your Privacy, Our Promise",
      description: "Your cosmic conversations are protected with enterprise-grade security and complete transparency about data usage.",
      features: [
        "End-to-end encryption for all conversations",
        "No personal data shared with third parties",
        "Complete conversation history control",
        "GDPR compliant with transparent policies"
      ],
      gradient: "from-success to-accent"
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "The AI knew things about my personality that I\'d never told anyone. It connected my Mars placement to my career frustrations in a way that finally made sense.",
      author: "Sarah M.",
      sign: "Virgo Sun, Scorpio Rising",
      accuracy: "98%"
    },
    {
      id: 2,
      quote: "Instead of generic predictions, it asked me deep questions about my relationships that led to real breakthroughs. It's like having a cosmic therapist.",
      author: "Michael R.",
      sign: "Leo Sun, Aquarius Moon",
      accuracy: "96%"
    },
    {
      id: 3,
      quote: "The AI understood my spiritual journey better than most humans. It helped me see patterns I\'d been blind to for years.",
      author: "Luna K.",
      sign: "Pisces Sun, Gemini Rising",
      accuracy: "99%"
    }
  ];

  return (
    <section className="py-20  font-kohinoor from-muted to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="cosmic-particles">
          <div className="cosmic-particle" style={{ left: '15%', top: '25%', animationDelay: '1s' }}></div>
          <div className="cosmic-particle" style={{ left: '85%', top: '75%', animationDelay: '3s' }}></div>
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Why <span className="text-[#cf4526] font-kohinoor">AstroSight</span> is Different
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

          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            We've revolutionized astrology by combining ancient wisdom with cutting-edge AI that actually understands you as an individual.
          </p>
        </div>

        {/* Trust Building Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {trustSections?.map((section) => (
            <div key={section?.id} className="bg-card rounded-2xl p-8 shadow-lg border border-border card-hover">
              <div className={`w-16 items-center justify-center h-16 bg-gradient-to-br ${section?.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                <Icon name={section?.icon} size={32} color="white" />
              </div>
              
              <h3 className="text-2xl font-headline font-bold mb-4">{section?.title}</h3>
              <p className="text-text-secondary mb-6 leading-relaxed">{section?.description}</p>
              
              <ul className="space-y-3">
                {section?.features?.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Icon name="Check" size={16} color="var(--color-success)" className="mt-1 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* User Testimonials */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-headline font-bold mb-4">Real People, Real Transformations</h3>
            <p className="text-text-secondary text-lg">
              See how our AI's personalized insights have helped thousands discover their cosmic truth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials?.map((testimonial) => (
              <div key={testimonial?.id} className="bg-card rounded-xl p-6 shadow-md border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Quote" size={20} color="var(--color-primary)" />
                    <span className="text-sm font-medium text-primary">Verified User</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Target" size={16} color="var(--color-success)" />
                    <span className="text-sm font-mono text-success">{testimonial?.accuracy} Accuracy</span>
                  </div>
                </div>
                
                <blockquote className="text-foreground mb-4 leading-relaxed">
                  "{testimonial?.quote}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{testimonial?.author}</p>
                    <p className="text-sm text-text-secondary">{testimonial?.sign}</p>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={16} color="var(--color-accent)" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBuildingSection;