/* created with create-react-app */

import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import { reviews, movies, text_en } from './resources/data';

// redux
// import { Provider } from 'react-redux'; //make redux store avaible to every component that have been passed as argument to connect() fn. It 'provides' the store into the <App /> . Can't use any component that have been included in connect and is not a child of <Provider />. Moreover Provider must have single store given as props:
// import store from './redux/store';

const quantity = movies.length; //should be taken from API
const on_page = 3;
const pages = Math.ceil(quantity / 3);
const root = document.getElementById('root');

// here never alow to pass undefined values to app
ReactDOM.render(
   <App quantity={quantity} on_page={on_page} pages={pages} movies={movies} text={text_en} reviews={reviews}/>,
   root
);
