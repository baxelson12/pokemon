import {
  ActivatedRouteSnapshot,
  Params,
  RouterStateSnapshot
} from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

import * as RouterReducer from '../reducers/router.reducer';

export class ParamSerializer
  implements RouterStateSerializer<RouterReducer.State> {
  private traverse(root: ActivatedRouteSnapshot): Params {
    // The object to be returned
    let params: Params = {};
    // The starting point
    let route = root;
    // Iterate til we hit the end
    while (route.firstChild) {
      route = route.firstChild;
      // Collect all params on the way there (if any)
      params = { ...params, ...route.params };
    }
    return params;
  }

  serialize(routerState: RouterStateSnapshot): RouterReducer.State {
    // Since we want an object, we can just reduce the array.
    // root.children provides primary and modal outlets
    const params = routerState.root.children.reduce(
      (acc, curr) => ({ ...acc, ...this.traverse(curr) }),
      {}
    );
    // Full url
    const { url } = routerState;
    return { url, params };
  }
}
