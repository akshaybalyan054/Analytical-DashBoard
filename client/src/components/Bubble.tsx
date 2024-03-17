import { useEffect, useState } from 'react'
import axios from 'axios'
import { Bubble } from 'react-chartjs-2'
import faker from 'faker'
import Typography from '@mui/material/Typography'

function BubbleChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'chartDataLabels',
        data: [],
      },
    ],
  })

  useEffect(() => {
    // Make an HTTP GET request to your API or MongoDB database
    axios
      .get('http://localhost:3000/akshayAssignment') // Replace with your API endpoint
      .then(response => {
        const fetchedData = response.data.slice(0, 1000)

        const uniqueTopics = new Set()
        const chartDataLabels = []

        fetchedData.forEach((item: { topic: unknown }) => {
          if (!uniqueTopics.has(item.topic)) {
            uniqueTopics.add(item.topic)
            chartDataLabels.push(item.topic)
          }
        })

        const randomData = Array.from({ length: 50 }, () => ({
          x: faker.datatype.number({ min: 0, max: 100 }),
          y: faker.datatype.number({ min: 0, max: 100 }),
          r: faker.datatype.number({ min: 5, max: 20 }),
        }))

        setChartData({
          ...chartData,
          labels: chartDataLabels,
          datasets: [{ ...chartData.datasets[0], data: randomData }],
        })
      })
      .catch(error => {
        console.error(error)
      })
  }, []) // Removed chartData from the dependency array

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
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
        {' '}
        Topics visualisation
      </Typography>
      <Bubble options={options} data={chartData} />
    </>
  )
}

export default BubbleChart
