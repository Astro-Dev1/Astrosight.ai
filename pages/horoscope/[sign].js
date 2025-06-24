import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { format} from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs,  TabsContent } from "@/components/ui/tabs";
import HoroscopeCard from "../../components/Horor";
import HoroscopePageForMW from "../../components/HoroscopePageForMW";
// Horoscope data (unchanged from your input)
const horoscopeData = {
  "aries": {
    "description": "Aries, the trailblazer of the zodiac, takes the lead as the first sign in astrology. Known for their dynamic energy and fearless attitude, Aries individuals are always ready to face challenges head-on. Aries Today's Horoscope reveals that these natives, ruled by the fire element, possess a natural inclination to take risks and pursue bold actions. With their unwavering determination and fiery spirit, Aries stands out as a sign that thrives on enthusiasm and spontaneity.",
    "date_range": "March 21 - April 19",
    "ruling_planet": "Mars",
    "element": "Fire",
    "personality_traits": {
      "Honesty and Directness": "Aries natives are known for their unfiltered truthfulness. Their candid communication style may sometimes appear blunt, but their intentions are always genuine. Their forthright nature makes them reliable, even if their words occasionally sting.",
      "Fiery Temperament": "According to Aries Today's Horoscope, their temper is as fiery as their ruling element. They are not fans of being contradicted, as they take pride in their efforts. However, learning to manage this intensity is a lifelong journey that can lead to personal growth.",
      "Boundless Energy": "Aries individuals are known for their seemingly endless energy. Whether it's working tirelessly or indulging in their hobbies, they dedicate themselves fully to whatever they do.",
      "Optimism and Creativity": "Aries Today's Horoscope emphasizes their optimistic outlook. These natives possess a natural ability to find solutions and maintain hope even in challenging situations. Surprisingly, they are also highly creative and offer unique ideas when given the opportunity."
    },
    "celebrities": [
      "Not provided in content"
    ],
    "key_interests": {
      "Attention-Seeking Nature": "Aries loves being in the spotlight and appreciates recognition for their efforts. Their need for attention is often balanced by their generosity toward those who support them.",
      "Adventurous Spirit": "Aries Today's Horoscope often mentions their love for challenges. Whether it’s tackling a new project or exploring uncharted territory, these individuals thrive on adventure.",
      "Authenticity": "One of Aries' standout qualities is their authenticity. They value honesty and prefer genuine connections over superficial relationships."
    },
    "daily_insights": {
      "career": "For Aries, career success is a priority. Aries Today's Horoscope offers insights into their professional growth, whether they are planning a new business venture or tackling challenges at work.",
      "love": "Aries natives are passionate lovers. Their love horoscope helps them understand their emotions and predict how their romantic endeavors might unfold. Itʼs a helpful guide for those planning special moments with their partners.",
      "health": "Health is crucial for maintaining their energetic lifestyle. Aries Today's Horoscope serves as a reminder to balance their vigorous pursuits with self-care practices.",
      "compatibility": "Finding the perfect partner is a significant quest for Aries. Their compatibility horoscope provides guidance on which zodiac signs align best with their fiery personality.",
      "finance": "Managing finances can be tricky for Aries, as their impulsive nature sometimes leads to overspending. Aries Today's Horoscope sheds light on their financial prospects, helping them make informed decisions."
    },
    "faqs": [
      {
        "question": "What are Aries' key characteristics?",
        "answer": "Aries Today's Horoscope highlights their boldness, honesty, and optimism. As natural leaders, they excel in motivating themselves and others, making them dynamic personalities in any group."
      },
      {
        "question": "What is the Aries spirit animal?",
        "answer": "The Ram symbolizes Aries. This animal reflects their strength, resilience, and determination, qualities often seen in Aries Today's Horoscope predictions."
      },
      {
        "question": "What are Aries' weaknesses?",
        "answer": "As highlighted in Aries Today's Horoscope, their stubbornness and tendency to take losses personally are areas they need to work on. They should focus on embracing experiences, even when they involve setbacks."
      },
      {
        "question": "What are Aries' birth dates?",
        "answer": "Aries individuals are born between March 21 and April 19. Aries Today's Horoscope provides tailored insights for each day, helping them make the most of their journey."
      },
      {
        "question": "What planet rules Aries?",
        "answer": "Mars is the ruling planet of Aries. Aries Today's Horoscope frequently emphasizes the influence of Mars, which bestows them with courage, energy, and an adventurous spirit."
      }
    ]
  },
  "taurus": {
    "description": "Taurus, the second sign of the zodiac, represents stability, strength, and sensuality. Born between April 20 and May 20, Taureans are symbolized by the bull, embodying determination and calmness. Taurus Today's Horoscope highlights their Venus-ruled nature, showcasing their love for beauty, luxury, and life's pleasures. Known for their unwavering loyalty and grounded personality, Taurus natives are a unique blend of passion and practicality.",
    "date_range": "April 20 - May 20",
    "ruling_planet": "Venus",
    "element": "Earth",
    "personality_traits": {
      "Perseverance": "Taurus Today's Horoscope often emphasizes their resilience. Taureans are the ones you can count on to tackle any challenge with patience and determination. Their consistent efforts ensure they achieve their goals, no matter how long it takes.",
      "Aesthetic Appreciation": "Ruled by Venus, Taurus natives have an inherent love for beauty. Their homes, wardrobes, and even their meals reflect their refined taste. Taurus Today's Horoscope frequently mentions their knack for creating a comfortable and pleasing environment.",
      "Patience and Thoughtfulness": "Taureans take their time to analyze situations thoroughly before making decisions. While this cautious approach is often mistaken for laziness, it stems from their deep desire to be thoughtful and deliberate in every step they take.",
      "Sensuality and Passion": "Taurus Today's Horoscope underlines their strong connection to the material world. From savoring a gourmet meal to enjoying physical intimacy, Taureans are highly sensuous beings who deeply appreciate life's tangible pleasures."
    },
    "celebrities": [
      "Not provided in content"
    ],
    "key_interests": {
      "Money and Stability": "Taurus natives prioritize financial security and excel at managing their resources. They are excellent at saving and investing, ensuring a comfortable life.",
      "Food and Cooking": "Taurus doesn't just eat food—they revel in it! Whether cooking a gourmet meal or exploring new cuisines, their love for food knows no bounds.",
      "Relaxation and Comfort": "Give a Taurus a cozy blanket, good food, and a relaxing environment, and they’re in heaven."
    },
    "daily_insights": {
      "career": "Despite their laid-back demeanor, Taurus natives excel at work when it comes to meeting deadlines and delivering results. Taurus Today's Horoscope suggests that their methodical and reliable nature makes them invaluable in professional settings.",
      "love": "Romantic and loyal, Taurus natives are devoted partners. Their relationships thrive on physical and emotional intimacy. Taurus Today's Horoscope provides insights into their love life, helping them navigate emotions and expectations.",
      "health": "Taurus individuals are generally robust and capable of handling stress with ease. Taurus Today's Horoscope often highlights their ability to maintain good health but advises them to stay active and avoid overindulging in food.",
      "compatibility": "Taurus natives find compatibility with partners who appreciate their love for stability and sensuality. Their reliable nature ensures lasting relationships.",
      "finance": "Taurus natives are financially savvy, known for their cautious spending and smart investments. Taurus Today's Horoscope encourages them to continue building their financial security while indulging occasionally in their love for luxury."
    },
    "faqs": [
      {
        "question": "What are Taurus' key characteristics?",
        "answer": "Taurus Today's Horoscope highlights their loyalty, practicality, and love for comfort. Ruled by Venus, Taureans appreciate beauty, stability, and the finer things in life."
      },
      {
        "question": "What animal represents Taurus?",
        "answer": "The bull symbolizes Taurus. Known for its strength and determination, the bull reflects the Taurean qualities of perseverance, loyalty, and resilience."
      },
      {
        "question": "What is Taurus' personality like?",
        "answer": "Taurus individuals are grounded, patient, and reliable. They dislike sudden changes and value security. According to Taurus Today's Horoscope, they are sensual, hardworking, and deeply connected to the material world."
      },
      {
        "question": "What is Taurus' zodiac month?",
        "answer": "Taurus season spans from April 20 to May 20. Taurus Today's Horoscope offers daily insights to help them navigate life during this time."
      },
      {
        "question": "What is Taurus' weakness?",
        "answer": "While their strengths are numerous, Taurus can be stubborn, possessive, and overly materialistic. Taurus Today's Horoscope often advises them to embrace flexibility and prioritize emotional connections over material gains."
      }
    ]
  },
  "gemini": {
    "description": "Gemini, the third sign of the zodiac, is a true chameleon, effortlessly blending into any situation with their adaptability and charm. Represented by the Twins, Castor and Pollux, Gemini natives are versatile, intelligent, and bursting with energy. Gemini Today's Horoscope highlights their quick-witted nature, their love for adventure, and their ability to bring fresh energy to every scenario. With an air element and Mercury as their ruling planet, Geminis are natural communicators and lifelong learners.",
    "date_range": "May 21 - June 20",
    "ruling_planet": "Mercury",
    "element": "Air",
    "personality_traits": {
      "Outgoing and Social": "Gemini Today's Horoscope often describes these natives as the life of the party. Their charismatic personality allows them to spark conversations about anything, from the weather to the latest trends. They are quick to make friends and can light up any room with their humor and charm.",
      "Adaptability": "Geminis are masters of change. They can seamlessly adjust to different situations and match the energy of those around them. Gemini Today's Horoscope often emphasizes their adventurous spirit and willingness to try new things.",
      "Creative and Expressive": "Ruled by Mercury, the planet of communication, Geminis excel in expressing their thoughts creatively. Whether through art, writing, or even their fashion sense, their ideas flow endlessly, making them stand out.",
      "Energetic and Curious": "Geminis are perpetually curious, always seeking new knowledge and experiences. Gemini Today's Horoscope frequently highlights their restless energy, which drives them to stay productive and explore various interests.",
      "Moody and Restless": "While they are fun-loving and engaging, Geminis can also be moody and need time to recharge. Gemini Today's Horoscope advises giving them space to regain their energy and avoid their darker moods."
    },
    "celebrities": [
      "Not provided in content"
    ],
    "key_interests": {
      "Strength and Confidence in Others": "Geminis admire strong personalities and seek partners who can match their energy and independence.",
      "Independence": "Geminis love their freedom and dislike being tied down. They need space to explore their passions.",
      "Adventure and Fun": "Geminis are always up for an adventure. Whether it’s a spontaneous trip or a late-night conversation, they live for experiences that break the monotony of everyday life."
    },
    "daily_insights": {
      "career": "Gemini Today's Horoscope reveals their knack for turning passion into profession. Their intelligence and adaptability make them great at problem-solving, and they excel in careers that require creativity, communication, and versatility.",
      "love": "Geminis are romantics at heart, known for their passion and loyalty once committed. Gemini Today's Horoscope often highlights their love for surprises, romantic gestures, and keeping the spark alive in relationships.",
      "health": "While generally energetic, Geminis sometimes overwork themselves, leading to exhaustion. Gemini Today's Horoscope advises balancing their enthusiasm with proper rest and self-care.",
      "compatibility": "Geminis share great compatibility with Libra, Aquarius, Leo, and Aries. These pairings match their social, intellectual, and adventurous nature. Gemini Today's Horoscope suggests avoiding overly rigid or controlling partners.",
      "finance": "Geminis are not materialistic but can sometimes overspend on experiences or things they enjoy. Gemini Today's Horoscope encourages them to balance their spending with smart savings."
    },
    "faqs": [
      {
        "question": "What are Gemini's key characteristics?",
        "answer": "Gemini Today's Horoscope highlights their adaptability, intelligence, and social nature. They are creative, curious, and thrive in dynamic environments. While their mood swings can be a challenge, their fun-loving personality keeps them engaging and exciting."
      },
      {
        "question": "What animal represents Gemini?",
        "answer": "The spirit animal of Gemini is the deer, symbolizing energy, wit, and charm. Much like a deer, Geminis are quick, intelligent, and enjoy entertaining others with their playful and lively demeanor."
      },
      {
        "question": "What is a Gemini's personality like?",
        "answer": "Geminis are versatile, fun-loving, and intellectual. They can shift effortlessly between being the party's life on Friday night and a workaholic on Monday morning. Gemini Today's Horoscope emphasizes their dual nature, making them both exciting and unpredictable."
      },
      {
        "question": "What planet rules Gemini?",
        "answer": "Mercury, the planet of communication and intellect, rules Gemini. This influence makes Geminis exceptional communicators, quick learners, and natural problem-solvers."
      },
      {
        "question": "What are Gemini's weaknesses?",
        "answer": "Gemini Today's Horoscope points out their indecisiveness, mood swings, and tendency to overanalyze. While their curiosity is a strength, it can also make them nosy or interfere where theyʼre not needed."
      }
    ]
  },
  "cancer": {
    "description": "Cancer, the fourth zodiac sign, is a complex blend of sensitivity, loyalty, and intuition. Born between June 21 and July 22, Cancer natives are ruled by the Moon, which governs their emotional nature and nurturing instincts. Cancer Today's Horoscope highlights their depth of emotion, their ability to care for others, and their quiet strength. Represented by the Crab, Cancerians may appear tough on the outside but possess a soft, compassionate core.",
    "date_range": "June 21 - July 22",
    "ruling_planet": "The Moon",
    "element": "Water",
    "personality_traits": {
      "Loyalty": "Cancer Today's Horoscope frequently underscores their steadfast loyalty. Be it as a friend, partner, or colleague, Cancerians are unwavering in their commitments. Their reliability makes them an invaluable presence in anyoneʼs life.",
      "Intuition": "Ruled by the Moon, Cancerians have a heightened sense of intuition. Cancer Today's Horoscope often highlights their ability to sense emotions and read situations accurately, guiding them toward wise decisions.",
      "Nurturing Nature": "Cancer natives are natural caregivers. Their kind hearts compel them to prioritize others' comfort, sometimes at the expense of their own. Cancer Today's Horoscope advises them to find a balance between giving and self-care.",
      "Emotional Depth": "Cancerians are deeply emotional, and their feelings run as deep as the ocean. While this makes them empathetic, Cancer Today's Horoscope often advises them to protect their hearts from unnecessary hurt.",
      "Creative and Domestic-Oriented": "With their love for cooking and a keen sense of comfort, Cancerians create warm, welcoming spaces. Cancer Today's Horoscope highlights their creativity, especially in domestic settings, where they truly shine."
    },
    "celebrities": [
      "Not provided in content"
    ],
    "key_interests": {
      "Loyalty and Trust": "Cancer natives are steadfastly loyal and deeply value trust in relationships.",
      "Nurturing Nature": "Cancerians thrive when they are caring for others. They are natural caregivers who find joy in creating a supportive environment.",
      "Emotional Depth": "Cancerians value deep emotional connections and seek bonds that resonate with their soulful nature."
    },
    "daily_insights": {
      "career": "Ambitious yet sensitive, Cancerians often face challenges balancing their emotions in professional settings. Cancer Today's Horoscope offers guidance on navigating career decisions and achieving success without sacrificing their emotional well-being.",
      "love": "Cancer Today's Horoscope reveals their deep emotional connection to love. Loyal and devoted, Cancerians thrive in relationships that offer stability and security. Their romantic nature makes them excellent partners who cherish small gestures of affection.",
      "health": "Cancer Today's Horoscope tracks their health with a focus on emotional and physical balance. Cancerians are advised to manage stress and prioritize self-care to avoid burnout.",
      "compatibility": "Cancerians find compatibility with signs like Taurus, Virgo, Scorpio, and Pisces. Cancer Today's Horoscope suggests focusing on partners who understand their emotional depth and value their nurturing qualities.",
      "finance": "Cancerians are generally good with finances, preferring stability over risk. Cancer Today's Horoscope helps them navigate financial decisions wisely and avoid overspending on unnecessary comforts."
    },
    "faqs": [
      {
        "question": "What are Cancerʼs key characteristics?",
        "answer": "Cancer Today's Horoscope highlights their nurturing, emotional, and loyal nature. They are intuitive, sensitive, and deeply connected to their family and loved ones."
      },
      {
        "question": "What is Cancer's spirit animal?",
        "answer": "The spirit animal of Cancer is the Crab. Much like the Crab, Cancerians shield their emotions with a tough exterior, making it challenging for others to understand their inner feelings."
      },
      {
        "question": "What is Cancer's personality like?",
        "answer": "Cancerians are deeply emotional, empathetic, and creative. While their emotions are their strength, Cancer Today's Horoscope often advises them to manage emotional vulnerability and avoid overthinking."
      },
      {
        "question": "What are Cancerʼs zodiac dates?",
        "answer": "Cancer natives are born between June 21 and July 22. Cancer Today's Horoscope provides insights for these individuals, helping them navigate each day with clarity."
      },
      {
        "question": "Which planet rules Cancer?",
        "answer": "The Moon rules Cancer, influencing their emotions, intuition, and nurturing instincts. Cancer Today's Horoscope often emphasizes the Moonʼs impact on their mood and decision-making."
      }
    ]
  },
  "leo": {
    "description": "Leo, the fifth zodiac sign, represents power, passion, and vitality. Born between July 23 and August 22, Leos are ruled by the Sun, embodying its radiance and energy. Leo Today's Horoscope highlights their natural leadership abilities, love for attention, and unwavering confidence. Known for their magnetic charisma, Leos light up every room they enter and inspire others with their enthusiasm.",
    "date_range": "July 23 - August 22",
    "ruling_planet": "The Sun",
    "element": "Fire",
    "personality_traits": {
      "Highly Active": "Leos are full of energy and always on the go. Leo Today's Horoscope often emphasizes their quick instincts, creative spirit, and fearless approach to life. They thrive on action and are always ready to take on challenges with a brave heart.",
      "Inspiring and Motivating": "Leo natives are natural motivators. Their confidence and positive energy encourage those around them to strive for greatness. Leo Today's Horoscope underscores their ability to uplift and inspire others with their charismatic leadership.",
      "Emotional and Sensitive": "Beneath their bold exterior, Leos are deeply emotional. They wear their hearts on their sleeves and often feel deeply connected to those they care about. Leo Today's Horoscope frequently advises them to channel their emotions constructively to avoid becoming overwhelmed.",
      "Attention-Seeking": "Leos love being the center of attention and arenʼt shy about showcasing their talents. According to Leo Today's Horoscope, they often go the extra mile to stand out, but their natural charm ensures they rarely come across as overbearing.",
      "Hot-Tempered": "As a fire sign, Leos are prone to sudden bursts of anger. While theyʼre generally laid-back, being challenged or disrespected can bring out their temper. Leo Today's Horoscope encourages them to practice patience and mindfulness."
    },
    "celebrities": [
      "Not provided in content"
    ],
    "key_interests": {
      "Recognition and Fame": "Leos thrive on being in the limelight and receiving acknowledgment for their talents and achievements.",
      "Leadership": "Leos enjoy being at the forefront, leading projects, and inspiring others with their charisma.",
      "Luxury and Comfort": "Leos have a penchant for fine living and love surrounding themselves with beauty and comfort."
    },
    "daily_insights": {
      "career": "Leo Today's Horoscope describes them as ambitious and creative professionals. They excel in leadership roles and careers that allow them to express their creativity, such as acting, writing, or entrepreneurship.",
      "love": "Leos are passionate and intense lovers. They crave excitement and enjoy grand romantic gestures. Leo Today's Horoscope often highlights their need for a partner who can match their enthusiasm and loyalty.",
      "health": "Leos are generally energetic, but their fiery temper and tendency to overcommit can lead to stress. Leo Today's Horoscope advises them to balance their physical and emotional health by taking breaks and indulging in self-care.",
      "compatibility": "Leos share great compatibility with Aries, Sagittarius, Gemini, and Libra. Their fiery nature is best matched with partners who appreciate their vibrancy and share their zest for life.",
      "finance": "Leos love spending money on luxury and experiences, but theyʼre also generous and thoughtful in their financial decisions. Leo Today's Horoscope encourages them to balance indulgence with saving for the future."
    },
    "faqs": [
      {
        "question": "What are Leoʼs key characteristics?",
        "answer": "Leo Today's Horoscope highlights their confidence, leadership, and creativity. They are warm, sociable, and inspiring individuals who thrive on recognition and admiration."
      },
      {
        "question": "What animal represents Leo?",
        "answer": "The Lion is the symbol of Leo, representing strength, courage, and royalty. Leos embody the majestic qualities of this powerful animal, making them natural leaders and protectors."
      },
      {
        "question": "What is a Leoʼs personality like?",
        "answer": "Leos are outgoing, ambitious, and generous. They have an innate ability to lead and inspire, but their fiery temper and need for attention can sometimes pose challenges. Leo Today's Horoscope often emphasizes their balance of strength and sensitivity."
      },
      {
        "question": "What planet rules Leo?",
        "answer": "The Sun is the ruling planet of Leo, influencing their vitality, confidence, and magnetic charisma. Leo Today's Horoscope often highlights their ability to shine brightly and bring warmth to those around them."
      },
      {
        "question": "What are Leoʼs lucky colors and numbers?",
        "answer": "Leoʼs lucky color is green, symbolizing growth and renewal, while their lucky number is 4, representing stability and strength."
      }
    ]
  },
  "virgo": {
    "description": "Virgo, the sixth zodiac sign, is a beacon of precision and practicality. Born between August 23 and September 23, Virgos are known for their analytical minds, perfectionist tendencies, and unwavering attention to detail. Represented by the Virgin and ruled by Mercury, Virgo Today's Horoscope emphasizes their love for order, discipline, and intellectual pursuits. These Earth signs thrive on structure and are naturally gifted problem-solvers, making them indispensable in both personal and professional spheres.",
    "date_range": "August 23 - September 23",
    "ruling_planet": "Mercury",
    "element": "Earth",
    "personality_traits": {
      "Ambitious and Determined": "Virgos are go-getters with a will of iron. Virgo Today's Horoscope often highlights their drive to excel in whatever they pursue. Their dedication ensures that they achieve their goals, no matter the challenges.",
      "Perfectionists at Heart": "Virgos strive for perfection in everything they do. Whether itʼs work, relationships, or hobbies, they pay attention to even the smallest details. According to Virgo Today's Horoscope, this meticulous nature sets them apart but can also make them overly self-critical.",
      "Critical Thinkers": "Virgos possess an analytical mind, allowing them to solve complex problems with ease. Virgo Today's Horoscope frequently notes their ability to dissect situations and find practical solutions, making them excellent researchers, writers, and mathematicians.",
      "Organized and Disciplined": "Virgos thrive on order and structure. Their love for organization helps them stay on top of their responsibilities. Virgo Today's Horoscope often advises them to strike a balance between their need for control and embracing lifeʼs unpredictability.",
      "Creative and Reserved": "While Virgos are naturally reserved, they channel their creativity into pursuits like writing, art, and design. Virgo Today's Horoscope often underscores their talent for transforming their ideas into tangible achievements."
    },
    "celebrities": [
      "Not provided in content"
    ],
    "key_interests": {
      "Intelligence and Perfection": "Virgos value intelligence and precision, both in themselves and others. They thrive in structured environments.",
      "Being Organized": "Virgos thrive in environments where everything is in its place.",
      "Loyal and Thoughtful Connections": "Though slow to open up, Virgos are fiercely loyal once they trust someone."
    },
    "daily_insights": {
      "career": "Virgo Today's Horoscope often highlights their professional strengths, including their attention to detail and problem-solving skills. Virgos excel in careers that require analytical thinking and organization, such as research, writing, or management.",
      "love": "Romantic and thoughtful, Virgos make loyal and committed partners. They enjoy grand gestures and heartfelt connections. Virgo Today's Horoscope advises them to avoid being overly critical in relationships and to embrace their partnerʼs imperfections.",
      "health": "Virgosʼ perfectionist tendencies extend to their health. They are disciplined about maintaining fitness but must be cautious about overworking themselves. Virgo Today's Horoscope encourages them to relax and focus on mental well-being.",
      "compatibility": "Virgos share strong compatibility with Taurus, Gemini, and Pisces. According to Virgo Today's Horoscope, these pairings bring balance to their lives, with Taurus providing stability, Gemini sparking intellectual conversations, and Pisces offering emotional depth.",
      "finance": "Virgos are prudent with money, often excelling at saving and investing. Virgo Today's Horoscope suggests they continue their practical approach while allowing themselves occasional indulgences."
    },
    "faqs": [
      {
        "question": "What are Virgoʼs key characteristics?",
        "answer": "Virgo Today's Horoscope highlights their analytical minds, perfectionist tendencies, and disciplined nature. They are loyal, hardworking, and excel in problem-solving, making them reliable and dependable in all areas of life."
      },
      {
        "question": "What animal represents Virgo?",
        "answer": "The spirit animal for Virgo is the fox, symbolizing intelligence, cleverness, and adaptability. Much like the fox, Virgos are resourceful and value precision in their actions."
      },
      {
        "question": "What planet rules Virgo?",
        "answer": "Virgo is ruled by Mercury, the planet of communication and intellect. According to Virgo Today's Horoscope, this influence enhances their analytical thinking and ability to articulate their thoughts clearly."
      },
      {
        "question": "What is Virgoʼs spiritual color?",
        "answer": "Virgoʼs spiritual color is brown, representing dependability, growth, and wisdom. This earthy hue aligns with their grounded nature and practical mindset."
      },
      {
        "question": "What is the Virgo symbol for beauty?",
        "answer": "The Virgo symbol, the Virgin, represents purity, grace, and understated beauty. Virgo Today's Horoscope often notes their refined aesthetic and appreciation for natural elegance."
      }
    ]
  },

  "scorpio": {
    "description": "Scorpio, the eighth sign of the zodiac, is a powerhouse of passion, mystery, and intensity. Born between October 23 and November 21, Scorpios are water signs known for their emotional depth and intuitive prowess. Scorpio Today's Horoscope emphasizes their determination, resourcefulness, and magnetic presence. Governed by Pluto and Mars, Scorpios are dynamic and transformative, often balancing between destruction and renewal.",
    "date_range": "October 23 - November 21",
    "ruling_planet": "Pluto and Mars",
    "element": "Water",
    "personality_traits": {
      "Passionate and Loyal": "Scorpios feel everything deeply, making them passionate in all aspects of life. Scorpio Today's Horoscope often highlights their fierce loyalty, which makes them reliable partners and friends.",
      "Strategic and Ambitious": "Scorpios are master planners who leave no stone unturned when working toward their goals. According to Scorpio Today's Horoscope, their calculated and strategic nature ensures they achieve success, often exceeding expectations.",
      "Curious and Fearless": "Known for their curiosity, Scorpios dive into the unknown without hesitation. They explore life's darker, more complex areas with a fearlessness that sets them apart. Scorpio Today's Horoscope frequently notes their drive to uncover hidden truths.",
      "Vengeful and Protective": "Scorpios have a reputation for holding grudges and seeking revenge when wronged. Scorpio Today's Horoscope advises them to channel this intensity into constructive actions to avoid emotional turmoil.",
      "Private and Intuitive": "Scorpios value their privacy and prefer to operate behind the scenes. Their sharp intuition often guides them in personal and professional matters. Scorpio Today's Horoscope emphasizes their knack for reading people and situations accurately."
    },
    "celebrities": [
      "Not provided in content"
    ],
    "key_interests": {
      "Mystery and Depth": "Scorpios are fascinated by the unknown and thrive on uncovering secrets.",
      "Loyalty and Passion": "They value deep, meaningful relationships and are known for their unwavering loyalty.",
      "Intense Focus": "Scorpios excel at anything they set their minds to, approaching their goals with unmatched intensity."
    },
    "daily_insights": {
      "career": "Scorpio Today's Horoscope highlights their suitability for careers that involve research, investigation, and problem-solving. Their resourcefulness and analytical nature make them excellent detectives, scientists, and strategists.",
      "love": "In love, Scorpios are intense and protective. They pour their heart into their relationships but must be cautious of becoming overly controlling. Scorpio Today's Horoscope encourages them to balance their passion with trust and mutual respect.",
      "health": "Scorpios often push themselves to their limits, which can take a toll on their health. Scorpio Today's Horoscope advises them to prioritize self-care, maintain a healthy diet, and incorporate physical activities into their routine.",
      "compatibility": "Scorpios share strong compatibility with Pisces, Cancer, and Capricorn. These signs balance Scorpio's intensity with emotional understanding and groundedness. Scorpio Today's Horoscope suggests avoiding overly rigid or superficial partners.",
      "finance": "Scorpios view money as a source of power and security. They are skilled at managing finances and making strategic investments. Scorpio Today's Horoscope recommends focusing on long-term financial goals rather than short-term gains."
    },
    "faqs": [
      {
        "question": "What are Scorpioʼs key characteristics?",
        "answer": "Scorpio Today's Horoscope highlights their loyalty, passion, and determination. They are resourceful, intuitive, and fearless individuals who thrive on challenges and mysteries."
      },
      {
        "question": "What animal represents Scorpio?",
        "answer": "The scorpion is the primary symbol for Scorpio, representing resilience, transformation, and self-protection. Other associated animals include the serpent, eagle, and phoenix, symbolizing growth and evolution."
      },
      {
        "question": "What is a Scorpioʼs personality like?",
        "answer": "Scorpios are intense, ambitious, and emotionally deep. According to Scorpio Today's Horoscope, they can be both nurturing and vengeful, depending on how they are treated. Their dynamic nature makes them captivating and complex."
      },
      {
        "question": "What are Scorpioʼs zodiac dates?",
        "answer": "Scorpios are born between October 23 and November 21."
      },
      {
        "question": "What planet rules Scorpio?",
        "answer": "Scorpio is ruled by Mars (ancient ruler) and Pluto (modern ruler). Mars gives Scorpios their drive and determination, while Pluto enhances their transformative and intuitive qualities."
      }
    ]
  },
  "libra": {
    "description": "Libra, the seventh sign of the zodiac, is a symbol of balance, harmony, and intellectual brilliance. Born between September 22 and October 23, Libras are represented by the scales, highlighting their innate desire for fairness and equilibrium in all aspects of life. Governed by Venus, the planet of love, beauty, and luxury, Libra Today's Horoscope emphasizes their love for aesthetics, social connections, and a refined lifestyle.",
    "date_range": "September 22 - October 23",
    "ruling_planet": "Venus",
    "element": "Air",
    "personality_traits": {
      "Diplomatic and Fair": "Libras are the peacemakers of the zodiac. Libra Today's Horoscope often highlights their ability to mediate conflicts and create harmony. They ensure that everyone feels heard and strive to make balanced decisions.",
      "Idealistic and Optimistic": "Libras have a knack for seeing the silver lining in every situation. Their idealistic nature brings hope and positivity to those around them. Libra Today's Horoscope underscores their ability to inspire optimism, even in challenging times.",
      "Social and Charismatic": "Libras thrive in social settings and love connecting with people. Their charming personalities and clever conversational skills make them the life of any gathering. Libra Today's Horoscope frequently emphasizes their love for group dynamics and meaningful relationships.",
      "Aesthetic Appreciation": "Ruled by Venus, Libras are naturally drawn to beauty and luxury. They surround themselves with art, fashion, and decor that reflect their exquisite taste. Libra Today's Horoscope often highlights their ability to create visually pleasing spaces and experiences.",
      "Overthinking and Avoidance of Conflict": "While they seek balance, Libras can become indecisive due to their tendency to weigh every option. Libra Today's Horoscope advises them to trust their instincts and address conflicts directly to avoid unnecessary complications."
    },
    "celebrities": [
      "Not provided in content"
    ],
    "key_interests": {
      "Socializing and Companionship": "Libras love being surrounded by people and enjoy vibrant social settings.",
      "Love and Romance": "Libras have a deep appreciation for romantic gestures and harmonious partnerships.",
      "Aesthetics and Elegance": "Libras are drawn to all things beautiful, from art to fashion, and they have refined taste."
    },
    "daily_insights": {
      "career": "Libras excel in careers that allow them to utilize their creativity and social skills. Libra Today's Horoscope frequently suggests professions like design, art, marketing, or law, where their balance-seeking nature can shine.",
      "love": "Love is central to a Libraʼs life. They seek relationships filled with mutual respect and harmony. Libra Today's Horoscope highlights their desire for a partner who shares their passion for beauty, intellect, and adventure.",
      "health": "Libras value wellness and often strive to maintain a balanced lifestyle. However, they must watch out for stress caused by overthinking. Libra Today's Horoscope advises them to incorporate mindfulness practices into their routine.",
      "compatibility": "Libras share great compatibility with Gemini, Aquarius, and Sagittarius. These signs complement Libraʼs sociable and intellectual nature. Libra Today's Horoscope encourages partnerships that foster mutual growth and understanding.",
      "finance": "Libras enjoy luxury but are also skilled at managing their finances. Libra Today's Horoscope suggests they focus on investments that align with their long-term goals while allowing occasional indulgences."
    },
    "faqs": [
      {
        "question": "What are Libraʼs key characteristics?",
        "answer": "Libra Today's Horoscope highlights their love for balance, fairness, and social harmony. They are intelligent, diplomatic, and charming individuals who value beauty and meaningful relationships."
      },
      {
        "question": "What animal represents Libra?",
        "answer": "The raven and the grey wolf resonate with Libra. Ravens symbolize intelligence and charm, while grey wolves reflect their love for teamwork and social connection."
      },
      {
        "question": "What is Libraʼs personality like?",
        "answer": "Libras are sociable, intuitive, and problem-solvers. They thrive in social situations and are known for their ability to navigate tricky dynamics with grace. Libra Today's Horoscope often emphasizes their optimistic and people-pleasing nature."
      },
      {
        "question": "What are Libraʼs zodiac dates?",
        "answer": "People born between September 22 and October 23 fall under the sign of Libra. Libra Today's Horoscope offers daily insights tailored for these individuals."
      },
      {
        "question": "What planet rules Libra?",
        "answer": "Venus, the planet of love and beauty, rules Libra. This influence enhances their appreciation for aesthetics, romance, and harmony."
      }
    ]
  },
  "sagittarius": {
    "description": "Sagittarius, the ninth sign of the zodiac, is a beacon of exploration, optimism, and independence. Born between November 22 and December 21, Sagittarians are symbolized by the archer, a centaur wielding a bow and arrow. This sign embodies a unique blend of fiery enthusiasm, intellectual curiosity, and a thirst for adventure. Sagittarius Today's Horoscope highlights their dynamic energy, love for freedom, and unrelenting pursuit of truth and knowledge.",
    "date_range": "November 22 - December 21",
    "ruling_planet": "Jupiter",
    "element": "Fire",
    "personality_traits": {
      "Vibrant and Energetic": "Sagittarians are known for their infectious energy and zest for life. Sagittarius Today's Horoscope emphasizes their ability to light up any room with their charisma, humor, and boundless optimism.",
      "Independent and Free-Spirited": "Freedom is non-negotiable for Sagittarius natives. They thrive when given the space to explore, travel, and think freely. Sagittarius Today's Horoscope often underscores their strong sense of individuality and need for autonomy.",
      "Risk-Takers and Adventurers": "Fearless and daring, Sagittarians are natural risk-takers. Whether it's embarking on a new journey or trying something unconventional, they embrace challenges with open arms.",
      "Spontaneous and Curious": "Sagittarius Today's Horoscope highlights their love for spontaneity and their unquenchable thirst for knowledge. They are lifelong learners who thrive on discovering new ideas, cultures, and philosophies.",
      "Blunt but Honest": "Sagittarians value honesty above all else, often speaking their minds without a filter. While their bluntness can sometimes hurt feelings, Sagittarius Today's Horoscope advises them to temper their words with tact."
    },
    "celebrities": [
      "Not provided in content"
    ],
    "key_interests": {
      "Fun and Laughter": "Sagittarians are drawn to fun-loving companions who can match their sense of humor and enthusiasm.",
      "Freedom to Roam": "They value physical and mental freedom, avoiding restrictions and routines.",
      "Challenges and Growth": "Sagittarians love challenges that push their limits and encourage personal growth."
    },
    "daily_insights": {
      "career": "Sagittarius Today's Horoscope highlights their love for adventure and exploration, making them ideal for careers in travel, education, philosophy, or entertainment. Their boldness and innovative thinking also make them great entrepreneurs and leaders.",
      "love": "Romantic and passionate, Sagittarians seek partners who share their zest for life and open-mindedness. Sagittarius Today's Horoscope encourages them to balance their desire for freedom with emotional commitment in relationships.",
      "health": "Sagittarians are generally energetic and active, but their love for indulgence can lead to overindulgence. Sagittarius Today's Horoscope advises maintaining a balanced diet and incorporating physical activities to stay healthy.",
      "compatibility": "Sagittarians share strong compatibility with Aries, Leo, and Aquarius. These signs align with their adventurous spirit and love for intellectual pursuits. Sagittarius Today's Horoscope suggests avoiding overly restrictive partners who may stifle their independence.",
      "finance": "Sagittarians often face challenges in financial planning due to their spontaneous nature. Sagittarius Today's Horoscope recommends focusing on long-term savings and avoiding impulsive spending."
    },
    "faqs": [
      {
        "question": "What are Sagittariusʼ key characteristics?",
        "answer": "Sagittarius Today's Horoscope highlights their adventurous, optimistic, and intellectual nature. They are independent, risk-taking individuals with a deep love for exploration and freedom."
      },
      {
        "question": "What animal represents Sagittarius?",
        "answer": "The mythical centaur (half-man, half-horse) represents Sagittarius, embodying their dual nature of intellect and untamed spirit. The untamed horse also symbolizes their free-spirited energy."
      },
      {
        "question": "What is a Sagittariusʼ personality like?",
        "answer": "Sagittarians are open-minded, honest, and fun-loving. According to Sagittarius Today's Horoscope, they thrive on adventure, embrace new experiences, and value meaningful connections that foster growth."
      },
      {
        "question": "What are Sagittariusʼ zodiac dates?",
        "answer": "Sagittarius natives are born between November 22 and December 21."
      },
      {
        "question": "What planet rules Sagittarius?",
        "answer": "Jupiter, the planet of expansion, wisdom, and abundance, rules Sagittarius. This influence fuels their optimism, love for knowledge, and constant pursuit of growth."
      }
    ]
  },
  "capricorn": {
    "description": "Capricorn, the tenth zodiac sign, is a symbol of resilience, discipline, and ambition. Born between December 22 and January 19, Capricorns are represented by the sea-goat, a mythical creature with the body of a goat and the tail of a fish. This dual symbolism reflects their ability to navigate both material and emotional realms. Capricorn Today's Horoscope emphasizes their practicality, determination, and structured approach to life. Governed by Saturn, the planet of discipline and responsibility, Capricorns are known for their unrelenting drive to succeed.",
    "date_range": "December 22 - January 19",
    "ruling_planet": "Saturn",
    "element": "Earth",
    "personality_traits": {
      "Ambitious and Determined": "Capricorns are quintessential hustlers, constantly striving for excellence. Capricorn Today's Horoscope highlights their relentless pursuit of success and their ability to overcome any obstacle through hard work and dedication.",
      "Leaders with a Practical Mindset": "Natural-born leaders, Capricorns excel in high-ranking positions where their planning and organizational skills can shine. They lead with humility and focus, making them dependable and respected figures.",
      "Disciplined and Responsible": "Capricorns value structure and discipline. They approach their goals with a mature and realistic mindset, adhering to rules and maintaining order in their lives. Capricorn Today's Horoscope often underscores their methodical and responsible nature.",
      "Intelligent and Strategic Thinkers": "Known for their sharp intellect, Capricorns are excellent at devising practical and effective solutions. Their ability to learn from failures makes them resilient and resourceful.",
      "Serious but Playful with Age": "Interestingly, Capricorns are said to age backward. While they may seem serious in their youth, they become more playful and youthful with time, as highlighted by Capricorn Today's Horoscope."
    },
    "celebrities": [
      "Not provided in content"
    ],
    "key_interests": {
      "Reading and Learning": "Capricorns have a thirst for knowledge and enjoy expanding their intellectual horizons.",
      "Hard Work and Success": "They find fulfillment in achieving goals through hard work and discipline.",
      "Wealth and Stability": "Capricorns are drawn to financial security and work diligently to achieve it."
    },
    "daily_insights": {
      "career": "Capricorn Today's Horoscope emphasizes their knack for leadership and structured thinking, making them ideal for roles in management, entrepreneurship, and finance. Their strategic mindset ensures long-term success.",
      "love": "Capricorns are practical and supportive partners who value meaningful relationships. Capricorn Today's Horoscope suggests that quality time and shared values strengthen their romantic connections.",
      "health": "Capricorns are resilient but prone to stress-related issues. Capricorn Today's Horoscope advises them to focus on maintaining a healthy lifestyle, incorporating balanced nutrition and regular exercise.",
      "compatibility": "Capricorns share strong compatibility with Taurus, Virgo, and Pisces. These signs complement their grounded nature and appreciate their loyalty and dependability. Capricorn Today's Horoscope suggests avoiding overly impulsive partners who may clash with their need for structure.",
      "finance": "Capricorns are skilled financial planners who prioritize saving and investing wisely. Capricorn Today's Horoscope encourages them to remain cautious with their spending and focus on long-term financial security."
    },
    "faqs": [
      {
        "question": "What are Capricornʼs key characteristics?",
        "answer": "Capricorn Today's Horoscope highlights their ambition, discipline, and practicality. They are natural leaders who value structure, hard work, and long-term success."
      },
      {
        "question": "What animal represents Capricorn?",
        "answer": "The sea-goat is the symbol of Capricorn, representing their ability to navigate both material and emotional realms. It reflects their resilience and adaptability."
      },
      {
        "question": "What is a Capricornʼs personality like?",
        "answer": "Capricorns are serious, responsible, and goal-oriented individuals. According to Capricorn Today's Horoscope, they are also loyal, intelligent, and capable of finding solutions to complex problems."
      },
      {
        "question": "What are Capricornʼs zodiac dates?",
        "answer": "Capricorns are born between December 22 and January 19."
      },
      {
        "question": "What planet rules Capricorn?",
        "answer": "Saturn, the planet of discipline and structure, rules Capricorn. This influence shapes their methodical and determined approach to life."
      }
    ]
  },
  "aquarius": {
    "description": "Aquarius, the eleventh zodiac sign, is a beacon of intellect, independence, and innovation. Born between January 20 and February 18, Aquarius is represented by the Water Bearer—a symbol of wisdom, healing, and the sustenance of life. Governed by Saturn, Aquarius Today's Horoscope highlights their unique blend of analytical thinking, originality, and humanitarian spirit. As an air sign, Aquarius thrives on intellectual pursuits and is known for its strong sense of individuality and curiosity.",
    "date_range": "January 20 - February 18",
    "ruling_planet": "Saturn and Uranus",
    "element": "Air",
    "personality_traits": {
      "Intelligent and Analytical": "Aquarians are deep thinkers who love exploring new ideas and solving complex problems. Aquarius Today's Horoscope often highlights their ability to analyze situations with precision and offer innovative solutions.",
      "Ambitious and Visionary": "Driven by a desire to make a lasting impact, Aquarians are ambitious and future-focused. They dream big and work tirelessly to bring their visions to life.",
      "Original and Independent": "Aquarius Today's Horoscope emphasizes their originality. Aquarians are trendsetters who embrace their uniqueness and encourage others to do the same. They value their independence and dislike being constrained.",
      "Generous and Compassionate": "Though they may seem aloof, Aquarians are deeply compassionate and driven by a desire to help others. They often go out of their way to support friends, family, and causes they care about.",
      "Curious and Open-Minded": "Aquarians are lifelong learners who thrive on discovering new knowledge. Aquarius Today's Horoscope often mentions their inquisitive nature and love for exploring diverse perspectives."
    },
    "celebrities": [
      "Not provided in content"
    ],
    "key_interests": {
      "Technology and Innovation": "Aquarians love staying ahead of the curve with the latest gadgets and advancements.",
      "New Experiences": "They are always seeking fresh ideas and projects that challenge their intellect.",
      "Knowledge and Learning": "Aquarians have a thirst for wisdom and enjoy exploring diverse topics."
    },
    "daily_insights": {
      "career": "Aquarius Today's Horoscope suggests that their innovative thinking and problem-solving skills make them ideal for careers in technology, research, education, or humanitarian work. They excel in roles that allow them to think outside the box and make a positive impact.",
      "love": "Aquarians seek meaningful connections with partners who value independence and intellectual compatibility. Aquarius Today's Horoscope encourages them to balance their need for freedom with emotional intimacy in relationships.",
      "health": "Aquarians are generally healthy but must be mindful of stress and mental fatigue. Aquarius Today's Horoscope advises them to prioritize self-care and incorporate mindfulness practices into their routine.",
      "compatibility": "Aquarians share strong compatibility with Gemini, Libra, and Sagittarius. These signs complement their intellectual curiosity and adventurous spirit. Aquarius Today's Horoscope suggests avoiding overly emotional or controlling partners.",
      "finance": "Aquarians are financially prudent and often focus on long-term stability. Aquarius Today's Horoscope recommends cautious investments and avoiding impulsive spending to maintain financial health."
    },
    "faqs": [
      {
        "question": "Is Aquarius a shy zodiac sign?",
        "answer": "Yes, Aquarians can be shy and reserved. They prefer meaningful conversations over small talk and are often selective about the people they engage with."
      },
      {
        "question": "What are three facts about the Aquarius zodiac sign?",
        "answer": "Aquarius is the last air sign of the zodiac. Its symbol, the Water Bearer, represents wisdom and healing. Aquarians are known for their intellectual curiosity and humanitarian values."
      },
      {
        "question": "Which planet rules the Aquarius zodiac sign?",
        "answer": "Aquarius is ruled by Saturn, which governs discipline and structure, and Uranus, which influences innovation and unpredictability."
      },
      {
        "question": "What is the spirit animal for the Aquarius zodiac sign?",
        "answer": "The Blackbuck is considered the spirit animal of Aquarius, symbolizing resilience, independence, and adaptability."
      },
      {
        "question": "What challenges do Aquarians face?",
        "answer": "Aquarians often struggle with impatience and a desire to control conversations. They can also be stubborn and may overwhelm others with their strong opinions and emotional outbursts."
      }
    ]
  },
  "pisces": {
    "description": "Pisces, the twelfth and final sign of the zodiac, is the epitome of sensitivity, creativity, and empathy. Born between February 19 and March 20, Pisces is represented by two fishes swimming in opposite directions, symbolizing their dual nature of living between reality and fantasy. Governed by Jupiter, Pisces Today's Horoscope highlights their intuitive, emotional, and mystical personality. As a water sign, Pisces thrives on deep emotional connections and a vivid imagination, making them one of the most psychic and compassionate signs of the zodiac.",
    "date_range": "February 19 - March 20",
    "ruling_planet": "Jupiter",
    "element": "Water",
    "personality_traits":
    {
      "Creative and artistic": "Pisces natives are known for their vivid imagination and unparalleled creativity. Whether it's writing, painting, music, or dance, Pisces Today's Horoscope frequently highlights their ability to express emotions through art.",
      "Empathetic and compassionate": "Pisces are natural empaths who feel others' emotions deeply. They offer a shoulder to cry on and provide comfort in tough times, making them irreplaceable friends and partners.",
      "Highly intuitive": "Pisces rely heavily on their intuition to navigate life's challenges. Pisces Today's Horoscope often mentions their ability to sense intentions and situations without needing concrete evidence.",
      "Emotional and sensitive": "Known for their emotional depth, Pisces natives are easily moved by beauty, sorrow, and love. While this sensitivity is a strength, it can also make them vulnerable to emotional burnout.",
      "Dual nature of reality and fantasy": "Pisces Today's Horoscope underscores their dual nature. They have one foot in the real world and another in their dreamy, fantastical realm, making them versatile but sometimes conflicted."
    }
    ,
    "celebrities": [
      "Not provided in content"
    ],
    "key_interests": {
      "Parties and Social Connections": "Despite their introspective nature, Pisces love to socialize and connect with new people.",
      "Creative Outlets": "From poetry to painting, Pisces adore expressing their emotions through creative mediums.",
      "Emotional Connections": "Pisces cherish relationships that allow them to connect on a soulful level."
    },
    "daily_insights": {
      "career": "Pisces Today's Horoscope emphasizes their creative and compassionate nature, making them ideal for careers in arts, counseling, healthcare, or writing. They excel in roles that allow them to bring their imaginative ideas to life while helping others.",
      "love": "In relationships, Pisces are romantic and deeply devoted. Pisces Today's Horoscope advises them to focus on open communication to avoid misunderstandings. Their intuitive nature helps them understand their partner's needs without words.",
      "health": "Pisces natives are prone to emotional stress, which can impact their physical health. Pisces Today's Horoscope recommends mindfulness practices, balanced nutrition, and regular exercise to maintain overall well-being.",
      "compatibility": "Pisces are most compatible with Cancer, Scorpio, and Taurus. These signs complement their emotional and compassionate nature. Pisces Today's Horoscope suggests avoiding overly rational or detached partners who may not understand their depth.",
      "finance": "While Pisces are not materialistic, they value financial stability. Pisces Today's Horoscope advises caution with impulsive spending and recommends seeking guidance for long-term investments."
    },
    "faqs": [
      {
        "question": "How emotional are Pisces people?",
        "answer": "Pisces Today's Horoscope highlights their deeply emotional and sensitive nature. They feel everything intensely, making them compassionate but also prone to overthinking and emotional exhaustion."
      },
      {
        "question": "How do Pisces behave with others?",
        "answer": "Pisces are kind, understanding, and easy to talk to. Their mystical and magical personality makes them comforting companions who easily form deep connections."
      },
      {
        "question": "What is the spirit animal of Pisces?",
        "answer": "The deer is considered the spirit animal of Pisces. Like deer, they are gentle, calm, and intuitive, valuing peace and emotional harmony."
      },
      {
        "question": "Which planet rules Pisces?",
        "answer": "Pisces is ruled by Jupiter, which amplifies their wisdom, compassion, and spiritual connection."
      },
      {
        "question": "Which planet is in detriment for Pisces?",
        "answer": "Mercury is considered in detriment when placed in Pisces, which can sometimes challenge their logical and analytical abilities."
      }
    ]
  }
}
// const zodiacImages = {
//   Aries: "https://readdy.ai/api/search-image?query=Aries%20zodiac%20sign%20symbol%2C%20minimalist%20design%2C%20golden%20metallic%20finish%2C%20professional%203D%20rendering%2C%20centered%20composition%2C%20spiritual%20symbolism&width=80&height=80&seq=aries_symbol&orientation=squarish",
//   Taurus: "https://readdy.ai/api/search-image?query=Taurus%20zodiac%20sign%20symbol%2C%20minimalist%20design%2C%20golden%20metallic%20finish%2C%20professional%203D%20rendering%2C%20centered%20composition%2C%20spiritual%20symbolism&width=80&height=80&seq=taurus_symbol&orientation=squarish",
//   Gemini: "https://readdy.ai/api/search-image?query=Gemini%20zodiac%20sign%20symbol%2C%20minimalist%20design%2C%20golden%20metallic%20finish%2C%20professional%203D%20rendering%2C%20centered%20composition%2C%20spiritual%20symbolism&width=80&height=80&seq=gemini_symbol&orientation=squarish",
//   Cancer: "https://readdy.ai/api/search-image?query=Cancer%20zodiac%20sign%20symbol%2C%20minimalist%20design%2C%20golden%20metallic%20finish%2C%20professional%203D%20rendering%2C%20centered%20composition%2C%20spiritual%20symbolism&width=80&height=80&seq=cancer_symbol&orientation=squarish",
//   Leo: "https://readdy.ai/api/search-image?query=Leo%20zodiac%20sign%20symbol%2C%20minimalist%20design%2C%20golden%20metallic%20finish%2C%20professional%203D%20rendering%2C%20centered%20composition%2C%20spiritual%20symbolism&width=80&height=80&seq=leo_symbol&orientation=squarish",
//   Virgo: "https://readdy.ai/api/search-image?query=Virgo%20zodiac%20sign%20symbol%2C%20minimalist%20design%2C%20golden%20metallic%20finish%2C%20professional%203D%20rendering%2C%20centered%20composition%2C%20spiritual%20symbolism&width=80&height=80&seq=virgo_symbol&orientation=squarish",
//   Libra: "https://readdy.ai/api/search-image?query=Libra%20zodiac%20sign%20symbol%2C%20minimalist%20design%2C%20golden%20metallic%20finish%2C%20professional%203D%20rendering%2C%20centered%20composition%2C%20spiritual%20symbolism&width=80&height=80&seq=libra_symbol&orientation=squarish",
//   Scorpio: "https://readdy.ai/api/search-image?query=Scorpio%20zodiac%20sign%20symbol%2C%20minimalist%20design%2C%20golden%20metallic%20finish%2C%20professional%203D%20rendering%2C%20centered%20composition%2C%20spiritual%20symbolism&width=80&height=80&seq=scorpio_symbol&orientation=squarish",
//   Sagittarius: "https://readdy.ai/api/search-image?query=Sagittarius%20zodiac%20sign%20symbol%2C%20minimalist%20design%2C%20golden%20metallic%20finish%2C%20professional%203D%20rendering%2C%20centered%20composition%2C%20spiritual%20symbolism&width=80&height=80&seq=sagittarius_symbol&orientation=squarish",
//   Capricorn: "https://readdy.ai/api/search-image?query=Capricorn%20zodiac%20sign%20symbol%2C%20minimalist%20design%2C%20golden%20metallic%20finish%2C%20professional%203D%20rendering%2C%20centered%20composition%2C%20spiritual%20symbolism&width=80&height=80&seq=capricorn_symbol&orientation=squarish",
//   Aquarius: "https://readdy.ai/api/search-image?query=Aquarius%20zodiac%20sign%20symbol%2C%20minimalist%20design%2C%20golden%20metallic%20finish%2C%20professional%203D%20rendering%2C%20centered%20composition%2C%20spiritual%20symbolism&width=80&height=80&seq=aquarius_symbol&orientation=squarish",
//   Pisces: "https://readdy.ai/api/search-image?query=Pisces%20zodiac%20sign%20symbol%2C%20minimalist%20design%2C%20golden%20metallic%20finish%2C%20professional%203D%20rendering%2C%20centered%20composition%2C%20spiritual%20symbolism&width=80&height=80&seq=pisces_symbol&orientation=squarish",
// };
const compatibilityData = {
  Aries: [
    { sign: "Aries", rating: 3, description: "Passionate but competitive." },
    { sign: "Taurus", rating: 2, description: "Clashing life approaches." },
    { sign: "Gemini", rating: 4, description: "Shared love for excitement." },
    { sign: "Cancer", rating: 2, description: "Aries' directness may hurt Cancer." },
    { sign: "Leo", rating: 5, description: "Dynamic and passionate partnership." },
    { sign: "Virgo", rating: 2, description: "Impulsiveness frustrates Virgo." },
    { sign: "Libra", rating: 4, description: "Balanced complementary traits." },
    { sign: "Scorpio", rating: 3, description: "Intense but potential power struggles." },
    { sign: "Sagittarius", rating: 5, description: "Highly compatible adventurous match." },
    { sign: "Capricorn", rating: 2, description: "Different priorities create friction." },
    { sign: "Aquarius", rating: 4, description: "Strong intellectual bond." },
    { sign: "Pisces", rating: 3, description: "Aries leads, Pisces offers depth." },
  ],
  // Add similar arrays for other signs, or fetch from API if available
  Taurus: [
    { sign: "Aries", rating: 2, description: "Clashing life approaches." },
    { sign: "Taurus", rating: 4, description: "Shared love for stability." },
    { sign: "Gemini", rating: 3, description: "Gemini's restlessness may unsettle Taurus." },
    // ... (add for other signs)
  ],
  // Placeholder for other signs
};


