#!/bin/bash
# This script installs the necessary dependencies for the project.
echo "Please make sure you are running this script in WSL or a Linux environment."
echo "Installing dependencies..."

# Wait a few seconds to ensure that the user has time to read the message before the installation starts.
sleep 5

USER=$(whoami)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    echo >> /home/$USER/.bashrc
    echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv bash)"' >> /home/$USER/.bashrc
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv bash)"

sudo apt-get install build-essential

# brew install gcc # This is needed for the latest version of node, but it causes issues with the version of node that we are using. We can uncomment this if we want to upgrade node in the future.

# Install supabase cli
brew install supabase/tap/supabase

# Tell the user to run the link_supabase_project.sh script after this
echo "Dependencies installed. Please run the link_supabase_project.sh script to link the supabase project to your local environment."