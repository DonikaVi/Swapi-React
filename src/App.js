import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Store from '../src/redux/Store';
import MainPage from "./components/MainPage";
import StarshipPage from "./components/Pages/StarshipPage";
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <Router>
          <Switch>
            <Route path="/starship/:id" children={<StarshipPage />} />
            <Route path="/">
              <MainPage />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
