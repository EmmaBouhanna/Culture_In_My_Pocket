// Store/configureStore.js

import { createStore } from 'redux';
import toggleAlu from './Reducer/aluReducer'

export default createStore(toggleAlu)