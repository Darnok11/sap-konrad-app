import React, { Component } from 'react';
import AddMovieForm from './AddMovieForm';
import { Link } from 'react-router-dom';
import Copyright from './Copyright';
import '../css/AddMovie.css';

import { graphql, compose } from 'react-apollo';
import { ADD_MOVIE } from '../graphql/mutations';


class AddMovie extends Component {

   render() {
      const { text } = this.props;

      return (
         <div className="App">
            <div className="App-header-buttons">
               <button ><Link to="/">{text.go_back}</Link> </button>
            </div>

            <div className="sap-addmovie-wrapper">
               <AddMovieForm ADD_MOVIE={ADD_MOVIE} text={text}  />
            </div>

            <div className="App-footer-buttons">
               <Copyright />
            </div>
         </div>

      );
   }
}


/**
 * binding graphql mutations. After binding you can access mutation with this.props.name
 */
export default compose(
   graphql(ADD_MOVIE, { name: "ADD_MOVIE"})
)(AddMovie);
