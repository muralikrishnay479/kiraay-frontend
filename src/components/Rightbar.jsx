import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Rightbar() {
  return (
    <Box sx={{ flexGrow:2, p: 2, bgcolor: 'background.paper', color: 'text.primary',  display: "none"}}>
      <Typography variant="h6">Rightbar</Typography>
    </Box>
  );
}