import React from 'react'
import { api } from '../lib/api'


interface LocationData {
    [state: string]: string[];
}

export function useLocations(token: string | null) {
  const [location, setLocation] = React.useState<LocationData>({})
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function fetchLocations() {
      if (!token) return

      setLoading(true)
      try {
        const response = await api.get('/diagnostics/locations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setLocation(response.data.data)
      } catch (err) {
        console.error('Error fetching locations:', err)
        setError('Erro ao buscar localizações')
      } finally {
        setLoading(false)
      }
    }

    fetchLocations()
  }, [token])

  return { location, loading, error }
}