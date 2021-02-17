import React from 'react';
import { observer } from 'mobx-react';
import { Tabs, Tab } from '@material-ui/core';
import { getStore } from '../stores/get-store';
import SidebarInfo from './SidebarInfo';
import SidebarHistory from './SidebarHistory';
import '../styles/sidebar.css';

@observer
export default class Sidebar extends React.Component {
  constructor () {
    super();

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange (event, newValue) {
    getStore('UIStore').setActiveSidebarTab(newValue);
  }

  getActiveView () {
    const { activeSidebarTab } = getStore('UIStore');

    switch (activeSidebarTab) {
      case 0: {
        return (
          <SidebarInfo />
        );
      }

      case 1: {
        return (
          <SidebarHistory />
        );
      }

      default:
        return null;
    }
  }

  render () {
    const { activeSidebarTab } = getStore('UIStore');

    return (
      <div className='sidebar'>
        <Tabs
          value={activeSidebarTab}
          onChange={this.handleTabChange}
          indicatorColor='primary'
          textColor='primary'
          centered
        >
          <Tab label='Info' id={0} />
          <Tab label='History' id={1} />
        </Tabs>
        { this.getActiveView() }
      </div>
    );
  }
}
