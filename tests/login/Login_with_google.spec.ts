import { test } from '@playwright/test';

test("FIrst testing",async ({page})=>{

    await page.goto("https://communication-platform-ten.vercel.app");
    await page.getByRole('button', { name: 'SIGN UP WITH GOOGLE' }).click();
    await page.getByRole('textbox', { name: 'Email or phone' }).click();
    await page.getByRole('textbox', { name: 'Email or phone' }).fill('abdullahalnoman1512@gmail.com');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('01732750974');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.pause();

})


