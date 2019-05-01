componentDidMount() {
   const url = "http://localhost:4000/graphql";
   const query = `{ count }`;
   const opts = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query })
   }

   fetch(url, opts)
   .then(res => res.json())
   .then(res => {
      return this.setState({ count: res.data.count });
   })
   .catch(console.error);
}
