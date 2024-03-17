import { Box, useMediaQuery } from '@mui/material'
import Row1 from './Row1'
import DashboardBox from '@/components/DashboardBox'
import BubbleChart from '@/components/Bubble'

const gridTemplateLargeScreens = `
  "i i i"
  "a b c"
  "a b c"
  "a b c"
  "d b c"
  "d e f"
  "d e f"
  "d e f"
  "d e f"
  "g g h"
  "g g h"
`
const gridTemplateSmallScreens = `
  "i"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "j"
  "j"
`

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery('(min-width: 1200px)')
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="2.0rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: 'repeat(3, minmax(370px, 1fr))',
              gridTemplateRows: 'repeat(8, minmax(60px, 2fr))',
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridAutoColumns: '1fr',
              gridAutoRows: '80px',
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
    >
      <Row1 />
      <>
        <DashboardBox gridArea="f">
          <BubbleChart />
        </DashboardBox>
      </>
    </Box>
  )
}

export default Dashboard
