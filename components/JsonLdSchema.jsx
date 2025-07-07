const JsonLdSchema = ({ 
  type = "Organization",
  data = {} 
}) => {
  const baseSchema = {
    "@context": "https://schema.org"
  };

  const schemas = {
    Organization: {
      ...baseSchema,
      "@type": "Organization",
      name: "AstroSight",
      description: "Professional Vedic astrology services and AI-powered consultations",
      url: "https://astrosight.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://astrosight.ai/logo.png",
      },
      sameAs: [
        "https://facebook.com/astrosight",
        "https://twitter.com/astrosight",
        "https://instagram.com/astrosight",
        "https://youtube.com/astrosight"
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-XXXXXXXXXX",
        contactType: "customer service",
        availableLanguage: ["English", "Hindi", "Kannada"]
      },
      areaServed: {
        "@type": "Country",
        name: "India"
      },
      ...data
    },

    WebPage: {
      ...baseSchema,
      "@type": "WebPage",
      "@id": data.url || "https://astrosight.ai",
      url: data.url || "https://astrosight.ai",
      name: data.title || "AstroSight - Expert Vedic Astrology Services",
      description: data.description || "Get personalized Vedic astrology readings and AI-powered horoscopes",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://astrosight.ai/#website"
      },
      ...data
    },

    BlogPosting: {
      ...baseSchema,
      "@type": "BlogPosting",
      headline: data.title,
      description: data.description,
      image: data.image,
      dateCreated: data.dateCreated,
      datePublished: data.datePublished,
      dateModified: data.dateModified,
      author: {
        "@type": "Person",
        name: data.author || "AstroSight Team",
        url: "https://astrosight.ai/about"
      },
      publisher: {
        "@type": "Organization",
        name: "AstroSight",
        logo: {
          "@type": "ImageObject",
          url: "https://astrosight.ai/logo.png"
        }
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": data.url
      },
      inLanguage: "en-US",
      isFamilyFriendly: "true",
      ...data
    },

    Service: {
      ...baseSchema,
      "@type": "Service",
      name: data.name || "Vedic Astrology Consultation",
      description: data.description || "Professional Vedic astrology readings and spiritual guidance",
      provider: {
        "@type": "Organization",
        name: "AstroSight",
        url: "https://astrosight.ai"
      },
      serviceType: "Astrology Consultation",
      areaServed: {
        "@type": "Country",
        name: "India"
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Astrology Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Birth Chart Analysis"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Compatibility Reading"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Daily Horoscope"
            }
          }
        ]
      },
      ...data
    },

    WebApplication: {
      ...baseSchema,
      "@type": "WebApplication",
      name: data.name || "AstroSight App",
      applicationCategory: "Lifestyle",
      operatingSystem: "Web Browser",
      description: data.description || "AI-powered Vedic astrology platform",
      url: "https://astrosight.ai",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      },
      featureList: [
        "Daily Horoscopes",
        "Birth Chart Analysis", 
        "Compatibility Readings",
        "AI Astrology Consultations",
        "Panchanga Calendar"
      ],
      ...data
    }
  };

  const selectedSchema = schemas[type] || schemas.Organization;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(selectedSchema) }}
    />
  );
};

export default JsonLdSchema;
