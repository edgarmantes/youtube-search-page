var youtube_search = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  var query = {
    part: 'snippet',
    q: searchTerm,    
    key: 'AIzaSyBN_2IeT7Ez2Wp2gsecionVgTUc4uL-hh4',
  }
  $.getJSON(youtube_search, query, callback);
}


function displaySearchData(data) {
    var result = '';
    console.log(data)
   
    if (data.items.length !== 0) {
     	data.items.forEach(function(data) {
     			var col = $('<div>').addClass('col-4');
     			var box = $('<div>').addClass('box');
     			var desc = $('<div>').addClass('description');
     			var href = $('<a>').attr('href', 'https://www.youtube.com/watch?v=' + data.id.videoId).attr('target', '_blank');
     			var image = $('<img>').attr('src', data.snippet.thumbnails.medium.url);
     			var title = $('<p>').text(data.snippet.description);
     			var remove = $('<button>').attr('input', 'button').attr('class','remove').text('Delete');

     			var titl = $(desc).append(title).append('<br>').append(remove);
     			

     			var boxy = $(box).append(image).append(titl);
     			var link = $(href).append(boxy);
     			

     			//var boxy = $(box).append(href).append(titl)
     			var col4 = $(col).append(link);
     			$('.js-search-results').append(col4);
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
    getDataFromApi(query, displaySearchData);
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

