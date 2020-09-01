import { MENU_CHANGE } from '../constants';

const initialState = {
  menuOpen: false,
};
export default function app(state = initialState, action) {
  switch (action.type) {
    case MENU_CHANGE:
      return {
        ...state,
        menuOpen: !state.menuOpen,
      };
    default:
      return state;
  }
}
