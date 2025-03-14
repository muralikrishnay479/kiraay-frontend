import {
    Paper,
    Box,
    Typography,
    Button,
    Grid,
    Container,
    Card,
    CardContent,
  } from '@mui/material';
  import React from 'react';
  
  function Home() {
    return (
      <Paper sx={{ p: 2 }}>
        <Box
          sx={{
            minHeight: '100vh',
            fontFamily: "'Open Sans', 'Roboto', sans-serif", // Tested: Open Sans for a Peerby-like light feel
            bgcolor: '#fff',
            color: '#333',
          }}
        >
          {/* Hero Section */}
          <Box
            sx={{
              py: { xs: 4, md: 8 }, // Tested: Reduced padding for a tighter, modern look
              textAlign: 'center',
              bgcolor: '#f7f9fc', // Tested: Slightly bluer gray than #f5f7fa for freshness
              backgroundImage: 'url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80")', // Tested: Subtle background image
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'rgba(255, 255, 255, 0.7)', // Tested: Overlay for readability
              },
            }}
          >
            <Container maxWidth="sm"> {/* Tested: Smaller maxWidth for focus */}
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '1.8rem', md: '2.5rem' }, // Tested: Smaller for elegance
                  fontWeight: 600, // Tested: Lighter weight for friendliness
                  color: '#2ecc71', // Tested: Brighter Peerby green
                  mb: 2,
                  position: 'relative',
                }}
              >
                Welcome to ShareSphere
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '0.9rem', md: '1.1rem' }, // Tested: Smaller, subtler
                  color: '#555', // Tested: Darker gray for contrast
                  maxWidth: '600px',
                  mx: 'auto',
                  mb: 3,
                  position: 'relative',
                }}
              >
                Borrow from neighbors, lend what you don’t need, and build a stronger community—together.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#2ecc71', // Tested: Brighter green
                    color: '#fff',
                    px: 3, // Tested: Smaller padding
                    py: 1,
                    borderRadius: 2, // Tested: Less rounding
                    fontSize: '0.9rem', // Tested: Smaller text
                    fontWeight: 500,
                    '&:hover': { bgcolor: '#27ae60' },
                  }}
                >
                  Start Borrowing
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: '#2ecc71',
                    color: '#2ecc71',
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    '&:hover': { bgcolor: '#e9f7ef', borderColor: '#27ae60' }, // Tested: Lighter hover
                  }}
                >
                  Lend Something
                </Button>
              </Box>
            </Container>
          </Box>
  
          {/* How It Works Section */}
          <Box sx={{ py: 5 }}> {/* Tested: Reduced padding */}
            <Container maxWidth="md"> {/* Tested: Narrower for alignment */}
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.75rem' }, // Tested: Smaller heading
                  fontWeight: 600,
                  color: '#333',
                  textAlign: 'center',
                  mb: 4,
                }}
              >
                How ShareSphere Works
              </Typography>
              <Grid container spacing={2} justifyContent="center"> {/* Tested: Tighter spacing */}
                {[
                  { title: 'Browse', desc: 'See what’s available nearby' },
                  { title: 'Request', desc: 'Ask to borrow with a click' },
                  { title: 'Share', desc: 'Meet up and exchange' },
                ].map((item) => (
                  <Grid item xs={12} sm={4} key={item.title}>
                    <Card
                      sx={{
                        textAlign: 'center',
                        p: 2, // Tested: Smaller padding
                        borderRadius: 2,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)', // Tested: Lighter shadow
                        border: 'none', // Tested: No border for Peerby’s minimalism
                        '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
                      }}
                    >
                      <CardContent sx={{ p: 0 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: '1.1rem', // Tested: Smaller title
                            color: '#2ecc71',
                            mb: 1,
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: '0.85rem', // Tested: Smaller desc
                            color: '#555',
                          }}
                        >
                          {item.desc}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
  
          {/* Benefits Section */}
          <Box sx={{ py: 5, bgcolor: '#f9fafb' }}> {/* Tested: Slightly different gray */}
            <Container maxWidth="md">
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.75rem' },
                  fontWeight: 600,
                  color: '#333',
                  textAlign: 'center',
                  mb: 4,
                }}
              >
                Why Choose ShareSphere?
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {[
                  { benefit: 'Save Cash', desc: 'Borrow instead of buying' },
                  { benefit: 'Go Green', desc: 'Reuse and reduce waste' },
                  { benefit: 'Connect', desc: 'Meet your neighbors' },
                ].map((item) => (
                  <Grid item xs={12} sm={4} key={item.benefit}>
                    <Card
                      sx={{
                        textAlign: 'center',
                        p: 2,
                        borderRadius: 2,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        border: 'none',
                        '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
                      }}
                    >
                      <CardContent sx={{ p: 0 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: '1.1rem',
                            color: '#f39c12', // Tested: Peerby-like orange
                            mb: 1,
                          }}
                        >
                          {item.benefit}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: '0.85rem',
                            color: '#555',
                          }}
                        >
                          {item.desc}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
  
          {/* Call to Action */}
          <Box sx={{ py: 5, textAlign: 'center' }}>
            <Container maxWidth="sm">
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.5rem' }, // Tested: Smaller CTA
                  color: '#333',
                  mb: 2, // Tested: Reduced margin
                }}
              >
                Join the Sharing Revolution
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#f39c12', // Tested: Brighter orange
                  color: '#fff',
                  px: 4,
                  py: 1,
                  borderRadius: 2,
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  '&:hover': { bgcolor: '#e08e0b' },
                }}
              >
                Get Started Now
              </Button>
            </Container>
          </Box>
  
          {/* Footer Section */}
          <Box
            sx={{
              py: 3, // Tested: Smaller footer
              bgcolor: '#2ecc71', // Tested: Brighter green
              color: '#fff',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.8rem', // Tested: Smaller text
              }}
            >
              © 2025 ShareSphere | Share More, Own Less
            </Typography>
          </Box>
        </Box>
      </Paper>
    );
  }
  
  export default Home;