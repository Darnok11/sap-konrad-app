import React from 'react';
import '../css/footer.css';
import { Query } from 'react-apollo';
// here will be query that return list of sorted movies by rating
class Footer extends React.Component {

   constructor(props) {
      super(props);
      this.loadPrev = this.loadPrev.bind(this);
      this.loadNext = this.loadNext.bind(this);
   }


   /**
    * This should update the cache !!! After click load next
    * @param  {[type]} e [description]
    * @return {[type]}   [description]
    */
   loadNext(e) {
      e.preventDefault();

      if (this.state.current_page < this.state.pages) {
         this.setState({ current_page: this.state.current_page + 1 });
      } else { alert( this.props.text.next_alert ); }
   }

   /**
    * This should update the cache !!! After click load prev
    * @param  {[type]} e [description]
    * @return {[type]}   [description]
    */
   loadPrev(e) {
      e.preventDefault();

      if (this.state.current_page > 1) {
         this.setState({ current_page: this.state.current_page - 1 });
      } else { alert( this.props.text.prev_alert ); }
   }

   render() {

      const { current_page } = this.state;
      const { pages, text } = this.props;

      return (
         <div className="sap-footer">
            <button id="sap-footer-prev" onClick={this.loadPrev}> {text.prev} </button>

               <span> {current_page}..{pages} </span>

            <button id="sap-footer-next" onClick={this.loadNext}> {text.next} </button>
         </div>
      );
   }
}

export default Footer;
