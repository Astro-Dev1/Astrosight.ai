import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import * as TbIcons from "react-icons/tb";
console.log(TbIcons);


// Zodiac sign data with icons and constellation patterns
const zodiacSigns = [
  { name: "Aries", icon: TbIcons.TbZodiacAries, pattern: [{ x: 0, y: 0 }, { x: 10, y: -5 }, { x: 5, y: 10 }] },
  { name: "Taurus", icon: TbIcons.TbZodiacTaurus, pattern: [{ x: 0, y: 0 }, { x: 8, y: 0 }, { x: 4, y: 8 }, { x: 4, y: -8 }] },
  { name: "Gemini", icon: TbIcons.TbZodiacGemini, pattern: [{ x: 0, y: 0 }, { x: 0, y: 10 }, { x: 10, y: 0 }, { x: 10, y: 10 }] },
  { name: "Cancer", icon: TbIcons.TbZodiacCancer, pattern: [{ x: 0, y: 0 }, { x: 5, y: 5 }, { x: -5, y: 5 }] },
  { name: "Leo", icon: TbIcons.TbZodiacLeo, pattern: [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: 8 }, { x: 0, y: 8 }] },
  { name: "Virgo", icon: TbIcons.TbZodiacVirgo, pattern: [{ x: 0, y: 0 }, { x: 5, y: -5 }, { x: 5, y: 5 }, { x: 10, y: 0 }] },
  { name: "Libra", icon: TbIcons.TbZodiacLibra, pattern: [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: -5 }] },
  { name: "Scorpio", icon: TbIcons.TbZodiacScorpio, pattern: [{ x: 0, y: 0 }, { x: 8, y: 0 }, { x: 4, y: 6 }, { x: 8, y: 6 }] },
  { name: "Sagittarius", icon: TbIcons.TbZodiacSagittarius, pattern: [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: 8 }] },
  { name: "Capricorn", icon: TbIcons.TbZodiacCapricorn, pattern: [{ x: 0, y: 0 }, { x: 5, y: -5 }, { x: 10, y: 0 }, { x: 5, y: 5 }] },
  { name: "Aquarius", icon: TbIcons.TbZodiacAquarius, pattern: [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 0, y: 5 }, { x: 10, y: 5 }] },
  { name: "Pisces", icon: TbIcons.TbZodiacPisces, pattern: [{ x: 0, y: 0 }, { x: 5, y: -5 }, { x: 5, y: 5 }] },
];

