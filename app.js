$(document).ready(function() {
	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA8E2dFaeR7QgM2_SgsaRMXi5J1weDk1dU",
    authDomain: "train-schedule-71911.firebaseapp.com",
    databaseURL: "https://train-schedule-71911.firebaseio.com",
    projectId: "train-schedule-71911",
    storageBucket: "",
    messagingSenderId: "996740962662"
  };
  firebase.initializeApp(config);
  var database = firebase.database().ref();

  var table = 0
  var today = moment().format("HH:mm");

	function updateTrain() {
		var train = $("#train").val();
		var destin = $("#destiny").val();
		var time = moment($("#time").val(), "HH:mm ");
		var frequent = moment($("#frequency").val(), "mm");
		var timeLeft = moment().diff(moment(time), "minutes", true);
		var nextTrain = time.add($("#frequency").val(), "m")

		// $(".table").append("<tr class=" + table + "></tr>");
		// $("." + table + "").append("<td>" + train + "</td>");
		// $("." + table + "").append("<td>" + destin + "</td>");
		// $("." + table + "").append("<td>" + frequent.format("mm") + "</td>");
		// $("." + table + "").append("<td>" + nextTrain.format("HH:mm") + "</td>");
		// $("." + table + "").append("<td>" + time.toNow(true) + "</td>");

		// table++;

		database.push({	
			train: train,
			destination: destin,
			frequency: frequent.format("mm"),
			nexttrain: nextTrain.format("HH:mm"),
			minutesaway: time.toNow(true),
			dateAdded: firebase.database.ServerValue.TIMESTAMP

		})

		$("input").val("")
    }

    database.orderByChild("dateadded").on("child_added", function(snapshot) {
    	console.log(snapshot.val().train);
    	var sv = snapshot.val()
    	$(".table").append("<tr><td>" + sv.train + 
    		"</td><td>" + sv.destination + 
    		"</td><td>" + sv.frequency + 
    		"</td><td>" + sv.nexttrain + 
    		"</td><td>" + sv.minutesaway + 
    		"</td></tr>");

    })




	$(document).on("click", "#submit", updateTrain)
})
