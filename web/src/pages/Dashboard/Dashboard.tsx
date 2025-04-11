import Paper from '@mui/material/Paper'
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  Box, Pagination, FormControl, MenuItem, Select, InputLabel
} from '@mui/material'
import { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import { SelectChangeEvent } from '@mui/material/Select'
import dayjs from 'dayjs'

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
  const [data, setData] = useState<Diagnostic[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(false)

  const [selectedState, setSelectedState] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState('')

  const [location, setLocation] = useState<Record<string, string[]>>({})
  


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

      const response = await api.get(`/diagnostics?${params.toString()}`)
      setData(response.data.data)
      setTotalPages(response.data.total_pages)
      setPage(response.data.page)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }


  async function fetchLocations() {
    try {
      const response = await api.get('/diagnostics/locations')
      console.log(response)
      setLocation(response.data.data)
      // return response.data
    }
    catch (error) {
      console.error('Error fetching locations:', error)
    }
  }

  const handleStateChange = (event: SelectChangeEvent) => {
    const value = event.target.value
    setSelectedState(value)
    setSelectedCity('')
  }

  const handleCityChange = (event: SelectChangeEvent) => {
    setSelectedCity(event.target.value)
  }

  useEffect(() => {
    fetchInitalData(limit, page, selectedState, selectedCity)
    // fetchLocations()
  }, [limit, page, selectedState, selectedCity])

  useEffect(() => {
    fetchLocations()
  }, [])

  return (

    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>

      {loading ? (
      <p>Loading...</p>
      ) : (
      <>
        <Box display="flex" gap={2} mb={2}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="select-state-label">Estado</InputLabel>
          <Select
          labelId="select-state-label"
          label="Estado"
          value={selectedState}
          onChange={handleStateChange}
          >
          <MenuItem value="">Todos</MenuItem>
          {Object.keys(location).map((state) => (
            <MenuItem key={state} value={state}>
            {state}
            </MenuItem>
          ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="select-city-label">Cidade</InputLabel>
          <Select
          labelId="select-city-label"
          label="Cidade"
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
          >
          <MenuItem value="">Todas</MenuItem>

          {location[selectedState]?.map((city) => (
            <MenuItem key={city} value={city}>
            {city}
            </MenuItem>
          ))}
          
          </Select>
        </FormControl>
        </Box>

        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            <TableCell>{dayjs(item.date).format('DD/MM/YYYY')}</TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
        </TableContainer>

        <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages || 1}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
        </Box>
      </>
      )}
    </div>
  )
}