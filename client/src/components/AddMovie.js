import React, { Component } from 'react';
import AddMovieForm from './AddMovieForm';
import { Link } from 'react-router-dom';
import Copyright from './Copyright';
import '../css/AddMovie.css';

import { graphql, compose } from 'react-apollo';
import { createMovieMutation } from '../graphql/mutations';


class AddMovie extends Component {
   constructor(props) {
      super(props);
      this.state = {
         title: "",
         rating: "",
         director: "",
         actor: "",
         actors: [],

         file_name: "",
         submit_message: "",
         add_movie_flag: false
      };

      /** this binding */
      this.handleChange = this.handleChange.bind(this);
      this.handleFiles = this.handleFiles.bind(this);
   }


   handleFiles(selectorFiles: FileList) {
      console.log(selectorFiles);

      // add the last choice
      this.setState({
         file_name: selectorFiles[0].name
      });
   }

   handleChange(e) {
      const target = e.target;
      const value = target.value;
      const name = target.name;

      this.setState({[name]: value});
      // NOTE: computed property name: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
   }

   render() {
      const { file_name } = this.state;
      const { text } = this.props;

      return (
         <div className="App">
            <div className="App-header-buttons" >
               <button ><Link to="/">{text.go_back}</Link> </button>
            </div>
            <div className="sap-addmovie-wrapper">
               <div className="sap-addmovie-wrapper-form1">
                  <form>
                     <label className="sap-addmovie-inputfile-wrapper">

                        {text.load_file}

                        <input type="file" id="file" onChange={ (e) => this.handleFiles(e.target.files)} className="sap-addmovie-inputfile"></input>

                     </label>
                  </form>
               </div>

               {file_name ? <p>{file_name}</p> : "" }

               <div className="sap-addmovie-wrapper-form2">
                  <AddMovieForm createMovieMutation={createMovieMutation} text={text}  />
               </div>
            </div>
            <div className="App-footer-buttons">
               <Copyright />
            </div>
         </div>

      );
   }
}


/**
 * binding graphql mutations. After you can access mutation with this.props.name
 */
export default compose(
   graphql(createMovieMutation, { name: "createMovieMutation"})
)(AddMovie);
