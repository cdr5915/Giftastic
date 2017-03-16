var feelings = ["Happy", "Excited", "Confused", "Tired", "Angry", "Amused"];
	
function makeButtons() {

	$("#visable-buttons").empty();

	for (var i = 0; i < feelings.length; i++){

		var buttonSetUp = $("<button>");
			buttonSetUp.addClass("feels");
			buttonSetUp.attr("data-name", feelings[i]);
			buttonSetUp.text(feelings[i]);
		$("#visable-buttons").append(buttonSetUp);
	}
}

$("#add-gif").on("click", function(event) {
	event.preventDefault();
	//  .val() method is primarily used to get the values of the form elements such as input
	//  .trim method to remove all new lines, spaces, and tabs from the beginning and end of the supplied string in the.
	var feels = $("#gif-input").val().trim();
	feelings.push(feels);
	makeButtons();
});

makeButtons();

$("body").on("click", "button", function() {
    console.log("I was clicked!");
	var feelingName = $(this).data('name');
    console.log(feelingName);

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        feelingName + "&api_key=dc6zaTOxFJmzC&limit=10";

	console.log(queryURL);


// Performing our AJAX GET request
    $.ajax({
   	url: queryURL,
    method: "GET"
    })

    .done(function(response) {
    	 // This will get overwritten with each iteration of the loop??
    	var results = response.data;
    	console.log(results);

    	for (var i = 0; i < results.length; i++) {
    		var gifDiv = $("<div class = 'item'>");
    		var gifRating = results[i].rating;
    		var paragraph = $("<p>").text("Rating: " + gifRating);
    		var gifImg = $("<img>");
            var stillGif = results[i].images.fixed_height_still.url;
            var animateGif = results[i].images.fixed_height.url;
    		gifImg.attr("src", stillGif);
            gifImg.attr("data-still", stillGif);
            gifImg.attr("data-animate", animateGif);
            gifImg.attr("data-state", "still");
            gifImg.addClass("gifThis");
    		gifDiv.append(gifImg);
    		gifDiv.append(paragraph);
    		$("#gif-container").prepend(gifDiv);
    	}
    });
});

    $(document).on("click", ".gifThis", function() {
        console.log("I was clicked!");
        var gifState = $(this).attr("data-state");
        console.log(gifState);
        
        if (gifState === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        

    });

 
