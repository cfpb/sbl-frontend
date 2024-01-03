#!/bin/bash

# Exit if any part of script fails
set -e

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

###### 1.) Check that the "sbl-frontend" "sbl-project" and "regtech-user-fi-management" repos are at sibling level to each other ######

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

###### 2.) Reset and seed basic tables in regtech-user-fi-management ######

cd regtech-user-fi-management
./db_revisions/dev_setup.sh reset-then-seed
wait

# Check if successful
if [ $? -eq 0 ]; then
    print_success "Successfully seeded basic tables."
else
    print_fail "Error with the reset-and-seed." >&2  # Send error message to stderr
    exit 1
fi

###### 3.) Create institutions based on the json files in sbl-project ######

cd ..
./sbl-project/dev_setup/mock_data/create_institutions.sh

# Check if successful
if [ $? -eq 0 ]; then
    print_success "Successfully seeded mocked institutions based on the json files."
else
    print_fail "Error seeding mocked institutions." >&2  # Send error message to stderr
    exit 1
fi
