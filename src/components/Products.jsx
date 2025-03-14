import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  CardActionArea,
  CardActions,
  Rating,
  Menu,
  MenuItem,
  Chip,
  Paper,
} from "@mui/material";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import ChatIcon from "@mui/icons-material/Chat";
import ReplySharpIcon from "@mui/icons-material/ReplySharp";
import { useNavigate } from "react-router-dom";

function Filters({ selectedFilters, setSelectedFilters }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const filterOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Rating: 4+",
    "In Stock",
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (filter) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter]);
    }
    handleClose();
  };

  const handleDeleteFilter = (filterToDelete) => {
    setSelectedFilters(
      selectedFilters.filter((filter) => filter !== filterToDelete)
    );
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
      <Button variant="outlined" onClick={handleClick}>
        Filters
      </Button>

      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {filterOptions.map((option, index) => (
          <MenuItem key={index} onClick={() => handleFilterSelect(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {selectedFilters.map((filter, index) => (
          <Chip
            key={index}
            label={filter}
            onDelete={() => handleDeleteFilter(filter)}
            variant="outlined"
          />
        ))}
      </Box>

      {selectedFilters.length > 0 && (
        <Button
          variant="text"
          color="error"
          onClick={() => setSelectedFilters([])}
        >
          Clear All
        </Button>
      )}
    </Box>
  );
}

const products = [
  {
    id: 1,
    name: "Apple iPhone 14",
    price: 799,
    rating: 4.5,
    description: "6.1-inch display, A15 Bionic chip, Dual-camera system",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-blue-select-202209",
    inStock: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    price: 899,
    rating: 4.7,
    description: "6.8-inch AMOLED, Snapdragon 8 Gen 2, 200MP Camera",
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/in/sm-s711blgbins/gallery/in-galaxy-s23-fe-s711-479553-sm-s711blgbins-538355944?$684_547_PNG$", // Working image link
    inStock: true,
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    price: 399,
    rating: 4.6,
    description: "Industry-leading noise cancellation, 30-hour battery",
    image: "https://m.media-amazon.com/images/I/61f1YfTkTDL._AC_SL1500_.jpg",
    inStock: false,
  },
  {
    id: 4,
    name: "Apple MacBook Air M2",
    price: 1199,
    rating: 4.8,
    description: "13.6-inch Liquid Retina display, M2 chip, 18-hour battery",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-select-202306?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1684518479433", // Working image link
    inStock: true,
  },
];

export default function ProductGrid() {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    if (selectedFilters.includes("Rating: 4+") && product.rating < 4) {
      return false;
    }
    if (selectedFilters.includes("In Stock") && !product.inStock) {
      return false;
    }
    return true;
  });

  // Sort products based on selected filters
  if (selectedFilters.includes("Price: Low to High")) {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedFilters.includes("Price: High to Low")) {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <Paper>
      <Box sx={{ flexGrow: 1, p: 3, maxWidth: 1200, margin: "0 auto", pt: "74px" }}>
        <Filters
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={6} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => navigate(`/product-details`)}>
                  <CardMedia
                    component="img"
                    width="100%"
                    height={200}
                    image={product.image}
                    alt={product.name}
                    sx={{ pb: 0 }}
                  />
                  <CardContent sx={{ pb: 0 }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: "bold" }}
                    >
                      {product.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        pl: 1,
                        pr: 1,
                      }}
                    >
                      <Typography variant="body1" color="text.secondary">
                        ${product.price}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "text.secondary" }}
                      >
                        <Rating
                          name="size-small"
                          defaultValue={product.rating}
                          size="small"
                          precision={0.5}
                        />
                        {product.rating}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {product.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions
                  sx={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Button size="small" color="primary">
                    <ReplySharpIcon /> Share
                  </Button>
                  <Button size="small" color="primary">
                    <FavoriteBorderSharpIcon /> Like
                  </Button>
                  <Button size="small" color="primary">
                    <ChatIcon /> Chat
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}
