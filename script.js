let inputdata = document.getElementById("input-data");
let csvfile = document.getElementById("csv-input");
let numvar = document.getElementById("num-value-input");

function csvToArray(str, numvar, delimiter = ",") {

    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    const lenrows = rows.length

    var allvalues1 = [];

    for (let j=0; j < numvar; j++) {
        allvalues1[j] = new Array;
        allvalues1[j].push(headers[j]);
        for (let i=1; i<lenrows; i++) {
            usablerow = rows[i].split(delimiter);
            allvalues1[j].push(usablerow[j]);
        }        
    }

    // check for proper input data 
    if (allvalues1[0].length != allvalues1[(numvar - 1)].length) {
        window.alert("Error")
        return allvalues1[0];
    }

    return allvalues1;
}

function computePearsonsCoef(var1raw, var2raw) {
    // assume numerical data and ordinal data (in order) or boolean catergorical data
    var var1type = "numerical";
    var var2type = "numerical";

    var var1 = var1raw.slice(1);
    var var2 = var2raw.slice(1);

    if (isNaN(var1[0])) {
       var1type = "categorical";
       var numvar1 = [];
       var varvalues1 = [];
       for (let i=0; i < var1.length; i++) {
           if (!(varvalues1.includes(var1[i]))) {
                varvalues1.push(var1[i]);
            }
            numvar1[i] = varvalues1.indexOf(var1[i]);
        }
        if (varvalues1.length < 2) {
            window.alert(var1raw[0] + "Has only 1 element")
            return
        }
        var1 = numvar1;
    }
     
    if (isNaN(var2[0])) {
        var2type = "categorical";
        var numvar2 = [];
        var varvalues2 = [];
        for (let j=0; j < var2.length; j++) {
            if (!(varvalues2.includes(var2[j]))) {
                varvalues2.push(var2[j]);
            }
            numvar2[j] = varvalues2.indexOf(var2[j]);
        }
        if (varvalues2.length < 2) {
            window.alert(var2raw[0] + "Has only 1 element")
        }
        var2 = numvar2;
    }

    var sumvar1 = 0;
    var sumvar2 = 0;

    var is_total_bedrooms = false;

    for (let k=0; k < (var1.length - 1); k++) {
        sumvar1 += parseFloat(var1[k]);
        if (var1[k] == 129.0) {
            is_total_bedrooms = true;
        }
        if (is_total_bedrooms == true) {
            console.log(k);
            console.log(sumvar1);
            if (k == 3) {
                console.log("Here1");
                console.log(sumvar1);
            }
        }
        sumvar2 += parseFloat(var2[k]);
    }

    var meanvar1 = (sumvar1 / var1.length);
    var meanvar2 = (sumvar2 / var2.length);

    if (is_total_bedrooms == true) {
        console.log("Here");
        console.log(sumvar1);
    }

    // Calculate sum[(x_i - x_hat)(y_i - y_hat)]
    var numeratorsum = 0;
    var denominatorsum1 = 0;
    var denominatorsum2 = 0;
    var var1_i = 0;
    var var2_i = 0;
    for (let p=0; p < (var1.length - 1); p++) {
        var1_i = parseFloat(var1[p]);
        var2_i = parseFloat(var2[p]);
        numeratorsum += ((var1_i - meanvar1) * (var2_i - meanvar2));
        denominatorsum1 += ((var1_i - meanvar1) ** 2);
        denominatorsum2 += ((var2_i - meanvar2) ** 2);
    }

    var pcoefficient = (numeratorsum / ((denominatorsum1 ** (1/2)) * (denominatorsum2 ** (1/2))));
    
    return Math.abs(pcoefficient.toFixed(3));
}

function determineStrongestCorr(dataasarray, numofvariables) {
    // Return list of strongest correlations and the associated correlation coefficients
    const data = dataasarray;
    var strongestcorrelations = new Map();
    
    for (let i=0; i < numofvariables; i++) {
        for (let j=0; j < numofvariables; j++) {
            if (i != j) {
                var pcoffvalue = computePearsonsCoef(data[i], data[j]);
                strongestcorrelations.set(pcoffvalue, String(data[i][0] + " + " + data[j][0]).bold());
            }
        }
    }

    let correlation_values = Array.from( strongestcorrelations.keys() );

    var desc_correlation_values = correlation_values.sort(function(a, b){return b - a})

    var result_message = "";

    for (let i=0; i < strongestcorrelations.size; i++) {
        result_message = result_message + "Correlation " + (i+1) + ": " + strongestcorrelations.get(desc_correlation_values[i]) + " => Pearson's Correlation: " + desc_correlation_values[i] + " |---| ";
    }

    return result_message
  
}

var final_output = new String();


inputdata.addEventListener('submit', function (e) {
    e.preventDefault;
    const input = csvfile.files[0];
    const reader = new FileReader();
    
    reader.onload = function (e) {
        const text = e.target.result;
        const data = csvToArray(text, numvar.value);
        var result = determineStrongestCorr(data, numvar.value);
        
        
        
        //document.getElementById("show-result").innerHTML = numvar.value;
        // window.alert(JSON.stringify(data));
        // window.alert(data);
        // var basic_data = JSON.stringify(data[0]);

        //document.write(result);
      };
      reader.readAsText(input);
      
      final_output = result
});

document.getElementById("output_section").innerHTML = final_output;
