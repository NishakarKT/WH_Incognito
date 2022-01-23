import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCUImGqa3B9y_6wZrvIIHmUWAMLJ_WfnyI",
    authDomain: "tsg-hackathon.firebaseapp.com",
    projectId: "tsg-hackathon",
    storageBucket: "tsg-hackathon.appspot.com",
    messagingSenderId: "537964705785",
    appId: "1:537964705785:web:c262791a23363dc827ef28",
    measurementId: "G-6T6WKE5LJJ"
};

const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);

export default firebase;
export { storage, ref, uploadBytesResumable, getDownloadURL };