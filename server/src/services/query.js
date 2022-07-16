const DEFAULT_DATE_LIMIT = 1640998861000; //1657908064800

function processQuery(query) {
  const limit = Math.abs(query.date) || DEFAULT_DATE_LIMIT;

  return { limit };
}

module.exports = { processQuery };
