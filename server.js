var express = require('express');
var app = express();
var bodyparser = require('body-parser');

var assert = require('assert');

var resultArray = [];
var mArray = ['I','V','X','L','C','D','M']
var vArray = [1,5,10,50,100,500,1000]
var stringres = "";
var creditValue;
var stringCredits="";
var creditsArray;
var sum=0;
var count1=0;
var count2=0;
var counter = 0;
var flag = false;
var splitArray = [];

app.use(express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({
    extended:true
}));

app.use(bodyparser.json());

app.post('/convertion',function(req,res){
   // console.log(req.body);
  
    (req.body).forEach(function(element) {
       // console.log(element.material)
        resultArray.push(element);
        // console.log(resultArray)
    }, this);
 res.sendStatus(200);
});

app.post('/credits',function(req,res){
    console.log(req.body);
 
     (req.body).forEach(function(element) {
        // console.log(element.material)
        (resultArray).forEach(function(data) {
            // console.log(element.material)
            if(element==data.material)
            {
                stringres = stringres+ data.value;
                
            }
             
         }, this);
         
     }, this);
  
     console.log(resultArray)
     console.log(stringres.length);
     for(var i=0;i< stringres.length;i++)
     {
        if(stringres.charAt(i) == 'X' || stringres.charAt(i)== 'I' || stringres.charAt(i) == 'M' || stringres.charAt(i) == 'C')
        {
            count1 = countRun(stringres,stringres.charAt(i))
            console.log("count1 "+count1);
            counter = countCharacters(stringres,stringres.charAt(i))
            console.log(counter);
            if(count1 == 3 && counter ==4)
            {
                
                console.log("counter "+ counter);
                if(counter == 4)
                {
                    
                     splitArray = stringres.split(stringres.charAt(i));
                    console.log("char "+ stringres.charAt(i));
                    for(var j = 0;j< splitArray.length;j++)
                    {
                        console.log("stringres "+stringres.charAt(i));
                        if(splitArray[j].length==1)
                        {
                            console.log(j +" "+ splitArray[j]);
                            var char = splitArray[j];
                            console.log(char);
                            console.log("-----------"+ mArray.lastIndexOf(char));
                            
                            var mArrayIndex = mArray.indexOf(char);
                            console.log(mArrayIndex);
                            console.log(parseInt(vArray[mArrayIndex]))
                            console.log(parseInt(vArray[mArray.lastIndexOf(stringres.charAt(i))]))
                             if(parseInt(vArray[mArrayIndex]) <= parseInt(vArray[mArray.lastIndexOf(stringres.charAt(i))]) )
                             {
                                console.log(splitArray[j]);
                                count1 = 3;
                                continue;
                             }
                             else
                             {
                                count1 = 4;
                                break;
                             }
                        }
                      
 
                    }
                  
                }
              
                
            }
            else if (counter > 3){
                count1 = 4;
                break;
            }
            else{
               
            }
             
        }
        else
        {
             count2 = countRun(stringres,stringres.charAt(i))
             console.log("count2 "+count2);
             if(count2 >=2)
             break;

        }
     }
for(var i=0;i< stringres.length;i++)
{
    (mArray).forEach(function(data) {
     
        if(stringres.charAt(i)==data)
        {
            if(stringres.charAt(i) == 'X' || stringres.charAt(i)== 'I' || stringres.charAt(i) == 'M' || stringres.charAt(i) == 'C')
            {
                
                if(count1 <= 3 && count2 < 2)
                {
                    stringCredits = stringCredits + vArray[mArray.lastIndexOf(data)]+" ";
                   
                }
                else
                {
               sum = 0;
              
                }
            }
            else 
            {
                
                if(count2 >= 2 || count1 > 3)
                {
                    sum = 0;
                   
                }
                else
                {
                    stringCredits = stringCredits + vArray[mArray.lastIndexOf(data)]+" ";
              
                }
            }
         
            
        }
      
     }, this);
}

     console.log(stringres);
        console.log(stringCredits) ;
        calculateSum();
      
    });
   
 function calculateSum()
 {
    creditsArray = stringCredits.split(" ");
    for(var i =0;i< creditsArray.length;)
    {
        if(creditsArray[i]< creditsArray[i+1])
        {
          //   console.log(parseInt(creditsArray[i+1])-parseInt(creditsArray[i]));
          console.log(creditsArray[i+1]);
       
          console.log(vArray.lastIndexOf(parseInt(creditsArray[i+1])));
        console.log(mArray[vArray.lastIndexOf(parseInt(creditsArray[i+1]))]) ;
        if(mArray[vArray.lastIndexOf(parseInt(creditsArray[i]))]=='I') 
        {
            if(mArray[vArray.lastIndexOf(parseInt(creditsArray[i+1]))]=='V' || mArray[vArray.lastIndexOf(parseInt(creditsArray[i+1]))]=='X')
            {
                sum = (sum-0) + (parseInt(creditsArray[i+1])-parseInt(creditsArray[i]));
                // console.log(sum);
                i = i+2;
            }
            else
            {
                sum = 0;
                break;
            }
          
           
        }
        else if(mArray[vArray.lastIndexOf(parseInt(creditsArray[i]))]=='X')
        {
            if(mArray[vArray.lastIndexOf(parseInt(creditsArray[i+1]))]=='L' || mArray[vArray.lastIndexOf(parseInt(creditsArray[i+1]))]=='C')
            {
                sum = (sum-0) + (parseInt(creditsArray[i+1])-parseInt(creditsArray[i]));
                // console.log(sum);
                i = i+2;
            }
            else
            {
                sum = 0;
                break;
            }
           
        }
        else if(mArray[vArray.lastIndexOf(parseInt(creditsArray[i]))]=='C')
        {
            if(mArray[vArray.lastIndexOf(parseInt(creditsArray[i+1]))]=='D' || mArray[vArray.lastIndexOf(parseInt(creditsArray[i+1]))]=='M')
            {
                sum = (sum-0) + (parseInt(creditsArray[i+1])-parseInt(creditsArray[i]));
                // console.log(sum);
                i = i+2;
            }
            else
            {
                sum = 0;
                break;
            }
          
        }
        else if(mArray[vArray.lastIndexOf(parseInt(creditsArray[i]))]=='V' || mArray[vArray.lastIndexOf(parseInt(creditsArray[i]))]=='L' || mArray[vArray.lastIndexOf(parseInt(creditsArray[i]))]=='D')
        {
            sum = 0;
            break;
           
        }
             
        }
        else
        {
          //   console.log(parseInt(creditsArray[i]))
            sum = (sum-0) + parseInt(creditsArray[i]-0);
           // console.log(sum);
            i = i+1;
        }
    }
    console.log(sum); 
    stringres = "";
    stringCredits="";
    splitArray.splice(0);
   
 }
 app.get('/getCredits',function(req,res){
    res.json(sum);
    sum = 0;

console.log(resultArray);

 })
 app.post('/reset',function(req,res){
    resultArray.splice(0);
    console.log('reset '+ resultArray.length);
 });
 function countRun(stringres, x)
 {
    var counter = 0;
    for( var i = 0; i < stringres.length; i++)
    {
      if( stringres.charAt(i) == x )  counter++;
      else if(counter>0) break;
    }
    return counter
 }
 function countCharacters(stringres, x)
 {
    var count=0;
    for( var i=0; i<stringres.length; i++ ) {
        if( stringres.charAt(i) == x ) {
            count++;
        } 
    }
    return count;
 }

app.listen(3000,function(){
    console.log('listesing to server on 3000');
});