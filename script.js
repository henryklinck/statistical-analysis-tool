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

    for (let k=0; k < (var1.length - 1); k++) {
        sumvar1 += parseFloat(var1[k]);
        sumvar2 += parseFloat(var2[k]);
    }

    var meanvar1 = (sumvar1 / var1.length);
    var meanvar2 = (sumvar2 / var2.length);

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


function computeSpearmansCoef(var1raw, var2raw) {
    // assume numerical data and ordinal data (in order) or boolean catergorical data
    
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
    
    // sort var1 (increasing order) while saving index values of each point

    var points = [];
    for (i=0; i < var1.length; i++) {
        var single_point = [parseFloat(var1[i]), parseFloat(var2[i])];
        points.push(single_point);
    }
    points.sort(function(a, b){return a[0] - b[0]});
    

    //determine sum(difference between the two ranks of each observation^2)
    var sum_diff_ranks_so_far = 0;
    
    for (j=0; j < (var1.length - 1); j++) {
        sum_diff_ranks_so_far += ((points[j][1] - points[(j + 1)][1]) ** 2);
    }
    
    var n = var1.length;

    var p_1 = 1 - ((6 * sum_diff_ranks_so_far) / (n * (n ** 2) - 1))

    return Math.abs(p_1.toFixed(5)); 
}


function determineStrongestCorr(dataasarray, numofvariables) {
    // Return list of strongest correlations and the associated correlation coefficients
    const data = dataasarray;
    var strongestcorrelations = new Map();
    
    for (let i=0; i < numofvariables; i++) {
        for (let j=0; j < numofvariables; j++) {
            if (i != j) {
                var pcoffvalue = computePearsonsCoef(data[i], data[j]);
                var spearmancoffvalue = computeSpearmansCoef(data[i], data[j]);
                strongestcorrelations.set(pcoffvalue, [String(data[i][0] + " + " + data[j][0]), [i, j]]);
            }
        }
    }

    let correlation_values = Array.from( strongestcorrelations.keys() );

    var desc_correlation_values = correlation_values.sort(function(a, b){return b - a})

    var result_message = [];

    for (let i=0; i < strongestcorrelations.size; i++) {
        var spearmancoffvalue = computeSpearmansCoef(data[strongestcorrelations.get(desc_correlation_values[i])[1][0]], data[strongestcorrelations.get(desc_correlation_values[i])[1][1]]);
        if (desc_correlation_values[i] >= 0.5) {
            result_message[i] = "Correlation " + (i+1) + ": " + strongestcorrelations.get(desc_correlation_values[i])[0].bold() + " => Pearson's Correlation: " + desc_correlation_values[i] + " - Spearman's Correlation: " + spearmancoffvalue;
        } else {
            result_message[i] = "Correlation " + (i+1) + ": " + strongestcorrelations.get(desc_correlation_values[i])[0] + " => Pearson's Correlation: " + desc_correlation_values[i] + " - Spearman's Correlation: " + spearmancoffvalue;
        }
        
    }

    return result_message
  
}

var final_output = "Test";

function output_result (result) {
    document.open();
    document.write('<button style="background-color: #e7e7e7; color: black; border: none; padding: 8px 16px; text-align: center; font-size: 12px;" onClick="window.location.reload();">Home</button>');
    document.write('<body> <h1> Results: </h1>');
    
    document.write('<button style="background-color: #e7e7e7; color: black; border: none; padding: 15px 32px; text-align: center; font-size: 16px;" onclick="window.print()">Print Results</button>')
    document.write("<br>");
    document.write("<br>");
    document.write("Note: All Person Correlation Values are *absolute* values");
    document.write("<br");
    document.write("Bolded Correlations have a Pearson Coefficient >= 0.5");
    document.write("<br>");
    document.write("<br>");
    for (let j=0; j < result.length; j++) {
        document.write(result[j]);
        document.write("<br>");
    }
    document.write(" </body>")
    document.close();

}


inputdata.addEventListener('submit', function (e) {
    e.preventDefault;
    const input = csvfile.files[0];
    const reader = new FileReader();
    
    reader.onload = function (e) {
        const text = e.target.result;
        const data = csvToArray(text, numvar.value);
        var result = determineStrongestCorr(data, numvar.value);
        
        
        output_result(result);
      };
      reader.readAsText(input);
      
});

