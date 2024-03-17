import DashboardBox from '@/components/DashboardBox'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import 'chart.js/auto' // ADD THIS
import Chart from 'react-google-charts'
import Resposive from '@/components/Responsive'
import Datatable from '@/components/tables'
import GeoChart from '@/components/geochart'
import { ThreeCircles } from 'react-loader-spinner'

const Row1 = () => {
  const [loading, setLoading] = useState(true) // Add loading state

  const [data, setdata] = useState({
    labels: [],
    datasets: [
      {
        label: 'likelihood',
        data: [],
        backgroundColor: [
          // 'rgba(75,192,192,1)',
          '#6F61C0',
          '#A084E8',
          '#8BE8E5',
          '#D5FFE4',
        ],
        borderColor: 'black',
        borderWidth: 2,
      },
      {
        label: 'relevance',
        data: [],
        backgroundColor: [
          // 'rgba(75,192,192,1)',
          '#ecf0f1',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0',
        ],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  })

  const [countryOptions, setCountryOptions] = useState([])
  const [sectorOptions, setSectorOptions] = useState([])
  const [topicOptions, setTopicOptions] = useState([])
  const [pestleOptions, setPestleOptions] = useState([])
  const [regionopt, setregionopt] = useState([])
  const [sourceopt, setsourceopt] = useState([])

  const [countryFilter, setCountryFilter] = useState('')
  const [sectorFilter, setSectorFilter] = useState('')
  const [topicFilter, setTopicFilter] = useState('')
  const [pestleFilter, setPestleFilter] = useState('')
  const [regionfil, setregionfil] = useState('')
  const [sourcefil, setsoucrcefil] = useState('')

  const [yeardata, setyeardata] = useState([])
  const [kdata, setkdata] = useState([])
  const [fetchedData, setfetchedData] = useState('')
  const [chartdata, setchartdata] = useState([])

  useEffect(() => {
    // Make an HTTP GET request to your API or MongoDB database

    axios
      .get('http://localhost:3000/akshayAssignment') // Replace with your API endpoint
      .then(response => {
        const fetchedData = response.data.slice(0, 100)
        setLoading(false)
        // Apply filters to the data
        const filteredData = fetchedData.filter(
          (item: {
            region: string
            source: string
            country: string
            sector: string
            topic: string
            pestle: string
          }) => {
            return (
              (countryFilter === '' || item.country === countryFilter) &&
              (sectorFilter === '' || item.sector === sectorFilter) &&
              (topicFilter === '' || item.topic === topicFilter) &&
              (pestleFilter === '' || item.pestle === pestleFilter) &&
              (regionfil === '' || item.region === regionfil) &&
              (sourcefil === '' || item.source === sourcefil)
            )
          }
        )

        // Extract the necessary data from the filtered data and update the state
        setdata({
          ...data,
          labels: filteredData
            .map((item: { sector: unknown }) => item.sector)
            .slice(0, 10),
          datasets: [
            {
              ...data.datasets[0],
              data: filteredData.map(
                (item: { likelihood: unknown }) => item.likelihood
              ),
            },
            {
              ...data.datasets[1], // Use the second dataset
              data: filteredData.map(
                (item: { relevance: unknown }) => item.relevance
              ),
            },
          ],
        })

        const uniqueCountries = [
          ...new Set(
            fetchedData.map((item: { country: unknown }) => item.country)
          ),
        ]
        const uniqueRegion = [
          ...new Set(
            fetchedData.map((item: { region: unknown }) => item.region)
          ),
        ]
        const uniqueSource = [
          ...new Set(
            fetchedData.map((item: { source: unknown }) => item.source)
          ),
        ]
        const uniqueSectors = [
          ...new Set(
            fetchedData.map((item: { sector: unknown }) => item.sector)
          ),
        ]
        const uniqueTopics = [
          ...new Set(fetchedData.map((item: { topic: unknown }) => item.topic)),
        ]
        const uniquePestles = [
          ...new Set(
            fetchedData.map((item: { pestle: unknown }) => item.pestle)
          ),
        ]
        const kdata = filteredData.map(
          (item: {
            region: unknown
            likelihood: unknown
            intensity: unknown
            relevance: unknown
          }) => ({
            region: item.region,
            relevance: item.relevance,

            likelihood: item.likelihood,
            intensity: item.intensity,
          })
        )
        const chartdata = fetchedData
        const yeardata = [
          ['pestle', 'Start year', 'end year'],
          ...filteredData.map(
            (item: {
              start_year: unknown
              end_year: unknown
              pestle: unknown
            }) => [item.pestle, item.start_year, item.end_year]
          ),
        ]
        setchartdata(chartdata)
        setkdata(kdata)
        setfetchedData(fetchedData)
        setyeardata(yeardata)
        setCountryOptions(uniqueCountries)
        setSectorOptions(uniqueSectors)
        setTopicOptions(uniqueTopics)
        setPestleOptions(uniquePestles)
        setsourceopt(uniqueSource)
        setregionopt(uniqueRegion)
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        setLoading(false)
      })
  }, [
    countryFilter,
    sectorFilter,
    topicFilter,
    pestleFilter,
    regionfil,
    sourcefil,
    data,
  ])

  const option1 = {
    backgroundColor: '#2d2d34',
    color: 'skyblue',
    title: 'Start year and End year with Pestle',
    titleTextStyle: { color: 'skyblue' },

    hAxis: {
      textStyle: { color: 'skyblue' },
      hAxis: { title: 'start year and  end year' },
    },
  }

  return (
    <>
      {' '}
      <div className="parent">
        <div className="filter-container">
          <label className="filter-label">Country Filter:</label>
          <select
            className="filter-dropdown"
            value={countryFilter}
            onChange={e => setCountryFilter(e.target.value)}
          >
            <option value="">Select Country</option>
            {countryOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-container">
          <label className="filter-label">Sector Filter:</label>
          <select
            className="filter-dropdown"
            value={sectorFilter}
            onChange={e => setSectorFilter(e.target.value, setLoading(true))}
          >
            <option value="">Select Sector</option>
            {sectorOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-container">
          <label className="filter-label">Topic Filter:</label>
          <select
            className="filter-dropdown"
            value={topicFilter}
            onChange={e => setTopicFilter(e.target.value, setLoading(true))}
          >
            <option value="">Select Topic</option>
            {topicOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-container">
          <label className="filter-label">Pestle Filter:</label>
          <select
            className="filter-dropdown"
            value={pestleFilter}
            onChange={e => setPestleFilter(e.target.value, setLoading(true))}
          >
            <option value="">Select Pestle</option>
            {pestleOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-container">
          <label className="filter-label">source Filter:</label>
          <select
            className="filter-dropdown"
            value={sourcefil}
            onChange={e => setsoucrcefil(e.target.value, setLoading(true))}
          >
            <option value="">Select source</option>
            {sourceopt.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-container">
          <label className="filter-label">region Filter:</label>
          <select
            className="filter-dropdown"
            value={regionfil}
            onChange={e => setregionfil(e.target.value, setLoading(true))}
          >
            <option value="">Select region</option>
            {regionopt.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <>
        {loading ? (
          <div className="threecircles">
            <ThreeCircles
              height="100"
              width="100"
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          </div>
        ) : (
          // Display loader while loading
          <>
            <Datatable datatable={fetchedData}></Datatable>
            <DashboardBox gridArea="d">
              <GeoChart chartData={chartdata}></GeoChart>
            </DashboardBox>
            <DashboardBox gridArea="a">
              <Bar data={data} />
            </DashboardBox>
            <DashboardBox gridArea="c">
              <Chart
                chartType="Histogram"
                width="100%"
                height="300px"
                data={yeardata}
                options={option1}
              />
            </DashboardBox>
            <DashboardBox gridArea="e">
              <Resposive kdata={kdata} />
            </DashboardBox>
            <DashboardBox gridArea="g">
              <Line data={data} />
            </DashboardBox>
          </>
        )}
      </>
    </>
  )
}

export default Row1
