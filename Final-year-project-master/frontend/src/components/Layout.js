import { AppBar, Box, FormControl, InputLabel, Link, MenuItem, Select, Typography } from '@mui/material'
import { useState } from 'react'
import logo from '../assets/logo.png'
import { languages } from '../utils'

const Layout = ( { children } ) => {

    const [language, setLanguage] = useState( localStorage.getItem( "googTrnasLangCode" ) ? localStorage.getItem( "googTrnasLangCode" ) : "en" )


    const changeLanguage = ( e ) => {
        setLanguage( e.target.value )
        localStorage.setItem( "googTrnasLangCode", e.target.value )
        const location = ( window.location.href ).split( "#" )[0]
        window.location = `${location}#googtrans(${e.target.value})`
        window.location.reload()
    }

    return (
        <Box height="100%">
            <AppBar elevation={2} sx={{ padding: { md: "20px 150px", xs: "20px" }, background: "#fff" }}>
                <Box display="flex" alignItems="center" gap="20px" justifyContent="space-between">
                    <Box display="flex" width="fit-content" alignItems="center" gap="20px">
                        <Link sx={{ display: "flex", gap: "20px", alignItems: "center", textDecoration: "none" }} href={`/#googtrans(${localStorage.getItem( "googTrnasLangCode" ) || 'en'})`}>
                            <img src={logo} alt="Logo" width="30px" height="30px" />
                            <Typography variant='h5' fontSize={{ md: "20px", xs: "16px" }} color="success.main" fontWeight="bold" component="h1" >Plants disease detection and soil analysis</Typography>
                        </Link>
                    </Box>
                    <Box sx={{ padding: "10px" }} display="flex" alignItems="center" gap="20px">
                        <FormControl fullWidth>
                            <InputLabel>Select language:</InputLabel>
                            <Select onChange={changeLanguage} color='success' sx={{ height: "40px", width: "200px" }} value={language} label="Select language:">
                                {languages.map( lang => (
                                    <MenuItem className='notranslate' key={lang.code} value={lang.code}>{lang.name}</MenuItem>
                                ) )}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </AppBar>
            <Box padding={language === "en" ? { md: "120px 150px 20px 150px", xs: "160px 10px 20px 10px" } : { md: "80px 150px 20px 150px", xs: "160px 10px 20px 10px" }} height="100vh" bgcolor="rgba(99,99,99)" overflow="auto">
                {children}
            </Box>
        </Box>
    )
}

export default Layout
