#!/bin/bash

# Set SBL_ENABLE_PLAYWRIGHT_TEST_SETTINGS to "true" in the .env file and check if SBL_ENABLE_PLAYWRIGHT_TEST_SETTINGS exists in the .env file
if grep -q 'SBL_ENABLE_PLAYWRIGHT_TEST_SETTINGS' .env; then
  echo 'Updating SBL_ENABLE_PLAYWRIGHT_TEST_SETTINGS="true" in .env'
  sed -i '' 's/SBL_ENABLE_PLAYWRIGHT_TEST_SETTINGS=.*/SBL_ENABLE_PLAYWRIGHT_TEST_SETTINGS="true"/' .env
else
  echo 'SBL_ENABLE_PLAYWRIGHT_TEST_SETTINGS not found, adding SBL_ENABLE_PLAYWRIGHT_TEST_SETTINGS="true" to .env'
  echo 'SBL_ENABLE_PLAYWRIGHT_TEST_SETTINGS="true"' >> .env
fi

# Check for --headless argument
if [ "$1" == "--headless" ]; then
  echo "Running Playwright tests in headless mode..."
  yarn playwright test --workers 4
else
  echo "Running Playwright tests with UI..."
  yarn playwright test --ui --workers 4
fi

# Check if Playwright exited successfully
if [ $? -eq 0 ]; then
  echo "Playwright tests completed successfully."
else
  echo "Playwright tests failed."
fi

# Reset SBL_ENABLE_PLAYWRIGHT_TEST_SETTINGS to "false" in the .env file
echo 'Resetting SBL_ENABLE_PLAYWRIGHT_TEST_SETTINGS="false" in .env'
sed -i '' 's/SBL_ENABLE_PLAYWRIGHT_TEST_SETTINGS=.*/SBL_ENABLE_PLAYWRIGHT_TEST_SETTINGS="false"/' .env

# Confirm the changes
echo 'SBL_ENABLE_PLAYWRIGHT_TEST_SETTINGS has been reset to "false" in .env'