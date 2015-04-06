 var i=1;
$( document ).ready(function() {
	$('#datetimepicker1').datepicker({    
		autoclose: true,
    	todayHighlight: true});
    });
	$('#break-name').keypress(function (e) {
	  if (e.which == 13) {
		console.log($('#break-name'))
		return false;    //<---- Add this line
	  }
	});
function deleteRow(e) {
	console.log(e);
	var $tr=$('#delete_row'+e).parent().parent();
	console.log($tr);
	var row=$tr.index();
	console.log(row);
    document.getElementById("to-do").deleteRow(row+1);
}
function addRow(item){
	if(typeof item === "undefined") {
       item = "";
    }

	var table = document.getElementById("to-do");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	cell1.innerHTML = "<span id='delete_row"+i+"'  class='glyphicon glyphicon-remove' aria-hidden='true' onclick='deleteRow("+i+")'/>";
	cell2.innerHTML = "<input name='item"+i+"' type='text'  class='form-control input-md' value='"+item+"'/>";
	cell3.innerHTML = "<input name='description"+i+"' type='text'  class='form-control input-md'/>";
  	i++;
}
function suggestIdea(){
	var title=document.getElementById('break-name').value.toLowerCase();
	if(title.indexOf("ice cream")>-1){
		deleteRow(0); 
		addRow("Ice cream");
		addRow("Cherries");
		addRow("Bowls");
		addRow("Sprinkles");
		addRow("Nuts");
		addRow("Whipped Cream");
		var ul = document.getElementById("allergies-list");
		var li1 = document.createElement("li");
		li1.className="list-group-item";
		var text1 = document.createTextNode("Dairy");
		var li2 = document.createElement("li");
		li2.className="list-group-item";
		var text2 = document.createTextNode("Vegan");
		var li3 = document.createElement("li");
		li3.className="list-group-item";
		var text3 = document.createTextNode("Nuts");
		li1.appendChild(text1);
		li2.appendChild(text2);
		li3.appendChild(text3);
		ul.appendChild(li1);
		ul.appendChild(li2);
		ul.appendChild(li3);
	}
}
function getRandomIdea(){
	document.getElementById('break-name').value="Bubble Party";
		deleteRow(0); 
		addRow("Soap");
		addRow("Wire");
		addRow("Bubble Wands");
		addRow("Buckets");
	var ul = document.getElementById("allergies-list");
		var li1 = document.createElement("li");
		li1.className="list-group-item";
		var text1 = document.createTextNode("None");
		li1.appendChild(text1);
		ul.appendChild(li1);
}
function showEvent(){
	document.getElementById("event").style.display = "inherit";
	document.getElementById("no-events").remove();
}