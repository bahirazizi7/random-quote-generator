import React, { useState } from 'react';
import { RiEyeLine, RiEyeCloseLine } from 'react-icons/ri';
import './style.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const Signin = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <Box>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField label="Standard warning"
                variant="standard"
                color="warning"
                focused id="filled-basic" label="Filled" variant="filled" />
        </Box>
    );
};

export default Signin;
