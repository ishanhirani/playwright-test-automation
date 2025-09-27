const { test, expect } = require('@playwright/test');

test.describe('Dynamic Pagination Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Replace with your application's URL
        await page.goto('https://practice.expandtesting.com/dynamic-pagination-table');
        await expect(page).toHaveURL(/dynamic-pagination-table/);
    });

    test('Select number of rows from a dropdown and assert table updates', async ({ page }) => {

        
        await page.locator('#example').scrollIntoViewIfNeeded();
    
        await page.selectOption('select[name="example_length"]', '5');
        const rows = await page.locator('table tbody tr').count();
        expect(rows).toBeLessThanOrEqual(5);

        await page.selectOption('select[name="example_length"]', '10');
        const rows10 = await page.locator('table tbody tr').count();
        expect(rows10).toBeLessThanOrEqual(10);

        await page.selectOption('select[name="example_length"]', '-1');
        const rowsAll = await page.locator('table tbody tr').count();
        expect(rows10).toBeLessThanOrEqual(10);
    });

    test.only('pagination next and previous buttons', async ({ page }) => {
        await page.locator('#example_paginate').scrollIntoViewIfNeeded();
        //check status example Showing 1 to 3 of 10 entries ie 10/3=4 pages
        //dinamically pick 3 and 10 from text and calculate pages
        const info = page.locator('#example_info');
        await expect(info).toContainText('Showing 1 to');
        const text = await info.textContent();
        const parts = text.split(' ');
        let to = parseInt(parts[3]);
        const total = parseInt(parts[5]);
        const totalPages = Math.ceil(total / to);
        console.log(`Total pages: ${totalPages}`);


        //click next button till last page
        const nextButton = page.locator('#example_next');
        const prevButton = page.locator('#example_previous');
        for (let i = 1; i < totalPages; i++) {
            await expect(nextButton).toBeEnabled();
            await nextButton.click();
            await expect(info).toContainText(`Showing ${i * to + 1} to ${Math.min((i + 1) * to, total)}`);

            console.log(`Showing ${i * to + 1} to ${Math.min((i + 1) * to, total)} of ${total} entries`);
        }
        
            await expect(nextButton).toContainClass('disabled');
           //click previous button till first page
        for (let i = totalPages - 1; i > 0; i--) {
            await expect(prevButton).toBeEnabled();
            await prevButton.click();
            await expect(info).toContainText(`Showing ${(i - 1) * to + 1} to ${i * to}`);
            console.log(`Showing ${(i - 1) * to + 1} to ${i * to} of ${total} entries`);
        }
        await expect(prevButton).toContainClass('disabled');
    });
    
     
});