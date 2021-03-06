import React from 'react';
import { observer, Observer } from 'mobx-react';
import Paper from '@material-ui/core/Paper';
import { AutoSizer } from 'react-virtualized';
import { map } from 'lodash';
import { FixedSizeList as VirtualizedList } from 'react-window';
import { getStore } from '../stores/get-store';
import { findDOMNode } from 'react-dom';

const ITEM_HEIGHT = 32;

@observer
class TableCell extends React.Component {
  constructor () {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.getArrow = this.getArrow.bind(this);
  }

  handleClick () {
    this.props.onClick && this.props.onClick();
  }

  getArrow () {
    switch (this.props.renderArrow) {
      case 'asc': {
        return '↑';
      }

      case 'desc': {
        return '↓';
      }

      default:
        return null;
    }
  }

  render () {
    const { content } = this.props;

    return (
      <div
        title={content}
        className='response-table__cell'
        onClick={this.handleClick}
      >
        <div className='response-table__cell-text'>
          {content}
        </div>
        {this.getArrow()}
      </div>
    );
  }
}

@observer
class TableHeader extends React.Component {
  render () {
    const { item } = this.props,
      { sortedBy, sortOrder, setSortBy } = getStore('ResponseStore');

    return (
      <div className='response-table__header'>
        {
          map(item, (value, key) => {
            const isSortedWithCurrentColumn = (key === sortedBy),
              shouldRenderArrow = isSortedWithCurrentColumn && sortOrder;

            return (
              <TableCell
                key={key}
                content={key}
                renderArrow={shouldRenderArrow}
                onClick={setSortBy.bind(this, key)}
              />
            );
          })
        }
      </div>
    );
  }
}

@observer
class TableRow extends React.Component {
  render () {
    const { item } = this.props;

    return (
      <div className='response-table__row'>
        {
          map(item, (value) => (
            <TableCell key={value} content={value} />
          ))
        }
      </div>
    );
  }
}

@observer
export default class ResponseTable extends React.Component {
  constructor () {
    super();
  }

  componentDidMount () {
    this.$headerNode = findDOMNode(this.headerRef);

    this.resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (!(entry && entry.target)) {
          return;
        }

        this.scrollWidth = entry.target.scrollWidth;
        this.forceUpdate();
      }
    });

    this.resizeObserver && this.resizeObserver.observe(this.$headerNode);
  }

  componentWillUnmount () {
    this.resizeObserver && this.resizeObserver.unobserve(this.$headerNode);
  }

  getListItem ({ style, index }) {
    const item = this.props.entries[index],
      { selectResponse, selectedIndex } = getStore('ResponseStore');

    return (
      <div
        onClick={selectResponse.bind(this, index)}
        style={style}
        className={`response-table__virtualized-row ${selectedIndex === index && 'active'}`}
      >
        <TableRow item={item} />
      </div>
    );
  }

  render () {
    const { entries = [] } = this.props,
      lister = (data) => (
        <Observer>
          {this.getListItem.bind(this, data)}
        </Observer>
      );

    return (
      <Paper className='response-table__paper'>
        <div className='response-table__wrapper'>
          <TableHeader ref={(ref) => this.headerRef = ref} item={entries[0]} />
          <div className='response-table__list'>
            <AutoSizer>
              {({ height, width }) => (
                <VirtualizedList
                  height={height}
                  width={this.scrollWidth > width ? this.scrollWidth : width}
                  itemCount={entries.length}
                  itemSize={ITEM_HEIGHT}
                  ref={(ref) => { this.listRef = ref; }}
                  overscanCount={10}
                  className='response-table__virtualized-list'
                >
                  {lister}
                </VirtualizedList>
              )}
            </AutoSizer>
          </div>
        </div>
      </Paper>
    );
  }
}
