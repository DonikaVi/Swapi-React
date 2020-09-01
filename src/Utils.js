/**
 * Filter by selected people
 * @param res
 * @param people
 * @returns {*}
 */
const filterByPeople = ({ res, people }) => {
  // Get selected in filter people
  const filterByPeopleArr = people.filter((item) => !!item.value);
  const filteredArray = [];
  // Push to array urls of selected people
  filterByPeopleArr.forEach((item) => {
    filteredArray.push(item.url);
  });

  return res.filter((starItem) => starItem.pilots.some((r) => filteredArray.includes(r)));
};
/**
 *  Capacity filter
 * @param item
 * @param capacity
 * @returns {boolean|boolean}
 */
const capacityCondition = ({ item, capacity }) => {
  const [minCap, maxCap] = capacity;
  const itemCap = Number.parseInt(item.cargo_capacity, 10);
  return itemCap > minCap && itemCap < maxCap;
};

/**
 * minMaxCrewFilter
 * @param capCondition
 * @param item
 * @param crew
 * @returns {*}
 */
const minMaxCrewFilter = ({ capCondition, item, crew }) => {
  const [min, max] = crew;
  const itemCrew = item.crew.split('-');
  const [minCrew, maxCrew] = itemCrew;
  return (
    Number.parseInt(minCrew, 10) >= min
    && Number.parseInt(maxCrew, 10) <= max
    && capCondition
  );
};

/**
 * singleNumberCrewFilter
 * @param item
 * @param crew
 * @param capCondition
 * @returns {*}
 */
const singleNumberCrewFilter = ({ item, crew, capCondition }) => {
  const [min, max] = crew;
  let value = item.crew.replace(/,/g, '');
  value = Number.parseInt(value, 10);
  return value >= min && value < max && capCondition;
};

/**
 * Filter and sort starships by filter params
 * @param props
 * @param results
 * @returns {this}
 */
const filterShips = ({ props, results }) => {
  const {
    crew, capacity, people, filterBy,
  } = props;
  const [min, max] = crew;
  let res = results.filter((item) => {
    const capCondition = capacityCondition({ capacity, item });

    if (item.crew.includes('-')) {
      return minMaxCrewFilter({ capCondition, item, crew });
    }
    if (item.crew.includes(',')) {
      return singleNumberCrewFilter({ crew, capCondition, item });
    }
    const value = Number.parseInt(item.crew, 10);

    return value >= min && value <= max && capCondition;
  });

  // If people selected in filters
  const filterByPeopleEnabled = people.some((item) => !!item.value);
  if (filterByPeopleEnabled) {
    res = filterByPeople({ res, people });
  }
  return res.sort((a, b) => a[filterBy] - b[filterBy]);
};

export default filterShips;
