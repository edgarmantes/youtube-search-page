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
  	console.log(data.items);
    data.items.forEach(function(data) {
     var templete = $('.col-4');
     var new_child = $(templete[0]).clone();
     console.log(new_child);
     new_child.find('a').attr('href', data.id.videoId);
    new_child.find('img').attr('src', data.snippet.thumbnails.medium.url);
   // console.log(new_child);
    $('.js-search-results').append(new_child);
    //resultElement += <div class="col-4"> <div class="box rey"> <img src="images/rey_square.png"><div class="description"><h3 class="name">Ray</h3><p class="desc">Protagonist, from Tatooine</p></div></div></div>

    });
  }
  else {
    resultElement += '<p>No results</p>';
  }
  
  //$('.js-search-results').html(resultElement);
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