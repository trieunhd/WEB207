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
        $scope.questions = [];
        $scope.question = {};
        $scope.index = -1;
        $scope.curId = '';

        var ref = firebase.database().ref("quiz/ADAV");
        var obj = $firebaseArray(ref);
        
        $scope.questions = obj;
    

        obj.$loaded().then(function(){
            angular.forEach(obj, function(value, key){
            })
        })


        $scope.edit = function (chiso, id) {
            $scope.index = chiso;
            $scope.question = angular.copy($scope.questions[chiso]);
            console.log($scope.questions[0]);
            $scope.curId = id;
            // alert($scope.curId);
        }
        $scope.reset = function () {
            $scope.question = {};
            $scope.index = -1;
            alert("da vao reset")
        }

        $scope.cancel = function () {
            if ($scope.index == -1) $scope.reset();
            else $scope.edit($scope.index);
        }

        $scope.insert = function () {
            $scope.questions.$add({
                Id: 25108,
                Text: 'Khi nào phương thức ServiceConnection.onServiceConnected được gọi?',
                Marks: 1,
                AnswerId: 104126,
                Answers: [
                    {
                        "Id": 104126,
                        "Text": "Sau khi một thành phần gọi Context.startService()"
                    },
                    {
                        "Id": 104127,
                        "Text": "Sau khi một thành phần gọi Context.bindService()"
                    },
                    {
                        "Id": 104128,
                        "Text": "Sau khi BroadcastReceiver nhận một Intent được gửi bởi Service"
                    },
                    {
                        "Id": 104129,
                        "Text": "Khi một Service gọi Context.startActivity()"
                    }
                ]
            });
            alert("insert done!");
        }

        $scope.show = function(){
            console.log($scope.questions);
        }

        $scope.update = function () {
            var ref2 = firebase.database().ref("questions/" +  $scope.curId);
            ref2.update({
                questionname: $scope.question.questionname,
                email: $scope.question.email,
                profile_picture: $scope.question.profile_picture
            });
            alert("update done!");
        }

        $scope.delete = function () {
            var ref2 = firebase.database().ref("questions/" +  $scope.curId);
            ref2.remove();
            alert("update done!");
        }

    }
]);


