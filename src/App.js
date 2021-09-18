
import Map from './Map';
import React from 'react';
import './App.css';
import './index.css'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import BarChart from './components/barchart'
import LineChart from './components/LineChart'
import TreeMap from './components/TreeMap';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/Map' component={Map} />
          <Route path='/barchart' component={BarChart} />
          <Route path='/chart' component={LineChart} />
          <Route path='/treemap' component={TreeMap} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
