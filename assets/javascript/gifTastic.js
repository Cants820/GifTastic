//GifTastic

//Array that will contain all the giphys theme countries
  var topics = ["United States", "United Kingdom", "Puerto Rico", "Mexico", "Brazil","Philippines", "Japan", "China", "India","Portugal", "Indonesia", "France"];



 //To display country buttons
  function renderCountry() {
//To stop repeating buttons when a adding new buttons
    $("#country-buttons").empty()
//to generate buttons
    for (var i=0; i < topics.length; i++){
//create a new html element inside country-buttons div
        var newCountry = $("<button>");
        newCountry.attr("id", topics[i]);
        newCountry.attr("class","gif-button");
        newCountry.attr("data-country",topics[i]);
        newCountry.text(topics[i]);

//display onto html
       $("#country-buttons").append(newCountry);
    }
  } 
//toogles giphys to stop and play
$(document).on("click", ".giphys", function(){
  
  var state = $(this).attr("data-state");

  if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state","animate");
    } else {
      $(this).attr("src",$(this).attr("data-still","animate"));
      $(this).attr("data-state","still");
    }

});



//listens to every button click
  $(document).on("click", ".gif-button",function() {
    // console.log($(this).attr("data-country"));
    // console.log($(this).attr("data-country"))
    //grabbing and storing data-country into a button
     var country = $(this).attr("data-country");     
     country = country.replace(" ", "+");
    // console.log("country button " + country);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + country + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(country);
   

  //call API request
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log("inside the ajax response");

      // console.log("queryURL= " + queryURL)
      console.log("queryURL " + queryURL);
      

  //shows gifs with a limit of 10
      var results = response.data;
      for (var i = 0; i < results.length; i++){
      console.log("results length ", results.length);
      
  //div to store and displays giphys 
        var countryDiv = $("<div>");
         // console.log("results "+ results[i].images.fixed_height_still.url);
  //giphys ratings
      var p = $("<p>").text("Rating:" + results[i].rating);
  //giphy image
      var countryImage = $("<img>");
        console.log(countryDiv);
        countryImage.attr("src", results[i].images.fixed_height_small_still.url);
        countryImage.attr("data-animate",results[i].images.fixed_height_small_still.url);
        countryImage.attr("data-still",results[i].images.fixed_height_small_still.url);
        countryImage.attr("data-state","still");
        countryImage.attr("class", "giphys");
        countryDiv.prepend(p);
        countryDiv.prepend(countryImage);
  //display Gifs onto html
        // console.log("country div " + countryDiv);
        $("#display-countries").prepend(countryDiv);

    


      }
    }); //end response

  }); //end button listener


//add Movie Button
  $(".submit-button").on("click",function() {

    event.preventDefault();
    //grab texts 

    var country = $("#country-input").val().trim();
    
    //prevents adding empty buttons
    if (country === ""){
        
    } else {
        topics.push(country);
        console.log(topics);
        renderCountry();
    }
    
    
 
  });

 renderCountry();

 

//Pseudo Code
//the Page Loads with all the buttons generated from an API - Gifphy 
//Create Buttons
//Once a button is clicked it loads 10 gifs with Ratings and thumbnail
//Once the Gif is clicked it plays a video

//On the right hand side of the page a textbox with that adds a button that is populated from an array. button values are coming from Gifphy API
