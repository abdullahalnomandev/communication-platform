import { test } from "@playwright/test";

test.describe("My bologs testing", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://naturalblog.netlify.app/");
    await page.getByRole("link", { name: "Admin" }).click();
    await page.getByPlaceholder("Email").fill("test@test.com");
    await page.getByPlaceholder("password").fill("#2021dev");
    await page.getByRole("button", { name: "Log In" }).click();
  });

  test.afterAll(async ({ page }) => {
    await page.close();
  });

  test("Add a new blog", async ({ page }) => {
    await page.getByRole("link", { name: "Add Blog" }).click();
    await page.locator('input[name="title"]').fill("Testing Title");
    await page.locator('textarea[name="content"]').fill("This is content ");
    await page.getByText("Upload a cover image Add blog Title Add Blog Content Save").click();
    await page.getByRole("button", { name: "Save" }).click();
    await page.close();
  });

  test("Log out", async ({ page }) => {
    await page.getByRole("link", { name: "Logout" }).click();
  });
});
