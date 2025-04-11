import Paper from '@mui/material/Paper'
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  Box, Toolbar, Typography
} from '@mui/material'
import React from 'react'
import { SelectChangeEvent } from '@mui/material/Select'
import dayjs from 'dayjs'
import TopBar from '../../components/TopBar'
import SideMenu from '../../components/SideMenu'
import FilterControls from '../../components/Filters'
import { PaginationControls } from '../../components/PaginationControls'

import { useLocations } from '../../hooks/useLocations'
import { useDiagnosticsData } from '../../hooks/useDiagnosticsData'


export default function Dashboard() {
  const [limit, setLimit] = React.useState(10)

  const [selectedState, setSelectedState] = React.useState<string>('')
  const [selectedCity, setSelectedCity] = React.useState('')

 
  const token = localStorage.getItem('jwt')
  const { location } = useLocations(token)

  const {
    data,
    page,
    setPage,
    totalPages,
    loading,
  } = useDiagnosticsData({
    token,
    state: selectedState,
    city: selectedCity,
    limit,
  })


  function handleStateChange (event: SelectChangeEvent)  {
    const value = event.target.value
    setPage(1)
    setSelectedState(value)
    setSelectedCity('')
  }

  function handleCityChange(event: SelectChangeEvent) {
    setPage(1)
    setSelectedCity(event.target.value)
  }

  return (
    <Box sx={{ display: 'flex' }}>

      <TopBar title="Painel de Monitoramento" />

      <SideMenu />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#f9f9f9',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <> 
            <FilterControls
              location={location}
              selectedState={selectedState}
              selectedCity={selectedCity}
              onStateChange={handleStateChange}
              onCityChange={handleCityChange}
            />

            <TableContainer component={Paper}>
              <Table
                sx={{
                  minWidth: 650,
                  '& tbody tr:nth-of-type(odd)': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="left">Device ID</TableCell>
                    <TableCell align="left">City</TableCell>
                    <TableCell align="left">State</TableCell>
                    <TableCell align="left">Latency (ms)</TableCell>
                    <TableCell align="left">Packet Loss</TableCell>
                    <TableCell align="left">Quality of Service</TableCell>
                    <TableCell align="left">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.device_id}</TableCell>
                      <TableCell>{item.city}</TableCell>
                      <TableCell>{item.state}</TableCell>
                      <TableCell>{item.latency_ms}</TableCell>
                      <TableCell>{item.packet_loss}</TableCell>
                      <TableCell>{item.quality_of_service}</TableCell>
                      <TableCell>
                        {dayjs(item.date).format('DD/MM/YYYY')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <PaginationControls
              count={totalPages || 1}
              page={page}
              onChange={setPage}
            /> 
          </>
        )}
      </Box>
    </Box>
  )
}