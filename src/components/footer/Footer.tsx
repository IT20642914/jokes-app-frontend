"use client";

import React from "react";
import { Box, Typography, Grid, Link } from "@mui/material";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <Box
      className={styles.footer}
      component="footer"
      sx={{ padding: "20px", backgroundColor: "#0C0457", color: "white" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2">
            We are passionate about sharing jokes with the world. Our platform
            allows users to submit their funniest jokes and lets moderators
            ensure the best content is delivered.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Link href="/" color="inherit" underline="none">
            Home
          </Link>
          <br />
          <Link href="/submit-joke" color="inherit" underline="none">
            Submit a Joke
          </Link>
          <br />
          <Link href="/moderator-dashboard" color="inherit" underline="none">
            Moderator Dashboard
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2">Email: contact@jokesapp.com</Typography>
          <Typography variant="body2">Phone: +1 (123) 456-7890</Typography>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Jokes App. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
