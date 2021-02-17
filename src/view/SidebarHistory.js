import { observer } from 'mobx-react';
import React from 'react';

@observer
export default class SidebarHistory extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className='sidebar-history'>
        History
      </div>
    );
  }
}
