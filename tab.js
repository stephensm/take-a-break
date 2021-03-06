var i=1;
var loc;
var data ={"name":'',"date":undefined, "time":40,"items":undefined, "desc":undefined,"cost":undefined,"allergies":undefined,"toatl":undefined};

var events=[];
var allergies=[];
var todo=[];
var weekday =["Sun", "Mon", "Tue", "Wed","Thur", "Fri","Sat"]
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
var ideas = ['Mario Kart', 'Bubble Tea', 'Sushi Break', 'Cannolis', 'Donuts', 'Ice Cream', 'Bubble Party'];

$( document ).ready(function() {
	if(getUrlParameter('event')){
		showEvent();
		var event=getUrlParameter('event');
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
		else{
			setEvent(event);
		}
	}
	if(localStorage.getItem("events") !== null){
		events=JSON.parse(localStorage.getItem("events"));
		changeEvents();
		if(events.length==0){
			 document.getElementById("start").style.display = "inherit";
		 }
		else{
			document.getElementById("start").style.display = "none";
		}
	}

	$('#datetimepicker1').datepicker({    
		autoclose: true,
    	todayHighlight: true
    });
    
   // Autocomplete stuff
    $('#break-name').autocomplete({
        minLength: 0,
        select: function(e, ui) {
            $('#break-name').val(ui.item.value);
            if (!e.keyCode || e.keyCode != 13) {
                suggestIdea();
            }
            return false;
        },
    })
    .keydown(function(e) {
        if (e.keyCode == 13) {
            suggestIdea();
            return false;
        }
    })
    .focus(function(e) {
        $('#break-name').autocomplete('search', '');
    });
    $('#break-name').autocomplete('option', 'source', ideas);
});

