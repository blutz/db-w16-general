$(document).ready(function() {
  var REQUEST_URL = 'https://crossorigin.me/http://quandyfactory.com/insult/json';
  var insultContainer = $('#insultContainer');
  var responses = {
    insults: [],
    firstLoad: false,
    hasError: false
  };
  var template = Handlebars.compile($('#insultTemplate').html());
  $('#getAnotherInsult').click(getInsult);
  renderInsult();

  function getInsult() {
    $.get(REQUEST_URL).then(function(resp) {
      responses.insults.push(resp);
      responses.hasError = false;
    }).catch(function() {
      responses.hasError = true;
    }).always(function() {
      responses.firstLoad = true;
      renderInsult();
    });
  }

  function renderInsult() {
    var templateHtml = template(responses);
    insultContainer.empty()
    insultContainer.html(templateHtml);
  }
});
