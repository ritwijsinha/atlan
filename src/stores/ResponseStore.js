import { observable, makeObservable, action, computed } from 'mobx';
import { isNil, filter, includes, toLower, forEach, orderBy } from 'lodash';
import { getStore } from './get-store';

const SORT_ORDER = ['asc', 'desc', null];

export default class ResponseStore {
  constructor () {
    this.type = '';
    this.responseData = {};
    this.filterQuery = '';
    this.selectedIndex = null;
    this.sortedBy = null;
    this.sortOrder = '';

    makeObservable(this, {
      type: observable,
      responseData: observable,
      filterQuery: observable,
      selectedIndex: observable,
      sortedBy: observable,
      sortOrder: observable,
      setResponse: action.bound,
      setFilterQuery: action.bound,
      selectResponse: action.bound,
      resetSelectedResponse: action.bound,
      setSortBy: action.bound,
      entries: computed,
      filteredEntries: computed
    });
  }

  // `computed` property to provide reactive data to UI
  // with History sorted in descending order on the basis of time of creation.
  get entries () {

    // If both `sortedBy` and `sortOrder` are not present,
    // then we fallback to the default view
    if (!(this.sortedBy && this.sortOrder)) {
      return this.filteredEntries;
    }

    return orderBy(this.filteredEntries, [this.sortedBy], [this.sortOrder]);
  }

  // `computed` property to provide reactive data to UI
  // with respect to the `filterQuery`
  get filteredEntries () {
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

  setSortBy (headerName) {
    if (!headerName) {
      return;
    }

    // If the same header is being clicked multiple times,
    // we change it from 'asc' to 'desc' to `null` and so on.
    if (this.sortedBy === headerName) {
      const currentOrderIndex = SORT_ORDER.indexOf(this.sortOrder),
        nextOrder = SORT_ORDER[(currentOrderIndex + 1) % 3];

      this.sortOrder = nextOrder;

      // If the next order is `null`, then we also reset `sortedBy`
      !nextOrder && (this.sortedBy = null);

      return;
    }

    // This is a new header, so we start with 'asc' again
    this.sortedBy = headerName;
    this.sortOrder = SORT_ORDER[0];
  }
}
