import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { db, getAllBookingsF, removeBookingF } from "../services/firebase.firestore";
import { Box, Button, typographyClasses } from "@mui/material";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import moment from "moment";
import PropTypes from 'prop-types';

const columns = [
	{ field: "name", headerName: "Name", width: 200 },
	{ field: "email", headerName: "Email", width: 300 },
	{ field: "phone", headerName: "Phone", width: 150 },
	{ field: "date", headerName: "Date", width: 130, type: "date" },
	{ field: "category", headerName: "Category", width: 150 },
	{ field: "time", headerName: "Entry Time", width: 160 },
	{ field: "count", headerName: "Head Count", width: 130 },
];

const Bookings = (props) => {
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	useEffect(() => {
		getData();
	}, []);
	const getData = async () => {
		const q = query(collection(db, "Booking"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			setRows(() => {
				const rows = querySnapshot.docs.map((doc, index) => {
					return {
						id: doc.data().id,
						index: index + 1,
						category: doc.data().category,
						email: doc.data().email,
						name: doc.data().name,
						phone: doc.data().phone,
						date: moment(doc.data().date, "YYYY-MM-DD").format("DD/MM/YYYY"),
						time: moment(doc.data().time, "hh:mm").format("LT"),
						count: doc.data().count,
						bookingTime: doc.data().bookingTime,
					};
				});
				return rows;
			});
		});
		setLoading(false);
	};
	function handleChange(event) {
		setSelected(event);
	}

	function handleDelete() {
		if (selected.length > 0) {
			selected.forEach(async (id) => {
				await removeBookingF(id);
				getData();
			});
		}
	}

	const [pageSize, setPageSize] = useState(10);

	return loading ? (
		<div>Loading...</div>
	) : (
		<Box sx={{ textAlign: "center" }}>
			<div style={{ height: 550, width: "100%" }}>
				<DataGrid
					rows={rows}
					columns={columns}
					onSelectionModelChange={handleChange}
					checkboxSelection
					pageSize={pageSize}
					onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
					rowsPerPageOptions={[10, 20, 50, 100]}
					initialState={{
						sorting: {
						  sortModel: [{ field: 'date', sort: 'asc' }],
						},
					  }}
				/>
			</div>
			<Button
				color="error"
				sx={{ mt: "1rem" }}
				variant="contained"
				onClick={handleDelete}
				disabled={selected.length === 0 ? true : false}
			>
				DELETE SELECTED
			</Button>
		</Box>
	);
};

export default Bookings;
