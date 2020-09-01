import {
  ADD_STARSHIPS,
  APPLY_FILTERS,
  CHANGE_FILTER_BY,
  GET_PEOPLE,
  GET_PEOPLE_FILTERS,
  GET_STARSHIP,
  MENU_CHANGE,
} from './constants';

export function getPilots(data) {
  return {
    type: GET_PEOPLE,
    payload: data,
  };
}

export function getStarships(data) {
  return {
    type: GET_STARSHIP,
    payload: data,
  };
}

export function addStarships(data) {
  return {
    type: ADD_STARSHIPS,
    payload: data,
  };
}

export function addPeopleFilters(data) {
  return {
    type: GET_PEOPLE_FILTERS,
    payload: data,
  };
}

export function applyFilters(data) {
  return {
    type: APPLY_FILTERS,
    payload: data,
  };
}

export function changeFilterBy(data) {
  return {
    type: CHANGE_FILTER_BY,
    payload: data,
  };
}

export function changeMenuState() {
  return {
    type: MENU_CHANGE,
  };
}
