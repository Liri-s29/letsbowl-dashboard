import { Box, Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Logo from "../assets/images/letsBowlLogo.png";
import { signIn } from "../services/firebase.auth";

const Login = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cookies, setCookie] = useCookies(["auth"]);
	const handleSubmit = (e) => {
		e.preventDefault();
		// Validate fields
		if (email.length === 0 || password.length === 0) {
			alert("Please fill in all fields");
			return;
		}
		props.setIsAuthenticated(async () => {
			const user = await signIn(email, password);
			setCookie("auth", user, { path: "/" });
			return user;
		});
	};

	return (
		<Grid container sx={{ height: "100%" }}>
			<Grid item xs={0} md={6} sx={{ height: "100%", display: { xs: "none", md: "block" } }}>
				<Stack direction="column" justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
					<Box component="img" src={Logo} sx={{ height: "60%" }} />
				</Stack>
			</Grid>

			<Grid item xs={12} md={6}>
				<Stack direction="column" justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
					<Paper elevation={10} sx={{ width: { xs: "90%", md: "60%" }, height: { xs: "60%", md: "70%" } }}>
						<Stack direction="column" justifyContent="space-evenly" alignItems="center" sx={{ height: "100%" }}>
							<Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
								<Typography variant="h4" sx={{ fontFamily: "Bebas Neue", display: { xs: "inline-block", md: "none" } }}>
									LETSBOWL
								</Typography>
								<Typography variant="h4" sx={{ fontFamily: "Bebas Neue" }}>
									Login
								</Typography>
							</Stack>
							<TextField
								onChange={(e) => setEmail(e.target.value)}
								label="Username"
								value={email}
								variant="standard"
								sx={{ width: "80%" }}
							/>
							<TextField
								onChange={(e) => setPassword(e.target.value)}
								label="Password"
								value={password}
								type="password"
								variant="standard"
								sx={{ width: "80%" }}
							/>
							<Button variant="contained" sx={{ width: "80%" }} onClick={(e) => handleSubmit(e)}>
								LOGIN
							</Button>
						</Stack>
					</Paper>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default Login;
