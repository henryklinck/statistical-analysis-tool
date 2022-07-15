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

    // check if there are values in original data, not a perfect method
    //if (((rows.length / numrows) / numvar) != 1) {
    //    window.alert("ERROR: Wrong Num of Vars or Invalid Data (commas in data or improper format)")
    //    return
    //}

    var allvalues1 = [];

    for (let j=0; j < numvar; j++) {
        allvalues1[j] = new Array
        allvalues1[j].push(headers[j]);
        for (let i=1; i<lenrows; i++) {
            usablerow = rows[i].split(delimiter)
            allvalues1[j].push(usablerow[j]);
        }
    }

    return allvalues1[1]

    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    //const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    //const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    //var allvalues = [];

    //for (let j = 0; j < headers.length; j++) {
    //    allvalues.push(headers[j]);
    //    for (let i = 1; i < rows.length; i++) {
    //        allvalues[j].push(rows[i][j]);
    //    }
    //}

    //return allvalues;
}


    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    /*const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });

    // return the array
    return arr;
  } */

/*function csvToArray1(str, num) {
    // input csvfile, returns array of different *columns in csv file as arrays.

}*/

inputdata.addEventListener('submit', function (e) {
    e.preventDefault;
    const input = csvfile.files[0];
    // window.alert(typeof input)
    const reader = new FileReader();
    

    reader.onload = function (e) {
        const text = e.target.result;
        const data = csvToArray(text, numvar.value);
        

        // document.getElementById("result").innerHTML = data;
        //document.getElementById("show-result").innerHTML = numvar.value;
        // window.alert(JSON.stringify(data));
        // window.alert(data);
        // var basic_data = JSON.stringify(data[0]);
        document.write(data);
      };
      reader.readAsText(input);
      
    });