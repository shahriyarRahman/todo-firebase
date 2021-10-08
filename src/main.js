import { createApp } from "vue";
import firebase from "firebase";
require("firebase/firestore");
import App from "./App.vue";
import router from "./router";
import "./main.css";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDue1DR7hR6fXAvGa-FAOATu3JXDgh62Rc",
    authDomain: "todolist-805ca.firebaseapp.com",
    projectId: "todolist-805ca",
    storageBucket: "todolist-805ca.appspot.com",
    messagingSenderId: "768947854128",
    appId: "1:768947854128:web:9f6908bbae35dfff7186f5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = createApp(App);
app.config.globalProperties.isLoggedIn = false;
app.use(router);
app.mount("#app");
