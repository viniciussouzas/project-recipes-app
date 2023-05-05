import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default Router;
