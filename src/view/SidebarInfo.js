import { observer } from 'mobx-react';
import React from 'react';

@observer
export default class SidebarInfo extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className='sidebar-info'>
        Info
      </div>
    );
  }
}
