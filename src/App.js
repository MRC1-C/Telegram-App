import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home';
import LoginAndRegister from './components/LoginAndRegister'
import CreateTeam from './components/Modal/CreateTeam';
function App() {
  return (
    <Router>
        <Switch>
          <Route component={LoginAndRegister} path='/login'/>
          <Route component={Home} path='/' />
        </Switch>
        <CreateTeam />
    </Router>
  );
}

export default App;
