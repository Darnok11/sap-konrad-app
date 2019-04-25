/* created with create-react-app */
import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import AddMovie from './components/AddMovie';
import Notfound from './components/Notfound';

/** local data */
import { reviews, movies } from './resources/data';
import { text_en } from './resources/text_en';


/** ract-router */
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

// redux
// import { Provider } from 'react-redux'; //make redux store avaible to every component that have been passed as argument to connect() fn. It 'provides' the store into the <App /> . Can't use any component that have been included in connect and is not a child of <Provider />. Moreover Provider must have single store given as props:
// import store from './redux/store';

const quantity = movies.length; //should be taken from API
const on_page = 3;
const pages = Math.ceil(quantity / 3);
const root = document.getElementById('root');

/** Switch component helps us to render the components only when path matches otherwise it fallbacks to the not found component. */
const routing = (
   <Router>
      <div>
         <Switch>
            <Route exact path="/" render={ (props) =>
                  <App {...props}
                     quantity={quantity}
                     on_page={on_page}
                     pages={pages}
                     movies={movies}
                     text={text_en}
                     reviews={reviews} />
               } />

               <Route path="/addmovie" render={ () => <AddMovie text={text_en}  /> } />
               <Route render={ () => <Notfound text={text_en} /> } />
         </Switch>
      </div>
   </Router>
);
// here never alow to pass undefined values to app
ReactDOM.render( routing, root );
