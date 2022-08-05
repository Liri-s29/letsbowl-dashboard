import { getStorage, ref, listAll, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import app from "./firebase.config";

const storage = getStorage(app);

export const addImageS = async (type, file) => {
	try {
		const path = `${type}/${v4()}`;
		const offersRef = ref(storage, path);
		await uploadBytes(offersRef, file).then((snapshot) => {
			console.log("Uploaded a blob or file!");
		});
		const url = await getDownloadURL(offersRef);
		return { url, path };
	} catch (error) {
		console.log(error);
	}
};

export const removeImageS = async (path) => {
	try {
		const offersRef = ref(storage, path);
		await deleteObject(offersRef);
	} catch (error) {
		console.log(error);
	}
};

export const addCategoryImageS = async (type, num, file) => {
	try {
		const path = `Category/${type}${num}`;
		const offersRef = ref(storage, path);
		await uploadBytes(offersRef, file).then((snapshot) => {
			console.log("Uploaded a blob or file!");
		});
		const url = await getDownloadURL(offersRef);
		return { url, path };
	} catch (error) {
		console.log(error);
	}
};
