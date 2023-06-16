import { Box, Button, Icon, MenuItem, Paper, Select, Typography } from '@mui/material'
import React, { useState } from 'react'
import Layout from '../components/Layout'
import PhotoIcon from '@mui/icons-material/Photo'
import axios from 'axios'
import { ChevronLeft } from '@mui/icons-material'
import { toast } from 'react-toastify'

const plants = ['Apple', 'Corn', 'Grape', 'Peach', 'Pepper', 'Potato', 'Tomato',]

const DiseaseDetection = () => {

    const [selectedPlant, setSelectedPlant] = useState( "0" )
    const [image, setImage] = useState( null )
    const [url, setUrl] = useState( null )
    const [isProcessing, setIsProcessing] = useState( false )
    const [prediction, setPrediction] = useState( null )

    const setImagePreview = ( e ) => {
        setUrl( URL.createObjectURL( e.target.files[0] ) )
    }

    const submit = async ( e ) => {
        e.preventDefault()
        if ( selectedPlant === "0" ) {
            alert( "Select a plant!" )
            return
        }
        setIsProcessing( true )
        const formData = new FormData()
        formData.append( 'plant', selectedPlant.toLowerCase() )
        formData.append( 'file', image )
        try {
            const res = await axios.post( 'https://api-smart-agriculture.onrender.com/disease_detection', formData, {
                headers: {
                    'Content-Type': ''
                }
            } )
            if ( res.data.success ) {
                console.log( res.data )
                setPrediction( res.data )
            }
            else {
                console.log( res.data )
                toast( res.data.message )
            }
        } catch ( e ) {
            console.log( e.message )
        } finally {
            setIsProcessing( false )
        }
    }

    return (
        <Layout>
            <Button startIcon={<ChevronLeft sx={{ color: "#aaa" }} />} href={`/#googtrans(${localStorage.getItem( "googTrnasLangCode" ) || 'en'})`} sx={{ background: "white", color: "#aaa", textTransform: "capitalize", fontWeight: "bold", marginBottom: "20px", "&:hover": { color: "white" } }}>Go Back</Button>
            <Box bgcolor="#fff" padding="20px" borderRadius="5px">
                <Typography marginBottom="20px" color="success.main" fontWeight="bold" variant="h6">Disease detection</Typography>
                <form onSubmit={submit} method="post">
                    <Select fullWidth sx={{ marginBottom: "20px" }} onChange={( e ) => setSelectedPlant( e.target.value )} value={selectedPlant} required>
                        <MenuItem value="0" >Select plant type</MenuItem>
                        {plants && plants.map( plant => (
                            <MenuItem value={plant} key={plant}>{plant}</MenuItem>
                        ) )}
                    </Select>
                    {!url && <Box border="2px dashed rgba(0,0,0,0.3)" position="relative" bgcolor="#fff" padding="20px">
                        <input accept='image/jpeg,image/jpg,image/png' onChange={e => { setImage( e.target.files[0] ); setImagePreview( e ) }} type="file" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0 }} name='plant-image' required />
                        <Box sx={{ cursor: "pointer" }} color="#666" display="flex" gap="5px" flexDirection="column" alignItems="center" justifyContent="center">
                            <Typography sx={{ cursor: "pointer" }} variant='h5'>Upload plant leaf photo here.</Typography>
                            <Icon sx={{ cursor: "pointer", height: "50px", width: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <PhotoIcon sx={{ fontSize: "40px" }} />
                            </Icon>
                            <span style={{ fontSize: "14px" }}>Drag and drop</span>
                            <span style={{ fontSize: "14px" }}>or click here to upload.</span>
                        </Box>
                    </Box>}
                    {url && <Paper sx={{ display: "flex", padding: "10px", width: "fit-content" }}>
                        <img width="150px" src={url} style={{ maxWidth: "400px", border: "px solid rgba(0,0,0,0.2)" }} alt="" />
                    </Paper>}
                    {url && <Button onClick={() => { setUrl( null ); setImage( null ); setPrediction( null ) }} disableElevation variant='contained' sx={{ display: "block", background: "darkgreen", marginTop: "20px", textTransform: "capitalize", "&:hover": { background: "darkgreen" } }}>{prediction ? "Test again" : "Change image"}</Button>}
                    {!prediction && <Button disabled={isProcessing} type='submit' disableElevation variant='contained' sx={{ background: "darkgreen", marginTop: "20px", textTransform: "capitalize", "&:hover": { background: "darkgreen" } }}>Submit</Button>}
                </form>
                {prediction &&
                    <Box marginTop="20px">
                        {prediction.prediction !== "Healty" && prediction.confidence >= 0.7 && < Typography color="success.main" gutterBottom fontWeight="bold" variant='h6'>Identified Disease</Typography>}
                        {prediction.prediction !== "Healty" && prediction.confidence >= 0.7 && <Box bgcolor="#eee" fontWeight="bold" padding="20px" borderRadius="5px">
                            <Typography fontWeight="bold" variant='h5' gutterBottom>{prediction.prediction}</Typography>
                            <Typography>{prediction.data['Disease info']}</Typography>
                        </Box>}
                        {prediction.prediction !== "Healty" && prediction.confidence >= 0.7 && <Box bgcolor="#eee" fontWeight="bold" padding="20px" borderRadius="5px">
                            <Typography fontWeight="bold" variant='h5' gutterBottom>Disease Information</Typography>
                            <Typography>
                                {prediction.data["Disease info"]}
                            </Typography>
                        </Box>}
                        {prediction.prediction === "Healty" && <Typography variant='h5' color="textSecondary">Provided leaf is a healty leaf</Typography>}
                        {prediction.prediction !== "Healty" && prediction.confidence >= 0.7 && <Typography marginTop="20px" color="success.main" gutterBottom fontWeight="bold" variant='h6'>Recommended Pesticide</Typography>}
                        {prediction.prediction !== "Healty" && prediction.confidence >= 0.7 && <Box bgcolor="#eee" fontWeight="bold" padding="20px" borderRadius="5px">
                            <Typography fontWeight="bold" variant='h5' gutterBottom>{prediction.data.Pesticides}</Typography>
                            <Typography>
                                {prediction.data.Information}
                            </Typography>
                        </Box>}
                        {prediction.confidence < 0.7 && <Typography padding="20px" bgcolor="#eee" variant='h6' color="textSecondary">Provided leaf confidence is low please check plant image and type are same</Typography>}
                    </Box>
                }
            </Box>
        </Layout >
    )
}

export default DiseaseDetection
