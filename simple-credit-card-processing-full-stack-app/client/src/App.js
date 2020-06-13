import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Create from './components/layout/Create';


function App() {
  return (
     <Router>
	    <div className="App">    
	      <Route exact path="/" component={Create} />     
	    </div>
    </ Router >
  );
}

export default App;
