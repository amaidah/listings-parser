import { showLoader, hideLoader } from './utils/loader';

const $indexForm = document.querySelector('.index-form'),
      $indexInput = document.querySelector('#index-input'),
      $txtMsg = document.querySelector('.text-msg'),
      $recentBtn = document.querySelector('.recent-btn'),
      $dlBtn = document.querySelector('.dl-btn'),
      $btnWrap = document.querySelector('.btn-wrap');

let mostRecent;

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  let val = $indexInput.value;

  showLoader();

  superagent
    .get('/request')
    .query({ val })
    .end( (err, res) => {
      hideLoader();
      $indexInput.value = '';

      // success
      if (!err && res.status === 200 && res.body.status !== 404) {
        mostRecent = res.body;

        // only add a parse listener after something has parsed
        $recentBtn.addEventListener('click', handleRecentBtn);
        $dlBtn.addEventListener('click', handleDlBtn);
        $btnWrap.style.opacity = 1;

        // remove msg on new parse
        $txtMsg.textContent = '';
      }
      if (res.body.status === 404) {
        $txtMsg.textContent = '404';
      }
    })
}

$indexForm.addEventListener('submit', handleFormSubmit);

const handleRecentBtn = (evt) => {
  let data = JSON.stringify(mostRecent);
  let tab = window.open();
  tab.document.body.innerHTML = data;
  tab.document.close();
}

const handleDlBtn = (evt) => {

  superagent
    .post('/download')
    .send(mostRecent)
    .end( (err, res) => {
      if (!err && res.status === 200) {
        $txtMsg.textContent = res.text;

        // remove listeners after dl
        $recentBtn.removeEventListener('click', handleRecentBtn);
        $dlBtn.removeEventListener('click', handleDlBtn);
        $btnWrap.style.opacity = 0;
      }
    })
}
