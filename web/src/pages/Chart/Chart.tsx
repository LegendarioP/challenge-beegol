import { Box, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { api } from "../../lib/api";
import { useEffect, useState } from "react";
import dayjs from 'dayjs'


interface Metric {
    total_latency_ms: number;
    total_packet_loss: number;
    day: Date;
}


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Chart() {
    const [data, setData] = useState<Metric[]>([]);

    const [location, setLocation] = useState<Record<string, string[]>>({})
    const [selectedState, setSelectedState] = useState<string>('')
    const [selectedCity, setSelectedCity] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [stacked, setStacked] = useState<boolean>(false)

    async function fetchMetrics(selectedCity: string, selectedState: string) {
        try {
            setLoading(true)
            const params = new URLSearchParams()
            params.append('state', selectedState)
            params.append('city', selectedCity)
            const response = await api.get(`/metrics?${params.toString()}`)
            setData(response.data.data)
        } catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }

    async function fetchLocations() {
        try {
          const response = await api.get('/diagnostics/locations')
        //   console.log(response)
          setLocation(response.data.data)
        }
        catch (error) {
          console.error('Error fetching locations:', error)
        }
      }


    function toggleStack() {
        setStacked(!stacked)
    }

    const dataChart = {
        labels: data.map((item) => dayjs(item.day).format('DD/MM/YYYY')),
        datasets: [
            {
                label: "Latencia",
                data: data.map((item) => item.total_latency_ms),
                barPercentage: .7,
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                label: "Perda de pacote",
                data: data.map((item) => item.total_packet_loss),   
                barPercentage: .7,
                backgroundColor: "rgba(255, 0, 0, 0.5)",
                borderColor: "#ff0000",
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        scales: {
            y: {
              beginAtZero: true,
              stacked: stacked
            },
            x: {
                stacked: stacked,
            },
        },
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Sales Data",
            },
        },
        
    };


      const handleStateChange = (event: SelectChangeEvent) => {
        const value = event.target.value
        setSelectedState(value)
        setSelectedCity('')
      }
    
      const handleCityChange = (event: SelectChangeEvent) => {
        setSelectedCity(event.target.value)
      }

    useEffect(() => {
        fetchMetrics(selectedCity, selectedState)
    }, [selectedState, selectedCity])

    useEffect(() => {
        fetchLocations()
    }, [])



    return (
        <div>
            <Container>
                <h1>Chart</h1>
                <p>Chart Page</p>
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
                {!loading && (
                    <Bar data={dataChart} options={options} />
                )}
                <button type="button" onClick={toggleStack}>Clique</button>
            </Container>
        </div>
    );
}