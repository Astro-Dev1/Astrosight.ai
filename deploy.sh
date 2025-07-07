#!/bin/bash
# Deployment preparation script

echo "🚀 Preparing for deployment..."

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Build the application
echo "🔨 Building application..."
npm run build

echo "✅ Build complete!"
