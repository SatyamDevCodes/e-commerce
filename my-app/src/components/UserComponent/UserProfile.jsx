import React from 'react';
import { Box, Typography, Paper, Avatar, Grid, Divider, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserProfile = () => {
    // LocalStorage se login user ka data uthana
    const userData = JSON.parse(localStorage.getItem('userInfo'));

    if (!userData) {
        return <Typography variant="h6" sx={{ textAlign: 'center', mt: 5 }}>Please Login to see your profile.</Typography>;
    }

    return (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 4, maxWidth: '600px', width: '100%', borderRadius: '15px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 80, height: 80, mb: 2 }}>
                        <AccountCircleIcon sx={{ fontSize: 60 }} />
                    </Avatar>
                    <Typography variant="h4" gutterBottom>{userData.name || "User Name"}</Typography>
                    <Typography variant="body1" color="text.secondary">Account Type: {userData.userType}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1"><strong>Email:</strong> {userData.email}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1"><strong>User ID:</strong> {userData._id}</Typography>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                    <Button variant="contained" fullWidth color="primary">Edit Profile</Button>
                    <Button variant="outlined" fullWidth color="error" onClick={() => {
                        localStorage.removeItem('userInfo');
                        window.location.href = '/login';
                    }}>Logout</Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default UserProfile;