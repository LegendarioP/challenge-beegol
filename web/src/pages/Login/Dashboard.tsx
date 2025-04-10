import { dataPreloaded } from '../../lib/preloadedData'
import Paper from '@mui/material/Paper';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box, Pagination, FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';


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


export default function Dashboard(){

    const [data, setData] = useState<Diagnostic[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    const [limit, setLimit] = useState(10)


    // async function fetchPage() {

    //     try {
    //         const response = await api.get('/diagnostics', {
    //             headers: {
    //               'Content-Type': 'application/json',
    //             }
    //           })
    //         console.log(response)
    //         // setData(response.data.data)
    //         // setTotalPages(response.data.total_pages)
    //         // setPage(response.data.page)
    //     } catch (error) {
    //         console.log(error)   
    //     }

        
    // }

    // // fetchPage()
    // useEffect(() => {
    //     fetchPage()
    // },[data])

    



    const datan = dataPreloaded.data
    // console.log(datan)
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>

                <FormControl fullWidth>
                    <InputLabel>Estado</InputLabel>
                    <Select label="Estado" >
                        <MenuItem value="">Todos</MenuItem>
                        {datan.map((item) => (
                        <MenuItem key={item.id} value={item.state}>
                            {item.state}
                        </MenuItem>
                        ))}
                    </Select>
                    <Select label="Estado" >
                        <MenuItem value="">Todos</MenuItem>
                        {datan.map((item) => (
                        <MenuItem key={item.id} value={item.city}>
                            {item.city}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="left">Device_id</TableCell>
                            <TableCell align="left">City</TableCell>
                            <TableCell align="left">State</TableCell>
                            <TableCell align="left">Latency_ms</TableCell>
                            <TableCell align="left">Packet_loss</TableCell>
                            <TableCell align="left">Quality_of_service</TableCell>
                            <TableCell align="left">Date</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {datan.map((item) => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">{item.id}</TableCell>
                                <TableCell component="th" scope="row">{item.device_id}</TableCell>
                                <TableCell align="left">{item.city}</TableCell>
                                <TableCell align="left">{item.state}</TableCell>
                                <TableCell align="left">{item.latency_ms}</TableCell>
                                <TableCell align="left">{item.packet_loss}</TableCell>
                                <TableCell align="left">{item.quality_of_service}</TableCell>
                                <TableCell align="left">{item.date}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box display="flex" justifyContent="center" mt={2}>
                    <Pagination
                        count={dataPreloaded.total_pages}
                        page={dataPreloaded.page}
                        color="primary"
                    />
                </Box>
        </div>
    )
}