import { ComponentObject, ComponentContext } from '@testing/wdio-page-objects';
import { Movement } from "src/common/model/movement";

@ComponentContext({
  wrapper: 'bbva-web-table-body-text',
})
export class MovementComponent extends ComponentObject {
  get title() {
    return $('.info .text');
  }

  get tableButton() {
    return this.wrapper;
  }

  async titleText(): Promise<string> {
    const titleElement = await this.title;
    return titleElement.getText();
  }

  async getMovement(): Promise<Movement> {
    const getTitle = await this.titleText();
    return {
      title: getTitle
    }
  }

  async viewDetail() {
    const button = await this.tableButton;
    return button.click();
  }
}