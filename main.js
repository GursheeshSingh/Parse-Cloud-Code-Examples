Parse.Cloud.define("cloudCodeTest", function(request, response) {
    response.success("Hello World");
});
// Parse.Cloud.define("averageStars", function(request, response) {
//     const query = new Parse.Query("Review");
//     query.equalTo("movie", request.params.movie);
//     query.find()
//       .then((results) => {
//         let sum = 0;
//         for (let i = 0; i < results.length; ++i) {
//           sum += results[i].get("stars");
//         }
//         response.success(sum / results.length);
//       })
//       .catch(() =>  {
//         response.error("movie lookup failed");
//       });
//   });
Parse.Cloud.define("moviesList", function(request, response) {
    const query = new Parse.Query("movies");
    query.find()
      .then((results) => {        
        response.success(results);
  })
    .catch(() =>  {
        response.error("movie lookup failed");
      });
});

// Parse.Cloud.define("longMoviesList", function(request, response) {
//     const query = new Parse.Query("movies");
//     query.find()
//       .then((results) => {        
//         for (let i = 0; i < results.length; ++i) {
//             if(results[i].get("duration") < 2){
//                 //To  Remove an array element
//                 results.splice(i, 1);
//             }
//           }
//           response.success(results);
//   })
//     .catch(() =>  {
//         response.error("movie lookup failed");
//       });
// });

//Improved Version
Parse.Cloud.define("longMoviesList", function(request, response) {
    let query = new Parse.Query("movies");
    query.greaterThan("duration",2);
    query.find()
      .then((results) => {        
          response.success(results);
  })
    .catch(() =>  {
        response.error("movie lookup failed");
      });
});

Parse.Cloud.define("avgMovieDuration", function(request, response) {
    const query = new Parse.Query("movies");
    query.find()
      .then((results) => {        
        let sum = 0;
        for (let i = 0; i < results.length; ++i) {
          sum += results[i].get("duration");
        }
        response.success(sum / results.length);
  })
    .catch(() =>  {
        response.error("movie lookup failed");
      });
});

Parse.Cloud.define("profilePhotos", function(request, response) {
    const query = new Parse.Query("ProfilePhotos");
    query.find()
      .then((results) => {        
        response.success(results);
        // response.success(results.length);
  })
    .catch(() =>  {
        response.error("movie lookup failed");
      });
});

