import React, {Component} from 'react';
import AddReview from './AddReview';
import '../css/Movie.css';
import { graphql, compose } from 'react-apollo';
import { deleteMovieMutation, updateReviewMutation } from '../graphql/mutations';
import { reviewQuery } from '../graphql/queries';


class Movie extends Component {

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

   checkDate(createdAt = this.props.text.not_given) {
      // NOTE: It is not recommended to use Date.parse as until ES5, parsing of strings was entirely implementation dependent ... therefore date strings should be manually parsed (or we can use i.e Moment.js library)
      // check date pattern with regex reg:

      const reg = /^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[0-5][0-9]):(0[0-9]|[0-5][0-9]).(\d\d\d)/;

      //As a general rule, if your regular expression will remain constant, i.e. your expression will not be changing, it is best to use a regex literal.
      if (createdAt !== this.props.text.not_given && !reg.test(createdAt)) {
         return <span className="sap-movie-error">{this.props.text.wrong_format}</span>;
      }
      // TODO: remove zero if on the beginning?

      return createdAt.replace('T', " ");
   }

   checkRating(rating) {
      //res = "not given" if NaN after conversion to number (+rating)
      let res = Number(Math.round( +rating + 'e2') + 'e-2') || "not given";
      if (5 < res || res < 0 ) {
         return <span className="sap-movie-error">{this.props.text.out_of_range}</span>;
      }

      return res;
   }

   checkTitle(title = this.props.text.not_given) {
      // "Title must have at least 3 characters up to 50 and can contain only letters"
      const reg = /^[a-zA-Z\s]+$/; //check only letters with spaces
      if (50 < title.length || title.length < 3 || !reg.test(title)) {
         return <span className="sap-movie-error">{this.props.text.wrong_title}</span>;
      }
      return '"' + title + '"';
   }

   findReview(id) {
      // Search for review and return string
      for (let i = 0; i < this.props.reviews.length; i++) {
         if (id === this.props.reviews[i].id) {
            return this.props.reviews[i].review;
         }

      }
      return this.props.text.no_review;
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
      //checking data
      const title = this.checkTitle(this.props.movie.title);
      const rating = this.checkRating(this.props.movie.rating);
      const createdAt = this.checkDate(this.props.movie.createdAt);
      const len = this.props.movie.actors.length;
      let review_text = this.props.text.see_review;
      if (this.state.show_review[0]) {
         review_text = this.props.text.hide_review;
      }
      return <div className={this.props.last ? "sap-movie last-movie" : "sap-movie"}>

         <div className="sap-movie-list" >
            <ul>
               <li><span className="sap-movie-list-number bold"> {rating} </span></li>

               <li><span className="bold">{this.props.text.title}:</span> {title} </li>

               <li><span className="bold">{this.props.text.director}:</span> {this.props.movie.director} </li>

               <li><span className="bold">{this.props.text.actors}:</span>
               {this.props.movie.actors.map( (actor, index) =>

                  <span className="sap-movie-actor" key={index}> { index + 1 === len ? actor : actor + "," }</span>

               )}
               </li>

               <li><span className="bold">{this.props.text.created_at}:</span> {createdAt}</li>

               <li className="sap-movie-review">{this.state.show_review[1]}</li>

               <li><span className="sap-movie-review-button" onClick={this.handleChangeReview.bind(this)}> {review_text} </span></li>
            </ul>

            { this.state.add_review[0] && <AddReview /> }

         </div>

         <div className="sap-movie-buttons">
            <button onClick={this.handleChangeAddReview}> {this.state.add_review[1]} </button>

            <button onClick={this.handleChangeDeleteMovie}> {this.props.text.delete} </button>
         </div>

      </div>;
   }
}

export default compose(
   graphql(deleteMovieMutation, {name: 'deleteMovieMutation'}),
   graphql(updateReviewMutation, {name: 'updateReviewMutation'}),
   graphql(reviewQuery, {name: 'reviewQuery'}),
)(Movie);
