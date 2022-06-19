var $uList = document.querySelector('ul');
var visitA = document.querySelectorAll('a');
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
  var $searchRow = document.querySelector('.center');
  var $name = document.querySelectorAll('h2');
  var $input = document.querySelector('input');

  function visitButton(e) {

    var btnPress = e.target.getAttribute('data-id');
    for (var b = 0; b < $park.length; b++) {
      if ((btnPress === $park[b].getAttribute('id')) && ($button[b].textContent === 'Need to go!')) {
        $button[b].textContent = 'Been there!';
        $button[b].className = 'col-20 btn brown-bg white-t';
        data.status.push($button[b].dataset.id);
      } else if ((btnPress === $park[b].getAttribute('id')) && ($button[b].textContent === 'Been there!')) {
        $button[b].textContent = 'Need to go!';
        $button[b].className = 'col-20 btn green-bg';
        data.status.pop();
      }
    }
  }

  for (var d = 0; d < data.status.length; d++) {
    var visits = Number(data.status[d]);
    $button[visits].textContent = 'Been there!';
    $button[visits].className = 'col-20 btn brown-bg white-t';
  }

  function swapView(e) {
    if (e.target === visitA[1]) {
      for (var p = 0; p < $park.length; p++) {
        if ($button[p].textContent === 'Need to go!') {
          $park[p].className = 'hidden';
          data.view = 'visited';
        }
        for (var u = 0; u < data.status.length; u++) {
          var index = data.status[u];
          if ($park[p].getAttribute('id') === index) {
            $park[p].className = '';
          }
        }
      }
      $searchRow.className = 'hidden';
      search();
    } else if (e.target === visitA[0]) {
      for (var r = 0; r < $park.length; r++) {
        if ($button[r].textContent === 'Need to go!') {
          $park[r].className = '';
          data.view = 'list';
        }
      }
      $searchRow.className = 'row center';
    }
  }

  if (data.view === 'list') {
    for (var q = 0; q < $park.length; q++) {
      $park[q].className = '';
    }
  } else if (data.view === 'visited') {
    for (var e = 0; e < $park.length; e++) {
      for (var x = 0; x < data.status.length; x++) {
        if (data.status[x] !== $park[e].getAttribute('id')) {
          $park[e].className = 'hidden';
        }
      }
    }
  }

  function search() {
    if (data.view !== 'visited') {
      var $search = document.querySelector('#search').value;
      for (var y = 0; y < $name.length; y++) {
        if ($name[y].textContent.toLowerCase().includes($search.toLowerCase())) {
          $park[y].className = '';
        } else {
          $park[y].className = 'hidden';
        }
      }
    } else if (data.view === 'visited') {
      document.querySelector('#search').value = '';
      document.querySelector('input').value = '';
    }
  }

  $input.addEventListener('keyup', search);
  document.addEventListener('click', swapView);
  document.addEventListener('click', visitButton);

});

xhr.send();
