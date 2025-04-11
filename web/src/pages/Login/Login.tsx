import banner from '../../../public/login-banner.jpg'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React from 'react'
import { api } from '../../lib/api.ts'

export default function Login() {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState(false)
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!username || !password) {
            setError(true)
            return
        }
        try {
            setError(false)
            const response = await api.post('/login', {
                username,
                password,
            })
            console.log(response.data)
            localStorage.setItem('jwt', response.data.access_token)

            if (localStorage.getItem('redirectTo')) {
                window.location.href = localStorage.getItem('redirectTo') || '/'
            }
        }
        catch
        (error) {
            console.error('Error during login:', error)
            alert('Usuário ou senha inválidos')
        }

    }


    return(
        <div className='flex flex-row w-full min-h-dvh'>
                <div className='flex flex-col justify-center w-full max-w-1/4 py-5'>
                    <Container maxWidth="sm">
                        <Typography variant="h5" component="h1" textAlign={'center'} gutterBottom>
                            Bem vindo!
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                error={error && !username}
                                helperText={error && !username ? "Insira um usuario." : ""}
                                label="Username"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                error={error && !password}
                                helperText={error && !password ? "Insira a senha." : ""}
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginTop: 2 }}
                            >
                                Entrar
                            </Button>
                        </Box>
                    </Container>
                </div>

            <div className='flex flex-row w-full min-h-dvh'>
                <img src={banner} alt="Banner login" className='w-full object-cover' />
            </div>
        </div>

    )
}