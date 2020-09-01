import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../styles/_mainPage.scss';
import filterIcoShow from '../styles/images/filter.svg';
import filterClose from '../styles/images/close.svg';
import Dropdown from './Dropdown';
import Starship from './Starship';
import Filters from './Filters';
import Wrapper from './layouts/Wrapper';
import useWindowDimensions from '../hooks/useWindowDimensions';
import {
  getPilots,
  getStarships,
  addStarships,
  addPeopleFilters,
  changeFilterBy,
} from '../redux/actions';
import filterShips from '../Utils';

const apiUrl = 'https://swapi.dev/api';

function MainPage(props) {
  const { width } = useWindowDimensions();
  const [showFilter, setShowFilter] = useState(width >= 1920);
  const [loading, setLoading] = useState(false);
  const filterIco = showFilter ? filterClose : filterIcoShow;
  const {
    starships: { results, next },
    filterBy,
    dispatchChangeFilterBy,
  } = props;

  const loadMore = () => {
    setLoading(true);
    fetch(next)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        props.dispatchAddStarships(data);
      });
  };

  useEffect(() => {
    Promise.all([fetch(`${apiUrl}/people/`), fetch(`${apiUrl}/starships/`)])
      .then(([pilots, starships]) =>
        Promise.all([pilots.json(), starships.json()])).then(([people, starshipsData]) => {
        props.dispatchGetPilots(people);
        props.dispatchAddPeopleFilters(people);
        props.dispatchGetStarships(starshipsData);
      });
  }, []);

  useEffect(() => {
    setShowFilter(width >= 1025);
  }, [width]);

  const viewMore = () => (
      <button
        role="button"
        disabled={loading}
        onClick={loadMore}
        type="button"
        className="view-more"
      >
        <div>View More</div>
        <div
          className={`view-more-ico ${loading ? 'view-more-ico-loading' : ''}`}
        />
      </button>
  );

  const count = filterShips({ props, results });
  return (
    <Wrapper headerText={'MAY THE FORCE BE WITH YOU'} headerClass={' '}>
      <div className="main-page">
        <h1 className="main-page-header">Our Starships</h1>
        <div className="main-page-filters">
          <div className="main-page-dropdown">
            <Dropdown
              filterBy={filterBy}
              changeFilterBy={dispatchChangeFilterBy}
            />
          </div>
          <div
            onClick={() => setShowFilter(!showFilter)}
            className="main-page-filter-ico"
          >
            <img src={filterIco} alt="Filter" />
          </div>
        </div>
        <div className="row">
          <div className="col-d-30">
            {showFilter && <Filters count={count.length} />}
          </div>
          <div className="col-d-70 col-t-100">
            <div className="row">
              {filterShips({ props, results }).map((item) => (
                <Starship key={item.name} item={item} />
              ))}
            </div>
          </div>
        </div>

        {next && viewMore()}
      </div>
    </Wrapper>
  );
}
MainPage.displayName = 'MainPage';

const mapsStateToProps = (state) => {
  return {
    starships: state.items.starships,
    filterBy: state.filters.filterBy,
    crew: state.filters.crew,
    capacity: state.filters.capacity,
    people: state.filters.people,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetPilots: (data) => {
      dispatch(getPilots(data));
    },
    dispatchGetStarships: (data) => {
      dispatch(getStarships(data));
    },
    dispatchAddStarships: (data) => {
      dispatch(addStarships(data));
    },
    dispatchAddPeopleFilters: (data) => {
      dispatch(addPeopleFilters(data));
    },
    dispatchChangeFilterBy: (data) => {
      dispatch(changeFilterBy(data));
    },
  };
};

export default connect(mapsStateToProps, mapDispatchToProps)(MainPage);
