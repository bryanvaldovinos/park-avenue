/* exported data */
var data = {
  view: 'list',
  status: [],
  comment: {}
};

var previousParksJSON = localStorage.getItem('park-info');
if (previousParksJSON !== null) {
  data = JSON.parse(previousParksJSON);
}

function local(event) {
  var visitedJSON = JSON.stringify(data);
  localStorage.setItem('park-info', visitedJSON);
}

window.addEventListener('beforeunload', local);
window.addEventListener('pagehide', local);
