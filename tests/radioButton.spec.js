const { test, expect } = require('@playwright/test');

test.describe('Radio Button Tests', () => {

    test.beforeEach(async ({ page }) => {
        // Replace with your application's URL
        await page.goto('https://practice.expandtesting.com/radio-buttons');
        await expect(page).toHaveURL(/radio-buttons/);
    });

    test.afterEach(async ({ page }) => {
        // You can add any cleanup code here if needed
        console.log('Test completed');
    });
    
    test('select color:', async ({ page }) => {
        await page.locator('//h1[contains(text(),"Radio Buttons page for Automation Testing Practice")]').scrollIntoViewIfNeeded();

        const cardHeader_1 = page.locator('div.card-header', { hasText: 'Select your favorite color:' });
        await expect(cardHeader_1).toBeVisible();

        //count radio buttons
        const radioButtons = page.locator('input[type="radio"][name="color"]');
        const count = await radioButtons.count();
        console.log('Number of radio buttons:', count);
        await expect(radioButtons).toHaveCount(5);

        //select radio buttons one by one and verify
        for (let i = 0; i < count-1; i++) {
            const value = await radioButtons.nth(i).getAttribute('value');
            console.log(`Radio button ${i} value:`, value);
            await radioButtons.nth(i).check();
            await expect(radioButtons.nth(i)).toBeChecked();    
        }
        //verify last radio button is disabled
        await expect(radioButtons.nth(count-1)).toBeDisabled();
    });


    test('select sports:', async ({ page }) => {    
        await page.locator('//h1[contains(text(),"Radio Buttons page for Automation Testing Practice")]').scrollIntoViewIfNeeded();

        const cardHeader_2 = page.locator('div.card-header', { hasText: 'Select your favorite sport:' });
        await expect(cardHeader_2).toBeVisible();
        //count radio buttons
        const radioButtons = page.locator('input[type="radio"][name="sport"]');
        const count = await radioButtons.count();
        console.log('Number of radio buttons:', count);
        await expect(radioButtons).toHaveCount(3);

        //select radio buttons one by one and verify
        for (let i = 0; i < count; i++) {
            const value = await radioButtons.nth(i).getAttribute('value');
            console.log(`Radio button ${i} value:`, value);
            await radioButtons.nth(i).check();
            await expect(radioButtons.nth(i)).toBeChecked();    
        }
    });
});