const text_en = {
   "title": "Title",
   "rating": "Rating",
   "director": "Director",
   "actors": "Actors",
   "created_at": "Created at",
   "see_review": "See review",
   "hide_review": "Hide review",

   "no_movies": "There are no movies yet",
   "no_review": "No review for this movie",
   "add_movie": "Add Movie",
   "get_list": "Get List",
   "not_given": "not given",
   "wrong_format": "Wrong format",
   "wrong_title": "Wrong title. Only letter and spaces and length 3 < title < 50.",
   "wrong_actor_name": "Wrong actor name. Only letter and spaces and length 3 < title < 50.",
   "wrong_rating": "Wrong rating. Should be double precision number < 5 and number > 0.",
   "out_of_range": "out of range",

   "next": "Next",
   "prev": "Prev",
   "cancel": "Cancel",
   "delete": "Delete",

   "add_review": "Add review",

   "prev_alert": "You are at the first page",
   "next_alert": "No more pages to load",

   "any_name": "Type any name",
   "nothing_to_remove": "Nothing to remove",
   "load_file": "Load movie",
   "pls_load_file": "Please load movie",

   "submit_message": "Your movie was added!"

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
      "createdAt": "2016-02-07T09:53:42.523"
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



export { text_en, movies, reviews };
