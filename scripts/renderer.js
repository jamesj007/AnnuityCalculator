// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
'use strict'

window.$ = window.jQuery = window.jquery = require("jquery")
window.Tether = require('tether')
window.Bootstrap = require('bootstrap')

// Create our number formatter. Default JavaScript converter to dollars
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    // the default value for minimumFractionDigits depends on the currency
    // and is usually already 2
});


//function to calculate the retirement savings
function calcRetirementSavings() {
    // 0 -> 4 are the textfields needed here
    var annuity = document.getElementsByClassName('inputNum')[0].value; //annuity before retirement
    var interestRate = document.getElementsByClassName('inputNum')[1].value; //interest rate before retirement
    var years = document.getElementsByClassName('inputNum')[2].value;  //number of years till retirement
    var new_interestRate = document.getElementsByClassName('inputNum')[3].value; //interest rate after retirement
    var retireYears = document.getElementsByClassName('inputNum')[4].value; //amount of years after retirement
 
    if (annuity <= 0 || interestRate <= 0 || years <= 0 || new_interestRate <= 0 || retireYears <= 0) {
        document.getElementById("retireFuture").innerHTML = "Invalid Parameters";
        document.getElementById("output_final").innerHTML = "Invalid Parameters";
        return;
    }


    var futureFactor = fvifa(interestRate, years);
    var retirementAmount = annuity * futureFactor;
    document.getElementById("retireFuture").innerHTML = formatter.format(retirementAmount);
    var presentFactor = pvifa(new_interestRate, retireYears);
    var yearlyWithdraw = retirementAmount / presentFactor;
    document.getElementById("output_final").innerHTML = formatter.format(yearlyWithdraw);
}

//calculate future value of annuity
function futureValueA() {
    // 5 -> 7 are the textfields needed here
    var annuity = document.getElementsByClassName('inputNum')[5].value; //annuity
    var interestRate = document.getElementsByClassName('inputNum')[6].value; //interest rate 
    var years = document.getElementsByClassName('inputNum')[7].value; //years
    
    if (annuity <= 0 || interestRate <= 0 || years <= 0) {
        document.getElementById("outputFV").innerHTML = "Invalid Parameters";
        return;
    }



    var futureFactor = fvifa(interestRate, years);
    var result = annuity * futureFactor;
    document.getElementById("outputFV").innerHTML = formatter.format(result);
}

//calculate present value of annuity
function presentValueA() {
    // 8-> 10 are the textfields needed here
    var annuity = document.getElementsByClassName('inputNum')[8].value; //annuity
    var interestRate = document.getElementsByClassName('inputNum')[9].value; //interest rate 
    var years = document.getElementsByClassName('inputNum')[10].value; //years
    
    if (annuity <= 0 || interestRate <= 0 || years <= 0) {
        document.getElementById("outputPV").innerHTML = "Invalid Parameters";
        return;
    }



    var presentFactor = pvifa(interestRate, years);
    var result = annuity * presentFactor;
    document.getElementById("outputPV").innerHTML = formatter.format(result);
}


//generic function to calculate Future Annuity factor
function fvifa(interest, years) {
    var interestP = interest /100;
    var result = ((Math.pow(1+interestP, years)-1)/interestP);
    return result;
}

//generic function to calculate present value of annuity factor
function pvifa(interest, years) {
    var interestP = interest/100;
    var result = ((1-(1/(Math.pow(1+interestP, years)))) / interestP);
    return result;
}