import React from 'react';
import {Route, Switch, useHistory} from "react-router-dom";
import {BaseLayout} from './layouts';
import {Home, MovieDetails} from './pages';
import './App.css';
import {MovieSearch} from "./pages/movie-search/MovieSearch";


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

            <Route path='/search/movie' exact>
                <MovieSearch/>
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
