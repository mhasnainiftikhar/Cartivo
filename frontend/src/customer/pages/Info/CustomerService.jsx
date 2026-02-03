import React from 'react';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Grid, Paper, Stack } from '@mui/material';
import { ExpandMore, SupportAgent, LocalShipping, Payment, KeyboardReturn } from '@mui/icons-material';

const CustomerService = () => {
    const faqs = [
        {
            question: "How can I track my order?",
            answer: "You can track your order by clicking on the 'Track Order' link in your order confirmation email or by visiting the 'My Orders' section in your account profile."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for most items. The product must be in its original packaging and unused. Please visit our Returns page for more details."
        },
        {
            question: "How do I change my shipping address?",
            answer: "If your order has not been shipped yet, you can update your shipping address by contacting our support team with your order number."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, Mastercard, AMEX), PayPal, and Apple Pay."
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 800, mb: 4 }}>
                Customer Service
            </Typography>

            <Grid container spacing={4} sx={{ mb: 8 }}>
                {[
                    { icon: <SupportAgent sx={{ fontSize: 40 }} />, title: "24/7 Support", desc: "Our team is here to help you anytime." },
                    { icon: <LocalShipping sx={{ fontSize: 40 }} />, title: "Track Shipping", desc: "Keep an eye on your delivery status." },
                    { icon: <Payment sx={{ fontSize: 40 }} />, title: "Secure Payment", desc: "Your transactions are always safe." },
                    { icon: <KeyboardReturn sx={{ fontSize: 40 }} />, title: "Easy Returns", desc: "Hassle-free 30-day return policy." }
                ].map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'background.default', border: '1px solid #e2e8f0' }}>
                            <Box color="primary.main" sx={{ mb: 2 }}>{item.icon}</Box>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Frequently Asked Questions
            </Typography>

            <Box sx={{ mb: 6 }}>
                {faqs.map((faq, index) => (
                    <Accordion key={index} elevation={0} sx={{ border: '1px solid #e2e8f0', '&:before': { display: 'none' }, mb: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography sx={{ fontWeight: 600 }}>{faq.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="text.secondary">
                                {faq.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>

            <Paper sx={{ p: 4, bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                    Still need help?
                </Typography>
                <Typography sx={{ mb: 3, opacity: 0.9 }}>
                    Our customer service team is available 24/7 to assist you with any questions or concerns.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                    <Typography variant="body1">Email: <strong>support@cartivo.com</strong></Typography>
                    <Typography variant="body1">Phone: <strong>+1 (555) 123-4567</strong></Typography>
                </Stack>
            </Paper>
        </Container>
    );
};

export default CustomerService;
