# Supabase Setup App

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

Navigate to your project settings (located on the navbar on the left hand side) -> API Keys (to the right of the navbar, but still on the left hand side) -> Copy the publishable key about halfway down the page and replace the default value in .env.local SUPABASE_ANON_KEY with this value. The secret key is here as well, just below this. 

Supabase url and anon/publishable key: 

Navigate to your project overview (located on the navbar on the left hand side) if you're not already there. Scroll halfway down the page to where it says "Connect to your project" and both the Project URL and Publishable API Key will be there. Copy these values into your .env.local file. 

#### Migrating Schemas

At this point, you can add tables to your database. Inside of the root /supabase folder, locate schemas, and run each of the schemas inside of the SQL Editor in Supabase in order (In the navbar on the left hand side). It is recommended to create separate files with each of the schemas. 

## Manual Setup {#manual-setup}

If setting this project up with Supabase on the web, just follow the instructions mentioned above in the [Supabase Web Client Setup](#web-client-setup). However, if using the CLI for Supabase, follow along with the setup script (which will also be detailed here).



## Project Structure 




## How to Use the Starter App




## Environment Variables Overview




## Database Schema




## Authentication Flow




## Deployment Instructions




## GitHub Actions Setup Configuration




## Troubleshooting