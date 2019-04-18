import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/AddMovie.css';

class AddMovie extends Component {
   constructor(props) {
      super(props);
      this.state = {
         title: "",
         rating: "",
         director: "",
         actor: "",
         actors: [],
         createdAt: "",

         file_name: "",
         submit_message: "",
         add_movie_flag: false
      };

      /** this binding */
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.addActor = this.addActor.bind(this);
      this.removeActor = this.removeActor.bind(this);
      this.handleFiles = this.handleFiles.bind(this);

      this.checkActors = this.checkActors.bind(this);
      this.checkRating = this.checkRating.bind(this);
   }

   /** ------------------------------- */

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

      actors.pop()

      this.setState({actors: actors, actor: ""});
   }

   /** ------------------------------- */

   checkTitle( title ) {

      /**
       * return false if bad title, title must be:
       * - smaller than 50
       * - bigger than 3
       * - have only letters with spaces
       */
      return (50 > title.length && title.length > 3 && /^[a-zA-Z\s]+$/.test(title) );
   }

   checkActors( actors ) {
      /** I assume same rules for actors names like in title */
      console.log(actors);

      for (let i = 0; i < actors.length; i++) {
         if (!this.checkTitle(actors[i])) {
            console.log("checking actors");
            return false;
         }

      }

      return true;
   }


   checkRating( rating ) {
      /** rating must be:
       * - bigger than 0
       * - smaller than 5
       */
       return (typeof rating === "number" && 0 < rating && rating < 5);
   }

   /** ------------------------------- */

   createISODate() {
      let createdAt = new Date().toISOString();
      // remove Z from createdAt in extended UTC in ISO 8601 if this format still have it
      if (/Z/.test(createdAt) && createdAt.indexOf('Z') === createdAt.length - 1) { //test if contain Z
         createdAt = createdAt.substring(0, createdAt.length - 1); // chop last letter Z
      }
      // NOTE: if the norm changed still add creation date as UTC in ISO 8601 (?)
      return createdAt;
   }

   /** ------------------------------- */

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

   handleSubmit(e) {
      e.preventDefault();
      const file_name = this.state.file_name;
      const title = this.state.title;
      const rating = this.state.rating;
      const actors = this.state.actors;

      /** checking conditions with explicit conversion */

       if ( !(file_name + "").length) {
          /** if any field is empty */
          this.setState({
             add_movie_flag: false,
             submit_message: this.props.text.pls_load_file
          });

      } else if ( !(title + "").length || !this.checkTitle(title)) {
         /** if any field is empty */
         this.setState({
            add_movie_flag: false,
            submit_message: this.props.text.wrong_title
         });

      } else if (!(rating + "").length || !this.checkRating(+rating)) {
         /** if any field is empty */
         this.setState({
            add_movie_flag: false,
            submit_message: this.props.text.wrong_rating
         });

      } else if (!(actors + "").length || !this.checkActors(actors)) {
         /** if any field is empty */
         this.setState({
            add_movie_flag: false,
            submit_message: this.props.text.wrong_actor_name
         });

      } else {
         /** If all ok, setting paramiters or directly call CRUD action */
         /** add date of creation */

         this.setState({
            createdAt: this.createISODate(),
            add_movie_flag: true,
            submit_message: this.props.text.submit_message,
         });

      }
   }

   /** ------------------------------- */

   render() {

      return (
         <div className="App">
            <div className="App-header-buttons" >
               <button ><Link to="/">{this.props.text.go_back}</Link> </button>
            </div>
            <div className="sap-addmovie-wrapper">
               <div className="sap-addmovie-wrapper-form1">
                  <form>
                     <label className="sap-addmovie-inputfile-wrapper">

                        {this.props.text.load_file}

                        <input type="file" id="file" onChange={ (e) => this.handleFiles(e.target.files)} className="sap-addmovie-inputfile"></input>

                     </label>
                  </form>
               </div>

               {this.state.file_name ? <p>{this.state.file_name}</p> : "" }

               <div className="sap-addmovie-wrapper-form2">
                  <form onSubmit={this.handleSubmit} className="sap-addmovie-form">
                     <label>
                        {this.props.text.title}*

                        <br/>

                        <input name="title" type="text" value={this.state.title} onChange={this.handleChange} maxLength="50"/>
                     </label>

                     <br/>

                     <label>
                        {this.props.text.rating}*

                        <br/>

                        <input name="rating" type="text" value={this.state.rating} onChange={this.handleChange} maxLength="4"/>
                     </label>

                     <br/>

                     <label>
                        {this.props.text.actors}*

                        <br/>

                           <div className="sap-addmovie-actors-wrapper">
                              {this.state.actors ? this.state.actors.map( (actor, index) => {
                                 //? add special id for actors
                                 return <span className="sap-addmovie-actor" id={"sap-movie-actor-" + index} key={Math.random()}>{actor} / </span>;

                              }) : ""}
                           </div>

                        <input name="actor" type="text" value={this.state.actor} onChange={this.handleChange} maxLength="50"/>

                        <br/>

                        <div className="sap-addmovie-addactors-buttons">
                           <button onClick={this.addActor}> + </button>
                           <button onClick={this.removeActor}> - </button>
                        </div>
                     </label>



                     <br/>

                     <input type="submit" value="Submit"/>
                  </form>
               </div>

               <div className="sap-addmovie-message">
                  <p className={"sap-addmovie-message-" + this.state.add_movie_flag}>{this.state.submit_message}</p>
               </div>
            </div>
            <div className="App-footer-buttons">
               <Copyright />
            </div>
         </div>

      );
   }
}

const Copyright = function() {
   const date = new Date();

   return (<div className="App-copyright" id="copyright"> &#xA9; Konrad <span role="img" aria-label="Mushroom">🍄</span> {date.getFullYear()}</div>);
}

export default AddMovie;
