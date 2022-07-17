const DEFAULT_DATE_LIMIT = 1640998861000; //1657908064800

function processQuery(query) {
  const limit = Math.abs(query.date) || DEFAULT_DATE_LIMIT;

  return { limit };
}

/* function validateNodeName(NODES, nodeName) {
  const nodeInfo = _.find(NODES, (node) => {
    console.log(node.nodeName);
    return node.nodeName === nodeName;
  });

  return nodeInfo ? true : false;
} */

module.exports = { processQuery };
