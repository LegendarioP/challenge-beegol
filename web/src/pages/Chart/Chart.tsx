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
    latency_ms: number;
    packet_loss: number;
    date: Date;
}


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Chart() {
    const [data, setData] = useState<Metric[]>([]);

    const [location, setLocation] = useState<Record<string, string[]>>({})
    const [selectedState, setSelectedState] = useState<string>('')
    const [selectedCity, setSelectedCity] = useState<string>('')


    async function fetchMetrics(selectedCity: string, selectedState: string) {
        try {
            const response = await api.get("/metrics")

            setData(response.data.data)
            console.log(response.data.data)
            // console.log(response)
        } catch (error) {
            console.error(error)
        }
    }


    const datan = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                label: "Sales",
                data: [12, 19, 3, 5, 2, 3],
                barPercentage: .5,
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                label: "Sales",
                data: [19,25,13,5,4],
                barPercentage: .5,
                backgroundColor: "rgba(255, 0, 0, 0.5)",
                borderColor: "#ff0000",
                borderWidth: 1,
            },
        ],
    };


    const options = {
        responsive: true,
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
                <Bar data={datan} options={options} />
            </Container>
        </div>
    );
}