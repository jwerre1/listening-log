$(document).ready(function() { 

  $("#dateInput").attr("value", (moment().format('L')));

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD--R2lpVXU5mrUtOW7Fiw_rkEpELLaKwI",
    authDomain: "listening-log.firebaseapp.com",
    databaseURL: "https://listening-log.firebaseio.com",
    projectId: "listening-log",
    storageBucket: "listening-log.appspot.com",
    messagingSenderId: "844661013314"
  };
  
  firebase.initializeApp(config);

var database = firebase.database();

var date = "";
var piece = "";
var composer = "";
var performer= "";
var comment = "";


// store new data when "submit" button is pushed
$("#add-piece-btn").on("click", function(event) {

    event.preventDefault();

    date = $("#dateInput").val().trim();
    piece = $("#pieceInput").val().trim();
    composer = $("#composerInput").val().trim();
    performer = $("#performerInput").val().trim();
    comment = $("#commentInput").val().trim();
  
    database.ref().push({
      date: date,
      piece: piece,
      composer: composer,
      performer: performer,
      comment: comment
    });
});

// runs when new data appears in database
database.ref().on("child_added", function(snapshot) {


  var sv = snapshot.val();

  // Log the value of the various properties
  console.log(sv.date);
  console.log(sv.piece);
  console.log(sv.composer);
  console.log("performer" + sv.performer);
  console.log(sv.comment);

  let tRow = $("<tr>");

  // add data to td elements
  let dateID = $("<td>").text(sv.date);
  let pieceID = $("<td>").text(sv.piece);
  let composerID = $("<td>").text(sv.composer);
  let performerID = $("<td>").text(sv.performer);
  let commentID = $("<td>").text(sv.comment);


  // Append the td elements to the new table row
  tRow.append(dateID, pieceID, composerID, performerID, commentID);
  // Append the table row to the table element
  $(".table").prepend(tRow);

  // If any errors are experienced, log them to console.
  // Create Error Handling
  }, function(errorObject) {
  console.log("The read failed: " + errorObject.code);

});

})