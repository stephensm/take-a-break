function getGraphData() {
    var data = 'Date,Total\n';
    var x = [];
    for (var i = 0; i < events.length; i++) {
        data += events[i]['Date'] + ',' + events[i]['Total'] + '\n';
        x.push({
            name: events[i]['Event'],
            x: (new Date(events[i]['Date'])).getTime(), 
            y: parseFloat(events[i]['Total'])
        });
        //x.push(events[i]['Date'], parseFloat(events[i]['Total']));
    }
    return x;
    //return data;
}

function getBestFit() {
    var data = getGraphData();
    console.log(data);
    //data[0][0] = data[0][1] * m + n
    //minimize sum([(data[i][0] - data[0][0] + (data[0][1] - data[i][1]) * m)^2] for i)
    //0 = sum((data[i][0] - data[0][0] + (data[0][1] - data[i][1]) * m) * (data[0][1] - data[i][1]))
    
    var a = 0;
    var b = 0;
    for (var i = 0; i < data.length; i++) {
        a += (data[i].x - data[0].x) * (data[0].y - data[i].y);
        b += (data[0].y - data[i].y) * (data[0].y - data[i].y);
    }
    var m = -a/b;
    var n = data[0].x - data[0].y * m;
    var newData = [];
    newData.push(data[0]);
    newData.push([n, 0]);
    console.log(newData);
    return newData;
}

$(function () {

    hs.Expander.prototype.onMouseOut = function () {
        this.close();
    };

    // Get the CSV and create the chart
    //$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=analytics.csv&callback=?', function (csv) {
    $('#container').highcharts({
        title: {
            text: 'Budget Remaining Over Time'
        },

        xAxis: {
            type: 'datetime',
            tickInterval: 30 * 24 * 3600 * 1000, // one month
            dateTimeLabelFormats: {
                month: '%B',
            },
            tickWidth: 0,
            gridLineWidth: 1,
            labels: {
                align: 'left',
                x: 3,
                y: 15
            },
            max: (new Date('5/23/2015')).getTime()
        },

        yAxis: {
            title: { text: null },
            labels: {
                align: 'right',
                x: 0,
                y: -2,
                format: '${value:.0f}'
            },
            showFirstLabel: false
        },

        legend: {
            enabled: false
        },
        
        tooltip: { enabled: false },

        /*tooltip: {
            dateTimeLabelFormats: {
                hour: '%A, %b %e, %Y'
            }
        },*/

        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function (e) {
                            if (this.series.name === "Best Fit") {
                                return;
                            }
                            console.log(this);
                            var date = Highcharts.dateFormat('%m/%e/%y', this.x);
                            hs.htmlExpand(null, {
                                pageOrigin: {
                                    x: e.pageX || e.clientX,
                                    y: e.pageY || e.clientY
                                },
                                headingText: this.name + ' (' + date + ')',
                                maincontentText: '$' + this.y,
                                width: 200
                            });
                        }
                    }
                }                
            }
        },

        series: [{
            name: 'Remaining Budget',
            data: getGraphData(),
            lineWidth: 4,
            marker: {
                enabled: true,
                radius: 6
            }
        }, {
            name: 'Best Fit',
            data: getBestFit(),
            lineWidth: 2,
            marker: {
                enabled: false
            },
            zIndex: -1
        }]
    });
    
    $('#budgetremaining').text(events[events.length - 1]['Total']);
    $('#budgettotal').text(events[0]['Total']);
    
    var sorterNames = ['nameSorter', 'dateSorter', 'costSorter', 'budgetSorter'];
    var fillInSorter = function(id) {
        $('#' + id).append('<img id="' + id + 'FilledTop" src="img/filled_arrow_up.png" class="sorterTop"></img>');
        $('#' + id).append('<img id="' + id + 'UnfilledTop" src="img/unfilled_arrow_up.png" class="sorterTop"></img>');
        $('#' + id).append('<img id="' + id + 'FilledBottom" src="img/filled_arrow_down.png" class="sorterBottom"></img>');
        $('#' + id).append('<img id="' + id + 'UnfilledBottom" src="img/unfilled_arrow_down.png" class="sorterBottom"></img>');
    };
    for (var i = 0; i < sorterNames.length; i++) {
        fillInSorter(sorterNames[i]);
    }
    
    var sortEventsBy = function(which, up) {
        for (var i = 0; i < sorterNames.length; i++) {
            $('#' + sorterNames[i] + 'FilledTop').hide();
            $('#' + sorterNames[i] + 'FilledBottom').hide();
            $('#' + sorterNames[i] + 'UnfilledTop').show();
            $('#' + sorterNames[i] + 'UnfilledBottom').show();
        }
        var dir = up ? 'Top' : 'Bottom';
        $('#' + which + 'Unfilled' + dir).hide();
        $('#' + which + 'Filled' + dir).show();
        var ele = '';
        if (which === 'nameSorter') {
            ele = 'Event';
        } else if (which === 'dateSorter') {
            ele = 'Date';
        } else if (which === 'costSorter') {
            ele = 'Cost';
        } else if (which === 'budgetSorter') {
            ele = 'Total';
        }
        events.sort(function(a, b) {
            var res;
            if (ele === 'Date') {
                res = (new Date(b[ele])).getTime() - (new Date(a[ele])).getTime();
            } else if (ele === 'Event') {
                res = a[ele].localeCompare(b[ele]);
            } else {
                res =a[ele] - b[ele];
            }
            return res * (up ? 1 : -1);
        });
        $('#budgettablebody').html('');
        for (var i = 0; i < events.length; i++) {
            var e = events[i];
            if (e['Event'] !== 'Total') {
                $('#budgettablebody').append('<tr><td>' + e['Event'] + '</td><td>' + e['Date'] + '</td><td>$' + e['Cost'] + '</td><td>$' + e['Total'] + '</td></tr>');
            }
        }
    };
    $('.sorterTop').click(function(e) {
        sortEventsBy($(this).parent().attr('id'), true);
    });
    $('.sorterBottom').click(function(e) {
        sortEventsBy($(this).parent().attr('id'), false);
    });
    sortEventsBy('dateSorter', true);
});