function deleteRow(e) {
	$('#delete_row'+e).parent().parent().remove();
	change();
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
function addRow(item,desc,cost){
	if(typeof item === "undefined") {
       item = "";
    }
	if(typeof desc === "undefined") {
       desc = "";
    }
	if(typeof cost === "undefined") {
       cost = "";
    }
	var table = document.getElementById("to-do");
	var row = table.insertRow(1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5= row.insertCell(4);
	cell1.innerHTML = "<span id='check_row"+i+"'  class='glyphicon glyphicon-check' aria-hidden='true' onclick='checkRow("+i+")'/>";
	
	cell2.innerHTML = "<span id='delete_row"+i+"'  class='glyphicon glyphicon-remove' aria-hidden='true' onclick='deleteRow("+i+")'/>";
	cell3.innerHTML = "<input name='item"+i+"' type='text'  class='form-control input-sm' value='"+item+"'/>";
	cell4.innerHTML = "<input name='description"+i+"' type='text'  class='form-control input-md' value='"+desc+"'/>";
	cell5.innerHTML = "<input name='cost"+i+"' type='number' min='0.00' step='1' max='1000' class='form-control input-sm 'value='"+cost+"'/>";
  	i++;
	change();
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
function changeEvents(){
		$("#event-list").empty();
		var ul = document.getElementById("event-list");
		for(k in events){
			idea=events[k];
			var li1 = document.createElement("li");
			li1.className="list-group-item";
			var createA = document.createElement('a');
			var createAText = document.createTextNode(idea["name"]);
			if(idea.date){
				var date=new Date(String(idea.date));
				var day=weekday[date.getDay()]+" "+monthNames[date.getMonth()]+ " "+date.getDay();
				createAText=document.createTextNode(day + ": "+idea["name"]);
			}
			createA.setAttribute('href', "#");
			createA.setAttribute('onclick', "loadSavedEvent("+k+")");
			createA.appendChild(createAText);
			
			li1.appendChild(createA);
			ul.appendChild(li1);
		}
	localStorage.events=JSON.stringify(events);
}
function getRandomIdea(){
	change();
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
function loadSavedEvent(k){
	showEvent();
	if(k === undefined){
		data=events[loc]
	}
	else if(k === 'new'){
		data={"name":'',"date":undefined, "time":40,"items":undefined, "desc":undefined,"cost":undefined,"allergies":undefined,"toatl":undefined};
		loc=events.length;
	}
	else{
		data=events[k];
		loc=k;
	}
	document.getElementById('break-name').value=data["name"];
	$("#to-do").find("tr:gt(0)").remove();
	$("#allergies-list").empty();
	allergies=data["allergies"]
	changeAllergies();
	$("#dropdownTime").val(data["time"]);
	for( l in data["items"]){
		if(data["items"][l]){
			addRow(data["items"][l],data["desc"][l],data["cost"][l]);
		}
	}
	$('#datetimepicker1').datepicker('setDate',data["date"]);
	$("#save").prop("disabled",true);
	$("#save").text("Event Saved!");
	$("#save").addClass('btn-success');
	document.getElementById("revert").style.display = "none";
	getNewBudget();
}
function change(){
	getNewBudget();
	$("#save").removeAttr('disabled');
	$("#save").removeClass('btn-success');
	$("#save").text("Save Event");
	document.getElementById("revert").style.display = "inherit";
}
function getNewBudget(){
	var list=$("#to-do").find("input");
	var total=0.00;
	list.each(function(i){
        if (i %3 == 2){
			total+=Number(list[i].value);
		}
    });
	$("#total").text(total);
	var remaining=parseFloat(246.00-total).toFixed(2);;
	$("#remaining").text(remaining);
	
}
function saveEvent(){
	$("#save").prop("disabled",true);
	$("#save").addClass('btn-success');
	$("#save").text("Event Saved!");
	document.getElementById("revert").style.display = "none";
	data["name"]=document.getElementById('break-name').value;
	data["allergies"]=allergies;
	data["date"]=$('#datetimepicker1').datepicker('getDate');
	data["time"]=$("#dropdownTime").val();
	var item=[];
	var desc=[];
	var cost=[];
	var total=0;
	var list=$("#to-do").find("input");
	list.each(function(i){
        if (i %3 == 0){
			item.push(list[i].value);
		}
		else if (i%3 == 1){
			desc.push(list[i].value);
		}
		else{
			cost.push(list[i].value);
			total+=Number(list[i].value);
		}
    });
	data["items"]=item;
	data["desc"]=desc;
	data["cost"]=cost;
	data["total"]=total;
	if(!events[loc]){
		events.push(data);
		loc=events.length-1;
	}
	else{
		events[loc]=data;
	}
	changeEvents();
	localStorage.events=JSON.stringify(events);	
}
function makeBubbles(){
		$("#allergies-list").empty();
	document.getElementById('break-name').value="Bubble Party";
		$("#to-do").find("tr:gt(0)").remove();
		allergies=[];
		changeAllergies();
		addRow("Soap");
		addRow("Wire");
		addRow("Bubble Wands");
		addRow("Buckets");
}
function makeMario(){
		$("#allergies-list").empty();
	document.getElementById('break-name').value="Mario Party";
		$("#to-do").find("tr:gt(0)").remove();
		allergies=[];
		changeAllergies();
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
	document.getElementById('break-name').value="Ice cream";
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
	document.getElementById('break-name').value="Froyo";
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
		allergies=[];
		changeAllergies();
}
function clearForm(){
	$("#to-do").find("tr:gt(0)").remove();
	document.getElementById('break-name').value="";
	$("#allergies-list").empty();
	addRow();
	change();
}
function printList(){
	$('#to-do').printElement({printMode:'popup'});
}
function cancelEvent(){
	 saveEvent();
	 events.splice(loc, 1);
	 loc=undefined;
	 document.getElementById("event").style.display = "none";
	 document.getElementById("no-event").style.display = "inherit";
	 if(events.length==0){
		 document.getElementById("start").style.display = "inherit";
	 }
	else{
		document.getElementById("start").style.display = "none";
	}
	changeEvents();
	
}
function newEvent(){
	loadSavedEvent('new');
	addRow();
}
function showEvent(){
	document.getElementById("event").style.display = "inherit";
	document.getElementById("no-event").style.display = "none";
}
function makeEvent(){
	if(!events[loc]){
		events.push(data);	
		loc=events.length-1;
	}
	else{
		events[loc]=data;
	}
	changeEvents();
	

};
function setEvent(name){
	loadSavedEvent('new');
	document.getElementById('break-name').value=name;
	addRow();
	
}
// source http://stackoverflow.com/questions/19491336/get-url-parameter-jquery
function getUrlParameter(sParam){
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