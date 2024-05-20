import { Given, Then } from '@testing/cucumber-runner';
import { LoginPage } from './login.page';
import { pageProvider } from "@testing/wdio-page-objects";

export class LoginSteps {
  @Given("I'm a logged user")
  async IAmALoggedUser() {
    //If you want to use data manager for user retrieval, uncomment next line and remove hardcoded credencials in favor of this?.world?.users?.get() as User
    //getStepClassInstance(UserProviderSteps).findUser("validuser");
    const page = await pageProvider.go(LoginPage);
    await page.doLogin({company: 'CompanyName', username: 'CellsUser', password: '123456'});
  }

  @Then('I should see the login page')
  async iShouldSeeTheLoginPage() {
    await pageProvider.wait(LoginPage);
  }
}