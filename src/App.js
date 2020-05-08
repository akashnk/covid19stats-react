

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
  
} from "react-router-dom";

import Home from './Home/home';
import Faq from './faq';
import World from './World';
// import Statistics from './Statistics';
import Zones from './Zones';
import Layout from './Layout'

function App() {
  return (
    <Router>
     <Layout >
        <Switch>
          <Route path="/world">
            <World />
          </Route>
          <Route path="/faq">
            <Faq />
          </Route>
          {/* <Route path="/statistics">
            <Statistics />
          </Route> */}
          <Route path="/zones">
            <Zones />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}


export default App;

