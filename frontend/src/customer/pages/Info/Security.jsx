import React from 'react';
import { Container, Typography, Box, Divider, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Security as SecurityIcon, VerifiedUser, Lock, CreditCard } from '@mui/icons-material';

const Security = () => {
    return (
        <Container maxWidth={false} sx={{ maxWidth: '1440px', mx: 'auto', px: { xs: 2.5, lg: 10 }, py: 10 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <SecurityIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>Security at Cartivo</Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                    Your trust is our top priority. We use industry-leading security measures to protect your data and transactions.
                </Typography>
            </Box>

            <Grid container spacing={4} sx={{ mb: 10 }}>
                {[
                    { icon: <Lock />, title: "SSL Encryption", desc: "All data transmitted between your browser and our servers is encrypted using 256-bit SSL technology." },
                    { icon: <CreditCard />, title: "PCI-DSS Compliant", desc: "We adhere to the Payment Card Industry Data Security Standard to ensure secure handling of credit card info." },
                    { icon: <VerifiedUser />, title: "Fraud Protection", desc: "Our advanced fraud detection systems monitor transactions 24/7 to prevent unauthorized activity." },
                ].map((item, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Paper elevation={0} sx={{ p: 4, height: '100%', textAlign: 'center', border: '1px solid #e0e0e0', borderRadius: 4 }}>
                            <Box sx={{ color: 'primary.main', mb: 2 }}>{React.cloneElement(item.icon, { fontSize: "large" })}</Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{item.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Reporting Issues */}
            <Paper sx={{ p: 6, bgcolor: '#f8fafc', borderRadius: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>Report a Security Issue</Typography>
                <Typography paragraph>
                    If you believe you have found a security vulnerability in our platform, please let us know immediately. We take all reports seriously and will investigate promptly.
                </Typography>
                <Typography fontWeight={700}>Email: security@cartivo.com</Typography>
            </Paper>
        </Container>
    );
};
import { Grid } from '@mui/material'; // Forgot import

export default Security;
