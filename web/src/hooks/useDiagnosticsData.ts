import React from 'react'
import { api } from '../lib/api'

export interface Diagnostic {
  id: number
  device_id: string
  city: string
  state: string
  latency_ms: number
  packet_loss: number
  quality_of_service: string
  date: string
}

interface UseDiagnosticsDataParams {
  token: string | null
  state?: string
  city?: string
  limit?: number
}

export function useDiagnosticsData({
  token,
  state = '',
  city = '',
  limit = 10,
}: UseDiagnosticsDataParams) {
  const [data, setData] = React.useState<Diagnostic[]>([])
  const [page, setPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState<number | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function fetchData() {
      if (!token) return

      setLoading(true)
      setError(null)

      try {
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
      } catch (err) {
        console.error('Erro ao buscar dados:', err)
        setError('Erro ao buscar dados')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [token, limit, page, state, city])

  return {
    data,
    page,
    setPage,
    totalPages,
    loading,
    error,
  }
}
