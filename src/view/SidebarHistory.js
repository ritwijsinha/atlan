import React from 'react';
import { observer, Observer } from 'mobx-react';
import { TextField } from '@material-ui/core';
import { getStore } from '../stores/get-store';
import { get } from 'lodash';
import { AutoSizer } from 'react-virtualized';
import { FixedSizeList as VirtualizedList } from 'react-window';


const ITEM_HEIGHT = 32;

@observer
export default class SidebarHistory extends React.Component {
  constructor () {
    super();

    this.handleFilterQueryChange = this.handleFilterQueryChange.bind(this);
  }

  handleFilterQueryChange (e) {
    const { setFilterQuery } = getStore('HistoryStore');

    setFilterQuery(get(e, 'target.value'));
  }

  render () {
    const { entries } = getStore('HistoryStore'),
    lister = ({ style, index }) => {
      const item = entries[index];

      return (
        <div
          title={item.query}
          className='history__list-item'
          style={style}
        >
          {item.query}
        </div>
      );
    };

    return (
      <div className='sidebar-history'>
        <TextField
          label='Filter'
          variant='outlined'
          size='small'
          className='history-input'
          onChange={this.handleFilterQueryChange}
        />
        <div className='history__list'>
            <AutoSizer>
              {({ height, width }) => (
                <VirtualizedList
                  height={height}
                  width={width}
                  itemCount={entries.length}
                  itemSize={ITEM_HEIGHT}
                  ref={(ref) => { this.listRef = ref; }}
                >
                  {lister}
                </VirtualizedList>
              )}
            </AutoSizer>
          </div>
      </div>
    );
  }
}
