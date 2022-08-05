import { Box, Button, FormLabel, Grid, IconButton, Input, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import { addImage, removeImage } from "../services/firebase.service";
import { getAllImageF } from "../services/firebase.firestore";
import _ from "lodash";

const ImageCategory = (props) => {
	const [assets, setAssets] = useState([]);
	const [loading, setLoading] = useState(true);
	const [file, setFile] = useState(null);

	useEffect(() => {
		getAssets();
	}, []);

	const getAssets = async () => {
		const snapshot = await getAllImageF(props.type);
		setAssets(snapshot.docs.map((doc) => doc.data()));
		setLoading(false);
	};

	const handleAdd = async () => {
		if (file) {
			const url = await addImage(props.type, file);

			getAssets().then(() => setFile(null));
		}
	};

	const handleDelete = async (id) => {
		await removeImage(props.type, id);
		getAssets();
	};

	return (
		<Box sx={{ height: "100%" }}>
			<Typography variant="h4" sx={{ mb: "3rem", fontFamily: "Bebas Neue" }}>
				{_.toUpper(_.replace(props.type, "_", " "))}
			</Typography>
			<Stack direction="row" flexWrap="wrap" justifyContent="space-evenly" alignItems="center">
				<Paper elevation={5} sx={{ height: "300px", width: "300px", my: "1rem" }}>
					<Stack direction="column" justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
						<FormLabel sx={{ width: "80%", textAlign: "center" }}>
							{file ? <></> : <AddCircleIcon color="success" fontSize="large" sx={{ cursor: "pointer" }} />}
							{file ? (
								<Box component="img" src={URL.createObjectURL(file)} sx={{ height: "200px", width: "100%" }} />
							) : (
								<></>
							)}
							<Input
								type="file"
								accept="image/png, image/jpg, image/gif, image/jpeg"
								onChange={(e) => {
									setFile(e.target.files[0]);

								}}
								sx={{ display: "none" }}
							/>
						</FormLabel>
						{file ? (
							<Stack direction="row" justifyContent="space-evenly">
								<Button color="success" onClick={handleAdd}>
									Add Image
								</Button>
								<Button
									color="error"
									onClick={() => {
										setFile(null);
									}}
								>
									Remove Selected
								</Button>
							</Stack>
						) : (
							<></>
						)}
					</Stack>
				</Paper>
				{loading ? (
					<Typography variant="h5" sx={{ mb: "3rem" }}>
						Loading...
					</Typography>
				) : (
					assets.map((offer, index) => {
						return (
							<Paper key={index} elevation={5} sx={{ height: "300px", width: "300px", my: "1rem" }}>
								<Stack direction="column" justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
									<Box component="img" src={offer.url} sx={{ height: "200px", maxWidth: "100%" }} />
									<IconButton onClick={() => handleDelete(offer.id)}>
										<DeleteIcon color="error" />
									</IconButton>
								</Stack>
							</Paper>
						);
					})
				)}
			</Stack>
		</Box>
	);
};

export default ImageCategory;
