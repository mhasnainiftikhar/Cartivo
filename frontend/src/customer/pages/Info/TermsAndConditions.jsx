import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

const TermsAndConditions = () => {
    return (
        <Container maxWidth={false} sx={{ maxWidth: '1440px', px: { xs: 2.5, lg: 10 }, py: 10, mx: 'auto' }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 800 }}>
                Terms & Conditions
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Last updated: February 3, 2026
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>1. Agreement to Terms</Typography>
                <Typography variant="body1" paragraph>
                    Welcome to Cartivo. By accessing or using our website, you agree to be bound by these Terms & Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>2. Use License</Typography>
                <Typography variant="body1" paragraph>
                    Permission is granted to temporarily download one copy of the materials (information or software) on Cartivo's website for personal, non-commercial transitory viewing only.
                </Typography>
                <Typography variant="body1" paragraph>
                    This is the grant of a license, not a transfer of title, and under this license you may not:
                </Typography>
                <ul>
                    <li>Modify or copy the materials;</li>
                    <li>Use the materials for any commercial purpose, or for any public display;</li>
                    <li>Attempt to decompile or reverse engineer any software contained on the website;</li>
                    <li>Remove any copyright or other proprietary notations from the materials.</li>
                </ul>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>3. Account Responsibility</Typography>
                <Typography variant="body1" paragraph>
                    If you use this site, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password.
                </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>4. Product Descriptions</Typography>
                <Typography variant="body1" paragraph>
                    Cartivo attempts to be as accurate as possible. However, Cartivo does not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free.
                </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>5. Limitation of Liability</Typography>
                <Typography variant="body1" paragraph>
                    In no event shall Cartivo or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Cartivo's website.
                </Typography>
            </Box>
        </Container>
    );
};

export default TermsAndConditions;
