const dns = require('dns');
const os = require('os');
dns.lookup(os.hostname(), function (err, add, fam) {
   err && console.log(err);
   console.log('addr: ' + add);
});

const ports = {
  'graphql': "http://localhost:3001/graphql",
  // docker image
  // 'graphql': "http://http://192.168.99.100:4001/graphql",
  // service endpoint sap-konrad-graphql   172.17.0.2:3001,172.17.0.8:3001
  // for Kubernetes
  // 'graphql': "http://sap-konrad-graphql/graphql",
  'list': "http://localhost:4002/list"
};

const text_en = {
   "title": "Title",
   "rating": "Rating",
   "director": "Director",
   "actors": "Actors",
   "created_at": "Created at",
   "show_hide_review": "See/Hide review",

   "no_movies": "There are no movies yet",
   "no_review": "No review for this movie",
   "add_movie": "Add Movie",
   "get_list": "Get List",
   "not_given": "Not given",
   "wrong_format": "Wrong format",
   "wrong_title": "Wrong title. From 3 to 50 letters only.",
   "wrong_rating": "Wrong rating: Bigger than 0.00 and smaller than 5.00.",
   "out_of_range": "Out of range",

   "next": "Next",
   "prev": "Previous",
   "cancel": "Cancel",
   "delete": "Delete Movie",
   "change_review": "Change review",

   "prev_alert": "You are at the first page",
   "next_alert": "No more pages to load",

   "any_name": "Type any name",
   "nothing_to_remove": "Nothing to remove",
   "load_file": "Load movie",
   "pls_load_file": "Please load movie",

   "submit_message": "Your movie was added!",
   "submit_fail": "Please fill all required fields.\n Title, director, actors names should be from 3 to 50 characters long and only letters.\n Rating must be between 1 and 10.\n Don't forget to add movie.",
   "go_back": "Go back",
   "not_found": "Not found",
   "loading": "Loading...",
   "error": "Error. Please try later",
   "updated_review": "Review was updated!"

};


/* in MongoDB */

const movies = [
   {
      "id": "sjgdy223",
      "title": "MyAwesom12 eMovie",
      "rating": 0.89,
      "director": "Ken Block",
      "actors": [
         "John Snow", "Christina  Jake"
      ],
      "createdAt": "2016-02-07T09:53:42.523",
      "review": "Siemaneczko"
   }, {
      "id": "sjgdy224",
      "rating": 1.29,
      "title": "Siemanko co tam",
      "director": "Ken Block",
      "actors": [
         "John Snow", "Christina  Jake"
      ],
      "createdAt": "2016-06-07K09:53:42.523"
   }, {
      "id": "sjgdy225",
      "title": "Narazie nie ma tego",
      "rating": 2.2312414,
      "director": "Ken Block",
      "actors": [
         "John Snow", "Christina  Jake"
      ]
   }, {
      "id": "sjgdy226",
      "title": "MyAwesom12 eMovie",
      "rating": 3.89,
      "director": "Ken Block",
      "actors": [
         "John Snow", "Christina  Jake"
      ],
      "createdAt": "2016-02-07T09:53:42.523"
   }, {
      "id": "sjgdy227",
      "title": "Siemanko co tam",
      "director": "Ken Block",
      "actors": [
         "John Snow", "Christina  Jake"
      ],
      "createdAt": "2016-06-07K09:53:42.523"
   }, {
      "id": "sjgdy228",
      "title": "MyAwesom12 eMovie",
      "rating": 5.89,
      "director": "Ken Block",
      "actors": [
         "John Snow", "Christina  Jake"
      ],
      "createdAt": "2016-02-07T09:53:42.523"
   }, {
      "id": "sjgdy229",
      "title": "Siemanko co tam",
      "rating": 6.89,
      "director": "Ken Block",
      "actors": [
         "John Snow", "Christina  Jake"
      ],
      "createdAt": "2016-06-07K09:53:42.523"
   }
];

const reviews = [
   {
      "id": "sjgdy223",
      "review": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
   },
   {
      "id": "sjgdy224",
      "review": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
   },
   {
      "id": "sjgdy228",
      "review": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
   },
   {
      "id": "sjgdy229",
      "review": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
   }
];



export { movies, reviews, text_en, ports };
