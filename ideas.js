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

    // Tooltips
    $(".glyphicon-trash").tooltip({
      content: "Delete"
    });

    // Voting system - restricted to one vote per user
    // Upvotes
    $(".glyphicon-plus").click(function(){
      var td = $(this).parent();
      var thisCount = td.find('#count');
      var text = thisCount.text();

      if($(td).hasClass("upvoted")) {
        var number = parseInt(text, 10) - 1;
        thisCount.html(number);
        $(this).css("background-color", "#BDBDBD");
      }

      else if($(td).hasClass("downvoted")) {
        var number = parseInt(text, 10) + 2;
        thisCount.html(number);

        $(td).toggleClass("downvoted");
        $(this).css("background-color", "#009647");
        var downvote = td.find('.glyphicon-minus');
        $(downvote).css("background-color", "#BDBDBD");
      }

      else {
        var number = parseInt(text, 10) + 1;
        thisCount.html(number);
        $(this).css("background-color", "#009647");
      }

      $(td).effect("highlight", {}, 500);
      $(td).toggleClass("upvoted");
    });

    // Downvotes
    $(".glyphicon-minus").click(function(){
      var td = $(this).parent();
      var thisCount = td.find('#count');
      var text = thisCount.text();

      if($(td).hasClass("downvoted")) {
        var number = parseInt(text, 10) + 1;
        thisCount.html(number);
        $(this).css("background-color", "#BDBDBD");
      }

      else if($(td).hasClass("upvoted")) {
        var number = parseInt(text, 10) - 2;
        thisCount.html(number);

        $(td).toggleClass("upvoted");
        $(this).css("background-color", "#f43535");
        var upvote = td.find('.glyphicon-plus');
        $(upvote).css("background-color", "#BDBDBD");
      }

      else {
        var number = parseInt(text, 10) - 1;
        thisCount.html(number);
        $(this).css("background-color", "#f43535");
      }

      $(td).effect("highlight", {}, 500);
      $(td).toggleClass("downvoted");
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
      var cell6 = row.insertCell(5);
      var d = new Date();

      cell1.innerHTML = '<button class="glyphicon glyphicon-minus btn-xs" aria-hidden="true"></button><span id="count"> 0 </span><button class="glyphicon glyphicon-plus btn-xs" aria-hidden="true"></button>';
      $(cell1).toggleClass("vote");
      cell2.innerHTML = document.getElementById('titleBox').value;
      cell3.innerHTML = 'You';
      cell4.innerHTML = d.toDateString();
      cell5.innerHTML = '<div class=scrollable>' + document.getElementById('descriptionBox').value + '</div>';
      cell6.innerHTML = '<button class="glyphicon glyphicon-pencil btn-sm" aria-hidden="true"></button>' +
      '<button class="glyphicon glyphicon-trash btn-sm" aria-hidden="true"></button>' +
      '<button class="btn btn-primary" OnClick=" location.href=\"./tab.html?event=donuts\"">Create</button>';

      document.getElementById('titleBox').value = '';
      document.getElementById('descriptionBox').value = '';

      $(row).effect("highlight", {}, 3000);
    });


    // Delete an idea from the table
    $(".glyphicon-trash").click(function() {
      var row = $(this).parent().parent();
      $('#deleteIdeaModal').modal('toggle');    // launch confimation modal

      $("#deleteIdea").click(function() {
        row.css("background-color","#FF3700");
        row.fadeOut(400, function(){
            row.remove();
        });
      });
    });


    // Edit an idea on the table
    // BUG TODO: multiple highlights
    $(".glyphicon-pencil").click(function() {
      var row = $(this).parent().parent();
      $('#editIdeaModal').modal('toggle');    // launch modal

      $("#editIdea").click(function() {
        $(row).effect("highlight", {}, 3000);
        

      });
    });


    // Searching functionality
    $("#searchBox").keyup(function() {
      var userInput = $(this).val().toLowerCase();

      $("#ideasTable td").map(function(index, value) {
        if($(value).text().toLowerCase().indexOf(userInput) >= 0)
          $(value).css("background-color", "yellow");
        else
          $(value).css("background-color", "white");
        if(userInput === "")
          $(value).css("background-color", "white");
      });
    });
});
