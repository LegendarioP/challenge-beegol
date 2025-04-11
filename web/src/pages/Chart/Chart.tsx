import { Container } from "@mui/material";
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
    const [loading, setLoading] = useState(false)
    const [stacked, setStacked] = useState(false)

    async function fetchMetrics(selectedCity: string, selectedState: string) {
        try {
            setLoading(true)
            const response = await api.get("/metrics")

            setData(response.data.data)
            
            // console.log(response.data.data)
        } catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }


    function toggleStack() {
        // console.log("clicked")
        setStacked(!stacked)
    }

    const datan = {
        labels: data.map((item) => item.day),
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



    useEffect(() => {
        fetchMetrics(selectedState, selectedCity)
    }, [selectedState, selectedCity])

    return (
        <div>
            <Container>
                <h1>Chart</h1>
                <p>Chart Page</p>
                {!loading && (
                    <Bar data={datan} options={options} />
                )}
                <button type="button" onClick={toggleStack}>Clique</button>
            </Container>
        </div>
    );
}