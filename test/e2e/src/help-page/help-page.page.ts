import { Page, PageContext } from '@testing/wdio-page-objects';

@PageContext({
  path: '#!/help',
  wrapper: 'demo-web-template[state="active"]',
})
export class HelpPage extends Page {
  private get infoList() {
    return $$(`bbva-web-list-item-bullet`);
  }

  async headerText(): Promise<string> {
    return $(`h1`).getText();
  }

  async listElementsCount(): Promise<number> {
    const movList = await this.infoList;
    return movList.length
  }
}