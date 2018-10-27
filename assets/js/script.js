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
    btn.attr("type","button");
    btn.addClass("btn btn-primary");
    btn.val(btnName);
    btn.text(btnName);

    btn.on('click', function(){
        clear();
        var queryString = createQueryString($(this).text());
        console.log(queryString);
        getGifs(queryString);
    });

    $('#row-top').append(btn);
}

addButtons();

$('#btn-submit').on('click', function(event) {

    event.preventDefault();
    clear();
    var newAnimal = $('#text-box').val();
    topics.push(newAnimal);
    console.log(topics); 
    createButtons(newAnimal);
});

var getGifs = function(queryURL){
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        addImageDiv(response.data);
        console.log(response.data);
      });
}

var addImageDiv = function(data){ 
    data.forEach(function(val){
        var imgDiv = $("<div>"); 
        imgDiv.append(createRating(val));
        imgDiv.append(createImage(val));
        $('#container-image').append(imgDiv);
    })
}

var createRating = function(data){
    var p = $("<p>");
    p.text(data.rating);
    return p;
}

var createImage = function(data){
    var img = $("<img>");
    img.attr("id",data.id);
    img.attr("src",data.images.fixed_height.url);
    return img;
}

var clear = function(){
    $('#container-image').empty();
}
