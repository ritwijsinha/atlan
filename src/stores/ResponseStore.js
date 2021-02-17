import { observable, makeObservable, action, computed } from 'mobx';
import { isNil, filter, includes, toLower, forEach } from 'lodash';
import { getStore } from './get-store';

export default class ResponseStore {
  constructor () {
    this.type = '';
    this.responseData = {};
    this.filterQuery = '';
    this.selectedIndex = null;

    makeObservable(this, {
      type: observable,
      responseData: observable,
      filterQuery: observable,
      selectedIndex: observable,
      setResponse: action,
      setFilterQuery: action.bound,
      selectResponse: action.bound,
      resetSelectedResponse: action.bound,
      entries: computed
    });
  }

  get entries () {
    if (!this.filterQuery.trim()) {
      return this.responseData;
    }

    const lowerCasedFilterQuery = toLower(this.filterQuery);

    return filter(this.responseData, (responseItem) => {
      let isIncluded = false;

      forEach(responseItem, (value) => {
        if (isIncluded) {
          return;
        }

        if (includes(toLower(value), lowerCasedFilterQuery)) {
          isIncluded = true;
        }
      });

      return isIncluded;
    });
  }

  setResponse (response) {
    const { entries, type } = response,
      { setResponseLoading } = getStore('UIStore');

    this.type = type;
    this.responseData = entries;

    setResponseLoading(false);

    // Reset filter query
    this.setFilterQuery('');
  }

  setFilterQuery (value) {
    !isNil(value) && (this.filterQuery = value);
  }

  resetSelectedResponse () {
    this.selectedIndex = null;
  }

  selectResponse (index) {
    this.selectedIndex = index;

    // Set the current Sidebar tab to 'Info'
    getStore('UIStore').setActiveSidebarTab(0);
  }
}
