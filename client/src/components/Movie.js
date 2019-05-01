import React from 'react';
import MovieReview from './MovieReview';
import '../css/Movie.css';


class Movie extends React.Component {
   constructor(props) {
      super(props);

      this.state = { show_review: false };
      this.handleShowReview = this.handleShowReview.bind(this);
   }

   handleShowReview() {
      this.setState({
         show_review: !this.state.show_review,
      });
   }

   handleChangeDeleteMovie(e) {
      e.preventDefault();

      // send DELETE request
      console.log("delete this movie \n  ", this);
   }

   render() {
      const { text, movie, last } = this.props;

      return (
         <div className={last ? "sap-movie last-movie" : "sap-movie"}>
            <div className="sap-movie-list">
               <ul>
                  <li><span className="sap-movie-list-number bold"> {movie.rating}</span></li>
                  <li><span className="bold">{text.title}:</span>
                     {movie.title}
                  </li>
                  <li><span className="bold">{text.director}:</span>
                     {movie.director}
                  </li>
                  <li><span className="bold">{text.actors}:</span>

                     <MovieListActors actors={movie.actors} />

                  </li>
                  <li><span className="bold">{text.created_at}:</span>
                     {movie.createdAt.replace('T', ' ')}
                  </li>
                  <li className="sap-movie-review-form">
                     <button onClick={this.handleShowReview}>{text.show_hide_review}</button>

                     { this.state.show_review && <MovieReview review={movie.review} id={movie.id} /> }

                  </li>
                  <li className="sap-movie-buttons">
                     <button onClick={this.handleChangeDeleteMovie}> {text.delete} </button>
                  </li>
               </ul>
            </div>
         </div>);
   }

}



const MovieListActors = ( props ) => {
   return (
      <div>
         {props.actors.map( (actor, index) =>
            <span className="sap-movie-actor" key={"actor-" + index}>
               { index + 1 === props.actors.length ? actor : actor + "," }
            </span>
         )}
      </div>
   );
}



export default Movie;
