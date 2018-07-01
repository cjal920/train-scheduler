var config = {
  apiKey: "AIzaSyCcWA_d14a7qXZViMzraIa5lpfbaa0OHN4",
  authDomain: "trainone-3ef48.firebaseapp.com",
  databaseURL: "https://trainone-3ef48.firebaseio.com",
  projectId: "trainone-3ef48",
  storageBucket: "trainone-3ef48.appspot.com",
  messagingSenderId: "359069671225"
};
firebase.initializeApp(config); 

var database = firebase.database(); 

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";

$("#add-train").on("click", function (event) {

  event.preventDefault();

  trainName = $("#trainName-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrainTime = $("#firstTrainTime-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
  })
})

database.ref().on("child_added", function(childSnapshot) {
  var tFrequency = childSnapshot.val().frequency;
  var convertedDate = moment(childSnapshot.val().firstTrainTime, "hh:mm").subtract(1, "years");
  var trainTime = moment(convertedDate).format("hh:mm");
  var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % tFrequency;
  var tMinutesTillTrain = tFrequency - tRemainder;
  var nextTrainArrival = moment().add(tMinutesTillTrain, "m").format("hh:mm A"); 
  $("#trainTable").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + nextTrainArrival + "</td><td>" + tMinutesTillTrain + "</td></td>");
}); 

setInterval(function () {
  location.reload();
}, 60000);



