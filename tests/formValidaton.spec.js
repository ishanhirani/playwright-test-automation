
const { test, expect } = require('@playwright/test');
const { describe } = require('node:test');


test.describe.configure({ mode: 'parallel' });

test.describe('positive scenario validation', () => {
    test.beforeEach(async ({ page }) => {
        // Replace with your application's URL
        await page.goto('https://practice.expandtesting.com/form-validation');
        await expect(page).toHaveURL(/form-validation/);
    });
    test('should validate form inputs', async ({ page }) => {
        await page.locator('//div/label[contains(text(),"Contact Name")]').scrollIntoViewIfNeeded
        const name = page.locator('//input[@id="validationCustom01"]')
        await expect(name).toBeVisible()
        await expect(name).toHaveAttribute('required')
        await expect(name).toHaveAttribute('value','dodo')
        await name.fill('John Doe')

        await page.locator('//label[contains(text(),"PickUp Date")]').scrollIntoViewIfNeeded
        const date = page.locator('(//input[@id="validationCustom05"])[2]')
        await expect(date).toBeVisible()
        await expect(date).toHaveAttribute('required')
        const today = new Date();
        today.setDate(today.getDate() + 5);
        const futureDate = today.toISOString().split('T')[0];
        await date.fill(futureDate)

        const number = page.locator('(//input[@id="validationCustom05"])[1]')
        await expect(date).toBeVisible()
        await expect(date).toHaveAttribute('required')
        const nm = await number.getAttribute('placeholder');
        console.log('Number:', nm);
        await number.fill(nm);

        const payment = page.locator('#validationCustom04')
        await expect(payment).toBeVisible()
        await expect(payment).toHaveAttribute('required')
        await payment.selectOption({value: 'cashondelivery'})

        const registerButton = page.locator('//button[contains(text()," Register")]')
        await expect(registerButton).toBeVisible()
        await registerButton.click()

        await expect(page).toHaveURL(/form-confirmation/);
        await expect(page.locator('//div/p[contains(text(),"Thank you")]')).toBeVisible()

    });
});