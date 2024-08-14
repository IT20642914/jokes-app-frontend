"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import styles from "./NavBar.module.scss";
const NavBar: React.FC = () => {
  return (
    <AppBar position="static" className={styles.nav}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Jokes App
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/submit-joke">
            Submit Joke
          </Button>
          <Button color="inherit" component={Link} href="/moderator-dashboard">
            Moderator Dashboard
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
