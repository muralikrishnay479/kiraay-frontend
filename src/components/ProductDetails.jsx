import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Rating,
  Paper,
  List,
  ListItem,
  ListItemText,
  Popover,
} from "@mui/material";
import { FavoriteBorder, Share, ChatBubbleOutline } from "@mui/icons-material";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main styles
import "react-date-range/dist/theme/default.css"; // Default theme
import { useTheme } from "@mui/material/styles";

const product = {
  id: 1,
  name: "Canon EOS R5 Mirrorless Camera",
  price: "$199/day",
  rating: 4.7,
  description:
    "The Canon EOS R5 is a full-frame mirrorless camera with a 45MP sensor, 8K video recording, and advanced autofocus.",
  images: [
    "https://picsum.photos/id/1005/800/600",
    "https://picsum.photos/id/1020/800/600",
    "https://picsum.photos/id/1025/800/600",
  ],
  specifications: [
    { label: "Sensor", value: "45MP Full-Frame CMOS" },
    { label: "Lens Mount", value: "RF Mount" },
    { label: "Video Resolution", value: "8K at 30fps" },
    { label: "Autofocus", value: "Dual Pixel CMOS AF II" },
    { label: "Battery Life", value: "Up to 320 shots" },
  ],
  availability: [
    { startDate: new Date(2025, 2, 12), endDate: new Date(2025, 2, 20) },
    { startDate: new Date(2023, 9, 25), endDate: new Date(2023, 9, 30) },
  ],
};

function ProductDetails() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark"; // Check theme mode

  const [dateRange, setDateRange] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [selectedImage, setSelectedImage] = React.useState(product.images[0]);

  // Popover State
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenCalendar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCalendar = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "availability-popover" : undefined;

  return (
    <Paper>
      <Box sx={{ p: 2, maxWidth: 1200, margin: "0 auto", pt: "74px" }}>
        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <img
                src={selectedImage}
                alt="Product"
                style={{ width: "100%", borderRadius: 8, maxHeight: 500 }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product ${index + 1}`}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 8,
                      cursor: "pointer",
                      border:
                        selectedImage === image
                          ? "2px solid #007bff"
                          : "1px solid #ddd",
                    }}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6} minHeight={"100vh"} overflow={"auto"}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              {product.price}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({product.rating}/5)
              </Typography>
            </Box>
            <Typography variant="body1" gutterBottom>
              {product.description}
            </Typography>

            {/* Icons */}
            <Box sx={{ display: "flex", gap: 2, my: 2 }}>
              <IconButton color="primary">
                <FavoriteBorder />
              </IconButton>
              <IconButton color="primary">
                <Share />
              </IconButton>
              <IconButton color="primary">
                <ChatBubbleOutline />
              </IconButton>
              <Button size="small" color="primary" onClick={handleOpenCalendar}>
                Check Availability
             </Button>
            </Box>

            {/* Specifications */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Specifications
              </Typography>
              <List>
                {product.specifications.map((spec, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={spec.label} secondary={spec.value} />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Check Availability Button */}
            <Box sx={{ mt: 3 }}>
              
           
            </Box>

            {/* Availability Popover */}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleCloseCalendar}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: isDarkMode ? "#121212" : "#ffffff",
                  color: isDarkMode ? "#ffffff" : "#000000",
                  border: `1px solid ${isDarkMode ? "#444" : "#ddd"}`,
                  "& .rdrCalendarWrapper": {
                    backgroundColor: isDarkMode ? "#121212" : "#ffffff",
                    color: isDarkMode ? "#ffffff" : "#000000",
                  },
                  "& .rdrDayNumber span": {
                    color: isDarkMode ? "#ffffff" : "#000000",
                  },
                  "& .rdrDayDisabled": {
                    backgroundColor: isDarkMode ? "#444" : "#f0f0f0",
                    color: isDarkMode ? "#bbb" : "#888",
                  },
                }}
              >   
             <DateRange
                  editableDateInputs={false}
                  minDate={new Date()}
                  disabledDay={(date) =>
                    product.availability.some(
                      ({ startDate, endDate }) =>
                        date >= startDate && date <= endDate
                    )
                  }
                />
              </Box>
            </Popover>

            {/* Rent/Buy Buttons */}
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button variant="contained" color="primary" size="large">
                Rent Now
              </Button>
              <Button variant="outlined" color="primary" size="large">
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default ProductDetails;
