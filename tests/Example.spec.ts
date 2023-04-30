import { test } from '@playwright/test';

test("FIrst testing",async ({page})=>{

    await page.goto("https://noman-dev.xyz");
    await page.pause();

})


