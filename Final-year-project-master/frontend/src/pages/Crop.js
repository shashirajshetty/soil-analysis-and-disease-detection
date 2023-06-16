import { Box, CircularProgress, Divider, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import axios from 'axios'

export default function Crop() {

    const { crop } = useParams()
    const [cropInfo, setCropInfo] = useState( null )

    useEffect( () => {
        const getData = async () => {
            const res = await axios.get( `https://api-smart-agriculture.onrender.com/crop/${crop}` )
            if ( res.data.success ) {
                console.log( res.data.data )
                setCropInfo( res.data.data )
            } else
                setCropInfo( res.data.message )
        }
        getData()
    }, [crop] )

    return (
        <Layout>
            <Paper sx={{ padding: "20px" }}>
                <Typography variant='h5' marginBottom="10px" color="success.main" textTransform="capitalize">{crop}</Typography>
                <Divider />
                {cropInfo && <Box>
                    {typeof cropInfo !== 'string' && <Box>
                        {cropInfo.Info && cropInfo.Info !== "" && <Box marginTop="10px">
                            <Typography variant='h6' width="fit-content" gutterBottom fontWeight="500" position="relative" sx={{ "&::after": { content: "''", background: "green", height: "2px", "width": "75%", position: "absolute", bottom: "0", left: "0" } }} >General information</Typography>
                            <Typography textAlign="justify">{cropInfo.Info}</Typography>
                        </Box>}
                        {cropInfo.climate && cropInfo.climate !== "" && <Box marginTop="10px">
                            <Typography variant='h6' width="fit-content" gutterBottom fontWeight="500" position="relative" sx={{ "&::after": { content: "''", background: "green", height: "2px", "width": "75%", position: "absolute", bottom: "0", left: "0" } }} >Climate conditions</Typography>
                            <Box bgcolor="lightgreen" display="flex" padding="20px" alignItems="center" flexDirection={{ sm: "row", xs: "column" }} gap="20px">
                                <Box bgcolor="white" padding="20px" justifyContent="center" borderRadius="5px" height="170px" display="flex" flexDirection="column" gap="20px" alignItems="center">
                                    <Typography variant='h5' fontWeight="700">{cropInfo.climate.temp}</Typography>
                                    <Typography fontWeight="500">Temperature</Typography>
                                </Box>
                                <Box bgcolor="white" padding="20px" justifyContent="center" borderRadius="5px" height="170px" display="flex" flexDirection="column" gap="20px" alignItems="center">
                                    <Typography variant='h5' fontWeight="700">{cropInfo.climate.rainfall}</Typography>
                                    <Typography fontWeight="500">Rainfall</Typography>
                                </Box>
                            </Box>
                        </Box>}
                        {cropInfo.fertilizers && cropInfo.fertilizers !== "" && <Box marginTop="10px">
                            <Typography variant='h6' width="fit-content" gutterBottom fontWeight="500" position="relative" sx={{ "&::after": { content: "''", background: "green", height: "2px", "width": "75%", position: "absolute", bottom: "0", left: "0" } }} >Fertilizers information</Typography>
                            <Typography textAlign="justify">{cropInfo.fertilizers}</Typography>
                        </Box>}
                        {cropInfo.harvesting && cropInfo.harvesting !== "" && <Box marginTop="10px">
                            <Typography variant='h6' width="fit-content" gutterBottom fontWeight="500" position="relative" sx={{ "&::after": { content: "''", background: "green", height: "2px", "width": "75%", position: "absolute", bottom: "0", left: "0" } }} >Harvesting information</Typography>
                            <Typography textAlign="justify">{cropInfo.harvesting}</Typography>
                        </Box>}
                        {cropInfo.soil && cropInfo.soil !== "" && <Box marginTop="10px">
                            <Typography variant='h6' width="fit-content" gutterBottom fontWeight="500" position="relative" sx={{ "&::after": { content: "''", background: "green", height: "2px", "width": "75%", position: "absolute", bottom: "0", left: "0" } }} >Soil suitable for {crop}</Typography>
                            <Typography textAlign="justify">{cropInfo.soil}</Typography>
                        </Box>}
                        {cropInfo.sowing && cropInfo.sowing !== "" && <Box marginTop="10px">
                            <Typography variant='h6' width="fit-content" gutterBottom fontWeight="500" position="relative" sx={{ "&::after": { content: "''", background: "green", height: "2px", "width": "75%", position: "absolute", bottom: "0", left: "0" } }} >sowing suitable for {crop}</Typography>
                            <Box padding="20px" bgcolor="#eee" borderRadius="5px">
                                {cropInfo.sowing.method_of_sowing && <Box marginTop="20px">
                                    <Typography variant='h6' width="fit-content" gutterBottom fontWeight="500" position="relative" sx={{ "&::after": { content: "''", background: "grey", height: "2px", "width": "75%", position: "absolute", bottom: "0", left: "0" } }} >Method of sowing</Typography>
                                    <Typography textAlign="justify">{cropInfo.sowing.method_of_sowing}</Typography>
                                </Box>}
                                {cropInfo.sowing.sowing_depth && <Box marginTop="20px">
                                    <Typography variant='h6' width="fit-content" gutterBottom fontWeight="500" position="relative" sx={{ "&::after": { content: "''", background: "grey", height: "2px", "width": "75%", position: "absolute", bottom: "0", left: "0" } }} >Sowing depth</Typography>
                                    <Typography textAlign="justify">{cropInfo.sowing.sowing_depth}</Typography>
                                </Box>}{cropInfo.sowing.spacing && <Box marginTop="20px">
                                    <Typography variant='h6' width="fit-content" gutterBottom fontWeight="500" position="relative" sx={{ "&::after": { content: "''", background: "grey", height: "2px", "width": "75%", position: "absolute", bottom: "0", left: "0" } }} >Spacing</Typography>
                                    <Typography textAlign="justify">{cropInfo.sowing.spacing}</Typography>
                                </Box>}
                                {cropInfo.sowing.time_of_sowing && <Box marginTop="20px">
                                    <Typography variant='h6' width="fit-content" gutterBottom fontWeight="500" position="relative" sx={{ "&::after": { content: "''", background: "grey", height: "2px", "width": "75%", position: "absolute", bottom: "0", left: "0" } }} >Time of sowing</Typography>
                                    <Typography textAlign="justify">{cropInfo.sowing.time_of_sowing}</Typography>
                                </Box>}
                            </Box>
                        </Box>}
                        {cropInfo.weed_control && cropInfo.weed_control !== "" && <Box marginTop="10px">
                            <Typography variant='h6' width="fit-content" gutterBottom fontWeight="500" position="relative" sx={{ "&::after": { content: "''", background: "green", height: "2px", "width": "75%", position: "absolute", bottom: "0", left: "0" } }} >Weed control information</Typography>
                            <Typography textAlign="justify">{cropInfo.weed_control}</Typography>
                        </Box>}
                    </Box>}
                    {typeof cropInfo === 'string' && <Typography marginTop="20px" fontSize="16px" fontWeight="600" color="textSecondary">{cropInfo}</Typography>}
                </Box>}
                {!cropInfo && <Typography marginTop="20px" color="textSecondary"> <CircularProgress size={14} /> Loading info... </Typography>}
            </Paper>
        </Layout>
    )
}
