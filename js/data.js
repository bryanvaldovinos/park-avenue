/* exported data */
var data = {
  view: 'list',
  status: []
};

var previousParksJSON = localStorage.getItem('Data Info:');
if (previousParksJSON !== null) {
  data = JSON.parse(previousParksJSON);
}

function local(event) {
  var visitedJSON = JSON.stringify(data);
  localStorage.setItem('Data Info:', visitedJSON);
}

window.addEventListener('beforeunload', local);
