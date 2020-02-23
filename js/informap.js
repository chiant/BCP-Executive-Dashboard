        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return null; //返回参数值
        };


        function drawStaffLoc(loc) {
            m1 = new AMap.Marker({
                map: map,
                draggable: false,
                animation: 'AMAP_ANIMATION_DROP',
                position: new AMap.LngLat(loc[0], loc[1])
            });

            map.add(m1);
        };

        function drawRiskLoc(loc, lab) {
            m2 = new AMap.Marker({
                map: map,
                draggable: false,
                icon: new AMap.Icon({
                    image: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
                    size: new AMap.Size(51, 71), //图标大小
                    imageSize: new AMap.Size(30.6, 42)
                }),

                animation: 'AMAP_ANIMATION_DROP',
                offset: new AMap.Pixel(-15.3, -38),
                position: new AMap.LngLat(loc[0], loc[1])
            });

            m2circle = new AMap.Circle({
                center: new AMap.LngLat(loc[0], loc[1]), // 圆心位置
                radius: 500, //半径
                strokeColor: "#F33", //线颜色
                strokeOpacity: 0.4, //线透明度
                strokeWeight: 3, //线粗细度
                fillColor: "#ee2200", //填充颜色
                fillOpacity: 0.1 //填充透明度
            });

            map.add(m2);

            m2.setLabel({
                offset: new AMap.Pixel(-35, 10), //设置文本标注偏移量
                content: '<div>' + lab + '</div>', //设置文本标注内容
                direction: 'right' //设置文本标注方位
            });
            map.add(m2circle);
        };


        function drawDistanceLine() {
            var p1 = m1.getPosition();
            var p2 = m2.getPosition();
            var textPos = p1.divideBy(2).add(p2.divideBy(2));
            var distance = Math.round(p1.distance(p2) / 10) / 100;
            var path = [p1, p2];


            line = new AMap.Polyline({
                map: map,
                strokeColor: '#80d8ff',
                isOutline: true,
                outlineColor: 'white',
                path: path
            });


            text = new AMap.Text({
                text: 'Distance between is ' + distance + 'km',
                position: textPos,
                map: map,
                style: {
                    'background-color': 'rgba(0, 123, 255, 0.6)',
                    'border-color': 'rgba(0, 123, 255, 0.9)',
                    'border-width': '1px',
                    'font-size': '20px',
                    'font-weight': 'bold',
                    'color': 'white'
                }
            });

            line.setPath(path);
            text.setText('Distance between is ' + distance + 'km');
            text.setPosition(textPos);
        };

        function plotStaff(loc1, loc2, lab2, distance, drawline) {
            drawStaffLoc(loc1);

            if (distance <= maxDistance2plot) {
                drawRiskLoc(loc2, lab2);
                if (drawline == true) {
                    drawDistanceLine();
                };

            };


        };


        function plotStaffList(staffListData) {


            for (var i = 0; i < staffListData.length; i += 1) {

                plotStaff(staffListData[i].currentLocation,
                    staffListData[i].closestRiskLocation,
                    staffListData[i].closestRiskAddress,
                    staffListData[i].dist2RiskAddr,
                    false
                );

                markers.push(m1);

                if (staffListData[i].dist2RiskAddr <= maxDistance2plot) {
                    markers.push(m2);
                    circles.push(m2circle);
                };
            }
        };

        function extractStaffDetail(staffid, staffname) {

            $('#basicInfo').bootstrapTable('removeAll');
            $('#riskAssess').bootstrapTable('removeAll');
            $('#history').bootstrapTable('removeAll');


            var detailAPIlink = null;
            //detailAPIlink = './json/staff_detail_tbl.json';
            detailAPIlink = '../json/' + staffid + '.json';

            //var detailAPIlink='http:servermainlink?id='+staffid;

            $.getJSON(detailAPIlink).done(function (data) {
                $('#detailInfo').show();
                $('#nameTitle').html(staffname);

                $('#basicInfo').bootstrapTable('load', data.basicInfo);
                $('#riskAssess').bootstrapTable('load', data.riskAssess);
                $('#history').bootstrapTable('load', data.history);

                if (data.riskAssess[4].value == 'Yes') {
                    $('#revokeMarker').show();
                } else {
                    $('#revokeMarker').hide();
                }

                if (data.caseselfreport != '' & data.caseselfreport != null) {
                    $('.self-report').html('Self-report: ' + data.caseselfreport);
                    $('.self-report').show();

                } else {
                    $('.self-report').html("");
                    $('.self-report').hide();
                }

                $('.case-title').html('case#: ' + data.caseid + ', ' + data.casetype + ', ' + staffname + ', ' + data.casedate);

            });
        }


        function loadMainPanel(loadURL) {

            $.getJSON(loadURL).done(function (data) {

                staffdata = data.staffdata;
                staffnum = staffdata.length;
                $('#staffselnum').html('staff selected: ' + staffnum);

                $('#staffListTbl').bootstrapTable('load', data.staffdata);

                if (staffnum <= maxPlotMarkers & pagetype != "myInvestigation") {
                    globalview = true;

                    plotStaffList(staffdata);

                    $('#detailInfo').hide();
                    $('#notPlot').hide();


                } else {
                    globalview = false;

                    var curloc = staffdata[0].currentLocation;
                    var riskloc = staffdata[0].closestRiskLocation;
                    var risklab = staffdata[0].closestRiskAddress;
                    var riskdistance = staffdata[0].dist2RiskAddr;

                    var staffid = staffdata[0].id;
                    var staffname = staffdata[0].name;

                    plotStaff(curloc, riskloc, risklab, riskdistance, true);

                    extractStaffDetail(staffid, staffname);

                    $('#showAll').hide();
                    if (pagetype != "myInvestigation") {
                        $('#notPlot').html("Plotting " + maxPlotMarkers + "++ locations on map is currently not supported due to performance constrain");
                    } else {
                        $('#notPlot').hide();
                    }
                }

                map.setFitView();
            });

        };



        $('#modalTable').on('shown.bs.modal', function () {
            $('#history').bootstrapTable('resetView')
        });


        $('#staffListTbl').on('click-row.bs.table', function (row, $element, field) {
            var curloc = $element.currentLocation;
            var riskloc = $element.closestRiskLocation;
            var staffid = $element.id;
            var staffname = $element.name;
            var curlab = $element.name + '<br>' + $element.id;
            var risklab = $element.closestRiskAddress;
            var dist2risk = $element.dist2RiskAddr;
            staffListOnClick(staffid, staffname, curloc, riskloc, risklab, dist2risk);
        });


        function staffListOnClick(staffid, staffname, curloc, riskloc, risklab, dist2risk) {
            globalview = false;
            map.clearMap();
            plotStaff(curloc, riskloc, risklab, dist2risk, true);
            map.setFitView();
            extractStaffDetail(staffid, staffname);

        }


        $('.result-sel').change(function () {
            var textsel = null;
            var valuesel = null;
            textsel = $(".result-sel option:selected").text();
            valuesel = $(this).val();
            if (valuesel % 2 == 0) {
                $(".notes").html("Notes:");
                $(".btn-green").show();
            } else {
                $(".btn-green").hide();
                $(".notes").html("*Notes:");
            };
            
            validateForm();
        });

        $('.note-field').bind('input propertychange', function() {
            
            validateForm();

        });



        function showAll() {

            if (globalview == false) {
                map.clearMap();
                map.add(markers);
                map.add(circles);
                map.setFitView();
                $('#detailInfo').hide();
            }

        };


        function validateForm() {
            vaildform = false;
            if (pagetype = 'myInvestigation') {
                if (pagesubtype = 'Non-Respondent') {
                    if ($("#nonRespResult").val() > 0) {
                        if ($("#nonRespResult").val() % 2 == 0) {
                            vaildform = true;
                        } else {
                            if ($('#nonRespNotes').val().length>10) {
                                vaildform = true;
                            }
                        }
                    }

                }
            };
//            console.log(vaildform);
            if (vaildform == true) {
                $(".btn-red").attr('disabled',false);
                $(".btn-green").attr('disabled',false);
            } else {
                $(".btn-red").attr('disabled',true);
                $(".btn-green").attr('disabled',true);                
            }

        };


        var uid = null;
        var urole = null;
        var uname = null;

        var pagetype = null;
        var pagesubtype = null;
        var pageselect = null;
        var pagefilter = null;

        var globalview = null;

        var m1 = null;
        var m2 = null;
        var m2circle = null;
        var line = null;
        var text = null;
        var map = null;

        var staffdata = null;

        var markers = [];
        var circles = [];

        globalview = true;

        uid = window.parent.userid;
        urole = window.parent.userrole;
        uname = window.parent.username;



        var map = new AMap.Map('GDMap', {
            //          mapStyle: 'amap://styles/light',
            resizeEnable: true,
            zoom: 13,
            lang: "zh_cn" //map language: en, zh_en, zh_cn

        });


        var staffnum = null;

        var maxPlotMarkers = 500;
        var maxDistance2plot = 10000;

        var masterLink = null; 

        var vaildform = null;



        $(function () {
            vaildform = false;

            pagetype = getUrlParam("viewtype");
            pagesubtype = getUrlParam("viewvalue");

            if (pagetype.substr(0, 4) == 'dash') {
                pageselect = getUrlParam("selitem");
                if (pagesubtype == 'Map') {
                    pagefilter = getUrlParam("selfilter");
                }
            }
            $('#infoPanelTitle').html("Investigation: " + pagesubtype);

            if (pagetype == "myInvestigation") {
                $('#GDMap').addClass("amap-half");
                $('#' + pagesubtype).show();
            } else {
                $('#GDMap').addClass("amap-full");
            };

            if (pagetype == "myRevoke") {
                $('#staffListTbl').bootstrapTable('hideColumn', 'caseid');
                $('#staffListTbl').bootstrapTable('hideColumn', 'risktype');
            } else {
                $('#staffListTbl').bootstrapTable('hideColumn', 'revokeReason');
            };


            // masterlink='http:servermainlink;
            masterLink = '../json/staff_info_list.json';

            masterLink = masterLink + '?pagetype=' + pagetype;

            if (pagesubtype != null) {
                masterLink = masterLink + '&pagesubtype=' + pagesubtype;
            }
            if (pageselect != null) {
                masterLink = masterLink + '&pageselect=' + pageselect;
            }
            if (pagefilter != null) {
                masterLink = masterLink + '&pagefilter=' + pagefilter;
            }

            $('.investigator').html('by ' + uname);

            loadMainPanel(masterLink);

        });
