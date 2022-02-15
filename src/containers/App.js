import React, { useEffect } from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from '../components/Scroll';
import ErrorBoundary from "../components/ErrorBoundary";
import './App.css'
// imports to use redux
import { requestRobots, setSearchField } from "../actions";

const mapStateToProps = state => {
  return{
    searchField : state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

const App = (props) => {

  // WHEN THE DETERMINANT OF useEffect IS [], IT ACTS AS COMPONENT 
  // DID MOUNT, IT RUNS ONLY ONCE
  useEffect(() => {
    const {onRequestRobots} = props;
    onRequestRobots()
  }, [])
  
  const { searchField, onSearchChange, robots, isPending } = props;

    // USING DESTRUCTURING TO AVOID USING THIS.STATE REPEATEDLY
    const filteredRobots = robots.filter((robot) => {
        return robot.name
          .toLowerCase()
          .includes(searchField.toLowerCase());
      });
      // USING TERNARY OPERATOR TO RETURN SEARCH RESULTS
      return isPending ?
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
