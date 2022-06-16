var $uList = document.querySelector('ul');
var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://developer.nps.gov/api/v1/parks?stateCode=CA&limit=100&start=0&api_key=QMo4UWEHDizxave1sLvRhoCDJriTI0ifxOZTiwYS');
xhr.responseType = 'json';
xhr.addEventListener('load', function parkList() {
  for (var i = 0; i < xhr.response.data.length; i++) {
    var liItem = xhr.response.data[i];

    var park = document.createElement('li');
    park.setAttribute('id', i);

    var parkRow = document.createElement('div');
    parkRow.className = 'row light-brown-bg border-r5 park-marg park-pad';
    park.appendChild(parkRow);

    var parkCol = document.createElement('div');
    parkCol.className = 'col-50 marg';
    parkRow.appendChild(parkCol);

    var parkImg = document.createElement('img');
    parkImg.setAttribute('src', liItem.images[0].url);
    parkImg.className = 'border-r5';
    parkCol.appendChild(parkImg);

    var colPark = document.createElement('div');
    colPark.className = 'col-50 marg';
    parkRow.appendChild(colPark);

    var textArea = document.createElement('div');
    textArea.className = 'white-bg info-pad border-r5';
    colPark.appendChild(textArea);

    var parkName = document.createElement('h2');
    parkName.textContent = liItem.fullName;
    textArea.appendChild(parkName);

    var parkBio = document.createElement('p');
    parkBio.textContent = liItem.description;
    textArea.appendChild(parkBio);

    var parkAddy = document.createElement('p');
    var address = liItem.addresses[0];
    parkAddy.textContent = 'Address: ' + address.line1 + ', ' + address.city + ', ' + address.stateCode + ', ' + address.postalCode;
    textArea.appendChild(parkAddy);

    var parkBtn = document.createElement('div');
    parkBtn.className = 'row flex-r';
    colPark.appendChild(parkBtn);

    var visitBtn = document.createElement('button');
    visitBtn.type = 'button';
    visitBtn.className = 'col-20 btn green-bg';
    visitBtn.textContent = 'Need to go!';
    visitBtn.setAttribute('data-id', i);
    parkBtn.appendChild(visitBtn);

    $uList.appendChild(park);
  }
  var $park = document.querySelectorAll('li');
  var $button = document.querySelectorAll('button');

  function visited(e) {
    var btnPress = e.target.getAttribute('data-id');
    for (var b = 0; b < $park.length; b++) {
      if ((btnPress === $park[b].getAttribute('id')) && ($button[b].textContent === 'Need to go!')) {
        $button[b].textContent = 'Been there!';
        $button[b].className = 'col-20 btn brown-bg white-t';
      } else if ((btnPress === $park[b].getAttribute('id')) && ($button[b].textContent === 'Been there!')) {
        $button[b].textContent = 'Need to go!';
        $button[b].className = 'col-20 btn green-bg';
      }
    }
  }
  document.addEventListener('click', visited);
});

xhr.send();
