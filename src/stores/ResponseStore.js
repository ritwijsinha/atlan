import { observable, makeObservable, action } from 'mobx';
import { isNil } from 'lodash';
import { getStore } from './get-store';

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

    getStore('UIStore').setResponseLoading(false);
  }
}
