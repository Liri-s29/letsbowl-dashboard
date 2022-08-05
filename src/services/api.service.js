// import axios from "axios";
// import { addImageRoute, deleteImageRoute, getImageRoute } from "../constants/api.routes";

// export const addImageApi = async (type, url, id) => {
// 	const data = {
// 		id: id,
// 		url: url,
// 		type: type,
// 	};
// 	try {
// 		const res = await axios.post(addImageRoute, data);
// 		return res.data;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// export const deleteImageApi = async (type, id) => {
// 	const data = {
// 		id: id,
// 		type: type,
// 	};
// 	try {
// 		const res = await axios.post(deleteImageRoute, data);
// 		return res.data;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// export const getImageApi = async (type) => {
// 	const data = {
// 		type: type,
// 	};
// 	try {
// 		const res = await axios.post(getImageRoute, data);
// 		return res.data;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
