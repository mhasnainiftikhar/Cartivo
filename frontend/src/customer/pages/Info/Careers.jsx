import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Button,
    Paper,
    Chip,
    Stack
} from '@mui/material';
import {
    RocketLaunch,
    Group,
    Favorite,
    EmojiEvents,
    LocationOn
} from '@mui/icons-material';

const Careers = () => {
    const jobs = [
        { title: "Senior Frontend Engineer", dept: "Engineering", location: "Remote / SF", type: "Full-time" },
        { title: "Product Designer", dept: "Design", location: "New York, NY", type: "Full-time" },
        { title: "Marketing Manager", dept: "Marketing", location: "London, UK", type: "Full-time" },
        { title: "Customer Success Lead", dept: "Support", location: "Remote", type: "Full-time" },
    ];

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    py: 15,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Container maxWidth={false} sx={{ maxWidth: '1440px', mx: 'auto', px: { xs: 2.5, lg: 10 }, position: 'relative', zIndex: 2 }}>
                    <Grid container alignItems="center" spacing={4}>
                        <Grid item xs={12} md={7}>
                            <Typography variant="overline" sx={{ letterSpacing: 2, fontWeight: 700, color: 'secondary.main' }}>
                                JOIN THE TEAM
                            </Typography>
                            <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, fontSize: { xs: '2.5rem', md: '4rem' } }}>
                                Build the future of <br /> e-commerce with us.
                            </Typography>
                            <Typography variant="h6" sx={{ opacity: 0.8, maxWidth: 600, mb: 4, fontWeight: 400 }}>
                                We're on a mission to revolutionize online shopping. Join a team of passionate creators, builders, and dreamers.
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                sx={{ px: 5, py: 1.5, fontSize: '1.1rem', fontWeight: 700, borderRadius: 10 }}
                            >
                                View Open Roles
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                            {/* Abstract visual placeholder */}
                            <Box sx={{
                                width: '100%',
                                height: 400,
                                bgcolor: 'rgba(255,255,255,0.1)',
                                borderRadius: '50% 50% 0 50%',
                                backdropFilter: 'blur(10px)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <RocketLaunch sx={{ fontSize: 150, opacity: 0.8 }} />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Benefits Section */}
            <Container maxWidth={false} sx={{ maxWidth: '1440px', mx: 'auto', px: { xs: 2.5, lg: 10 }, py: 12 }}>
                <Typography variant="h3" align="center" sx={{ fontWeight: 800, mb: 8 }}>
                    Why Cartivo?
                </Typography>
                <Grid container spacing={4}>
                    {[
                        { icon: <Group sx={{ fontSize: 40 }} />, title: "Great Culture", desc: "Collaborative, inclusive, and fun environment." },
                        { icon: <Favorite sx={{ fontSize: 40 }} />, title: "Health & Wellness", desc: "Comprehensive health coverage for you and your family." },
                        { icon: <EmojiEvents sx={{ fontSize: 40 }} />, title: "Growth", desc: "Learning budget and career development opportunities." },
                    ].map((item, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    height: '100%',
                                    textAlign: 'center',
                                    bgcolor: '#f8fafc',
                                    borderRadius: 4,
                                    transition: 'transform 0.3s',
                                    '&:hover': { transform: 'translateY(-10px)' }
                                }}
                            >
                                <Box sx={{ color: 'primary.main', mb: 2 }}>{item.icon}</Box>
                                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{item.title}</Typography>
                                <Typography color="text.secondary">{item.desc}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>


            {/* Jobs List */}
            <Box sx={{ bgcolor: '#f1f5f9', py: 12 }}>
                <Container maxWidth={false} sx={{ maxWidth: '1440px', mx: 'auto', px: { xs: 2.5, lg: 10 } }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 6 }}>
                        Open Positions
                    </Typography>

                    <Stack spacing={2}>
                        {jobs.map((job, index) => (
                            <Paper
                                key={index}
                                elevation={0}
                                sx={{
                                    p: 4,
                                    borderRadius: 3,
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    alignItems: { sm: 'center' },
                                    justifyContent: 'space-between',
                                    gap: 3,
                                    transition: '0.2s',
                                    '&:hover': { bgcolor: 'white', borderColor: 'primary.main', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }
                                }}
                            >
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{job.title}</Typography>
                                    <Stack direction="row" spacing={2} sx={{ mt: 1, color: 'text.secondary' }}>
                                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <Group fontSize="inherit" /> {job.dept}
                                        </Typography>
                                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <LocationOn fontSize="inherit" /> {job.location}
                                        </Typography>
                                    </Stack>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Chip label={job.type} size="small" sx={{ bgcolor: 'secondary.main', color: 'black', fontWeight: 600 }} />
                                    <Button variant="outlined" sx={{ borderRadius: 2 }}>Apply Now</Button>
                                </Box>
                            </Paper>
                        ))}
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export default Careers;
