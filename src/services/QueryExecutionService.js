const BASE_URL = 'https://d165ca57-ff45-4431-9734-1035838a3cb9.mock.pstmn.io',
  QueryExecutionService = {
    execute () {
      return fetch(`${BASE_URL}/select`, { method: 'POST' })
        .then((response) => response.json());
    }
  };

export default QueryExecutionService;
