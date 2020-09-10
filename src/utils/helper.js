import numeral from 'numeral';

export const formatNumber = (num) => (
  num ? `+${numeral(num).format("0.0a")}` : '+0'
)

export const colors = {
  cases: {
    color: '#ffcc00',
    multiplier: 500
  },
  recovered: {
    color: '#7dd71d',
    multiplier: 600
  },
  deaths: {
    color: '#fb443b',
    multiplier: 1500
  }
}
