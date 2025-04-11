import { useEffect, useState } from 'react'
import { api } from '../lib/api'


interface LocationData {
    [state: string]: string[];
}

export function useLocations(token: string | null) {
  const [location, setLocation] = useState<LocationData>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
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