
  var app = angular.module('myApp',['ngRoute']);
    app.config(function($routeProvider, $locationProvider){
        $routeProvider.when('/',{
            templateUrl:'/convertionpage.html'
        }).when('/addnewcontact',{
            templateUrl:'/nextpage.html',
            controller:'AppCtrl'
        }).when('/editPanel',{
            templateUrl:'/editpanel.html',
            controller:'AppCtrl'
        })
        .otherwise({
            redirectTo:'/'
        })
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
          });
    });
    app.controller('AppCtrl',['$scope','$http','$location','$route',function($scope,$http,$location,$route){
       
        console.log("Hello world from controller");
   var materialDetails = [];
   var romanValues = ['I','V','X','L','C','D','M'];
   var flag = false;
   var submitClick = false;
   var materialMatch = false;
   var noDuplicates = false;
   $scope.addMaterial = function()
   {
       console.log($scope.material.materialname)
       if($scope.material.materialname!=null && $scope.material.value!=null)
       {
           for(var i=0;i<romanValues.length;i++)
           {
               if($scope.material.value == romanValues[i])
               {
                 flag = true;
               }
             
           }
           if(flag)
           {
            var mArray={
                material : $scope.material.materialname,
                value : $scope.material.value
            };
            console.log(mArray);
            if(materialDetails.length==0)
            {
                materialDetails.push(mArray);
                console.log(materialDetails);
                $scope.material.materialname = null;
                $scope.material.value =   null;
                $scope.inputValidation = "";
                $scope.errorRoman="";
                $scope.array = materialDetails;

            }
            else
            {
                materialDetails.forEach(function(element) {
                    console.log(element.material);
                    console.log($scope.material.materialname);
                   
                    if($scope.material.materialname!= element.material)
                    {
                        noDuplicates = true;                    
                    }
                    else{                 
                        noDuplicates = false;
                    }
                }, this);
                if(noDuplicates)
                {
                    materialDetails.push(mArray);
                    console.log(materialDetails);
                    $scope.material.materialname = null;
                    $scope.material.value =   null;
                    $scope.inputValidation = "";
                    $scope.errorRoman="";
                    $scope.array = materialDetails;
                }
                else
                {
                    $scope.inputValidation = "This material is already added";
                }
            }      
               
           }
           else{
               $scope.errorRoman = "Please enter roman values";
           }
           
    
    }
       else{
           $scope.inputValidation = "Please fill all the details";
       }
    
   }
   $scope.submit = function()
   {

       console.log("Submit"+" "+ materialDetails);
    $http.post('/convertion',materialDetails).then(successCallback,errorCallback);

    function successCallback(response)
    {
       
        alert("successfully submitted!!");
       
    }
    function errorCallback(response)
    {
        alert("submission failed.please try again");
    }
    // $scope.array = materialDetails;
   
   
  submitClick=true;
   }

   $scope.getCredits = function()
   {
       if(submitClick)
       {
        var inputString = $scope.material.credites;
        var res = inputString.split(" ");
        for(var i =0;i<res.length;i++)
        {
            console.log('out res '+ res[i]);
            console.log(materialDetails.indexOf(res[i]));
           
            // materialDetails.forEach(function(element) {
              

                // if(res[i]==element.material)
                if(materialDetails.indexOf(res[i]))
                {
                   
                    materialMatch  = true;
                }
                else
                {
                   materialMatch = false;
                }
                console.log(materialMatch);
            // }, this);
           
           
        }
        if(materialMatch)
        {
            $http.post('/credits',res).then(success,error);
            function success(response)
            {
                console.log = "sucess!"
                
            }
            function error(response)
            {
                console.log = "some thing went wrong!";
            }
            console.log(res);
            $http.get('/getCredits').then(successCallback, errorCallback);
            function successCallback(response)
            {
                console.log(response);
                if(response.data!=0)
                { $scope.credits= inputString+" "+"is "+response.data;
                $scope.error="";
             }
                else
                { $scope.error = "Invalid question"
                $scope.credits="";
             }
               
            }
            function errorCallback(error)
            {
               console.log(error);
            }
            
        }
        else{
            $scope.credits="";
            $scope.error = "sorry! Invalid material";
        }
    
      
        

       }
       else{
           alert("please click submit, before getting credits.")
       }
      
   }
   $scope.reset = function()
   {
       $http.post('/reset');
       $scope.credits="";
       $scope.array="";
       $scope.material.credites="";
       window.location.reload();

   }
     
    }])




