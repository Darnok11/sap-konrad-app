import React from 'react';
import { Link } from 'react-router-dom';
import { ports } from '../resources/data';

class Header extends React.Component {
   constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
   }


   //TODO: 
   handleClick(e) {
      e.preventDefault();

      let myRequest = new Request(ports.list);

      fetch(myRequest, {
         method: 'GET',
         credentials: 'omit',
         mode: 'cors',
         cache: 'default'
      })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('HTTP error, status = ' + response.status);
        }

        // return response.body();
        // we need to created reader: https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
        const reader = response.body.getReader();

        return new ReadableStream({
    start(controller) {
      return pump();
      function pump() {
        return reader.read().then(({ done, value }) => {
             // When no more data needs to be consumed, close the stream
             if (done) {
                 controller.close();
                 return;
             }
             // Enqueue the next data chunk into our target stream
             controller.enqueue(value);
             return pump();
           });
         }
       }
     })
     })
   .then(stream => new Response(stream))
   .then(response => response.blob())
   .then(blob => console.log(blob.json()))
   // .then(blob => URL.createObjectURL(blob))
   // .then(url => console.log(image.src = url))
   .catch(err => console.error(err));

   }


   render() {
      const { text } = this.props;
      return (
         <div className="App-header-buttons" >
            <Link to="/add-movie"><button>{text.add_movie}</button></Link>

            <span role="img" aria-label="Movie Camera">🎥</span>

            <Link to="/get-list"><button>{text.get_list}</button></Link>
         </div>
      );
   }
}

export default Header;
