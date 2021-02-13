import { configure } from 'mobx';

import UIStore from './UIStore';

// It is not allowed to change any state outside of an action
configure({ enforceActions: 'observed' });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  UIStore
};