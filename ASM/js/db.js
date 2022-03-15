import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getDatabase, ref, get, set, child, update, remove, push ,onValue } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCcdF5DkLxkgN0JnrKygfNJWeOxQy3OlhU",
    authDomain: "dongtrieu-fb213.firebaseapp.com",
    databaseURL: "https://dongtrieu-fb213-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dongtrieu-fb213",
    storageBucket: "dongtrieu-fb213.appspot.com",
    messagingSenderId: "472804513938",
    appId: "1:472804513938:web:81b7e2080a38410433ee4b",
    measurementId: "G-RY9HC3E8YV"
};

// Initialize Firebase
var firebase = initializeApp(firebaseConfig);
const db = getDatabase();

var app = angular.module("myapp", ["firebase"]);
app.controller("myctrl", ["$scope", "$firebaseArray",
    function ($scope, $firebaseArray) {
        $scope.users = [];
        $scope.user = {};
        $scope.index = -1;
        // var ref = firebase.database().ref("users");
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'users')).then((snapshot) => {
                if (snapshot.exists()) {
                    $scope.users = snapshot.val();
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        $scope.users = $firebaseArray(dbRef);

      

    }
]);

