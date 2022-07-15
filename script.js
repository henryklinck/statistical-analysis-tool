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
     // assume numerical data
     var var1type = "numerical";
     var var2type = "numerical";

     var var1 = var1raw.slice(1);
     var var2 = var2raw.slice(1);

     return var1

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
            numvar2[j] = varvalues2.indexOf(var2[j] + 1);
        }
        var2 = numvar2;
     }

     var sumvar1 = 0;
     var sumvar2 = 0;

     for (let k=0; k < var1.length; k++) {
        sumvar1 += parseInt(var1[k]);
        sumvar2 += parseInt(var2[k]);
     }

     var meanvar1 = (sumvar1 / var1.length);
     var meanvar2 = (sumvar2 / var2.length);

     return sumvar1
    
}

inputdata.addEventListener('submit', function (e) {
    e.preventDefault;
    const input = csvfile.files[0];
    // window.alert(typeof input)
    const reader = new FileReader();
    

    reader.onload = function (e) {
        const text = e.target.result;
        const data = csvToArray(text, numvar.value);
        var result = computePearsonsCoef(data[0], data[2]);
        

        // document.getElementById("result").innerHTML = data;
        //document.getElementById("show-result").innerHTML = numvar.value;
        // window.alert(JSON.stringify(data));
        // window.alert(data);
        // var basic_data = JSON.stringify(data[0]);
        document.write(result);
      };
      reader.readAsText(input);
      
    });
