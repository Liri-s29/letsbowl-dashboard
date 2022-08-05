import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import TableViewIcon from "@mui/icons-material/TableView";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CategoryIcon from "@mui/icons-material/Category";
import DataArrayIcon from "@mui/icons-material/DataArray";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

const Sidebar = (props) => {
	const theme = useTheme();
	return (
		<Drawer variant="permanent" open={props.open}>
			<DrawerHeader>
				<IconButton onClick={props.handleDrawerClose}>
					{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
				{/* ---------------------------------------------------------- */}
				<ListItems text="Bookings" url="/home" open={props.open} icon={<TableViewIcon />} />
				<ListItems text="Offers" url="offers" open={props.open} icon={<LocalOfferIcon />} />
				<ListItemsConst text="Pricing" url="pricing" open={props.open} icon={<CurrencyRupeeIcon />} />

				<ListItemsConst text="Manage Categories" url="manage_catagories" open={props.open} icon={<DataArrayIcon />} />
				<ListItems text="Carousel Inner" url="carousel_inner" open={props.open} icon={<ViewCarouselIcon />} />
				<ListItems text="Carousel Outer" url="carousel_outer" open={props.open} icon={<ViewCarouselIcon />} />
				{props.categories.map((category, index) => (
					<ListItems
						text={_.replace(category, "_", " ")}
						url={_.toLower(category)}
						open={props.open}
						icon={<CategoryIcon />}
						key={index}
					/>
				))}
				{/* ---------------------------------------------------------- */}
			</List>
		</Drawer>
	);
};

const ListItemsConst = (props) => {
	const Navigate = useNavigate();
	return (
		<ListItem disablePadding sx={{ display: "block" }}>
			<ListItemButton
				sx={{
					minHeight: 48,
					justifyContent: props.open ? "initial" : "center",
					px: 2.5,
				}}
				onClick={() => {
					Navigate(props.url);
				}}
			>
				<ListItemIcon
					sx={{
						minWidth: 0,
						mr: props.open ? 3 : "auto",
						justifyContent: "center",
					}}
				>
					{props.icon}
				</ListItemIcon>
				<ListItemText primary={props.text} sx={{ opacity: props.open ? 1 : 0 }} />
			</ListItemButton>
		</ListItem>
	);
};

const ListItems = (props) => {
	const Navigate = useNavigate();
	return (
		<ListItem disablePadding sx={{ display: "block" }}>
			<ListItemButton
				sx={{
					minHeight: 48,
					justifyContent: props.open ? "initial" : "center",
					px: 2.5,
				}}
				onClick={() => {
					Navigate(props.url);
					window.location.reload();
				}}
			>
				<ListItemIcon
					sx={{
						minWidth: 0,
						mr: props.open ? 3 : "auto",
						justifyContent: "center",
					}}
				>
					{props.icon}
				</ListItemIcon>
				<ListItemText primary={props.text} sx={{ opacity: props.open ? 1 : 0 }} />
			</ListItemButton>
		</ListItem>
	);
};
export default Sidebar;
