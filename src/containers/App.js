import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from '../components/Scroll';
import ErrorBoundary from "../components/ErrorBoundary";
import './App.css'
// import { robots } from "./robots";

const App = () => {
  const [searchfield, setSearchfield] = useState('');
  const [robots, setRobots] = useState([]);

  // componentDidMount(){
  //     fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(users => {
  //       this.setState({ robots: users})
  //     })
  // }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
     .then(response => response.json())
     .then(users => {setRobots(users)})
  })
  

  const onSearchChange = (event) => {
    setSearchfield(event.target.value)
  }
    // USING DESTRUCTURING TO AVOID USING THIS.STATE REPEATEDLY
    const filteredRobots = robots.filter((robot) => {
        return robot.name
          .toLowerCase()
          .includes(searchfield.toLowerCase());
      });
      // USING TERNARY OPERATOR TO RETURN SEARCH RESULTS
      return !robots.length ?
        <h1>Loading...</h1> :
         (
          <div className="tc">
            <h1 className="f1">RoboFriends</h1>
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
              <ErrorBoundary>
               <CardList robots={filteredRobots} />
              </ErrorBoundary>
            </Scroll>
          </div>
       );
}

export default App;
