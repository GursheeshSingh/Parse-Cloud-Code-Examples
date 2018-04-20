var serverIP = "YOUR_SERVER_IP_HERE";
var serviceName = "YOUR_SERVER_NAME_HERE";
var apiKey = "YOUR_API_KEY_HERE";
var sessionToken = "SESSION_TOKEN_HERE";

/*
    NoSQL Based
*/

/*

    Function number: 1
    Function name: cloudCodeTest
    Parameters type: -
    Parameters description: no-params
    Description: Function to test if cloud functions are successfullt deployed and running. 
    Response type: String
    Response description: "Hello world"

*/

Parse.Cloud.define("cloudCodeTest", function(request, response) {
    response.success("Hello World");
});

/*

    Function number: 2
    Function name: moviesList
    Parameters type: -
    Parameters description: no-params
    Description: Function returns list of all Movies 
    Response type: ArrayList<ParseObject> (Android)
    Response description: Contains list of ParseObject (Android)

*/

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

/*

    Function number: 3
    Function name: longMoviesList
    Parameters type: -
    Parameters description: no-params
    Description: Function returns list of Long ( duration >= 2 ) Movies 
    Response type: Array of Parse Object, ArrayList<ParseObject> (Android)
    Response description: Contains list of all Long ( duration >= 2 ) Movies of type ParseObject (Android)

*/
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
/*

    Function number: 4
    Function name: longMoviesList (Improved Version)
    Parameters type: -
    Parameters description: no-params
    Description: Function returns list of Long ( duration > 2 ) Movies 
    Response type: Array of Parse Object, ArrayList<ParseObject> (Android)
    Response description: Contains list of all Long ( duration > 2 ) Movies of type ParseObject (Android)

*/
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

/*

    Function number: 5
    Function name: avgMovieDuration
    Parameters type: -
    Parameters description: no-params
    Description: Function returns Average Duration of all Movies 
    Response type: Double (Android)
    Response description: Average Duration of all movies

*/
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


/*

    Function number: 6
    Function name: profilePhotos
    Parameters type: -
    Parameters description: no-params
    Description: Function gives all the profile photos in ProfilePhotos class 
    Response type:  Array of Parse Object, ArrayList<ParseObject> (Android)
    Response description: List containing Parse Objects having Profile Photos of ParseFile type with key(profile_photo) .

*/
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


/*

    Function number: 7
    Function name: cloudCodePutTest
    Parameters type: String
    Parameters description: Any String
    Description: Function gives back the string passed 
    Response type:  String
    Response description: String passed in parameter.

*/

Parse.Cloud.define("cloudCodePutTest", function(request, response) {
    response.success(request.params.name);
});


//Put Statements

/*
    Function number: 8
    Function name: addMovie
    Parameters type: Hashmap (non-generic)
    Parameters description: Hashmap  mapping - ( name , movieName ) and ( duration , movieDuration )
    Description: Function adds Movie to Movies Class
    Response type:  String
    Response description: SUCCESSFUL OR NOT.

*/

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
/*
    Function number: 9
    Function name: addFile
    Parameters type: Hashmap (non-generic)
    Parameters description: Hashmap  mapping - ( file , file )
    Description: Function adds File to File Class
    Response type:  String
    Response description: SUCCESSFUL OR NOTs.

*/
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
        url:
            "http://" +
            serverIP +
            "/api/v2/" +
            serviceName +
            "/_table/" +
            tableName +
            "?api_key=" +
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
            "Content-Type": "application/json"
        },
        method: "POST",
        url:
            "http://" +
            serverIP +
            "/api/v2/" +
            serviceName +
            "/_table/" +
            tableName +
            "?api_key=" +
            apiKey +
            "&session_token=" +
            sessionToken,
        body: {
            resource: [
                {
                    name: name,
                    age: age
                }
            ]
        }
    }).then(
        function(httpResponse) {
            response.success("Successful");
        },
        function(httpResponse) {
            response.error("Error: " + httpResponse.status);
        }
    );
});

