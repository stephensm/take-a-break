 var i=1;

$( document ).ready(function() {
	if(getUrlParameter('event')){
		showEvent();
		var event=getUrlParameter('event');
		console.log(event);
		if (event==='mario'){
			makeMario();
		}
		if (event==='bubbles'){
			makeBubbles();
		}
		if (event==='icecream'){
			makeIce();
		}
		if (event==='cannolies'){
			makeCannolies();
		}
		if (event==='sushi'){
			makeSushi();
		}
		if (event==='donuts'){
			makeDonuts()
		}
		if (event==='tea'){
			makeTea();
		}
		if (event==='froyo'){
			makeFroyo();
		}
	}
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
	$('#delete_row'+e).parent().parent().remove();
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
		makeIce();
	}
}
function getRandomIdea(){
	var event=Math.floor(Math.random() * 8) ;
	if (event===0){
			makeMario();
		}if (event===1){
			makeBubbles();
		}if (event===2){
			makeIce();
		}if (event===3){
			makeCannolies();
		}if (event===4){
			makeSushi();
		}if (event===5){
			makeDonuts()
		}if (event===6){
			makeTea();
		}if (event===7){
			makeFroyo();
		}
}
function showEvent(){
	$('#make-event').hide();
	document.getElementById("event").style.display = "inherit";
	document.getElementById("no-events").remove();
	
}
function makeBubbles(){
		$("#allergies-list").empty();
	document.getElementById('break-name').value="Bubble Party";
		$("#to-do").find("tr:gt(0)").remove();
		addRow("Soap");
		addRow("Wire");
		addRow("Bubble Wands");
		addRow("Buckets");
}
function makeMario(){
		$("#allergies-list").empty();
	document.getElementById('break-name').value="Mario Party";
		$("#to-do").find("tr:gt(0)").remove();
		addRow("Mario Cart");
		addRow("Wii");
}
function makeCannolies(){
		$("#allergies-list").empty();
	document.getElementById('break-name').value="Cannolies";
		$("#to-do").find("tr:gt(0)").remove();
		addRow("Plates");
		addRow("Cannolies");
		addRow("Milk");
		var ul = document.getElementById("allergies-list");
		var li1 = document.createElement("li");
		li1.className="list-group-item";
		var text1 = document.createTextNode("Dairy (10) ");
		var li2 = document.createElement("li");
		li2.className="list-group-item";
		var text2 = document.createTextNode("Vegan (3) ");
		var li3 = document.createElement("li");
		li3.className="list-group-item";
		var text3 = document.createTextNode("Nuts (15) ");
		li1.appendChild(text1);
		li2.appendChild(text2);
		li3.appendChild(text3);
		ul.appendChild(li1);
		ul.appendChild(li2);
		ul.appendChild(li3);
}
function makeSushi(){
		$("#allergies-list").empty();
	document.getElementById('break-name').value="Sushi";
		$("#to-do").find("tr:gt(0)").remove();
		addRow("Rice");
		addRow("Seaweed (Nori) ");
		addRow("Pickeld Ginger");
		addRow("wassabi");
		addRow("cucumbers");
		addRow("avacados");
		addRow("salmon");
		addRow("tuna");
		var ul = document.getElementById("allergies-list");
		var li1 = document.createElement("li");
		li1.className="list-group-item";
		var text1 = document.createTextNode("Vegan (10) ");
		var li2 = document.createElement("li");
		li2.className="list-group-item";
		var text2 = document.createTextNode("Vegatarian (3) ");
		var li3 = document.createElement("li");
		li3.className="list-group-item";
		var text3 = document.createTextNode("Fish (1) ");
		li1.appendChild(text1);
		li2.appendChild(text2);
		li3.appendChild(text3);
		ul.appendChild(li1);
		ul.appendChild(li2);
		ul.appendChild(li3);
}
function makeIce(){
		$("#allergies-list").empty();
		$("#to-do").find("tr:gt(0)").remove();
		addRow("Ice cream");
		addRow("Cherries");
		addRow("Bowls");
		addRow("Sprinkles");
		addRow("Nuts");
		addRow("Whipped Cream");
		var ul = document.getElementById("allergies-list");
		var li1 = document.createElement("li");
		li1.className="list-group-item";
		var text1 = document.createTextNode("Dairy (10) ");
		var li2 = document.createElement("li");
		li2.className="list-group-item";
		var text2 = document.createTextNode("Vegan (3) ");
		var li3 = document.createElement("li");
		li3.className="list-group-item";
		var text3 = document.createTextNode("Nuts (15) ");
		li1.appendChild(text1);
		li2.appendChild(text2);
		li3.appendChild(text3);
		ul.appendChild(li1);
		ul.appendChild(li2);
		ul.appendChild(li3);
	}
function makeFroyo(){
		$("#allergies-list").empty();
		$("#to-do").find("tr:gt(0)").remove();
		addRow("Froyo");
		addRow("Cherries");
		addRow("Bowls");
		addRow("Sprinkles");
		addRow("Nuts");
		addRow("Whipped Cream");
		var ul = document.getElementById("allergies-list");
		var li1 = document.createElement("li");
		li1.className="list-group-item";
		var text1 = document.createTextNode("Dairy (10) ");
		var li2 = document.createElement("li");
		li2.className="list-group-item";
		var text2 = document.createTextNode("Vegan (3) ");
		var li3 = document.createElement("li");
		li3.className="list-group-item";
		var text3 = document.createTextNode("Nuts (15) ");
		li1.appendChild(text1);
		li2.appendChild(text2);
		li3.appendChild(text3);
		ul.appendChild(li1);
		ul.appendChild(li2);
		ul.appendChild(li3);
	}
function makeDonuts(){
		$("#allergies-list").empty();
	document.getElementById('break-name').value="Dounuts";
		$("#to-do").find("tr:gt(0)").remove();
		addRow("Donuts");
		addRow("Coffee");
		addRow("Cups");
		addRow("Plates");
}
function makeTea(){
		$("#allergies-list").empty();
	document.getElementById('break-name').value="Bubble Tea";
		$("#to-do").find("tr:gt(0)").remove();
		addRow("Ice Tea");
		addRow("Boba");
		addRow("straws");
		addRow("Cups");
}
function clearForm(){
	$("#to-do").find("tr:gt(0)").remove();
	document.getElementById('break-name').value="";
	$("#allergies-list").empty();
	addRow();
}

// source http://stackoverflow.com/questions/19491336/get-url-parameter-jquery
function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}   