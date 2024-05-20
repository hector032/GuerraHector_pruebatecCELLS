import { Then, When } from '@testing/cucumber-runner';
import { expect } from "chai";
import { DashboardPage } from  './dashboard.page';
import { HelpPage } from '../help-page/help-page.page';
import { pageProvider } from "@testing/wdio-page-objects";
import { LogoutPage } from "src/logout/logout.page";
import { MovementDetailPage } from "src/movement-detail/movement-detail.page";

export class DashboardSteps {

  @Then('I should see the dashboard')
  async iShouldSeeTheDashboard() {
    await pageProvider.wait(DashboardPage);
  }

  @Then('I should see at least {int} movements with a title')
  async iShouldSeeAtLeastXMovementsWithATitle(expectedMinMovementsCount: number) {
    const page = await (pageProvider.wait(DashboardPage));
    const movements =  await page.movements();
    expect(movements.length).to.be.at.least(expectedMinMovementsCount)
    movements.forEach(async movement => {
      const title = (await movement).title;
      expect(title).to.be.not.empty;
    })
  }

  @When(/^I log out$/)
  async iLogout() {
   const logoutPage = await (pageProvider.wait(LogoutPage));
   await logoutPage.logout();
  }

  @When('I choose movement in position {int}')
  async iChooseMovementXInPosition(movementIndex: number) {
    const dashboard = await pageProvider.wait(DashboardPage);
    const movements=  await dashboard.movements();
    dashboard.viewMovement(movementIndex);
  }

  @Then('I should see the detail component')
  async iShouldSeeTheDetail() {
    const detailTitlePage = await pageProvider.wait(MovementDetailPage)
    const detailTitle = await detailTitlePage.getTitleDetail();
    expect(detailTitle).equal('Gas receipt');
  }

  @When(/^I view the help page$/)
  async iViewTheHelpPage() {
    const page = await pageProvider.wait(LogoutPage)
    await page.viewHelp();
  }

  @Then(/^I should see a lovely info page$/)
  async iShouldSeeALovelyInfoPage() {
    const headerText$ = await pageProvider.wait(HelpPage);
    const headerText = await headerText$.headerText();
    const listElement$ = await pageProvider.wait(HelpPage);
    const listElement = await listElement$.listElementsCount();
    expect(headerText).to.be.equal('Made with ❤️ by Cells Team');
    expect(listElement).to.be.at.least(2);
  }

  @Then(/^It should pass accessibility validations$/)
  async accessibility() {
    const browser = (global as any).browser;
    const accesibilityResults = await browser.accessibilityCheck(true);

    expect(accesibilityResults.violations).to.be.empty;
  }
}
