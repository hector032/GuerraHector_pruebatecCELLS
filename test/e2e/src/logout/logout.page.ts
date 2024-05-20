import { Page, PageContext } from '@testing/wdio-page-objects';
import { getLogger } from "@testing/base";

const logger = getLogger('app.common.LogoutPage');

@PageContext({
  wrapper: 'demo-menu-container-web',
})
export class LogoutPage extends Page {

  

  private get helpButton() {
    return $(`.menu-item-1`);
  }

  async logout() {
    logger.info('confirmLogout');
    const logout = await this.logoutButton
    return logout.click();
  }

  async viewHelp(): Promise<void> {
    const helpButton$ = await this.helpButton
    return helpButton$.click();
  }
}