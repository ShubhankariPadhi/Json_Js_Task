var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        var response = JSON.parse(xmlhttp.responseText);
        var myBooks = response.Employee_details;
        //var myBooks = JSON.parse(this.responseText);

        // EXTRACT VALUE FOR HTML HEADER.
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = [];
        for (var i = 0; i < myBooks.length; i++) {
            for (var key in myBooks[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        // var table = document.createElement("table");
        var table=document.getElementById("table_id");
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1); // TABLE ROW.

        // var tr= document.createElement("tr");
        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < myBooks.length; i++) {

            tr = table.insertRow(-1);
            tr.setAttribute('onclick','getEmployees()');

            // var k=0;
            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myBooks[i][col[j]];

                //alert(myBooks[i][col[j]]);
            }

        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }

}

function getEmployees() {
    var tableData = document.getElementById("table_id");
    for (var m = 0; m < tableData.rows.length; m++) {
        tableData.rows[m].onclick = function () {
            /*var value = this.cells[0].innerHTML;
            console.log(value);*/
            var id = this.cells[0].innerHTML;
            var name = this.cells[1].innerHTML;
            var type = this.cells[2].innerHTML;
            var dob = this.cells[3].innerHTML;
            var exp = this.cells[4].innerHTML;
            var doj = this.cells[5].innerHTML;

            var getDisplay = "<table class='alert-success' align='center'>";
            getDisplay += "<tr><td>Id : </td><td id='id'>" + id + "</td></tr>";
            getDisplay += "<tr><td>Name : </td><td id='name'>" + name + "</td></tr>";
            getDisplay += "<tr><td>Type : </td><td id='type'>" + type + "</td></tr>";
            getDisplay += "<tr><td>DOB : </td><td id='dob'>" + dob + "</td></tr>";
            getDisplay += "<tr><td>Experience : </td><td id='exp'>" + exp + "</td></tr>";
            getDisplay += "<tr><td>DOJ : </td><td id='doj'>" + doj + "</td></tr>";
            getDisplay += "</table>";
            document.getElementById("row_data_div").innerHTML = getDisplay;
        };
    }
}


xmlhttp.open("GET", "employees.json", true);
xmlhttp.send();