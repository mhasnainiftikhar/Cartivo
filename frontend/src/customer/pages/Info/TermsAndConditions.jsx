import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

const TermsAndConditions = () => {
    return (
        <Container maxWidth={false} sx={{ maxWidth: '1000px', mx: 'auto', px: { xs: 2.5, lg: 5 }, py: 12 }}>
            <Box sx={{ borderBottom: '1px solid #e0e0e0', pb: 4, mb: 6 }}>
                <Typography variant="overline" color="primary.main" sx={{ fontWeight: 800, letterSpacing: 1.5 }}>LEGAL REFERENCE</Typography>
                <Typography variant="h2" sx={{ fontWeight: 900, mt: 1, mb: 2 }}>Terms of Service</Typography>
                <Typography variant="body1" color="text.secondary">
                    Effective Date: February 3, 2026 &bull; Version 2.4
                </Typography>
            </Box>

            <Box component="article" sx={{
                '& h5': { fontWeight: 800, mt: 5, mb: 2, fontSize: '1.25rem', color: '#0f172a' },
                '& p': { lineHeight: 1.8, mb: 2, color: '#334155' },
                '& ul': { mb: 2, pl: 2, color: '#334155' },
                '& li': { mb: 1, lineHeight: 1.6 }
            }}>
                <Typography variant="h5">1. Overview</Typography>
                <Typography variant="body1">
                    This website is operated by Cartivo Inc. Throughout the site, the terms "we", "us" and "our" refer to Cartivo. Cartivo offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
                </Typography>

                <Typography variant="h5">2. User Agreement</Typography>
                <Typography variant="body1">
                    By visiting our site and/ or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions ("Terms of Service", "Terms"), including those additional terms and conditions and policies referenced herein and/or available by hyperlink.
                </Typography>

                <Typography variant="h5">3. General Conditions</Typography>
                <Typography variant="body1">
                    We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.
                </Typography>

                <Typography variant="h5">4. Accuracy of Billing</Typography>
                <Typography variant="body1">
                    We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address.
                </Typography>

                <Typography variant="h5">5. Third-Party Links</Typography>
                <Typography variant="body1">
                    Certain content, products and services available via our Service may include materials from third-parties. Third-party links on this site may direct you to third-party websites that are not affiliated with us.
                </Typography>
            </Box>
        </Container>
    );
};

export default TermsAndConditions;
