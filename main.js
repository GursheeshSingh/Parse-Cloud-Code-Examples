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
    const query = new Parse.Query("Movies");
    query
        .find()
        .then(results => {
            response.success(results);
        })
        .catch(() => {
            response.error("movie lookup failed");
        });
});

// Parse.Cloud.define("longMoviesList", function(request, response) {
//     const query = new Parse.Query("Movies");
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
    let query = new Parse.Query("Movies");
    query.greaterThan("duration", 2);
    query
        .find()
        .then(results => {
            response.success(results);
        })
        .catch(() => {
            response.error("movie lookup failed");
        });
});

Parse.Cloud.define("avgMovieDuration", function(request, response) {
    const query = new Parse.Query("Movies");
    query
        .find()
        .then(results => {
            let sum = 0;
            for (let i = 0; i < results.length; ++i) {
                sum += results[i].get("duration");
            }
            response.success(sum / results.length);
        })
        .catch(() => {
            response.error("movie lookup failed");
        });
});

Parse.Cloud.define("profilePhotos", function(request, response) {
    const query = new Parse.Query("ProfilePhotos");
    query
        .find()
        .then(results => {
            response.success(results);
            // response.success(results.length);
        })
        .catch(() => {
            response.error("movie lookup failed");
        });
});

//Put Statements

Parse.Cloud.define("cloudCodePutTest", function(request, response) {
    response.success(request.params.name);
});

// Parse.Cloud.define("addMovie", function(request, response) {
//     let name = request.params.name;
//     let duration = request.params.duration;

//     let Movies = Parse.Object.extend("Movies");
//     let movies = new Movies();

//     movies.set("name",request.params.name);
//     movies.set("duration",request.params.duration);

//     movies.save(null, {
//         success: function(gameScore) {
//             response.success("SUCCESSFULLY SAVED");
//         },
//         error: function(gameScore, error) {
//           response.error("Error Saving " + error);
//         }
//     });
// });

//Version 2 using ParseObject
//IMPORTANT: Cannot Pass ParseObject

// Parse.Cloud.define("addMovie", function(request, response) {

//     let Movies = Parse.Object.extend("Movies");
//     let movies = new Movies();

//     let movie = request.params.movie;

//     movies.set("name",movie.getString("name"));
//     movies.set("duration",movie.getNumber("duration"));

//     movies.save(null, {
//         success: function(gameScore) {
//             response.success("SUCCESSFULLY SAVED");
//         },
//         error: function(gameScore, error) {
//           response.error("Error Saving " + error);
//         }
//     });
// });

//Passing ParseFile

Parse.Cloud.define("addMovie", function(request, response) {
    let Files = Parse.Object.extend("Files");
    let files = new Files();

    let file = request.params.file;

    files.set("files", file);
    // movies.set("duration",request.params.duration);

    files.save(null, {
        success: function(files) {
            response.success("SUCCESSFULLY SAVED");
        },
        error: function(files, error) {
            response.error("Error Saving " + error);
        }
    });
});
