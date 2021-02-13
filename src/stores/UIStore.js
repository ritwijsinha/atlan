import { observable, makeObservable } from 'mobx';
import { isNil } from 'lodash';

export default class UIStore {
  constructor () {
    this.isEditorCollapsed = false;

    makeObservable(this, {
      isEditorCollapsed: observable
    });
  }

  collapseEditor (value) {
    !isNil(value) && (this.isEditorCollapsed = value);
  }
}
