import { observable, makeObservable, action } from 'mobx';
import { isNil } from 'lodash';

export default class UIStore {
  constructor () {
    this.isEditorCollapsed = false;
    this.isResponseCollapsed = false;
    this.activeSidebarTab = 0;
    this.isResponseLoading = false;

    makeObservable(this, {
      isEditorCollapsed: observable,
      isResponseCollapsed: observable,
      activeSidebarTab: observable,
      isResponseLoading: observable,
      collapseEditor: action,
      collapseResponse: action,
      setActiveSidebarTab: action,
      setResponseLoading: action
    });
  }

  collapseEditor (value) {
    !isNil(value) && (this.isEditorCollapsed = value);
  }

  collapseResponse (value) {
    !isNil(value) && (this.isResponseCollapsed = value);
  }

  setActiveSidebarTab (value) {
    !isNil(value) && (this.activeSidebarTab = value);
  }

  setResponseLoading (value) {
    !isNil(value) && (this.isResponseLoading = value);
  }
}
