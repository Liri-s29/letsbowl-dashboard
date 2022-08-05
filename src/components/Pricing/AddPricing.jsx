import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Typography } from "@mui/material";
import _ from "lodash";
import { editPricing } from "../../services/firebase.firestore";

export default function AddPricing(props) {
	const [bowling, setBowling] = React.useState(props.pricing[0].price);
	const [billiards, setBilliards] = React.useState(props.pricing[1].price[0]);
	const [billiards1, setBilliards1] = React.useState(props.pricing[1].price[1]);
	const [turf, setTurf] = React.useState(props.pricing[2].price);
	const [machineCricket, setMachineCricket] = React.useState(props.pricing[3].price);
	const [basketball, setBasketball] = React.useState(props.pricing[4].price);

	const handleSubmit = () => {
		const id = props.id;
		const data = {
			id: id,
			name: props.name,
			data: [
				{
					name: "Bowling",
					price: bowling,
				},
				{
					name: "Billiards",
					price: [billiards, billiards1],
				},
				{
					name: "Turf",
					price: turf,
				},
				{
					name: "Machine Cricket",
					price: machineCricket,
				},
				{
					name: "Basketball",
					price: basketball,
				},
			],
		};

		editPricing(id, data);
		props.getPricingDetails();
		props.handleClose();
	};

	return (
		<div>
			<Dialog open={props.open} onClose={props.handleClose}>
				<DialogTitle>Edit Pricing</DialogTitle>
				<DialogContent>
					{props.pricing.map((category, index) => (
						<Stack key={index} direction="column" justifyContent="center" alignItems="center" sx={{ mb: "1rem" }}>
							{/* <Typography variant="h5" sx={{ fontWeight: "600", color: "#7B7B7B" }}>
								{_.replace(category.name, "_", " ")}
							</Typography> */}
							<Typography variant="h5" sx={{ color: "#D4D4D4", textAlign: "center" }}>
								{category.name == "Bowling" ? (
									<TextField
										label="Bowling"
										onChange={(e) => {
											setBowling(e.target.value);
										}}
										variant="standard"
										defaultValue={bowling}
									/>
								) : (
									<></>
								)}
								{category.name == "Billiards" ? (
									<>
										<TextField
											label="Billiards - Small"
											onChange={(e) => {
												setBilliards(e.target.value);
											}}
											variant="standard"
											defaultValue={billiards}
										/>
										<br />
										<TextField
											label="Billiards - Large"
											onChange={(e) => {
												setBilliards1(e.target.value);
											}}
											variant="standard"
											defaultValue={billiards1}
										/>
									</>
								) : (
									<></>
								)}
								{category.name == "Turf" ? (
									<TextField
										label="Turf"
										onChange={(e) => {
											setTurf(e.target.value);
										}}
										variant="standard"
										defaultValue={turf}
									/>
								) : (
									<></>
								)}
								{category.name == "Machine Cricket" ? (
									<TextField
										label="Machine Cricket"
										onChange={(e) => {
											setMachineCricket(e.target.value);
										}}
										variant="standard"
										defaultValue={machineCricket}
									/>
								) : (
									<></>
								)}
								{category.name == "Basketball" ? (
									<TextField
										label="Basketball"
										onChange={(e) => {
											setBasketball(e.target.value);
										}}
										variant="standard"
										defaultValue={basketball}
									/>
								) : (
									<></>
								)}
							</Typography>
						</Stack>
					))}
				</DialogContent>
				<DialogActions>
					<Button onClick={props.handleClose}>Cancel</Button>
					<Button onClick={handleSubmit} color="success">
						Edit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
