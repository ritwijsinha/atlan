import React from 'react';
import { observer } from 'mobx-react';
import { TextField } from '@material-ui/core';
import { getStore } from '../stores/get-store';
import { get } from 'lodash';

@observer
export default class ResponseMeta extends React.Component {
  constructor () {
    super();

    this.handleFilterQueryChange = this.handleFilterQueryChange.bind(this);
  }

  handleFilterQueryChange (e) {
    const { setFilterQuery } = getStore('ResponseStore');

    setFilterQuery(get(e, 'target.value'));
  }

  render () {
    const { entries = [] } = getStore('ResponseStore');

    return (
      <div className='response-table__meta'>
        <TextField
          label='Filter'
          variant='outlined'
          size='small'
          className='response-table__meta-input'
          onChange={this.handleFilterQueryChange}
        />
        <div className='response-table__meta-info'>
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
        </div>
      </div>
    );
  }
}
