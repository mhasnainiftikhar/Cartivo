import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

const PrivacyPolicy = () => {
    return (
        <Container maxWidth={false} sx={{ maxWidth: '1000px', mx: 'auto', px: { xs: 2.5, lg: 5 }, py: 12 }}>
            <Box sx={{ borderBottom: '1px solid #e0e0e0', pb: 4, mb: 6 }}>
                <Typography variant="overline" color="primary.main" sx={{ fontWeight: 800, letterSpacing: 1.5 }}>DATA PROTECTION</Typography>
                <Typography variant="h2" sx={{ fontWeight: 900, mt: 1, mb: 2 }}>Privacy Policy</Typography>
                <Typography variant="body1" color="text.secondary">
                    Last Updated: February 3, 2026
                </Typography>
            </Box>

            <Box component="article" sx={{
                '& h5': { fontWeight: 800, mt: 5, mb: 2, fontSize: '1.25rem', color: '#0f172a' },
                '& p': { lineHeight: 1.8, mb: 2, color: '#334155' },
                '& ul': { mb: 2, pl: 2, color: '#334155' },
                '& li': { mb: 1, lineHeight: 1.6 }
            }}>
                <Typography variant="h5">1. Information Collection</Typography>
                <Typography variant="body1">
                    We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and Services, when you participate in activities on the website or otherwise when you contact us.
                </Typography>

                <Typography variant="h5">2. Use of Information</Typography>
                <Typography variant="body1">
                    We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                </Typography>

                <Typography variant="h5">3. Information Sharing</Typography>
                <Typography variant="body1">
                    We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
                </Typography>

                <Typography variant="h5">4. Data Security</Typography>
                <Typography variant="body1">
                    We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                </Typography>
            </Box>
        </Container>
    );
};

export default PrivacyPolicy;
