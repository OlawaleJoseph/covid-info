import numeral from 'numeral';

export const formatNumber = (num) => (
  num ? `+${numeral(num).format("0.0a")}` : '+0'
)
