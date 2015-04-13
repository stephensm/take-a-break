eventCSV = "Event,Date,Cost,Total\nTotal,9/1/2014,0,1000\nFirst GRT meeting,9/2/2014,50,950\nBoard Game Night,9/27/2014,46,904\nIce Cream,10/14/2014,75,829\nHalloween Party,10/29/2014,105,724\nSimmons-Next-McCormick Formal,11/15/2014,61,663\nChancellor Visiting Dining,11/24/2014,0,663\nFinal Projects Last Push,12/4/2014,62,601\nPre-Finals Froyo Study Break,12/11/2014,83,518\nReg Day Welcome Back,1/27/2015,42,476\nCPW Meeting,2/15/2015,39,437\nLounge Rush,2/21/2015,53,384\nPre-Spring Break Hell Week Preparation,3/15/2015,73,311\nScooter Hockey First Game,3/16/2015,35,276\nFourth Annual Plastic Ovoid Non-Denominational Hunt,4/5/2015,30,246";
function csvJSON(csv){
  var lines=csv.split("\n");
 
  var result = [];
 
  var headers=lines[0].split(",");
 
  for(var i=1;i<lines.length;i++){
 
	  var obj = {};
	  var currentline=lines[i].split(",");
 
	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
 
	  result.push(obj);
 
  }
  
  return result; //JavaScript object
  //return JSON.stringify(result); //JSON
}

events = csvJSON(eventCSV);