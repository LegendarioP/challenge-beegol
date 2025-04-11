import {
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

interface FilterControlsProps {
  children?: React.ReactNode
  location: Record<string, string[]>
  selectedState: string
  selectedCity: string
  onStateChange: (event: SelectChangeEvent) => void
  onCityChange: (event: SelectChangeEvent) => void
}

export default function FilterControls({
  children,
  location,
  selectedState,
  selectedCity,
  onStateChange,
  onCityChange,
}: FilterControlsProps) {
  return (
    <Card sx={{ mb: 2, p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', justifyItems: 'center' , width: '100%',  }}>
        <Box>
            <Box display="flex" gap={2} flexWrap="wrap">
                <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="select-state">Estado</InputLabel>
                <Select
                    labelId="select-state"
                    label="Estado"
                    value={selectedState}
                    onChange={onStateChange}
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
                <InputLabel id="select-city">Cidade</InputLabel>
                <Select
                    labelId="select-city"
                    label="Cidade"
                    value={selectedCity}
                    onChange={onCityChange}
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
        </Box>
        {children}

    </Card>
  )
}