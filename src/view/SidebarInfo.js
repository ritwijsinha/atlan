import { isNil, map } from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { getStore } from '../stores/get-store';

@observer
export default class SidebarInfo extends React.Component {
  constructor () {
    super();
  }

  render () {
    const { selectedIndex, entries } = getStore('ResponseStore'),
      selectedItem = selectedIndex && entries && entries[selectedIndex];

    return (
      <div className='sidebar-info__wrapper'>
        {
          isNil(selectedIndex) ?
          'Select a response to view details' :
          <div className='sidebar-info'>
            {
              map(selectedItem, (value, key) => (
                <div key={key} className='sidebar-info__entry'>
                  <span className='sidebar-info__entry-key'>
                    {key}
                  </span>
                  <div className='sidebar-info__entry-value'>
                    {value}
                  </div>
                </div>
              ))
            }
          </div>
        }
      </div>
    );
  }
}
