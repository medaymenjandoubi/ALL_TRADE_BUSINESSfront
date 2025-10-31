import * as React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
  Button,
  Stack,
  Badge,
  useMediaQuery,
  useTheme,
  Slide,
  Fade,Box
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TuneIcon from "@mui/icons-material/Tune";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { selectUserInfo } from "../../user/UserSlice";
import { selectCartItems } from "../../cart/CartSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { selectWishlistItems } from "../../wishlist/WishlistSlice";
import {
  selectProductIsFilterOpen,
  toggleFilters,
} from "../../products/ProductSlice";
import logo from "../../../assets/images/logo.png"
export const Navbar = ({ isProductList = false }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const userInfo = useSelector(selectUserInfo);
  const cartItems = useSelector(selectCartItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const wishlistItems = useSelector(selectWishlistItems);
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const is480 = useMediaQuery(theme.breakpoints.down(480));
  const location = useLocation();

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleToggleFilters = () => dispatch(toggleFilters());

  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const mainLinks = [
    { name: "Accueil", to: "/" },
    { name: "Devis", to: "/demanderDevis" },
    { name: "Services", to: "/services" },
    { name: "À propos", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  const settings = [
    {
      name: loggedInUser?.isAdmin ? "Profil" : "Mon profil",
      to: loggedInUser?.isAdmin ? "/admin/profile" : "/profile",
    },
    {
      name: loggedInUser?.isAdmin ? "Commandes" : "Mes commandes",
      to: loggedInUser?.isAdmin ? "/admin/orders" : "/orders",
    },
    { name: "Se déconnecter", to: "/logout" },
  ];

  return (
    <Slide direction="down" in={visible} timeout={600}>
      <Fade in={visible} timeout={800}>
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: "#E9EEF6",
            color: "#2B4A6F",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <Toolbar
            sx={{
              p: 1,
              height: "4rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
<Stack
  direction="row"
  alignItems="center"
  component={Link}
  to="/"
  sx={{
    textDecoration: "none",
    color: "inherit",
  }}
>
  <Box
    component="img"
    src={logo}
    alt="All Trade Business Logo"
    sx={{
      height: 40,
      width: "auto",
      mr: 1.5,
      objectFit: "contain",
      transition: "transform 0.3s ease",
      "&:hover": { transform: "scale(1.05)" },
    }}
  />
  {!is480 && (
    <Typography
      variant="h6"
      fontWeight={700}
      letterSpacing=".1rem"
      sx={{
        color: "#AA7E39",
        "&:hover": { color: "#AA9139" },
      }}
    >
      All Trade Business
    </Typography>
  )}
</Stack>


            {/* NAVIGATION LINKS */}
            {!is480 && (
              <Stack direction="row" spacing={3}>
                {mainLinks
                  .filter((link) => link.to !== location.pathname)
                  .map((link) => (
                    <Button
                      key={link.name}
                      component={Link}
                      to={link.to}
                      sx={{
                        position: "relative",
                        color: "#2B4A6F",
                        fontWeight: 500,
                        textTransform: "none",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          bottom: -4,
                          width:
                            location.pathname === link.to ? "100%" : "0%",
                          height: "2px",
                          backgroundColor: "#AA9139",
                          transition: "width 0.3s ease-in-out",
                        },
                        "&:hover::after": {
                          width: "100%",
                        },
                        "&:hover": { color: "#AA9139" },
                      }}
                    >
                      {link.name}
                    </Button>
                  ))}
              </Stack>
            )}

            {/* SECTION UTILISATEUR */}
            <Stack direction="row" alignItems="center" spacing={2}>
              {/* ICON UTILISATEUR */}
              <Tooltip title="Menu utilisateur">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ color: "#2B4A6F" }}
                >
                  <AccountCircleOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>

              {/* MENU UTILISATEUR */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                PaperProps={{
                  sx: {
                    backgroundColor: "#fff",
                    color: "#2B4A6F",
                    borderRadius: 2,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={handleCloseUserMenu}
                    component={Link}
                    to={setting.to}
                    sx={{
                      color: "#2B4A6F",
                      "&:hover": { color: "#AA9139" },
                    }}
                  >
                    {setting.name}
                  </MenuItem>
                ))}
              </Menu>

              {/* MESSAGE D’ACCUEIL */}
              <Typography variant="subtitle1" fontWeight={400}>
                {loggedInUser ? (
                  is480 ? (
                    userInfo?.name?.split(" ")[0]
                  ) : (
                    `Bienvenue à bord, ${userInfo?.name?.split(" ")[0]} 🌟`
                  )
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#AA9139",
                      color: "#fff",
                      fontWeight: 600,
                      "&:hover": { backgroundColor: "#AA7E39" },
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Se connecter
                  </Button>
                )}
              </Typography>

              {/* ADMIN */}
              {loggedInUser?.isAdmin && (
                <Button
                  variant="outlined"
                  sx={{
                    color: "#2B4A6F",
                    borderColor: "#AA9139",
                    "&:hover": {
                      backgroundColor: "#AA9139",
                      color: "#fff",
                    },
                  }}
                  onClick={() => navigate("/admin/dashboard")}
                >
                  Admin
                </Button>
              )}

              {/* ICONES ACTIONS */}
              <Stack direction="row" spacing={1} alignItems="center">
                <Badge badgeContent={cartItems.length} color="error">
                  <IconButton
                    onClick={() => navigate("/cart")}
                    sx={{ color: "#2B4A6F" }}
                  >
                    <ShoppingCartOutlinedIcon />
                  </IconButton>
                </Badge>

                {!loggedInUser?.isAdmin && (
                  <Badge badgeContent={wishlistItems?.length} color="error">
                    <IconButton
                      component={Link}
                      to="/wishlist"
                      sx={{ color: "#2B4A6F" }}
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                  </Badge>
                )}

                {isProductList && (
                  <IconButton onClick={handleToggleFilters}>
                    <TuneIcon
                      sx={{
                        color: isProductFilterOpen ? "#AA9139" : "#2B4A6F",
                      }}
                    />
                  </IconButton>
                )}
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>
      </Fade>
    </Slide>
  );
};
