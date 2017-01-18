//  * Be sure to read about these GIPHY parameters (hint, hint): 
//      * `q` - search query term or phrase
//      * `limit` - (optional) number of results to return, 
//          maximum 100. Default 25.
//      * `rating` - (optional) limit results to those rated 
//          (y,g, pg, pg-13 or r).
// 1. Before you can make any part of our site work, you need
//  to create an array of strings, each one related to a topic
//  that interests you. Save it to a variable called `topics`. 
//      * We chose animals for our theme, but you can make a list
//      to your own liking.

// 2. Your app should take the topics in this array and create 
//  buttons in your HTML.
//      * Try using a loop that appends a button for each string 
//      in the array.

// 3. When the user clicks on a button, the page should grab 10
//  static, non-animated gif images from the GIPHY API and place them 
//  on the page. 

// 4. When the user clicks one of the still GIPHY images, the gif 
//  should animate. If the user clicks the gif again, it should stop playing.

// 5. Under every gif, display its rating (PG, G, so on). 
//      * This data is provided by the GIPHY API.
//      * Only once you get images displaying with button presses should 
//      you move on to the next step.

// 6. Add a form to your page takes the value from a user input box 
//  and adds it into your `topics` array. Then make a function call 
//  that takes each topic in the array remakes the buttons on the page.

$(document).ready(function() {

    var dinoTopics = ["tyrannosaurus", "brachiosaurus", "brontosaurus", "velociraptor", "liopleurodon", "triceratops", "stegosaurus", "iguanodon"];

    console.log(dinoTopics);

    function showButtons() {
        $("#dino-div").empty();

        for (var i = 0; i < dinoTopics.length; i++) {

            var createButton = $("<button>");

            createButton.addClass("btn btn-info dino-btn");

            createButton.attr("data-value", dinoTopics[i]);

            createButton.text(dinoTopics[i]);

            $("#dino-div").append(createButton);
        };
    };

    showButtons();

    function addButton() {
        // event.preventDefault();
        var newDino = $("#dino-input").val().trim();
        if (newDino !== "") {
            dinoTopics.push(newDino);
            console.log("newDino: " + newDino)
            showButtons();
        } else {
            alert("You forgot your dinosaur.")
        }
        $("#dino-input").val("");
        return false;
    }

    $("#add-dino").click(addButton);






    function dinoGifs() {
        $("#show-gifs").empty();

        var chooseDino = $(this).attr("data-value");

        var queryURL = "https://api.giphy.com/v1/gifs/search";

        $.ajax({
            url: queryURL,
            method: 'GET',
            data: {
                api_key: "dc6zaTOxFJmzC",
                q: chooseDino,
                limit: 10
            }
        }).done(function(response) {
            dinoMoving = [];
            dinoStill = [];


            for (var i = 0; i < response.data.length; i++) {

                var moveImageURL = response.data[i].images.original.url;
                dinoMoving.push(moveImageURL);
                console.log("moveImageURL: " + moveImageURL)

                var stillImageURL = response.data[i].images.original_still.url;
                dinoStill.push(stillImageURL);
                console.log("stillImageURL: " + stillImageURL);

                var rating = response.data[i].rating;
                console.log("rating: " + rating);

                var dinoDiv = $("<div>");
                // dinoDiv.attr("class", "image");
                dinoDiv.attr("id", "image" + i);
                dinoDiv.attr("class", "thumbnail");

                var dinoRating = $("<p>").text("Rated: " + rating);
                // dinoRating.attr("class", "col-sm-6 col-xs-6");
                // var dinoBreak = $("<br>");
                var dinoImage = $("<img>");
                dinoImage.attr("src", stillImageURL);
                dinoImage.attr("class", "image");
                dinoImage.attr("data-state", "still");
                dinoImage.attr("data-index", i);
                console.log("data-index: " + i);


                dinoDiv.append(dinoRating);
                // dinoDiv.append(dinoBreak);
                dinoDiv.append(dinoImage);

                $("#show-gifs").append(dinoDiv);
            }

            console.log("dinoMoving array: " + dinoMoving);
            console.log("dinoStill array: " + dinoStill);

        });

    };

    $(document).on("click", ".image", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        var index = $(this).attr("data-index");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", dinoMoving[index]);
            $(this).attr("data-state", "animate");
            console.log("setting data state to animate: " + dinoMoving[index]);
        } else {
            $(this).attr("src", dinoStill[index]);
            $(this).attr("data-state", "still");
        }
    });

    $(document).on("click", ".dino-btn", dinoGifs);


});
