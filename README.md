# Supabase Setup App

## NOTE: ONLY 2 ACCOUNTS CAN BE CREATED PER HOUR

### Due to the limitations, if using Supabase web client, you can only send 2 verification emails, which will only be able to create 2 accounts. Ensure you use the right email when signing up

This app is intended to be a baseline template for a supabase app configured with Nextjs. It is designed to make setting a up a Supabase project much simpler with the template. With low computer resources, the database schemas defined in supabase/schemas need to be run in order on the supabase web client. A Supabase setup script will be provided, *__but may encounter some issues during development__*. 

Normally, Docker Desktop would be used with the Supabase CLI. Ensure you have enough memory on your computer (at least 16 GB). If you have less than this, use the Supabase web client. 

This project is meant to be reused and modified according to the needs of the project. A basic profile table will be created, along with one storage bucket for avatars tied to the user. Modifications to these tables need to be done in Supabase/schemas, along with their respective files. 

## Prerequisites

This project was run on node version 24.11.1, but should work for any version 24.x.x. Other important dependency versions to note are: 

- next: 16.1.6
- react: 19.2.3
- react-dom: 19.2.3

View package.json for a full list of dependencies. 

Docker Desktop is used with Supabase. 

Note: if using Supabase via the web client, you will need to install additional dependencies. Use the __install additional dependencies__ file to install all required files. This will install homebrew, supabase, and a couple other modifications to your bashrc file. 

## Quick Start

First, clone the repository via the command line with: 

```bash
git clone git@github.com:Matt1213141/supabase-start <project-name>
```

and go into the root of the project:

```bash
cd <project-name>
```

From here, you should be able to run the startup script via: 

```bash
bash ./setup.sh    # On git bash for windows
./setup.sh         # For Linux
```

Note: if not using the Supabase web client, you can skip this section for now. 

### Supabase Web Client Setup {#web-client-setup}

`[link text](#web-client-setup)`
If using this project via the Supabase web client, you'll need to create a new project in Supabase inside your organization (you may need to create one if you don't already have one). Give your project a unique name and a strong password. When creating this project, you don't need to enable automatic RLS, as this is done in the schemas. 

Once your project is created, create a .env.local file, and copy the .env.example file variables and paste these into the .env.local file. These will be modified in the next step

Supabase anon/publishable and secret key: 

Navigate to your project settings (located on the navbar on the left hand side) -> API Keys (to the right of the navbar, but still on the left hand side) -> Copy the publishable key about halfway down the page and replace the default value in .env.local SUPABASE_ANON_KEY with this value. 

For the secret key, stay on the API keys page, and navigate to the Legacy anon, service_role API keys. Reveal and copy the service_role key and put this in the NEXT_PRIVATE_SUPABASE_ROLE_KEY. This will be used to set up storage buckets via the CLI. 

Supabase url and anon/publishable key: 

Navigate to your project overview (located on the navbar on the left hand side) if you're not already there. Scroll halfway down the page to where it says "Connect to your project" and both the Project URL and Publishable API Key will be there. Copy these values into your .env.local file.  

#### Migrating Schemas

At this point, you can add tables to your database. Inside of the root /supabase folder, locate schemas, and run each of the schemas inside of the SQL Editor in Supabase in order (In the navbar on the left hand side). It is recommended to create separate files with each of the schemas. 

## Manual Setup {#manual-setup}