const HoroscopePage = () => {
  const router = useRouter();
  const { sign } = router.query;
  
  console.log("Sign from URL:", sign);
  const [horoscope, setHoroscope] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  // const [error, setError] = useState(null);

  const capitalizedSign = sign ? sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase() : "";
  const signKey = sign?.toLowerCase();

  useEffect(() => {
    if (sign) {
      
          fetchDailyHoroscope();
          setCurrentDate(format(new Date(new Date().setDate(new Date().getDate() )), "MMMM d, yyyy"));
       
       
      
    }
  }, [ sign]);




  const fetchDailyHoroscope = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0'); // Ensure day is formatted as "01"

    try {
      const capitalizedSign = capitalizeFirstLetter(sign);
      const response = await fetch(`/api/horoscopes/daily-horoscopes-${year}.json`);
      const data = await response.json();
      const horoscope = data?.[`${year}-${month}`]?.[day]?.[capitalizedSign] || {};

      setHoroscope(horoscope);
    } catch (error) {
      console.error('Error fetching daily horoscope:', error);
      setHoroscope({});
    }
  };


  const capitalizeFirstLetter = (string) =>
    string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  // const getFavorabilityColor = (favorability) => {
  //   switch (favorability) {
  //     case "most-favorable":
  //       return "bg-green-500";
  //     case "favorable":
  //       return "bg-green-300";
  //     case "neutral":
  //       return "bg-yellow-300";
  //     case "unfavorable":
  //       return "bg-red-300";
  //     default:
  //       return "bg-gray-300";
  //   }
  // };
  const renderStars = (rating) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <i
          key={i}
          className={`${i < rating ? "fas fa-star text-yellow-400" : "far fa-star text-gray-300"} text-xs`}
        ></i>
      ))}
    </div>
  );

  if (!sign ) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/logo.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        <title>
          {capitalizedSign} Horoscope | Daily, Weekly, Monthly Predictions | AstroAnswer
        </title>
        <meta
          name="description"
          content={`Discover your ${capitalizedSign} horoscope. Get daily, weekly, and monthly predictions for love, career, health, and more at AstroAnswer.`}
        />
        <meta
          name="keywords"
          content={`${capitalizedSign} horoscope, ${capitalizedSign} zodiac, astrology, daily horoscope, weekly horoscope, monthly horoscope`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${capitalizedSign} Horoscope | AstroAnswer`} />
        <meta
          property="og:description"
          content={`Get your personalized ${capitalizedSign} horoscope. Daily, weekly, and monthly predictions for love, career, and more.`}
        />
        <meta property="og:url" content={`https://astroanswer.co/horoscope/${sign}`} />
        <meta property="og:image" content={`https://astroanswer.co/${signKey}.jpg`} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={`${capitalizedSign} Horoscope | AstroAnswer`} />
        <meta
          property="twitter:description"
          content={`Explore your ${capitalizedSign} horoscope. Get insights on love, career, and more with our daily, weekly, and monthly predictions.`}
        />
        <link rel="canonical" href={`https://astroanswer.co/horoscope/${sign}`} />
      </Head>

      <div className="flex flex-col min-h-screen bg-[#FFF2E2] relative pb-16 font-inter">
        {/* Header */}
        <header className="fixed top-0 w-full bg-[#FF9960] z-50 px-4 py-4 flex justify-between items-center shadow-sm">
          <Link
            href="/"
            className="text-white cursor-pointer"
          >
            <i className="fas fa-arrow-left text-xl"></i>
          </Link>
          <h1 className="text-white font-bold text-xl">{capitalizedSign} Horoscope</h1>
          <button className="text-white cursor-pointer">
            <i className="fas fa-share-alt text-xl"></i>
          </button>
        </header>
        {/* Daily Overview Card */}


        {/* Main Content */}
        <div className="flex-1 pt-16 h-[calc(100vh-64px)]">
          <main className="px-4 pb-20 max-w-5xl mx-auto">
            {/* Zodiac Sign Section */}
            <div className="mt-6 mb-8 flex flex-col  items-center">
              <Image
                src={`/zodicimg/${capitalizedSign.toLowerCase()}.png`}
                width={180}
                height={180}
                alt={`${capitalizedSign} Symbol`}
                className="rounded-full bg-orange-500 w-12 h-12 object-contain mb-3"
              />
              <p className="text-gray-500 text-sm">{currentDate}</p>
            </div>
            <Card className="bg-gradient-to-r from-[#FF9933] to-[#FF5733] p-5 rounded-xl shadow-lg mb-6">
              <h3 className="text-white text-xl font-semibold mb-3">
                Daily Overview
              </h3>
              <p className="text-white leading-relaxed text-sm break-words">
                {horoscope["Daily Wisdom & Suggestions"] || "No overview available."}
              </p>
            </Card>
            {/* Horoscope Tabs */}
            <Tabs  className="w-full mb-8">

              <TabsContent >
                <HoroscopeCard
                  title="Daily Overview"
                  date={currentDate}
                  horoscope={horoscope}
                  Todays=  "Todays" 
                  className="bg-gradient-to-r from-[#FF9933] to-[#FF5733]  rounded-xl shadow-lg mb-6 text-white"
                />
              </TabsContent>
            </Tabs>






            {/* Compatibility Section */}
            <div className="mb-8">
              <h3 className="text-black text-xl font-semibold mb-4">Explore {capitalizedSign} Compatibility</h3>
              <Card className="bg-white p-5 rounded-xl shadow-lg">
                {compatibilityData[capitalizedSign]?.map((item) => (
                  <Link
                    key={item.sign}
                    href={`/compatibility/${sign}/${item.sign.toLowerCase()}`}
                    className="flex items-center justify-between py-2 border-b last:border-b-0"
                  >
                    <div className="flex items-center  gap-3">
                      <img
                        src={`/zodicimg/${item.sign.toLowerCase()}.png`}
                        alt={`${item.sign} Symbol`}
                        className="w-10 h-10 bg-orange-400 rounded-full"
                      />
                      <span className="font-medium text-gray-800">{item.sign}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderStars(item.rating)}
                      <i className="fas fa-chevron-right text-gray-400"></i>
                    </div>
                  </Link>
                ))}
              </Card>
            </div>
