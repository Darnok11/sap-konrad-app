import React from 'react';
import { Mutation } from 'react-apollo';



class MovieReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.review || "no review yet"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
     //here mutation
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <textarea
            className="sap-movie-review-textarea"
            value={this.state.value} onChange={this.handleChange} />
        </label>
        <br />
        <input type="submit" value="Edit" />
      </form>
    );
  }
}


export default MovieReview;
