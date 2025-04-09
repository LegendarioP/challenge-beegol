import * as S from './styles.ts'
import banner from '../../../public/login-banner.jpg'
import { Button, Container, Input, InputLabel } from '@mui/material'

export default function Login() {
    return(
        <S.Container>
            <S.FormContainer>
            





                <form>
                    <Container>
                        <InputLabel htmlFor="username">User</InputLabel>
                        <Input id="username" name="username" fullWidth required />
                    </Container>
                    <Container>
                        <InputLabel htmlFor="password">Senha</InputLabel>
                        <Input id="password" name="password" type="password" fullWidth required />
                    </Container>
                    <Container>
                        <Button variant="contained" color="primary" type="submit">
                            Login
                        </Button>
                    </Container>
                </form>
            </S.FormContainer>
            <S.Container className=''>
                <S.Image src={banner} alt="Banner login" />
            </S.Container>
        </S.Container>
    )
}