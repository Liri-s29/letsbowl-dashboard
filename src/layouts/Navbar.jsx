import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "@mui/icons-material";
import _ from "lodash";
import { Box, Toolbar, IconButton, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Navbar = (props) => {
	const [cookies, setCookie] = useCookies(["auth"]);
	const navigate = useNavigate();
	return (
		<AppBar position="fixed" open={props.open}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={props.handleDrawerOpen}
					edge="start"
					sx={{
						marginRight: 5,
						...(props.open && { display: "none" }),
					}}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h4" noWrap component="div" sx={{ fontFamily: "Bebas Neue" }}>
					Dashboard | LetsBowl
				</Typography>
				<Box sx={{ flexGrow: 1 }}></Box>
				<IconButton
					onClick={(e) => {
						e.preventDefault();
						setCookie("auth", "", { path: "/" });
						navigate("/");
						props.setIsAuthenticated(false);
						props.handleDrawerClose();
					}}
				>
					<Logout sx={{ color: "#ffffff" }} />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
