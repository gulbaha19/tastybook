import styled from "@emotion/styled";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import NestedMenuItem from "material-ui-nested-menu-item";
import { LoginModal } from "./LoginModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../firebase";
import { useStore } from "../provider";
import { RegisterModal } from "./RegisterModal";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import { Logout } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Icon } from "../utils/Icon";

const Head = styled("header")`
  height: 84px;
  box-sizing: border-box;
  color: #666666;
  box-shadow: 0 0 6px rgb(0 0 0 / 15%);
  width: 100%;
  position: fixed;
  background-color: #fff;
  top: 0;
  padding: 20px 50px;
  z-index: 1009;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
const Select = styled(Button)`
  background-color: #f2f2f2 !important;
  background-size: 19px 19px;
  height: 35px;
  border-top-left-radius: 18px !important;
  border-bottom-left-radius: 18px !important;
  padding: 0 15px;
  border: 1px solid #ddd;
  color: #323c41;
  margin-right: 5px !important;
  text-transform: capitalize;
  width: 40%;

  &:hover,
  &:active,
  &:focus,
  &:visited {
    background-color: #f2f2f2;
    border-top-left-radius: 18px;
    border-bottom-left-radius: 18px;
  }
`;
const Search = styled(Input)`
  background: #f2f2f2;
  padding: 0 15px 0 35px;
  height: 35px;
  color: #666;
  outline: 0;
  -webkit-appearance: none;
  width: 100%;
  border: 1px solid #ddd;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  font-size: 12px;
  box-sizing: border-box;

  &:focus {
    border: 3px solid #ddd;
    font-size: 12px;
  }

  &:before,
  &:after {
    border-bottom: 0 !important;
  }
`;
const StyledMenu = styled(Menu)`
  top: 24px;

  .MuiList-root {
    background-color: #ebece9;
    border-bottom: solid 1px #e6dbdb4d;
    transition: all 0.1s ease-in-out;
    color: #323c41;
    text-align: left;
    width: 200px;
    padding: 0;

    div:hover {
      background-color: #fff;
    }

    li {
      justify-content: space-between;
      display: flex;
    }
  }
`;
const StyledNested = styled(NestedMenuItem)`
  width: 600px;

  .MuiPopover-paper {
    top: 84px;
    width: 400px;

    div:hover {
      background-color: #ebece9;
    }
  }
`;
export const LogIn = styled(Button)`
  background-color: rgba(48, 69, 109, 255) !important;
  color: #fff !important;
  padding: 2px 5px !important;
  text-transform: capitalize;
  border-radius: 18px !important;
  width: 70px;
  box-sizing: border-box;
  border: 1px solid #323c41 !important;
  height: 30px;

  &:hover {
    color: #323c41;
    border: 1px solid #323c41;
  }
`;
const StyledButton = styled(IconButton)`
  box-sizing: border-box;
  width: 70px;
  padding: 0;
  text-align: center;
  color: #323c41;
  font-size: 19px;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    font-weight: 700;
  }
`;

export const Header: FC = () => {
  const { store } = useStore();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElAvatar, setAnchorElAvatar] = React.useState<null | HTMLElement>(null);

  const openCategoryMenu = Boolean(anchorEl);
  const openAvatar = Boolean(anchorElAvatar);

  useEffect(() => {
    store.loadCategories();
  }, [store]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClickAvatar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAvatar(event.currentTarget);
  };
  const handleCloseAvatar = () => {
    setAnchorElAvatar(null);
  };

  const handleItemClick = (category: any, event: React.MouseEvent) => {};

  const navigate = useNavigate();

  const [open, setOpen] = React.useState<string | null>(null);
  const handleOpen = () => setOpen("login");
  const handleClose = () => setOpen(null);
  const handleOpenRegister = () => setOpen("register");
  const [user, loading] = useAuthState(auth);

  const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/recipes/${searchText}`, {});
    // console.log(event);
  };
  const drawer = (
    <Container onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          <img
            src="https://i.postimg.cc/RCw7bJXr/logo.png"
            alt="Logo"
            style={{ width: "100px", height: "auto" }}
          />
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      <MenuItem sx={{ display: { md: "none" } }} onClick={() => navigate("/favourites", {})}>
        <Icon type="Saved" /> Favourites
      </MenuItem>
      <MenuItem sx={{ display: { md: "none" } }} onClick={() => navigate("/add", {})}>
        ➕ Add Recipe
      </MenuItem>
      <Divider />
    </Container>
  );
  // const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <Head>
        <Link sx={{ display: { xs: "none", md: "flex" } }} href="/">
          <img
            src="https://i.postimg.cc/RCw7bJXr/logo.png"
            alt="Logo"
            style={{ width: "100px", height: "auto" }}
          />
        </Link>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none !important" } }}>
          <MenuIcon />
        </IconButton>
        <div style={{ display: "flex", alignItems: "center", width: "40%" }}>
          <Select
            onClick={(event) => setAnchorEl(event.currentTarget)}
            id="menu-button"
            aria-controls={open ? "category-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            endIcon={<ArrowDropDownIcon />}>
            <Typography>Categories</Typography>{" "}
          </Select>
          <StyledMenu
            id="category-menu"
            anchorEl={anchorEl}
            open={openCategoryMenu}
            onClose={() => setAnchorEl(null)}>
            {store.categories.map((category) => (
              <StyledNested id="sub-menu" label={category.name} parentMenuOpen={openCategoryMenu}>
                {category.children
                  ? Object.values(category.children).map((child) => (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <MenuItem onClick={(e) => handleItemClick(category, e)}>
                          {child.name}
                        </MenuItem>
                      </div>
                    ))
                  : null}
              </StyledNested>
            ))}
          </StyledMenu>
          <form style={{ width: "60%" }} onSubmit={(e) => handleSubmitSearch(e)}>
            <Search
              placeholder="Search for recipes..."
              value={searchText}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Add Recipe">
            <StyledButton
              sx={{ display: { xs: "none !important", md: "block !important" } }}
              onClick={() => {
                navigate("/add", {});
              }}>
              ➕
            </StyledButton>
          </Tooltip>

          <Tooltip title="Favourites">
            <StyledButton
              sx={{ display: { xs: "none !important", md: "block !important" } }}
              onClick={() => {
                navigate("/favourites", {});
              }}>
              <Icon type="Saved" />
            </StyledButton>
          </Tooltip>

          {loading ? (
            <Skeleton variant="circular" width={32} height={32} />
          ) : user ? (
            <>
              <Tooltip title="Account">
                <IconButton
                  onClick={handleClickAvatar}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={openAvatar ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openAvatar ? "true" : undefined}>
                  {user?.photoURL ? (
                    <Avatar alt="user" sx={{ width: 32, height: 32 }} src={user.photoURL} />
                  ) : (
                    <div>{user.email}</div>
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElAvatar}
                id="account-menu"
                open={openAvatar}
                onClose={handleCloseAvatar}
                onClick={handleCloseAvatar}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                <MenuItem onClick={() => navigate("/profile", {})}>
                  <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <LogIn onClick={handleOpen}>Login</LogIn>
          )}

          <LoginModal
            handleOpen={handleOpen}
            handleClose={handleClose}
            open={open === "login"}
            onChangeToRegister={handleOpenRegister}
          />
          <RegisterModal
            handleOpen={handleOpen}
            handleClose={handleClose}
            onChangeToLogin={handleOpen}
            open={open === "register"}
          />
        </div>
      </Head>
      <Box component="nav">
        <Drawer
          anchor={"left"}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: "45%" },
          }}>
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};
