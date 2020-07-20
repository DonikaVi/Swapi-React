import {APPLY_FILTERS, CHANGE_FILTER_BY, GET_PEOPLE_FILTERS} from "../constants";

const initialState = {
  people: [],
  crew: [0, 100000],
  capacity: [0, 500000],
  filterBy: 'crew'
};
export default function filters(state = initialState, action) {
  switch (action.type) {
    case GET_PEOPLE_FILTERS:
      const { results } = action.payload;
      return {
        ...state,
        people: changePeople(results),
      };
    case APPLY_FILTERS:
      const {people, crew, capacity} = action.payload;
      return {
        ...state,
        people,
        crew,
        capacity
      }
    case CHANGE_FILTER_BY:
      return {
        ...state,
        filterBy: action.payload
      }
    default:
      return state;
  }
}

const changePeople = (data) => {
  return data.map((item) => {
    return { name: item.name, value: false, url: item.url };
  });
};
