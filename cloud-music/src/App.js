import {Switch,Route,Redirect} from 'react-router-dom'
import './App.css';
import Index from './pages/index'
import Play from './pages/play'
import List from './pages/list'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/index" component={Index}></Route>
        <Route path="/play" component={Play}></Route>
        <Route path="/list" component={List}></Route>
        <Redirect to="/index"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
