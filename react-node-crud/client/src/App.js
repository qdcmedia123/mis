import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Create from './components/layout/Create';
import Update from './components/layout/Update';
import Read from './components/layout/Read';
import Weather from './components/layout/Weather';


function App() {
  return (
     <Router>
    <div className="App">   
    
      <Route exact path="/" component={Read} />
      <Route exact path="/create" component={Create} />     	
      <Route exact path="/update/:id" component={Update} />

      <Route exact path="/weather" component={Weather} />
      
    </div>
    </ Router >
  );
}

export default App;
