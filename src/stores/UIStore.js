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

  setActiveSidebarTab (value) {
    !isNil(value) && (this.activeSidebarTab = value);
  }

  setResponseLoading (value) {
    !isNil(value) && (this.isResponseLoading = value);
  }
}
