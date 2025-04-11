import React from "react";
import { api } from "../lib/api";

export interface Metric {
  total_latency_ms: number;
  total_packet_loss: number;
  day: Date;
}

export function useMetrics(token: string | null, selectedState: string, selectedCity: string) {
  const [data, setData] = React.useState<Metric[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
      async function fetchMetrics() {
        if (!token) return;

      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append("state", selectedState);
        params.append("city", selectedCity);

        const response = await api.get(`/metrics?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [token, selectedState, selectedCity]);

  return { data, loading };
}