import Paper from '@mui/material/Paper'
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  Box, Toolbar, Typography
} from '@mui/material'
import React from 'react'
import { api } from '../../lib/api'
import { SelectChangeEvent } from '@mui/material/Select'
import dayjs from 'dayjs'
import TopBar from '../../components/TopBar'
import SideMenu from '../../components/SideMenu'
import FilterControls from '../../components/Filters'
import { useLocations } from '../../hooks/useLocations'
import { PaginationControls } from '../../components/PaginationControls'

interface Diagnostic {
  id: number
  device_id: string
  city: string
  state: string
  latency_ms: number
  packet_loss: number
  quality_of_service: string
  date: string
}

export default function Dashboard() {
  const [data, setData] = React.useState<Diagnostic[]>([])
  const [page, setPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState<number | null>(null)
  const [limit, setLimit] = React.useState(10)
  const [loading, setLoading] = React.useState(false)

  const [selectedState, setSelectedState] = React.useState<string>('')
  const [selectedCity, setSelectedCity] = React.useState('')


  const token = localStorage.getItem('jwt')
  const { location } = useLocations(token)


  async function fetchInitalData(
    limit: number,
    page: number,
    state?: string,
    city?: string
  ) {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      params.append('limit', String(limit))
      params.append('page', String(page))
      if (state) params.append('state', state)
      if (city) params.append('city', city)

      const response = await api.get(`/diagnostics?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setData(response.data.data)
      setTotalPages(response.data.total_pages)
      setPage(response.data.page)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleStateChange = (event: SelectChangeEvent) => {
    const value = event.target.value
    setPage(1)
    setSelectedState(value)
    setSelectedCity('')
  }

  const handleCityChange = (event: SelectChangeEvent) => {
    setPage(1)
    setSelectedCity(event.target.value)
  }

  React.useEffect(() => {
    fetchInitalData(limit, page, selectedState, selectedCity)
  }, [limit, page, selectedState, selectedCity])

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