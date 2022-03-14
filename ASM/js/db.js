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
firebase.initializeApp(firebaseConfig);

var app = angular.module("myapp", ["firebase"]);
app.controller("myctrl", ["$scope", "$firebaseArray",
    function ($scope, $firebaseArray) {
        $scope.users = [];
        $scope.user = {};
        $scope.index = -1;
        var ref = firebase.database().ref().child("users");
        $scope.users = $firebaseObject(ref);
        console.log( $scope.users);
        // var ref = firebase.database().ref().child("users");
        // $scope.users = $firebaseArray(ref);

    }
]);


// var app = angular.module("myapp", []);
// app.controller("myctrl",
//     function ($scope) {
//         $scope.users = dataUser;
//         $scope.user = {};
//         $scope.index = -1;

//         // SelectAll Realtime
//         // const dbRef = ref(db, 'users');
//         // onValue(dbRef, (snapshot) => {
//         //   snapshot.forEach((childSnapshot) => {
//         //     const childKey = childSnapshot.key;
//         //     const childData = childSnapshot.val();
//         //     $scope.users.push(childSnapshot.val());
//         //     // ...
//         //   });
//         // }, {
//         //   onlyOnce: true
//         // });
//         // console.log($scope.users);

//         //SelectAll
//         // const dbRef = ref(getDatabase());
//         // get(child(dbRef, 'users')).then((snapshot) => {
//         //     if (snapshot.exists()) {
//         //         $scope.users = snapshot.val();
//         //     } else {
//         //         console.log("No data available");
//         //     }
//         // }).catch((error) => {
//         //     console.error(error);
//         // });


//         $scope.edit = function(chiso){
//             $scope.index = chiso;
//             $scope.user = angular.copy($scope.users[chiso]);
//         }

//         $scope.reset = function(){
//             $scope.user = {};
//             $scope.index = -1;
//         }

//         $scope.insert = function () {
//             // $scope.users.push(angular.copy($scope.student));
//             // $scope.reset();
//             set(ref(db, 'users/' + $scope.user.userId), {
//                 username: $scope.user.username,
//                 email: $scope.user.email,
//                 profile_picture: $scope.user.profile_picture
//             })
//                 .then(() => {
//                     alert("insert done!");
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                     alert("insert fail: " + error);
//                 })
//         }

//         $scope.update = function(){
//             // $scope.students[$scope.index] = angular.copy($scope.student);

//             update(ref(db, 'users/' + userId.value), {
//                 username: username.value,
//                 email: email.value,
//                 profile_picture: imageUrl.value
//             })
//                 .then(() => {
//                     alert("update done!");
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                     alert("update fail: " + error);
//                 })

//         }

//         $scope.cancel = function(){
//             if($scope.index == -1) $scope.reset();
//             else $scope.edit($scope.index);
//         }

//         $scope.delete = function(){
//             // $scope.students.splice($scope.index, 1);
//             // $scope.reset();

//             remove(ref(db, 'users/' + userId.value))
//             .then(() => {
//                 alert("remove done!");
//             })
//             .catch((error) => {
//                 console.log(error);
//                 alert("remove fail: " + error);
//             })
//         }



//     }
// )



