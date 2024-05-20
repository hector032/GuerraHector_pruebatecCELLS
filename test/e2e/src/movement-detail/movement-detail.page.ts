import { Page, PageContext } from '@testing/wdio-page-objects';

@PageContext({
  wrapper: 'demo-detail-container',
})
export class MovementDetailPage extends Page {
  private get movementDetail() {
    return $(`bbva-panel-process`);
  }

  async getTitleDetail() {
    const title = await this.movementDetail
    const title$ = await title.shadow$('bbva-core-heading');
    return title$.getText();
  }
}