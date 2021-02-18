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

  // `computed` property to provide reactive data to UI
  // with respect to the `filterQuery`
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

  // Setter method to change the view with respect to the active Response
  setResponse (response) {
    const { entries, type } = response,
      { setResponseLoading } = getStore('UIStore');

    this.type = type;
    this.responseData = entries;

    setResponseLoading(false);

    // Reset filter query
    this.setFilterQuery('');
  }

  // Setter method to modify the `filterQuery`
  setFilterQuery (value) {
    !isNil(value) && (this.filterQuery = value);
  }

  // Resets the current selection for Info section in Sidebar
  resetSelectedResponse () {
    this.selectedIndex = null;
  }

  // Helper method to select a row in Response
  selectResponse (index) {
    this.selectedIndex = index;

    // Set the current Sidebar tab to 'Info'
    getStore('UIStore').setActiveSidebarTab(0);
  }
}
