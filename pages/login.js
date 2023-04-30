exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.email_textBox = page.getByPlaceholder("Email");
    this.password_textBox = page.getByPlaceholder("password");
    this.login_button = page.getByRole("button", { name: "Log In" });
  }

  async gotoLoginPage() {
    await this.page.goto("https://naturalblog.netlify.app/");
    await this.page.getByRole("link", { name: "Admin" }).click();
  }

  async login(email, password) {
    await this.email_textBox.fill(email);
    await this.password_textBox.fill(password);
    await this.login_button.click();
  }
};

// await page.goto("https://naturalblog.netlify.app/");
// await page.getByRole("link", { name: "Admin" }).click();
// await page.getByPlaceholder("Email").fill("test@test.com");
// await page.getByPlaceholder("password").fill("#2021dev");
// await page.getByRole("button", { name: "Log In" }).click();
