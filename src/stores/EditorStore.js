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
    getStore('UIStore').setResponseLoading(true);

    return QueryExecutionService.execute(this.query)
      .then((response) => {
        const { entries, type } = response;

        getStore('ResponseStore').setResponse(response);
        getStore('HistoryStore').addHistory(this.query, { entries, type });
      })
      .catch(() => {
        const response = {
          type: 'text',
          entries: 'Unsupported query'
        };

        getStore('ResponseStore').setResponse(response);
      });
  }
}
