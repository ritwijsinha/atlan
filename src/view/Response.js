import React from 'react';
import { observer } from 'mobx-react';
import { getStore } from '../stores/get-store';
import {
  RESPONSE_TYPE_TABLE,
  RESPONSE_TYPE_TEXT,
  RESPONSE_TYPE_EMPTY
} from '../constants/ResponseConstants';
import { Loader } from './Loader';
import '../styles/response.css';
import ResponseTable from './ResponseTable';
import ResponseMeta from './ResponseMeta';

@observer
export default class Response extends React.Component {
  constructor () {
    super();

    this.getView = this.getView.bind(this);
  }

  getView () {
    const ResponseStore = getStore('ResponseStore'),
      { type, entries } = ResponseStore || {},
      { isResponseLoading } = getStore('UIStore');

    if (isResponseLoading) {
      return (
        <div className='response-loader'>
          <Loader />
        </div>
      );
    }

    switch (type) {
      case RESPONSE_TYPE_EMPTY: {
        return (
          <div className='response-empty'>
            Run a query see the result(s)
          </div>
        );
      }

      case RESPONSE_TYPE_TEXT: {
        return (
          <div className='response-text'>
            { entries }
          </div>
        );
      }

      case RESPONSE_TYPE_TABLE: {
        return (
          <div className='response-table'>
            <ResponseMeta />
            <ResponseTable
              entries={entries}
            />
          </div>
        );
      }

      default:
        return null;
    }
  }

  render () {
    return (
      <div className='response'>
        { this.getView() }
      </div>
    );
  }
}
