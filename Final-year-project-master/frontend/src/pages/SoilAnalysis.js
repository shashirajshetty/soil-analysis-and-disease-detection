import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Layout from '../components/Layout'
import { ChevronLeft } from '@mui/icons-material'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const SoilAnalysis = () => {

    const [K, setK] = useState( 0 )
    const [P, setP] = useState( 0 )
    const [N, setN] = useState( 0 )
    const [temperature, setTemperature] = useState( 0 )
    const [humidity, setHumidity] = useState( 0 )
    const [ph, setPh] = useState( 0 )
    const [rainfall, setRainfall] = useState( 0 )
    const [prediction, setPrediction] = useState( null )

    const navigate = useNavigate()

    const submit = async () => {
        if ( K > 200 || N > 200 || P > 200 || P < 0 || N < 0 || K < 0 || ph > 14 || ph < 0 || temperature > 50 || temperature < 0 || humidity > 100 || humidity < 0 ) {
            toast( "Invalid values" )
        } else {
            const res = await axios.post( 'https://api-smart-agriculture.onrender.com', { K, P, N, temperature, humidity, ph, rainfall } )
            setPrediction( res.data )
        }
    }

    return (
        <Layout>
            <Button startIcon={<ChevronLeft sx={{ color: "#aaa" }} />} href={`/#googtrans(${localStorage.getItem( "googTrnasLangCode" ) || 'en'})`} sx={{ background: "white", color: "#aaa", textTransform: "capitalize", fontWeight: "bold", marginBottom: "20px", "&:hover": { color: "white" } }}>Go Back</Button>
            <Box bgcolor="#fff" borderRadius="5px" padding="20px">
                <Typography color="success.main" fontWeight="bold" variant="h6">Soil Analysis</Typography>
                <Typography variant='subtitle2'>Fill the form below to get soil analysis.</Typography>
                <form style={{ marginTop: "20px" }} method="post">
                    <FormControl margin='normal' fullWidth>
                        <TextField color='success' value={K} onChange={( e ) => setK( e.target.value )} type="number" label="Pottassium" />
                    </FormControl>
                    <FormControl margin='normal' fullWidth>
                        <TextField color='success' value={P} onChange={( e ) => setP( e.target.value )} type="number" label="Phosporous" />
                    </FormControl>
                    <FormControl margin='normal' fullWidth>
                        <TextField color='success' value={N} onChange={( e ) => setN( e.target.value )} type="number" label="Nitrogen" />
                    </FormControl>
                    <FormControl margin='normal' fullWidth>
                        <TextField color='success' value={temperature} onChange={( e ) => setTemperature( e.target.value )} type="number" label="Temperature" />
                    </FormControl>
                    <FormControl margin='normal' fullWidth>
                        <TextField color='success' value={humidity} onChange={( e ) => setHumidity( e.target.value )} type="number" label="Humidity" />
                    </FormControl>
                    <FormControl margin='normal' fullWidth>
                        <TextField color='success' value={ph} onChange={( e ) => setPh( e.target.value )} type="number" label="pH" />
                    </FormControl>
                    <FormControl margin='normal' fullWidth>
                        <TextField color='success' value={rainfall} onChange={( e ) => setRainfall( e.target.value )} type="number" label="Rainfall" />
                    </FormControl>
                    <Button onClick={submit} color='success' variant='contained' sx={{ textTransform: "capitalize" }}>Submit</Button>
                </form>
                {prediction && <Box marginTop="20px">
                    <Typography padding="20px" bgcolor="#eee" borderRadius="5px"> <span style={{ color: "green" }}> <b style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate( `/crop/${prediction.prediction}/#googtrans(${localStorage.getItem( "googTrnasLangCode" ) || 'en'})` )}>{prediction.prediction}</b> </span> will be most suited crop for your land.</Typography>
                </Box>}
            </Box>
        </Layout >
    )
}

export default SoilAnalysis
