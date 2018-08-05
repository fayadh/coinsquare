//Not including routes in this application since it's a one component application.

import { createStore } from 'redux'
import rootReducer from "../reducers/index";
const store = createStore(rootReducer)

export default store;