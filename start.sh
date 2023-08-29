#!/bin/bash

# Colors
RED='\033[0;31m' 
GREEN='\033[0;32m'
NO_COLOR='\033[0m' 


###### Check that the "sbl-frontend" "sbl-project" and "regtech-user-fi-management" repos are at sibling level to each other ######

# Move up one level
cd ..

# Check if the move was successful
if [ $? -ne 0 ]; then
    echo "Failed to move up one directory." >&2  # Send error message to stderr
    exit 1
fi

# Define the names of the directories to check
directories=("sbl-frontend" "sbl-project" "regtech-user-fi-management")

# Loop through the directories and check if each exists
for dir in "${directories[@]}"; do
    if [ ! -d "$dir" ]; then
        echo "${RED}Directory not found: $dir${NO_COLOR}"
        exit 1
    fi
done

# All directories were found
echo "${GREEN}All directories exist.${NO_COLOR}"


###### Run "docker compose up -d" in the "sbl-project" repo ######

cd sbl-project
docker compose up -d

# Check the exit code of the previous command
if [ $? -eq 0 ]; then
    echo "Docker Compose up succeeded."
else
    echo "${RED}Docker Compose up failed.${NO_COLOR}" >&2  # Send error message to stderr
    exit 1
fi

###### Install NPM modules and then start the frontend in dev mode  ######

# Run yarn install
cd ..
cd sbl-frontend
yarn install

# Check if yarn install was successful
if [ $? -eq 0 ]; then
    echo "${GREEN}NPM module install succeeded.${NO_COLOR}"
else
    echo "${RED}NPM module install failed.${NO_COLOR}" >&2  # Send error message to stderr
fi

yarn run dev

# Check if yarn run dev was successful
if [ $? -eq 0 ]; then
    echo "${GREEN}Starting the frontend dev server succeeded.${NO_COLOR}"
else
    echo "${RED}Starting the frontend dev server failed.${NO_COLOR}" >&2  # Send error message to stderr
fi