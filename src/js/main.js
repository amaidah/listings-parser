const $indexForm = document.querySelector('.index-form'),
      $indexInput = document.querySelector('#index-input'),
      $recentBtn = document.querySelector('.recent-btn');

let mostRecent;

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  let val = $indexInput.value;

  superagent
    .get('/request')
    .query({ val })
    .end( (err, res) => {
      if (!err && res.status === 200) {
        console.log(res.body);
        mostRecent = res.body;
        $recentBtn.addEventListener('click', handleRecentBtn);
        $recentBtn.style.opacity = 1;
      }
    })

  // $indexInput.value = '';
}

$indexForm.addEventListener('submit', handleFormSubmit);

const handleRecentBtn = (evt) => {
  let url = window.location.origin;
  let data = JSON.stringify(mostRecent);
  let tab = window.open();
  tab.document.body.innerHTML = data;
  tab.document.close();
  $recentBtn.style.opacity = 0;
  $recentBtn.removeEventListener('click', handleRecentBtn);
}
