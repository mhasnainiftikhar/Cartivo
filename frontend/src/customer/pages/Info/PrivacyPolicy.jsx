import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

const PrivacyPolicy = () => {
    return (
        <Container maxWidth={false} sx={{ maxWidth: '1440px', px: { xs: 2.5, lg: 10 }, py: 10, mx: 'auto' }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 800 }}>
                Privacy Policy
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Last updated: February 3, 2026
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>1. Information We Collect</Typography>
                <Typography variant="body1" paragraph>
                    We collect information from you when you register on our site, place an order, subscribe to our newsletter or fill out a form. This may include your name, email address, mailing address, phone number, and credit card information.
                </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>2. How We Use Your Information</Typography>
                <Typography variant="body1" paragraph>
                    Any of the information we collect from you may be used in one of the following ways:
                </Typography>
                <ul>
                    <li>To personalize your experience (your information helps us to better respond to your individual needs)</li>
                    <li>To improve our website (we continually strive to improve our website offerings based on the information and feedback we receive from you)</li>
                    <li>To improve customer service (your information helps us to more effectively respond to your customer service requests and support needs)</li>
                    <li>To process transactions</li>
                    <li>To send periodic emails</li>
                </ul>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>3. How We Protect Your Information</Typography>
                <Typography variant="body1" paragraph>
                    We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. We use state-of-the-art encryption to protect sensitive data transmitted online.
                </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>4. Cookies</Typography>
                <Typography variant="body1" paragraph>
                    Yes, we use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits and keep track of advertisements.
                </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>5. Disclosure to Third Parties</Typography>
                <Typography variant="body1" paragraph>
                    We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
                </Typography>
            </Box>
        </Container>
    );
};

export default PrivacyPolicy;
