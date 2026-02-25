#!/bin/bash
# This script links the supabase project to the local environment. Ensure you have the .env.local file set up
# Log in to the supabase cli
if [ -t 0 ]; then
    supabase login # Login to your supabase account
else
    echo "Non-interactive shell detected. Please use command prompt or another interactive shell to run 'supabase login' to log in to your supabase account."
fi


# Link supabase link to the project ref
PROJECT_REF="nestgonmkwgiupyadsgw" # This is the project ref for the nestgonmkwgiupyadsgw project. You can find this in the supabase dashboard under settings -> API -> Project ref.
supabase link --project-ref $PROJECT_REF # This is the project ref for the nestgonmkwgiupyadsgw project. You can find this in the supabase dashboard under settings -> API -> Project ref.

# Load environment variables from .env.local
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs) # This will load the environment variables from the .env.local file into the current shell session. Make sure to run this script in the same terminal session where you will be running the development server so that the environment variables are available.
else 
  echo ".env.local file not found. Please create your .env.local file and add the necessary environment variables before running this script."
fi

# Create the avatars bucket if it doesn't exist via Supabase Management API
BUCKET_NAME="avatars"
API_URL="https://$PROJECT_REF.supabase.co/storage/v1/bucket"
API_KEY="$NEXT_PRIVATE_SUPABASE_SERVICE_ROLE_KEY" # This should be set in your .env

# Create the avatars bucket if it doesn't exist
curl -X POST "$API_URL" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "'$BUCKET_NAME'", "public": false}' \

echo "" # new line for better readability

echo "If the bucket already exists, you may see a 409 status code, which is expected. If you see a 200 status code, the bucket was created successfully. If you see any other status code, there may have been an error creating the bucket."