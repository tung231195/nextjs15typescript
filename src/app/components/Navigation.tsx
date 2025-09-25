"use client"
import LocaleSwitcher from './LocaleSwitcher';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import Settings from './Settings';
import ToogleDarkMode from './ToogleDarkLight';

export default function Navigation() {

  return (
      <Box className="navigation">
          <Box>
              <AppBar position="relative" color="primary">
                <Toolbar>
                  {/* Logo hoặc tên app */}
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    My Logo
                  </Typography>
                  {/* Menu ngang */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Button color="inherit" component={Link} href="/">
                      Home
                    </Button>
                    <Button color="inherit" component={Link} href="/about">
                      About
                    </Button>
                    <Button color="inherit" component={Link} href="/blogs">
                      My Blogs
                    </Button>
                    <Button color="inherit" component={Link} href="/contact">
                      Contact
                    </Button>
                  </Box>
                  <LocaleSwitcher />
                  <Settings />
                  <ToogleDarkMode />
                </Toolbar>            
              </AppBar>

          </Box>
      </Box>
  );
}
