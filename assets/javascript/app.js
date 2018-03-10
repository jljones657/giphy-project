$(document).ready(function () {
  //Initial array of animals
  var animals = ["Cat", "Dog", "Bird", "Trash Panda"]
  //Function for displaying animal Button data
  function renderButtons() {
    //need this so there won't be repeat buttons
    $("#animalButtons").empty();
  //Looping through the array of animals
  for (var i = 0; i < animals.length; i++){
    var a = $("<button>");
    //Adding a class
    a.addClass("animal");
    //Adding a data attribute with the value of animal?
    a.attr("data-name", animals[i]);
    //Providing the button's text with a value of the animal
    a.text(animals[i]);
    //Adding the button to the HTML
    $("#animalButtons").append(a);
  }
}
  //Function tht handles events where one button is clicked
  $("#add-animal").on("click", function(event) {
    //event.preventDefault() prevents the form from trying to submit itself
    //Using a form do that the user can hit enter instead o' pressing the button. Y'know, if'n they want
    event.preventDefault();
    //THis line will grab the tet from the input box
    var animal = $("#animal-input").val().trim();
    //The animal is then added to our array
    animals.push(animal);
    //calling renderButtons because the activity did it
    renderButtons();
    //CLear that input!
    $("animal-input").val("");
  });


  
  // Adding click event listen listener to all buttons
  $(document).on("click", "button", function() {
    // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr("data-name");
    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";
      console.log(animal)
    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        $("#Im-a-gif-motherfucker").empty();
        console.log(queryURL);
        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {
          // Creating and storing a div tag
          var animalDiv = $("<div>");
          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);
          // Creating and storing an image tag
          var animalImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          animalImage.attr("src", results[i].images.fixed_height.url);
          //Getting the still, and moving version of the gif
          animalImage.attr("data-animate", results[i].images.original.url);
          animalImage.attr("data-still", results[i].images.original_still.url);
          // Appending the paragraph and image tag to the animalDiv
          animalDiv.append(p);
          animalDiv.append(animalImage);
          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#Im-a-gif-motherfucker").prepend(animalDiv);
        }

        //please let the pausing work
        animalImage.on('click', function(){

          var state = $(this).attr('data-state');

          if (state === 'still') {
              $(this).attr("src", $(this).attr('data-animate'));
              $(this).attr('data-state', 'animate');
              console.log('still');
          } else {
              $(this).attr('src', $(this).attr('data-still'));
              $(this).attr('data-state', 'still');
              console.log('animate');
          }

      });


      }); 

  });
});