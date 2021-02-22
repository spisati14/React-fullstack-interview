import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import RobotList from './RobotList';
import CreateRobot from './CreateRobot';
import UpdateRobot from './UpdateRobot';
import ViewRobot from './ViewRobot';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Robot List</Link>
              </li>
              <li>
                <Link to="/create">Create Robot</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/create">
              <CreateRobot />
            </Route>
            <Route path="/update/:robotId">
              <UpdateRobot />
            </Route>
            <Route path="/view/:robotId">
              <ViewRobot />
            </Route>
            <Route path="/">
              <RobotList />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
