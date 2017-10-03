// address_city
// address_state
// address_zip

const formatAddress = (address, cb) => {
  const addressObj = {};
  const trim = address.trim();
  const addressArr = trim.split('<br>');

  addressObj.address_street = addressArr[0];

  cb(addressArr);
}

export default formatAddress;
