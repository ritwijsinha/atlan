import { observable, makeObservable, action } from 'mobx';
import { isNil } from 'lodash';
import QueryExecutionService from '../services/QueryExecutionService';
import { getStore } from './get-store';

export default class EditorStore {
  constructor () {
    this.query = '';

    makeObservable(this, {
      query: observable,
      setQuery: action,
      runQuery: action.bound
    });
  }

  setQuery (value) {
    !isNil(value) && (this.query = value);
  }

  runQuery () {
    return QueryExecutionService.execute(this.query)
      .then((response) => {
        getStore('ResponseStore').setResponse(response);
      });
  }
}
