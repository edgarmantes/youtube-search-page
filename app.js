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
  var resultElement = '';
  if (data.items) {
    data.items.forEach(function(data) {
     resultElement += '<li><a href="https://www.youtube.com/watch?v=' + data.id.videoId + '" target="_blank"><img src="' + data.snippet.thumbnails.medium.url + '"></a></li>';
      
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }
  
  $('.js-search-results').html(resultElement);
}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displaySearchData);
  });
}

$(function(){watchSubmit();});





// <div class="col-4"> <div class="box rey"> <img src="images/rey_square.png"><div class="description"><h3 class="name">Ray</h3><p class="desc">Protagonist, from Tatooine</p></div></div></div>