import { Typography } from '@mui/material'

import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from 'recharts'

function Resposive({ kdata }) {
  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        margin="12px"
        color="#8884d8"
        align="center"
        bottom="40px"
      >
        Regions WITH Relvence Intensity
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          width={500}
          height={400}
          data={kdata}
          margin={{
            top: 15,
            right: 25,
            left: -10,
            bottom: 60,
          }}
        >
          <XAxis dataKey="" tickLine={false} style={{ fontSize: '10px' }} />
          <YAxis
            tickLine={false}
            axisLine={{ strokeWidth: '0' }}
            style={{ fontSize: '10px' }}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="intensity"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="relevance"
            dot={true}
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="region"
            stackId="1"
            dot={true}
            stroke="#ffc658"
            fill="#ffc658"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default Resposive
