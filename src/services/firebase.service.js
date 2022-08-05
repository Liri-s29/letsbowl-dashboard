// import { addImageApi, deleteImageApi } from "./api.service";
import { addCategoryImageS, addImageS, removeImageS } from "./firebase.storage";
import { addCategoryF, addImageOuterCarouselF, addImageF, removeImageF } from "./firebase.firestore";

export const addImage = async (type, file) => {
	try {
		const res = await addImageS(type, file);
		const id = res.path.split("/")[1];
		// await addImageApi(type, res.url, id);
		await addImageF(type, res.url, id);
		return res.url;
	} catch (error) {
		console.log(error);
	}
};

export const addImageOuterCarousel = async (type, file, title) => {
	try {
		const res = await addImageS(type, file);
		const id = res.path.split("/")[1];
		// await addImageApi(type, res.url, id);
		await addImageOuterCarouselF(type, res.url, id, title);
		return res.url;
	} catch (error) {
		console.log(error);
	}
};

export const removeImage = async (type, id) => {
	try {
		const path = `${type}/${id}`;
		// await deleteImageApi(type, id);
		await removeImageS(path);
		await removeImageF(type, id);
	} catch (error) {
		console.log(error);
	}
};

export const addCategory = async (type, file1, file2, description) => {
	let res1, res2;
	try {
		if (typeof file1 === "string") {
			res1 = { url: file1, path: "string" };
		} else {
			res1 = await addCategoryImageS(type, 1, file1);
		}
		if (typeof file2 === "string") {
			res2 = { url: file2, path: "string" };
		} else {
			res2 = await addCategoryImageS(type, 2, file2);
		}
		const data = {
			category: type,
			image1: res1.url,
			image2: res2.url,
			description: description,
		};
		await addCategoryF(type, data);
		return;
	} catch (error) {
		console.log(error);
	}
};
