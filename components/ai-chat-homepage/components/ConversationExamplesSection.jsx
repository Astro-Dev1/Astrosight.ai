import React, { useState } from 'react';
import Image from 'next/image';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ConversationExamplesSection = () => {
  const [activeCategory, setActiveCategory] = useState('career');

  const conversationCategories = [
    {
      id: 'career',
      name: 'Career Transitions',
      icon: 'Briefcase',
      color: 'primary'
    },
    {
      id: 'relationships',
      name: 'Relationship Guidance',
      icon: 'Heart',
      color: 'accent'
    },
    {
      id: 'spiritual',
      name: 'Spiritual Growth',
      icon: 'Sparkles',
      color: 'cosmic-purple'
    },
    {
      id: 'life',
      name: 'Life Transitions',
      icon: 'Compass',
      color: 'success'
    }
  ];

  const conversationExamples = {
    career: {
      title: "Career & Purpose Discovery",
      conversation: [
        {
          type: 'user',
          message: "I feel stuck in my corporate job but I'm scared to make a change. I don't even know what I really want to do."
        },
        {
          type: 'ai',
          message: "I can feel that restless energy in your chart. With your North Node in Aquarius and Jupiter in your 10th house, your soul is calling you toward innovative work that serves the collective good. Let's explore this together - when you were a child, what did you dream of becoming?"
        },
        {
          type: 'user',
          message: "I wanted to be a teacher, but my parents pushed me toward business. I still love helping people learn new things."
        },
        {
          type: 'ai',
          message: "That teaching impulse is your Sagittarius Midheaven speaking! Your current Saturn return is actually pushing you to align with your authentic purpose. The fear you're feeling? That's normal - Saturn is asking you to build something real and meaningful. What if we explored ways to blend your business skills with your teaching passion?"
        }
      ]
    },
    relationships: {
      title: "Relationship Patterns & Growth",
      conversation: [
        {
          type: 'user',
          message: "I keep attracting partners who are emotionally unavailable. It\'s like I\'m stuck in the same pattern over and over."
        },
        {
          type: 'ai',
          message: "Your Venus in Scorpio opposite Chiron is showing me a deep pattern here. You're drawn to intense, transformative connections, but there's a wound around trust and vulnerability. This isn't your fault - it's actually your soul's way of healing something profound. Tell me, what did love look like in your family growing up?"
        },
        {
          type: 'user',
          message: "My parents had a very distant relationship. They stayed together but never seemed truly connected."
        },
        {
          type: 'ai',
          message: "That explains so much. Your Scorpio Venus is seeking the deep intimacy you never witnessed, but your unconscious mind associates emotional availability with danger. The beautiful thing is, your current Pluto transit is giving you the power to transform this pattern completely. You're ready to attract a partner who can match your depth AND your need for security."
        }
      ]
    },
    spiritual: {
      title: "Spiritual Awakening & Growth",
      conversation: [
        {
          type: 'user',
          message: "I've been having these intense spiritual experiences lately - vivid dreams, synchronicities everywhere. It's overwhelming but also exciting."
        },
        {
          type: 'ai',
          message: "Your Neptune transit to your natal Moon is opening up your psychic channels in a powerful way. With your Pisces stellium, you're naturally intuitive, but this transit is amplifying everything. The overwhelm you're feeling is actually your consciousness expanding. How are you currently grounding this energy?"
        },
        {
          type: 'user',
          message: "I've started meditating more, but sometimes I feel like I'm losing touch with reality."
        },
        {
          type: 'ai',
          message: "That\'s a common experience with strong Neptune influences. Your Virgo rising is actually your anchor here - it\'s asking you to create practical structures for your spiritual practice. Think of it as building a bridge between the mystical and the mundane. What daily practices help you feel most centered and connected to both worlds?"
        }
      ]
    },
    life: {
      title: "Life Transitions & Timing",
      conversation: [
        {
          type: 'user',
          message: "Everything in my life is changing at once - new job, moving cities, ending a long relationship. I feel completely untethered."
        },
        {
          type: 'ai',
          message: "You're in the middle of a major Uranus transit to your 4th house - this is a once-in-a-lifetime shake-up of your foundations. It feels chaotic because Uranus is the planet of sudden change, but there's a deeper wisdom here. Your soul is clearing space for a completely new chapter. What feels most important to hold onto during this transition?"
        },
        {
          type: 'user',
          message: "I want to stay true to myself, but I'm not even sure who that is anymore."
        },
        {
          type: 'ai',
          message: "That uncertainty is actually perfect - it means you're shedding old identities that no longer serve you. Your progressed Sun is moving into a new sign, which happens only once every 30 years. You're literally becoming a new version of yourself. Instead of trying to figure out who you are, what if you focused on who you're becoming? What qualities do you want to cultivate in this new phase?"
        }
      ]
    }
  };

  const activeConversation = conversationExamples?.[activeCategory];

  return (
    <section className="py-3 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Decorative Heading Pattern */}
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
            See <span className="text-[#cf4526] font-kohinoor">AstroSight</span> in Action
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
            Explore real conversation examples across different life areas and discover how our AI creates personalized, meaningful guidance.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8">
          {conversationCategories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`flex items-center space-x-2 px-2 py-3 md:px-6 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                activeCategory === category?.id
                  ? 'bg-primary text-primary-foreground shadow-lg cosmic-glow'
                  : 'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <Icon name={category?.icon} size={20} />
              <span className="text-sm md:text-base">{category?.name}</span>
            </button>
          ))}
        </div>

        {/* Conversation Display */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-xl">{activeConversation?.title}</h3>
                  <p className="text-white/80">Real conversation example (anonymized)</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white/80 text-sm">Live AI</span>
                </div>
              </div>
            </div>

            {/* Conversation */}
            <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
              {activeConversation?.conversation?.map((message, index) => (
                <div key={index} className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message?.type === 'ai' && (
                    <div className="flex items-start space-x-3 max-w-3xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Brain" size={20} color="white" />
                      </div>
                      <div className="chat-bubble-ai p-4">
                        <p className="text-sm leading-relaxed">{message?.message}</p>
                      </div>
                    </div>
                  )}
                  
                  {message?.type === 'user' && (
                    <div className="flex items-start space-x-3 max-w-2xl">
                      <div className="chat-bubble-user p-4">
                        <p className="text-sm leading-relaxed">{message?.message}</p>
                      </div>
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="User" size={20} color="var(--color-text-secondary)" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Footer */}
            <div className="p-6 bg-muted/50 border-t border-border">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="font-semibold text-foreground">Ready to start your own cosmic conversation?</p>
                  <p className="text-sm text-text-secondary">Get personalized insights tailored to your unique birth chart</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" iconName="Eye" iconPosition="left">
                    Explore More Examples
                  </Button>
                  <Button iconName="MessageCircle" iconPosition="left" className="cosmic-glow">
                    Start Your Free Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Trust Elements */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="MessageSquare" size={32} color="white" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Personalized Responses</h4>
            <p className="text-text-secondary text-sm">Every answer is tailored to your unique birth chart and personal situation</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-cosmic-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Brain" size={32} color="white" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Empathetic AI</h4>
            <p className="text-text-secondary text-sm">Our AI understands context, emotions, and asks meaningful follow-up questions</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-success to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Sparkles" size={32} color="white" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Ancient Wisdom</h4>
            <p className="text-text-secondary text-sm">Thousands of years of astrological knowledge combined with modern insights</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversationExamplesSection;