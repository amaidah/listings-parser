const $indexForm = document.querySelector('.index-form'),
      $indexInput = document.querySelector('#index-input');

const handleFormSubmit = evt => {
  evt.preventDefault();
  let val = $indexInput.value;

  superagent
    .get('/request')
    .query({ val })
    .end( (err, res) => {
      console.log(res.body);
    })

  // $indexInput.value = '';
}

$indexForm.addEventListener('submit', handleFormSubmit);
