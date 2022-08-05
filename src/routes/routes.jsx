import _ from "lodash";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate, Route, Routes, BrowserRouter as Router, useNavigate } from "react-router-dom";
import Bookings from "../components/Bookings";
import CarouselOuter from "../components/CarouselOuter";
import ImageCategory from "../components/ImageCategory";
import ManageCatagories from "../components/ManageCatagories";
import Pricing from "../components/Pricing/Pricing";

/***** Pages ****/

import Dashboard from "../layouts/Dashboard";
import Login from "../layouts/Login";
import { signIn } from "../services/firebase.auth";

/*****Routes******/

const AppRoutes = () => {
	const [cookies, setCookie] = useCookies(["auth"]);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const categoryList = ["Bowling", "Billiards", "Turf", "Machine_cricket", "Cafe_curry", "Kidzone"];

	useEffect(() => {
		if (cookies.auth) {
			setIsAuthenticated(true);
		}
	}, [cookies.auth]);

	return (
		<Router>
			<RouterRoutes />
		</Router>
	);
	function RouterRoutes() {
		const navigate = useNavigate();
		return (
			<Routes>
				<Route path="/">
					<Route
						path="/"
						element={isAuthenticated ? <Navigate to="home" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
					/>
					{isAuthenticated ? (
						<Route
							path="home"
							element={<Dashboard setIsAuthenticated={setIsAuthenticated} categories={categoryList} />}
						>
							<Route path={_.toLower("Offers")} element={<ImageCategory type="Offers" />} />
							<Route index element={<Bookings />} />
							<Route path={_.toLower("Manage_Catagories")} element={<ManageCatagories categories={categoryList} />} />
							<Route path={_.toLower("Carousel_Inner")} element={<ImageCategory type="Carousel_Inner" />} />
							<Route path={_.toLower("Carousel_Outer")} element={<CarouselOuter type="Carousel_Outer" />} />
							<Route path={_.toLower("Pricing")} element={<Pricing type="Pricing" categories={categoryList} />} />

							{categoryList.map((category, index) => (
								<Route key={index} path={_.toLower(category)} element={<ImageCategory type={category} />} />
							))}
						</Route>
					) : (
						navigate("/")
					)}
				</Route>
			</Routes>
		);
	}
};

export default AppRoutes;