Parse.Cloud.define("addStudentRecords", function(request, response) {
    let tableName = "student";
    let names = request.params.name;
    let ages = request.params.age;

    let length = names.length;

    let students = new Array();

    for (let i = 0; i < length; i++) {
        let map = {};

        map["name"] = names[i];
        map["age"] = ages[i];

        students.push(map);
    }

    // let name = names[0];
    // let age = ages[0];

    Parse.Cloud.httpRequest({
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        url:
            "http://" +
            serverIP +
            "/api/v2/" +
            serviceName +
            "/_table/" +
            tableName +
            "?api_key=" +
            apiKey +
            "&session_token=" +
            sessionToken,
        body: {
            resource: students
        }
    }).then(
        function(httpResponse) {
            response.success("Successful");
        },
        function(httpResponse) {
            response.error("Error: " + httpResponse.status);
        }
    );
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

//UPDATE Based on ID
Parse.Cloud.define("updateStudentRecordById", function(request, response) {
    let tableName = "student";
    let id = request.params.id;
    let name = request.params.name;
    let age = request.params.age;

    Parse.Cloud.httpRequest({
        headers: {
            "Content-Type": "application/json"
        },
        method: "PUT",
        url:
            "http://" +
            serverIP +
            "/api/v2/" +
            serviceName +
            "/_table/" +
            tableName +
            "?api_key=" +
            apiKey +
            "&session_token=" +
            sessionToken,
        body: {
            resource: [
                {
                    id: id,
                    name: name,
                    age: age
                }
            ]
        }
    }).then(
        function(httpResponse) {
            response.success("Successful");
        },
        function(httpResponse) {
            response.error("Error: " + httpResponse.status);
        }
    );
});

//Update Based on name
Parse.Cloud.define("updateStudentRecordByName", function(request, response) {
    let tableName = "student";
    let oldName = request.params.oldName;
    let name = request.params.name;
    let age = request.params.age;

    Parse.Cloud.httpRequest({
        headers: {
            "Content-Type": "application/json"
        },
        method: "PUT",
        url:
            "http://" +
            serverIP +
            "/api/v2/" +
            serviceName +
            "/_table/" +
            tableName +
            "?filter=" +
            encodeURIComponent("name like " + oldName) +
            "&api_key=" +
            apiKey +
            "&session_token=" +
            sessionToken,
        body: {
            resource: [
                {
                    name: name,
                    age: age
                }
            ]
        }
    }).then(
        function(httpResponse) {
            response.success("Successful");
        },
        function(httpResponse) {
            response.error("Error: " + httpResponse.status);
        }
    );
});

//UPDATE Based on ID
Parse.Cloud.define("updateStudentRecordsById", function(request, response) {
    let tableName = "student";
    let ids = request.params.ids;
    let names = request.params.names;
    let ages = request.params.ages;

    let length = ids.length;

    let students = new Array();

    for (let i = 0; i < length; i++) {
        let map = {};

        map["id"] = ids[i];
        map["name"] = names[i];
        map["age"] = ages[i];

        students.push(map);
    }

    Parse.Cloud.httpRequest({
        headers: {
            "Content-Type": "application/json"
        },
        method: "PUT",
        url:
            "http://" +
            serverIP +
            "/api/v2/" +
            serviceName +
            "/_table/" +
            tableName +
            "?api_key=" +
            apiKey +
            "&session_token=" +
            sessionToken,
        body: {
            resource: students
        }
    }).then(
        function(httpResponse) {
            response.success("Successful");
        },
        function(httpResponse) {
            response.error("Error: " + httpResponse.status);
        }
    );
});

//UPDATE Based on Name
Parse.Cloud.define("updateStudentRecordsByName", function(request, response) {
    let tableName = "student";
    let oldNames = request.params.oldNames;
    let names = request.params.names;
    let ages = request.params.ages;

    let length = oldNames.length;

    for (let i = 0; i < length; i++) {
        let students = new Array();

        let map = {};

        let oldName = oldNames[i];

        map["name"] = names[i];
        map["age"] = ages[i];

        students.push(map);

        Parse.Cloud.httpRequest({
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            url:
                "http://" +
                serverIP +
                "/api/v2/" +
                serviceName +
                "/_table/" +
                tableName +
                "?filter=" +
                encodeURIComponent("name like " + oldName) +
                "&api_key=" +
                apiKey +
                "&session_token=" +
                sessionToken,
            body: {
                resource: students
            }
        }).then(function(httpResponse) {
    
        // response.success("Successful");

    }, function(httpResponse) {
        response.error("Error: " + httpResponse.status)
    });;
    }
});

//Update Based on name
Parse.Cloud.define("updateStudentRecordByName", function(request, response) {
    let tableName = "student";
    let oldName = request.params.oldName;
    let name = request.params.name;
    let age = request.params.age;

    Parse.Cloud.httpRequest({
        headers: {
            "Content-Type": "application/json"
        },
        method: "PUT",
        url:
            "http://" +
            serverIP +
            "/api/v2/" +
            serviceName +
            "/_table/" +
            tableName +
            "?filter=" +
            encodeURIComponent("name like " + oldName) +
            "&api_key=" +
            apiKey +
            "&session_token=" +
            sessionToken,
        body: {
            resource: [
                {
                    name: name,
                    age: age
                }
            ]
        }
    }).then(
        function(httpResponse) {
            response.success("Successful");
        },
        function(httpResponse) {
            response.error("Error: " + httpResponse.status);
        }
    );
});

// Parse.Cloud.define("updateStudentRecords", function(request, response) {

//     let tableName = "student";
//     let names = request.params.name;
//     let ages = request.params.age;

//     let length = names.length;

//     let students = new Array();

//     for (let i = 0; i < length; i++) {
//         let map = {};

//         map['name'] = names[i];
//         map['age'] = ages[i];

//         students.push(map)
//     }

//     // let name = names[0];
//     // let age = ages[0];

//     Parse.Cloud.httpRequest({
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         method: "POST",
//         url: "http://" + serverIP + "/api/v2/" + serviceName + "/_table/" + tableName + "?api_key=" + apiKey + "&session_token=" + sessionToken,
//         body: {
//             resource: students
//         }
//     }).then(function(httpResponse) {

//         response.success("Successful");

//     }, function(httpResponse) {
//         response.error("Error: " + httpResponse.status)
//     });
// });
