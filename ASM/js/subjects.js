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

var app = angular.module("myapp", ["firebase", "ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "home.html" })
        .when("/join", {
            templateUrl: "template-subjects.html",
            controller: 'subjectsCtrl'

        })
        .when("/quiz/:subjectCode", {
            templateUrl: "template-quiz.html",
            controller: 'QuizCtrl'
        })
})

app.factory('quizFactory', ['$firebaseArray', function ($firebaseArray) {
    var quizFactory = {};
    var question = [];

    quizFactory.getQuestions = function (subjectCode) {
        var ref = firebase.database().ref("quiz/" + subjectCode);
        var obj = $firebaseArray(ref);
        $scope.question = obj;
        return obj;
    }

    return quizFactory;
}
])

app.controller("QuizCtrl", ["$scope", "$firebaseArray", "$routeParams", "$interval",
    function ($scope, $firebaseArray, quizFactory, $routeParams, $interval) {
        $scope.currentQuestion = 0;
        $scope.questions = [];
        $scope.time = 30;
        $scope.quizMarks = 0;
        $scope.answer = {};

        var stop = $interval(()=>{$scope.time --}, 1000);
        // quizFactory.getQuestions($routeParams.subjectCode)
        //     .then((data)=>{
        //         $scope.questions = data;
        //     });
        $scope.question = function () {
            return $scope.questions[$scope.currentQuestion];
        };
        $scope.setQuestionIndex = function (newIndex) {
            if ($scope.answer.choice == $scope.question().answerId) {
                $scope.quizMarks += $scope.question().marks;
            }
            $scope.currentQuestion = newIndex;

            return $scope.currentQuestion;
        };
        $scope.questionTotal = function () {
            return $scope.questions.length;
        };
        $scope.sumup = false;
        $scope.submitQuiz = function () {
            if ($scope.answer === $scope.question().answerId) {
                $scope.quizMarks += $scope.question().marks;
            }
            $scope.sumup = true;
            $interval.cancel(stop);
        }
    }
]);

app.controller("subjectsCtrl", ["$scope", "$firebaseArray",
    function ($scope, $firebaseArray) {
        $scope.subjects = [];
        $scope.subject = {};
        var ref = firebase.database().ref("subjects");
        var obj = $firebaseArray(ref);
        $scope.subjects = obj;;

        $scope.pageSize = 8;
        $scope.start = 0;

        $scope.next = function () {
            if ($scope.start < $scope.subjects.length - $scope.pageSize) {
                $scope.start += $scope.pageSize;
            }
        }

        $scope.prev = function () {
            if ($scope.start > 0) {
                $scope.start -= $scope.pageSize;
            }
        }

        $scope.first = function () { $scope.start = 0; }

        $scope.last = function () {
            var sotrang = Math.ceil($scope.subjects.length / $scope.pageSize);
            $scope.start = (sotrang - 1) * $scope.pageSize;
        }

    }
]);

app.controller("myctrl", ["$scope", "$firebaseArray", "$firebaseAuth",
    function ($scope, $firebaseArray, $firebaseAuth) {
        $scope.subjects = [];
        $scope.subject = {};
        $scope.index = -1;
        $scope.curId = '';
        var ref = firebase.database().ref("subjects");
        var obj = $firebaseArray(ref);
        $scope.subjects = obj;
        $scope.authObj = $firebaseAuth();
        $scope.firebaseUser = null;

        $scope.signIn = function () {
            $scope.authObj.$signInWithPopup("google").then(function (result) {
                console.log("Signed in as:", result.user.uid);
                $scope.firebaseUser = result.user;
                console.log($scope.firebaseUser);
            }).catch(function (error) {
                console.error("Authentication failed:", error);
            });
        };


        obj.$loaded().then(function () {
            angular.forEach(obj, function (value, key) {
            })
        })

        $scope.edit = function (chiso, id) {
            $scope.index = chiso;
            $scope.subject = angular.copy($scope.subjects[chiso]);
            $scope.curId = id;
            // alert($scope.curId);
        }
        $scope.reset = function () {
            $scope.subject = {};
            $scope.index = -1;
            alert("da vao reset")
        }

        $scope.cancel = function () {
            if ($scope.index == -1) $scope.reset();
            else $scope.edit($scope.index);
        }

        $scope.insert = function () {
            $scope.subjects.$add({
                id: $scope.subject.id,
                name: $scope.subject.name,
                logo: $scope.subject.logo
            });
            alert($scope.subject);
            alert("insert done!");
        }


        $scope.update = function () {
            var ref2 = firebase.database().ref("subjects/" + $scope.curId);
            ref2.update({
                id: $scope.subject.id,
                name: $scope.subject.name,
                logo: $scope.subject.logo
            });
            alert("update done!");
        }

        $scope.delete = function () {
            var ref2 = firebase.database().ref("subjects/" + $scope.curId);
            ref2.remove();
            alert("update done!");
        }


    }
]);


