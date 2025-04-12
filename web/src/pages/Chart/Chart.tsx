import { Box, Card, SelectChangeEvent, Switch, Toolbar, Typography } from "@mui/material";
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
import React from "react";
import dayjs from 'dayjs'
import TopBar from "../../components/TopBar";
import FilterControls from "../../components/Filters";
import SideMenu from "../../components/SideMenu";
import { useLocations } from "../../hooks/useLocations";
import { useMetrics } from "../../hooks/useMetrics";
import Cookies from 'js-cookie';



ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Chart() {
    const [selectedState, setSelectedState] = React.useState<string>('')
    const [selectedCity, setSelectedCity] = React.useState<string>('')
    const [stacked, setStacked] = React.useState<boolean>(false)

    const token = Cookies.get('jwt') || null;

    const { location } = useLocations(token)
    const { data, loading } = useMetrics(token, selectedState, selectedCity);


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


    return (
        <Box sx={{ display: 'flex' }}>

            <TopBar title="Painel de Monitoramento" />
            <SideMenu />


            <Box component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    backgroundColor: '#f9f9f9',
                    minHeight: '100vh',
                }} >
                <Toolbar />
                <Typography variant="h4" gutterBottom> Grafico </Typography>


                <Box display="flex" flexDirection="row" gap={2} mb={2} >

                    <FilterControls
                        location={location}
                        selectedState={selectedState}
                        selectedCity={selectedCity}
                        onStateChange={handleStateChange}
                        onCityChange={handleCityChange}
                    >
                        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
                            <Typography variant="body1">Modo empilhado</Typography>
                            <Switch title="Empilhar gráfico" onClick={toggleStack} />
                        </Box>
                    </FilterControls>
                </Box>

                {!loading && (
                    <Card sx={{ mb: 2, p: 2 }}>
                        <Box sx={{
                            maxWidth: '800px',
                            margin: '0 auto',
                            mt: 4,
                        }}>
                            <Bar data={dataChart} options={options} />
                        </Box>
                    </Card>
                )}
            </Box>
        </Box>
    );
}