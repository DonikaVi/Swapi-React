import { combineReducers } from 'redux'
import filtersReducer from "./filtersReducer";
import itemsReducer from "./itemsReducer";
import appReducer from "./appReducer";

export default combineReducers({
    filters: filtersReducer,
    items: itemsReducer,
    app: appReducer
})