import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    Avatar,
    Stack,
    Chip
} from '@mui/material';

const Blog = () => {
    const posts = [
        {
            title: "The Ultimate Guide to Smart Home Setup",
            category: "Tech",
            image: "https://images.unsplash.com/photo-1558002038-1091a1661116?w=800&auto=format&fit=crop&q=60",
            author: "Alex Chen",
            date: "3 days ago"
        },
        {
            title: "Summer Fashion Trends You Can't Miss",
            category: "Fashion",
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=60",
            author: "Sarah Smith",
            date: "1 week ago"
        },
        {
            title: "Minimum Viable Wardrobe: Less is More",
            category: "Lifestyle",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=60",
            author: "Mike Ross",
            date: "2 weeks ago"
        },
    ];

    return (
        <Box sx={{ minHeight: '100vh', py: 10, bgcolor: '#fafafa' }}>
            <Container maxWidth={false} sx={{ maxWidth: '1440px', mx: 'auto', px: { xs: 2.5, lg: 10 } }}>
                <Box sx={{ mb: 8, textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ fontWeight: 900, mb: 2 }}>The Cartivo Blog</Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>Stories, tips, and inspiration for modern living.</Typography>
                </Box>

                <Grid container spacing={4}>
                    {/* Featured Post could go here */}

                    {posts.map((post, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card elevation={0} sx={{ height: '100%', borderRadius: 4, bgcolor: 'transparent' }}>
                                <CardActionArea sx={{ '&:hover .MuiCardMedia-root': { transform: 'scale(1.05)' } }}>
                                    <Box sx={{ overflow: 'hidden', borderRadius: 4, mb: 2 }}>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={post.image}
                                            alt={post.title}
                                            sx={{ transition: 'transform 0.3s' }}
                                        />
                                    </Box>
                                    <CardContent sx={{ px: 1 }}>
                                        <Chip label={post.category} size="small" sx={{ mb: 2, fontWeight: 700, bgcolor: 'white' }} />
                                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.2 }}>
                                            {post.title}
                                        </Typography>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main', fontSize: 12 }}>{post.author[0]}</Avatar>
                                            <Typography variant="caption" sx={{ fontWeight: 600 }}>{post.author}</Typography>
                                            <Typography variant="caption" color="text.secondary">• {post.date}</Typography>
                                        </Stack>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Blog;
