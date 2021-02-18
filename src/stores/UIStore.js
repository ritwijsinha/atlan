import { observable, makeObservable, action } from 'mobx';
import { isNil } from 'lodash';

export default class UIStore {
  constructor () {
    this.activeSidebarTab = 0;
    this.isResponseLoading = false;

    makeObservable(this, {
      activeSidebarTab: observable,
      isResponseLoading: observable,
      setActiveSidebarTab: action.bound,
      setResponseLoading: action.bound
    });
  }

  // Setter method to change the active Tab in Sidebar
  setActiveSidebarTab (value) {
    !isNil(value) && (this.activeSidebarTab = value);
  }

  // Setter method to change the loading state of the response
  //
  // We need it because we're making an API call and would want to notify
  // users that they're query is being processed.
  setResponseLoading (value) {
    !isNil(value) && (this.isResponseLoading = value);
  }
}
