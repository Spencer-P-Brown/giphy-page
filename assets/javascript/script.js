// this is the giphy key dc6zaTOxFJmzC

/*
api.giphy.com
/v1/gifs/search

*/

$(document).ready(function() {
    var topics = ["Nic Cage", "Crispin Glover", "Gary Busey", "Klaus Kinski"];

    buttonShow();

	function displayGif() {

       var crazyPerson = $(this).attr("data-name");
       var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
           crazyPerson + "&api_key=dc6zaTOxFJmzC&limit=10";

       $.ajax({
           url: queryURL,
           method: "GET"
       })

       .done(function(response) {
           var results = response.data;

           for (var i=0; i < results.length; i++) {
               if (results[i].rating) {
                   var gifDiv = $("<div class='item'>");
                   var rating = results[i].rating;
                   var p = $("<p>").text("Rating: " + rating);
                   var crazyPersonImage = $("<img>");
                       crazyPersonImage.attr("src", results[i].images.fixed_height_still.url);
                       crazyPersonImage.attr("data-still", results[i].images.fixed_height_still.url)
                       crazyPersonImage.attr("data-animate", results[i].images.fixed_height.url)
                       crazyPersonImage.attr("data-state", "animate");
                       crazyPersonImage.addClass("animate");


                   gifDiv.append(p);
                   gifDiv.append(crazyPersonImage);

                   $("#display-gifs").prepend(gifDiv);
               }
           }
       })
   }

    //This is the code that makes button adding dynamic
    function buttonShow(){

    	$("#display-btns").empty();
    	for (var i = 0; i < topics.length; i ++) {
    		var a = $("<button>");
    		a.addClass("gif");
    		a.attr("data-name", topics[i]);
    		a.text(topics[i]);
    		$("#display-btns").append(a);
    	}
    }
	
	$("#add-gif").on("click", function(event){
		event.preventDefault();
		var gif = $("#gif-input").val().trim();
    if (gif) {
  		topics.push(gif);
  		buttonShow();
    }
		$("#add-a-btn")[0].reset();	
	});

	$(document).on("click", ".gif", displayGif);


	$(document).on("click", ".animate", function() {

		var state = $(this).attr("data-state");

		if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
		} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
   });
});
