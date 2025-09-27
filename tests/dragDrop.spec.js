const { test, expect } = require('@playwright/test');

test.describe('Drag and Drop Tests', () => {

    test('should drag and drop an element', async ({ page }) => {
        await page.goto('https://practice.expandtesting.com/drag-and-drop');
        await expect(page).toHaveURL(/drag-and-drop/);

        const source = page.locator('#column-a');
        await expect(source).toHaveAttribute('draggable', 'true');
        const target = page.locator('#column-b');
        await expect(target).toHaveAttribute('draggable', 'true');

        await source.textContent().then(text => console.log('Source before drag:', text.trim()));
        await target.textContent().then(text => console.log('Target before drag:', text.trim()));

        //drag source to target
        await source.dragTo(target);

        await source.textContent().then(text => console.log('Source after drag:', text.trim()));
        await target.textContent().then(text => console.log('Target after drag:', text.trim()));

        //verify the text has been swapped
        await expect(source).toHaveText('B');
        await expect(target).toHaveText('A');
    });

    test.only('drag circles and drop into the box', async ({ page }) => {
        await page.goto('https://practice.expandtesting.com/drag-and-drop-circles');
        await expect(page).toHaveURL(/drag-and-drop-circles/); 
         
        //drag 3 color circles into the target box
        const redCircle = page.locator('.red');
        await expect(redCircle).toHaveAttribute('draggable', 'true');
        const blueCircle = page.locator('.blue');
        await expect(blueCircle).toHaveAttribute('draggable', 'true');
        const greenCircle = page.locator('.green');
        await expect(greenCircle).toHaveAttribute('draggable', 'true');

        const dropBox = page.locator('#target');
        await expect(dropBox).toHaveAttribute('dropzone','true');

        await redCircle.dragTo(dropBox);
        await blueCircle.dragTo(dropBox);
        await greenCircle.dragTo(dropBox);

        //verify all circles are in the drop box
        //the circles are now children of the target div
        await expect(dropBox.locator('.red')).toBeVisible();
        await expect(dropBox.locator('.blue')).toBeVisible();
        await expect(dropBox.locator('.green')).toBeVisible();
    });
});