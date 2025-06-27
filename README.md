# AstroSight - Vedic Astrology Consultation Platform

AstroSight is a comprehensive Vedic astrology platform built with Next.js, offering personalized astrological consultations, horoscope readings, and spiritual guidance.

## 🌟 Features

- Personalized Guidance Reports
- Daily/Weekly Horoscopes
- Zodiac Compatibility Calculator
- Panchanga (Hindu Calendar) Calculations
- Blog with Astrological Insights
- Free Basic Reports
- Professional Consultation Booking

## 🚀 Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS, Shadcn UI
- **CMS:** Contentful
- **Authentication:** NextAuth.js
- **Database:** PostgreSQL with Prisma
- **Payment:** Razorpay Integration
- **Maps:** Google Maps API
- **Testing:** Jest

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/astrosight.git
cd astrosight
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file with necessary environment variables:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
CONTENTFUL_SPACE_ID=your_contentful_space_id
CONTENTFUL_ACCESS_TOKEN=your_contentful_access_token
DATABASE_URL=your_postgresql_url
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

4. Run the development server:

```bash
npm run dev
```

## 📁 Project Structure

```
astrosight/
├── components/         # Reusable UI components
├── pages/             # Next.js pages and API routes
├── public/            # Static assets
├── styles/           # Global styles
├── utils/            # Utility functions
├── lib/              # Core functionality
└── prisma/           # Database schema and migrations
```

## 🔑 Key Components

- **Guidance Report System**: Personalized astrological reports
- **Horoscope Engine**: Daily and weekly predictions
- **Compatibility Calculator**: Zodiac matching system
- **Blog Platform**: Astrological articles and insights
- **Admin Dashboard**: Report management and user analytics

## 📝 Environment Variables

Required environment variables for the application:

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN`
- `DATABASE_URL`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Dr. Ananthapadmanabha - Chief Astrologer
- Development Team
- Content Writers
- Customer Support

## 📞 Contact

For any queries or support:
- Email: admin@astrosight.com
- WhatsApp: +91-9964128377

---

Built with ❤️ by the AstroSight Team
