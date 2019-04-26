import React, {Component} from 'react';
// import components
import '../css/App.css';
import Movie from './Movie';
import Copyright from './Copyright';

import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';


class App extends Component {
   constructor(props) {
      super(props);
      const { count, on_page } = this.props;

      this.state = {
         page: 1,
         pages: Math.ceil( count / on_page),
         add_movie: false
      };

      // binding this
      this.loadMovies = this.loadMovies.bind(this);
      this.loadPrev = this.loadPrev.bind(this);
      this.loadNext = this.loadNext.bind(this);
      this.addMovie = this.addMovie.bind(this);
   }


   getList(e) {
      e.preventDefault();
      console.log("send proper header action in API");
   }

   addMovie(e) {
      e.preventDefault();
      // if cancel do not show movie
      if (!this.state.add_movie) {

         this.setState({ add_movie: true });
      } else {
         this.setState({ add_movie: false });
      }

   }

   loadNext(e) {
      e.preventDefault();

      if (this.state.page < this.state.pages) {
         this.setState({ page: this.state.page + 1 });
      } else { alert( this.props.text.next_alert ); }
   }

   loadPrev(e) {
      e.preventDefault();
      //decrease page and load previous movies from API

      if (this.state.page > 1) {
         this.setState({ page: this.state.page - 1 });
      } else { alert( this.props.text.prev_alert ); }
   }


   loadMovies() {
      const { text, count } = this.props;
      const on_page = 3;
      const pages = Math.ceil(count / on_page);
      const page = this.state.page;

      // if there are no movies
      if (!count) {
         return <p>{text.no_movies}</p>;
      }

      let first = (page - 1) * on_page;
      let last = (page === pages) ? count : first + on_page;

      const moviesQuery = gql`
         query($start: Int!, $end: Int!){
            movies(start: $start, end: $end) {
               title
               director
               rating
               actors
               createdAt
            }
         }
      `

      return <Query query={moviesQuery} variables={{start: first, end: last}}>
       {({ data, loading, error }) => {
         if (loading) return <p>{text.loading}</p>;
         if (error) return <p>{error.message}</p>;

         return <div>
              {data.movies.map( (movie, index) =>
                 <Movie
                 key={Math.random()}
                 movie={movie}
                 last={index + 1 === last - first}
                 text={this.props.text} />
              )}
           </div>;


       }}
      </Query>
   }

   render() {
      const { text } = this.props;

      return <div className="App">

         <div className="App-header-buttons" >
            <button onClick={this.getList}> {text.get_list} </button>

             <span role="img" aria-label="Movie Camera">🎥</span>

            <button > <Link to="./addmovie">{text.add_movie}</Link> </button>
         </div>
         <div className="App-header-space"></div>

            {  this.loadMovies()}

         <div className="App-footer-space"></div>
         <div className="App-footer-buttons">
            <button onClick={this.loadPrev}> {text.prev} </button>

               <span> {this.state.page}..{this.state.pages} </span>

            <button onClick={this.loadNext}> {text.next} </button>

            <Copyright />

         </div>

      </div>;
   }
}

/**
 * inject queries as props to this component
 */
// export default compose(
//    graphql(moviesQuery, {name: "moviesQuery"}),
// )(App);


export default App;
