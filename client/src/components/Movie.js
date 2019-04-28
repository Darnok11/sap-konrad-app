import React from 'react';
import AddReview from './AddReview';
import '../css/Movie.css';
import { DELETE_MOVIE_MUTATION, UPDATE_MOVIE_MUTATION } from '../graphql/mutations';
import { REVIEW_QUERY } from '../graphql/queries';


class Movie extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         show_review: [false, ""],
         add_review: [false, this.props.text.add_review]
      };


      // binding
      this.handleChangeReview = this.handleChangeReview.bind(this);
      this.handleChangeAddReview = this.handleChangeAddReview.bind(this);
      this.handleChangeDeleteMovie = this.handleChangeDeleteMovie.bind(this);
   }


   handleChangeAddReview(e) {
      e.preventDefault();

      if (!this.state.add_review[0]) {

         this.setState({ add_review: [true, this.props.text.cancel ] });
      } else {
         this.setState({ add_review: [false, this.props.text.add_review ] });
      }
   }

   handleChangeReview(e) {
      // on click open review description
      e.preventDefault();
      let review = "";

      if (!this.state.show_review[0]) {
         review = this.findReview(this.props.movie.id);
         this.setState({ show_review: [true, review ] });
      } else {
         this.setState({ show_review: [false, "" ] });
      }

   }

   handleChangeDeleteMovie(e) {
      e.preventDefault();

      // send DELETE request
      console.log("delete this movie \n  ", this);
   }

   render() {
      const { text, movie, last } = this.props;
      let _createdAt = movie.createdAt.replace('T', ' ');


      const len = movie.actors.length;
      let review_text = text.see_review;
      if (this.state.show_review[0]) {
         review_text = text.hide_review;
      }
      return <div className={this.last ? "sap-movie last-movie" : "sap-movie"}>

         <div className="sap-movie-list" >
            <ul>
               <li><span className="sap-movie-list-number bold"> {movie.rating} </span></li>

               <li><span className="bold">{text.title}:</span> {movie.title} </li>

               <li><span className="bold">{text.director}:</span> {movie.director} </li>

               <li><span className="bold">{text.actors}:</span>
               {movie.actors.map( (actor, index) =>

                  <span className="sap-movie-actor" key={index}> { index + 1 === len ? actor : actor + "," }</span>

               )}
               </li>

               <li><span className="bold">{text.created_at}:</span> {_createdAt}</li>

               <li className="sap-movie-review">{this.state.show_review[1]}</li>

               <li><span className="sap-movie-review-button" onClick={this.handleChangeReview.bind(this)}> {review_text} </span></li>
            </ul>

            { this.state.add_review[0] && <AddReview /> }

         </div>

         <div className="sap-movie-buttons">
            <button onClick={this.handleChangeAddReview}> {this.state.add_review[1]} </button>

            <button onClick={this.handleChangeDeleteMovie}> {text.delete} </button>
         </div>

      </div>;
   }
}

export default Movie;
