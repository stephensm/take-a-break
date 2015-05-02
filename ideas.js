$(document).ready(function(){
  $(".titleError").hide();
  $(".descError").hide();
  /*
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
  */
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
      sortIdeas()
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
      sortIdeas()
    });


    // Add a row to the table with a new idea
    $("#addIdea").click(function(){
      var title = document.getElementById('titleBox').value;
      var description = document.getElementById('descriptionBox').value;

      if(title === "")
        $(".titleError").show();
      if(description === "")
        $(".descError").show();


      if(title != "" && description != "") {
        $(".titleError").hide();
        $(".descError").hide();
        $('#addIdeaModal').modal('hide');
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
        cell2.innerHTML = title;
        cell3.innerHTML = 'You';
        cell4.innerHTML = d.toDateString();
        cell5.innerHTML = '<div class=scrollable>' + description + '</div>';
      
		    var click="location.href='./tab.html?event=" + title + "'"; 
        cell6.innerHTML = '<button class="glyphicon glyphicon-pencil btn-sm" aria-hidden="true"></button>' +
        '<button class="glyphicon glyphicon-remove btn-sm" aria-hidden="true"></button>' +
        '<button class="btn btn-success" OnClick="'+ click +'">Make It</button>';

        document.getElementById('titleBox').value = '';
        document.getElementById('descriptionBox').value = '';
        $(row).effect("highlight", {}, 3000);
    }
    });

    var delRow;
    // Delete an idea from the table
    $(".glyphicon-remove").click(function() {
      delRow = $(this).parent().parent();
      $('#deleteIdeaModal').modal('show');    // launch confimation modal

      $("#deleteIdea").click(function() {
        delRow.css("background-color","#FF3700");
        delRow.fadeOut(400, function(){
            delRow.remove();
        });
      });
    });


    // Edit an idea on the table
    var editRow;
    var c1;
    var c4;
    $(".glyphicon-pencil").click(function() {
      editRow = $(this).parent().parent();
      $('#editIdeaModal').modal('show');    // launch modal
      c1 = editRow[0].cells[1];
      c4 = editRow[0].cells[4];

      document.getElementById('editTitleBox').value = c1.innerHTML;
      var cellHtml = c4.innerHTML;
      document.getElementById('editDescriptionBox').value = cellHtml.replace(/<[^>]*>/g, "");
      $(editRow).effect("highlight", {}, 1000);

      $("#editIdea").click(function() {
        var eTitle = document.getElementById('editTitleBox').value;
        var eDesc = document.getElementById('editDescriptionBox').value;

        if(eTitle === "")
          $(".titleError").show();
        if(eDesc === "")
          $(".descError").show();

        if(eTitle != "" && eDesc != "") {
          $(".titleError").hide();
          $(".descError").hide();
          $('#editIdeaModal').modal('hide');

          c1.innerHTML = eTitle;
          c4.innerHTML = '<div class=scrollable>' + eDesc + '</div>';
        }
      });
    });

    // Hide error messages upon closing the modal
    $(".closeModal").click(function() {
      $(".titleError").hide();
      $(".descError").hide();
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


    // Sort ideas by popularity
    function sortIdeas() {
      var tableData = document.getElementById("ideasTable").getElementsByTagName('tbody').item(0);

      // Read table row nodes
      var rowData = tableData.getElementsByTagName('tr');

      for(var i = 0; i < rowData.length - 1; i++){
        for(var j = 0; j < rowData.length - (i + 1); j++) {
          var td1 = $(rowData.item(j).getElementsByTagName('td').item(0));
          var td2 = $(rowData.item(j+1).getElementsByTagName('td').item(0));
          if(parseInt(td1.find('#count').text()) < parseInt(td2.find('#count').text()))
            tableData.insertBefore(rowData.item(j+1),rowData.item(j));
        }
      }
    }
});
