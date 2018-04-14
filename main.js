var serverIP = "YOUR_SERVER_IP_HERE";
var serviceName = "YOUR_SERVER_NAME_HERE";
var apiKey = "YOUR_API_KEY_HERE";
var sessionToken = "SESSION_TOKEN_HERE";

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

Parse.Cloud.define("addFile", function(request, response) {
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

//To MySQL Server
// Parse.Cloud.define("getAllTableNames", function(request, response) {
//     Parse.Cloud.httpRequest({
//         url:
//             "http://" +
//             serverIP +
//             "/api/v2/" +
//             serviceName +
//             "/_table?api_key=" +
//             apiKey +
//             "&session_token=" +
//             sessionToken
//     }).then(
//         function(httpResponse) {
//             // success
//             console.log(httpResponse.text);

//             // response.success(httpResponse.text);

//             var res = JSON.parse(httpResponse.text);

//             console.log(res.resource.length);

//             response.success(res.resource.length);
//         },
//         function(httpResponse) {
//             // error
//             console.error(
//                 "Request failed with response code " + httpResponse.status
//             );

//             response.error(
//                 "Request failed with response code " + httpResponse.status
//             );
//         }
//     );
// });


Parse.Cloud.define("getAllTableNames", function(request, response) {
    Parse.Cloud.httpRequest({
        url:
            "http://" +
            serverIP +
            "/api/v2/" +
            serviceName +
            "/_table?api_key=" +
            apiKey +
            "&session_token=" +
            sessionToken
    }).then(
        function(httpResponse) {
            // success
            console.log(httpResponse.text);

            // response.success(httpResponse.text);

            var res = JSON.parse(httpResponse.text);

            var resource = res.resource;

            for (let i = 0; i < resource.length; i++) {
                const element = resource[i];
                console.log(element);
            }

            response.success(resource);

        },
        function(httpResponse) {
            // error
            console.error(
                "Request failed with response code " + httpResponse.status
            );

            response.error(
                "Request failed with response code " + httpResponse.status
            );
        }
    );
});


// var tableName = "student";

Parse.Cloud.define("getAllTableRecords", function(request, response) {
    
    let tableName = request.params.tableName;

    Parse.Cloud.httpRequest({
        url:"http://" + serverIP + "/api/v2/" + serviceName + "/_table/" + tableName + 
        "?api_key=" + apiKey + "&session_token=" + sessionToken
    }).then(
        function(httpResponse) {
            // success
            console.log(httpResponse.text);

            // response.success(httpResponse.text);

            var res = JSON.parse(httpResponse.text);

            var resource = res.resource;

            response.success(resource);

        },
        function(httpResponse) {
            // error
            console.error(
                "Request failed with response code " + httpResponse.status
            );

            response.error(
                "Request failed with response code " + httpResponse.status
            );
        }
    );
});


Parse.Cloud.define("addStudentRecord", function(request, response) {

    let tableName = "student";
    let name = request.params.name;
    let age = request.params.age;
    
    Parse.Cloud.httpRequest({
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        url: "http://" + serverIP + "/api/v2/" + serviceName + "/_table/" + tableName + "?api_key=" + apiKey + "&session_token=" + sessionToken,
        body: {
            resource: [{
                name: name,
                age: age
            }]
        }
    }).then(function(httpResponse) {
    
        response.success("Successful");

    }, function(httpResponse) {
        response.error("Error: " + httpResponse.status)
    });
});

Parse.Cloud.define("addStudentRecords", function(request, response) {

    let tableName = "student";
    let names = request.params.name;
    let ages = request.params.age;
    
    let length = names.length;

    let students = new Array();

    for (let i = 0; i < length; i++) {
        let map = {};

        map['name'] = names[i];
        map['age'] = ages[i];
    
        students.push(map)
    }


    // let name = names[0];
    // let age = ages[0];

    Parse.Cloud.httpRequest({
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        url: "http://" + serverIP + "/api/v2/" + serviceName + "/_table/" + tableName + "?api_key=" + apiKey + "&session_token=" + sessionToken,
        body: {
            resource: students
        }
    }).then(function(httpResponse) {
    
        response.success("Successful");

    }, function(httpResponse) {
        response.error("Error: " + httpResponse.status)
    });
});


//Not Working
// Parse.Cloud.define("addStudentRecords", function(request, response) {

//     let tableName = "student";
//     let students = request.params.students;


//     let name = students[0].get("name");
//     let age = students[0].get("name");

//     Parse.Cloud.httpRequest({
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         method: "POST",
//         url: "http://" + serverIP + "/api/v2/" + serviceName + "/_table/" + tableName + "?api_key=" + apiKey + "&session_token=" + sessionToken,
//         body: {
//             resource: [{
//                 name: name,
//                 age: age
//             }]
//         }
//     }).then(function(httpResponse) {
    
//         response.success("Successful");

//     }, function(httpResponse) {
//         response.error("Error: " + httpResponse.status)
//     });
// });
