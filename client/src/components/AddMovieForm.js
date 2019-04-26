import  React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { checkState } from '../js/helperFunctions';



class AddMovieForm extends Component {

   constructor(props) {
      super(props);
      this.state = {
         title: "",
         rating: "",
         director: "",
         actor: "",
         actors: [],
         submit_message: "",
         add_movie_flag: false
      };

      /** this binding */
      this.handleChange = this.handleChange.bind(this);
      // this.handleSubmit = this.handleSubmit.bind(this);
      this.addActor = this.addActor.bind(this);
      this.removeActor = this.removeActor.bind(this);
   }

   handleChange(e) {
      const target = e.target;
      const value = target.value;
      const name = target.name;

      this.setState({[name]: value});
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
      const { title, director, rating, actor, actors, submit_message, add_movie_flag } = this.state;

      const { text, createMovieMutation } = this.props;
      const input = {
         title: title + "",
         director: director + "",
         rating: +rating,
         actors: actors
      };

      return(
         <Mutation mutation={createMovieMutation}>
            {(createMovie, {data}) => (
               <div>
               <form  className="sap-addmovie-form" onSubmit={e => {
                  e.preventDefault();

                  if(checkState(input)) {
                     // add movie
                     console.log("its ok!");
                     createMovie({ variables: input });

                  } else {
                     console.log("fail");
                     //display message
                     this.setState({
                        submit_message: text.submit_fail
                     });
                  }

               }}>
                  <label>
                     {text.title}*

                     <br/>

                     <input name="title" type="text" value={title} onChange={this.handleChange} maxLength="50"/>
                  </label>

                  <br/>

                  <label>
                     {text.director}*

                     <br/>

                     <input name="director" type="text" value={director} onChange={this.handleChange} maxLength="50"/>
                  </label>

                  <br/>

                  <label>
                     {text.rating}*

                     <br/>

                     <input name="rating" type="text" value={rating} onChange={this.handleChange} maxLength="4"/>
                  </label>

                  <br/>

                  <label>
                     {text.actors}*

                     <br/>

                        <div className="sap-addmovie-actors-wrapper">
                           {actors ? actors.map( (actor, index) => {
                              //? add special id for actors
                              return <span className="sap-addmovie-actor" id={"sap-movie-actor-" + index} key={Math.random()}>+ {actor} </span>;

                           }) : ""}
                        </div>

                     <input name="actor" type="text" value={actor} onChange={this.handleChange} maxLength="50"/>

                     <br/>

                     <div className="sap-addmovie-addactors-buttons">
                        <button onClick={this.addActor}> + </button>
                        <button onClick={this.removeActor}> - </button>
                     </div>
                  </label>



                  <br/>

                  <input type="submit" value="Submit"/>
               </form>
               <div className="sap-addmovie-message">
                  <p className={"sap-addmovie-message-" + add_movie_flag}>{submit_message}</p>
               </div>



               </div> )}
         </Mutation>

      );

   }
}


export default AddMovieForm;
