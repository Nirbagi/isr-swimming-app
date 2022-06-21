function ExtractScoresArrays(params, scores) {
  let data = [];
  let dates = [];
  for (const [idx, value] of Object.entries(scores)) {
    data.push(value[params.score_type]);
    dates.push(value["created_at"]);
  }
  return { data: data, dates: dates };
}

module.exports = { ExtractScoresArrays };
