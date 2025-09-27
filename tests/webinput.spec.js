const { test, expect } = require('@playwright/test');

test.describe('Web Input Tests', () => {
    test('should fill input field', async ({ page }) => {
        // Replace with your test URL
        await page.goto('https://practice.expandtesting.com/inputs');
        await expect(page).toHaveURL(/inputs/);

        //fill with css selector
        
        await page.fill("input[name='input-number']", '42');

        //scroll to last last elemnent 
        const lastloc = await page.locator("(//div[@class='col'])[4]");
        await lastloc.scrollIntoViewIfNeeded();

        //fill with xpath selector
        await page.fill("//input[@id='input-text']", 'Test Input');
        //fill with index selector
        await page.fill("(//input[@id='input-password'])[1]", 'Password123');

        // Step 1: Calculate date 5 days ahead
        const today = new Date();
        today.setDate(today.getDate() + 5);

        // Format as YYYY-MM-DD
        const futureDate = today.toISOString().split('T')[0]; // e.g., '2025-09-26'
        console.log('Future Date:', futureDate);

        // Step 2: Fill the input
        await page.fill('#input-date', futureDate);

        //click display button
        await page.click("//button[@id='btn-display-inputs']")

        //validate the filled values firstloc
        await expect(page.locator('#output-number')).toHaveText('42');
        await expect(page.locator('#output-text')).toHaveText('Test Input');
        await expect(page.locator('#output-password')).toHaveText('Password123');
        await expect(page.locator('#output-date')).toHaveText(futureDate);
    });
});