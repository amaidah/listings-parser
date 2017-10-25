import { validateString } from './validate';

const getRatingsCount = (ratingsTable, ch) => {
  const ratings = {};
  const ratingsRows = ch(ratingsTable).children();

  for (let i = 0; i < ratingsRows.length; i++) {
    const label = validateString(ch(ratingsRows[i]).find('.histogram_label').text());
    let labelNum;

    // extract number from label and check equality using two methods
    if (label.charAt(0) === label.replace(/\D/g, '')) {
      labelNum = label.replace(/\D/g, '');
    }

    const ratingsCount = validateString(ch(ratingsRows[i]).find('.histogram_count').text())
    ratings[`${labelNum}_star`] = ratingsCount;
  }

  return ratings;
}

export default getRatingsCount;
