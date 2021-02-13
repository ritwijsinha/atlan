import { observable, reaction, action } from 'mobx';

export default class UIStore {
  @observable isEditorCollapsed = false;

  @action
  collapseEditor (value) {
    this.isEditorCollapsed = value;
  }
}