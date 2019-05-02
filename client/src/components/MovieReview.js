import React from 'react';
import { Mutation } from 'react-apollo';
import { UPDATE_MOVIE } from '../graphql/mutations';


class MovieReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: this.props.movie.review || "no review yet"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ review: event.target.value });
  }

  handleSubmit(event) {
     //here mutation
    alert('An essay was submitted: ' + this.state.review);
    event.preventDefault();
  }

  render() {

    const { movie, text } = this.props;
    return (
      <Mutation mutation={UPDATE_MOVIE} onCompleted={ ( data ) => {

            alert(text.updated_review)

         }}>
      {(updateReview, { data, loading, error }) => {

         return (
            <form onSubmit={ (e) => {
                  e.preventDefault();

                  updateReview({ variables: { id: movie.id, review: this.state.review }});
            }}>
              <label>
                <textarea
                  className="sap-movie-review-textarea"
                  value={this.state.review} onChange={this.handleChange} />
              </label>
              <br />
              <input type="submit" value="Edit" />
              <p>{ loading && text.loading }
                 { error && error.message }</p>
            </form>
         );
      }}
      </Mutation>
    );
  }
}


export default MovieReview;
