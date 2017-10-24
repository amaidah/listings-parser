import speak from './viewRecent.js';

const $indexForm = document.querySelector('.index-form'),
      $indexInput = document.querySelector('#index-input');

speak();

const handleFormSubmit = evt => {
  evt.preventDefault();
  let val = $indexInput.value;

  superagent
    .get('/request')
    .query({ val })
    .end( (err, res) => {
      if (!err && res.status === 200) {
        console.log(res.body);

      }
    })

  // $indexInput.value = '';
}

$indexForm.addEventListener('submit', handleFormSubmit);
