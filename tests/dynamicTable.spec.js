const { test, expect } = require('@playwright/test');

test('Validate Chrome CPU value in dynamic table', async ({ page }) => {
    // Go to the page
    await page.goto('https://practice.expandtesting.com/dynamic-table'); // Replace with actual URL

   // Find the index of the CPU column dynamically
   //allTextContents to get text of all headers and rows
    const headers = await page.locator('table thead tr th').allTextContents();
    console.log('Table Headers:', headers);
    //print rows text
    const rows = await page.locator('table tbody tr').allTextContents();
    console.log('Table Rows:', rows);

    //find index of CPU column

    const cpuIndex = headers.findIndex(header => header.trim() === 'CPU');
    //alternative way to find index
    // const cpuIndex = headers.indexOf('CPU');

    console.log('CPU Column Index:', cpuIndex);
    if (cpuIndex === -1) throw new Error('CPU column not found');

    // Directly locate the Chrome row's CPU cell using Playwright locators
    const chromeCpuCell = page.locator(`table tbody tr:has(td:text("Chrome")) td:nth-child(${cpuIndex + 1})`);

    const chromeCpuValue = (await chromeCpuCell.textContent()).trim();
    console.log('Chrome CPU Value:', chromeCpuValue);

    // Get CPU value from the yellow label
    const labelCpuValue = (await page.locator('#chrome-cpu').textContent())
        .replace('Chrome CPU:', '').trim();
    console.log('Label CPU Value:', labelCpuValue);
    // Compare the values
    expect(chromeCpuValue).toBe(labelCpuValue);

    console.log(`Chrome CPU in table: ${chromeCpuValue}, Label: ${labelCpuValue}`);
});
