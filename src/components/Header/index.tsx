import { Logout as LogoutIcon } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useOnGo } from "../../hooks/useOnGo";
import { BreadcrumbList } from "../BreadcrumbList";

export function Header() {
  const { user, logout, decodedToken } = useOnGo();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();

  function handleLogout() {
    logout();
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/terminals"
            sx={{ color: "inherit", textDecoration: "none", flexGrow: 1 }}
          >
            ON GO Cargas
          </Typography>

          <Button component={Link} to="/terminals">
            Terminais
          </Button>

          {Boolean(user) && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar>{decodedToken?.client_id.at(0)?.toUpperCase()}</Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Container>
        <BreadcrumbList />
      </Container>
    </>
  );
}
