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
    parkRow.className = 'row light-brown-bg border-r5 park-marg';
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
    parkName.setAttribute('id', 'parkname');
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
    visitBtn.className = 'col-20 btn green-bg black-t';
    visitBtn.textContent = 'Need to go!';
    visitBtn.setAttribute('data-id', i);
    parkBtn.appendChild(visitBtn);

    var form = document.createElement('form');
    form.setAttribute('data-dig', i);
    form.className = 'hidden';
    colPark.appendChild(form);

    var comment = document.createElement('div');
    comment.className = 'row green-bg border-r5 text-tb';
    form.appendChild(comment);

    var commentSec = document.createElement('div');
    commentSec.className = 'col-90';
    comment.appendChild(commentSec);

    var submitSec = document.createElement('div');
    submitSec.className = 'col-10';
    comment.appendChild(submitSec);

    var textA = document.createElement('textarea');
    textA.setAttribute('id', 'comment');
    textA.className = 'text-marg border-r5';
    textA.setAttribute('rows', '2');
    textA.setAttribute('placeholder', 'Comment your thoughts here..');
    textA.setAttribute('name', i);
    commentSec.appendChild(textA);

    var submitBtn = document.createElement('button');
    submitBtn.setAttribute('id', 'sub');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.setAttribute('data-num', i);
    submitBtn.setAttribute('name', i);
    submitBtn.className = 'text-marg border-r5';
    submitBtn.textContent = 'Submit';
    submitSec.appendChild(submitBtn);

    $uList.appendChild(park);
  }

  var $park = document.querySelectorAll('li');
  var $visitBtn = document.querySelectorAll('[data-id]');
  var $searchRow = document.querySelector('.center');
  var $name = document.querySelectorAll('#parkname');
  var $input = document.querySelector('input');
  var $comment = document.querySelectorAll('form');
  var $empty = document.querySelector('.msg-center');

  for (var d = 0; d < data.status.length; d++) {
    var visits = Number(data.status[d]);
    $visitBtn[visits].textContent = 'Been there!';
    $visitBtn[visits].className = 'col-20 btn brown-bg white-t';
  }

  if (data.view === 'visited') {
    storeID();
    $searchRow.className = 'hidden';
    search();
    storeComment();
    if (data.status.length === 0) {
      $empty.className = 'row msg-center';
    }
  } else if (data.view === 'list') {
    storeButton();
    $searchRow.className = 'row center';
  }

  function storeID() {
    for (var p = 0; p < $park.length; p++) {
      if ($visitBtn[p].textContent === 'Need to go!') {
        $park[p].className = 'hidden';
        data.view = 'visited';
      }
      for (var u = 0; u < data.status.length; u++) {
        var index = data.status[u];
        if ($park[p].getAttribute('id') === index) {
          $park[Number(index)].className = '';
          $visitBtn[Number(index)].className = 'hidden';
          $comment[Number(index)].className = '';
        }
      }
    }
  }

  function storeComment() {
    for (var w = 0; w < $comment.length; w++) {
      for (var property in data.comment) {
        if ($comment[w].dataset.dig === property.toString()) {
          $comment[w].elements[0].textContent = data.comment[w];
          data.comment[w] = $comment[w].elements[0].value;
          $comment[w].elements[1].className = 'hidden';
          $comment[w].elements[0].className = 'text-marg border-r5 green-bg';
        }
      }
    }
  }

  function storeButton() {
    for (var r = 0; r < $park.length; r++) {
      if ($visitBtn[r].textContent === 'Need to go!') {
        $park[r].className = '';
        data.view = 'list';
      }
      for (var x = 0; x < data.status.length; x++) {
        var findex = data.status[x];
        if ($park[r].getAttribute('id') === findex) {
          $park[Number(findex)].className = '';
          $visitBtn[Number(findex)].className = 'col-20 btn brown-bg white-t';
          $visitBtn[Number(findex)].textContent = 'Been there!';
          $comment[Number(findex)].className = 'hidden';
        }
      }
    }
  }

  function visitButton(e) {
    var btnPress = e.target.getAttribute('data-id');
    for (var b = 0; b < $park.length; b++) {
      if ((btnPress === $park[b].getAttribute('id')) && ($visitBtn[b].textContent === 'Need to go!')) {
        $visitBtn[b].textContent = 'Been there!';
        $visitBtn[b].className = 'col-20 btn brown-bg white-t';
        data.status.push($visitBtn[b].dataset.id);
      } else if ((btnPress === $park[b].getAttribute('id')) && ($visitBtn[b].textContent === 'Been there!')) {
        $visitBtn[b].textContent = 'Need to go!';
        $visitBtn[b].className = 'col-20 btn green-bg black-t';
        for (var property in data.comment) {
          if ($comment[b].dataset.dig === property.toString()) {
            $comment[b].elements[0].textContent = '';
            $comment[b].elements[1].className = '';
            $comment[b].elements[0].className = 'text-marg border-r5';
            delete data.comment[b];
          }
        }
        data.status.pop();
      }
    }
  }

  function swapView(e) {
    if (e.target === visitA[1]) {
      storeID();
      $searchRow.className = 'hidden';
      search();
      storeComment();
      if (data.status.length === 0) {
        $empty.className = 'row msg-center';
      }
    } else if (e.target === visitA[0]) {
      storeButton();
      $searchRow.className = 'row center';
      $empty.className = 'row msg-center hidden';
    }
  }

  function submitButton(e) {
    e.preventDefault();
    var subDig = e.target.dataset.dig;
    for (var k = 0; k < $comment.length; k++) {
      if ($comment[k].className !== 'hidden') {
        $comment[subDig].elements[0].textContent = $comment[subDig].elements[0].value;
        data.comment[subDig] = $comment[subDig].elements[0].value;
        $comment[subDig].elements[1].className = 'hidden';
        $comment[subDig].elements[0].className = 'text-marg border-r5 green-bg';
      }
    }
  }

  for (var z = 0; z < $comment.length; z++) {
    $comment[z].addEventListener('submit', submitButton);
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
