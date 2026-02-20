#!/bin/bash
# setup.sh
set -e

echo "🚀 Setting up Next.js + Supabase Starter App..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check for Docker
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker and try again."
  exit 1
fi

# Check for Supabase CLI
if ! npx supabase --version > /dev/null 2>&1; then
  echo "❌ Supabase CLI not found. Please install it with 'npm install -g supabase' and try again."
  exit 1
fi

# Warn user if .env.local already exists
if [ -f .env.local ]; then
  echo "⚠️  .env.local already exists. It will be overwritten. If you have custom values, please back it up before proceeding."
  read -p "Do you want to continue? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Setup aborted."
    exit 1
  fi
fi

# Start Supabase (assumes supabase directory already exists)
echo "🏃 Starting Supabase..."
npx supabase start

# Extract credentials (you'll need to parse the output)
# This is a simplified example - you'll need to implement proper parsing
SUPABASE_URL=$(npx supabase status | grep "API URL" | awk '{print $3}') # May need to change if the output format changes
SUPABASE_ANON_KEY=$(npx supabase status | grep "anon key" | awk '{print $3}') # May need to change if the output format changes

# Create .env.local
echo "📝 Creating .env.local..."
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
EOF

# Run migrations
echo "🗄️  Running migrations..."
npx supabase db reset

echo "✅ Setup complete!"
echo "📖 Next steps:"
echo "   0. Double check Docker status in case things fail"
echo "   1. Run 'npm run dev' to start the development server"
echo "   2. Visit http://localhost:3000"
echo "   3. Sign up for a new account to test authentication"