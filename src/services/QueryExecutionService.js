import { toLower } from 'lodash';

const BASE_URL = 'https://d165ca57-ff45-4431-9734-1035838a3cb9.mock.pstmn.io',
  supportedQueries = ['select', 'create', 'update', 'delete'],
  QueryExecutionService = {
    /**
     * Method exposed to execute any type of SQL Query
     *
     * @param {String} query SQL Query to process
     */
    execute (query) {
      if (!query) {
        return Promise.reject(new Error('QueryExecutionService~execute: invalid query'));
      }

      const queryType = toLower(query.split(' ')[0]);

      if (!supportedQueries.includes(queryType)) {
        return Promise.reject(new Error('QueryExecutionService~execute: unsupported query'));
      }

      return this[queryType](query);
    },

    /**
     * Service for fetching data for `SELECT` query
     *
     * @param {String} query SQL Query to process
     */
    select (query) {
      return fetch(`${BASE_URL}/select`, { method: 'POST', body: JSON.stringify(query) })
        .then((response) => response.json());
    },

    /**
     * Service for fetching data for `CREATE` query
     *
     * @param {String} query SQL Query to process
     */
    create (query) {
      return fetch(`${BASE_URL}/create`, { method: 'POST', body: JSON.stringify(query) })
        .then((response) => response.json());
    },

    /**
     * Service for fetching data for `UPDATE` query
     *
     * @param {String} query SQL Query to process
     */
    update (query) {
      return fetch(`${BASE_URL}/update`, { method: 'PUT', body: JSON.stringify(query) })
        .then((response) => response.json());
    },

    /**
     * Service for fetching data for `DELETE` query
     *
     * @param {String} query SQL Query to process
     */
    delete (query) {
      return fetch(`${BASE_URL}/delete`, { method: 'DELETE', body: JSON.stringify(query) })
        .then((response) => response.json());
    }
  };

export default QueryExecutionService;
