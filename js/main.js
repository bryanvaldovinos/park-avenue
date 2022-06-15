var $uList = document.querySelector('ul');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://developer.nps.gov/api/v1/parks?stateCode=CA&limit=100&start=0&api_key=QMo4UWEHDizxave1sLvRhoCDJriTI0ifxOZTiwYS');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  for (var i = 0; i < xhr.response.data.length; i++) {
    var liItem = xhr.response.data[i];

    var park = document.createElement('li');

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

    $uList.appendChild(park);
  }
});

xhr.send();
