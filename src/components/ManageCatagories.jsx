import { Box, Button, FormLabel, Grid, IconButton, Input, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import _ from "lodash";

import AddCircleIcon from "@mui/icons-material/AddPhotoAlternate";
import { addCategory } from "../services/firebase.service";
import { getCategoryF } from "../services/firebase.firestore";

const ManageCatagories = (props) => {
	useEffect(() => {}, []);

	const getAssets = async () => {};

	return (
		<Box sx={{ height: "100%" }}>
			<Typography variant="h4" sx={{ mb: "3rem", fontFamily: "Bebas Neue" }}>
				MANAGE CATAGORIES
			</Typography>
			<Stack direction="row" flexWrap="wrap" justifyContent="space-evenly" alignItems="center">
				{props.categories.map((cat, idx) => {
					return <Category key={idx} category={cat} />;
				})}
				{/* {loading ? (
					<Typography variant="h5" sx={{ mb: "3rem" }}>
						Loading...
					</Typography>
				) : (
				
				)} */}
			</Stack>
		</Box>
	);
};

const Category = (props) => {
	const [file1, setFile1] = useState(null);
	const [file2, setFile2] = useState(null);
	const [file1URL, setFile1URL] = useState(null);
	const [file2URL, setFile2URL] = useState(null);
	const [description, setDescription] = useState("");

	const handleAdd = async () => {
		if (file1 && file2) {
			await addCategory(props.category, file1, file2, description);
			getAssets();
		}
	};

	useEffect(() => {
		getAssets();
	}, []);

	async function getAssets() {
		const assets = await getCategoryF(props.category);
		setFile1URL(assets.image1);
		setFile1(assets.image1);
		setFile2URL(assets.image2);
		setFile2(assets.image2);
		setDescription(assets.description);
	}

	return (
		<Paper elevation={5} sx={{ my: "1rem" }}>
			<Stack
				direction="column"
				justifyContent="space-evenly"
				alignItems="center"
				spacing={1}
				sx={{ height: "100%", padding: "1rem" }}
			>
				<Typography variant="h3" sx={{ fontFamily: "Bebas Neue" }}>
					{_.toUpper(_.replace(props.category, "_", " "))}
				</Typography>
				<Typography variant="h5" sx={{ fontFamily: "Bebas Neue", textAlign: "left" }}>
					DESCRIPTION
				</Typography>
				<TextField
					multiline
					rows={3}
					variant="standard"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="We have Six Bowling track center with beautiful environment."
					sx={{ width: "100%" }}
				/>
				<Stack direction="row" spacing={2} justifyContent="space-evenly" alignItems="center">
					<Stack direction="column" alignItems="center">
						<Typography variant="h5" sx={{ fontFamily: "Bebas Neue", textAlign: "left" }}>
							CAPTION IMAGE
						</Typography>
						<Box
							component="img"
							src={file1URL ? file1URL : "https://via.placeholder.com/200"}
							sx={{ width: "200px" }}
						/>
						<FormLabel sx={{ width: "80%", textAlign: "center" }}>
							{file1URL ? <></> : <AddCircleIcon color="success" fontSize="large" sx={{ cursor: "pointer" }} />}
							<Input
								type="file"
								accept="image/png, image/jpg, image/gif, image/jpeg"
								onChange={(e) => {
									setFile1(e.target.files[0]);
									setFile1URL(URL.createObjectURL(e.target.files[0]));
								}}
								sx={{ display: "none" }}
							/>
						</FormLabel>
						{file1URL ? (
							<Button
								color="error"
								onClick={() => {
									setFile1(null);
									setFile1URL(null);
								}}
							>
								Remove Selected
							</Button>
						) : (
							<></>
						)}
					</Stack>
					<Stack direction="column" alignItems="center">
						<Typography variant="h5" sx={{ fontFamily: "Bebas Neue", textAlign: "left" }}>
							BACKGROUND IMAGE
						</Typography>
						<Box
							component="img"
							src={file2URL ? file2URL : "https://via.placeholder.com/200"}
							sx={{ width: "200px" }}
						/>
						<FormLabel sx={{ width: "80%", textAlign: "center" }}>
							{file2URL ? <></> : <AddCircleIcon color="success" fontSize="large" sx={{ cursor: "pointer" }} />}
							<Input
								type="file"
								accept="image/png, image/jpg, image/gif, image/jpeg"
								onChange={(e) => {
									setFile2(e.target.files[0]);
									setFile2URL(URL.createObjectURL(e.target.files[0]));
								}}
								sx={{ display: "none" }}
							/>
						</FormLabel>
						{file2URL ? (
							<Button
								color="error"
								onClick={() => {
									setFile2(null);
									setFile2URL(null);
								}}
							>
								Remove Selected
							</Button>
						) : (
							<></>
						)}
					</Stack>
				</Stack>
				<Button variant="contained" color="success" onClick={handleAdd}>
					Save
				</Button>
			</Stack>
		</Paper>
	);
};

export default ManageCatagories;
