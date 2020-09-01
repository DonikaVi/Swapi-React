import React, { useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';
import { useParams } from 'react-router-dom';
import Wrapper from '../layouts/Wrapper';
import '../../styles/_starshipPage.scss';
import Starship from '../Starship';

const apiUrl = 'https://swapi.dev/api';
function StarshipPage() {
  const [state, setState] = useState({});
  const {
    name,
    cost_in_credits,
    crew,
    passengers,
    url,
    cargo_capacity,
    consumables,
    films,
  } = state;

  const DescItem = ({ title, value }) => (
    <div className="starship-desc-item col-50 col-d-33">
      <div className="starship-desc-item-wrap">
        <div className="starship-desc-item-title">{title}</div>
        <div className="starship-desc-item-value">{value}</div>
      </div>
    </div>
  );
  const { id } = useParams();

  const copyUlr = () => {
    copy(url);
  };

  useEffect(() => {
    fetch(`${apiUrl}/starships/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setState(data);
      });
  }, [id]);
  if (!name) {
    return null;
  }
  return (
    <Wrapper headerClass="starship-header starship-page" headerText={name}>
      <Starship item={state} />
      <p onClick={copyUlr} className="copy-url">
        COPY API URL
      </p>
      <div className="row">
        <DescItem value={cost_in_credits} title="Cost in Credits" />
        <DescItem value={crew} title="Crew" />
        <DescItem value={passengers} title="Passengers" />
        <DescItem value={cargo_capacity} title="Cargo Capacity" />
        <DescItem value={consumables} title="Consumables" />
        <DescItem value={films.length} title="Films Counter" />
      </div>
    </Wrapper>
  );
}

export default StarshipPage;
