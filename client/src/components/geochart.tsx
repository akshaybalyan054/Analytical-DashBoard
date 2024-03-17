import { Chart } from 'react-google-charts'
import { Typography } from '@mui/material'

function GeoChart({ chartData }) {
  if (chartData === null) {
    // Data is still loading
    return <div>Loading...</div>
  }

  const data = [
    ['Country', 'likelihood'],
    ...chartData.map((item: { country: unknown; likelihood: unknown }) => [
      item.country,
      item.likelihood,
    ]),
  ]

  const options = {
    colorAxis: { colors: ['#00853f', 'aqua', '#e31b23'] },
    backgroundColor: '#2d2d34',
    datalessRegionColor: '#B9FFF8',
    defaultColor: '#f5f5f5',
  }

  return (
    <>
      {' '}
      <Typography
        variant="h4"
        component="h2"
        margin="12px"
        color="#64CCC5"
        align="center"
        bottom="40px"
      >
        Countries WITH Likelihood
      </Typography>
      <Chart
        chartEvents={[
          {
            eventName: 'select',
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart()
              const selection = chart.getSelection()
              if (selection.length === 0) return
              const region = data[selection[0].row + 1]
              console.log('Selected : ' + region)
            },
          },
        ]}
        chartType="GeoChart"
        data={data}
        options={options}
        mapsApiKey="AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"
      />
    </>
  )
}

export default GeoChart