<HoroscopePageForMW sign={sign} />
            {/* Sign Overview */}
            <div className="mb-8">
              <h3 className="text-black text-xl font-semibold mb-4">{capitalizedSign} Overview</h3>
              <Card className="bg-white p-5 rounded-xl shadow-lg">
                <p className="text-gray-700 text-sm mb-4">
                  {horoscopeData[signKey]?.description || "Description not available."}
                </p>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Personality Traits</h4>
                {horoscopeData[signKey]?.personality_traits ? (
                  Object.entries(horoscopeData[signKey].personality_traits).map(([trait, desc], index) => (
                    <div key={index} className="mb-2">
                      <strong className="text-gray-800">{trait}:</strong>{" "}
                      <span className="text-gray-700 text-sm">{desc}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-700 text-sm">No personality traits available.</p>
                )}
                <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Key Interests</h4>
                {horoscopeData[signKey]?.key_interests ? (
                  Object.entries(horoscopeData[signKey].key_interests).map(([interest, desc], index) => (
                    <div key={index} className="mb-2">
                      <strong className="text-gray-800">{interest}:</strong>{" "}
                      <span className="text-gray-700 text-sm">{desc}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-700 text-sm">No key interests available.</p>
                )}
              </Card>
            </div>
          </main>
        </div>


      </div>
    </>
  );
};

export default HoroscopePage;