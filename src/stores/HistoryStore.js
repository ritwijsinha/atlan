import { observable, makeObservable, action, computed } from 'mobx';
import { isNil, filter, includes, toLower, orderBy, map, get } from 'lodash';

export default class HistoryStore {
  constructor () {
    this.historyData = new Map();
    this.filterQuery = '';

    makeObservable(this, {
      historyData: observable,
      filterQuery: observable,
      addHistory: action.bound,
      setFilterQuery: action.bound,
      filteredEntries: computed,
      entries: computed
    });
  }

  get entries () {
    const filteredEntries = this.filteredEntries,
      sortedEntries = orderBy(filteredEntries, ['time'], ['desc']);

    return map(sortedEntries, (entry) => entry.value);
  }

  get filteredEntries () {
    const arrayWithTime = Array.from(this.historyData, ([time, value]) => ({ time, value }));

    if (!this.filterQuery.trim()) {
      return arrayWithTime;
    }

    const lowerCasedFilterQuery = toLower(this.filterQuery);

    return filter(arrayWithTime, (historyItem) => {
      return includes(toLower(get(historyItem, 'value.query')), lowerCasedFilterQuery);
    });
  }

  addHistory (query, response) {
    this.historyData.set(Date.now(), { query, response });
  }

  setFilterQuery (value) {
    !isNil(value) && (this.filterQuery = value);
  }
}
