import { Page, PageContext } from '@testing/wdio-page-objects';
import { getLogger } from '@testing/base';
import { User } from './model/user';

const logger = getLogger('app.common.LoginPage');

@PageContext({
  path: '#!/',
  wrapper: `demo-web-template[state=active][page-title="Login"]`,  
})
export class LoginPage extends Page {
  async doLogin(user: User) {
    logger.info('login');
    const access = await this.access;
    await access.click();
    const company = await this.company;
    await company.setValue(user.company);
    const username = await this.username;
    await username.setValue(user.username);
    const pass = await this.password;
    await pass.setValue(user.password);
    const submit = await this.submit;
    await submit.click();
  }

  private get access() {
    logger.debug('access');
    return $(`#access`);
  }

  private get company() {
    logger.debug('access');
    return $(`#company input`);
  }

  private get username() {
    logger.debug('username');
    return $(`#user input`);
  }

  private get password() {
    logger.debug('password');
    return $(`#password input`);
  }

  private get submit() {
    logger.debug('submit');
    return $(`#send`);
  }
}