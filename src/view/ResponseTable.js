import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { map } from 'lodash';

/**
 *
 * @param {Object[]} rows Rows to display in the table
 */
function getColumnsFromRow (row) {
  return map(row, (value, key) => {
    return {
      dataKey: key,
      label: key,
      width: 150
    };
  });
}

const styles = (theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box'
  },
  table: {
    '& .ReactVirtualized__Table__headerRow': {
    flip: false,
    paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined
    }
  },
  tableRow: {
    cursor: 'pointer'
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableCell: {
    flex: 1
  },
  noClick: {
    cursor: 'initial'
  }
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
      const { columns, classes, rowHeight, onRowClick } = this.props;
      return (
      <TableCell
        component='div'
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null
        })}
        variant='body'
        style={{ height: rowHeight, minWidth: '150px' }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
      );
  };

  headerRenderer = ({ label, columnIndex }) => {
      const { headerHeight, columns, classes } = this.props;

      return (
      <TableCell
        component='div'
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant='head'
        style={{ height: headerHeight, minWidth: '150px' }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
      );
  };

  render () {
      const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
      return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit'
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                    ...headerProps,
                    columnIndex: index
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
          )}
      </AutoSizer>
      );
  }
}

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

const sample = [
  ['Frozen yoghurt', 159, 6.0, 24, 4.0],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3],
  ['Eclair', 262, 16.0, 24, 6.0],
  ['Cupcake', 305, 3.7, 67, 4.3],
  ['Gingerbread', 356, 16.0, 49, 3.9]
];

/**
 *
 * @param {*} id
 * @param {*} dessert
 * @param {*} calories
 * @param {*} fat
 * @param {*} carbs
 * @param {*} protein
 */
function createData (id, dessert, calories, fat, carbs, protein) {
  return { id, dessert, calories, fat, carbs, protein };
}

const rows = [];

for (let i = 0; i < 200; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}

export default class ResponseTable extends React.Component {
  render () {
    const { entries } = this.props;

    return (
      <Paper style={{ height: '100%', width: '100%' }}>
        <VirtualizedTable
          rowCount={entries.length}
          rowGetter={({ index }) => entries[index]}
          columns={getColumnsFromRow(entries[0])}
        />
      </Paper>
    );
  }
}
