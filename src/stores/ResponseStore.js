import { observable, makeObservable, action } from 'mobx';
import { isNil } from 'lodash';

export default class ResponseStore {
  constructor () {
    this.type = '';
    this.entries = {};

    makeObservable(this, {
      type: observable,
      entries: observable,
      setResponse: action
    });
  }

  setResponse (response) {
    const { entries, type } = response;

    this.type = type;
    this.entries = entries;

    console.log(this);
  }
}
