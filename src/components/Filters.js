import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { addPeopleFilters, applyFilters } from "../redux/actions";
import RangeSlider from "./parts/RangeSlider";
import "../styles/_filters.scss";

function getAllStarwarsPeople({ props, handler }) {
  const { pilots, addPeopleFilters } = props;
  handler(true);
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
      handler(false);
      // if there's an error, log it
      console.log(error);
    });
}

function Filters(props) {
  const [pilots, setPilots] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { people, applyFiltersHandler, count } = props;
  useEffect(() => {
    setPilots(people);
  }, [people]);

  /**
   * Slider handler
   * @param event
   * @param newValue
   * @param handler
   * @param origValue
   * @returns {*}
   */
  const sliderChange = ({ event, newValue, handler, origValue }) => {
    if (event.type === "touchmove" || event.type === "mousemove") {
      return handler(newValue);
    } else {
      const {
        target: { value },
      } = event;
      if (value) {
        const number = Number.parseInt(value);
        if (newValue === "start") {
          return handler([number, origValue[1]]);
        }
        handler([origValue[0], number]);
      }
    }
  };
  // Crew
  const [sliderCrew, setCrewValue] = React.useState([5, 10000]);
  // Capacity
  const [sliderCapacity, setCapacityValue] = React.useState([5, 50000]);

  const loadMore = async () => {
    await getAllStarwarsPeople({ props, handler: setLoaded });
  };

  const handleChange = (event) => {
    const { name, checked } = event.target;
    const pilotState = [...pilots];
    const index = pilotState.findIndex((item) => item.name === name);
    pilotState[index].value = checked;
    setPilots(pilotState);
  };

  const onApplyFiltersHandler = () => {
    applyFiltersHandler({
      crew: sliderCrew,
      capacity: sliderCapacity,
      people: pilots,
    });
  };

  return (
    <div className="filters">
      <button
        onClick={onApplyFiltersHandler}
        type="button"
        className="filters-apply"
      >
        Filters apply ({count})
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
        {!loaded && (
          <div
            onClick={loadMore}
            disabled={loaded}
            className="filters-pilots-load-more"
          >
            View All
          </div>
        )}
      </div>
      <div className="filters-item">
        <div className="filters-item-title">Crew size</div>
        <div className="filters-inputs">
          <div className="filters-inputs-input">
            <input
              type="text"
              onChange={(e) =>
                sliderChange({
                  event: e,
                  newValue: "start",
                  handler: setCrewValue,
                  origValue: sliderCrew,
                })
              }
              value={sliderCrew[0]}
            />
          </div>
          <div className="filters-inputs-input">
            <input
              type="text"
              onChange={(e) =>
                sliderChange({
                  event: e,
                  newValue: "end",
                  handler: setCrewValue,
                  origValue: sliderCrew,
                })
              }
              value={sliderCrew[1]}
            />
          </div>
        </div>
        <div className="filters-slider">
          <RangeSlider
            value={sliderCrew}
            min={0}
            max={500000}
            handleChange={(event, newValue) =>
              sliderChange({
                origValue: sliderCrew,
                event,
                handler: setCrewValue,
                newValue: newValue,
              })
            }
          />
        </div>
      </div>
      <div className="filters-item">
        <div className="filters-item-title">Passengers capacity</div>
        <div className="filters-inputs">
          <div className="filters-inputs-input">
            <input
              type="text"
              onChange={(e) =>
                sliderChange({
                  event: e,
                  newValue: "start",
                  handler: setCapacityValue,
                  origValue: sliderCapacity,
                })
              }
              value={sliderCapacity[0]}
            />
          </div>
          <div className="filters-inputs-input">
            <input
              type="text"
              onChange={(e) =>
                sliderChange({
                  event: e,
                  handler: setCapacityValue,
                  newValue: "end",
                  origValue: sliderCapacity,
                })
              }
              value={sliderCapacity[1]}
            />
          </div>
        </div>
        <RangeSlider
          value={sliderCapacity}
          min={0}
          max={1000000000000}
          handleChange={(event, newValue) =>
            sliderChange({
              origValue: sliderCapacity,
              event,
              handler: setCapacityValue,
              newValue: newValue,
            })
          }
        />
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
    applyFiltersHandler: (data) => {
      dispatch(applyFilters(data));
    },
  };
};

export default connect(mapsStateToProps, mapDispatchToProps)(Filters);
