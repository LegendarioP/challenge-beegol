import styled from "styled-components"

export const Container = styled.div `
    /* background:#000; */
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
`


export const FormContainer = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 25%;
    height: 100%;
    padding: 20px 0;
`


export const ImageContainer = styled.div `
    display: flex;
`

export const Image = styled.img `
    width: 100%;
    object-fit: cover;
`