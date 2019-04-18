import React, {Component} from 'react';
import '../css/App.css';
import Movie from './Movie';
import { Link } from 'react-router-dom';



class App extends Component {
   constructor(props) {
      super(props);

      this.state = {
         page: 1,
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

      if (this.state.page < this.props.pages) {
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
      const quantity = this.props.quantity || 0;
      const pages = this.props.pages || 0;
      const on_page = this.props.on_page || 3;

      // if there are no movies
      if (!quantity) {
         return <p>{this.props.text.no_movies}</p>;
      }
      const page = this.state.page;

      let first = (page - 1) * on_page;
      // if last page than last is simply number of movies
      let last = (page === pages) ? quantity : first + on_page;
      // get movies out of all movies to load on page
      let page_movies = this.props.movies.slice(first, last);

      return page_movies.map( (movie, index) =>
         <Movie key={Math.random()} movie={movie} last={index + 1 === last - first} text={this.props.text} reviews={this.props.reviews}/>
      );

   }

   render() {

      return <div className="App">

         <div className="App-header-buttons" >
            <button onClick={this.getList}> {this.props.text.get_list} </button>

             <span role="img" aria-label="Movie Camera">🎥</span>

            <button > <Link to="./addmovie">{this.props.text.add_movie}</Link> </button>
         </div>
         <div className="App-header-space"></div>

            {  this.loadMovies()}

         <div className="App-footer-space"></div>
         <div className="App-footer-buttons">
            <button onClick={this.loadPrev}> {this.props.text.prev} </button>

               <span> {this.state.page}..{this.props.pages} </span>

            <button onClick={this.loadNext}> {this.props.text.next} </button>

            <Copyright />

         </div>

      </div>;
   }
}

const Copyright = function() {
   const date = new Date();

   return (<div className="App-copyright" id="copyright"> &#xA9; Konrad <span role="img" aria-label="Mushroom">🍄</span> {date.getFullYear()}</div>);
}


export default App;
