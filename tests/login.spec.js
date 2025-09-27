const { test, expect } = require('@playwright/test');
test.describe.configure({mode: 'parallel'});

test.describe('Login Functionality Tests', () => {
  //create hooks
  //before each test
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    // 1. Launch the browser and navigate to the login page
    await page.goto('https://practice.expandtesting.com/login'); // Example login URL
  });
  //after each test
  test.afterEach(async ({ page }) => {
    // Optionally, you can add code here to run after each test, such as logging out if needed
    // For this example, we'll just close the page
    await page.close();
  });
  //
  test('Test Case 1: Successful Login', async ({ page }) => {
    
    

    // 2. Verify that the login page is displayed   
    await expect(page).toHaveURL(/login/);

    // 3. Enter Username
    await page.fill('input[name="username"]', 'practice');

    // 4. Enter Password
    await page.fill('input[name="password"]', 'SuperSecretPassword!');

    // 5. Click the Login button
    await page.locator("//button[@type = 'submit']").click();

    // 6. Verify that the user is redirected to the /secure page
    await expect(page).toHaveURL(/secure/);

    // 7. Confirm the success message is visible
    const flashMessage = page.locator('#flash');
    await expect(flashMessage).toContainText('You logged into a secure area!');

    // 8. Verify that the Logout button is displayed
    const logoutButton = page.locator('a[href="/logout"]');
    await expect(logoutButton).toBeVisible();
  });

  test('Test Case 2: Unsuccessful Login with Invalid Credentials', async ({ page }) => {
    // 1. Launch the browser and navigate to the login page
    await page.goto('https://practice.expandtesting.com/login'); // Example login URL 
    // 2. Verify that the login page is displayed
    await expect(page).toHaveURL(/login/);

    


    const username = page.locator("//label[text()='Username']");
    await username.scrollIntoViewIfNeeded();
    // 3. Enter Invalid Username
    await page.fill('input[name="username"]', 'invalidUser');
    // 4. Enter Invalid Password
    await page.fill('input[name="password"]', 'invalidPass');
    // 5. Click the Login button
    await page.locator("//button[@type = 'submit']").click();
    // 6. Verify that an error message is displayed
    const errorMessage = page.locator('#flash');
    console.log(await errorMessage.textContent());

    await expect(errorMessage).toContainText('Your password is invalid!');
    await expect(errorMessage).toBeVisible();

    // 7. Ensure the URL remains on the login page
    await expect(page).toHaveURL(/login/);
  });

}
);