import { observable, makeObservable, action, computed } from 'mobx';
import { isNil, filter, includes, toLower, orderBy, map, get, clone, forEach } from 'lodash';
import { getStore } from './get-store';

export default class HistoryStore {
  constructor () {
    this.historyData = new Map();
    this.filterQuery = '';

    makeObservable(this, {
      historyData: observable,
      filterQuery: observable,
      addHistory: action.bound,
      addHistoryInStore: action.bound,
      setFilterQuery: action.bound,
      openHistory: action.bound,
      filteredEntries: computed,
      entries: computed
    });

    const historyItems = localStorage.getItem('history');

    if (!historyItems) {
      localStorage.setItem('history', '{}');
    }
    else {
      const historyToAdd = JSON.parse(historyItems);

      forEach(historyToAdd, (historyItem, time) => {
        this.addHistoryInStore(time, historyItem);
      });
    }
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

  addHistoryInStore (time, historyItem) {
    this.historyData.set(time, historyItem);
  }

  addHistory (query, response) {
    const currentTime = Date.now(),
      historyItem = { query, response },
      itemsInStorage = clone(JSON.parse(localStorage.getItem('history')));

    this.addHistoryInStore(currentTime, historyItem);

    itemsInStorage[currentTime] = historyItem;
    localStorage.setItem('history', JSON.stringify(itemsInStorage));
  }

  setFilterQuery (value) {
    !isNil(value) && (this.filterQuery = value);
  }

  openHistory (index) {
    if (isNil(index)) {
      return;
    }

    const { query, response } = this.entries[index];

    getStore('EditorStore').setQuery(query);
    getStore('ResponseStore').setResponse(response);
    getStore('ResponseStore').resetSelectedResponse();
  }
}
