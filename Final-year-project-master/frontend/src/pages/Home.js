import { Box, Button, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import soilAnalysisImage from '../assets/soil-analysis-pic.jpg'
import diseaseDetectionImage from '../assets/disease-detection.jpg'
import axios from 'axios'

const Home = () => {

    useEffect( () => {
        const getData = async () => {
            const res = await axios.get( 'https://api-smart-agriculture.onrender.com' )
            console.log( res.data )
        }
        getData()
    }, [] )

    return (
        <Layout>
            <Box>
                <Paper sx={{ marginBottom: "30px", padding: "40px", justifyContent: "space-evenly", borderRadius: "10px", display: "flex", flexDirection: { sm: "row", xs: "column" }, alignItems: "center", gap: "30px" }}>
                    <Box borderRadius="50%" width="200px" height="200px">
                        <img width="200px" height="100%" style={{ objectFit: "cover", borderRadius: "50%" }} src={soilAnalysisImage} alt="Soil analysis" /></Box>
                    <Box >
                        <Typography color="success.main" fontWeight="bold" variant='h6' fontSize="20px" gutterBottom>Soil Analysis</Typography>
                        <Box fontSize="14px">
                            <p>Get all information needed to use the correct pesticides based on soil report on your land and to grow crops that yeild more profit from the soil test report parameters.</p>
                            <p>Step 1: Take your soil test from Agricultural department.</p>
                            <p>Step 2: Fill the soil test results in this portal to get soil analysis.</p>
                        </Box>
                        <Button href={`/soil_analysis#googtrans(${localStorage.getItem( "googTrnasLangCode" ) || 'en'})`} sx={{ textTransform: "capitalize", marginTop: "20px" }} variant="contained" color='success'>Start</Button>
                    </Box>
                </Paper>
                <Paper sx={{ padding: "40px", justifyContent: "space-start", borderRadius: "10px", display: "flex", flexDirection: { sm: "row", xs: "column" }, alignItems: "center", gap: "30px" }}>
                    <Box borderRadius="50%" width="200px" height="200px">
                        <img width="200px" height="100%" style={{ objectFit: "cover", borderRadius: "50%" }} src={diseaseDetectionImage} alt="Disease detection" />
                    </Box>
                    <Box >
                        <Typography color="success.main" fontWeight="bold" variant='h6' gutterBottom>Disease Detection</Typography>
                        <Box fontSize="14px">
                            <p>Detect plant disease from an image of the plant's leaf in a simple two-step process.</p>
                            <p>Step 1: Take a photo of the diseased plant leaf.</p>
                            <p>Step 2: Upload the image to get the information about the disease and the correct pesticide.</p>
                        </Box>
                        <Button href={`/disease_detection#googtrans(${localStorage.getItem( "googTrnasLangCode" ) || ' en'})`} sx={{ textTransform: "capitalize", marginTop: "20px" }} variant="contained" color='success'>Start</Button>
                    </Box >
                </Paper >
            </Box >
        </Layout >
    )
}

export default Home
