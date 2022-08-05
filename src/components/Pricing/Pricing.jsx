import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { editPricing, getPricing } from "../../services/firebase.firestore";
import _ from "lodash";
import AddPricing from "./AddPricing";

const Pricing = (props) => {
	const [priceList, setPriceList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getPricingDetails();
	}, []);

	async function getPricingDetails() {
		const list = await getPricing();
		setPriceList(list.docs.map((doc) => doc.data()));
		setLoading(false);
	}

	return (
		<Box sx={{ height: "100%" }}>
			<Typography variant="h4" sx={{ mb: "3rem", fontFamily: "Bebas Neue" }}>
				Pricing
			</Typography>
			<Stack direction="row" flexWrap="wrap" justifyContent="space-evenly" alignItems="center">
				{loading ? (
					<Typography variant="h2">Loading...</Typography>
				) : (
					priceList.map((data, index) => <PriceCard key={index} data={data} />)
				)}
			</Stack>
		</Box>
	);

	function PriceCard(props) {
		const [open, setOpen] = React.useState(false);

		const handleClickOpen = () => {
			setOpen(true);
		};

		const handleClose = () => {
			setOpen(false);
		};
		return (
			<div>
				<AddPricing
					open={open}
					handleClose={handleClose}
					pricing={props.data.data}
					id={props.data.id}
					name={props.data.name}
					getPricingDetails={getPricingDetails}
				/>
				<Paper
					sx={{
						width: "300px",
						my: "1rem",
						position: "relative",
						background: "#151515",
						borderRadius: "50px",
						padding: "10px",
						transition: "background .2s ease-in-out",
						opacity: "1",
						"&:hover": { background: "#F8F2F8", cursor: "pointer" },
					}}
					onClick={handleClickOpen}
				>
					<Bg1 />
					<Bg2 />
					<Stack
						direction="column"
						justifyContent="space-evenly"
						alignItems="center"
						spacing={2}
						sx={{ height: "100%", color: "#ffffff" }}
					>
						<Typography
							variant="h3"
							sx={{ fontFamily: "Anton", color: props.data.id % 2 == 0 ? "#FF42D3" : "#00DCFF" }}
						>
							{props.data.name}
						</Typography>
						{props.data.data.map((category, index) => (
							<Stack key={index} direction="column" justifyContent="center" alignItems="center">
								<Typography variant="h5" sx={{ fontWeight: "600", color: "#7B7B7B" }}>
									{_.replace(category.name, "_", " ")}
								</Typography>
								<Typography variant="h5" sx={{ color: "#D4D4D4", textAlign: "center" }}>
									{category.name == "Bowling" ? `${category.price} / person / game.` : ""}
									{category.name == "Billiards"
										? `Small table ${category.price[0]} & Medium table ${category.price[1]} / hour.`
										: ""}
									{category.name == "Turf" ? `${category.price} / hour.` : ""}
									{category.name == "Machine Cricket" ? `${category.price} / person.` : ""}
									{category.name == "Basketball" ? `${category.price}` : ""}
								</Typography>
							</Stack>
						))}
					</Stack>
				</Paper>
			</div>
		);
	}
};

const Bg1 = () => {
	return (
		<Paper
			sx={{
				height: "100%",
				width: "100%",
				position: "absolute",
				top: "0",
				left: "0",
				background: "#FFE6FB",
				borderRadius: "50px",
				innerShadow: "10px 13px 45px #F3E8F3",
				boxShadow: "8px 8px 50px #FFFFFF",
				opacity: ".1",
				filter: "blur(.5px)",
			}}
		/>
	);
};

const Bg2 = () => {
	return (
		<Paper
			sx={{
				height: "100%",
				width: "100%",
				position: "absolute",
				top: "0",
				left: "0",
				borderRadius: "50px",
				background: "transparent",
				border: "1px solid #F8F2F8",
			}}
		/>
	);
};

export default Pricing;
