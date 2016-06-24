/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();
    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter)
        regexp = new RegExp(seriesFilter, 'i');

    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            var newRow = tBody.insertRow(-1);
            for(var col=0; col < item.data.length; col++){
                var cell = newRow.insertCell(-1);
                cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 95.12434709206913, "KoPercent": 4.875652907930877};
    var dataset = [
        {
            "label" : "Ошибки",
            "data" : data.KoPercent,
               "color" : "red"
        },
        {
            "label" : "Успешно",
            "data" : data.OkPercent,
            "color" : "green"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round(series.percent)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
	var translateDictAPDEX = {
	"Apdex":"APDEX",
	"T (Toleration threshold)  ":"Порог удовлетворительности",
	"F (Frustration threshold)":"Порог разочарования",
	"Label":"Операция"
    }
    
    var apdexSummary = {"supportsControllersDiscrimination": true, "overall": {"data": [0.7324832139995459, 1000, 3000, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)  ", "F (Frustration threshold)", "Label"], "items": [{"data": [0.7295127353266888, 1000, 3000, "06_HTTPR_05 /common/xdm/index.html"], "isController": false}, {"data": [0.998006009793738, 1000, 3000, "06_HTTPR_11 LEGAL_REG_INFO"], "isController": false}, {"data": [0.3565196627665632, 1000, 3000, "05_HTTPR_07 footer.php"], "isController": false}, {"data": [0.3781024191014766, 1000, 3000, "06_HTTPR_06 header.php"], "isController": false}, {"data": [0.7717119147261866, 1000, 3000, "02_HTTPR_09 get_mos_counter.php"], "isController": false}, {"data": [0.7599529030833763, 1000, 3000, "05_HTTPR_08 get_mos_counter.php"], "isController": false}, {"data": [0.7485098578633654, 1000, 3000, "05_HTTPR_04 all.php"], "isController": false}, {"data": [0.3676599307379077, 1000, 3000, "07_HTTPR_05 footer.php"], "isController": false}, {"data": [0.3826299019171547, 1000, 3000, "02_HTTPR_07 header.php"], "isController": false}, {"data": [0.9926517224507547, 1000, 3000, "04_HTTPR_05 Get CHILDREN"], "isController": false}, {"data": [0.6954399677538073, 1000, 3000, "01_HTTPR_01 main page"], "isController": false}, {"data": [0.9845996272168601, 1000, 3000, "06_HTTPR_02 profile/me"], "isController": false}, {"data": [0.7530326074859962, 1000, 3000, "06_HTTPR_08 get_mos_counter.php"], "isController": false}, {"data": [0.3936904634485711, 1000, 3000, "02_HTTPR_08 footer.php"], "isController": false}, {"data": [0.6928560029788818, 1000, 3000, "02_HTTPR_03 outerlogin.do"], "isController": false}, {"data": [0.9977076273490024, 1000, 3000, "04_HTTPR_08 Get Flats"], "isController": false}, {"data": [0.7744611167476549, 1000, 3000, "02_HTTPR_04 all.php"], "isController": false}, {"data": [0.9969962057335582, 1000, 3000, "01_HTTPR_03 getACPoints"], "isController": false}, {"data": [0.7358649185254083, 1000, 3000, "02_HTTPR_11 xdm/index.html"], "isController": false}, {"data": [0.08162678538304581, 1000, 3000, "06_TC My activity"], "isController": true}, {"data": [0.9958721236606358, 1000, 3000, "01_HTTPR_02 index.php"], "isController": false}, {"data": [0.8131121086214572, 1000, 3000, "06_HTTPR_09 stat.php"], "isController": false}, {"data": [0.82581493443462, 1000, 3000, "01_HTTPR_08 stat.php"], "isController": false}, {"data": [0.9896094589752776, 1000, 3000, "02_HTTPR_14 Get status"], "isController": false}, {"data": [0.7772249966769839, 1000, 3000, "07_HTTPR_03 all.php"], "isController": false}, {"data": [0.636391199711963, 1000, 3000, "07_HTTPR_01 application_app_id"], "isController": false}, {"data": [0.9956744633130407, 1000, 3000, "02_HTTPR_05 index.php"], "isController": false}, {"data": [0.8295233555767397, 1000, 3000, "07_HTTPR_07 stat.php"], "isController": false}, {"data": [0.7432290691140663, 1000, 3000, "08_HTTPR logout"], "isController": false}, {"data": [0.7768721879051323, 1000, 3000, "07_HTTPR_06 get_mos_counter.php"], "isController": false}, {"data": [0.4247128727220028, 1000, 3000, "04_HTTPR_02 Make PreBooking"], "isController": false}, {"data": [0.3494291579629763, 1000, 3000, "03_HTTPR_06 header.php"], "isController": false}, {"data": [0.9985663558855363, 1000, 3000, "07_HTTPR_02 /static/xdm/index.html"], "isController": false}, {"data": [0.9983508102955195, 1000, 3000, "07_HTTPR_08 LEGAL_REG_INFO"], "isController": false}, {"data": [0.9982153370621136, 1000, 3000, "05_HTTPR_10 Get status"], "isController": false}, {"data": [0.7432290691140663, 1000, 3000, "08_TC logout"], "isController": true}, {"data": [0.9908099102488311, 1000, 3000, "02_HTTPR_13 LEGAL_REG_INFO"], "isController": false}, {"data": [0.7787340215878067, 1000, 3000, "03_HTTPR_08 get_mos_counter.php"], "isController": false}, {"data": [0.10283969573427931, 1000, 3000, "01_TC Open main page"], "isController": true}, {"data": [0.9979567112091569, 1000, 3000, "03_HTTPR_13 Get status"], "isController": false}, {"data": [0.07879792189179506, 1000, 3000, "02_TC Open login page"], "isController": true}, {"data": [0.9883310523662032, 1000, 3000, "03_HTTPR_05 send elk_token"], "isController": false}, {"data": [0.9981124880838894, 1000, 3000, "07_HTTPR_09 Get status"], "isController": false}, {"data": [0.9900288429210978, 1000, 3000, "02_HTTPR_01 /ru/auth/"], "isController": false}, {"data": [0.9983726606997559, 1000, 3000, "03_HTTPR_11 Get channels"], "isController": false}, {"data": [0.05675964085958198, 1000, 3000, "05_TC Send form"], "isController": true}, {"data": [0.9953490088959434, 1000, 3000, "06_HTTPR_04 index.php"], "isController": false}, {"data": [0.3823999578400028, 1000, 3000, "01_HTTPR_05 header.php"], "isController": false}, {"data": [0.997145860138086, 1000, 3000, "04_HTTPR_06 Get Buildings"], "isController": false}, {"data": [0.9931975870002355, 1000, 3000, "04_HTTPR_03 FIO,PERSON,PASSPORT_RF,REG_DATA"], "isController": false}, {"data": [0.7680972717326087, 1000, 3000, "01_HTTPR_07 get_mos_counter.php"], "isController": false}, {"data": [0.9963938769502502, 1000, 3000, "05_HTTPR_09 LEGAL_REG_INFO"], "isController": false}, {"data": [0.9941506192930115, 1000, 3000, "03_HTTPR_12 PASSPORT_RF,PERSON"], "isController": false}, {"data": [0.3847208689690015, 1000, 3000, "03_HTTPR_07 footer.php"], "isController": false}, {"data": [0.37609408694706703, 1000, 3000, "04_TC: Filling form"], "isController": true}, {"data": [0.9978254172480655, 1000, 3000, "04_HTTPR_07 Get District"], "isController": false}, {"data": [0.3822447183098592, 1000, 3000, "01_HTTPR_06 footer.php"], "isController": false}, {"data": [0.7566440277572715, 1000, 3000, "06_HTTPR_03 all.php"], "isController": false}, {"data": [0.8049080204684261, 1000, 3000, "05_HTTPR_05 stat.php"], "isController": false}, {"data": [0.9987951590569871, 1000, 3000, "03_HTTPR_02 config.js.php"], "isController": false}, {"data": [0.9982370490914022, 1000, 3000, "03_HTTPR_10 LEGAL_REG_INFO"], "isController": false}, {"data": [0.8324835005876503, 1000, 3000, "03_HTTPR_09 stat.php"], "isController": false}, {"data": [0.6790476874203565, 1000, 3000, "03_HTTPR_01 Open application page"], "isController": false}, {"data": [0.9982471109792065, 1000, 3000, "06_HTTPR_12 Get status"], "isController": false}, {"data": [0.930554809122015, 1000, 3000, "02_HTTPR_12 send elk_token"], "isController": false}, {"data": [0.9950092489148551, 1000, 3000, "05_HTTPR_01 Make Booking"], "isController": false}, {"data": [0.09470924690181125, 1000, 3000, "07_TC See last activity"], "isController": true}, {"data": [0.39582608377135947, 1000, 3000, "05_HTTPR_02 Send Form"], "isController": false}, {"data": [0.8296875279471999, 1000, 3000, "02_HTTPR_10 stat.php"], "isController": false}, {"data": [0.33327830967315947, 1000, 3000, "05_HTTPR_06 header.php"], "isController": false}, {"data": [0.9960583914527378, 1000, 3000, "06_HTTPR_10 trustee"], "isController": false}, {"data": [0.7640089235525576, 1000, 3000, "01_HTTPR_04 all.php"], "isController": false}, {"data": [0.689082132724124, 1000, 3000, "06_HTTPR_01 My activity"], "isController": false}, {"data": [0.4298588844809159, 1000, 3000, "04_HTTPR_01 Get Hotels"], "isController": false}, {"data": [0.9956833635942895, 1000, 3000, "02_HTTPR_06 getACPoints"], "isController": false}, {"data": [0.9695748265429974, 1000, 3000, "04_HTTPR_04 Get Street"], "isController": false}, {"data": [0.7870578503479653, 1000, 3000, "03_HTTPR_03 all.php"], "isController": false}, {"data": [0.3806579410185682, 1000, 3000, "06_HTTPR_07 footer.php"], "isController": false}, {"data": [0.989547393804489, 1000, 3000, "06_HTTPR_15 /eventNameData/applications/"], "isController": false}, {"data": [0.08884689799830027, 1000, 3000, "03_TC Open application page"], "isController": true}, {"data": [0.9861713967723984, 1000, 3000, "06_HTTPR_14 /activity/APPLICATIONS"], "isController": false}, {"data": [0.7036735560588901, 1000, 3000, "02_HTTPR_02 openouterlogin.do"], "isController": false}, {"data": [0.9988995873452545, 1000, 3000, "05_HTTPR_03 config.js.php"], "isController": false}, {"data": [0.3549333485245528, 1000, 3000, "07_HTTPR_04 header.php"], "isController": false}, {"data": [0.7372320529420228, 1000, 3000, "03_HTTPR_04 xdm/index.html"], "isController": false}]};
        if (apdexSummary["titles"] != undefined){
            for (var i=0; i<apdexSummary["titles"].length; i++){
                apdexSummary["titles"][i] = translateDictAPDEX[apdexSummary["titles"][i]] || apdexSummary["titles"][i]
            }
        }
    createTable($("#apdexTable"), apdexSummary, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    var translateDictStatistics = {
    "Label":"Операция", 
    "#Samples":"Кол-во запросов", 
    "KO":"Неуспешные", 
    "Error %":"Процент ошибок", 
    "90th pct":"90 перцентиль", 
    "95th pct":"95 перцентиль", 
    "99th pct":"99 перцентиль", 
    "Throughput":"Интенсивность", 
    "KB/sec":"Килобайт в сек", 
    "Min":"Мин.", 
    "Max":"Макс."
    }
    
    var statisticsSummary = {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 4667580, 227575, 4.875652907930877, 37059.0, 76920.74999999991, 133695.7899999998, 449.93584367043417, 55373.70179873772, 0, 517749], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "90th pct", "95th pct", "99th pct", "Throughput", "KB/sec", "Min", "Max"], "items": [{"data": ["06_HTTPR_05 /common/xdm/index.html", 54180, 0, 0.0, 19455.9, 27858.84999999999, 54050.320000000065, 5.36102304705589, 18.223037665070628, 22, 95531], "isController": false}, {"data": ["06_HTTPR_11 LEGAL_REG_INFO", 53912, 0, 0.0, 70.0, 86.0, 394.0, 5.334632094730686, 1.9971956673319289, 6, 17832], "isController": false}, {"data": ["05_HTTPR_07 footer.php", 54443, 1192, 2.1894458424407177, 30008.0, 36005.39999999999, 63611.719999999914, 5.38003175466826, 149.0995263968956, 176, 162140], "isController": false}, {"data": ["06_HTTPR_06 header.php", 54111, 2990, 5.525678697492192, 26106.600000000006, 33893.19999999998, 64868.23999999994, 5.354090183138955, 90.68032736413444, 187, 124107], "isController": false}, {"data": ["02_HTTPR_09 get_mos_counter.php", 55914, 2937, 5.252709518188647, 4167.5, 5014.0, 10017.0, 5.484695791839345, 4.319662568569733, 78, 28056], "isController": false}, {"data": ["05_HTTPR_08 get_mos_counter.php", 54356, 2771, 5.097873279858709, 4092.300000000003, 5015.0, 10017.0, 5.371514077001518, 4.211852194090465, 77, 19234], "isController": false}, {"data": ["05_HTTPR_04 all.php", 54525, 3162, 5.7991746905089405, 4500.0, 5016.0, 10017.0, 5.387964576689783, 11.261161425080068, 76, 22207], "isController": false}, {"data": ["07_HTTPR_05 footer.php", 52554, 1295, 2.464132130760741, 30004.0, 35808.5, 64576.699999999866, 5.205173717250138, 127.62937350344075, 178, 124690], "isController": false}, {"data": ["02_HTTPR_07 header.php", 56177, 2723, 4.847179450664862, 26427.40000000001, 33706.2, 62447.4800000001, 5.51027228260555, 181.35182609764541, 209, 124932], "isController": false}, {"data": ["04_HTTPR_05 Get CHILDREN", 55183, 2, 0.003624304586557454, 107.0, 309.0, 1109.1599999999962, 5.418753169277831, 2.578614530372925, 6, 37435], "isController": false}, {"data": ["01_HTTPR_01 main page", 57061, 2, 0.0035050209425001315, 25788.600000000006, 34147.79999999993, 68466.21999999994, 5.500480488336939, 2849.3841787576694, 111, 485842], "isController": false}, {"data": ["06_HTTPR_02 profile/me", 54187, 0, 0.0, 319.0, 509.0, 2137.360000000008, 5.361694464453926, 4.865711891791473, 5, 28213], "isController": false}, {"data": ["06_HTTPR_08 get_mos_counter.php", 53914, 3093, 5.7369143450680715, 4483.0, 5016.0, 10017.0, 5.334793572362377, 4.251159376215849, 76, 17889], "isController": false}, {"data": ["02_HTTPR_08 footer.php", 56058, 2809, 5.010881586927825, 25939.299999999996, 33263.14999999999, 62810.61999999969, 5.4986289720208275, 769.6508879236122, 201, 125882], "isController": false}, {"data": ["02_HTTPR_03 outerlogin.do", 56397, 10, 0.01773143961558239, 46966.80000000002, 60329.2, 118682.2199999998, 5.5316046999170405, 281.8219225628981, 31, 209631], "isController": false}, {"data": ["04_HTTPR_08 Get Flats", 55183, 8, 0.014497218346229817, 88.0, 240.0, 645.0, 5.418743591490973, 3.0113081316271173, 0, 18900], "isController": false}, {"data": ["02_HTTPR_04 all.php", 56181, 2597, 4.622559228208825, 3124.800000000003, 5019.0, 10019.0, 5.5106624712615435, 14.265904463219975, 78, 20163], "isController": false}, {"data": ["01_HTTPR_03 getACPoints", 56928, 2, 0.0035132096683530073, 75.0, 245.0, 666.0, 5.584531021722558, 2.5442939091329664, 34, 18125], "isController": false}, {"data": ["02_HTTPR_11 xdm/index.html", 55907, 1, 0.0017886847800812062, 19158.800000000017, 27581.999999999993, 53476.439999999944, 5.484085538276037, 14.831795260074962, 25, 95721], "isController": false}, {"data": ["06_TC My activity", 53910, 9260, 17.176776108328696, 101733.70000000004, 126956.9, 249211.3299999999, 5.33032016823681, 1517.35079947217, 1173, 517749], "isController": true}, {"data": ["01_HTTPR_02 index.php", 56930, 0, 0.0, 135.0, 288.0, 823.7600000000093, 5.584671885566904, 45.004562579844965, 35, 89783], "isController": false}, {"data": ["06_HTTPR_09 stat.php", 53912, 1926, 3.572488499777415, 2472.0, 5015.0, 10017.0, 5.334643179934965, 3.0103485585272063, 6, 14139], "isController": false}, {"data": ["01_HTTPR_08 stat.php", 56661, 1916, 3.38151462205044, 2330.800000000003, 5013.0, 10017.0, 5.558688898544534, 3.127440517419109, 6, 28066], "isController": false}, {"data": ["02_HTTPR_14 Get status", 55820, 2, 0.0035829451809387316, 165.0, 350.0, 1577.7900000000009, 5.475946790905848, 2.473980699641964, 5, 24808], "isController": false}, {"data": ["07_HTTPR_03 all.php", 52663, 2398, 4.5534815715018135, 3034.5999999999985, 5014.0, 10016.0, 5.216145199067407, 10.830034523731465, 77, 20847], "isController": false}, {"data": ["07_HTTPR_01 application_app_id", 52771, 1293, 2.450209395311819, 26728.800000000003, 34317.59999999995, 63717.03999999998, 5.226695836035607, 121.00739875251524, 105, 265471], "isController": false}, {"data": ["02_HTTPR_05 index.php", 56178, 4, 0.0071202249991099715, 198.0, 318.0, 818.2099999999991, 5.510444960240106, 44.404803808442296, 35, 107886], "isController": false}, {"data": ["07_HTTPR_07 stat.php", 52450, 1841, 3.510009532888465, 2318.0, 5013.0, 10017.0, 5.195020783054545, 2.937007506829793, 6, 15022], "isController": false}, {"data": ["08_HTTPR logout", 53390, 3, 0.005619029780857839, 15361.600000000006, 23515.699999999983, 44868.06999999992, 5.298477771848678, 10.318838027400247, 6, 91970], "isController": false}, {"data": ["07_HTTPR_06 get_mos_counter.php", 52452, 2595, 4.9473804621368105, 3217.100000000013, 5014.0, 10017.0, 5.195165362394776, 4.058939796135915, 2, 14583], "isController": false}, {"data": ["04_HTTPR_02 Make PreBooking", 55202, 31642, 57.32038694250208, 112.0, 254.0, 677.0, 5.4203495723872255, 3.2856670650712467, 30, 10020], "isController": false}, {"data": ["03_HTTPR_06 header.php", 55532, 2939, 5.292443996254412, 30036.0, 36382.44999999999, 64745.11999999994, 5.451154389822522, 2282.1971504950757, 211, 126728], "isController": false}, {"data": ["07_HTTPR_02 /static/xdm/index.html", 52663, 0, 0.0, 20.0, 38.0, 295.0, 5.216205130785475, 1.3553510951561984, 4, 17828], "isController": false}, {"data": ["07_HTTPR_08 LEGAL_REG_INFO", 52450, 1, 0.0019065776930409914, 75.0, 108.0, 428.0, 5.195000715612586, 1.9469383519875456, 9, 19824], "isController": false}, {"data": ["05_HTTPR_10 Get status", 54352, 2, 0.0036797173977038563, 62.0, 77.34999999999854, 375.47000000000116, 5.371172933051559, 2.4106981361492825, 5, 18190], "isController": false}, {"data": ["08_TC logout", 53390, 3, 0.005619029780857839, 15361.600000000006, 23515.699999999983, 44868.06999999992, 5.29847724602242, 10.318837003348392, 6, 91970], "isController": true}, {"data": ["02_HTTPR_13 LEGAL_REG_INFO", 55821, 3, 0.0053743214919116464, 124.0, 251.0, 1364.7799999999988, 5.476044353791254, 2.0909899995740004, 5, 28946], "isController": false}, {"data": ["03_HTTPR_08 get_mos_counter.php", 55309, 2702, 4.88528087653004, 3270.0, 5014.0, 10017.0, 5.429847284133897, 4.242424738750755, 54, 20881], "isController": false}, {"data": ["01_TC Open main page", 56661, 8292, 14.634404616932281, 79613.20000000001, 98515.39999999997, 193900.93999999997, 5.556557470373313, 19102.463195455195, 962, 484399], "isController": true}, {"data": ["03_HTTPR_13 Get status", 55303, 1, 0.0018082201688877637, 64.0, 85.0, 398.0, 5.429304085403327, 2.436606185334164, 6, 19864], "isController": false}, {"data": ["02_TC Open login page", 55820, 9038, 16.191329272662127, 145585.80000000002, 179767.59999999998, 356878.95, 5.47437595840808, 2024.952847066407, 1438, 487435], "isController": true}, {"data": ["03_HTTPR_05 send elk_token", 55532, 21, 0.03781603399841533, 87.0, 299.0, 1635.0199999999895, 5.451325091556484, 2.657430639221171, 6, 25561], "isController": false}, {"data": ["07_HTTPR_09 Get status", 52450, 0, 0.0, 62.0, 78.0, 378.0, 5.195025928577456, 2.3295915308411703, 6, 17850], "isController": false}, {"data": ["02_HTTPR_01 /ru/auth/", 56513, 3, 0.0053085130854847555, 301.59999999999854, 465.0, 1506.8600000000006, 5.543088382897905, 31.96938236365374, 51, 52524], "isController": false}, {"data": ["03_HTTPR_11 Get channels", 55305, 0, 0.0, 63.0, 78.0, 361.0, 5.429510027584915, 6.877130865475974, 6, 18317], "isController": false}, {"data": ["05_TC Send form", 54352, 10532, 19.377391816308506, 84954.90000000002, 104487.09999999999, 195970.45000000004, 5.370184783877036, 436.16058850934394, 1536, 288083], "isController": true}, {"data": ["06_HTTPR_04 index.php", 54182, 4, 0.007382525561994758, 204.70000000000437, 324.0, 851.5099999999948, 5.361212456076885, 42.95188821836902, 36, 89016], "isController": false}, {"data": ["01_HTTPR_05 header.php", 56926, 2222, 3.9033130731124617, 26548.0, 34269.649999999994, 63048.48999999995, 5.556702505182016, 1219.422712551576, 220, 409941], "isController": false}, {"data": ["04_HTTPR_06 Get Buildings", 55183, 3, 0.0054364568798361814, 105.0, 249.0, 671.0, 5.418752637177672, 4.802027357493228, 1, 17838], "isController": false}, {"data": ["04_HTTPR_03 FIO,PERSON,PASSPORT_RF,REG_DATA", 55201, 21, 0.03804278907990797, 97.0, 166.0, 1025.0, 5.420251381206247, 3.1636693171964474, 5, 19368], "isController": false}, {"data": ["01_HTTPR_07 get_mos_counter.php", 56666, 2932, 5.174178519747291, 4194.0, 5014.0, 10017.0, 5.559107976347745, 4.371001269471986, 81, 14297], "isController": false}, {"data": ["05_HTTPR_09 LEGAL_REG_INFO", 54352, 1, 0.0018398586988519281, 77.0, 131.0, 505.9400000000023, 5.371178240956914, 2.0153376554718534, 5, 25177], "isController": false}, {"data": ["03_HTTPR_12 PASSPORT_RF,PERSON", 55305, 1, 0.001808154778049001, 82.0, 131.0, 988.9400000000023, 5.429499366877472, 2.2493664065446746, 6, 25657], "isController": false}, {"data": ["03_HTTPR_07 footer.php", 55422, 1282, 2.3131608386561293, 29830.700000000004, 34979.94999999999, 65613.87999999986, 5.440809962272064, 508.07150716464855, 189, 128100], "isController": false}, {"data": ["04_TC: Filling form", 55183, 31653, 57.36005653915155, 1363.0, 2344.399999999987, 6824.879999999932, 5.418298793801834, 468.4961834154294, 200, 394056], "isController": true}, {"data": ["04_HTTPR_07 Get District", 55183, 8, 0.014497218346229817, 90.0, 241.0, 647.0, 5.418756893981864, 4.101259261920102, 0, 18062], "isController": false}, {"data": ["01_HTTPR_06 footer.php", 56800, 2624, 4.619718309859155, 26326.700000000004, 33964.0, 62678.94999999999, 5.571936197799027, 14980.633430358475, 238, 154119], "isController": false}, {"data": ["06_HTTPR_03 all.php", 54184, 2787, 5.143584822087701, 4258.0, 5015.0, 10017.0, 5.361379583576827, 11.137799925484998, 76, 19430], "isController": false}, {"data": ["05_HTTPR_05 stat.php", 54523, 1991, 3.6516699374575867, 2573.5999999999985, 5016.0, 10017.0, 5.387785577932718, 3.0653253568927448, 6, 28318], "isController": false}, {"data": ["03_HTTPR_02 config.js.php", 55609, 6, 0.010789620385189448, 13.0, 35.0, 337.90000000000146, 5.458868828611309, 3.4713604114052163, 4, 19076], "isController": false}, {"data": ["03_HTTPR_10 LEGAL_REG_INFO", 55305, 1, 0.001808154778049001, 77.0, 115.0, 433.9400000000023, 5.429504164190641, 2.0368117742376235, 5, 21574], "isController": false}, {"data": ["03_HTTPR_09 stat.php", 55305, 1921, 3.473465328632131, 2304.0, 5013.0, 10017.0, 5.429503098120315, 3.0645706584284924, 6, 21823], "isController": false}, {"data": ["03_HTTPR_01 Open application page", 55717, 9, 0.016153059209935927, 24915.40000000001, 32936.399999999994, 64914.239999999976, 5.469072848007146, 1394.3213891137493, 55, 418874], "isController": false}, {"data": ["06_HTTPR_12 Get status", 53911, 0, 0.0, 61.0, 76.0, 353.0, 5.334543173276918, 2.393979768679955, 5, 17826], "isController": false}, {"data": ["02_HTTPR_12 send elk_token", 55821, 3313, 5.935042367567761, 88.0, 297.0, 1575.0, 5.476052411808638, 2.6842114330570963, 6, 26025], "isController": false}, {"data": ["05_HTTPR_01 Make Booking", 54601, 0, 0.0, 249.0, 351.0, 879.9799999999959, 5.395556198530697, 3.453901795165512, 32, 19588], "isController": false}, {"data": ["07_TC See last activity", 52450, 8520, 16.244041944709245, 82287.5, 101459.24999999999, 194694.25999999983, 5.194342692327346, 368.1055662793238, 913, 301287], "isController": true}, {"data": ["05_HTTPR_02 Send Form", 54601, 1821, 3.3351037526785223, 30020.0, 36338.29999999996, 66709.73999999995, 5.395088642350808, 96.20592451632953, 41, 131054], "isController": false}, {"data": ["02_HTTPR_10 stat.php", 55909, 1914, 3.4234202006832533, 2311.0, 5014.0, 10017.0, 5.484294635585106, 3.090717889848017, 6, 18073], "isController": false}, {"data": ["05_HTTPR_06 header.php", 54522, 2390, 4.383551593852023, 30063.0, 37202.549999999996, 65853.97999999976, 5.377646460529799, 161.70492982010228, 4, 136510], "isController": false}, {"data": ["06_HTTPR_10 trustee", 53912, 2, 0.0037097492209526638, 150.0, 276.0, 689.0, 5.334624704620093, 2.173451071229292, 4, 22470], "isController": false}, {"data": ["01_HTTPR_04 all.php", 56928, 2858, 5.020376616076447, 3938.199999999997, 5014.0, 10017.0, 5.584563891843023, 12.319253741981779, 77, 18576], "isController": false}, {"data": ["06_HTTPR_01 My activity", 54278, 4, 0.0073694682928626696, 27396.0, 35664.749999999935, 68066.03999999998, 5.367214347721485, 1194.6000833344685, 5, 468704], "isController": false}, {"data": ["04_HTTPR_01 Get Hotels", 55203, 31280, 56.66358712388819, 172.0, 300.79999999999563, 877.0, 5.4204248773376404, 3.7694524269787184, 16, 24536], "isController": false}, {"data": ["02_HTTPR_06 getACPoints", 56178, 3, 0.005340168749332479, 133.0, 265.0, 817.0, 5.510463337782339, 2.2337891790002575, 7, 30010], "isController": false}, {"data": ["04_HTTPR_04 Get Street", 55201, 1, 0.0018115613847575224, 256.0, 672.8999999999942, 4328.979999999996, 5.420353569542564, 443.95788972329643, 30, 405043], "isController": false}, {"data": ["03_HTTPR_03 all.php", 55609, 2476, 4.452516678954845, 2936.0, 5013.0, 10015.900000000001, 5.4588264951328105, 11.336396044517771, 79, 56821], "isController": false}, {"data": ["06_HTTPR_07 footer.php", 54017, 3165, 5.859266527204398, 26175.0, 33867.59999999999, 63879.11999999998, 5.3448315270354945, 129.87369853418488, 207, 127705], "isController": false}, {"data": ["06_HTTPR_15 /eventNameData/applications/", 53910, 3, 0.005564830272676683, 97.0, 295.4499999999971, 1558.6699999999983, 5.334437360337137, 3.565943334602707, 5, 25068], "isController": false}, {"data": ["03_TC Open application page", 55303, 8839, 15.982858072798944, 99099.6, 123144.59999999989, 245794.31999999992, 5.428255846812525, 4207.112554587268, 1116, 482325], "isController": true}, {"data": ["06_HTTPR_14 /activity/APPLICATIONS", 53910, 2, 0.003709886848451122, 172.0, 383.4499999999971, 1954.7799999999988, 5.334429970491924, 17.002595021976692, 7, 36676], "isController": false}, {"data": ["02_HTTPR_02 openouterlogin.do", 56512, 5, 0.008847678369195923, 25139.700000000004, 32982.14999999999, 62149.57000000003, 5.491907764481977, 677.5454646766016, 48, 257235], "isController": false}, {"data": ["05_HTTPR_03 config.js.php", 54525, 0, 0.0, 12.0, 34.0, 337.0, 5.388016221856818, 3.4256977338957357, 4, 17790], "isController": false}, {"data": ["07_HTTPR_04 header.php", 52662, 1502, 2.8521514564581674, 30017.700000000004, 37186.499999999985, 66913.8000000001, 5.209229779440131, 97.41194235395274, 3, 139550], "isController": false}, {"data": ["03_HTTPR_04 xdm/index.html", 55608, 0, 0.0, 18812.0, 26642.549999999996, 51667.20999999988, 5.4587636972188465, 5.721317512235295, 24, 101790], "isController": false}]};
        if (statisticsSummary["titles"] != undefined){
            for (var i=0; i<statisticsSummary["titles"].length; i++){
                statisticsSummary["titles"][i] = translateDictStatistics[statisticsSummary["titles"][i]] || statisticsSummary["titles"][i]
            }
        }
    createTable($("#statisticsTable"), statisticsSummary, function(index, item){
        switch(index){
            case 3:
                item = item.toFixed(2) + '%';
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0);

    // Create error table
    var translateDictError = {
	"Type of error":"Тип ошибки",
	"Number of errors":"Кол-во ошибок",
	"% in errors":"% от ошибок",
	"% in all samples":"% от всех запросов"
    }
    
    var errorsSummary = {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.lang.IllegalArgumentException", 16, 0.011312377154654336, 3.7820490243377217E-4], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException", 4371, 3.0904000339371316, 0.10332085178362614], "isController": false}, {"data": ["Test failed: text expected to contain \/\"id\":\/", 31277, 22.11357626663273, 0.7393196708388183], "isController": false}, {"data": ["Test failed: text expected to contain \/FIO\/", 21, 0.014847495015483816, 4.96393934444326E-4], "isController": false}, {"data": ["Non HTTP response code: java.net.ConnectException", 14, 0.009898330010322543, 3.3092928962955064E-4], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketTimeoutException", 647, 0.4574442511913347, 0.015293660742165663], "isController": false}, {"data": ["Test failed: text expected to contain \/\u00D0\u00A0\u00D0\u00B5\u00D0\u00B3\u00D0\u00B8\u00D1\u0081\u00D1\u0082\u00D1\u0080\u00D0\u00B0\u00D1\u0086\u00D0\u00B8\u00D0\u00BE\u00D0\u00BD\u00D0\u00BD\u00D1\u008B\u00D0\u00B9 \u00D0\u00BD\u00D0\u00BE\u00D0\u00BC\u00D0\u00B5\u00D1\u0080\/", 924, 0.653289780681288, 0.021841333115550345], "isController": false}, {"data": ["Test failed: text expected to contain \/bookingGuid\/", 31642, 22.37163987047328, 0.7479474701755887], "isController": false}, {"data": ["Test failed: text expected to contain \/token\/", 3333, 2.3565095660289312, 0.07878480873823517], "isController": false}, {"data": ["500", 61246, 43.302365700872464, 1.4477210909036757], "isController": false}, {"data": ["Test failed: text expected to contain \/<title>\u00D0\u009F\u00D0\u00BE\u00D1\u0080\u00D1\u0082\u00D0\u00B0\u00D0\u00BB \u00D0\u00B3\u00D0\u00BE\u00D1\u0081\u00D1\u0083\u00D0\u00B4\u00D0\u00B0\u00D1\u0080\u00D1\u0081\u00D1\u0082\u00D0\u00B2\u00D0\u00B5\u00D0\u00BD\u00D0\u00BD\u00D1\u008B\u00D1\u0085 \u00D0\u00BE\u00D0\u00BD\u00D0\u00BB\u00D0\u00B0\u00D0\u00B9\u00D0\u00BD \u00D1\u0083\u00D1\u0081\u00D0\u00BB\u00D1\u0083\u00D0\u00B3 \u00D0\u00B3\u00D0\u00BE\u00D1\u0080\u00D0\u00BE\u00D0\u00B4\u00D0\u00B0 \u00D0\u009C\u00D0\u00BE\u00D1\u0081\u00D0\u00BA\u00D0\u00B2\u00D1\u008B<\/title>\/", 4, 0.002828094288663584, 9.455122560844304E-5], "isController": false}, {"data": ["504", 7932, 5.608110974419887, 0.18749508038154256], "isController": false}, {"data": ["Test failed: text expected to contain \/\u00D0\u009D\u00D0\u00BE\u00D0\u00BC\u00D0\u00B5\u00D1\u0080 \u00D0\u00B7\u00D0\u00B0\u00D1\u008F\u00D0\u00B2\u00D0\u00BB\u00D0\u00B5\u00D0\u00BD\u00D0\u00B8\u00D1\u008F\/", 24, 0.016968565731981505, 5.673073536506583E-4], "isController": false}]};
        if (errorsSummary["titles"] != undefined){
            for (var i=0; i<errorsSummary["titles"].length; i++){
                errorsSummary["titles"][i] = translateDictError[errorsSummary["titles"][i]] || errorsSummary["titles"][i]
            }
        }
    createTable($("#errorsTable"), errorsSummary, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);
});
