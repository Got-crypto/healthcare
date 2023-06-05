import { combineReducers } from 'redux';

import main from './main';
import tests from './tests'

const reducers = combineReducers({ main, tests });

export default reducers;
