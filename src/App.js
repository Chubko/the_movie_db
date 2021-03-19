import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import { BaseLayout } from './layouts';
import { Home, MovieDetails } from './pages';
import './App.css';



function App() {
const history = useHistory();

  return (
    <BaseLayout>
        <Switch>
            <Route path='/' exact>
                <Home/>
            </Route>

            <Route path='/movie/:id'>
                <MovieDetails/>
            </Route>

            <Route>
                <h1>PAGE NOT FOUND
                    <button onClick={() => history.push('/')}>go home</button>
                </h1>
            </Route>
        </Switch>

    </BaseLayout>
  );
}

export default App;
