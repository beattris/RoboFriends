import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from '../components/Scroll';
import './App.css'
// import { robots } from "./robots";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  componentDidMount(){
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        return response.json();
      })
      .then(users => {
        this.setState({ robots: users})
      })
  }

  onSearchChange = (event) => {
    this.setState({
        searchfield : event.target.value
    })
  }

  render() {
    // USING DESTRUCTURING TO AVOID USING THIS.STATE REPEATEDLY
    const { robots, searchfield } = this.state;
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
            <SearchBox searchChange={this.onSearchChange} />
            <Scroll>
              <CardList robots={filteredRobots} />
            </Scroll>
          </div>
       );
  }
}

export default App;
