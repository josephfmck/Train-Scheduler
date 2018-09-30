$(document).ready(function(){




  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDtN_cpMdvFN_sibuMPhz1r_6tBSAGAi38",
    authDomain: "train-scheduler-c950e.firebaseapp.com",
    databaseURL: "https://train-scheduler-c950e.firebaseio.com",
    projectId: "train-scheduler-c950e",
    storageBucket: "",
    messagingSenderId: "888929922694"
  };
  firebase.initializeApp(config);


// VARIABLES
var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;


// FUNCTIONS + EVENTS
$("#addTrain").on("click", function() {         //submit button

  trainName = $('#nameInput').val().trim();       //set variables to user values inputed in the form text boxes
  destination = $('#destinationInput').val().trim();
  firstTrainTime = $('#firstTrainInput').val().trim();
  frequency = $('#frequencyInput').val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  database.ref().push({       //push data of variables into the database
    trainName: trainName,          
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });

});


// MAIN PROCESS + INITIAL CODE
database.ref().on("child_added", function(snapshot) {     //when child_added to database
  console.log(snapshot.val());

  // update the variable with data from the database
  trainName = snapshot.val().trainName;
  destination = snapshot.val().destination;
  firstTrainTime = snapshot.val().firstTrainTime;
  frequency = snapshot.val().frequency;


  // moment.js methods for time calls and calculations
  var firstTrainMoment = moment(firstTrainTime, 'HH:mm');
  var nowMoment = moment(); // creates a moment object of current date and time and storing it in a variable whenever the user click the submit button

  var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');     //difference between nowMoment and firstTrainMoment in minutes
  var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;     //remainder after FirstArrival is % by frequency
  var minutesAway = frequency - minutesSinceLastArrival;

  var nextArrival = nowMoment.add(minutesAway, 'minutes');
  var formatNextArrival = nextArrival.format("HH:mm");


  // add table
  var dataRow = $('<tr>');     //set tr as a row to contain data
  var dataTrainName = $('<td>');      //set variables as table data tags
  var dataDestination = $('<td>');
  var dataFrequency = $('<td>');
  var dataFormatNextArrival = $('<td>');
  var dataMinutesAway = $('<td>');
  dataTrainName.append(trainName);      //append data to the table data tags
  dataDestination.append(destination);
  dataFrequency.append(frequency);
  dataFormatNextArrival.append(formatNextArrival);
  dataMinutesAway.append(minutesAway);
  dataRow.append(dataTrainName).append(dataDestination).append(dataFrequency).append(dataFormatNextArrival).append(dataMinutesAway);     //append the letters to the row
  $('#newTrains').append(dataRow);         //append the row containing data to the tbody newTrains


  }, function (errorObject) {

  // In case of error this will print the error
    console.log("The read failed: " + errorObject.code);

});














});
