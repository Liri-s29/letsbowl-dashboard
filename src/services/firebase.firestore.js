import { getFirestore, doc, setDoc, deleteDoc, getDocs, collection, getDoc } from "firebase/firestore";
import { v4 } from "uuid";

import app from "./firebase.config";

export const db = getFirestore(app);

export const addImageF = async (type, url, id) => {
	try {
		const offerRef = doc(db, type, id);
		await setDoc(offerRef, {
			url: url,
			id: id,
		});
	} catch (error) {
		console.log(error);
	}
};

export const addImageOuterCarouselF = async (type, url, id, title) => {
	try {
		const offerRef = doc(db, type, id);
		await setDoc(offerRef, {
			url: url,
			id: id,
			title: title,
		});
	} catch (error) {
		console.log(error);
	}
};

export const removeImageF = async (type, id) => {
	try {
		const offerRef = doc(db, type, id);
		await deleteDoc(offerRef);
	} catch (error) {
		console.log(error);
	}
};

export const getAllImageF = async (type) => {
	try {
		const querySnapshot = await getDocs(collection(db, type));
		return querySnapshot;
	} catch (error) {
		console.log(error);
	}
};

export const editPricing = async (id, data) => {
	// const id = "7";
	// const data = {
	// 	id: id,
	// 	name: "Sunday",
	// 	data: [
	// 		{
	// 			name: "Bowling",
	// 			price: "250",
	// 		},
	// 		{
	// 			name: "Billiards",
	// 			price: ["200", "250"],
	// 		},
	// 		{
	// 			name: "Turf",
	// 			price: "1500",
	// 		},
	// 		{
	// 			name: "Machine Cricket",
	// 			price: "150",
	// 		},
	// 		{
	// 			name: "Basketball",
	// 			price: "40",
	// 		},
	// 	],
	// };
	try {
		const offerRef = doc(db, "Pricing", id);
		await setDoc(offerRef, data);
	} catch (error) {
		console.log(error);
	}
};

export const getPricing = async (type) => {
	try {
		const querySnapshot = await getDocs(collection(db, "Pricing"));
		return querySnapshot;
	} catch (error) {
		console.log(error);
	}
};

export const addCategoryF = async (type, data) => {
	try {
		const categoryRef = doc(db, "Category", type);
		await setDoc(categoryRef, data);
	} catch (error) {
		console.log(error);
	}
};

export const getCategoryF = async (type) => {
	try {
		const categoryRef = doc(db, "Category", type);
		const docSnap = await getDoc(categoryRef);
		return docSnap.data();
	} catch (error) {
		console.log(error);
	}
};

export const getAllBookingsF = async (type) => {
	try {
		const querySnapshot = await getDocs(collection(db, "Booking"));
		return querySnapshot;
	} catch (error) {
		console.log(error);
	}
};

export const removeBookingF = async (id) => {
	try {
		const offerRef = doc(db, "Booking", id);
		await deleteDoc(offerRef);
	} catch (error) {
		console.log(error);
	}
};
