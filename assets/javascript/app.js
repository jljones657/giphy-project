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
  });
  // Adding click event listen listener to all buttons
  $("button").on("click", function() {
    // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr("data-animal");
    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
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
          // Appending the paragraph and image tag to the animalDiv
          animalDiv.append(p);
          animalDiv.append(animalImage);
          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#Im-a-gif-motherfucker").prepend(animalDiv);

        }

      });
  });
});