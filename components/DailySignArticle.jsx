// components/DailyHoroscopeFull.jsx
import React from 'react';

const dailyArticles = {
  aries: {
    slug: '/todays-horoscope/aries',
    h1: 'Aries Daily Horoscope',
    intro: `"There is no force more powerful than an Aries with a clear purpose and the stars on their side."
As someone who has walked the path of Jyotish Shastra for over two decades, I often say this to my clients. And it holds true—especially on days when the cosmic currents favor action, courage, and clarity.

Today, let’s dive deep into the Aries Daily Horoscope, blending age-old Vedic wisdom with practical, daily guidance. And before we start, let me tell you—at AstroSight, we take astrology seriously. Our predictions, remedies, and consultations are not casual readings. They are anchored in classical texts, precise planetary calculations, and the deep, lived wisdom I have cultivated through years of karmic astrology work.`,
    sections: [
      {
        h2: 'Aries Horoscope Today Overview',
        h3s: [
          {
            h3: 'General Vibes & Cosmic Energy',
            content: `Today, Aries, Jupiter blesses you with its expansive grace. There's an unusual lightness in the air, a feeling that perhaps everything is possible. This isn't just optimism—it's the universe nudging you toward bold action.

I remember once advising a client, a young entrepreneur, on a similar day when Mars and Jupiter were in favorable positions. She hesitated to launch her handmade crafts store. I told her, "Today, the universe will reward those who leap." She did. That leap of faith? It became her most profitable day ever.

Just like that, today's alignment favors movement, decisiveness, and courage. Aries, you shine brightest when you follow your instincts.`
          },
          {
            h3: 'Daily wisdom quote',
            content: `"Courage opens doors that hesitation keeps locked."`
          }
        ]
      },
      {
        h2: 'Aries Love Horoscope Today',
        h3s: [
          {
            h3: 'For Singles',
            content: `For single Aries, today invites you to look beyond the ordinary. Attend that meetup. Join that hobby class. Sometimes, love comes dressed as a stranger in your favorite coffee shop.

One of my students once shared, "Ma'am, I met my partner in an online art forum during a fiery Aries transit!" It's not surprising. Aries thrives when connecting through passion and curiosity.`
          },
          {
            h3: 'For Couples',
            content: `Coupled Aries, plan an adventure together. It could be a short road trip or simply cooking a new recipe at home. Fresh experiences rekindle the flame.`
          },
          {
            h3: 'Tips for Strengthening Emotional Bonds',
            content: `Express your dreams aloud. Aries sometimes forget that vulnerability is a strength. Let your partner into your world of ambitions and watch how love grows.`
          }
        ]
      },
      {
        h2: 'Aries Career Horoscope Today',
        h3s: [
          {
            h3: 'Workplace Dynamics & Opportunities',
            content: `Career-wise, today is bursting with opportunities. You might feel restless at work—and that's okay. Restlessness often signals your soul seeking a challenge.

Propose that new idea, Aries. Your leadership energy is peaking, and others will be more receptive than you think.`
          },
          {
            h3: 'Challenges Aries Might Face Today',
            content: `Beware of frustration creeping in if others don't match your pace. Remember, not everyone moves with Aries speed. Patience will be your secret superpower today.`
          },
          {
            h3: 'Career Growth Tips for Aries',
            content: `Pitch boldly but back your proposals with logic. In Vedic astrology, I always remind my Aries clients that Mars energy works best when tempered with strategy (a lesson from Phala Deepika).`
          }
        ]
      },
      {
        h2: 'Aries Money Horoscope Today',
        h3s: [
          {
            h3: 'Financial Opportunities & Warnings',
            content: `Today's alignment brings financial openings, particularly in areas you've researched thoroughly. But I always caution my clients: Aries enthusiasm sometimes tempts you to jump before checking the depth of the water.

Avoid impulse purchases today. Instead, channel that energy into investments with long-term value.`
          },
          {
            h3: 'Smart Money Moves for Aries Today',
            content: `Consider consulting a financial expert or a mentor. Sometimes, a grounded third eye can help channel your fiery instincts wisely.`
          }
        ]
      },
      {
        h2: 'Aries Health Horoscope Today',
        h3s: [
          {
            h3: 'Physical Wellness & Energy Levels',
            content: `Your body feels charged today, Aries. Try a challenging workout or outdoor sport. But—and I speak from seeing countless charts—don't push beyond your limits. Overexertion is a known Achilles heel for fiery signs like you.`
          },
          {
            h3: 'Emotional & Mental Health Focus',
            content: `Mentally, you're sharp but prone to scattering your energy. Ground yourself with short meditation breaks. Even five minutes can help channel that Aries mental fire into focus.`
          },
          {
            h3: 'Self-Care Rituals Recommended for Aries',
            content: `Burn calming incense in your space or wear a Mangal Yantra to harmonize your Martian energies. These are ancient remedies I prescribe often—simple, yet deeply effective.`
          }
        ]
      },
      {
        h2: 'Aries Sign Attributes',
        h3s: [
          {
            h3: 'Key Traits of Aries Zodiac Sign',
            content: `Aries are natural-born leaders, trailblazers, and warriors of the zodiac. You move first and think later. That's your gift—and your lesson.`
          },
          {
            h3: 'Strengths & Weaknesses',
            content: `Strength: Courage. Weakness: Impatience.

When Aries masters the art of thoughtful action, no mountain is too high.`
          },
          {
            h3: 'How These Traits Affect Aries Daily Life',
            content: `In daily life, this means you often spark change around you, Aries. People follow your energy. Use this responsibly.`
          }
        ]
      },
      {
        h2: 'Aries Compatibility Chart',
        h3s: [
          {
            h3: 'Best Matches for Today',
            content: `Gemini, Leo, Sagittarius, Aquarius, Aries, Libra`
          },
          {
            h3: 'Signs to Approach with Caution',
            content: `Taurus, Virgo, Scorpio, Pisces, Cancer, Capricorn`
          }
        ]
      },
      {
        h2: 'Frequently Asked Questions',
        h3s: [
          {
            h3: 'Is today a good day for Aries?',
            content: `Absolutely. Cosmic alignments favor action and bold steps.`
          },
          {
            h3: 'What is the lucky color for Aries today?',
            content: `Red and scarlet tones will boost your confidence and aura.`
          },
          {
            h3: 'How will Aries love life be today?',
            content: `Exciting, especially if you initiate meaningful conversations.`
          },
          {
            h3: 'What is Aries lucky number today?',
            content: `9, a Mars-favored number, empowering action and leadership.`
          }
        ]
      }
    ]
  },

  taurus: {
    slug: '/todays-horoscope/taurus',
    h1: 'Taurus Daily Horoscope',
    intro: `"Stability is not standing still—it’s knowing where to plant your feet when life feels like a storm."
I have shared this thought with countless Taurus clients over the years. And today, it resonates stronger than ever.

Let’s face it, Taurus friends—you crave grounding energy, comfort, and calm. But the stars today are stirring things up, asking you to reevaluate what truly makes you feel safe and abundant.

At AstroSight, we don’t just offer routine horoscopes. Every word we share is rooted in classical Jyotish wisdom, precise chart calculations, and decades of real-world client experiences. Our remedies aren’t generic—they are specific, karmic, and aligned to your individual path.`,
    sections: [
      {
        h2: 'Taurus Horoscope Today Overview',
        h3s: [
          {
            h3: 'General Vibes & Cosmic Energy',
            content: `Today, the Moon brings grounding energy—but with a twist. There’s a subtle undercurrent urging you to tidy up loose ends, especially around your personal space and finances.

I once guided a Taurus client—a home décor business owner—on such a day. She’d been sitting on an expansion idea for months. When Venus blessed her chart with stabilizing yet creative aspects, I nudged her to take the leap. She did. And the cozy, beautiful space she created became her brand’s signature.

That’s the kind of day it is for you, Taurus. Grounded, but gently daring.`
          },
          {
            h3: 'Daily wisdom quote',
            content: `"Persistence transforms stones into smooth gems over time."`
          }
        ]
      },
      {
        h2: 'Taurus Love Horoscope Today',
        h3s: [
          {
            h3: 'For Singles',
            content: `Taurus, your sensual side is shining today. But it’s not about quick flings. You’re looking for depth. Attend social events that reflect your passions—art, music, food.

A Taurus client recently met her now-fiancé during a pottery class. That’s how Taurus love stories begin—slowly, beautifully, and with meaning.`
          },
          {
            h3: 'For Couples',
            content: `Coupled Taurus? Nurture your bond by creating small comforts today. Maybe cook your partner’s favorite dish or set up a cozy movie night. Simple gestures go a long way.`
          },
          {
            h3: 'Tips for Strengthening Emotional Bonds',
            content: `Show appreciation for the stability your partner brings. Taurus sometimes assumes love is understood. Today, make it spoken.`
          }
        ]
      },
      {
        h2: 'Taurus Career Horoscope Today',
        h3s: [
          {
            h3: 'Workplace Dynamics & Opportunities',
            content: `Work-wise, your methodical approach will be your superpower today. Colleagues will lean on your practical wisdom. Expect to play the ‘advisor’ role more than the ‘doer’.`
          },
          {
            h3: 'Challenges Taurus Might Face Today',
            content: `Avoid stubbornness. Sometimes your fixed energy makes you resistant to change. Today is about balance—embrace small adjustments where needed.`
          },
          {
            h3: 'Career Growth Tips for Taurus',
            content: `Take initiative on that project you've been delaying. The stars favor those who combine patience with action.`
          }
        ]
      },
      {
        h2: 'Taurus Money Horoscope Today',
        h3s: [
          {
            h3: 'Financial Opportunities & Warnings',
            content: `Your natural caution protects you from reckless spending. But the Moon’s gentle push today encourages you to think long-term. Is it time to review your financial plans or insurance?`
          },
          {
            h3: 'Smart Money Moves for Taurus Today',
            content: `Invest in your home space or self-care rituals. These comforts are aligned with your values and bring emotional security.`
          }
        ]
      },
      {
        h2: 'Taurus Health Horoscope Today',
        h3s: [
          {
            h3: 'Physical Wellness & Energy Levels',
            content: `Your body craves steady movement today. A walk in nature or gardening will ground you beautifully.`
          },
          {
            h3: 'Emotional & Mental Health Focus',
            content: `Your heart thrives on routine. But today, add a dash of spontaneity—maybe try a new recipe or rearrange a corner of your room.`
          },
          {
            h3: 'Self-Care Rituals Recommended for Taurus',
            content: `Light rose incense or keep a Shukra Yantra in your personal space. These Vedic remedies calm the mind and open the heart.`
          }
        ]
      },
      {
        h2: 'Taurus Sign Attributes',
        h3s: [
          {
            h3: 'Key Traits of Taurus Zodiac Sign',
            content: `Steady, loyal, sensual. Taurus is the builder of the zodiac.`
          },
          {
            h3: 'Strengths & Weaknesses',
            content: `Strength: Patience. Weakness: Resistance to change.... Your life improves when you embrace small, consistent steps toward growth.`
          },
          {
            h3: 'How These Traits Affect Taurus Daily Life',
            content: `You bring beauty and calm wherever you go. But don't forget, Taurus, even the Earth shifts.`
          }
        ]
      },
      {
        h2: 'Taurus Compatibility Chart',
        h3s: [
          {
            h3: 'Best Matches for Today',
            content: `Cancer, Virgo, Capricorn, Pisces, Taurus, Scorpio`
          },
          {
            h3: 'Signs to Approach with Caution',
            content: `Aries, Gemini, Libra, Sagittarius, Leo, Aquarius`
          }
        ]
      },
      {
        h2: 'Frequently Asked Questions',
        h3s: [
          {
            h3: 'Is today a good day for Taurus?',
            content: `Yes, especially for grounding decisions and nurturing relationships.`
          },
          {
            h3: 'What is the lucky color for Taurus today?',
            content: `Emerald green. It connects you to Venus energy and abundance.`
          },
          {
            h3: 'How will Taurus love life be today?',
            content: `Deepening, especially through shared comforts.`
          },
          {
            h3: 'What is Taurus lucky number today?',
            content: `6, Venus’s favorite, bringing harmony and sweetness.`
          }
        ]
      }
    ]
  },

  gemini: {
    slug: '/todays-horoscope/gemini',
    h1: 'Gemini Daily Horoscope',
    intro: `"Your mind is your greatest asset, Gemini—but only when it's grounded in purpose."
I often remind my Gemini clients of this truth. The cosmos might gift you the sharpest intellect in the zodiac, but without direction, even the brightest star can feel lost.

Today, let's unlock the guidance of your Gemini Daily Horoscope, rooted not just in planetary positions, but in the ancient Jyotish wisdom that we, at AstroSight, practice with devotion and precision.

Our predictions aren’t guesswork—they are steeped in classical Vedic texts, fine-tuned by divisional charts, and refined through the spiritual lens I have cultivated over 18 years of karmic astrology practice.`,
    sections: [
      {
        h2: 'Gemini Horoscope Today Overview',
        h3s: [
          {
            h3: 'General Vibes & Cosmic Energy',
            content: `Mercury, your ruling planet, brings heightened mental clarity today, Gemini. You'll feel restless, curious, and eager to gather information.

This reminds me of a client—an IT professional—who once came to me during such an alignment. She was overwhelmed, juggling ideas, projects, and passions. I told her, "Gemini, it's not about choosing one path. It's about creating a flow where all your interests can harmonize." She learned to integrate her talents, and today, she’s thriving as a digital entrepreneur.

Let that be your lesson today. Curiosity is a gift—but only when it meets structure.`
          },
          {
            h3: 'Daily wisdom quote',
            content: `"The wise person speaks after listening, not before."`
          }
        ]
      },
      {
        h2: 'Gemini Love Horoscope Today',
        h3s: [
          {
            h3: 'For Singles',
            content: `Your words have power today, Gemini. If you’re single, conversations could spark unexpected romantic possibilities. Join that webinar, post that witty comment—your charm is magnetic.`
          },
          {
            h3: 'For Couples',
            content: `For those in relationships, engage in playful debates or brainstorm creative projects together. Intellectual intimacy deepens bonds today.`
          },
          {
            h3: 'Tips for Strengthening Emotional Bonds',
            content: `Listen twice as much as you speak. Yes, Gemini, I know it’s hard—but today, your partner’s words may hide hidden treasures.`
          }
        ]
      },
      {
        h2: 'Gemini Career Horoscope Today',
        h3s: [
          {
            h3: 'Workplace Dynamics & Opportunities',
            content: `At work, you’re the sparkplug today. Ideas, collaborations, and new opportunities will swirl around you.

This is the kind of day where brainstorming sessions lead to breakthroughs. Speak up—but remember to back your brilliance with data.`
          },
          {
            h3: 'Challenges Gemini Might Face Today',
            content: `Overthinking. Avoid analysis paralysis. Pick one idea and run with it.`
          },
          {
            h3: 'Career Growth Tips for Gemini',
            content: `Focus your energy. I always advise my Gemini clients to write down their top three priorities daily—this simple act channels your scattered brilliance into tangible progress.`
          }
        ]
      },
      {
        h2: 'Gemini Money Horoscope Today',
        h3s: [
          {
            h3: 'Financial Opportunities & Warnings',
            content: `Today, you might be tempted by shiny new investments or quick-money schemes. Resist.

Instead, engage in research. A conversation with a savvy friend could open doors to legitimate financial opportunities.`
          },
          {
            h3: 'Smart Money Moves for Gemini Today',
            content: `Set up automated savings. Your mind thrives on freedom—and automation gives you peace of mind while your money works silently.`
          }
        ]
      },
      {
        h2: 'Gemini Health Horoscope Today',
        h3s: [
          {
            h3: 'Physical Wellness & Energy Levels',
            content: `Your energy will fluctuate like a ping-pong ball. Include movement that also stimulates your mind—dance, yoga, or even a walking podcast.`
          },
          {
            h3: 'Emotional & Mental Health Focus',
            content: `Your nervous system might feel overstimulated. Digital detox for an hour today can do wonders.`
          },
          {
            h3: 'Self-Care Rituals Recommended for Gemini',
            content: `Chant Budha Beej Mantra or place a Budha Yantra on your work desk to enhance focus and calm.`
          }
        ]
      },
      {
        h2: 'Gemini Sign Attributes',
        h3s: [
          {
            h3: 'Key Traits of Gemini Zodiac Sign',
            content: `Witty, curious, versatile. You see connections others miss.`
          },
          {
            h3: 'Strengths & Weaknesses',
            content: `Strength: Communication. Weakness: Scattered focus.

When you channel your ideas into structured action, Gemini, you become unstoppable.`
          },
          {
            h3: 'How These Traits Affect Gemini Daily Life',
            content: `You add spark to everyday life. But remember, stillness brings insights too.`
          }
        ]
      },
      {
        h2: 'Gemini Compatibility Chart',
        h3s: [
          {
            h3: 'Best Matches for Today',
            content: `Aries, Leo, Libra, Aquarius, Gemini, Sagittarius`
          },
          {
            h3: 'Signs to Approach with Caution',
            content: `Taurus, Cancer, Scorpio, Capricorn, Virgo, Pisces`
          }
        ]
      },
      {
        h2: 'Frequently Asked Questions',
        h3s: [
          {
            h3: 'Is today a good day for Gemini?',
            content: `Yes, especially for intellectual pursuits and creative brainstorming.`
          },
          {
            h3: 'What is the lucky color for Gemini today?',
            content: `Yellow. It lights up your intellect and clarity.`
          },
          {
            h3: 'How will Gemini love life be today?',
            content: `Playful and engaging—spark conversations and see where they lead.`
          },
          {
            h3: 'What is Gemini lucky number today?',
            content: `5, Mercury’s number, activating quick thinking and charm.`
          }
        ]
      }
    ]
  },
cancer: {
  slug: '/todays-horoscope/cancer',
  h1: 'Cancer Daily Horoscope',
  intro: `"When you nurture yourself, Cancer, you nurture the world."
This is something I always remind my Cancer clients—many of whom spend their days giving, caring, and holding space for others, yet forget to refill their own emotional cup.
Today’s Cancer Daily Horoscope is a tender reminder from the cosmos itself—turn inward, honor your feelings, and from that place of emotional fullness, engage with the world.
At AstroSight, our approach to horoscopes is deeply personal and precise. Every prediction you read here is grounded in classical Jyotish Shastra, calculated meticulously using divisional charts, Mahadasha periods, and more.`,
  sections: [
    {
      h2: 'Cancer Horoscope Today Overview',
      h3s: [
        {
          h3: 'General Vibes & Cosmic Energy',
          content: `Today, Cancer, the Moon—the ruler of your sign—is casting a soft, introspective light on your soul. There may be nostalgia or sudden waves of emotion, but don’t resist them. These feelings are messengers, nudging you to tend to your inner life.
I remember a Cancer client who felt overwhelmed on days like this, trying to “power through.” When I advised her to step back and take a quiet hour for herself, it changed her entire day—and her children noticed her renewed joy by evening.
Today is not about outward achievements. It's about refilling your well, so you can return to your world with more to give.`
        },
        {
          h3: 'Daily wisdom quote',
          content: `"Self-care is not selfish, Cancer—it’s preparation for deeper compassion.”`
        }
      ]
    },
    {
      h2: 'Cancer Love Horoscope Today',
      h3s: [
        {
          h3: 'For Singles',
          content: `Single Cancer, your intuition is heightened—trust the subtle signals. If someone makes you feel safe and at ease, that’s worth exploring. Journal about your ideal partner. Sometimes clarity attracts love faster than chasing it.`
        },
        {
          h3: 'For Couples',
          content: `Coupled Cancers, deepen your emotional intimacy today. Share a cherished memory or cook comfort food together. Your partner may also crave extra TLC—be generous with your tenderness.`
        },
        {
          h3: 'Tips for Strengthening Emotional Bonds',
          content: `Create a “gratitude jar” together. Each of you writes small notes about what you appreciate—then read them together at the end of the week. This practice grows roots of trust and affection.`
        }
      ]
    },
    {
      h2: 'Cancer Career Horoscope Today',
      h3s: [
        {
          h3: 'Workplace Dynamics & Opportunities',
          content: `At work, your nurturing side shines. A colleague may need your support or a project requires team harmony. Offer caring guidance, but remember not to absorb other people’s stress.`
        },
        {
          h3: 'Challenges Cancer Might Face Today',
          content: `You may feel moody or distracted—avoid making impulsive decisions or stewing over past mistakes. Center yourself with deep breaths or a brief walk outside.`
        },
        {
          h3: 'Career Growth Tips for Cancer',
          content: `Keep a small crystal or a picture of your family at your desk to remind you of your core motivations. Your roots give your ambition wings.`
        }
      ]
    },
    {
      h2: 'Cancer Money Horoscope Today',
      h3s: [
        {
          h3: 'Financial Opportunities & Warnings',
          content: `Review your budget—are you spending on nurturing comforts or emotional band-aids? Invest in what truly supports your well-being, not just fleeting moods.`
        },
        {
          h3: 'Smart Money Moves for Cancer Today',
          content: `Gift yourself something simple and meaningful—a home plant, calming music, or a donation to a cause close to your heart. This aligns your resources with your deeper values.`
        }
      ]
    },
    {
      h2: 'Cancer Health Horoscope Today',
      h3s: [
        {
          h3: 'Physical Wellness & Energy Levels',
          content: `Your energy may fluctuate. Gentle stretching, water-rich foods, and keeping hydrated are especially helpful. Avoid excessive caffeine or skipping meals—a stable routine anchors you.`
        },
        {
          h3: 'Emotional & Mental Health Focus',
          content: `This is a day to honor your feelings—not to push them aside. Write, meditate, or call a trusted friend if you need support. Emotional self-respect is your secret strength.`
        },
        {
          h3: 'Self-Care Rituals Recommended for Cancer',
          content: `Take a long bath with calming oils or light a white candle for peace. Wear a pearl or moonstone if you have one—these stones resonate with your lunar energy.`
        }
      ]
    },
    {
      h2: 'Cancer Sign Attributes',
      h3s: [
        {
          h3: 'Key Traits of Cancer Zodiac Sign',
          content: `Caring, intuitive, protective—Cancer is the zodiac’s nurturer. You feel things deeply, and your memory is keen.`
        },
        {
          h3: 'Strengths & Weaknesses',
          content: `Strength: Compassion and loyalty. Weakness: Moodiness and withdrawing when hurt.
With awareness, you can turn your sensitivity into wisdom.`
        },
        {
          h3: 'How These Traits Affect Cancer Daily Life',
          content: `You notice small details and act with kindness, but you also need alone time to recharge. Trust that both are normal and healthy!`
        }
      ]
    },
    {
      h2: 'Cancer Compatibility Chart',
      h3s: [
        {
          h3: 'Best Matches for Today',
          content: `Taurus, Virgo, Scorpio, Pisces, Cancer, Capricorn`
        },
        {
          h3: 'Signs to Approach with Caution',
          content: `Aries, Gemini, Leo, Libra, Sagittarius, Aquarius`
        }
      ]
    },
    {
      h2: 'Frequently Asked Questions',
      h3s: [
        {
          h3: 'Is today a good day for Cancer?',
          content: `Yes, especially for inner work, home projects, and gentle communication.`
        },
        {
          h3: 'What is the lucky color for Cancer today?',
          content: `White or silver—both increase peace and clarity.`
        },
        {
          h3: 'How will Cancer love life be today?',
          content: `Tender and emotionally honest. Small, caring gestures mean the most.`
        },
        {
          h3: 'What is Cancer lucky number today?',
          content: `2, the Moon’s number, bringing harmony and unity.`
        }
      ]
    }
  ]
},

  leo: {
  slug: '/todays-horoscope/leo',
  h1: 'Leo Daily Horoscope',
  intro: `"When you shine, Leo, you give others permission to shine too."
I often share this reminder with my Leo clients. You carry the sun within you—a radiant force that lights up rooms, conversations, and even cold hearts. But the secret most people miss is that even the sun needs rest behind the clouds.
At AstroSight, our horoscopes are crafted not from templates, but from precise planetary calculations, classical Vedic scriptures, and deep karmic insights.
Through 18 years of karmic astrology, I’ve seen Leo natives rise, fall, and rise again—always with more wisdom, more grace, and yes, more roar.`,
  sections: [
    {
      h2: "Leo Horoscope Today Overview",
      h3s: [
        {
          h3: "General Vibes & Cosmic Energy",
          content: `Bold Leo, today the Sun (your ruler) forms a harmonious aspect with Jupiter, magnifying your natural confidence and charisma. People take notice—whether you command the stage or simply light up a small gathering, your aura is magnetic.

I remember guiding a Leo artist once to host her first exhibition on a similar cosmic day. Her light shone so brightly, not only did her art sell out, but she awakened creativity in those who attended.

Let your authentic self radiate today, Leo. But also respect your need for rest and time away from the crowd, to recharge your inner sun.`
        },
        {
          h3: "Daily wisdom quote",
          content: `"A true king lifts others as he ascends."`
        }
      ]
    },
    {
      h2: "Leo Love Horoscope Today",
      h3s: [
        {
          h3: "For Singles",
          content: `Single Leo, today favors bold flirtation and unapologetic self-expression. If you like someone, make the first move—you’ll be received warmly. Your royal confidence is your best magnet!`
        },
        {
          h3: "For Couples",
          content: `Coupled Leos, nurture your relationship with both excitement and warmth. An impromptu date night or a heartfelt compliment rekindles the romance. Share your dreams and let your partner bask in your generous glow.`
        },
        {
          h3: "Tips for Strengthening Emotional Bonds",
          content: `Appreciate your partner’s uniqueness. Public praise, even a little, goes a long way—just as you love to be appreciated, let your loved one shine, too.`
        }
      ]
    },
    {
      h2: "Leo Career Horoscope Today",
      h3s: [
        {
          h3: "Workplace Dynamics & Opportunities",
          content: `Your leadership is in focus at work. Colleagues look to you for inspiration and direction. Step up to a visible role, present an idea, or help resolve a group challenge. Your optimistic approach rallies the team.`
        },
        {
          h3: "Challenges Leo Might Face Today",
          content: `Avoid pride or insisting on the spotlight always. Celebrate group wins, not just personal glory. If criticism comes, take it as fuel for growth rather than a wound to your ego.`
        },
        {
          h3: "Career Growth Tips for Leo",
          content: `Mentor someone or collaborate with an ambitious peer. When you empower others, your own influence multiplies—a true mark of the Leo legacy.`
        }
      ]
    },
    {
      h2: "Leo Money Horoscope Today",
      h3s: [
        {
          h3: "Financial Opportunities & Warnings",
          content: `You may be tempted toward generous spending or making grand gestures. While a little luxury suits you, keep long-term priorities in mind. Large purchases need a second look before you hit 'buy'.`
        },
        {
          h3: "Smart Money Moves for Leo Today",
          content: `Invest in something that supports your talent—like a creative class, self-care, or event tickets. The best wealth for Leo is money spent in service of joy and growth.`
        }
      ]
    },
    {
      h2: "Leo Health Horoscope Today",
      h3s: [
        {
          h3: "Physical Wellness & Energy Levels",
          content: `Your natural energy is high, but beware of burnout if you overcommit to others. Incorporate playful movement today—dance, sport, or yoga in the sunshine.`
        },
        {
          h3: "Emotional & Mental Health Focus",
          content: `Take breaks from being “on stage.” Quiet reflection, art, or meditation restores your spirit and keeps your confidence steady.`
        },
        {
          h3: "Self-Care Rituals Recommended for Leo",
          content: `Gold tones uplift you. Try a golden accessory or surround yourself with yellow or orange flowers. Meditate with a sunstone or recite the Gayatri mantra for radiant inner strength.`
        }
      ]
    },
    {
      h2: "Leo Sign Attributes",
      h3s: [
        {
          h3: "Key Traits of Leo Zodiac Sign",
          content: `Creative, bold, warm-hearted. Leos radiate natural magnetism, making them generous leaders and passionate friends.`
        },
        {
          h3: "Strengths & Weaknesses",
          content: `Strength: Courage, loyalty, charisma. Weakness: Pride, seeking too much approval.
When you balance self-love with humility, there is no limit to your impact.`
        },
        {
          h3: "How These Traits Affect Leo Daily Life",
          content: `You uplift loved ones and rarely go unnoticed. Just remember: your light is most healing when you also honor your own needs for gentleness and space.`
        }
      ]
    },
    {
      h2: "Leo Compatibility Chart",
      h3s: [
        {
          h3: "Best Matches for Today",
          content: `Aries, Gemini, Libra, Sagittarius, Leo, Aquarius`
        },
        {
          h3: "Signs to Approach with Caution",
          content: `Taurus, Cancer, Virgo, Scorpio, Capricorn, Pisces`
        }
      ]
    },
    {
      h2: "Frequently Asked Questions",
      h3s: [
        {
          h3: "Is today a good day for Leo?",
          content: `Yes! Today shines for leadership, creativity, and heartfelt connection.`
        },
        {
          h3: "What is the lucky color for Leo today?",
          content: `Gold or orange—both energize your spirit and draw positive attention.`
        },
        {
          h3: "How will Leo love life be today?",
          content: `Warm, playful, and open to new sparks—if you speak from the heart.`
        },
        {
          h3: "What is Leo lucky number today?",
          content: `1—The number of the Sun, symbolizing confidence and fresh beginnings.`
        }
      ]
    }
  ]
},

  virgo: {
  slug: '/todays-horoscope/virgo',
  h1: 'Virgo Daily Horoscope',
  intro: `"Perfection isn’t a destination, Virgo—it’s the grace of doing small things with immense love."
This is something I often whisper to my Virgo clients, especially on days like today, when your meticulous mind seeks order, clarity, and flawless execution.
At AstroSight, our daily horoscopes are rooted in the deep soil of Jyotish Shastra, carefully tilled using divisional charts, Vimshottari Dasha periods, and planetary transits.`,
  sections: [
    {
      h2: 'Virgo Horoscope Today Overview',
      h3s: [
        {
          h3: 'General Vibes & Cosmic Energy',
          content: `Mercury, your ruling planet, is gifting you precision today, Virgo. It’s a day where your ability to spot what others miss will shine. But—and this is important—don’t get lost in details at the expense of the bigger picture.
I once guided a Virgo architect client on such a day. She was obsessing over the smallest blueprint adjustments and missing the joy of the design itself. I reminded her: "Virgo, the beauty isn’t in the perfect corner—it’s in the whole house standing strong."
Today is such a day for you—balance, not nitpicking, will bring satisfaction.`
        },
        {
          h3: 'Daily wisdom quote',
          content: `"Strive for progress, not perfection; one step at a time."`
        }
      ]
    },
    {
      h2: 'Virgo Love Horoscope Today',
      h3s: [
        {
          h3: 'For Singles',
          content: `Today favors gentle, meaningful conversations. If you're single, seek connections through shared hobbies or volunteer work—places where sincerity thrives.`
        },
        {
          h3: 'For Couples',
          content: `For partnered Virgos, focus on the small gestures—a handwritten note, organizing a shared space. These acts of love speak louder than grand declarations today.`
        },
        {
          h3: 'Tips for Strengthening Emotional Bonds',
          content: `Remember, Virgo, love isn’t a checklist. Allow space for imperfection, both in yourself and your partner.`
        }
      ]
    },
    {
      h2: 'Virgo Career Horoscope Today',
      h3s: [
        {
          h3: 'Workplace Dynamics & Opportunities',
          content: `You’ll be the problem-solver at work today, Virgo. Your keen eye can help untangle complex issues others shy away from.`
        },
        {
          h3: 'Challenges Virgo Might Face Today',
          content: `Don’t get trapped in micromanagement. Delegate, trust your team, and allow things to unfold.`
        },
        {
          h3: 'Career Growth Tips for Virgo',
          content: `Today is perfect for organizing your workspace or digital files. A tidy environment supports your brilliant, organized mind.`
        }
      ]
    },
    {
      h2: 'Virgo Money Horoscope Today',
      h3s: [
        {
          h3: 'Financial Opportunities & Warnings',
          content: `Your attention to detail will help you spot small leaks in your budget. It’s a great day to review subscriptions, bills, and financial plans.`
        },
        {
          h3: 'Smart Money Moves for Virgo Today',
          content: `Consider starting a separate fund for skill-building courses or certifications—investing in your craft pays long-term dividends.`
        }
      ]
    },
    {
      h2: 'Virgo Health Horoscope Today',
      h3s: [
        {
          h3: 'Physical Wellness & Energy Levels',
          content: `Routine is your friend today. Stick to your meal plan, hydration, and workout schedule.`
        },
        {
          h3: 'Emotional & Mental Health Focus',
          content: `Avoid overthinking. Schedule ‘brain breaks’ throughout the day—simple walks or mindful breathing will clear mental clutter.`
        },
        {
          h3: 'Self-Care Rituals Recommended for Virgo',
          content: `Light sandalwood incense or meditate with a Budha Yantra in your workspace. These remedies align your intellectual energy with inner calm.`
        }
      ]
    },
    {
      h2: 'Virgo Sign Attributes',
      h3s: [
        {
          h3: 'Key Traits of Virgo Zodiac Sign',
          content: `Analytical, practical, service-oriented. Virgo refines the world through details.`
        },
        {
          h3: 'Strengths & Weaknesses',
          content: `Strength: Precision. Weakness: Over-criticism (especially toward yourself).
When you balance your sharp mind with compassion, Virgo, you create masterpieces.`
        },
        {
          h3: 'How These Traits Affect Virgo Daily Life',
          content: `You make life better for others, Virgo. But don’t forget—you deserve the same gentleness you give.`
        }
      ]
    },
    {
      h2: 'Virgo Compatibility Chart',
      h3s: [
        {
          h3: 'Best Matches for Today',
          content: `Taurus, Cancer, Scorpio, Capricorn, Virgo, Pisces`
        },
        {
          h3: 'Signs to Approach with Caution',
          content: `Aries, Leo, Libra, Aquarius, Gemini, Sagittarius`
        }
      ]
    },
    {
      h2: 'Frequently Asked Questions',
      h3s: [
        {
          h3: 'Is today a good day for Virgo?',
          content: `Yes, especially for organization, refining routines, and meaningful conversations.`
        },
        {
          h3: 'What is the lucky color for Virgo today?',
          content: `Earthy brown or green—to connect you to stability and calm.`
        },
        {
          h3: 'How will Virgo love life be today?',
          content: `Subtle yet nurturing—focus on acts of care over words.`
        },
        {
          h3: 'What is Virgo lucky number today?',
          content: `5, A Mercury number, enhancing focus and adaptability.`
        }
      ]
    }
  ]
},

  libra: {
  slug: '/todays-horoscope/libra',
  h1: 'Libra Daily Horoscope',
  intro: `"Harmony is not the absence of chaos, Libra—it is the art of dancing gracefully with life’s imbalances."
This is a lesson I’ve shared with many of my Libra clients, especially those who strive for perfect balance and get flustered when life tips their scales. Today’s Libra Daily Horoscope invites you to embrace both beauty and imperfection, because both have their place in your journey.
At AstroSight, we approach your daily guidance through the sacred lens of Jyotish Shastra, combining planetary transits, divisional charts, and real-life karmic patterns.`,
  sections: [
    {
      h2: 'Libra Horoscope Today Overview',
      h3s: [
        {
          h3: 'General Vibes & Cosmic Energy',
          content: `Today, Venus—your ruling planet—beautifully aspects the Moon, inspiring a strong urge to create harmony both inside and around you. You may find yourself smoothing tensions, mediating between friends, or simply craving a beautiful, calming environment.
Years of guiding Libra clients have shown me that sometimes, on days like this, it’s easy to feel pressured by the desire to keep everyone happy. Give yourself permission to say “no” if it preserves your own peace. Remember, harmony starts from within.
Pause and soak in beauty: fresh flowers, music, or a favorite art piece can become your anchor for serenity today.`
        },
        {
          h3: 'Daily wisdom quote',
          content: `"Balance is not found; it is created through mindful choices every moment."`
        }
      ]
    },
    {
      h2: 'Libra Love Horoscope Today',
      h3s: [
        {
          h3: 'For Singles',
          content: `Charming Libra, your natural magnetism is heightened today. Social settings (online or offline) are fruitful—don’t be afraid to mingle or even make the first move if drawn to someone intriguing.`
        },
        {
          h3: 'For Couples',
          content: `For Libras in relationships, focus on equality and appreciation. Plan a shared activity, compromise on decisions, and use loving words. Your ability to listen and mediate brings joy to both partners.`
        },
        {
          h3: 'Tips for Strengthening Emotional Bonds',
          content: `A little romance goes far today. Write a sweet note, enjoy a candlelit meal, or dance together at home. Harmony in small gestures leads to deep connection.`
        }
      ]
    },
    {
      h2: 'Libra Career Horoscope Today',
      h3s: [
        {
          h3: 'Workplace Dynamics & Opportunities',
          content: `You are the bridge at work today—facilitating teamwork and resolving misunderstandings. This could bring recognition from superiors or even open doors to collaborative projects.`
        },
        {
          h3: 'Challenges Libra Might Face Today',
          content: `Don’t let people-pleasing sap your time or leave you feeling resentful. Stand firm for your priorities, even as you aim for consensus.`
        },
        {
          h3: 'Career Growth Tips for Libra',
          content: `Use both logic and empathy in negotiations. Your natural diplomacy is your biggest asset—apply it, but don’t bend to the breaking point.`
        }
      ]
    },
    {
      h2: 'Libra Money Horoscope Today',
      h3s: [
        {
          h3: 'Financial Opportunities & Warnings',
          content: `Financial discussions flow smoothly—good day for making joint budget plans or settling monetary disputes. However, steer clear of overspending on luxury as a way to soothe stress.`
        },
        {
          h3: 'Smart Money Moves for Libra Today',
          content: `Seek deals, invest in something that genuinely elevates your sense of beauty and wellbeing (like art, music, or a calming home addition).`
        }
      ]
    },
    {
      h2: 'Libra Health Horoscope Today',
      h3s: [
        {
          h3: 'Physical Wellness & Energy Levels',
          content: `Gentle movement—yoga, stretching, tai chi—supports your wellbeing as much as intense workouts. Balance exertion and rest.`
        },
        {
          h3: 'Emotional & Mental Health Focus',
          content: `Practice saying “yes” to yourself, not just to others. Journaling or a short gratitude ritual can restore your inner calm and clarity.`
        },
        {
          h3: 'Self-Care Rituals Recommended for Libra',
          content: `Light rose or jasmine incense; decorate your space with colors and objects you love. Recite the Shukra (Venus) mantra for inner beauty and peace.`
        }
      ]
    },
    {
      h2: 'Libra Sign Attributes',
      h3s: [
        {
          h3: 'Key Traits of Libra Zodiac Sign',
          content: `Diplomatic, fair, gracious—Libra is drawn toward partnership and beauty, seeking peace without losing sight of justice.`
        },
        {
          h3: 'Strengths & Weaknesses',
          content: `Strength: Charm, mediation, aesthetic sense.
Weakness: Indecision, avoiding conflict.
Your growth comes from finding harmony between saying “yes” to others and to yourself.`
        },
        {
          h3: 'How These Traits Affect Libra Daily Life',
          content: `You smooth rough edges and make your world more beautiful, but remember: true balance means honoring your own needs, too.`
        }
      ]
    },
    {
      h2: 'Libra Compatibility Chart',
      h3s: [
        {
          h3: 'Best Matches for Today',
          content: `Gemini, Leo, Sagittarius, Aquarius, Libra, Aries`
        },
        {
          h3: 'Signs to Approach with Caution',
          content: `Taurus, Cancer, Virgo, Scorpio, Capricorn, Pisces`
        }
      ]
    },
    {
      h2: 'Frequently Asked Questions',
      h3s: [
        {
          h3: 'Is today a good day for Libra?',
          content: `Yes—especially for forging harmony, enjoying art, and strengthening relationships.`
        },
        {
          h3: 'What is the lucky color for Libra today?',
          content: `Pale blue or blush pink—both bring calm and charm, resonating with Venus energies.`
        },
        {
          h3: 'How will Libra love life be today?',
          content: `Romantic, harmonious, and open to deeper connection when you act gently.`
        },
        {
          h3: 'What is Libra lucky number today?',
          content: `6, the Venus number, bringing sweetness and successful partnership.`
        }
      ]
    }
  ]
},

  scorpio: {
  slug: '/todays-horoscope/scorpio',
  h1: 'Scorpio Daily Horoscope',
  intro: `"True power, Scorpio, is not in controlling others—it is in mastering yourself."
This has been my guiding mantra for every Scorpio client who has ever walked into my consultation room. Your intensity is unmatched, your depth is legendary. But the most potent transformations I’ve witnessed in Scorpios happened when they turned their gaze inward.
At AstroSight, our daily horoscopes are anchored in classical Jyotish Shastra, using divisional charts, planetary aspects, and karmic periods, offering you not just forecasts but mirrors into your soul.`,
  sections: [
    {
      h2: 'Scorpio Horoscope Today Overview',
      h3s: [
        {
          h3: 'General Vibes & Cosmic Energy',
          content: `Pluto, your co-ruler, brings a surge of intense, transformative energy today, Scorpio. You might feel drawn to uncover hidden truths—whether in your relationships, your work, or your own heart.
I recall a Scorpio healer I mentored once during a similar transit. She was struggling with trust issues that held her back. I reminded her, "Scorpio, shadows lose power when you face them." She did, and the growth she experienced was profound.
Today invites you into that sacred space of self-reflection, courage, and transformation.`
        },
        {
          h3: 'Daily wisdom quote',
          content: `"Let go of dead leaves so new flowers can bloom."`
        }
      ]
    },
    {
      h2: 'Scorpio Love Horoscope Today',
      h3s: [
        {
          h3: 'For Singles',
          content: `If you're single, today draws you toward intense, magnetic connections. But avoid rushing—let curiosity and depth guide you rather than surface attraction.`
        },
        {
          h3: 'For Couples',
          content: `For those in relationships, today is ideal for deep, heart-to-heart conversations. Address the unspoken. Clear the air.`
        },
        {
          h3: 'Tips for Strengthening Emotional Bonds',
          content: `Be vulnerable, Scorpio. When you allow your partner to see beneath the armor, intimacy deepens beyond the physical.`
        }
      ]
    },
    {
      h2: 'Scorpio Career Horoscope Today',
      h3s: [
        {
          h3: 'Workplace Dynamics & Opportunities',
          content: `Your strategic skills are heightened today. Dive into projects requiring analysis, investigation, or crisis management—these are your arenas of power.`
        },
        {
          h3: 'Challenges Scorpio Might Face Today',
          content: `Beware of control urges. Let collaboration flow rather than clinging to rigid structures.`
        },
        {
          h3: 'Career Growth Tips for Scorpio',
          content: `Consider how you can transform your work processes for the better. Innovation through elimination of outdated methods will bring recognition.`
        }
      ]
    },
    {
      h2: 'Scorpio Money Horoscope Today',
      h3s: [
        {
          h3: 'Financial Opportunities & Warnings',
          content: `Hidden financial opportunities may surface today—but only if you look beneath the surface. Review your investments and insurances carefully.`
        },
        {
          h3: 'Smart Money Moves for Scorpio Today',
          content: `A day to purge unnecessary expenses and commit to long-term wealth-building strategies.`
        }
      ]
    },
    {
      h2: 'Scorpio Health Horoscope Today',
      h3s: [
        {
          h3: 'Physical Wellness & Energy Levels',
          content: `Your stamina is powerful today. Engage in activities that challenge your limits—martial arts, intense workouts, or even power yoga.`
        },
        {
          h3: 'Emotional & Mental Health Focus',
          content: `Your emotions run deep today. Channel them into journaling or therapeutic practices that help release suppressed feelings.`
        },
        {
          h3: 'Self-Care Rituals Recommended for Scorpio',
          content: `Chant Maha Mrityunjaya Mantra or meditate with a Mars Yantra. These ancient remedies support emotional detoxification and inner strength.`
        }
      ]
    },
    {
      h2: 'Scorpio Sign Attributes',
      h3s: [
        {
          h3: 'Key Traits of Scorpio Zodiac Sign',
          content: `Intense, mysterious, transformative. Scorpio walks where others fear to tread.`
        },
        {
          h3: 'Strengths & Weaknesses',
          content: `Strength: Emotional depth. Weakness: Holding onto grudges.
When you embrace release as part of power, Scorpio, you evolve into your highest form.`
        },
        {
          h3: 'How These Traits Affect Scorpio Daily Life',
          content: `You uncover truths others overlook. But remember, Scorpio—not every shadow needs to be fought. Some simply need to be understood.`
        }
      ]
    },
    {
      h2: 'Scorpio Compatibility Chart',
      h3s: [
        {
          h3: 'Best Matches for Today',
          content: `Cancer, Virgo, Capricorn, Pisces, Taurus, Scorpio`
        },
        {
          h3: 'Signs to Approach with Caution',
          content: `Aries, Gemini, Libra, Sagittarius, Leo, Aquarius`
        }
      ]
    },
    {
      h2: 'Frequently Asked Questions',
      h3s: [
        {
          h3: 'Is today a good day for Scorpio?',
          content: `Yes, especially for emotional healing, strategic planning, and letting go of toxic patterns.`
        },
        {
          h3: 'What is the lucky color for Scorpio today?',
          content: `Maroon or deep burgundy—to harness your transformative energy.`
        },
        {
          h3: 'How will Scorpio love life be today?',
          content: `Intense, emotional, and potentially healing—perfect for clearing old wounds.`
        },
        {
          h3: 'What is Scorpio lucky number today?',
          content: `9, The number of spiritual completion and emotional release.`
        }
      ]
    }
  ]
},

  sagittarius: {
  slug: '/todays-horoscope/sagittarius',
  h1: 'Sagittarius Daily Horoscope',
  intro: `"Freedom is your birthright, Sagittarius—but wisdom is what turns your wanderings into purpose."
Over the years, I’ve shared this line with many Sagittarius clients who’ve walked into my practice with restless feet and curious eyes. Your soul craves new skies, new questions, new horizons. But what I’ve seen, time and again, is that when you channel that thirst into conscious seeking, your life becomes a radiant adventure—not a chaotic sprint.
At AstroSight, our horoscopes are written not as daily predictions, but as sacred invitations to align with the cosmic currents through Vedic Jyotish, calculated using planetary transits, Mahadasha periods, and divisional charts.`,
  sections: [
    {
      h2: 'Sagittarius Horoscope Today Overview',
      h3s: [
        {
          h3: 'General Vibes & Cosmic Energy',
          content: `Jupiter, your ruling planet and harbinger of expansion, influences your chart today with a blessing of optimistic energy. You may feel inspired to explore new ideas or take a leap of faith in areas you’ve been contemplating.
I recall a Sagittarius client who, on a similar transit, decided to enroll in a course abroad. That decision opened transformative doors for her—and fueled the restlessness with a meaningful direction.
Today invites you to embrace your adventurous spirit with focus and enthusiasm, balancing curiosity with intention.`
        },
        {
          h3: 'Daily wisdom quote',
          content: `"Wisdom is not just knowing the path but walking it with heart."`
        }
      ]
    },
    {
      h2: 'Sagittarius Love Horoscope Today',
      h3s: [
        {
          h3: 'For Singles',
          content: `Single Sagittarians might find themselves drawn to new social circles or spontaneous encounters. Be open to serendipity, but also take time to understand the deeper motivations behind your connections.`
        },
        {
          h3: 'For Couples',
          content: `If you’re partnered, a shared adventure or planning a future trip together can rekindle excitement and deepen your bond. Communication with honesty and enthusiasm will bring joy.`
        },
        {
          h3: 'Tips for Strengthening Emotional Bonds',
          content: `Try engaging in new activities together that challenge your comfort zones—whether it’s a class, hike, or cultural experience. Growth arises from shared exploration.`
        }
      ]
    },
    {
      h2: 'Sagittarius Career Horoscope Today',
      h3s: [
        {
          h3: 'Workplace Dynamics & Opportunities',
          content: `Your optimistic outlook uplifts your team today. You are likely to be seen as a source of inspiration and motivation, which may lead to leadership roles or invitations to spearhead projects.`
        },
        {
          h3: 'Challenges Sagittarius Might Face Today',
          content: `Beware of overpromising or taking on too much. Your genuine enthusiasm could lead to burnout if not tempered with realistic planning.`
        },
        {
          h3: 'Career Growth Tips for Sagittarius',
          content: `Use this energetic period to map out long-term goals. Visualize where you'd like to be and take steps, however small, toward that vision daily.`
        }
      ]
    },
    {
      h2: 'Sagittarius Money Horoscope Today',
      h3s: [
        {
          h3: 'Financial Opportunities & Warnings',
          content: `Adventure may beckon in finances today, but be cautious with speculative ventures. Ground your decisions in solid research and avoid impulsive risks.`
        },
        {
          h3: 'Smart Money Moves for Sagittarius Today',
          content: `Consider investing in experiences that broaden your horizons—education, travel, or workshops—these are wise expenditures now.`
        }
      ]
    },
    {
      h2: 'Sagittarius Health Horoscope Today',
      h3s: [
        {
          h3: 'Physical Wellness & Energy Levels',
          content: `Your energy is high but can be scattered. Engage in activities that combine movement and mindfulness like yoga, hiking, or martial arts.`
        },
        {
          h3: 'Emotional & Mental Health Focus',
          content: `Keep optimism balanced with moments of reflection. Journaling your feelings or meditating can help ground your restless spirit.`
        },
        {
          h3: 'Self-Care Rituals Recommended for Sagittarius',
          content: `Wear or meditate with a Yellow Sapphire (Pukhraj) to enhance Jupiter’s positive energy and support wisdom and protection.`
        }
      ]
    },
    {
      h2: 'Sagittarius Sign Attributes',
      h3s: [
        {
          h3: 'Key Traits of Sagittarius Zodiac Sign',
          content: `Optimistic, adventurous, philosophical. Sagittarius seeks truth and freedom in all things.`
        },
        {
          h3: 'Strengths & Weaknesses',
          content: `Strength: Vision and courage. Weakness: Restlessness and impatience.
When you channel your energy with balance, nothing can stop your journey forward.`
        },
        {
          h3: 'How These Traits Affect Sagittarius Daily Life',
          content: `You naturally inspire others, but you also need time to recharge and contemplate your next grand adventure. Respect both needs.`
        }
      ]
    },
    {
      h2: 'Sagittarius Compatibility Chart',
      h3s: [
        {
          h3: 'Best Matches for Today',
          content: `Aries, Leo, Libra, Aquarius, Sagittarius, Gemini`
        },
        {
          h3: 'Signs to Approach with Caution',
          content: `Taurus, Cancer, Virgo, Scorpio, Capricorn, Pisces`
        }
      ]
    },
    {
      h2: 'Frequently Asked Questions',
      h3s: [
        {
          h3: 'Is today a good day for Sagittarius?',
          content: `Yes—especially for learning, growth, and expanding your horizons.`
        },
        {
          h3: 'What is the lucky color for Sagittarius today?',
          content: `Purple or royal blue, resonating with Jupiter’s expansive energy.`
        },
        {
          h3: 'How will Sagittarius love life be today?',
          content: `Open and adventurous—embrace new possibilities and honest conversations.`
        },
        {
          h3: 'What is Sagittarius lucky number today?',
          content: `3, symbolizing creativity, joy, and the spirit of adventure.`
        }
      ]
    }
  ]
},

  capricorn: {
  slug: '/todays-horoscope/capricorn',
  h1: 'Capricorn Daily Horoscope',
  intro: `"Climbing the mountain is not about speed, Capricorn—it’s about knowing each step is a sacred act."
Over my 18 years as a karmic astrologer, I have seen Capricorn natives achieve great heights. But I’ve also seen them burn out when they forget to honor the journey, not just the destination.
At AstroSight, we treat your daily horoscope as a compass, rooted in Jyotish Shastra, divisional charts, and Mahadasha calculations, guiding you with the precision and respect your disciplined soul deserves.`,
  sections: [
    {
      h2: 'Capricorn Horoscope Today Overview',
      h3s: [
        {
          h3: 'General Vibes & Cosmic Energy',
          content: `Saturn, your ruling planet, offers slow but steady support today. You may feel an inner call to review your long-term goals or recommit to your core responsibilities.
I often remind my Capricorn clients: “Results matter, but so does the quality of your effort.” Today invites sustainable structure—and maybe even divine patience.
Not everything needs solving right now. Some mountains are climbed step by wise step.`
        },
        {
          h3: 'Daily wisdom quote',
          content: `"Discipline is devotion in action."`
        }
      ]
    },
    {
      h2: 'Capricorn Love Horoscope Today',
      h3s: [
        {
          h3: 'For Singles',
          content: `If you're single, your practical outlook may clash with more spontaneous romantic energies around you. Use this contrast to clarify your values. Serious connections are possible—especially with someone who shares your ambition.`
        },
        {
          h3: 'For Couples',
          content: `Today is perfect for making quiet, meaningful progress in your relationship. Discuss shared goals, finances, or long-term plans—you thrive in structure and so does your love story.`
        },
        {
          h3: 'Tips for Strengthening Emotional Bonds',
          content: `Let your vulnerability peek out from beneath the armor. A small confession or thank-you yields deep emotional dividends.`
        }
      ]
    },
    {
      h2: 'Capricorn Career Horoscope Today',
      h3s: [
        {
          h3: 'Workplace Dynamics & Opportunities',
          content: `You're in execution mode at work. People will look to you for reliability and leadership. Use this influence to move projects forward and set smarter systems in place.`
        },
        {
          h3: 'Challenges Capricorn Might Face Today',
          content: `Avoid micromanaging or becoming overly critical. Lead by wisdom, not control. Let younger colleagues learn by trying.`
        },
        {
          h3: 'Career Growth Tips for Capricorn',
          content: `Revisit an old idea or proposal—it may now have the green light. Often, delays lead to refinement, and that’s your ultimate strength.`
        }
      ]
    },
    {
      h2: 'Capricorn Money Horoscope Today',
      h3s: [
        {
          h3: 'Financial Opportunities & Warnings',
          content: `It’s an ideal time to review long-term investments, retirement accounts, or start that savings goal you've been postponing. No overnight riches—just slow, sure success.`
        },
        {
          h3: 'Smart Money Moves for Capricorn Today',
          content: `Invest in something with structure: gold, property, or your continued education. These decisions compound over time—aligned to your karmic dharma.`
        }
      ]
    },
    {
      h2: 'Capricorn Health Horoscope Today',
      h3s: [
        {
          h3: 'Physical Wellness & Energy Levels',
          content: `Your endurance is strong today. Opt for routines that build stamina—weight training, walking, or yoga rooted in breath control.`
        },
        {
          h3: 'Emotional & Mental Health Focus',
          content: `Don’t bottle things up. Emotions need healthy release. Talk to a supportive friend or channel frustrations into journaling or art.`
        },
        {
          h3: 'Self-Care Rituals Recommended for Capricorn',
          content: `Take a warm salt bath to clear psychic debris and soothe tired bones. Meditate on the Muladhara (Root) Chakra to restore steadiness.`
        }
      ]
    },
    {
      h2: 'Capricorn Sign Attributes',
      h3s: [
        {
          h3: 'Key Traits of Capricorn Zodiac Sign',
          content: `Disciplined, determined, dependable. Capricorn is the zodiac’s wise mountain-climber—success comes from strategy and spiritual grit.`
        },
        {
          h3: 'Strengths & Weaknesses',
          content: `Strength: Patience, responsibility, realism.
Weakness: Rigidity, pessimism.

When you rise above self-doubt and learn to rest along the way, you accomplish the extraordinary.`
        },
        {
          h3: 'How These Traits Affect Capricorn Daily Life',
          content: `You bring structure, stability, and security. But you must balance productivity with peace—remember, being is also doing.`
        }
      ]
    },
    {
      h2: 'Capricorn Compatibility Chart',
      h3s: [
        {
          h3: 'Best Matches for Today',
          content: `Taurus, Virgo, Scorpio, Pisces, Capricorn, Cancer`
        },
        {
          h3: 'Signs to Approach with Caution',
          content: `Aries, Gemini, Leo, Libra, Sagittarius, Aquarius`
        }
      ]
    },
    {
      h2: 'Frequently Asked Questions',
      h3s: [
        {
          h3: 'Is today a good day for Capricorn?',
          content: `Yes—especially for goal setting, internal work, and grounded decision-making.`
        },
        {
          h3: 'What is the lucky color for Capricorn today?',
          content: `Steel gray or navy—colors of determination and Saturn’s steadying grace.`
        },
        {
          h3: 'How will Capricorn love life be today?',
          content: `Solid and serious—perfect for taking meaningful steps forward in relationship goals.`
        },
        {
          h3: 'What is Capricorn lucky number today?',
          content: `8, Saturn’s number. It symbolizes strength through patience and karma.`
        }
      ]
    }
  ]
},
  aquarius: {
  slug: '/todays-horoscope/aquarius',
  h1: 'Aquarius Daily Horoscope',
  intro: `"Innovation is your nature, Aquarius—but remember, true revolution begins within."
This is something I’ve shared with countless Aquarius natives who come seeking clarity on their role in the world. You’re the visionary, the rebel, the thinker ahead of your time.
But as I often remind them, the most profound changes don’t always happen in the public eye. Sometimes, it’s the quiet shifts within that ripple out into extraordinary transformations.
At AstroSight, your horoscope is prepared not as a prediction, but as a sacred dialogue between your karmic blueprint and today’s cosmic weather, through Vedic Jyotish Shastra, divisional charts, and planetary periods.`,
  sections: [
    {
      h2: 'Aquarius Horoscope Today Overview',
      h3s: [
        {
          h3: 'General Vibes & Cosmic Energy',
          content: `Uranus, your modern ruler, brings a mentally stimulating energy to the day. You may feel flashes of inspiration, restless curiosity, or the sudden urge to break free from monotony.
I remember advising an Aquarius journalist during a similar Uranian alignment—she left a corporate job to freelance, and though scared, found more freedom, purpose, and success.
Today’s energy encourages you to explore new possibilities, but only if you're willing to trust your inner voice over external pressure.`
        },
        {
          h3: 'Daily wisdom quote',
          content: `"Change starts within. Evolution is personal before it's global."`
        }
      ]
    },
    {
      h2: 'Aquarius Love Horoscope Today',
      h3s: [
        {
          h3: 'For Singles',
          content: `Single Aquarius? Expect intriguing conversations over deep connections. You may find love where intellect and ideas meet—perhaps online or in unexpected digital spaces.`
        },
        {
          h3: 'For Couples',
          content: `Today is perfect for breaking routines in your relationship. Surprise your partner with something unconventional—a new activity, an honest talk, or an idea that’s uniquely you.`
        },
        {
          h3: 'Tips for Strengthening Emotional Bonds',
          content: `Embrace emotional honesty. Share hopes for the future. Your detached exterior sometimes hides a deeply romantic soul—let that shine.`
        }
      ]
    },
    {
      h2: 'Aquarius Career Horoscope Today',
      h3s: [
        {
          h3: 'Workplace Dynamics & Opportunities',
          content: `You’re full of original insights today. Pitch innovative ideas or take a different approach to problems. Tech-related projects or collaborative brainstorms are favored.`
        },
        {
          h3: 'Challenges Aquarius Might Face Today',
          content: `Avoid coming across as aloof or noncommittal. Explain your vision clearly so others can join you, not feel left behind.`
        },
        {
          h3: 'Career Growth Tips for Aquarius',
          content: `Carve out time alone to refine your big ideas. Then, share them in small, actionable ways—it creates powerful momentum.`
        }
      ]
    },
    {
      h2: 'Aquarius Money Horoscope Today',
      h3s: [
        {
          h3: 'Financial Opportunities & Warnings',
          content: `A surprising opportunity to earn through unconventional means—tech, consulting, or innovation—may emerge. Be open, but vet all deals thoroughly.`
        },
        {
          h3: 'Smart Money Moves for Aquarius Today',
          content: `Donate to a cause close to your heart or invest in a group initiative. Aligning finances with vision fuels karmic prosperity.`
        }
      ]
    },
    {
      h2: 'Aquarius Health Horoscope Today',
      h3s: [
        {
          h3: 'Physical Wellness & Energy Levels',
          content: `You may feel mentally wired but physically tense. Stretching, breathing exercises, or movement in nature helps reset your nervous system.`
        },
        {
          h3: 'Emotional & Mental Health Focus',
          content: `Avoid overthinking the future. Anchor yourself in the present through journaling, or a digital detox to reconnect with reality.`
        },
        {
          h3: 'Self-Care Rituals Recommended for Aquarius',
          content: `Take a cool shower or visual cleansing meditation. Blue crystals (like sodalite or lapis lazuli) can ground your thoughts into clarity.`
        }
      ]
    },
    {
      h2: 'Aquarius Sign Attributes',
      h3s: [
        {
          h3: 'Key Traits of Aquarius Zodiac Sign',
          content: `Innovative, visionary, independent. Aquarius sees the world not as it is—but as it could be.`
        },
        {
          h3: 'Strengths & Weaknesses',
          content: `Strength: Original ideas and humanitarian heart. Weakness: Emotional detachment, unpredictability.
Balance your logic with empathy and human warmth to elevate your gift.`
        },
        {
          h3: 'How These Traits Affect Aquarius Daily Life',
          content: `You’re a walking think-tank and changemaker. But don’t forget—human touch and connection are equally revolutionary.`
        }
      ]
    },
    {
      h2: 'Aquarius Compatibility Chart',
      h3s: [
        {
          h3: 'Best Matches for Today',
          content: `Gemini, Libra, Sagittarius, Aries, Aquarius, Leo`
        },
        {
          h3: 'Signs to Approach with Caution',
          content: `Cancer, Taurus, Scorpio, Pisces, Virgo, Capricorn`
        }
      ]
    },
    {
      h2: 'Frequently Asked Questions',
      h3s: [
        {
          h3: 'Is today a good day for Aquarius?',
          content: `Absolutely—especially for creative problem-solving, networking, and inspiring breakthroughs.`
        },
        {
          h3: 'What is the lucky color for Aquarius today?',
          content: `Electric blue or violet—both amplify intuition, insight, and individualism.`
        },
        {
          h3: 'How will Aquarius love life be today?',
          content: `Surprising and full of new insights—stay open to emotional depth.`
        },
        {
          h3: 'What is Aquarius lucky number today?',
          content: `4—symbolizing rebellion and building a new foundation in your life.`
        }
      ]
    }
  ]
},
  pisces: {
  slug: '/todays-horoscope/pisces',
  h1: 'Pisces Daily Horoscope',
  intro: `"Your dreams are not escapism, Pisces—they are the maps your soul drew before you arrived here."
I have shared this with many Pisces clients over the years who feared their imaginative, sensitive nature was a weakness in a world that demands logic and structure.
But the truth is, Pisces, your intuition and compassion are your superpowers—and today’s cosmic energies are inviting you to trust them deeply.
At AstroSight, our horoscopes are crafted through ancient Jyotish wisdom, planetary transits, and divisional charts, ensuring every word resonates with your karmic path.`,
  sections: [
    {
      h2: 'Pisces Horoscope Today Overview',
      h3s: [
        {
          h3: 'General Vibes & Cosmic Energy',
          content: `Neptune’s subtle influence today enhances your connection to emotions and creative inspiration. You may feel more in tune with the rhythms of the world around you—but also more sensitive.
I once worked with a Pisces painter who believed she wasn’t “strong” enough for a creative career. But on days like this—when the stars amplify emotional intelligence—her art came alive like magic. She learned that sensitivity *is* strength.
Today is a day for inner listening. Inspiration flows freely if you are still enough to receive it.`
        },
        {
          h3: 'Daily wisdom quote',
          content: `"Still waters reflect the clearest visions."`
        }
      ]
    },
    {
      h2: 'Pisces Love Horoscope Today',
      h3s: [
        {
          h3: 'For Singles',
          content: `For single Pisces, today is about soulful connection. You may feel drawn toward someone artistic, spiritual, or emotionally present. Whether it's in a café, a dream, or a DM—be open to meaningful conversations.`
        },
        {
          h3: 'For Couples',
          content: `Emotions run deep today within your relationship. Share your dreams, desires, and vulnerabilities. This is not a day for surface talk—it’s a day for heart-healing depth.`
        },
        {
          h3: 'Tips for Strengthening Emotional Bonds',
          content: `Make something together—music, a shared vision board, or simply a playlist. Pisces love thrives in imagination and co-creation.`
        }
      ]
    },
    {
      h2: 'Pisces Career Horoscope Today',
      h3s: [
        {
          h3: 'Workplace Dynamics & Opportunities',
          content: `Today enhances your creative, compassionate side. Whether you're in design, healing, social impact, or writing—your ideas sparkle with originality and depth. People may come to you for emotional guidance at work—honor your gifts.`
        },
        {
          h3: 'Challenges Pisces Might Face Today',
          content: `Beware of taking on too much or absorbing others' emotions. Emotional boundaries are vital to prevent burnout.`
        },
        {
          h3: 'Career Growth Tips for Pisces',
          content: `Use your empathy as a strategic asset, not just a service. Your ability to understand people can lead to surprising leadership roles when paired with confidence.`
        }
      ]
    },
    {
      h2: 'Pisces Money Horoscope Today',
      h3s: [
        {
          h3: 'Financial Opportunities & Warnings',
          content: `Follow your intuition on financial matters, but double-check numbers before committing. If it feels “off,” wait. Ethically-aligned or spiritual investments may call to you—be discerning.`
        },
        {
          h3: 'Smart Money Moves for Pisces Today',
          content: `Donate to something meaningful or consider investing in an artistic or healing skill. Align your resources with soul values.`
        }
      ]
    },
    {
      h2: 'Pisces Health Horoscope Today',
      h3s: [
        {
          h3: 'Physical Wellness & Energy Levels',
          content: `Take it slow today. Your body may crave gentleness—stretch, swim, or walk near water if possible. Avoid overstimulation.`
        },
        {
          h3: 'Emotional & Mental Health Focus',
          content: `You are extremely empathic today. Meditate with calming sounds or visualize protective light around you. Boundaries bring emotional peace.`
        },
        {
          h3: 'Self-Care Rituals Recommended for Pisces',
          content: `Burn lavender or sandalwood incense. Bathe feet in warm salt water. Carry an amethyst or moonstone for emotional grounding.`
        }
      ]
    },
    {
      h2: 'Pisces Sign Attributes',
      h3s: [
        {
          h3: 'Key Traits of Pisces Zodiac Sign',
          content: `Compassionate, dreamy, intuitive. Pisces feels everything and sees what others miss. You’re guided as much by the heart as the heavens.`
        },
        {
          h3: 'Strengths & Weaknesses',
          content: `Strength: Deep empathy and creativity.  
Weakness: Escapism or emotional overwhelm.  
When expressed positively, your sensitive nature becomes your divine compass.`
        },
        {
          h3: 'How These Traits Affect Pisces Daily Life',
          content: `You perceive and intuit what others overlook. But remember—your inner world is sacred and needs equal care as the outer.`
        }
      ]
    },
    {
      h2: 'Pisces Compatibility Chart',
      h3s: [
        {
          h3: 'Best Matches for Today',
          content: `Cancer, Scorpio, Taurus, Capricorn, Pisces, Virgo`
        },
        {
          h3: 'Signs to Approach with Caution',
          content: `Aries, Gemini, Leo, Libra, Sagittarius, Aquarius`
        }
      ]
    },
    {
      h2: 'Frequently Asked Questions',
      h3s: [
        {
          h3: 'Is today a good day for Pisces?',
          content: `Yes—especially for anything involving creativity, spiritual renewal, or emotional connection.`
        },
        {
          h3: 'What is the lucky color for Pisces today?',
          content: `Sea green or lilac—colors that calm and elevate your ethereal essence.`
        },
        {
          h3: 'How will Pisces love life be today?',
          content: `Deep and dreamy. You’re more emotionally connected—perfect for soulful conversations.`
        },
        {
          h3: 'What is Pisces lucky number today?',
          content: `7—a number of intuition, mysticism, and creative insight.`
        }
      ]
    }
  ]
}

  // Add Cancer & all remaining signs in the *same structure*.
};

const DailyHoroscopeFull = ({ sign }) => {
  const selected = dailyArticles?.[sign?.toLowerCase()];
  if (!selected) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 text-lg">Horoscope not found for the sign: <b>{sign}</b></p>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-10 font-inter text-black">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">{selected.h1}</h1>

      {/* Intro */}
      <p className="text-lg text-gray-800 whitespace-pre-line mb-10">{selected.intro}</p>

      {/* Sections */}
      {selected.sections.map((section, i) => (
        <section key={i} className="mb-10">
          <h2 className="text-2xl font-semibold text-[#f46434] border-b pb-1 mb-4">
            {section.h2}
          </h2>

          {section.h3s.map((h3Item, j) => (
            <div key={j} className="mb-6">
              <h3 className="text-lg font-medium mb-1">{h3Item.h3}</h3>
              <p className="text-gray-700 whitespace-pre-line">{h3Item.content}</p>
            </div>
          ))}
        </section>
      ))}
    </article>
  );
};

export default DailyHoroscopeFull;
