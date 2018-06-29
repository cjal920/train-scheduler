
/*
var config = {
    apiKey: "AIzaSyDxF1JpYtm5tmGqUsNWIJdFhiPQi7_NFIc",
    authDomain: "projectone-b29b1.firebaseapp.com",
    databaseURL: "https://projectone-b29b1.firebaseio.com",
    projectId: "projectone-b29b1",
    storageBucket: "projectone-b29b1.appspot.com",
    messagingSenderId: "923998700719"
  };
  firebase.initializeApp(config);
  */
 
  var database = firebase.database();

  var trainName = "";
  var trainLine = "";
  var trainDestination = "";
  var trainFirst = 0;
  var trainFreq = 0;

  $("#add-train").on("click", function(event) {
    event.preventDefault();

  });


  
