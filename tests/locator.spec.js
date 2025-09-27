// Example: import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');
const { describe } = require('node:test');

test.describe.configure({mode: 'parallel'});

test.describe('Locator Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Replace with your application's URL
        await page.goto('https://practice.expandtesting.com/locators');
        await expect(page).toHaveURL(/locators/);
    }); 
    test.afterEach(async ({ page }) => {
        // You can add any cleanup code here if needed
        console.log('Test completed');
    });

    test('Get by role', async ({ page }) => {

        //below is an example of using literal string to locate element
        await page.locator(`div h4:has-text("getByRole")`).scrollIntoViewIfNeeded();
        //get by role having button named delete
        const deleteButton = page.getByRole('button', { name: 'add item' });
        await expect(deleteButton).toBeVisible();
        await deleteButton.click();

        const achorTag = page.getByRole('link', { name: 'contact' });
        await expect(achorTag).toBeVisible();
        console.log('Anchor tag href:', await achorTag.getAttribute('href'));
        await achorTag.click();
        await expect(page).toHaveURL(/contact/);
    });

    test('Get by name', async ({ page }) => {
        await page.locator('div h4', {hasText: 'getByLabel'}).scrollIntoViewIfNeeded();
        const nameInput = page.getByText('Hot Deal: Buy 1 Get 1 Free')
        await expect(nameInput).toBeVisible();
        console.log('Name Input text:', await nameInput.textContent());

        const pTagText = page.getByText('Latest news and updates');
        await expect(pTagText).toBeVisible();
        console.log('P tag text:', await pTagText.textContent());
    });

    test('Get by label', async ({ page }) => {
        await page.locator('//h4[contains(text(),"getByLabel")]').scrollIntoViewIfNeeded();
        const nameInput = page.locator('#countrySelect')
        
        //loop through options and print
        const options = await nameInput.locator('option').allTextContents();
        console.log('Country options:', options);
        
        await nameInput.selectOption({ label: 'Brazil' }); //select by label
        await nameInput.selectOption({index: 1 }); //select by index

        await expect(nameInput).toHaveValue('Japan'); //verify selected value

        //label to type email
        const emailInput = page.locator('input#newsletterEmail');
        await emailInput.fill('test@gmail.com');  
    });

    test('Get by placeholder', async ({ page }) => {
        await page.locator('div h4', {hasText: 'getByPlaceholder'}).scrollIntoViewIfNeeded();
        const searchInput = page.getByPlaceholder('Search the ');
        await expect(searchInput).toBeVisible();
        await searchInput.fill('Testing ...');
        console.log('Search Input value:', await searchInput.inputValue());

        const anotherInput = page.getByPlaceholder('Filter by tag');
        await expect(anotherInput).toBeVisible();
        await anotherInput.fill('Automation ...');
        console.log('Another Input value:', await anotherInput.inputValue());
    });

    test('Filter by alt text' , async ({ page }) => {
        await page.locator('div h4', {hasText: 'getByAltText'}).scrollIntoViewIfNeeded();
        const logoImage = page.getByAltText('User avatar');
        await expect(logoImage).toBeVisible();
        console.log('Logo Image src:', await logoImage.getAttribute('src'));    
    });

    test('Get by title' , async ({ page }) => {
        await page.locator('div h4', {hasText: 'getByTitle'}).scrollIntoViewIfNeeded();
        const reloadBtn = page.getByTitle('Refresh conten'); 
        await expect(reloadBtn).toBeVisible();
        await reloadBtn.click();

        const settingSpan = page.getByTitle('Settings panel');
        await expect(settingSpan).toBeVisible();
        console.log('Settings Span text:', await settingSpan.textContent());
    });

    test('get by testId', async ({ page }) => {
        await page.locator('div h4', {hasText: 'getByTestId'}).scrollIntoViewIfNeeded();

        const divElement = page.getByTestId('status-message');
        await expect(divElement).toBeVisible();
        console.log('Test div Element text:', await divElement.textContent());

        const spanElement = page.getByTestId('user-name');
        await expect(spanElement).toBeVisible();
        console.log('Test span Element text:', await spanElement.textContent());

    });

    test('get by css', async ({ page }) => {
        await page.locator('div h4', {hasText: 'css'}).scrollIntoViewIfNeeded();  
        //css selector
        const cssElement = page.locator('div > span.legacy-css.text-primary');
        await expect(cssElement).toBeVisible();
        console.log('CSS Element text:', await cssElement.textContent());   
    });

    test('get by xpath', async ({ page }) => {
        await page.locator('div h4', {hasText: 'XPath Practice: List'}).scrollIntoViewIfNeeded();  

        //print all li text
        const allLiElements = page.locator('//ul[contains(@class,"legacy-list")]/li');
        console.log('All li elements locator:', allLiElements);
        const count = await allLiElements.count();
        console.log(`Total li elements: ${count}`); 
        for (let i = 0; i < count; i++) {
            console.log(`Li Element ${i + 1} text:`, await allLiElements.nth(i).textContent());
        }   

        //xpath table
        await page.locator('div h4', {hasText: 'XPath Practice: Table'}).scrollIntoViewIfNeeded();  
        const tableHeaders = page.locator('//table[@class="table legacy-table"]//thead/tr/th');
        const headerCount = await tableHeaders.count();
        console.log(`Total table headers: ${headerCount}`);
        for (let i = 0; i < headerCount; i++) {
            console.log(`Header ${i + 1} text:`, await tableHeaders.nth(i).textContent());
        }


        const tableRows = page.locator('//table[@class="table legacy-table"]//tbody/tr');
        const rowCount = await tableRows.count();
        console.log(`Total table rows: ${rowCount}`);
        for (let i = 0; i < rowCount; i++) {
            const row = tableRows.nth(i);
            const cells = row.locator('td');
            const cellCount = await cells.count();
            for (let j = 0; j < cellCount; j++) {
                console.log(`Row ${i + 1} Cell ${j + 1} text:`, await cells.nth(j).textContent());
            }
        }

    });

});