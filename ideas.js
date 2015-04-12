$(document).ready(function(){
    // Functionality for the "Show More/Less" button
    $(".hid").hide();

    $("#showToggle").click(function(){
      if($(".hid").is(":hidden")) {
        $(".hid").show();
        $(this).html('<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-chevron-up" aria-hidden="true"> Show Less</span></button>');
      }
      else {
        $(".hid").hide();
        $(this).html('<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-chevron-down" aria-hidden="true"> Show More</span></button>');
      }
    });


    // Voting system - this should be restricted to one vote per user
    $("#plus").click(function(){
      var text = $('#count1').text();
      var number = parseInt(text, 10);
      number = number+=1;
      $("#count1").text(number);
    });

    $("#minus").click(function(){
      var text = $('#count1').text();
      var number = parseInt(text, 10);
      number = number-=1;
      $("#count1").text(number);
    });


    // Add a row to the table with a new idea
    $("#addIdea").click(function(){
      var table = document.getElementById("ideasTable");
      var row = table.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);

      cell1.innerHTML = '0';
      cell2.innerHTML = document.getElementById('titleBox').value;
      cell3.innerHTML = 'You';
      cell4.innerHTML = 'April 15, 2015';
      cell5.innerHTML = document.getElementById('descriptionBox').value;

      document.getElementById('titleBox').value = '';
      document.getElementById('descriptionBox').value = '';
    });
});