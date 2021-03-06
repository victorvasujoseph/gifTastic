console.log('connected!!');

var APIKey = "LAtnaywJKN0ew1XgfbM1cn55gT1V1z80";
var url = "https://api.giphy.com/v1/gifs/search";
var limit = 10;

var topics = [
    "cat",
    "dog",
    "rabbit",
    "hamster",
    "skunk",
    "goldfish",
    "turtle"];


var addButtons = function (){
    topics.forEach(function (val){
        createButtons(val);
    });
}

var createQueryString = function(animalName){
    return (url + "?q=" + animalName + "&api_key=" + APIKey + "&limit=" + limit);
}

var createButtons = function(btnName){

    var btn = $("<button>");
    btn.attr("id","id-" + btnName);
    btn.css("margin","5px");
    btn.attr("type","button");
    btn.addClass("btn btn-primary");
    btn.val(btnName);
    btn.text(btnName);

    btn.on('click', function(){
        clear();    
        var queryString = createQueryString($(this).text());
        getGifs(queryString);
    });

    $('#row-top').append(btn);
}

addButtons();

$('#btn-submit').on('click', function(event) {

    event.preventDefault();
    var newAnimal = $('#text-box').val().trim();
    $('#text-box').val('');
    console.log(typeof newAnimal.length);
    if(newAnimal.length !== 0){
        topics.push(newAnimal);
        createButtons(newAnimal);
    }
});

var getGifs = function(queryURL){

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        addImageDiv(response.data);
      });
}

var addImageDiv = function(data){ 
    data.forEach(function(val){
        var imgDiv = $("<div>"); 
        imgDiv.css("text-align","center");
        imgDiv.css("margin","5px");
        imgDiv.addClass("border border-primary");
        imgDiv.append(createImage(val));
        imgDiv.append(createRating(val));
        $('#container-image').append(imgDiv);
    })
}

var createRating = function(data){
    var p = $("<p>");
    p.text("rating : " +data.rating);
    return p;
}

var createImage = function(data){
    console.log(data);
    var img = $("<img>");
    img.attr("id",data.id);
    img.attr("src",data.images.fixed_height_still.url);
    img.attr("data-still",data.images.fixed_height_still.url);
    img.attr("data-animate",data.images.fixed_height.url);
    img.attr("data-state","still");

    img.on("click", function() {
    
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
      
    return img;
}

var clear = function(){
    $('#container-image').empty();
}

