import React, { useEffect } from "react";
import { connect } from "react-redux";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Slider from "@material-ui/core/Slider";
import "../styles/_filters.scss";
import { addPeopleFilters, applyFilters } from "../redux/actions";

function getAllStarwarsPeople({ pilots, addPeopleFilters, count }) {
  const numberOfPagesLeft = Math.ceil((pilots.count - 1) / 10);
  let promises = [];
  let people = [];
  for (let i = 1; i <= numberOfPagesLeft; i++) {
    promises.push(fetch(`https://swapi.dev/api/people?page=${i}`));
  }
  Promise.all(promises)
    .then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(
        responses.map(function (response) {
          return response.json();
        })
      );
    })
    .then(function (response) {
      // Log the data to the console
      // You would do something with both sets of data here
      people = response.reduce(
        (acc, data) => [...acc, ...data.results],
        people
      );
      addPeopleFilters({ results: people });
      return people;
    })
    .catch(function (error) {
      // if there's an error, log it
      console.log(error);
    });
}

function Filters(props) {
  const [pilots, setPilots] = React.useState([]);
  const { people } = props;
  useEffect(() => {
    setPilots(people);
  }, [people]);

  /**
   * Crew slider
   */

  const [sliderCrew, setCrewValue] = React.useState([5, 100000]);

  const sliderCrewChange = (event, newValue) => {
    if (event.type === "touchmove" || event.type === "mousemove") {
      return setCrewValue(newValue);
    } else {
      const {
        target: { value },
      } = event;
      if (value) {
        const number = Number.parseInt(value);
        if (newValue === "start") {
          return setCrewValue([number, sliderCrew[1]]);
        }
        setCrewValue([sliderCrew[0], number]);
      }
    }
  };

  /**
   * Capacity slider
   */
  const [sliderCapacity, setCapacityValue] = React.useState([5, 500000]);

  const sliderCapacityChange = (event, newValue) => {
    if (event.type === "touchmove" || event.type === "mousemove") {
      return setCapacityValue(newValue);
    } else {
      const {
        target: { value },
      } = event;

      if (value) {
        const number = Number.parseInt(value);
        if (newValue === "start") {
          return setCapacityValue([number, sliderCapacity[1]]);
        }
        setCapacityValue([sliderCapacity[0], number]);
      }
    }
  };

  const loadMore = async () => {
    await getAllStarwarsPeople(props);
  };

  const handleChange = (event) => {
    const { name, checked } = event.target;
    const pilotState = [...pilots];
    const index = pilotState.findIndex((item) => item.name === name);
    pilotState[index].value = checked;
    setPilots(pilotState);
  };

  const applyFilters = () => {
    props.applyFilters({
      crew: sliderCrew,
      capacity: sliderCapacity,
      people: pilots,
    });
  };

  return (
    <div className="filters">
      <button onClick={applyFilters} type="button" className="filters-apply">
        Filters apply ({props.count})
      </button>
      <div className="filters-pilots">
        <div className="filters-pilots-info">
          <div className="filters-pilots-title">Pilots</div>
          <div className="filters-pilots-count">({pilots.length})</div>
        </div>
        <FormGroup>
          {pilots.map((item) => {
            return (
              <FormControlLabel
                key={item.name}
                control={
                  <Checkbox
                    checked={item.value}
                    onChange={handleChange}
                    name={item.name}
                    color="primary"
                  />
                }
                label={item.name}
              />
            );
          })}
        </FormGroup>
        <div onClick={loadMore} className="filters-pilots-load-more">
          View All
        </div>
      </div>
      <div className="filters-item">
        <div className="filters-item-title">Crew size</div>
        <div className="filters-inputs">
          <div className="filters-inputs-input">
            <input
              type="text"
              onChange={(e) => sliderCrewChange(e, "start")}
              value={sliderCrew[0]}
            />
          </div>
          <div className="filters-inputs-input">
            <input
              type="text"
              onChange={(e) => sliderCrewChange(e, "end")}
              value={sliderCrew[1]}
            />
          </div>
        </div>
        <div className="filters-slider">
          <Slider
            min={0}
            max={500000}
            value={sliderCrew}
            onChange={sliderCrewChange}
            valueLabelDisplay="auto"
          />
        </div>
      </div>
      <div className="filters-item">
        <div className="filters-item-title">Passengers capacity</div>
        <div className="filters-inputs">
          <div className="filters-inputs-input">
            <input
              type="text"
              onChange={(e) => sliderCapacityChange(e, "start")}
              value={sliderCapacity[0]}
            />
          </div>
          <div className="filters-inputs-input">
            <input
              type="text"
              onChange={(e) => sliderCapacityChange(e, "end")}
              value={sliderCapacity[1]}
            />
          </div>
        </div>
        <div className="filters-slider">
          <Slider
            min={0}
            max={1000000000000}
            value={sliderCapacity}
            onChange={sliderCapacityChange}
            valueLabelDisplay="auto"
          />
        </div>
      </div>
    </div>
  );
}
Filters.displayName = "Filters";
const mapsStateToProps = (state) => {
  return {
    people: state.filters.people,
    pilots: state.items.pilots,
    starships: state.items.starships,
    crew: state.filters.crew,
    capacity: state.filters.capacity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPeopleFilters: (data) => {
      dispatch(addPeopleFilters(data));
    },
    applyFilters: (data) => {
      dispatch(applyFilters(data));
    },
  };
};

export default connect(mapsStateToProps, mapDispatchToProps)(Filters);
