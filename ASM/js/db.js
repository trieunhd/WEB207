const firebaseConfig = {
    apiKey: "AIzaSyBqMuNxZgobkyCqbFmzj97Yq7mqy3pMjC0",
    authDomain: "web207-a0cc3.firebaseapp.com",
    databaseURL: "https://web207-a0cc3-default-rtdb.firebaseio.com/",
    projectId: "web207-a0cc3",
    storageBucket: "web207-a0cc3.appspot.com",
    messagingSenderId: "843863602082",
    appId: "1:843863602082:web:fc90ecd7237bf8872cf8fb"
};


   

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var app = angular.module("myapp", ["firebase"]);
app.controller("myctrl", ["$scope", "$firebaseArray",
    function ($scope, $firebaseArray) {
        $scope.users = [];
        $scope.user = {};
        $scope.index = -1;
        $scope.curId = '';

        var ref = firebase.database().ref("users");
        var obj = $firebaseArray(ref);
        $scope.users = obj;

        obj.$loaded().then(function(){
            angular.forEach(obj, function(value, key){
            })
        })

        $scope.edit = function (chiso, id) {
            $scope.index = chiso;
            $scope.user = angular.copy($scope.users[chiso]);
            $scope.curId = id;
            // alert($scope.curId);
        }
        $scope.reset = function () {
            $scope.user = {};
            $scope.index = -1;
            alert("da vao reset")
        }

        $scope.cancel = function () {
            if ($scope.index == -1) $scope.reset();
            else $scope.edit($scope.index);
        }

        $scope.insert = function () {
            $scope.users.$add({
                username: $scope.user.username,
                email: $scope.user.email,
                profile_picture: $scope.user.profile_picture
            });
            alert("insert done!");
        }


        $scope.update = function () {
            var ref2 = firebase.database().ref("users/" +  $scope.curId);
            ref2.update({
                username: $scope.user.username,
                email: $scope.user.email,
                profile_picture: $scope.user.profile_picture
            });
            alert("update done!");
        }

        $scope.delete = function () {
            var ref2 = firebase.database().ref("users/" +  $scope.curId);
            ref2.remove();
            alert("update done!");
        }

    }
]);


