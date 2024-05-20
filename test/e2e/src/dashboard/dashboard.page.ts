import { Page, PageContext } from '@testing/wdio-page-objects';
import { componentProvider } from "@testing/wdio-page-objects";
import { MovementComponent } from "src/movement/movement.component";
import { Movement } from "src/common/model/movement";

@PageContext({
  path: '#!/dashboard',
  wrapper: 'demo-web-template[state="active"][page-title="Dashboard"]',
})
export class DashboardPage extends Page {
  async  movements(): Promise<Movement[]> {
    const findMany$ = await componentProvider.findMany(MovementComponent);
    const movements = await Promise.all(findMany$.map(component => component.getMovement()));
    return movements;
  }
  

  async viewMovement(movementIndex: number): Promise<void> {
    const movementsList = await componentProvider.findMany(MovementComponent);
    await movementsList[movementIndex].viewDetail();
  }
}
