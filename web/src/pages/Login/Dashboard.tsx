import { dataPreloaded } from '../../lib/preloadedData'
export default function Dashboard(){

    const data = dataPreloaded.data
    console.log(data)
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>

            
        </div>
    )
}