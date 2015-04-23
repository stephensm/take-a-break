 var i=1;

var allergies=[];

var ideas = ['Mario Kart', 'Bubble Tea', 'Sushi Break', 'Cannolis', 'Donuts', 'Ice Cream', 'Bubble Party'];

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
    	todayHighlight: true
    });

    
    // Autocomplete stuff
   $('#break-name').autocomplete('option', 'source', ideas);
});

function deleteRow(e) {
	$('#delete_row'+e).parent().parent().remove();
}
function checkRow(e){
	var check=$('#check_row'+e);
	var row=check.parent().parent();
	row.remove();
	if(check.css("color")==="rgb(0, 200, 0)"){
		$('#to-do > tbody').prepend(row);
		$('#check_row'+e).css("color","black");
	}
	else{
	check.css("color","rgb(0, 200, 0)");
	var table =$("#to-do");
	table.append(row);
	}
	
	
}
function addRow(item){
	if(typeof item === "undefined") {
       item = "";
    }

	var table = document.getElementById("to-do");
	var row = table.insertRow(1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	cell1.innerHTML = "<span id='check_row"+i+"'  class='glyphicon glyphicon-check' aria-hidden='true' onclick='checkRow("+i+")'/>";
	
	cell2.innerHTML = "<span id='delete_row"+i+"'  class='glyphicon glyphicon-remove' aria-hidden='true' onclick='deleteRow("+i+")'/>";
	cell3.innerHTML = "<input name='item"+i+"' type='text'  class='form-control input-md' value='"+item+"'/>";
	cell4.innerHTML = "<input name='description"+i+"' type='text'  class='form-control input-md'/>";
  	i++;
}

var ideas = ['Mario Kart', 'Bubble Tea', 'Sushi Break', 'Cannolis', 'Donuts', 'Ice Cream', 'Bubble Party'];
function suggestIdea(){
	var title=document.getElementById('break-name').value.toLowerCase();
	if (title.indexOf("ice cream")>-1){
		makeIce();
	} else if (title.indexOf("mario kart")>-1){
		makeMario();
	} else if (title.indexOf("bubble tea")>-1){
		makeTea();
	} else if (title.indexOf("sushi break")>-1){
		makeSushi();
	} else if (title.indexOf("cannolis")>-1){
		makeCannolies();
	} else if (title.indexOf("donuts")>-1){
		makeDonuts();
	} else if (title.indexOf("bubble party")>-1){
		makeBubbles();
	}
}
function changeAllergies(){
		$("#allergies-list").empty();
		var ul = document.getElementById("allergies-list");
		var total=$("#dropdownTime").val();
		for(var allergy in allergies){
			var li1 = document.createElement("li");
			li1.className="list-group-item";
			var x=Math.floor(Math.random() * 6) ;
		
			var text1 = document.createTextNode(allergies[allergy]+ "("+x+"/"+total+")");
			li1.appendChild(text1);
			ul.appendChild(li1);
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
		allergies=["Vegan","Dairy"];
		changeAllergies();

}
function makeSushi(){
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
		allergies=["Vegan","Vegetarian","Fish"];
		changeAllergies();
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
		allergies=["Vegan","Dairy","Nuts"];
		changeAllergies();
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
		allergies=["Vegan","Dairy","Nuts"];
		changeAllergies();
	}
function makeDonuts(){
		$("#allergies-list").empty();
	document.getElementById('break-name').value="Dounuts";
		$("#to-do").find("tr:gt(0)").remove();
		addRow("Donuts");
		addRow("Coffee");
		addRow("Cups");
		addRow("Plates");
		allergies=["Vegan","Nuts"];
		changeAllergies();
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