If setting this project up with Supabase on the web, just follow the instructions mentioned above in the [Supabase Web Client Setup](#web-client-setup). However, if using the CLI for Supabase, follow along with the setup script (which will also be detailed here).

[insert details here for manual setup]

## Project Structure 

```
supabase-project/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout
│   └── (auth)/                   # Authentication routes
│       ├── login/page.tsx
│       ├── register/page.tsx
│       └── verify-email
├── components/                   # Reusable React components
│   ├── AuthLayout                # Authentication-related components
|   ├── ErrorContext              # Handle error messages
|   ├── LoadingBar                # LoadingBar for components that are loading
|   ├── Navbar                    # Navbar component
|   └── UserContext               # User context
├── lib/                          # Utility functions and helpers
│   ├── supabase/                 # Supabase client configuration
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── proxy.ts              # Proxy
│   └── auth.ts                   # Authentication utilities
├── _utils/
|   ├── auth.ts                   # auth functions
|   └── profile.ts                # profile functions
├── supabase/                     # Supabase project configuration
│   └── schemas/                  # Database migration schemas
│       ├── 001_profile.sql       # Profiles table and rls policies
│       └── 002_avatar_bucket.sql # Avatar storage setup
├── public/                       # Static assets
├── proxy.ts                      # Global proxy service
├── .env.example                  # Environment variables template
├── .env.local                    # Local environment variables (not in repo)
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── setup.sh                      # Setup script
└── README.md                     # This file
```

### Key Directories

- **`app/`**: Contains all Next.js pages and route handlers organized with the app router.
- **`components/`**: Reusable UI components organized by feature.
- **`lib/`**: Core utilities, including Supabase client initialization and authentication helpers.
- **`supabase/`**: Database schemas and configuration files for Supabase migrations.
- **`public/`**: Static files served directly by Next.js.


## How to Use the Starter App

Once you've set up the project and configured your environment variables, you can start developing your application:

1. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

2. **Authentication**: Use the login and register pages at `/auth/login` and `/auth/register` to authenticate users. The app includes built-in user context management via `UserContext` for accessing the current user throughout your application.

3. **User Profiles**: User profiles are automatically created in the database when a new user registers. Access profile data through the provided utility functions in `_utils/profile.ts`.

4. **Avatar Storage**: Users can upload avatars which are stored in the Supabase storage bucket. Use the avatar bucket for profile picture management.

5. **Components**: Reusable components are located in the `components/` directory. Key components include:
   - `AuthLayout`: Wrapper for authentication pages
   - `Navbar`: Navigation component
   - `LoadingBar`: Display loading states
   - `ErrorContext`: Handle and display error messages

6. **Environment Variables**: All sensitive configuration is managed through environment variables in `.env.local`. Ensure all variables used for Supabase are configured here. 

7. **Building for Production**:
   ```bash
   npm run build
   npm start
   ```

For more details on specific features, refer to the relevant sections below.

## Environment Variables Overview

The following environment variables are required for the application to function properly. Create a `.env.local` file in the root directory and add these variables:

### Public Variables (NEXT_PUBLIC_*)

These variables are exposed to the browser and are used for Supabase client-side initialization:

- **`NEXT_PUBLIC_SUPABASE_URL`**: Your Supabase project URL. Found in your Supabase project settings under "Connect to your project".
- **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**: Your Supabase anonymous/publishable API key. Found in your Supabase project settings under API Keys.

Example `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

For a complete list of all environment variables including private keys, refer to `.env.example`.

## Database Schema

This project includes two main database schemas that set up the foundational tables and storage for user data.

### Profiles Table (`001_profile.sql`)

The profiles table stores user profile information and is automatically created when a new user registers:

- **`id`** (UUID, Primary Key): References the authenticated user's ID from `auth.users`. Automatically deleted when a user is removed.
- **`name`** (TEXT): User's display name, populated from signup metadata.
- **`avatar_url`** (TEXT): URL reference to the user's avatar stored in the avatars bucket.
- **`created_at`** (TIMESTAMP): Record creation timestamp, defaults to current time.
- **`updated_at`** (TIMESTAMP): Record update timestamp, automatically updated on profile changes.

**Row Level Security (RLS) Policies:**
- Users can only view their own profile
- Users can only update their own profile data
- Users can only insert their own profile record

**Automatic Features:**
- A trigger automatically creates a profile entry when a new user registers
- The `updated_at` field is automatically refreshed whenever the `name` or `avatar_url` fields change

### Avatar Storage Bucket (`002_add_avatar_bucker.sql`)

The avatars storage bucket provides secure file storage for user profile pictures:

- **Bucket ID**: `avatars`
- **Public Access**: Disabled (private bucket requiring authentication)
- Users can upload and manage their avatar images through this bucket

To upload avatars, use the Supabase storage client with the bucket name `avatars` and the user's unique file path.,

#### Setup for avatars (only if using web client)

Additional setup will be required if using the web client. Ensure you have the project ref and service role key in the .env.local file before proceeding. 

Before we are able to use the CLI for supabase, ensure you run the script install_dependencies.sh from a linux environment. Run the script link_supabase_project.sh to create the storage bucket for avatars. You will need to login to your supabase project and authenticate it via a one time verification code. At the end of the script, you will either get no response (which means creating the bucket was successful) or a 409 error (which means the bucket already exists). Both of these results are okay to get. 

Now, this next part is recommended to be completed via the web dashboard manually (SQL not recommended, but is provided in 003_storage_bucket_policies.sql. You can view this to see how similar it is to your bucket). 

On the dashboard, go to the navbar on the left hand side, and go to storage. Click on your bucket name -> near the top right, is a button for policies; click that -> scroll to your bucket name -> new policy -> for full customization -> select all operations (in our case, though you can change it) -> target roles (at least choose authenticated). 

IMPORTANT: In order to make this accessible only to the user themself, go to the navbar again on the left hand side -> database -> policies -> scroll down to your policies -> inside the using or with check statement, there should be a (bucket_id = 'bucket_id'::text) line. Add a new line below that (in both the using and with check statements) and add the line: 

```sql
AND owner = (select auth.uid())
```

The entire statement will look something like this: 

```sql
alter policy '<whatever the policy name is here>'
on "storage"."objects"
to authenticated
using ( -- Might be with check here 
  ((bucket_id = 'avatars'::text) AND (owner = ( SELECT auth.uid() AS uid)))
);
```

Repeat the previous steps for all policies you created. Feel free to check your policies with 003_storage_bucket_policies.sql. 

## Authentication Flow

The application implements a complete authentication flow using Supabase Auth with email/password credentials:

### Registration (`/auth/register`)

1. User enters email and password on the registration page
2. Password is validated for strength requirements
3. User account is created via `supabase.auth.signUpWithPassword()`
4. A profile record is automatically created in the database via a database trigger
5. User is redirected to verify their email address
6. Confirmation email is sent to the provided email address

### Email Verification (`/auth/verify-email`)

1. User receives a confirmation email from Supabase
2. User clicks the verification link or enters the code manually
3. Email is marked as verified in the authentication system
4. User can now proceed to login

### Login (`/auth/login`)

1. User enters registered email and password
2. Credentials are validated via `supabase.auth.signInWithPassword()`
3. Authentication session is established (JWT token stored in browser)
4. User is redirected to the home page (`/`)
5. The `UserContext` automatically fetches and stores the current user data

### Session Management

- **UserContext** (`components/UserContext`): Manages global user state across the application
- Active sessions are maintained automatically by Supabase client
- Session data persists across page refreshes using browser storage
- User can be accessed throughout the app via the context hook

### Logout

- User can logout via the Navbar component
- Session is cleared via `supabase.auth.signOut()`
- User is redirected to login page
- All user context data is cleared

### Protected Routes

- Routes in the `(auth)/` group are public (accessible before login)
- Main app routes check for authenticated user in `UserContext`
- Unauthenticated users attempting to access protected routes are redirected to `/auth/login`

## Deployment Instructions

This project is deployed on Vercel. 

### Deploying to Vercel

1. Push your project to a GitHub repository
2. Go to [Vercel](https://vercel.com) and sign in with your GitHub account
3. Click "Add New" and select "Project"
4. Select your repository and click "Import" (ensure if you have 'only selected repositories' selected, to select your repository as an exception)
5. Add your environment variables from `.env.local` under "Environment Variables" (found in supabase section mentioned earlier)
6. Click "Deploy"

Your application will be live at the provided Vercel URL. Subsequent pushes to your main branch will trigger automatic deployments.

## GitHub Actions Setup Configuration

This project can be configured to automatically deploy database migrations to Supabase when changes are pushed to your repository.

### Prerequisites

Before setting up GitHub Actions, ensure you have:
- A GitHub repository with this project
- Supabase account with API access
- Supabase project URL and API key

### Step 1: Create a Supabase Service Role Key

1. Go to your Supabase project settings
2. Navigate to **API** in the left sidebar
3. Under **Project API keys**, copy your **Service role** key (keep this secret)
4. Store this key safely for use in GitHub Secrets

### Step 2: Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add the following:
   - **`SUPABASE_URL`**: Your Supabase project URL
   - **`SUPABASE_SERVICE_KEY`**: Your Supabase service role key

### Step 3: Create GitHub Actions Workflow

1. Create a new directory in your project: `.github/workflows/`
2. Create a file named `deploy-migrations.yml` with the following content (same as configured with this project):

```yaml
name: Supabase Migrations

on:
  push:
    paths:
      - 'supabase/migrations/**'
      - 'supabase/schemas/**'
      - 'supabase/seed/**'
      - '.github/workflows/migrate.yml'
    branches:
      - main

jobs:
  migrate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '24.x'
      
      - name: Install Supabase CLI
        run: npm install -g supabase
      
      - name: Run Supabase Migrations
        env:
          SUPABASE_PROJECT_REF: ${{ secrets.SUPABASE_PROJECT_REF }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
        run: |
          supabase db push --project-ref ${{ secrets.SUPABASE_PROJECT_REF }} --db-url "postgresql://postgres:$SUPABASE_SERVICE_ROLE_KEY@db.supabase.co:5432/postgres"


```

### Step 4: Configure Migration Naming

Ensure all database schema files in `supabase/schemas/` follow the naming convention:
- `001_profile.sql`
- `002_avatar_bucket.sql`
- `003_your_migration.sql`

Files are executed in numerical order.

### Step 5: Test the Workflow

1. Make a small change to a file in `supabase/schemas/`
2. Commit and push to the `main` branch
3. Go to **Actions** tab in your GitHub repository
4. Monitor the workflow execution
5. Check your Supabase project to verify the migration was applied

### Troubleshooting Workflows

- **Workflow not triggering**: Verify the file paths in the `paths` filter match your schema directory
- **Authentication failed**: Double-check your Supabase secrets are correctly set
- **Migration failed**: Review the workflow logs in the Actions tab for detailed error messages
- **Database locked**: Ensure no other deployments are running simultaneously


## Troubleshooting

If you encounter issues while setting up or running the project, try the following steps:

- **Environment Variables Not Working:**  
  Double-check your `.env.local` file for typos and ensure all required variables are set. Restart the development server after making changes.

- **Database Connection Errors:**  
  Make sure your Supabase project is running and the credentials in `.env.local` are correct.

- **Authentication Issues:**  
  Clear your browser cookies and local storage, then try logging in again. Restart the browser if necessary. Ensure your Supabase API keys are valid.

- **Schema or Migration Problems:**  
  Confirm that all SQL files in `supabase/schemas/` have been run in order. Check the Supabase dashboard for migration errors. With the Supabase storage buckets on the web client, those have to be created manually (without SQL). 

- **Build or Deployment Fails:**  
  Run `npm install` to ensure all dependencies are installed. Review the build logs for specific error messages. Check for any files that contain errors. This will prevent the project from being deployed. 

- **Limit Reached:**
  There is a limit if using the Supabase web client. A maximum of 2 authentication emails from Supabase can be sent every hour. In other words, a maximum of 2 accounts can be created every hour. 

If problems persist, consult the Supabase and Next.js documentation or open an issue in the repository.
