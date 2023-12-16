// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCWkOk0xyyc-KfeWdn_47s6f4R3TjVdOvE",
  authDomain: "dropbox-s-xasanov.firebaseapp.com",
  projectId: "dropbox-s-xasanov",
  storageBucket: "dropbox-s-xasanov.appspot.com",
  messagingSenderId: "1033781908619",
  appId: "1:1033781908619:web:33e8921f814114027c308e",
  measurementId: "G-C57W1RETNE"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { auth , app };