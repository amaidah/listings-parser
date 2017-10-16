const extractValue = (nodeParent) => {
  let value = null;

  // validate cc_accepted exists and 'dd' child exists
  if (nodeParent != null && nodeParent.children('dd') != null) {
    // get value from 'dd' child, trim, and store
    value = nodeParent.children('dd').text().trim();
  }
  return value;
}


const getDataBizTable = (table, matchStr, ch) => {
  let matchedNodeParent = null;

  // use es6 for.. of to allow break on first match
  for (let node of table) {
    // match node's first child text node
    if (ch(node).html().trim() === matchStr) {
      // save closest 'dl' parent to get access to inner text nodes
      matchedNodeParent = ch(node).closest('dl');
      break;
    }
  }

  return extractValue(matchedNodeParent);
}

export default getDataBizTable;
