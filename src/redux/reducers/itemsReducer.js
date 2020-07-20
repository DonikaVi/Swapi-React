import {ADD_STARSHIPS, GET_PEOPLE, GET_STARSHIP} from "../constants";

const initialState = {
  starships: { results: [], next: null },
  pilots: {},
};
export default function items(state = initialState, action) {
  switch (action.type) {
    case GET_PEOPLE:
      return {
        ...state,
        pilots: action.payload,
      };
    case GET_STARSHIP:
      return {
        ...state,
        starships: action.payload,
      };
    case ADD_STARSHIPS:
      const {results, next} = action.payload;
      let newState = {...state.starships};
      const added = newState.results.concat(results);
      newState.results = added;
      newState.next = next;
      return {
        ...state,
        starships: {...newState},
      };
    default:
      return state;
  }
}
