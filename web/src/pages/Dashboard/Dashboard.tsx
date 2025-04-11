import Paper from '@mui/material/Paper'
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  Box, Pagination, FormControl, MenuItem, Select, InputLabel,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Card,
  AppBar,
  Toolbar,
  Typography
} from '@mui/material'
import React from 'react'
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
  const [data, setData] = React.useState<Diagnostic[]>([])
  const [page, setPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState<number | null>(null)
  const [limit, setLimit] = React.useState(10)
  const [loading, setLoading] = React.useState(false)

  const [selectedState, setSelectedState] = React.useState<string>('')
  const [selectedCity, setSelectedCity] = React.useState('')

  const [location, setLocation] = React.useState<Record<string, string[]>>({})

  const token = localStorage.getItem('jwt')
  


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


  async function fetchLocations() {
    try {
      const response = await api.get('/diagnostics/locations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  React.useEffect(() => {
    fetchLocations()
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Painel de Monitoramento
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem component="a" href="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem component="a" href="/chart">
              <ListItemText primary="Gráfico" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

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
          <p>Loading...</p>
        ) : (
          <>
            <Card sx={{ mb: 2, p: 2 }}>
              <Box display="flex" gap={2} flexWrap="wrap">
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id="select-state">Estado</InputLabel>
                  <Select
                    labelId="select-state"
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
                  <InputLabel id="select-city">Cidade</InputLabel>
                  <Select
                    labelId="select-city"
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
            </Card>

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

            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages || 1}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                shape="rounded"
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}