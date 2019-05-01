import  React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { checkAll } from '../js/helperFunctions';
import LabelActors from './LabelActors';
import { ADD_MOVIE } from '../graphql/mutations';

class AddMovieForm extends Component {

   constructor(props) {
      super(props);
      this.state = {
         file_name: "",
         title: "",
         rating: "",
         director: "",
         actor: "",
         actors: [],

         submit_message: this.props.text.submit_fail
      };

      /** this binding */
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.addActor = this.addActor.bind(this);
      this.removeActor = this.removeActor.bind(this);
   }

   handleChange(e) {
      const target = e.target;
      const value = target.value;
      const name = target.name;

      this.setState({[name]: value});
   }

   handleFiles(selectorFiles: FileList) {
      console.log(selectorFiles);

      // add the last choice
      this.setState({
         file_name: selectorFiles[0].name
      });
   }

   handleSubmit(createMovie) {
      return e => {
         e.preventDefault();

         const { title, director, rating, actor, actors, submit_message } = this.state;


         const { text } = this.props;
         const input = {
            title: title + "",
            director: director + "",
            rating: +rating,
            actors: actors
         };

         console.log(createMovie);

         if(checkAll(input)) {
            // add movie
            createMovie({ variables: input });
            console.log("its ok!");
         } else {
            console.log("fail");
            //display message
            this.setState({
               submit_message: text.submit_fail
            });
         } // else
      }
   }

   addActor(e) {
      e.preventDefault();
      // adding actor to actors
      let actors = [ ...this.state.actors ];

      if (!this.state.actor.length) {
         alert(this.props.text.any_name);
         return;
      }
      actors.push(this.state.actor);
      this.setState({actors: actors, actor: ""});
   }

   removeActor(e) {
      e.preventDefault();
      // removing last actor
      let actors = [...this.state.actors];

      if (!this.state.actors.length) {
         alert(this.props.text.nothing_to_remove);
         return;
      }

      actors.pop();
      this.setState({actors: actors, actor: ""});
   }


   render() {
      const { title, director, rating, actor, actors, submit_message } = this.state;

      const { text } = this.props;
      let input = {
         title: title + "",
         director: director + "",
         rating: +rating,
         actors: actors
      };


      return(
         <Mutation mutation={ADD_MOVIE} >
            {(createMovie, { data, loading, error }) => (
            <div>
               <form className="sap-addmovie-form"
                  onSubmit={(e) => {
                     e.preventDefault();
                     if(checkAll(input)) {
                        console.log("ok!");
                        createMovie({ variables: input });

                        this.setState({ submit_message: "" });
                     } else {

                        console.log("not ok");
                     }

                  }}>

                  <label className="sap-button"> {text.load_file} <br />
                     <input
                        type="file" id="sap-file" className="sap-addmovie-inputfile"
                        onChange={ (e) => this.handleFiles(e.target.files)} />
                  </label>

                  <p className="sap-addmovie-file_name">{this.state.file_name}</p>

                  <label> {text.title}* <br/>
                     <input name="title" type="text" value={title} onChange={this.handleChange} maxLength="50"/>
                  </label>

                  <br/>

                  <label> {text.director}* <br/>
                     <input name="director" type="text" value={director} onChange={this.handleChange} maxLength="50"/>
                  </label>

                  <br/>

                  <label> {text.rating}* <br/>
                     <input name="rating" type="text" value={rating} onChange={this.handleChange} maxLength="4"/>
                  </label>

                  <br/>

                  <LabelActors
                     text={text}
                     actor={actor}
                     actors={actors}
                     handlerAddActor={this.addActor}
                     handlerRemoveActor={this.removeActor}
                     handlerHandleChange={this.handleChange}/> <br/>

                  <input type="submit" value="Submit"/>
                  <p className="sap-addmovie-message-true">
                     {loading && text.loading}
                     {error && text.error}
                  </p>
               </form>

               <div className="sap-addmovie-message">
                  <p className="sap-addmovie-message-true">
                     {submit_message}
                  </p>
               </div>
            </div>
         )}
         </Mutation>
      );
   }
}




export default AddMovieForm;
