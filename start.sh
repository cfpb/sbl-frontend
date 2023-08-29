#!/bin/bash

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


###### Check that the "sbl-frontend" "sbl-project" and "regtech-user-fi-management" repos are at sibling level to each other ######

# Move up one level
cd ..

# Check if the move was successful
if [ $? -ne 0 ]; then
    print_fail "Failed to move up one directory." >&2  # Send error message to stderr
    exit 1
fi

# Define the names of the directories to check
directories=("sbl-frontend" "sbl-project" "regtech-user-fi-management")

# Loop through the directories and check if each exists
for dir in "${directories[@]}"; do
    if [ ! -d "$dir" ]; then
        print_fail "Directory not found: $dir"
        exit 1
    fi
done

# All directories were found
print_success "All directories exist."


###### Run "docker compose up -d" in the "sbl-project" repo ######

cd sbl-project
docker compose up -d

# Check the exit code of the previous command
if [ $? -eq 0 ]; then
    print_success "Docker Compose up succeeded."
else
    print_fail "Docker Compose up failed." >&2  # Send error message to stderr
    exit 1
fi

###### Install NPM modules and then start the frontend in dev mode  ######

# Run yarn install
cd ..
cd sbl-frontend
yarn install

# Check if yarn install was successful
if [ $? -eq 0 ]; then
    print_success "NPM module install succeeded."
else
    print_fail "NPM module install failed." >&2  # Send error message to stderr
fi

yarn run dev

# Check if yarn run dev was successful
if [ $? -eq 0 ]; then
    print_success "Starting the frontend dev server succeeded."
else
    print_fail "Starting the frontend dev server failed." >&2  # Send error message to stderr
fi