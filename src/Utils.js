/**
 * Filter and sort starships by filter params
 * @param props
 * @param results
 * @returns {this}
 */
export const filterShips = ({ props, results }) => {
  const { crew, capacity, people, filterBy } = props;
  const [min, max] = crew;
  const [minCap, maxCap] = capacity;
  let res = [];
  res = results.filter((item) => {
    const itemCap = Number.parseInt(item.cargo_capacity);
    const capCondtion = itemCap > minCap && itemCap < maxCap;
    if (item.crew.includes("-")) {
      const itemCrew = item.crew.split("-");
      const [minCrew, maxCrew] = itemCrew;
      return (
        Number.parseInt(minCrew) >= min &&
        Number.parseInt(maxCrew) <= max &&
        capCondtion
      );
    }
    if (item.crew.includes(",")) {
      let value = item.crew.replace(/,/g, "");
      value = Number.parseInt(value);
      return value >= min && value < max && capCondtion;
    }
    const value = Number.parseInt(item.crew);

    return value >= min && value <= max && capCondtion;
  });

  const filterByPeopleEnabled = people.some((item) => !!item.value);
  if (filterByPeopleEnabled) {
    const filterByPeople = people.filter((item) => !!item.value);
    let filteredArray = [];
    filterByPeople.forEach((item) => {
      filteredArray.push(item.url);
    });
    res = res.filter((starItem) =>
      starItem.pilots.some((r) => filteredArray.includes(r))
    );
  }
  return res.sort((a, b) => a[filterBy] - b[filterBy]);
};
