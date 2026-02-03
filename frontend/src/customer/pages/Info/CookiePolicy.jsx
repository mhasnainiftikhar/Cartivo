import React from 'react';
import { Container, Typography, Box, Divider, Alert, AlertTitle } from '@mui/material';

const CookiePolicy = () => {
    return (
        <Container maxWidth={false} sx={{ maxWidth: '1000px', mx: 'auto', px: { xs: 2.5, lg: 10 }, py: 10 }}>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: 1 }}>LEGAL</Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>Cookie Policy</Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 6 }}>Last Updated: February 3, 2026</Typography>

            <Alert severity="info" sx={{ mb: 6 }}>
                <AlertTitle>Note</AlertTitle>
                We use cookies to improve your experience on our site. By using our site, you consent to cookies.
            </Alert>

            <Box component="article" sx={{ '& h4': { fontWeight: 800, mt: 4, mb: 2 }, '& p': { lineHeight: 1.8, mb: 2 } }}>
                <Typography variant="h4">1. What are cookies?</Typography>
                <Typography variant="body1">
                    Cookies are small text files that are stored on your computer or mobile device when you visit a website. They allow the website to remember your actions and preferences (such as login, language, font size and other display preferences) over a period of time.
                </Typography>

                <Typography variant="h4">2. How do we use cookies?</Typography>
                <Typography variant="body1">
                    We use cookies for several reasons:
                </Typography>
                <ul>
                    <li><strong>Essential Cookies:</strong> Necessary for the website to function (e.g., shopping cart).</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with the site.</li>
                    <li><strong>Marketing Cookies:</strong> Used to track visitors across websites to display relevant ads.</li>
                </ul>

                <Typography variant="h4">3. Managing your preferences</Typography>
                <Typography variant="body1">
                    You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
                </Typography>
            </Box>
        </Container>
    );
};

export default CookiePolicy;
