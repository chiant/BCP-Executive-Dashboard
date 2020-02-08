        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };


        function graphOptInit() {

            mainMapOpt = {
                backgroundColor: '#fff',
                title: {
                    text: 'Staff Current Location',
                    left: 'center',
                    textStyle: {
                        color: '#000',
                        fontFamily: 'Arial Narrow',
                        fontSize: 16
                    }

                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        return params.name + ' : ' + params.value[2];
                    }
                },
                legend: {
                    show: false
                },
                visualMap: {
                    show: false,
                    min: 0,
                    max: 200,
                    left: 20,
                    bottom: 20,
                    calculable: true,
                    text: ['High', 'Low'],
                    inRange: {
                        color: ['#990033']
                    },
                    textStyle: {
                        color: '#000'
                    }
                },
                geo: {
                    map: 'china',
                    roam: true,
                    zoom: 1.3,
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {

                        normal: {
                            borderColor: 'rgba(9, 54, 95, 1)',
                            borderWidth: 1,
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(0,123,255, 0)' // 0% 处的颜色
                        }, {
                                    offset: 1,
                                    color: 'rgba(0,123,255, .2)' // 100% 处的颜色
                        }],
                                globalCoord: false // 缺省为 false
                            },
                            shadowColor: 'rgba(0,123,255, 1)',
                            // shadowColor: 'rgba(255, 255, 255, 1)',
                            shadowOffsetX: -2,
                            shadowOffsetY: 2,
                            shadowBlur: 10
                        },
                        emphasis: {
                            areaColor: 'rgb(0,123,255)'
                        }
                    }
                },
                series: [{
                        name: 'Risk',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData([]),
                        symbolSize: function (val) {
                            return Math.log(val[2] +10)*3;
                        },
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        }
                        },

                    {
                        type: 'map',
                        map: 'china',
                        geoIndex: 0,
                        aspectScale: 1, //长宽比
                        tooltip: {
                            show: false
                        }
            }
        ]
            };


            surveyStatOpt = {
                title: {
                    text: 'Survey Participation',

                    left: 'center',
                    textStyle: {
                        fontFamily: 'Arial Narrow',
                        fontSize: 16
                    }

                },

                grid: {
                    left: '3%',
                    right: '10%',
                    top: '22%',
                    bottom: '0%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    show: false
                },
                yAxis: {
                    type: 'category',
                    axisLabel: {
                        fontSize: 10
                    },
                    data: []
                },
                series: [
                    {
                        name: 'Survey Status',
                        type: 'bar',
                        label: {
                            show: true,
                            position: "right",
                            color: "rgba(0,123,255, 1)",
                            fontWeight:"bold"
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgba(0,123,255, .6)'
                            }
                        },
                        data: []
                }
            ]
            };


            workStatusOpt = {
                title: {
                    text: 'Staff Work Status',
                    left: 'center',
                    textStyle: {
                        fontFamily: 'Arial Narrow',
                        fontSize: 16
                    }
                },

                grid: {
                    left: '3%',
                    right: '10%',
                    top: '18%',
                    bottom: '0%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    show: false
                },
                yAxis: {
                    type: 'category',
                    axisLabel: {
                        fontSize: 10
                    },
                    data: []
                },
                series: [
                    {
                        name: 'Survey Status',
                        type: 'bar',
                        label: {
                            show: true,
                            position: "right",
                            color: "rgba(0,123,255, 1)",
                            fontWeight:"bold"
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgba(0,123,255, .6)'
                            }
                        },
                        data: []
                }
            ]
            };


            riskFactorOpt = {
                title: {
                    text: 'Staff Under Risk',
                    left: 'center',
                    textStyle: {
                        fontFamily: 'Arial Narrow',
                        fontSize: 16
                    }
                },

                grid: {
                    left: '3%',
                    right: '10%',
                    top: '14%',
                    bottom: '2%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    show: false
                },
                yAxis: {
                    type: 'category',
                    axisLabel: {
                        fontSize: 10
                    },
                    data: []
                },
                series: [
                    {
                        name: 'Survey Status',
                        type: 'bar',
                        label: {
                            show: true,
                            position: "right",
                            color: "rgba(0,123,255, 1)",
                            fontWeight:"bold"
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgba(0,123,255, .6)'
                            }
                        },
                        data: []
                }
            ]
            };
        };

        function loadMainPanel(loadURL) {

            $.getJSON(loadURL).done(function (data) {

                surveyStatOptUpdate = {
                    yAxis: {
                        data: data.surveyStatData.category
                    },
                    series: [
                        {
                            data: data.surveyStatData.data
                        }
                    ]
                };

                workStatusOptUpdate = {
                    yAxis: {
                        data: data.workStatusData.category
                    },
                    series: [
                        {
                            data: data.workStatusData.data
                        }
                    ]
                };

                riskFactorOptUpdate = {
                    yAxis: {
                        data: data.riskFactorData.category
                    },
                    series: [
                        {
                            data: data.riskFactorData.data
                        }
                    ]
                };
                
                mainMapOptUpdate = {
                    series: [{
                        data: convertData(data.mainMap),
                    }]
                };

                if (surveyStatOptUpdate && typeof surveyStatOptUpdate === "object") {
                    surveyStatObj.setOption(surveyStatOptUpdate);
                };
                if (workStatusOptUpdate && typeof workStatusOptUpdate === "object") {
                    workStatusObj.setOption(workStatusOptUpdate);
                };
                if (riskFactorOptUpdate && typeof riskFactorOptUpdate === "object") {
                    riskFactorObj.setOption(riskFactorOptUpdate);
                };

                if (mainMapOptUpdate && typeof mainMapOptUpdate === "object") {
                    mainMapObj.setOption(mainMapOptUpdate);
                };
                
                $('#notJoin').bootstrapTable('load', data.notJoin);
                $('#revokeConfirm').bootstrapTable('load', data.revokeConfirm);
                $('#newQuara').bootstrapTable('load', data.newQuara);
                $('#newRiskTbl').bootstrapTable('load', data.newRiskTbl);

                $('#confirmedInfection').html(data.confirmedInfection);
                $('#staffUnderRisk').html(data.staffUnderRisk);
                $('#accessRevoked').html(data.accessRevoked);
                $('#underQuarantine').html(data.underQuarantine);

                $('#reportDate').html("Data as" + " " + data.reportDate);

            });

        };


        function loadMainMap(loadURL) {
            $.getJSON(loadURL).done(function (data) {
                
                mainMapOptUpdate = {
                    series: [{
                        data: convertData(data.mainMap),
                    }]
                };

                if (mainMapOptUpdate && typeof mainMapOptUpdate === "object") {
                    mainMapObj.setOption(mainMapOptUpdate);
                }

            });

        };

        function selMap(mapFilter){
            var vpSel=$('#vpSelected').html();
            console.log(vpSel);
            console.log(mapFilter);
            var mapLink = './json/Map-All VPs-Risky Location.json';
//          var maplink='http:servermaplink?vpsel='+vpSel+'&mapfilter='+mapFilter;
            
            loadMainMap(mapLink);
        }

        function selVP(vpSel){
            $('#vpSelected').html(vpSel);
        
            var masterLink = './json/Stephen Zhou.json';
//          var masterlink='http:servermainlink?vpsel='+vpSel;
            loadMainPanel(masterLink);           
        }

        var mainMapObj = echarts.init(document.getElementById("mainMap"));
        var surveyStatObj = echarts.init(document.getElementById("surveyStat"));
        var workStatusObj = echarts.init(document.getElementById("workStatus"));
        var riskFactorObj = echarts.init(document.getElementById("riskFactor"));
        var mainMapOpt = null;
        var surveyStatOpt = null;
        var workStatusOpt = null;
        var riskFactorOpt = null;
        var mainMapOptUpdate = null;
        var surveyStatOptUpdate = null;
        var workStatusOptUpdate = null;
        var riskFactorOptUpdate = null;

        $(function () {
            graphOptInit();
            if (mainMapOpt && typeof mainMapOpt === "object") {
                mainMapObj.setOption(mainMapOpt, true);
            }

            if (surveyStatOpt && typeof surveyStatOpt === "object") {
                surveyStatObj.setOption(surveyStatOpt, true);
            }

            if (workStatusOpt && typeof workStatusOpt === "object") {
                workStatusObj.setOption(workStatusOpt, true);
            }
            if (riskFactorOpt && typeof riskFactorOpt === "object") {
                riskFactorObj.setOption(riskFactorOpt, true);
            }  
            
            var masterLink = './json/All VPs.json';
//          var masterlink='http:servermainlink?vpsel=All%20VPs;
            loadMainPanel(masterLink);

        });


