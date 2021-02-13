import { observable, makeObservable } from 'mobx';
import { isNil } from 'lodash';

export default class EditorStore {
  constructor () {
    this.query = '';

    makeObservable(this, {
      query: observable
    });
  }

  setQuery (value) {
    !isNil(value) && (this.query = value);
  }
}
