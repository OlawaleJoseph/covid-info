export default (data, caseType = 'cases') => {
  let res = []
  let previousData;
  const info = data[caseType] || data['timeline'][caseType]
  for (let date in info) {
    if (previousData) {
      const newData = {
        x: date,
        y: (info[date] - previousData)
      }
      res.push(newData)
    }
    previousData = info[date]
  }
  return res
}
