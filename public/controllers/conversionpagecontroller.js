
var app = angular.module('myApp', ['ngRoute']);
//function to route to html pages
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: '/convertionpage.html'
    }).otherwise({
        redirectTo: '/'
    })
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
//controller function.containing all methods calling from front end and 
//httpServices to connect to server
app.controller('AppCtrl', ['$scope', '$http', '$location', '$route', function ($scope, $http, $location, $route) {

    console.log("Hello world from controller");
    //variable declaration
    var materialDetails = [];
    var romanValues = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
    var flag = false;
    var submitClick = false;
    var materialMatch = false;
    var noDuplicates = false;
    //This function is invoked on clicking the Add button on html page
    //This function add the material name and value to array called materialDetails in 
    //JSON formate{ material: materialName,value : romanValue}
    $scope.addMaterial = function () {
        console.log($scope.material.materialname)
        //checking if material name and value are empty
        if ($scope.material.materialname != null && $scope.material.value != null) {
            for (var i = 0; i < romanValues.length; i++) {
                //checking the values are roman or not
                if ($scope.material.value == romanValues[i]) {
                    flag = true;
                }

            }
            //if roman values
            if (flag) {
                var mArray = {
                    material: $scope.material.materialname,
                    value: $scope.material.value
                };
                console.log(mArray);
                //First insertion of data to materialDetails Array
                if (materialDetails.length == 0) {
                    materialDetails.push(mArray);
                    console.log(materialDetails);
                    //making all input fields empty
                    $scope.material.materialname = null;
                    $scope.material.value = null;
                    $scope.inputValidation = "";
                    $scope.errorRoman = "";
                    //binding the data in materialDetails to array to show data in front end
                    $scope.array = materialDetails;

                }
                // if second insertion to materialDetails array then see whether the input material is 
                //already existing in materDetails 
                else {
                    materialDetails.forEach(function (element) {
                        console.log(element.material);
                        console.log($scope.material.materialname);
                        //checking duplicates
                        if ($scope.material.materialname != element.material) {
                            noDuplicates = true;
                        }
                        else {
                            noDuplicates = false;
                        }
                    }, this);
                    //if no duplicates insert the new material and value to materialDetails array
                    if (noDuplicates) {
                        materialDetails.push(mArray);
                        console.log(materialDetails);
                        $scope.material.materialname = null;
                        $scope.material.value = null;
                        $scope.inputValidation = "";
                        $scope.errorRoman = "";
                        $scope.array = materialDetails;
                    }
                    // else if there is material same existing show error msg to user
                    else {
                        $scope.inputValidation = "This material is already added";
                    }
                }

            }
            // if value is not roman values show message to user
            else {
                $scope.errorRoman = "Please enter roman values";
            }


        }
        //if material name and value from input fiels is empty 
        //show message to the user
        else {
            $scope.inputValidation = "Please fill all the details";
        }

    }
    //This function will be invoked on clicking submit button by user on html page
    //This method sends the materialDetails JSON array to server on calling httpPost
    $scope.submit = function () {

        console.log("Submit" + " " + materialDetails);
        $http.post('/conversion', materialDetails).then(successCallback, errorCallback);

        function successCallback(response) {

            alert("successfully submitted!!");

        }
        function errorCallback(response) {
            alert("submission failed.please try again");
        }
        // $scope.array = materialDetails;

        //making submit click true.
        //because user cannot click getCredits button with out submitting the data

        submitClick = true;
        
        //disabling add button and submit button to avoid invalid data to key in by user.
        document.getElementById("add").disabled = true;
        document.getElementById("submit").disabled = true;
    }
    //This method is invoked when user click Get Credits button on html page.
    //This function get the question(input) from html page and send the data to server
    $scope.getCredits = function () {

      
        //checking whether user submitted the data before getting credits
        if (submitClick) {
            var inputString = $scope.material.credites;
            //spliting the string 
            var res = inputString.split(" ");
            for (var i = 0; i < res.length; i++) {
               
                // checking whether the materials in question is equal, to already added materials to materialDetails

                console.log(materialDetails.indexOf(res[i]));


                if (materialDetails.indexOf(res[i])) {

                    materialMatch = true;
                }
                else {
                    materialMatch = false;
                }
                console.log(materialMatch);



            }
            //if equal, send the data to server
            if (materialMatch) {
                //httpPost call to send the data
                $http.post('/credits', res).then(success, error);
                function success(response) {
                    if(response)
                    {
                        console.log (response.data);
                        res = "";
                    }
                    

                }
                function error(response) {
                    console.log ("some thing went wrong!");
                }
                console.log(res);
                //httpGet method to get calculated credits
                $http.get('/getCredits').then(successCallback, errorCallback);
                function successCallback(response) {
                    console.log(response);
                    //if credits is 0 invalid questio
                    if (response.data != 0) {
                    $scope.credits = inputString + " " + "is " + response.data;
                        $scope.error = "";
                    }
                    else {
                    $scope.error = "Invalid question"
                        $scope.credits = "";
                    }

                }
                function errorCallback(error) {
                    console.log(error);
                }

            }
            else {
                $scope.credits = "";
                $scope.error = "sorry! Invalid material";
            }




        }
        else {
            alert("please click submit, before getting credits.")
        }

    }
    //This funcion is invoked when user click the reset button on html page.
    //This fucntion releases the variables and reload the page.
    $scope.reset = function () {
        $http.post('/reset');
        $scope.credits = "";
        $scope.array = "";
        $scope.material.credites = "";
        window.location.reload();

    }

}])




