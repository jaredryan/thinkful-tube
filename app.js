var YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


var RESULT_HTML_TEMPLATE = (
  '<div class="video-links">' +
      '<a class="js-link" href=""><img class="js-result thumbnails" src=""></a>' + 
      '<div class="link"><a class="js-channel-link channel-link" href=""></a></div>' + 
  '</div>'
);

function getDataFromApi(searchTerm, callback) {
  var query = {
    q: searchTerm,
    maxResults: 5,
    key: "AIzaSyCnT9rjLPXWza8QhHEuoLJBCZhlsJDf1TM",
    part: "snippet",
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}


function renderResult(result) {
  console.log(result);
  var template = $(RESULT_HTML_TEMPLATE);
  template.find(".js-result").attr("src", result.snippet.thumbnails.medium.url);
  template.find(".js-link").attr("href", "https://www.youtube.com/watch?v=" + 
                                  result.id.videoId);
  template.find(".js-channel-link").text("Channel: " + result.snippet.channelTitle);
  template.find(".js-channel-link").attr("href", "https://www.youtube.com/channel/" + 
                                         result.snippet.channelId);
  return template;
}

function displaySearchData(data) {
  var results = data.items.map(function(item, index) {
     return renderResult(item);
  });
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    // ALL OF THE ABOVE WILL REMAIN THE SAME
    getDataFromApi(query, displaySearchData);
  });
}

// WILL NOT CHANGE THIS
$(watchSubmit);
