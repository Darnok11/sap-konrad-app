import React from 'react';
import '../css/footer.css';
// here will be query that return list of sorted movies by rating
export default function Footer(props) {

   const { current_page, pages, text } = props;

   return (
      <div className="sap-footer">
         <button id="sap-footer-prev" onClick={props.loadPrev}> {text.prev} </button>

            <span> {current_page}..{pages} </span>

         <button id="sap-footer-next" onClick={props.loadNext}> {text.next} </button>
      </div>
   );

}
