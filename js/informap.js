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

        function extractStaffDetail(caseid, staffid, staffname) {

            $('#basicInfo').bootstrapTable('removeAll');
            $('#riskAssess').bootstrapTable('removeAll');
            $('#history').bootstrapTable('removeAll');

            if (submitpanel == true) {
                $('#' + pagesubtype).show();
                clearFormData();

            }
            var detailAPIlink = null;
            //detailAPIlink = './json/staff_detail_tbl.json';
            detailAPIlink = '../json/' + staffid + '.json';

            //            use case id and staff id for extract the data
            //var detailAPIlink='http:servermainlink?caseid='+caseid&staffid=&staffid;

            $.getJSON(detailAPIlink).done(function (data) {
                //                curcaseid = data.caseid;
                if (data.riskAssess[4].value == 'Yes') {
                    revoke_flag = 1;
                };

                $('#detailInfo').show();
                $('#nameTitle').html(staffname);

                $('#basicInfo').bootstrapTable('load', data.basicInfo);
                $('#riskAssess').bootstrapTable('load', data.riskAssess);
                $('#history').bootstrapTable('load', data.history);

                if (revoke_flag) {
                    $('#revokeMarker').show();
                } else {
                    $('#revokeMarker').hide();
                }

                if (data.caseselfreport != '' & data.caseselfreport != null) {
                    $('.self-report').html('Self-report: ' + data.caseselfreport);
                    $('.self-report').show();
                    $('#selfCaseReport').html('Self-report: ' + data.caseselfreport);
                    $('#selfCaseReport').show();
                } else {
                    $('.self-report').html("");
                    $('.self-report').hide();
                    $('.self-selfCaseReport').html("");
                    $('.self-selfCaseReport').hide();                }

                $('.case-title').html('case#: ' + data.caseid + ', ' + data.casetype + ', ' + staffname + ', ' + data.casedate);


                if (data.casestatus != "") {
                    $('.case-status').html('Case Status: ' + data.casestatus);

                }


                $('.investigator').html('by ' + uname);
                
                if (pagesubtype == "nonresp" && revoke_flag) {
                    $(".btn-green").hide();
                };


                if (pagetype == "myInvestigation" && pagesubtype == "viewcompletecase") {

                    $('#viewcompletecaseResult').val(data.caseconfirmedresult);
                    $('#viewcompletecaseNotes').val(data.casesubmitternotes);
                    $('.investigator').html('by ' + data.casesubmitter);

                    if (data.casedecision.toLowerCase() == 'no revoke') {
                        $('.btn-green').show();
                        $('.btn-red').hide();
                    };
                    if (data.casedecision.toLowerCase() == 'revoke') {
                        $('.btn-red').show();
                        $('.btn-green').hide();
                    };
                };

                if (pagetype == "myRevoke") {
                    $('.self-report').hide();

                    $('.investigator').html('by ' + data.casesubmitter);
                    if (pagesubtype == "revokeRequest") {
                        $('.case-title').html('Request to Revoke Access for ' + staffname);
                    };
                    if (pagesubtype == "reactivationRequest") {
                        $('.case-title').html('Request to Reactivate Access for ' + staffname);
                    };
                    if (pagesubtype == "requestInProgress" || pagesubtype == "viewHistRequest") {

                        $('.result-sel').val(data.caseconfirmedresult);
                        $('.note-field').val(data.casesubmitternotes);
                        
                        $('.reviewer-note-div').show();
                        $('.case-status').show();

                        if (data.reviewerdecision.toLowerCase() == 'approval') {
                            $('.btn-reviewer-green').show();
                            $('.btn-reviewer-red').hide();
                            $('.review-note-field').val(data.reviewernotes);
                            $('.reviewer').html('by ' + data.reviewername);
                            $('.case-status').html(', Waiting for PS team action');
                        };
                        if (data.reviewerdecision.toLowerCase() == 'rejection') {
                            $('.btn-reviewer-red').show();
                            $('.btn-reviewer-green').hide();
                            $('.review-note-field').val(data.reviewernotes);
                            $('.reviewer').html('by ' + data.reviewername);
                            $('.case-status').html(', Waiting for PS team action');
                        };
                        if (data.reviewerdecision.toLowerCase() == '') {
                            $('.btn-reviewer-red').hide();
                            $('.btn-reviewer-green').hide();
                            $('.reviewer-note-div').hide();
                            $('.reviewer').html('Waiting for CAO  Review');
                            $('.case-status').hide();

                        };

                        if (pagesubtype == "viewHistRequest") {
                            $('.case-status').html(', Request Completed');

                        };

                    };
                };


                if (pagetype == "myReview") {
                    $('.self-report').hide();

                    $('.result-sel').val(data.caseconfirmedresult);
                    $('.note-field').val(data.casesubmitternotes);
                    $('.investigator').html('by ' + data.casesubmitter);

                    if (pagesubtype == "reviewlist") {
                        $('.reviewer').html('by ' + uname);
                    };
                    if (pagesubtype == "reviewHist") {
                        $('.reviewer').html('by ' + data.reviewername);
                        $('.review-note-field').val(data.reviewernotes);

                        if (data.reviewerdecision.toLowerCase() == 'approval') {
                            $('.btn-reviewer-green').show();
                            $('.btn-reviewer-red').hide();
                        };
                        if (data.reviewerdecision.toLowerCase() == 'rejection') {
                            $('.btn-reviewer-red').show();
                            $('.btn-reviewer-green').hide();
                        };
                    };
                };
                if (pagetype == "myAction") {

                    $('.result-sel').val(data.caseconfirmedresult);
                    $('.note-field').val(data.casesubmitternotes);
                    $('.investigator').html('by ' + data.casesubmitter);
                    $('.case-status').hide();
                    
                    $('.btn-green').html('Request for '+ data.casedecision);
                    console.log(data.casedecision.toLowerCase());
                    
                     if (data.casedecision.toLowerCase() == 'reactivation'||
                        data.casedecision.toLowerCase() == 'no revoke'
                        ) {
                            $('.btn-reviewer-green').show();
                            $('.btn-reviewer-red').hide();
                    };
                     if (data.casedecision.toLowerCase() == 'revoke') {
                            $('.btn-reviewer-red').show();
                            $('.btn-reviewer-green').hide();
                    };                    
                    
                    if (pagesubtype == "actionlist") {
                        $('.reviewer').html('by ' + uname);
                    };
                     if (pagesubtype == "actionHist") {
                        $('.reviewer').html('by ' + data.pspersonname);
                    };                   
                    
                };

            });
        };


        function loadMainPanel(loadURL) {

            $.getJSON(loadURL).done(function (data) {

                staffdata = data.staffdata;
                staffnum = staffdata.length;

                $('#staffselnum').html('staff selected: ' + staffnum);

                $('#staffListTbl').bootstrapTable('load', data.staffdata);

                if (staffnum <= maxPlotMarkers &&
                    pagetype != "myInvestigation" &&
                    submitpanel == false) {
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

                    curcaseid = staffdata[0].caseid;

                    curstaffid = staffid;
                    
                    plotStaff(curloc, riskloc, risklab, riskdistance, true);

                    extractStaffDetail(curcaseid, staffid, staffname);

                    $('#showAll').hide();
                    if (submitpanel == false) {
                        $('#notPlot').html("Plotting " + maxPlotMarkers + "++ locations on map is currently not supported due to performance constrain");
                    } else {
                        $('#notPlot').hide();
                    }
                }

                map.setFitView();
            });

        };



        $('#historyModalTable').on('shown.bs.modal', function () {
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

            curcaseid = $element.caseid;
            
            curstaffid = staffid;


            globalview = false;
            map.clearMap();
            plotStaff(curloc, riskloc, risklab, dist2risk, true);
            map.setFitView();
            extractStaffDetail(curcaseid, staffid, staffname);
        });



        $('.result-sel').change(function () {
            var textsel = null;
            var valuesel = null;

            if (pagetype == 'myInvestigation') {
                textsel = $(".result-sel option:selected").text();
                valuesel = $(this).val();
                if (valuesel % 2 == 0) {
                    $(".notes").html("Notes:");
                    $(".btn-green").show();
                } else {
                    $(".btn-green").hide();
                    $(".notes").html("*Notes:");
                };
                if (pagesubtype == "nonresp" && revoke_flag) {
                    $(".btn-green").hide();
                };
            }

            validateForm();
        });

        $('.note-field').bind('input propertychange', function () {

            validateForm();

        });


        $('.btn-submit').click(function () {

            var btntype = null;
            submitdecision = null;

            submittype = $(this).html();

            submitdecision = submittype.substring(11, submittype.length);

            $('#submitbtn').show();
            $('#submitbtn').attr('disabled', false);


            if (submittype == 'Submit for No Revoke' ||
                submittype == 'Submit for Reactivation' ||
                submittype == 'Submit for Approval'||
                submittype == 'Submit for Access Reactivation Completion'
              
               ) {
                $('#submitPrompt').removeClass('modal-red');
                $('#submitPrompt').removeClass('modal-green');
                $('#submitPrompt').addClass('modal-green');

                $('#submitbtn').removeClass('btn-red');
                $('#submitbtn').removeClass('btn-green');
                $('#submitbtn').addClass('btn-green');

            }
            if (submittype == 'Submit for Revoke' ||
                submittype == 'Submit for Rejection' ||
                submittype == 'Submit for Access Revoke Completion'

               ) {
                $('#submitPrompt').removeClass('modal-red');
                $('#submitPrompt').removeClass('modal-green');
                $('#submitPrompt').addClass('modal-red');

                $('#submitbtn').removeClass('btn-red');
                $('#submitbtn').removeClass('btn-green');
                $('#submitbtn').addClass('btn-red');

            }
            $('#submitPrompt').html('Do you confirm to submit for ' + submitdecision.toUpperCase() + '?');
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
            if (pagetype == 'myInvestigation') {
                //            edit for multiple page, odds number: notes required
                //                if (pagesubtype = 'nonresp') 
                if ($("#" + pagesubtype + "Result").val() > 0) {
                    if ($("#" + pagesubtype + "Result").val() % 2 == 0) {
                        vaildform = true;
                    } else {
                        if ($("#" + pagesubtype + "Notes").val().length > 10) {
                            vaildform = true;
                        }
                    }

                }
            };

            if (pagetype == 'myRevoke') {
                if ($("#" + pagesubtype + "Result").val() > 0 &&
                    $("#" + pagesubtype + "Notes").val().length > 10) {
                    vaildform = true;
                }
            };

            //            console.log(vaildform);
            if (vaildform == true) {
                $(".btn-red").attr('disabled', false);
                $(".btn-green").attr('disabled', false);
            } else {
                $(".btn-red").attr('disabled', true);
                $(".btn-green").attr('disabled', true);
            }

        };


        $("#submitbtn").click(function () {
            $("#submitPrompt").html("submitting data to server now, please do not close window...");
            $("#submitbtn").attr('disabled', true);
            $("#cancelbtn").attr('disabled', true);
            console.log(compileJsonData());
            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:60036/nCoV%20monitoring/",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(compileJsonData()),
                dataType: "json",
                success: function (message) {
                    if (message > 0) {
                        submitDone();
                        $("#submitbtn").attr('disabled', false);
                        $("#cancelbtn").attr('disabled', false);
                    }
                },
                error: function (message) {
                    $("#submitPrompt").html("server is busy, please try again!");
                    $("#submitbtn").attr('disabled', false);
                    $("#cancelbtn").attr('disabled', false);
                    // this is for offline testing, remove submitDone() of next line when promote online
                    submitDone();
                }
            });
        });


        function compileJsonData() {

            var caseresult = null;
            var submitnote = null;
            var submitpage = null;
            var submitsubpage = null;
            
            submitpage = pagetype;
            submitsubpage = pagesubtype;
            
            //            edit for multiple page
            if (pagetype == "myInvestigation") {
                caseresult = $("#" + pagesubtype + "Result option:selected").text();
                submitnote = $("#" + pagesubtype + "Notes").val();
                submitpage = "myInvestigation";
            };
            
            if (pagetype == "myRevoke") {
                caseresult = $("#" + pagesubtype + "Result option:selected").text();
                submitnote = $("#" + pagesubtype + "Notes").val();
            };            

            if (pagetype == "myReview") {
                caseresult = $("#" + pagesubtype + "Result").val();
                submitnote = $("#" + pagesubtype + "ReviewNotes").val();
            };
            
            
            if (pagetype == "myAction") {
                caseresult = $("#" + pagesubtype + "Result").val();
                submitnote = null;
            };            

            var json = {
                "caseid": curcaseid,
                "staffid": curstaffid,
                "result": caseresult,
                "decision": submitdecision,
                "submitteruid": uid,
                "submitternotes": submitnote,
                "submitpage": submitpage,
                "submitsubpage": submitsubpage                
            };
            return json;
        }

        function submitDone() {
            $('#modalSubmit').modal('hide');
            $('#successSubmit').modal('show');
            //            console.log(curcaseid);
            $('#staffListTbl').bootstrapTable('removeByUniqueId', curcaseid);
            $('#detailInfo').hide();
            $('#' + pagesubtype).hide();

            map.clearMap();
            clearFormData();

            staffnum = staffnum - 1;
            $('#staffselnum').html('staff selected: ' + staffnum);


            var newtot = null;
            var navAllCaseNum = null;
            var navSubCaseNum = null;
            var navAllCaseVar = null;
                //            edit for multiple page

            if (pagetype == "myInvestigation") {
                navAllCaseVar = 'totcase';
                window.parent.frames['nav'].totcase = window.parent.frames['nav'].totcase - 1;
                newtot = window.parent.frames['nav'].totcase;

            };

            if (pagetype == "myReview") {
                navAllCaseVar = 'totreview';
                window.parent.frames['nav'].totreview = window.parent.frames['nav'].totreview - 1;
                newtot = window.parent.frames['nav'].totreview;
            };


            if (pagetype == "myAction") {
                navAllCaseVar = 'totaction';
                window.parent.frames['nav'].totaction = window.parent.frames['nav'].totaction - 1;
                newtot = window.parent.frames['nav'].totaction;
            };

                //            edit for multiple page
            
           if (pagetype == "myInvestigation" || pagetype == "myReview" || pagetype == "myAction") {

                navAllCaseNum = $(window.parent.frames['nav'].document.getElementById(navAllCaseVar));
                if (newtot > 0) {
                   $(navAllCaseNum).show();
                   $(navAllCaseNum).html(newtot);
                } else {
                    $(navAllCaseNum).html("");
                    $(navAllCaseNum).hide();

                };

                //            edit for multiple page

                navSubCaseNum = (window.parent.frames['nav'].document.getElementById(pagesubtype));

                if (staffnum > 0) {
                     $(navSubCaseNum).show();
                     $(navSubCaseNum).html(staffnum);
                } else {
                     $(navSubCaseNum).html("");
                     $(navSubCaseNum).hide();
                };
            };

        };

        function clearFormData() {
            $(".note-field").val("");
            $(".result-sel").val(null);

            $(".btn-red").attr('disabled', true);
            $(".btn-green").attr('disabled', true);

            $(".btn-red").show();
            $(".btn-green").show();
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


        var staffnum = null;

        var maxPlotMarkers = null;
        var maxDistance2plot = null;

        var masterLink = null;

        var vaildform = null;

        var submitdecision = null;

        var curcaseid = null;
        var curstaffid = null;

        var submitpanel = null;

        var revoke_flag = null;

        revoke_flag = 0;    

        globalview = true;
        submitpanel = false;

        uid = window.parent.userid;
        urole = window.parent.userrole;
        uname = window.parent.username;

        maxPlotMarkers = 500;
        maxDistance2plot = 10000;

        var map = new AMap.Map('GDMap', {
            //          mapStyle: 'amap://styles/light',
            resizeEnable: true,
            zoom: 13,
            lang: "zh_cn" //map language: en, zh_en, zh_cn

        });




        $(function () {
            vaildform = false;

            pagetype = getUrlParam("viewtype");
            pagesubtype = getUrlParam("viewvalue");

            if (pagetype == "searchStaff") {
                pageselect = getUrlParam("viewvalue");
                pagesubtype = null;
            };

            if (pagetype.substr(0, 4) == 'dash') {
                pageselect = getUrlParam("selitem");
                if (pagesubtype == 'Map') {
                    pagefilter = getUrlParam("selfilter");
                }
            }

            if (pagetype == 'myInvestigation') {
                var infotitle = null;
                if (pagesubtype == 'nonresp') {
                    infotitle = 'Non-Respondent';
                };
                if (pagesubtype == 'healthcase') {
                    infotitle = 'Health Issue';
                };
                if (pagesubtype == 'closecontact') {
                    infotitle = 'Close Contact';
                };
                if (pagesubtype == 'hadcontact') {
                    infotitle = 'Had Contact';
                };
                if (pagesubtype == 'curinhubei') {
                    infotitle = 'Current in Hubei/Wenzhou';
                };
                if (pagesubtype == 'beenhubei') {
                    infotitle = 'Been in Hubei/Wenzhou';
                };
                if (pagesubtype == 'backhubei') {
                    infotitle = 'Back from Hubei/Wenzhou';
                };
                if (pagesubtype == 'viewcompletecase') {
                    infotitle = 'View Submitted Cases';
                };

                $('#infoPanelTitle').html("Investigation: " + infotitle);
            };

            if (pagetype == 'myMonitor') {
                infotitle = pagesubtype;
                $('#infoPanelTitle').html("Monitoring: " + infotitle);

            };

            if (pagetype == 'searchStaff') {
                infotitle = pagesubtype;
                $('#infoPanelTitle').html("Search Staff: " + pageselect);

            };

            if (pagetype == 'myRevoke') {
                infotitle = pagesubtype;
                if (pagesubtype == 'viewRevoked') {
                    infotitle = 'View Staff of Access Revoked';
                };

                if (pagesubtype == 'revokeRequest') {
                    infotitle = "Revoke Staff's Access";
                };

                if (pagesubtype == 'reactivationRequest') {
                    infotitle = "Reactivate Staff's Access";
                };

                if (pagesubtype == 'requestInProgress') {
                    infotitle = "Request in Progress";
                };

                if (pagesubtype == 'viewHistRequest') {
                    infotitle = "View Completed Requests";
                };

                $('#infoPanelTitle').html(infotitle);

            };

            if (pagetype == 'myReview') {
                infotitle = pagesubtype;
                if (pagesubtype == 'reviewlist') {
                    infotitle = 'My Review To-Do-List';
                };

                if (pagesubtype == 'reviewHist') {
                    infotitle = "My Review History";
                };


                $('#infoPanelTitle').html(infotitle);

            };

            if (pagetype == 'myAction') {
                infotitle = pagesubtype;
                if (pagesubtype == 'actionlist') {
                    infotitle = 'Revoke & Reactivation To-Do-List';
                };

                if (pagesubtype == 'actionHist') {
                    infotitle = "Action History";
                };


                $('#infoPanelTitle').html(infotitle);

            };


            if (pagetype == "myInvestigation" ||
                (pagetype == "myRevoke" && pagesubtype == "revokeRequest") ||
                (pagetype == "myRevoke" && pagesubtype == "reactivationRequest")

            ) {
                $('#GDMap').addClass("amap-half");
                submitpanel = true;
                $('#' + pagesubtype).show();
            } else {
                if (
                    pagetype == "myReview" ||
                    pagetype == "myAction" ||
                    (pagetype == "myRevoke" && pagesubtype == "requestInProgress") ||
                    (pagetype == "myRevoke" && pagesubtype == "viewHistRequest")
                ) {
                    $('#GDMap').addClass("amap-small");
                    $(".input-area").css("height", "60%");
                    submitpanel = true;
                    $('#' + pagesubtype).show();
                } else {
                    $('#GDMap').addClass("amap-full");
                    submitpanel = false;
                };
            };





            if (pagetype == "myRevoke") {
                $('#staffListTbl').bootstrapTable('hideColumn', 'caseid');
                $('#staffListTbl').bootstrapTable('hideColumn', 'risktype');

            } else {
                $('#staffListTbl').bootstrapTable('hideColumn', 'revokeReason');
            };


            // masterlink='http:servermainlink;
            masterLink = '../json/staff_info_list.json';

            masterLink = masterLink + '?uid=' + uid + 'pagetype=' + pagetype;

            if (pagesubtype != null) {
                masterLink = masterLink + '&pagesubtype=' + pagesubtype;
            }
            if (pageselect != null) {
                masterLink = masterLink + '&pageselect=' + pageselect;
            }
            if (pagefilter != null) {
                masterLink = masterLink + '&pagefilter=' + pagefilter;
            }

            loadMainPanel(masterLink);

        });
