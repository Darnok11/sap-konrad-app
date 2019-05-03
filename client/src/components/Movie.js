import React from 'react';
import MovieReview from './MovieReview';
import DeleteMovie from './DeleteMovie';
import MovieListActors from './MovieListActors';
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
                  <li><span className="sap-movie-list-number bold"> {movie.rating || text.not_given}</span></li>
                  <li><span className="bold">{text.title + ": "}</span>
                     {movie.title || text.not_given}
                  </li>
                  <li><span className="bold">{text.director + ": "}</span>
                     {movie.director || text.not_given }
                  </li>
                  <li><span className="bold">{text.actors + ": "}</span>
                     {movie.actors ? <MovieListActors actors={movie.actors} /> : text.not_given}
                  </li>
                  <li><span className="bold">{text.created_at + ": "}</span>
                     {movie.createdAt.replace('T', ' ') || text.not_given}
                  </li>
                  <li className="sap-movie-review-form">
                     <button onClick={this.handleShowReview}>{text.show_hide_review}</button>

                     { this.state.show_review &&

                        <MovieReview movie={movie} text={text} />

                     }

                  </li>
                  <li className="sap-movie-buttons">

                     <DeleteMovie movie_to_remove={movie.id} text={text} />

                  </li>
               </ul>
            </div>
         </div>);
   }

}



export default Movie;
