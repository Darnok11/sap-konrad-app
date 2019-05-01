import React, { useState, useEffect } from 'react';

/**
 * React hook cmp. A custom hook is a JavaScript function whose name starts with “use” (useFetch), according to the React documentation. Use async/await.
 * @param  {String} url   server uri
 * @param  {Object} query graphql query
 * @return {Object}       data fetched from database
 */
export default function useFetch(url, query) {
   const [data, setData] = useState([]);

   async function getData() {
      const opts = {
         method: 'POST',
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ query: query })
      }

      const res = await fetch(url, opts);
      const _data = await res.json();
      console.log(_data);
      setData(_data);
      // with fetch / then
      // fetch(url, opts)
      // .then(res => res.json())
      // .then(res => {
      //    console.log(res);
      //    return setData(res);
      // })
      // .catch(console.error);
   }

   useEffect(() => {
      getData();
   }, []); // <== super important! Do not render every time.

   return data;
}
