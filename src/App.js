import { Switch, Route } from 'react-router-dom'
import LoginAndRegister from './components/LoginAndRegister'
import Basic from './components/Demo/Basic';

function App() {
  return (
      <>
        <Switch>
          <Route component={LoginAndRegister} path='/login'/>
          <Route component={Basic} path='/' />
        </Switch>
      </>
  );
}

export default App;
