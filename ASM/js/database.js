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


var app = angular.module("myapp", []);
app.controller("myctrl",
    function ($scope) {
        $scope.users = [];
        $scope.user = {};
        $scope.index = -1;

        // SelectAll Realtime
        // const dbRef = ref(db, 'users');
        // onValue(dbRef, (snapshot) => {
        //   snapshot.forEach((childSnapshot) => {
        //     const childKey = childSnapshot.key;
        //     const childData = childSnapshot.val();
        //     $scope.users.push(childSnapshot.val());
        //     // ...
        //   });
        // }, {
        //   onlyOnce: true
        // });
        // console.log($scope.users);

        //SelectAll
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


        $scope.edit = function(chiso){
            $scope.index = chiso;
            $scope.user = angular.copy($scope.users[chiso]);
        }

        $scope.reset = function(){
            $scope.user = {};
            $scope.index = -1;
        }

        $scope.cancel = function(){
            if($scope.index == -1) $scope.reset();
            else $scope.edit($scope.index);
        }

        $scope.insert = function () {
            // $scope.users.push(angular.copy($scope.student));
            // $scope.reset();
            set(ref(db, 'users/' + $scope.user.userId), {
                username: $scope.user.username,
                email: $scope.user.email,
                profile_picture: $scope.user.profile_picture
            })
                .then(() => {
                    alert("insert done!");
                })
                .catch((error) => {
                    console.log(error);
                    alert("insert fail: " + error);
                })
        }

        $scope.update = function(){
            // $scope.students[$scope.index] = angular.copy($scope.student);

            update(ref(db, 'users/' + $scope.user.userId), {
                username: $scope.user.username,
                email: $scope.user.email,
                profile_picture: $scope.user.profile_picture
            })
                .then(() => {
                    alert("update done!");
                })
                .catch((error) => {
                    console.log(error);
                    alert("update fail: " + error);
                })

        }

        $scope.delete = function(){
            // $scope.students.splice($scope.index, 1);
            // $scope.reset();
            remove(ref(db, 'users/' + $scope.user.userId))
            .then(() => {
                alert("remove done!");
            })
            .catch((error) => {
                alert("remove fail: " + error);
            })
        }

        // window.onload = $scope.cancel();


    }
)