import * as S from './styles.ts'
import banner from '../../../public/login-banner.jpg'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React from 'react'
import { api } from '../../lib/api.ts'

export default function Login() {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault()
      console.log({ username, password })
      // Aqui você pode fazer login ou validação

      const response = await api.get('/diagnostics')
      console.log(response)
    //   try {
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }

    }


    return(
        <S.Container>
            <S.FormContainer>
                <Container maxWidth="sm">
                    <Typography variant="h5" component="h1" textAlign={'center'} gutterBottom>
                        Bem vindo!
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
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
            </S.FormContainer>
            <S.Container className=''>
                <S.Image src={banner} alt="Banner login" />
            </S.Container>
        </S.Container>
    )
}