#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status

# Colors
RED='\033[0;31m' 
GREEN='\033[0;32m'
NO_COLOR='\033[0m' 

# Functions
function print_success {
    echo "${GREEN}$1${NO_COLOR}"
}

function print_fail {
    echo "${RED}$1${NO_COLOR}"
}

# store the initial sbl-frontend git branch for later use
initial_branch=$(git rev-parse --abbrev-ref HEAD)
# handle optional flags
is_update_repos=false # default is false to update all repos
while getopts ":u" option; do
    case $option in
        u)
            while true; do
                read -p "Are you sure you want to checkout the main branch and pull the latest from each repo? (y/n)" yn
                case $yn in
                    [Yy] ) is_update_repos=true; break;;
                    [Nn] ) exit;;
                    * ) echo "Please answer y(es) or n(o).";;
                esac
            done
            ;;
        *)
            print_fail "Flag not recognized. Usage: $0 [-u update all repos]"
            exit 1
            ;;
    esac
done

###### 1.) Check that a .env file exists ######
# Check if the .env file exists
if [ -f .env ]; then
    print_success ".env file found."
    # Continue with your script logic here
else
    print_fail ".env file not found. Read the ENV-GUIDE.md on how to properly create a .env"
    exit 1  # Exit with a non-zero status code to indicate an error
fi


###### 2.) Check that the "sbl-frontend" "sbl-project" and "regtech-user-fi-management" repos are at sibling level to each other ######

# Move up one level
cd ..

# Check if the move was successful
if [ $? -ne 0 ]; then
    print_fail "Failed to move up one directory." >&2  # Send error message to stderr
    exit 1
fi

# Define the names of the directories to check
directories=("sbl-frontend" "sbl-project" "regtech-user-fi-management" "regtech-mail-api" "sbl-filing-api")

# Loop through the directories and check if each exists
for dir in "${directories[@]}"; do
    if [ ! -d "$dir" ]; then
        print_fail "Directory not found: $dir"
        exit 1
    fi
done

# All directories were found
print_success "All directories exist."

# Optional update all repos when -u flag is used
if [ "$is_update_repos" = true ] ; then
    for dir in "${directories[@]}"; do
        echo "Updating $dir..."
        cd $dir;
        git checkout main; 
        git pull;
        cd ..;
    done
    print_success "All repos have been checked out into main and have pulled the latest changes."
fi


###### 3.) Run "docker compose up -d" in the "sbl-project" repo ######

cd sbl-project
docker compose up -d --build

# Check the exit code of the previous command
if [ $? -eq 0 ]; then
    print_success "Docker Compose up succeeded."
else
    print_fail "Docker Compose up failed." >&2  # Send error message to stderr
    exit 1
fi

###### 4.) Install NPM modules and then start the frontend in dev mode  ######

# Run yarn install
cd ..
cd sbl-frontend

# Make sure the developer is in the initial git branch at start of script
git checkout "$initial_branch"

# Install NPM modules of the branch
yarn install

# Check if yarn install was successful
if [ $? -eq 0 ]; then
    print_success "NPM modules install succeeded."
else
    print_fail "NPM modules install failed." >&2  # Send error message to stderr
fi

yarn run dev

# Check if yarn run dev was successful
if [ $? -eq 0 ]; then
    print_success "Starting the frontend dev server succeeded."
else
    print_fail "Starting the frontend dev server failed." >&2  # Send error message to stderr
fi