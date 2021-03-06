import { validate } from './validate';

const splitCityStateZip = (addressLine) => {
  const lineArr = addressLine.split(',');
  const city = lineArr[0];
  const stateZipArr = lineArr[1].trim().split(' ');
  const state = stateZipArr[0];
  const zip = stateZipArr[1];
  return {
    city,
    state,
    zip,
  }
}

const formatAddress = (address) => {
  if (validate(address) == null) {
    return null;
  }

  const addressObj = {};
  const trim = address.trim();
  const addressArr = trim.split('<br>');
  const length = addressArr.length;

  addressObj.one = addressArr[0];
  addressObj.two = null;

  // if array is longer than 2, means there is an address 2 line
  if (length > 2) {
    addressObj.two = addressArr[1];
  }

  // extract city, state, zip from last value in array
  const cityStateZipObj = splitCityStateZip(addressArr[length - 1])
  const { city, state, zip } = cityStateZipObj;
  addressObj.city = city;
  addressObj.state = state;
  addressObj.zip = zip;
  console.log(addressObj);

  return addressObj;
}

export default formatAddress;
