Hi, this is a little Playwright autotest with Docker to check language change in Wikipedia.

# Test Case: Wikipedia Language Change

## Objective
Verify that users can successfully change their language preference on Wikipedia.

## Prerequisites
- The user is logged into their Wikipedia account.
- The browser has saved login states.

## Test Steps

### Step 1: Open Preferences
1. Click on the user dropdown button.
2. Click on the "Preferences" option.

### Step 2: Open User Profile Tab
1. Click on the menu tab (first tab in the menu).

### Step 3: Select a Language
1. Determine the current language on the page.
2. If the language is not the first language in the list, select the first language. Otherwise, select the second language.
   
### Step 4: Press the Submit Button
1. Click on the "Submit" button.

### Step 5: Confirm Language Change
1. Verify that the language in the language field matches the selected language.
2. Verify that the HTML tag reflects the selected language.

## Expected Results
- After completing the steps, the language preference should be successfully changed, and the page should reflect the selected language.

## Notes
- This test is designed to ensure a smooth language change process.
- Language options are assumed to be 'en' (English) and 'uk' (Ukrainian). Modify the test accordingly for different language options.
- The test relies on the availability of certain locators and UI elements. If the application's UI changes, update the test accordingly.



##### STEPS TO RUN THIS TEST WITH DOCKER #####

1. Install Playwright with - npm init playwright@latest
(during the installation process, please update your browsers and do not change the configuration file)

2. Specify Credentials for Wikipedia in .env file

3. Run "npm run wikipedia_test_docker" to run everything
    This command contains:
    - "docker build -t playwright-tests ." to create an image
    - "docker run -d --name wikipedia -it playwright-tests" to create a container
    - "docker start wikipedia" to start container
    - "docker exec -it wikipedia npx playwright test" to execute test
    - "docker cp wikipedia:/app/playwright-report ." to get a report from Docker to local machine
    You can run these commands separately
    Container name must be unique because of "npm run report" command so it better to delete a container and an image manually or use "docker system prune".
    All these commands you will find in package.json

4. Have Fun!