const CosmicBackground = ({ starCount = 250 }) => {
  const [stars, setStars] = useState([]);
  const [constellations, setConstellations] = useState([]);
  const [glyphs, setGlyphs] = useState([]);

  // Generate grid positions to ensure even spread
  const generateGridPositions = (count, cols = 6) => {
    const rows = Math.ceil(count / cols);
    const positions = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (positions.length < count) {
          const top = (row / rows) * 90 + 5 + (Math.random() * 10 - 5);
          const left = (col / cols) * 90 + 5 + (Math.random() * 10 - 5);
          positions.push({ top, left });
        }
      }
    }
    return positions;
  };

  useEffect(() => {
    const generateBackground = () => {
      // Generate Constellations (3 instances per zodiac sign)
      const instancesPerSign = 3;
      const constellationPositions = generateGridPositions(zodiacSigns.length * instancesPerSign);
      const newConstellations = [];
      let positionIndex = 0;

      zodiacSigns.forEach((sign, signIndex) => {
        for (let i = 0; i < instancesPerSign; i++) {
          if (positionIndex >= constellationPositions.length) break;
          const { top, left } = constellationPositions[positionIndex++];
          const scale = 0.4 + Math.random() * 0.4;

          newConstellations.push({
            id: `const-${signIndex}-${i}`,
            sign,
            top,
            left,
            scale,
            stars: sign.pattern.map((point, j) => ({
              id: `star-${signIndex}-${i}-${j}`,
              x: point.x,
              y: point.y,
              size: Math.random() * 1.2 + 0.5,
              delay: Math.random() * 2,
            })),
          });
        }
      });

      // Generate Glyphs (2 instances per zodiac sign)
      const glyphsPerSign = 2;
      const glyphPositions = generateGridPositions(zodiacSigns.length * glyphsPerSign, 5);
      const newGlyphs = [];
      positionIndex = 0;

      zodiacSigns.forEach((sign, signIndex) => {
        for (let i = 0; i < glyphsPerSign; i++) {
          if (positionIndex >= glyphPositions.length) break;
          const { top, left } = glyphPositions[positionIndex++];
          newGlyphs.push({
            id: `glyph-${signIndex}-${i}`,
            icon: sign.icon,
            top,
            left,
            size: 14 + Math.random() * 6, // 14–20px
            delay: Math.random() * 2,
          });
        }
      });

      // Generate Random Stars (remaining)
      const constellationStarCount = newConstellations.reduce((sum, c) => sum + c.stars.length, 0);
      const remainingStars = Math.max(0, starCount - constellationStarCount - newGlyphs.length);
      const newStars = [];
      const starPositions = generateGridPositions(remainingStars, 8);

      starPositions.forEach((pos, i) => {
        newStars.push({
          id: `star-${i}`,
          size: Math.random() * 2 + 0.5,
          top: pos.top,
          left: pos.left,
          delay: Math.random() * 2,
        });
      });

      setConstellations(newConstellations);
      setGlyphs(newGlyphs);
      setStars(newStars);
    };

    generateBackground();
  }, [starCount]);

  // Animation variants for movement
  const constellationVariants = useCallback(() => ({
    animate: {
      x: [0, 10, 0, -10, 0],
      y: [0, 5, 0, -5, 0],
      transition: {
        x: { repeat: Infinity, duration: 20, ease: "linear" },
        y: { repeat: Infinity, duration: 15, ease: "linear" },
      },
    },
  }), []);

  const glyphVariants = useCallback(() => ({
    animate: {
      x: [0, 20],
      y: [0, 10],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        x: { repeat: Infinity, duration: 30, ease: "linear" },
        y: { repeat: Infinity, duration: 25, ease: "linear" },
        opacity: { repeat: Infinity, duration: 4, ease: "easeInOut" },
      },
    },
  }), []);

  return (
    <div className="fixed inset-0 bg-[#FFF2E2] z-[-1] overflow-hidden">
      {/* Random Background Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            opacity: 0.5,
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          className="absolute bg-white rounded-full"
        />
      ))}

      {/* Zodiac Constellations */}
      {constellations.map((constellation) => (
        <motion.div
          key={constellation.id}
          variants={constellationVariants()}
          initial={{
            top: `${constellation.top}%`,
            left: `${constellation.left}%`,
            scale: constellation.scale,
            opacity: 0.6,
          }}
          animate="animate"
          className="absolute"
        >
          {constellation.stars.map((star) => (
            <motion.div
              key={star.id}
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                top: `${star.y}px`,
                left: `${star.x}px`,
              }}
              className="absolute bg-white rounded-full"
            />
          ))}
        </motion.div>
      ))}

      {/* Zodiac Icons */}
      {glyphs.map((glyph) => {
        const Icon = glyph.icon;
        return (
          <motion.div
            key={glyph.id}
            variants={glyphVariants()}
            initial={{
              top: `${glyph.top}%`,
              left: `${glyph.left}%`,
              opacity: 0.3,
            }}
            animate="animate"
            style={{
              filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))",
            }}
            className="absolute"
          >
            <Icon size={glyph.size} fill="#FF6D3F" />
          </motion.div>
        );
      })}

      {/* Gradient Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-t from-orange-200/20 to-transparent"
      />
    </div>
  );
};

export default CosmicBackground;