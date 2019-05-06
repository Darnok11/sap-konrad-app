import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddMovieForm from './AddMovieForm';
import '../css/AddMovie.css';

class AddMovie extends Component {

   render() {
      const { text } = this.props;

      return (
         <div>
            <div className="App-header-buttons">
               <Link to="/" className='sap-button'>{text.go_back}</Link>
            </div>

            <div className="sap-addmovie-wrapper">
               <AddMovieForm text={text}  />
            </div>

         </div>

      );
   }
}


export default AddMovie;
