
// This is the YouTube API call Object. It also has a prototypical inheritance of the 'callAPI' method
var Data = function(searchTerm, callback){
  this.url = 'https://www.googleapis.com/youtube/v3/search';
  this.query = {
    part: 'snippet',
    q: searchTerm,
    key: 'AIzaSyBN_2IeT7Ez2Wp2gsecionVgTUc4uL-hh4',
  }
  console.log(typeof(Data.callAPI));
}


// The API call to YouTube
Data.prototype.callAPI = function(){
  $.getJSON(url, query, callback);
}

// Captures data from Youtube API and has a prototypical inheritance of the 'render' method
var Items = function(data){
  this.col = $('<div>').addClass('col-4');
  this.box = $('<div>').addClass('box');
  this.desc = $('<div>').addClass('description');
  this.href = $('<a>').attr('href', 'https://www.youtube.com/watch?v=' + data.id.videoId).attr('target', '_blank');
  this.image = $('<img>').attr('src', data.snippet.thumbnails.medium.url);
  this.title = $('<p>').text(data.snippet.description);
  this.remove = $('<button>').attr('input', 'button').attr('class','remove').text('Delete');

   
}

// This renders method that is inherited by Items object
Items.prototype.render = function(){
  var titl = $(desc).append(title).append('<br>').append(remove)
        

  var boxy = $(box).append(image).append(titl);
  var link = $(href).append(boxy);
        

  var col4 = $(col).append(link);
  $('.js-search-results').append(col4);
};



function displaySearchData(data) {
   
    if (data.items.length !== 0) {
     	data.items.forEach(function(data) {
        var item = Items();
        item.render(data);
        }); 	
    } else {
    	var result = $('<p>').text('No results');
		$('.js-search-results').append(result);
    }

}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();	
	  $('.js-search-results').empty();    
    var query = $(this).find('.js-query').val();
    Data(query, displaySearchData);
    Data.callAPI();
    $('.js-query').val('');
  });

  $('.js-search-results').on('click', '.remove', function(e){
  	e.preventDefault();
  	$(this).closest('.col-4').remove();
  });

}

$(document).ready(function(){
	watchSubmit();
});

