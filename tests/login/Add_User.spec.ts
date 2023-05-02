import { test } from '@playwright/test';

test("Add User",async ({page})=>{

    await page.goto("https://communication-platform-ten.vercel.app");
    await page.getByRole('button', { name: 'SIGN UP WITH GOOGLE' }).click();
    await page.getByRole('textbox', { name: 'Email or phone' }).click();
    await page.getByRole('textbox', { name: 'Email or phone' }).fill('abdullahalnoman1512@gmail.com');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('01732750974');
    await page.getByRole('button', { name: 'Next' }).click();

    await page.getByRole('link', { name: 'USERS' }).click();
    await page.getByRole('button', { name: 'Add User' }).click();
    await page.getByPlaceholder('Write user name').fill('Test name');
    await page.getByPlaceholder('name@flowbite.com').fill('test@gmail.com');
    await page.getByPlaceholder('Write mobile number').fill('01741581512');
    await page.click('input.bg-blue-500.text-white.active\\:bg-blue-600.font-bold.uppercase.text-sm.px-6.py-3.rounded.shadow.hover\\:shadow-lg.outline-none.focus\\:outline-none.mr-1.mb-1.ease-linear.transition-all.duration-150.cursor-pointer[type="submit"]');


    await page.close();

})

