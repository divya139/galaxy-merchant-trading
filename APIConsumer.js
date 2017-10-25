// adding modules required
var express = require('express');
var app = express();
var bodyparser = require('body-parser');

var assert = require('assert');
// decalring variables
// resultArray to store the materialDetails sending from controller.It is JSON Array
var resultArray = [];

//mArray to store Roman Letters
var mArray = ['I', 'V', 'X', 'L', 'C', 'D', 'M']

// vArray to store the values for Roman Letters
var vArray = [1, 5, 10, 50, 100, 500, 1000]

//stringres is to store roman string for example 'XXXIL'
var stringres = "";

//var creditValue;
//stringCredits is to store calculated numerical value for stringres.Example for
// stringres = ' MCMXLIV' the stringCredits will be 1944
var stringCredits = "";

//creditArray to store the characters splited stringCredits
var creditsArray;

//sum to store the final credits
var sum = 0;
//Varaibles to capture the number of occurences of Roman Letters
var count1 = 0;
var count2 = 0;
var counter = 0;
var flag = false;
var splitArray = [];

app.use(express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

//service to push the materialDetails coming from controller tp resultArray.
app.post('/conversion', function (req, res) {


    (req.body).forEach(function (element) {

        resultArray.push(element);

    }, this);
    res.sendStatus(200);
});

//service to convert question coming from controller to Romanvalue.Example if prok is L and question is pork pork
// the roman value for question pork pork is LL.
app.post('/credits', function (req, res) {
    console.log(req.body);

    (req.body).forEach(function (element) {

        (resultArray).forEach(function (data) {

            if (element == data.material) {
                stringres = stringres + data.value;

            }

        }, this);

    }, this);

    console.log(resultArray)
    console.log(stringres.length);
    for (var i = 0; i < stringres.length; i++) {
        //applying business logic to calculate .
        //The symbols "I", "X", "C", and "M" can be repeated three times in succession, but no more.
        // (They may appear four times if the third and fourth are separated by a smaller value, such as XXXIX.) 
        //"D", "L", and "V" can never be repeated.
        if (stringres.charAt(i) == 'X' || stringres.charAt(i) == 'I' || stringres.charAt(i) == 'M' || stringres.charAt(i) == 'C') {
            count1 = countRun(stringres, stringres.charAt(i))
            console.log("count1 " + count1);
            counter = countCharacters(stringres, stringres.charAt(i))
            console.log(counter);
            if (count1 == 3 && counter == 4) {

                console.log("counter " + counter);
                if (counter == 4) {
                    //spliting if character is 'X','I','M','C'
                    splitArray = stringres.split(stringres.charAt(i));
                    console.log("char " + stringres.charAt(i));
                    for (var j = 0; j < splitArray.length; j++) {
                        console.log("stringres " + stringres.charAt(i));
                        if (splitArray[j].length == 1) {
                            console.log(j + " " + splitArray[j]);
                            var char = splitArray[j];
                            console.log(char);
                            console.log("-----------" + mArray.lastIndexOf(char));

                            var mArrayIndex = mArray.indexOf(char);
                            console.log(mArrayIndex);
                            console.log(parseInt(vArray[mArrayIndex]))
                            console.log(parseInt(vArray[mArray.lastIndexOf(stringres.charAt(i))]))


                            //Logic for checking incase if there is 4 time repeated characters 
                            //there should be small value between 3rd and 4th character.task2
                            if (parseInt(vArray[mArrayIndex]) <= parseInt(vArray[mArray.lastIndexOf(stringres.charAt(i))])) {
                                console.log(splitArray[j]);
                                count1 = 3;
                                continue;
                            }
                            else {
                                count1 = 4;
                                break;
                            }
                        }


                    }

                }


            }
            else if (counter > 3) {
                count1 = 4;
                break;
            }
            else {

            }

        }
        else {
            //Logic for "D", "L", and "V" can never be repeated.  
            // count2 = countRun(stringres, stringres.charAt(i))
            count2 = countCharacters(stringres, stringres.charAt(i))
            console.log("count2 " + count2);
            if (count2 >= 2)
                break;

        }
    }
    for (var i = 0; i < stringres.length; i++) {
        (mArray).forEach(function (data) {

            if (stringres.charAt(i) == data) {
                //validating occurences of characters and converting roman string to numerical string.task2
                console.log('data in mArray '+data);
                if (stringres.charAt(i) == 'X' || stringres.charAt(i) == 'I' || stringres.charAt(i) == 'M' || stringres.charAt(i) == 'C') {

                    if (count1 <= 3 && count2 < 2) {
                        stringCredits = stringCredits + vArray[mArray.lastIndexOf(data)] + " ";
                        console.log(stringCredits);

                    }
                    else {
                        sum = 0;

                    }
                }
                else {

                    if (count2 >= 2 || count1 > 3) {
                        sum = 0;

                    }
                    else {
                        stringCredits = stringCredits + vArray[mArray.lastIndexOf(data)] + " ";

                    }
                }


            }
           

        }, this);
    }

    console.log(stringres);
    console.log(stringCredits);

    //calling calculateSum function  to calculate the total crdits for roman string.
    calculateSum();
    res.json(sum);

});

// function to calculate the total credits for Roman striing . Exmaple XXXIV.
function calculateSum() {
    creditsArray = stringCredits.split(" ");
    for (var i = 0; i < creditsArray.length;) {
        //calculating business logic task1 and task3
        //logic for task 1
        if (creditsArray[i] < creditsArray[i + 1]) {

            console.log(creditsArray[i + 1]);

            console.log(vArray.lastIndexOf(parseInt(creditsArray[i + 1])));
            console.log(mArray[vArray.lastIndexOf(parseInt(creditsArray[i + 1]))]);
            if (mArray[vArray.lastIndexOf(parseInt(creditsArray[i]))] == 'I') {
                //logic for task 3
                if (mArray[vArray.lastIndexOf(parseInt(creditsArray[i + 1]))] == 'V' || mArray[vArray.lastIndexOf(parseInt(creditsArray[i + 1]))] == 'X') {
                    sum = (sum - 0) + (parseInt(creditsArray[i + 1]) - parseInt(creditsArray[i]));
                    i = i + 2;
                }
                else {
                    sum = 0;
                    break;
                }


            }
            else if (mArray[vArray.lastIndexOf(parseInt(creditsArray[i]))] == 'X') {
                if (mArray[vArray.lastIndexOf(parseInt(creditsArray[i + 1]))] == 'L' || mArray[vArray.lastIndexOf(parseInt(creditsArray[i + 1]))] == 'C') {
                    sum = (sum - 0) + (parseInt(creditsArray[i + 1]) - parseInt(creditsArray[i]));
                    i = i + 2;
                }
                else {
                    sum = 0;
                    break;
                }

            }
            else if (mArray[vArray.lastIndexOf(parseInt(creditsArray[i]))] == 'C') {
                if (mArray[vArray.lastIndexOf(parseInt(creditsArray[i + 1]))] == 'D' || mArray[vArray.lastIndexOf(parseInt(creditsArray[i + 1]))] == 'M') {
                    sum = (sum - 0) + (parseInt(creditsArray[i + 1]) - parseInt(creditsArray[i]));
                    // console.log(sum);
                    i = i + 2;
                }
                else {
                    sum = 0;
                    break;
                }

            }
            else if (mArray[vArray.lastIndexOf(parseInt(creditsArray[i]))] == 'V' || mArray[vArray.lastIndexOf(parseInt(creditsArray[i]))] == 'L' || mArray[vArray.lastIndexOf(parseInt(creditsArray[i]))] == 'D') {
                sum = 0;
                break;

            }

        }
        else {
            //   console.log(parseInt(creditsArray[i]))
            sum = (sum - 0) + parseInt(creditsArray[i] - 0);
            // console.log(sum);
            i = i + 1;
        }
    }
    console.log(sum);
    //empty all variables
    stringres = "";
    stringCredits = "";
    splitArray.splice(0);

}

//function to send total calculated credits value as response
app.get('/getCredits', function (req, res) {
    res.json(sum);
    sum = 0;

    console.log(resultArray);

})

//service for reset
//clearing the resultArray which stores the material data
app.post('/reset', function (req, res) {
    resultArray.splice(0);
    console.log('reset ' + resultArray.length);
});


//Function to calculate repeated characters three times in succession
function countRun(stringres, x) {
    var counter = 0;
    for (var i = 0; i < stringres.length; i++) {
        if (stringres.charAt(i) == x) counter++;
        else if (counter > 0) break;
    }
    return counter
}

//Function to calculate number of occurences of characters in Roman String
function countCharacters(stringres, x) {
    var count = 0;
    for (var i = 0; i < stringres.length; i++) {
        if (stringres.charAt(i) == x) {
            count++;
        }
    }
    return count;
}

app.listen(3000, function () {
    console.log('listesing to server on 3000');
});