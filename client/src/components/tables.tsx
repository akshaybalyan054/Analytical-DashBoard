import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import BoxHeader from './BoxHeader'
import DashboardBox from './DashboardBox'

function Datatable({ datatable }) {
  const { palette } = useTheme()

  if (datatable === null) {
    // Data is still loading
    return <div>Loading...</div>
  }

  const Datatable1 = [
    { field: '_id', headerName: 'id', flex: 1 },
    {
      field: 'topic',
      headerName: 'Topic',
      flex: 0.5,
    },
    {
      field: 'sector',
      headerName: 'Sector',
      flex: 0.5,
    },
    {
      field: 'url',
      headerName: 'URL',
      flex: 0.5,
    },
    {
      field: 'insight',
      headerName: 'Insight',
      flex: 0.5,
    },
  ]

  const Datatable2 = [
    {
      field: '_id',
      headerName: 'id',
      flex: 0.5,
    },
    {
      field: 'added',
      headerName: 'Added',
      flex: 0.5,
    },
    {
      field: 'published',
      headerName: 'Published',
      flex: 0.5,
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 0.5,
    },
    {
      field: 'source',
      headerName: 'Source',
      flex: 0.5,
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 0.5,
    },
  ]

  return (
    <>
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Topic Sector"
          sideText={`${datatable?.length} Data`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            '& .MuiDataGrid-root': {
              color: 'skyblue',
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnSeparator': {
              visibility: 'hidden',
            },
            '& .MuiTablePagination-displayedRows': {
              color: 'skyblue',
            },

            '& .MuiSvgIcon-root': {
              color: 'skyblue',
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={false}
            rows={datatable || []}
            columns={Datatable1}
            getRowId={row => row._id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader title="Articles" sideText={`${datatable?.length} Data`} />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            '& .MuiDataGrid-root': {
              color: 'skyblue',
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnSeparator': {
              visibility: 'hidden',
            },

            '& .MuiTablePagination-displayedRows': {
              color: 'skyblue',
            },
            '& .MuiSvgIcon-root': {
              color: 'skyblue',
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={false}
            rows={datatable || []}
            columns={Datatable2}
            getRowId={row => row._id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
          />
        </Box>
      </DashboardBox>
    </>
  )
}

export default Datatable
