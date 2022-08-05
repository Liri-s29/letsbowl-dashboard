import app from "./firebase.config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(app);

export const signIn = async (email, password) => {
	try {
		const cred = await signInWithEmailAndPassword(auth, email, password);
		if (cred.user) {
			return true;
		}
		return false;
	} catch (error) {
		console.log(error);
	}
};
