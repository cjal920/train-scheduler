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

database.ref().on("child_added", function (childSnapshot) {

  // Use Moments.js to calculate "Next Arrival" when next train will arrive, relative to current time. 
  // Use Moments.js to calculate "Minutes Away" when next train will arrive in minutes

  // Find when next train will arrive
  var tFrequency = childSnapshot.val().frequency;

  // Push start time back one year to make sure it comes before the current time
  var convertedDate = moment(childSnapshot.val().firstTrainTime, "hh:mm").subtract(1, "years");
  var trainTime = moment(convertedDate).format('hh:mm');

  // Get current Time
  var currentTime = moment();

  // Push back one year to make sure it comes before current time
  var firstTimeConverted = moment(trainTime, 'hh:mm').subtract(1, 'years');

  // Calculate difference between train start time and current time
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  // Calculate time apart (remainder)
  var tRemainder = diffTime % tFrequency;

  // Calculate minutes until train arrival
  var tMinutesTillTrain = tFrequency - tRemainder;

  // Calculate next train adding mins till current time and format - calc mins before arrival
  // Add two more table data next arrival and mins till next train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format('hh:mm');

  // Display Current Train Schedule
  $("#trainTable").append(
      "<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>"
      + childSnapshot.val().frequency + "</td><td>" + trainTime + "</td><td>" + tMinutesTillTrain + "</td></tr>")
}, function (errorObject) {
  console.log("Errors handled:" + errorObject.code);
})

setInterval(function () {
  location.reload();
}, 60000)
