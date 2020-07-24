import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/_starship.scss";

function Starship({ item }) {
  const [state, setState] = useState({});
  const { name, MGLT, cost_in_credits, crew, passengers, url } = state;

  useEffect(() => {
    if (item) {
      setState(item);
    }
  }, [item]);

  if (!name) {
    return null;
  }
  const parts = url.split("/");
  const id = parts[parts.length - 2];
  return (
    <div className="starship col-50 col-d-33">
      <Link to={`/starship/${id}`}>
        <div className="starship-top">
          <div className="starship-small">
            <div className="title">EX</div>
            <div className="sub-title">MGLT-{MGLT}</div>
          </div>
        </div>
        <div className="starship-info">
          <p className="starship-info-p">{name}</p>

          <ul className="starship-info-list">
            <li className="starship-info-list-li">CR: {cost_in_credits}</li>
            <li className="starship-info-list-li">CREW: {crew}</li>
            <li className="starship-info-list-li">PSNGS: {passengers}</li>
          </ul>
        </div>
      </Link>
    </div>
  );
}
Starship.displayName = "MainPage";
export default Starship;
