import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Logout } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CategoryIcon from "@mui/icons-material/Category";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

export default function Dashboard(props) {
	const [open, setOpen] = React.useState(false);
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<Navbar open={open} handleDrawerOpen={handleDrawerOpen} setIsAuthenticated={props.setIsAuthenticated} />
			<Sidebar open={open} handleDrawerClose={handleDrawerClose} categories={props.categories} />
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />	
				<Outlet />
			</Box>
		</Box>
	);
}
