'use strict';//严格模式
let lastCheckedBox = [];
let vue = new Vue({
    el: "#app",
    mixins: [qhjscMixins],
    data: function () {
        return {
            inputResult:'',//搜索建议传入的参数
            suggestionList:[],
            suggestionListLines: [],//存所有线路信息
            qwechartIndex:0,//全网页面数据跳动需要的Index
            qwechartSureIndex:0,//全网页面数据跳动需要验证的Index
            zdechartIndex:0,//站点页面数据跳动需要的Index
            zdechartSureIndex:0,//站点页面数据跳动需要的Index
            xlechartIndex:0,//线路页面数据跳动需要的Index
            xlechartSureIndex:0,//线路页面数据跳动需要的Index
            checkboxGroup: [],
            popperClass: false,
            popperClass2: false,
            placeholderSearch: '查线路、站点',
            placeholderSearch2: '全网线路概览',
            disabledSearch: false,
            fontClass: 'iconfont-xianlu',
            iconClass: 'icon-xianlu',
            upColorClass:'up-color',
            downColorClass:'down-color',
            hotLines: [],//热门线路
            from: {
                busCount: 0,
                busAllCount: 0,
                busRode: 0,
                passengerNum: 0,
                passengerCard: 0
            },
            to: 120,
            fromLine: {
                passengerNum: 0,
                busOnline: 0,
                cardCash: 0,
                seriesData: {},
                lineMessage: {//单条线路 信息
                    line_distance: 300,
                    operation_time: "06:30-22:40",
                    run_interval: "5",
                    station_num: 30,
                    kind: "up",
                    transit_num: 3
                },
                lineStationList: [],//搜索线路时，下部分数据
                lineAvg: 0,
                busStationByLine: 0//车辆总数
            },
            value: '',
            stationEchart: {
                lineList: [],
                top3Lines: [],
                odArray: [],
            },
            klljkChart: null,
            kylbhqsChart: null,
            echartData: {
                kylbhqs: {},
                kylbhqsData: [],
                sdklljkChart: null,
                sdklljkData: {},
                sdklljkIndex: 0,	//在定时器之前就调用一次，所以从1开始，第二圈从0开始
                sdklljkIndexLength: 24,//24
            },
            input5: '',//输入框的内容，对应线路名称
            inputFtl5: '',//输入框的内容，对应线路名称
            stationResult2_1: false,
            stationResult2_2: false,
            rightContainer: true,
            realTimeLine: false
        }
    },
    computed: {
        kylbhqsChartOption: function () {
            let self = this;
            let totalData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
//            let totalData = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            let allData = [];
            var seriesData = [];
            var max = 0;
            let kylbhqs = this.echartData.kylbhqs;
            if (kylbhqs.hours && kylbhqs.hourNums) {
                for (let i = 0; i < 24; i++) {
                    if (kylbhqs.hourNums.get(i) > max) {
                        max = kylbhqs.hourNums.get(i);
                    }
                    if (kylbhqs.hours.indexOf(i) + 2) {
                        allData.push(kylbhqs.hourNums.get(i));

                    } else {
                        allData.push(0);
                    }
                }
                //self.echartData.kylbhqsData = allData;
                // seriesData =  self.echartData.kylbhqsData.slice(0,9);
            }
            this.qwechartIndex = allData.length; 
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                        	  color: '#2099ff',
                              opacity:0.1,
                        }
                    },
                    alwaysShowContent:true,
                    formatter: function (params) {
                        let temp = params[0].value;
                        if (temp == undefined) {
                            temp = 0;
                        }
                        return temp + "人";
                    },
                    backgroundColor: 'rgba(48,130,225,0.8)',
                    padding: [0, 4, 0, 4],
                    textStyle: {
                        fontSize: 12
                    },
                    position: function (pos, params, dom, rect, size) {
                        let yPos = '18%'
                        let xPos = 0
                        if (pos[0] < size.viewSize[0] / 2) {
                            xPos = pos[0] + 10
                        } else {
                            xPos = pos[0] - dom.offsetWidth - 10
                        }
                        return [xPos, yPos]
                    },
                },
                grid: {
                    top: '20%',
                    bottom: '20%',
                    left: '10%',
                    right: '10%',
                },
                xAxis: [
                    {
                    	name:'/时',
                    	nameTextStyle: {
                            fontSize: 10,
                            padding: [27, 50, 0, -10],
                            color: '#7BAAC9',
                            nameLocation: 'end',
                        },
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            show: true,
                            color: '#7BAAC9',
                            fontSize: '12'
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#023F4F',
                                width: 1,
                            }
                        },
                        data: totalData
                    }],
                yAxis: [{
                    max: max,
                    min: 0,
                    name: '      /人',
                    nameTextStyle: {
                        padding: [0, 0, 0, 5],
                        fontSize: 10,
                        color: '#7BAAC9'
                    },
                    nameGap: 5,
                    type: 'value',
                    axisLabel: {
                        show: false,
                        color: '#7BAAC9',
                        fontSize: '12',
                    },
                    splitLine: {show: false},
                    axisTick: {show: false},
                    axisLine: {
                        lineStyle: {
                            show: false,
                            color: '#023F4F',
                            width: 1,
                        }
                    }
                }],
                series: [{
                    type: 'line',
                    smooth: true,
                    symbol: 'emptyCircle',
                    symbolSize: 1,
                    showSymbol: false,
                    markPoint: {
						symbol: 'circle',
						symbolSize: 8,
						data: [{
							name: 'XX标点',
							//coord: ['13:05', 182],

						}, ],
					},
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {offset: 0, color: '#6385FF'},
                                {offset: 0.5, color: 'rgba(99,133,255,0.3)'},
                                {offset: 1, color: 'rgba(255,255,255,0.01)'}
                            ]
                        )
                    },
                    lineStyle: {
                        color: '#6385FF'
                    },
                    data: allData
                }]
            };
            return option;
        },
        sdklljkChartOption: function () {
            let self = this;
            let axisData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23];
            let seriesData = [];
            let sdklljkData = this.echartData.sdklljkData;
            if (sdklljkData.hours && sdklljkData.hourNums) {
                for (let i = 0; i < 24; i++) {
                    if (sdklljkData.hours.indexOf(i) + 2) {
                        seriesData.push(sdklljkData.hourNums.get(i));
                    } else {
                        seriesData.push('' + 0);
                    }
                }
            }
            self.echartData.sdklljkIndexLength = seriesData.length;
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#2099ff',
                            opacity:0.1,
                        }
                    },
                    formatter: function (params) {
                        let temp = params[0].value;
                        if (temp == undefined) {
                            temp = 0;
                        }
                        return temp + "人";
                    },
                    backgroundColor: 'rgba(48,130,225,0.8)',
                    padding: [0, 4, 0, 4],
                    textStyle: {
                        fontSize: 12
                    },
                    position: function (pos, params, dom, rect, size) {
                        let yPos = '13%'
                        let xPos = 0
                        if (pos[0] < size.viewSize[0] / 2) {
                            xPos = pos[0] + 10
                        } else {
                            xPos = pos[0] - dom.offsetWidth - 10
                        }
                        return [xPos, yPos]
                    },
                },
                grid: {
                    top: '5%',
                    bottom: '30%',
                    left: '5%',
                    right: '5%'
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            show: true,
                            color: '#7BAAC9',
                            fontSize: '12'
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(7,49,123,0.5)',
                                width: 1
                            }
                        },
                        data: axisData
                    }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        show: false
                    },
                    splitLine: {show: false},
                    axisTick: {show: false},
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#023F4F',
                            width: 1,
                        }
                    }
                }],
                series: [{
                    type: 'line',
                    smooth: true,
                    symbol: 'emptyCircle',
                    symbolSize: 1,
                    showSymbol: false,
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {offset: 0, color: '#6385FF'},
                                {offset: 0.5, color: 'rgba(99,133,255,0.3)'},
                                {offset: 1, color: 'rgba(255,255,255,0.01)'}
                            ]
                        )
                    },
                    lineStyle: {
                        color: '#6385FF'
                    },
                    markPoint: {
						symbol: 'circle',
						symbolSize: 8,
						data: [{
							name: 'XX标点',
						}, ],
					},
                    data: seriesData
                }]
            };
            return option;
        },
        klljkChartOption: function () {
            let self = this;
            let allData = this.fromLine.seriesData;
            let axisData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23];
            let seriesData = [];
            if (allData.hours && allData.hourNums) {
                for (let i = 0; i < 24; i++) {
                    if (allData.hours.indexOf(i) + 2) {
                        seriesData.push(allData.hourNums.get(i));
                    } else {
                        seriesData.push(0);
                    }
                }
            }
            self.xlechartIndex = seriesData.length;
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                        	  color: '#2099ff',
                              opacity:0.1,
                        }
                    },
                    backgroundColor: 'rgba(48,130,225,0.8)',
                    padding: [0, 4, 0, 4],
                    textStyle: {
                        fontSize: 12
                    },
                    formatter: function (params) {
                        let temp = params[0].value;
                        if (temp == undefined) {
                            temp = 0;
                        }
                        return temp + "人";
                    },
                    position: function (pos, params, dom, rect, size) {
                        let yPos = '18%'
                        let xPos = 0
                        if (pos[0] < size.viewSize[0] / 2) {
                            xPos = pos[0] + 10
                        } else {
                            xPos = pos[0] - dom.offsetWidth - 10
                        }
                        return [xPos, yPos]
                    }
                },
                grid: {
                    top: '5%',
                    bottom: '30%',
                    left: '3%',
                    right: '0%'
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            show: true,
                            color: '#7BAAC9',
                            fontSize: '12'
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(7,49,123,0.5)',
                                width: 1
                            }
                        },
                        data: axisData
                    }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        show: false
                    },
                    splitLine: {show: false},
                    axisTick: {show: false},
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#023F4F',
                            width: 1,
                        }
                    },
                }],
                series: [{
                    type: 'line',
                    smooth: true,
                    symbol: 'emptyCircle',
                    symbolSize: 1,
                    showSymbol: false,
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {offset: 0, color: '#6385FF'},
                                {offset: 0.5, color: 'rgba(99,133,255,0.3)'},
                                {offset: 1, color: 'rgba(255,255,255,0.01)'}
                            ]
                        )
                    },
                    lineStyle: {
                        color: '#6385FF'
                    },
                    markPoint: {
						symbol: 'circle',
						symbolSize: 8,
						data: [{
							name: 'XX标点',
						}, ],
					},
                    data: seriesData
                }]
            };
            return option;
        },
        //模糊查询
        promptMessage: function () {
            var self = this;
            var suggestionList = [];
            // var value = this.input5;
            // if(this.inputResult.length){
            // 	value = this.inputResult;
            // }
            //如果输入框为空，且缓存没有数据，第一次查询所有线路。第二次走缓存
            // if(!self.input5 && Boolean(self.suggestionListLines.length)) {
            if(self.suggestionListLines.length) {
                    suggestionList = self.suggestionListLines;
            } else{
                var url = this.contextPath + "/intimeBus/selectLineStationLike";
                suggestionList = $.ajax({url: url, async: false, dataType: "json"}).responseText;

                //如果 所有线路也为空， 输入框为空，查询所有线路存入缓
                if(!self.suggestionListLines.length) {
                    self.suggestionListLines = JSON.parse(JSON.stringify(suggestionList));
                }
            }
            return suggestionList;
        }
    },
    methods: {
        getContextPath: function () {
            let local = document.location;
            let contextPath = "/" + local.pathname.split('/')[1];
            let basePath = local.protocol + "//" + local.host + "/" + contextPath;
            this.contextPath = contextPath;//项目路径
        },
        initKlljkChart: function () {
            let self = this;
            this.klljkChart = echarts.init(this.$refs.klljk, "qhjscEchartsTheme");
            this.klljkChart && this.klljkChart.setOption(this.klljkChartOption);        
            this.setTimerKlljk();
            this.$refs.klljk.addEventListener('mouseover',function(e){
                self.distroyedTimerKlljk();
                self.distroyedTimer();
            });
            this.$refs.klljk.addEventListener('mouseout',function(e){
                self.setTimerKlljk();
                self.setTimer();
            });
            window.addEventListener("resize", function () {
                self.klljkChart && self.klljkChart.resize();
            });
        },
        setTimerKlljk: function () {/* 设置定时器  */
            let self = this;
            if(!self.timerKlljk) {
                self.klljkChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: self.kylbhqsIndex,
                });
                self.timerKlljk = setInterval(function() {
                    self.klljkIndex<self.xlechartIndex?self.klljkIndex++:self.klljkIndex=0;

                    self.klljkChart.dispatchAction(
                        {
                            type: 'showTip',
                            seriesIndex: 0,
                            dataIndex: self.klljkIndex,
                        });
                },2000);
            }

        },
        distroyedTimerKlljk: function () { /*  清除定时器  */
            let self = this;
            if (self.timerKlljk) {
                clearInterval(self.timerKlljk);
                self.klljkChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: self.klljkIndex,
                });
                self.timerKlljk = null;
            }
        },
        initKylbhqsChart: function () {
            let self = this;
            this.kylbhqsChart = echarts.init(this.$refs.kylbhqs, "qhjscEchartsTheme");
            this.kylbhqsChart && this.kylbhqsChart.setOption(this.kylbhqsChartOption);
            this.setTimerKylbhqs();
            this.$refs.kylbhqs.addEventListener('mouseover',function(e){
                self.distroyedTimerKylbhqs();
                self.distroyedTimerInit();
            });
            this.$refs.kylbhqs.addEventListener('mouseout',function(e){
                self.setTimerKylbhqs();
                self.setTimerInit();
            });
            window.addEventListener("resize", function () {
                self.kylbhqsChart && self.kylbhqsChart.resize();
            });
        },
        setTimerKylbhqs: function () {/* 设置定时器  */
            let self = this;
            if(!self.timerKylbhqs) {
                self.kylbhqsChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: self.kylbhqsIndex,
                });
                self.timerKylbhqs = setInterval(function() {
                    self.kylbhqsIndex<self.qwechartIndex?self.kylbhqsIndex++:self.kylbhqsIndex=0;

                    self.kylbhqsChart.dispatchAction(
                        {
                            type: 'showTip',
                            seriesIndex: 0,
                            dataIndex: self.kylbhqsIndex,
                        });
                },2000);
            }
        },
        distroyedTimerKylbhqs: function () { /*  清除定时器  */
            let self = this;
            if (self.timerKylbhqs) {
                clearInterval(self.timerKylbhqs);
                self.kylbhqsChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: self.kylbhqsIndex,
                });
                self.timerKylbhqs = null;
            }
        },
        initSdklljkChart: function () {
            let self = this;
            this.echartData.sdklljkChart = echarts.init(this.$refs.sdklljk, "qhjscEchartsTheme");
            this.echartData.sdklljkChart && this.echartData.sdklljkChart.setOption(this.sdklljkChartOption);
            this.setTimerSdklljk();
            this.$refs.sdklljk.addEventListener('mouseover',function(e){
                self.distroyedTimerSdklljk();
                self.distroyedTimerStation();
            });
            this.$refs.sdklljk.addEventListener('mouseout',function(e){
                self.setTimerSdklljk();
                self.setTimerStation();
            });
            window.addEventListener("resize", function () {
                self.echartData.sdklljkChart && self.echartData.sdklljkChart.resize();
            });
        },
        setTimerSdklljk: function () {/* 设置定时器  */
            let self = this;
            if(!self.timerSdklljk) {
                self.echartData.sdklljkChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: self.echartData.sdklljkIndex,
                });
                self.timerSdklljk = setInterval(function() {
                    self.echartData.sdklljkIndex <self.echartData.sdklljkIndexLength?self.echartData.sdklljkIndex++:self.echartData.sdklljkIndex=0;
                    self.echartData.sdklljkChart.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 0,
                        dataIndex: self.echartData.sdklljkIndex,
                    });
                }, 2000);
            }
        },
        distroyedTimerSdklljk: function () { /*  清除定时器  */
            let self = this;
            if (self.timerSdklljk) {
                clearInterval(self.timerSdklljk);
                self.echartData.sdklljkChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: self.echartData.sdklljkIndex,
                });
                self.timerSdklljk = null;
            }
        },
        // 初始化地图(只执行一次)
        initMap: function () {
            let self = this;
            this.map = new AMap.Map('mapcontent', {
                resizeEnable: true,
                zoom: 13, // 初始化地图
                zooms: [12, 15],
                center: self.mapData.centerCoordinate
            });
            this.map.setFeatures(['bg', 'road', 'building','point']);//显示背景和道路
            // this.map.setMapStyle('amap://styles/d6ddb62dcec953082bd4437bddfd75f8');//设置样式模板
            self.map.plugin(["AMap.ToolBar", "AMap.MarkerClusterer", "AMap.Driving"], function () {
                const toolBar = {
                    locate : false//是否显示定位按钮，默认为false
                }
                self.map.addControl(self.aMap.control.toolBar = new AMap.ToolBar(toolBar));
                self.map.addControl(self.aMap.control.markerClusterer = new AMap.MarkerClusterer());
                self.map.addControl(self.aMap.control.driving = new AMap.Driving());
            });
        },
        distroyMap: function() {
            let self = this;
            if (self.map) {
                //4.删除地图上所有的覆盖物
                self.map.clearMap();
                //3.清除地图上的信息窗体。
                self.map.clearInfoWindow();
                //2.删除控件
                if(self.aMap.control) {
                    let control = self.aMap.control;
                    for(let obj in control) {
                        self.map.removeControl(obj);
                    }
                }
                //1.注销地图
                self.map.destroy();
                self.map = null;
            }
        },
        drawODArrowLineClearLayers: function () {
            let self = this;
            let layers = this.map.getLayers();
            // 删除自定义图层
            for (let i = 0; i < layers.length; i++) {
                if ("AMap.CanvasLayer" == layers[i].CLASS_NAME) {
                    self.map.remove(layers[i]);
                    i--;
                }
            }
            self.map.remove(self.canvasLayer);
            self.map.remove(self.animationCanvasLayer);
        },
        drawODArrowLineClearMarkers: function () {
            let self = this;
            //遍历之前先清除点,清除覆盖物
            if (this.mapData.markers.odMarkers.length) {
                self.map.remove(self.mapData.markers.odMarkers);
                self.mapData.markers.odMarkers = [];
            }
        },
        drawODArrowLineClearMarkersEvent: function () {
            let self = this;
            //同时清空事件
            if(this.aMap.markersEvent.odMarkersEvent) {
                let click = self.aMap.markersEvent.odMarkersEvent.click;
                if(click.length) {
                    click.forEach((item, index) => {
                        item['marker'].off("click", item['event'], item['context']);
                    });
                    self.aMap.markersEvent.odMarkersEvent.click = [];
                }
                let mouseover  = self.aMap.markersEvent.odMarkersEvent.mouseover ;
                if(mouseover.length) {
                    mouseover.forEach((item, index) => {
                        item['marker'].off("mouseover", item['event'], item['context']);
                    });
                    self.aMap.markersEvent.odMarkersEvent.mouseover = [];
                }
                let mouseout = self.aMap.markersEvent.odMarkersEvent.mouseout;
                if(mouseout.length) {
                    mouseout.forEach((item, index) => {
                        item['marker'].off("mouseout", item['event'], item['context']);
                    });
                    self.aMap.markersEvent.odMarkersEvent.mouseout = [];
                }
            }
        },
        drawODArrowLine: function () {
            this.drawODArrowLineClearLayers();
            this.drawODArrowLineClearMarkers();
            this.drawODArrowLineClearMarkersEvent();

            let self = this;
            let scaleBy = self.mapData.scaleBy;
            let scaleBy2 = self.mapData.scaleBy2;

            let canvas = this.canvas;
            canvas.width = this.map.getSize().width;
            canvas.height = this.map.getSize().height;

            let animationCanvas = this.animationCanvas;
            animationCanvas.width = this.map.getSize().width;
            animationCanvas.height = this.map.getSize().height;

            this.canvasLayer = new AMap.CanvasLayer({
                canvas: canvas,
                bounds: self.map.getBounds(),
                zooms: [12, 15],
            });

            this.animationCanvasLayer = new AMap.CanvasLayer({
                canvas: animationCanvas,
                bounds: self.map.getBounds(),
                zooms: [12, 15],
            });
            this.canvasLayer.setMap(self.map);
            this.animationCanvasLayer.setMap(self.map);

            //清空动画
            if(this.fmgr) {
                this.fmgr.clear();
                this.fmgr = null;
            }

            var arc = new Arc(canvas);//弧线
            var fmgr = new Scene(animationCanvas);//动态线
            fmgr.start();

            let colors = [];
            if(self.mapData.handleState == 0 || self.mapData.handleState == 1) {
                colors = commonData.colors;
            } else {
                colors = commonData.colors2;
            }

            if (self.mapData.odNum.length) {
                for (let i = 0; i < self.mapData.odNum.length; i++) {
                    let odNum = self.mapData.odNum[i];
                    var tempStart = self.map.lnglatTocontainer(new AMap.LngLat(odNum['o'][0], odNum['o'][1]));
                    var tempStartList = [tempStart.x, tempStart.y];
                    var tempEnd = self.map.lnglatTocontainer(new AMap.LngLat(odNum['d'][0], odNum['d'][1]));
                    var tempEndList = [tempEnd.x, tempEnd.y];
                    var color = colors[i];

                    arc.drawArc(tempStartList,tempEndList,color,2,0.3); //画线

                    var sparkArc1 = new SparkArc();//动画弧线
                    sparkArc1.isShadow = false;
                    var tempObj = {color: color};
                    sparkArc1.setLocation(tempStartList, tempEndList, tempObj,0.3);

                    fmgr.addShape(sparkArc1);

                    sparkArc1.play(); //线动画

                    /*画od点的圈圈2个*/
                    let radius1 = 3 * scaleBy;    //半径,原定宽度6px
                    let radius2 = 18 * (odNum['num']) / (self.mapData.odNum[0]['num']) * scaleBy2;
                    //外圆  和  内圆  （正负不同）
                    let radius2a = radius1 - radius2;
                    let marker1 = new AMap.Marker({ //添加自定义点标记
                        map: self.map,
                        position: odNum['o'],//基点位置
                        offset: new AMap.Pixel(0, 0),
                        draggable: false,  //是否可拖动
                        content: `<div class="circle-marker1"  style="width: ${2 * radius1}px;height: ${2 * radius1}px;background-color: ${color};position: relative;left: ${-radius1}px;top: ${-radius1}px;">
                                        <div class="circle-marker2" style="width: ${2 * radius2}px;height: ${2 * radius2}px;border-color:${color};position: absolute;left: ${radius2a}px;top: ${radius2a}px;animation-delay: ${~~(Math.random() * 1000)}ms">
                                        </div></div>`
                    });
                    self.mapData.markers.odMarkers.push(marker1);
                    let marker2 = new AMap.Marker({ //添加自定义点标记
                        map: self.map,
                        position: odNum['d'],//基点位置
                        offset: new AMap.Pixel(0, 0),
                        draggable: false,  //是否可拖动
                        // content: '<div class="circle-marker" style= color:' + color1 + ';width:' + (14 * scaleBy) + 'px;height:' + (14 * scaleBy) + 'px;font-size:' + (14 * scaleBy) + 'px;line-height:' + (14 * scaleBy) + 'px;>●</div>'   //自定义点标记覆盖物内容
                        content: `<div class="circle-marker1"  style="width: ${2 * radius1}px;height: ${2 * radius1}px;background-color: ${color};position: relative;left: ${-radius1}px;top: ${-radius1}px;">
                                        <div class="circle-marker2" style="width: ${2 * radius2}px;height: ${2 * radius2}px;border-color:${color};position: absolute;left: ${radius2a}px;top: ${radius2a}px;animation-delay: ${~~(Math.random() * 1000)}ms">
                                        </div></div>`
                    });
                    self.mapData.markers.odMarkers.push(marker2);
                    (function (i) {
                        //站点点击事件（循环注册事件）
                        marker1.on("click", self.odClick1 = function () {
                            self.input5 = self.mapData.odNum[i]['o_name'];
                            // self.inputId5 = self.mapData.busyPoints[i]['stationName'];
                            self.initPageConfig(3);
                        }, self);
                        //将事件添加进全局数组,最后
                        self.aMap.markersEvent.odMarkersEvent.click.push({
                            marker: marker1,
                            event: self.odClick1,
                            context: self
                        });
                        delete self.odClick1;//最后置空，由于数组里面有，js内存也不会清空它

                        //鼠标移近点标记时触发事件
                        marker1.on("mouseover", self.odMouseover1 = function () {
                            marker1.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                                offset: new AMap.Pixel(-20, -20),//修改label相对于maker的位置
                                content: self.mapData.odNum[i]['o_name'] + '与' + self.mapData.odNum[i]['d_name'] +
                                '\tod量：' + self.mapData.odNum[i]['num']
                            });
                            marker1.setzIndex(110);
                            marker1.setAnimation('AMAP_ANIMATION_BOUNCE');
                        }, self);
                        //将事件添加进全局数组
                        self.aMap.markersEvent.odMarkersEvent.mouseover.push({
                            marker: marker1,
                            event: self.odMouseover1,
                            context: self
                        });
                        delete self.odMouseover1;//最后置空，由于数组里面有，js内存也不会清空它

                        //鼠标移出点标记时触发事件
                        marker1.on("mouseout", self.odMouseout1 = function () {
                            marker1.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                                offset: new AMap.Pixel(0, 0),//修改label相对于maker的位置
                                content: ''
                            });
                            marker1.setzIndex(100);
                            marker1.setAnimation('AMAP_ANIMATION_NONE');
                        }, self);
                        //将事件添加进全局数组
                        self.aMap.markersEvent.odMarkersEvent.mouseout.push({
                            marker: marker1,
                            event: self.odMouseout1,
                            context: self
                        });
                        delete self.odMouseout1;//最后置空，由于数组里面有，js内存也不会清空它

                        //站点点击事件（循环注册事件）
                        marker2.on("click", self.odClick2 = function () {
                            self.input5 = self.mapData.odNum[i]['d_name'];
                            // self.inputId5 = self.mapData.busyPoints[i]['stationName'];
                            self.initPageConfig(3);
                        }, self);
                        //将事件添加进全局数组,最后
                        self.aMap.markersEvent.odMarkersEvent.click.push({
                            marker: marker2,
                            event: self.odClick2,
                            context: self
                        });
                        delete self.odClick2;//最后置空，由于数组里面有，js内存也不会清空它

                        //鼠标移近点标记时触发事件
                        marker2.on("mouseover", self.odMouseover2 = function () {
                            marker2.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                                offset: new AMap.Pixel(-20, -20),//修改label相对于maker的位置
                                content: self.mapData.odNum[i]['d_name'] + '与' + self.mapData.odNum[i]['o_name'] +
                                '\tod量：' + self.mapData.odNum[i]['num']
                            });
                            marker2.setzIndex(110);
                            marker2.setAnimation('AMAP_ANIMATION_BOUNCE');
                        }, self);
                        //将事件添加进全局数组
                        self.aMap.markersEvent.odMarkersEvent.mouseover.push({
                            marker: marker2,
                            event: self.odMouseover2,
                            context: self
                        });
                        delete self.odMouseover2;//最后置空，由于数组里面有，js内存也不会清空它

                        //鼠标移出点标记时触发事件
                        marker2.on("mouseout", self.odMouseout2 = function () {
                            marker2.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                                offset: new AMap.Pixel(0, 0),//修改label相对于maker的位置
                                content: ''
                            });
                            marker2.setzIndex(100);
                            marker2.setAnimation('AMAP_ANIMATION_NONE');
                        }, self);
                        //将事件添加进全局数组
                        self.aMap.markersEvent.odMarkersEvent.mouseout.push({
                            marker: marker2,
                            event: self.odMouseout2,
                            context: self
                        });
                        delete self.odMouseout2;//最后置空，由于数组里面有，js内存也不会清空它
                    })(i);
                }
            }

            this.fmgr = fmgr;
        },
        addBusyMarkerClearMarkers: function () {
            let self = this;
            //遍历之前先清除覆盖物和数据(1.状态改变2.地图缩放)
            if (self.mapData.markers.busyCircleMarkers.length) {
                self.map.remove(self.mapData.markers.busyCircleMarkers);
                self.mapData.markers.busyCircleMarkers = [];
            }
        },
        addBusyMarkerClearMarkersEvent: function () {
            let self = this;
            //同时清空事件
            if(this.aMap.markersEvent.busyMarkersEvent) {
                let click = self.aMap.markersEvent.busyMarkersEvent.click;
                if(click.length) {
                    click.forEach((item, index) => {
                        item['marker'].off("click", item['event'], item['context']);
                    });
                    self.aMap.markersEvent.busyMarkersEvent.click = [];
                }
                let mouseover  = self.aMap.markersEvent.busyMarkersEvent.mouseover ;
                if(mouseover.length) {
                    mouseover.forEach((item, index) => {
                        item['marker'].off("mouseover", item['event'], item['context']);
                    });
                    self.aMap.markersEvent.busyMarkersEvent.mouseover = [];
                }
                let mouseout = self.aMap.markersEvent.busyMarkersEvent.mouseout;
                if(mouseout.length) {
                    mouseout.forEach((item, index) => {
                        item['marker'].off("mouseout", item['event'], item['context']);
                    });
                    self.aMap.markersEvent.busyMarkersEvent.mouseout = [];
                }
            }
        },
        addBusyMarker: function () {
            this.addBusyMarkerClearMarkers();
            this.addBusyMarkerClearMarkersEvent();

            let self = this;
            let scaleBy = self.mapData.scaleBy;//地图比列
            let scaleBy2 = self.mapData.scaleBy2;//地图比列

            if (self.mapData.busyPoints.length) {
                let busyPoints = self.mapData.busyPoints;
                let radiusMax = 0, radius1 = 0, radius2 = 0, radius3 = 0;//radiusMax最大那个用于算比例
                let colors = [];
                if(self.mapData.handleState == 0 || self.mapData.handleState == 1 ) {
                    colors = commonData.colors3;
                } else {
                    colors = commonData.colors4;
                }
                for (let i = 0; i < busyPoints.length; i++) {
                    if (i == 0) {
                        radius1 = parseInt(9 * scaleBy2);
                        radius2 = parseInt(6 * scaleBy2);
                        radius3 = parseInt(3 * scaleBy2);
                        radiusMax = 1 + busyPoints[i]['passengerNum'] - 1;
                    } else {
                        radius1 = parseInt(9 * scaleBy2 * ((1 + busyPoints[i]['passengerNum'] - 1) / radiusMax));
                        radius2 = parseInt(6 * scaleBy2 * ((1 + busyPoints[i]['passengerNum'] - 1) / radiusMax));
                        radius3 = parseInt(3 * scaleBy2 * ((1 + busyPoints[i]['passengerNum'] - 1) / radiusMax));
                    }

                    // 画拥挤坐标点
                    let marker = new AMap.Marker({ //添加自定义点标记
                        map: self.map,
                        position: busyPoints[i]['latlng'],//基点位置
                        offset: new AMap.Pixel(0, 0),
                        draggable: false,  //是否可拖动
                        // content: `<div class="marker-busy" style = "width: ${radius}px; height: ${radius}px;animation-delay: ${~~(Math.random()*1000)}ms " > </div>`   //自定义点标记覆盖物内容
                        content: `<div class="animations1" style="width: ${radius1}px;height: ${radius1}px;position: relative;left: ${-(radius1 / 2)}px;top: ${-(radius1 / 2)}px;background: ${colors[i]}99;box-shadow: 0 0 10px ${colors[i]};animation-delay: ${~~(Math.random() * 1000)}ms">
                                    <div class="animations2" style="width: ${radius2}px;height: ${radius2}px;position: relative;left: ${~~(radius1 - radius2) / 2}px;top: ${~~(radius1 - radius2) / 2}px;background: ${colors[i]}75;animation-delay: ${~~(Math.random() * 1000)}ms">
                                        <div class="animations3" style="width: ${radius3}px;height: ${radius3}px;position: absolute;left: ${~~(radius2 - radius3) / 2}px;top: ${~~(radius2 - radius3) / 2}px;background: ${colors[i]};animation-delay: ${~~(Math.random() * 1000)}ms">
                                        </div></div></div>`
                    });
                    marker.setMap(self.map);

                    self.mapData.markers.busyCircleMarkers.push(marker);

                    (function (i) {
                        //站点点击事件（循环注册事件）
                        marker.on("click", self.busyClick = function () {
                            self.input5 = self.mapData.busyPoints[i]['stationName'];
                            // self.inputId5 = self.mapData.busyPoints[i]['stationName'];
                            self.initPageConfig(3);
                        }, self);
                        //将事件添加进全局数组
                        self.aMap.markersEvent.busyMarkersEvent.click.push({
                            marker: marker,
                            event: self.busyClick,
                            context: self
                        });
                        delete self.busyClick;//最后置空，由于数组里面有，js内存也不会清空它

                        //鼠标移近点标记时触发事件
                        marker.on("mouseover", self.busyMouseover = function () {
                            marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                                offset: new AMap.Pixel(-20, -(20+2*radius1)),//修改label相对于maker的位置
                                content: self.mapData.busyPoints[i]['stationName'] +
                                '\t客流量：' + self.mapData.busyPoints[i]['passengerNum']
                            });
                            marker.setzIndex(110);
                            marker.setAnimation('AMAP_ANIMATION_BOUNCE');
                        }, self);
                        //将事件添加进全局数组
                        self.aMap.markersEvent.busyMarkersEvent.mouseover.push({
                            marker: marker,
                            event: self.busyMouseover,
                            context: self
                        });
                        delete self.busyMouseover;//最后置空，由于数组里面有，js内存也不会清空它

                        //鼠标移出点标记时触发事件
                        marker.on("mouseout", self.busyMouseout = function () {
                            marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                                offset: new AMap.Pixel(0, 0),//修改label相对于maker的位置
                                content: ''
                            });
                            marker.setzIndex(100);
                            marker.setAnimation('AMAP_ANIMATION_NONE');
                        }, self);
                        //将事件添加进全局数组
                        self.aMap.markersEvent.busyMarkersEvent.mouseout.push({
                            marker: marker,
                            event: self.busyMouseout,
                            context: self
                        });
                        delete self.busyMouseout;//最后置空，由于数组里面有，js内存也不会清空它
                    })(i);
                }
            }
        },
        drivingBusLineClear: function() {
            let self = this;
            /**************************************线路覆盖物*************************************************/
                //(1).全部清除
            let removeAll = function() {
                    //0.ajax数据 不管，请求ajax自动更新
                    //1.ajax覆盖物及map
                    if (self.mapData.markers.linesMarkers.length) {
                        let linesMarkers = self.mapData.markers.linesMarkers;
                        for (let i = 0; i < linesMarkers.length; i++) {
                            self.map.remove(linesMarkers[i]['arr']);
                        }
                        self.mapData.markers.linesMarkers = [];
                    }
                    // 2.缓存数据
                    self.mapData.cache.lineCacheCall = [];
                    // 3.缓存覆盖物及map
                    if (self.mapData.markersCache.lineCacheCallMarkers.length) {
                        let lineCacheCallMarkers = self.mapData.markersCache.lineCacheCallMarkers;
                        for (let i = 0; i < lineCacheCallMarkers.length; i++) {
                            self.map.remove(lineCacheCallMarkers[i]['arr']);
                        }
                        self.mapData.markersCache.lineCacheCallMarkers = [];
                    }
                }

            //(2).地图change清除
            let removeChangePart = function () {
                let linesArr = self.lines.split(',');
                //0. ajax数据清空
                self.mapData.lineStations = [];
                //1.ajax覆盖物及map
                if (self.mapData.markers.linesMarkers.length) {
                    let linesMarkers = self.mapData.markers.linesMarkers;
                    for (let i = 0; i < linesMarkers.length; i++) {
                        self.map.remove(linesMarkers[i]['arr']);
                    }
                    self.mapData.markers.linesMarkers = [];
                }
                //2.缓存数据(不清)
                //3.缓存覆盖物及map
                if (self.mapData.markersCache.lineCacheCallMarkers.length) {
                    let lineCacheCallMarkers = self.mapData.markersCache.lineCacheCallMarkers;
                    for (let i = 0; i < lineCacheCallMarkers.length; i++) {
                        self.map.remove(lineCacheCallMarkers[i]['arr']);
                    }
                    self.mapData.markersCache.lineCacheCallMarkers = [];
                }
            }

            //(3).选择性清除
            let removeSeletePart = function () {
                let linesArr = self.lines.split(',');
                //0.ajax数据 不管，请求ajax自动更新
                //1.ajax覆盖物及map
                if (self.mapData.markers.linesMarkers.length) {
                    let linesMarkers = self.mapData.markers.linesMarkers;
                    for (let i = 0; i < linesMarkers.length; i++) {
                        //判断在 lines 里面有没有选择，没有就清除掉
                        if (!(linesArr.indexOf(linesMarkers[i]['line_code']) + 1)) {
                            self.map.remove(linesMarkers[i]['arr']);
                            self.mapData.markers.linesMarkers.splice(i, 1);
                            i--;
                        }
                    }
                }
                // 2.缓存数据
                if (self.mapData.cache.lineCacheCall.length) {
                    let lineCacheCall = self.mapData.cache.lineCacheCall;
                    for (let i = 0; i < lineCacheCall.length; i++) {
                        //判断在 lines 里面有没有选择，没有就清除掉
                        if (!(linesArr.indexOf(lineCacheCall[i]['line_code']) + 1)) {
                            self.mapData.cache.lineCacheCall.splice(i, 1);
                            i--;
                        }
                    }
                }
                // 3.缓存覆盖物及map
                if (self.mapData.markersCache.lineCacheCallMarkers.length) {
                    let lineCacheCallMarkers = self.mapData.markersCache.lineCacheCallMarkers;
                    for (let i = 0; i < lineCacheCallMarkers.length; i++) {
                        //判断在 lines 里面有没有选择，没有就清除掉
                        if (!(linesArr.indexOf(lineCacheCallMarkers[i]['line_code']) + 1)) {
                            self.map.remove(lineCacheCallMarkers[i]['arr']);
                            self.mapData.markersCache.lineCacheCallMarkers.splice(i, 1);
                            i--;
                        }
                    }
                }
            }

            if (self.mapData.handleStatus) {
                removeAll();
            } else {
                if (self.mapData.mapState == 'change') {//只清除地图就行，不要去管临时覆盖物
                    removeChangePart();
                } else {
                    //只有在站点选择站点的时候才会有 3 全清
                    if(self.mapData.handleState == 1) {
                        removeSeletePart();
                    } else {
                        removeAll();
                    }
                }
            }

        },
        drivingBusStationClear: function() {
            let self = this;
            /**************************************站点覆盖物*************************************************/
                //(1).全部清除
            let removeAll2 = function() {
                    //1.ajax覆盖物及map
                    if (self.mapData.markers.stationMarkers.length) {
                        let stationMarkers = self.mapData.markers.stationMarkers;
                        for (let i = 0; i < stationMarkers.length; i++) {
                            self.map.remove(stationMarkers[i]['arr']);
                        }
                        self.mapData.markers.stationMarkers = [];
                    }
                    // 2.缓存数据
                    self.mapData.cache.stationCache = [];
                    // 3.缓存覆盖物及map
                    if (self.mapData.markersCache.stationCacheMarkers.length) {
                        let stationCacheMarkers = self.mapData.markersCache.stationCacheMarkers;
                        for (let i = 0; i < stationCacheMarkers.length; i++) {
                            self.map.remove(stationCacheMarkers[i]['arr']);
                        }
                        self.mapData.markersCache.stationCacheMarkers = [];
                    }
                }

            //(2).地图change清除
            let removeChangePart2 = function () {
                //0.ajax
                //1.ajax覆盖物及map
                if (self.mapData.markers.stationMarkers.length) {
                    let stationMarkers = self.mapData.markers.stationMarkers;
                    for (let i = 0; i < stationMarkers.length; i++) {
                        self.map.remove(stationMarkers[i]['arr']);
                    }
                    self.mapData.markers.stationMarkers = [];
                }
                //2.缓存数据(不清)
                //3.缓存覆盖物及map
                if (self.mapData.markersCache.stationCacheMarkers.length) {
                    let stationCacheMarkers = self.mapData.markersCache.stationCacheMarkers;
                    for (let i = 0; i < stationCacheMarkers.length; i++) {
                        self.map.remove(stationCacheMarkers[i]['arr']);
                    }
                    self.mapData.markersCache.stationCacheMarkers = [];
                }
            }

            //(3).选择性清除
            let removeSeletePart2 = function () {
                let linesArr = self.lines.split(',');
                //1.ajax覆盖物及map
                if (self.mapData.markers.stationMarkers.length) {
                    let stationMarkers = self.mapData.markers.stationMarkers;
                    for (let i = 0; i < stationMarkers.length; i++) {
                        //判断在 lines 里面有没有选择，没有就清除掉
                        if (!(linesArr.indexOf(stationMarkers[i]['line_code']) + 1)) {
                            self.map.remove(stationMarkers[i]['arr']);
                            self.mapData.markers.stationMarkers.splice(i, 1);
                            i--;
                        }
                    }
                }
                /*// 2.缓存数据
                self.mapData.cache.stationCache = [];
                // 3.缓存覆盖物及map
                if (self.mapData.markersCache.stationCacheMarkers.length) {
                    let stationCacheMarkers = self.mapData.markersCache.stationCacheMarkers;
                    for (let i = 0; i < stationCacheMarkers.length; i++) {
                        self.map.remove(stationCacheMarkers[i]['arr']);
                    }
                    self.mapData.markersCache.stationCacheMarkers = [];
                }*/
                // 2.缓存数据
                if (self.mapData.cache.stationCache.length) {
                    let stationCache = self.mapData.cache.stationCache;
                    for (let i = 0; i < stationCache.length; i++) {
                        //判断在 lines 里面有没有选择，没有就清除掉
                        if (!(linesArr.indexOf(stationCache[i]['line_code']) + 1)) {
                            self.mapData.cache.stationCache.splice(i, 1);
                            i--;
                        }
                    }
                }
                // 3.缓存覆盖物及map
                if (self.mapData.markersCache.stationCacheMarkers.length) {
                    let stationCacheMarkers = self.mapData.markersCache.stationCacheMarkers;
                    for (let i = 0; i < stationCacheMarkers.length; i++) {
                        //判断在 lines 里面有没有选择，没有就清除掉
                        if (!(linesArr.indexOf(stationCacheMarkers[i]['line_code']) + 1)) {
                            self.map.remove(stationCacheMarkers[i]['arr']);
                            self.mapData.markersCache.stationCacheMarkers.splice(i, 1);
                            i--;
                        }
                    }
                }
            }

            if (self.mapData.handleStatus) {
                removeAll2();
            } else {
                let linesArr = self.lines.split(',');
                if (self.mapData.mapState == 'change') {//只清除地图就行，不要去管临时覆盖物
                    removeChangePart2();
                } else {
                    //只有在站点选择站点的时候才会有 2.3 全清
                    if(self.mapData.handleState == 1) {
                        removeSeletePart2();
                    } else {
                        removeAll2();
                    }
                }
            }


        },
        drivingBusStationClearEvent: function() {
            let self = this;
            /**************************************站点覆盖物*************************************************/
            //(1).全部清除
            let removeAll2 = function() {
                    if (self.aMap.markersEvent.stationMarkersEvent) {
                        let click = self.aMap.markersEvent.stationMarkersEvent.click;
                        if (click.length) {
                            click.forEach((item, index) => {
                                item['marker'].off("click", item['event'], item['context']);
                            });
                            self.aMap.markersEvent.stationMarkersEvent.click = [];
                        }
                        let mouseover = self.aMap.markersEvent.stationMarkersEvent.mouseover;
                        if (mouseover.length) {
                            mouseover.forEach((item, index) => {
                                item['marker'].off("mouseover", item['event'], item['context']);
                            });
                            self.aMap.markersEvent.stationMarkersEvent.mouseover = [];
                        }
                        let mouseout = self.aMap.markersEvent.stationMarkersEvent.mouseout;
                        if (mouseout.length) {
                            mouseout.forEach((item, index) => {
                                item['marker'].off("mouseout", item['event'], item['context']);
                            });
                            self.aMap.markersEvent.stationMarkersEvent.mouseout = [];
                        }
                    }
                }

            //(3).选择性清除
            let removeSeletePart2 = function () {
                let linesArr = self.lines.split(',');
                if (!self.linesDif && self.aMap.markersEvent.stationMarkersEvent) {
                    let click = self.aMap.markersEvent.stationMarkersEvent.click;
                    if (click.length) {
                        for (let i = 0; i < click.length; i++) {
                            if (!(linesArr.indexOf(click[i]['line_code']) + 1)) {
                                click[i]['marker'].off("click", click[i]['event'], click[i]['context']);
                                self.aMap.markersEvent.stationMarkersEvent.click.splice(i, 1);
                                i--;
                            }
                        }
                    }
                    let mouseover = self.aMap.markersEvent.stationMarkersEvent.mouseover;
                    if (mouseover.length) {
                        for (let i = 0; i < mouseover.length; i++) {
                            if (!(linesArr.indexOf(mouseover[i]['line_code']) + 1)) {
                                mouseover[i]['marker'].off("mouseover", mouseover[i]['event'], mouseover[i]['context']);
                                self.aMap.markersEvent.stationMarkersEvent.mouseover.splice(i, 1);
                                i--;
                            }
                        }
                    }
                    let mouseout = self.aMap.markersEvent.stationMarkersEvent.mouseout;
                    if (mouseout.length) {
                        for (let i = 0; i < mouseout.length; i++) {
                            if (!(linesArr.indexOf(mouseout[i]['line_code']) + 1)) {
                                mouseout[i]['marker'].off("mouseout", mouseout[i]['event'], mouseout[i]['context']);
                                self.aMap.markersEvent.stationMarkersEvent.mouseout.splice(i, 1);
                                i--;
                            }
                        }
                    }
                }
            }

            if (self.mapData.handleStatus) {
                        removeAll2();
                    } else {
                        let linesArr = self.lines.split(',');
                        if (self.mapData.mapState == 'change') {//只清除地图就行，不要去管临时覆盖物
                            removeAll2();
                        } else {
                            //只有在站点选择站点的时候才会有 2.3 全清
                            if (self.mapData.handleState == 1) {
                                //这里先不弄，后面自然会全部清除掉
                                // removeSeletePart2();
                            } else {
                                removeAll2();
                            }
                        }
                    }


        },
        //画公交线路及站点
        drivingBusLineStation: function () {
            this.drivingBusLineClear();
            this.drivingBusStationClearEvent();
            this.drivingBusStationClear();

            let self = this;
            let scaleBy = self.mapData.scaleBy;
            let scaleBy2 = self.mapData.scaleBy2;

            //走缓存
            let executeDataCache = function () {
                if(self.mapData.cache.lineCacheCall.length) {
                    /**************************************线路*************************************************/
                    let lineCacheCall = self.mapData.cache.lineCacheCall;
                    for (let j = 0; j < lineCacheCall.length; j++) {
                        let arr = lineCacheCall[j]['arr'];
                        let polylineArr = [];
                        for (let i = 0; i < arr.length; i++) {
                            let polyline = new AMap.Polyline({//绘制折线路径
                                map: self.map,
                                path: arr[i],
                                strokeColor: lineCacheCall[j]['color'],
                                strokeOpacity: 0.7,
                                strokeWeight: (4 * scaleBy),
                                strokeDasharray: [10, 5],
                                // showDir: true
                            });
                            polylineArr.push(polyline);
                        }
                        self.mapData.markersCache.lineCacheCallMarkers.push({
                            line_code: lineCacheCall[j]['line_code'],
                            color: lineCacheCall[j]['color'],
                            arr: polylineArr
                        });
                    }

                    /**************************************站点*************************************************/
                    let stationCache = self.mapData.cache.stationCache;
                    for (let j = 0; j < stationCache.length; j++) {
                        let lineStationTemp = [];
                        let lineArrStation = stationCache[j]['lineArrStation'];
                        for (let i = 0; i < lineArrStation.length; i++) {
                            //首先判断zhan'dai'n
                            let passengerNumScale = self.mapData.passengerNumScale;
                            let lineStationColor = lineArrStation[i]['color'];
                            let radius1 = 3 * scaleBy;    //半径,原定宽度6px
                            let radius2 = 0;
                            if (lineArrStation[i]['stationName'] == '公交停靠站' || lineArrStation[i]['stationName'] == '公交招呼站') {
                                radius2 = 6;
                            } else if (self.mapData.busyNum.indexOf(lineArrStation[i]['passenger_num']*1) + 1) {
                                radius2 = 0;
                            } else {
                                radius2 = 9 * (lineArrStation[i]['passenger_num']) / (passengerNumScale['num_max']) * scaleBy2;
                                radius2 = ~~(radius2 + (6 * scaleBy2));//取整  取值[3 - 12]
                            }
                            //外圆  和  内圆  （正负不同）
                            let radius2a = radius1 - radius2;
                            let marker = new AMap.Marker({ //添加自定义点标记
                                map: self.map,
                                position: lineArrStation[i]['latlng'],//基点位置
                                offset: new AMap.Pixel(0, 0),
                                draggable: false,  //是否可拖动
                                // content: '<div class="circle-marker" style= color:' + color1 + ';width:' + (14 * scaleBy) + 'px;height:' + (14 * scaleBy) + 'px;font-size:' + (14 * scaleBy) + 'px;line-height:' + (14 * scaleBy) + 'px;>●</div>'   //自定义点标记覆盖物内容
                                content: `<div class="circle-marker1"  style="width: ${2 * radius1}px;height: ${2 * radius1}px;background-color: ${lineStationColor};position: relative;left: ${-radius1}px;top: ${-radius1}px;">
                                        <div class="circle-marker2" style="width: ${2 * radius2}px;height: ${2 * radius2}px;border-color:${lineStationColor};position: absolute;left: ${radius2a}px;top: ${radius2a}px;animation-delay: ${~~(Math.random() * 1000)}ms">
                                        </div></div>`
                            });
                            // marker.setTitle('' + lineArrStation[i]['stationName']);
                            lineStationTemp.push(marker);//覆盖物

                            (function (i, j) {
                                //站点点击事件（循环注册事件）
                                marker.on("click", self.stationClick = function () {
                                    self.input5 = self.mapData.cache.stationCache[j]['lineArrStation'][i]['stationName'];
                                    self.inputId5 = self.mapData.cache.stationCache[j]['lineArrStation'][i]['standar_id'];
                                    self.initPageConfig(3);
                                }, self);
                                //将事件添加进全局数组,最后
                                self.aMap.markersEvent.stationMarkersEvent.click.push({
                                    line_code: self.mapData.cache.stationCache[j].line_code,
                                    marker: marker,
                                    event: self.stationClick,
                                    context: self
                                });
                                delete self.stationClick;//最后置空，由于数组里面有，js内存也不会清空它

                                //鼠标移近点标记时触发事件
                                marker.on("mouseover", self.stationMouseover = function () {
                                    marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                                        offset: new AMap.Pixel(-20, -(20+2*radius1)),//修改label相对于maker的位置
                                        content: "(" + self.mapData.cache.stationCache[j].line_name + ')' +
                                        self.mapData.cache.stationCache[j]['lineArrStation'][i]['stationName'] +
                                        '\t客流量：' + self.mapData.cache.stationCache[j]['lineArrStation'][i]['passenger_num']
                                    });
                                    marker.setzIndex(110);
                                    marker.setAnimation('AMAP_ANIMATION_BOUNCE');
                                }, self);
                                //将事件添加进全局数组,最后
                                self.aMap.markersEvent.stationMarkersEvent.mouseover.push({
                                    line_code: self.mapData.cache.stationCache[j].line_code,
                                    marker: marker,
                                    event: self.stationMouseover,
                                    context: self
                                });
                                delete self.stationMouseover;//最后置空，由于数组里面有，js内存也不会清空它

                                //鼠标移出点标记时触发事件
                                marker.on("mouseout", self.stationMouseout = function () {
                                    marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                                        offset: new AMap.Pixel(0, 0),//修改label相对于maker的位置
                                        content: ''
                                    });
                                    marker.setAnimation('AMAP_ANIMATION_NONE');
                                }, self);
                                //将事件添加进全局数组,最后
                                self.aMap.markersEvent.stationMarkersEvent.mouseout.push({
                                    line_code: self.mapData.cache.stationCache[j].line_code,
                                    marker: marker,
                                    event: self.stationMouseout,
                                    context: self
                                });
                                delete self.stationMouseout;//最后置空，由于数组里面有，js内存也不会清空它
                            })(i, j);
                        }
                        self.mapData.markersCache.stationCacheMarkers.push({
                            line_code: stationCache[j]['line_code'],
                            arr: lineStationTemp
                        })
                    }
                }
            }

            //走ajax数据
            let executeData = function () {
                if (self.mapData.lineStations.length) {
                    if(self.driving){
                        //调用clear()函数清除上一次结果，可以清除地图上绘制的路线以及路径文本结果
                        self.driving.clear();
                    }
                    // 构造路线导航类
                    self.driving = new AMap.Driving({
                        autoFitView: false,
                        policy: AMap.DrivingPolicy.LEAST_DISTANCE  //最短距离模式
                    });
                    // 设置画线路径
                    for (let j = 0; j < self.mapData.lineStations.length; j++) {


                        //判断线路颜色，1.最拥挤3条线路颜色，2.除3条线路外都用统一一种颜色处理
                        let lineStationColor = '';
                        let index = self.hotLinesArr.indexOf(self.mapData.lineStations[j].line_code);
                        if (index + 1) {
                            lineStationColor = commonData.colors[index];
                        } else {
                            lineStationColor = commonData.colors[3];
                        }

                        let linePolylineArr = [];
                        let drawPathArr = [];
                        //拆分成16个为一组的数组
                        let tempArr = commonMain.splitArr(self.mapData.lineStations[j].lineArr);
                        tempArr.forEach(function (item, index) {
                            // 根据起终点经纬度规划驾车导航路线
                            (function (j) { //闭包， 用于画线的(折线)
                                self.driving.search(item[0], item[item.length - 1], {waypoints: item},
                                    function (status, result) {
                                        //status为complete时，result为DrivingResult；
                                        if (status == 'complete') {
                                            //拼接节点坐标数组
                                            let steps = result.routes[0].steps;
                                            let drawPath = [];
                                            for (let ii = 0; ii < steps.length; ii++) {
                                                drawPath = drawPath.concat(steps[ii].path);
                                            }
                                            let polyline = new AMap.Polyline({//绘制折线路径
                                                map: self.map,
                                                path: drawPath,
                                                // strokeColor: commonData.colorData[j],
                                                strokeColor: lineStationColor,
                                                strokeOpacity: 0.7,
                                                strokeWeight: (4 * scaleBy),
                                                strokeDasharray: [10, 5],
                                                lineJoin: 'round',
                                                lineCap: 'round',
                                                // showDir: true
                                            });
                                            linePolylineArr.push(polyline);

                                            drawPathArr.push(drawPath);
                                        }
                                    }
                                );
                            })(j);
                        });
                        //存入ajax覆盖物，偏于清除
                        self.mapData.markers.linesMarkers.push({
                            line_code: self.mapData.lineStations[j].line_code,
                            arr: linePolylineArr,
                            color: lineStationColor
                        });
                        //得到缓存数据
                        self.mapData.cache.lineCacheCall.push({
                            line_code: self.mapData.lineStations[j].line_code,
                            arr: drawPathArr,
                            color: lineStationColor
                        });

                        /**************************************站点ajax*************************************************/
                        let lineArrStation = self.mapData.lineStations[j].lineArrStation;
                        let lineStationTemp = [];
                        for (let i = 0; i < lineArrStation.length; i++) {
                            let passengerNumScale = self.mapData.passengerNumScale;
                            let radius1 = 3 * scaleBy;    //半径,原定宽度6px
                            let radius2 = 0;
                            //将內div弄成0，就不会有放大圈
                            if (lineArrStation[i]['stationName'] == '公交停靠站' || lineArrStation[i]['stationName'] == '公交招呼站') {
                                radius2 = 6;
                            } else if (Boolean(self.mapData.busyNum.indexOf(lineArrStation[i]['passenger_num']*1) + 1)) {
                                radius2 = 0;
                            } else {
                                radius2 = 9 * (lineArrStation[i]['passenger_num']) / (passengerNumScale['num_max']) * scaleBy2;
                                radius2 = ~~(radius2 + (6 * scaleBy2));//取整  取值[6 - 12]
                            }
                            //外圆  和  内圆  （正负不同）
                            let radius2a = radius1 - radius2;
                            let marker = new AMap.Marker({ //添加自定义点标记
                                map: self.map,
                                position: lineArrStation[i]['latlng'],//基点位置
                                offset: new AMap.Pixel(0, 0),
                                draggable: false,  //是否可拖动
                                // content: '<div class="circle-marker" style= color:' + lineStationColor + ';width:' + (14 * scaleBy) + 'px;height:' + (14 * scaleBy) + 'px;font-size:' + (14 * scaleBy) + 'px;line-height:' + (14 * scaleBy) + 'px;>●</div>'   //自定义点标记覆盖物内容
                                content: `<div class="circle-marker1"  style="width: ${2 * radius1}px;height: ${2 * radius1}px;background-color: ${lineStationColor};position: relative;left: ${-radius1}px;top: ${-radius1}px;">
                                        <div class="circle-marker2" style="width: ${2 * radius2}px;height: ${2 * radius2}px;border-color:${lineStationColor};position: absolute;left: ${radius2a}px;top: ${radius2a}px;animation-delay: ${~~(Math.random() * 1000)}ms">
                                        </div></div>`
                            });
                            // marker.setTitle('' + lineArrStation[i]['stationName']);

                            lineStationTemp.push(marker);//覆盖物
                            //赋值颜色
                            lineArrStation[i]['color'] = lineStationColor;

                            (function (i, j) {
                                //站点点击事件（循环注册事件）
                                marker.on("click",  self.stationClick = function () {
                                    self.input5 = self.mapData.lineStations[j]['lineArrStation'][i]['stationName'];
                                    self.inputId5 = self.mapData.lineStations[j]['lineArrStation'][i]['standar_id'];
                                    self.initPageConfig(3);
                                }, self);
                                //将事件添加进全局数组,最后
                                self.aMap.markersEvent.stationMarkersEvent.click.push({
                                    line_code: self.mapData.lineStations[j].line_code,
                                    marker: marker,
                                    event: self.stationClick,
                                    context: self
                                });
                                delete self.stationClick;//最后置空，由于数组里面有，js内存也不会清空它

                                //鼠标移近点标记时触发事件
                                marker.on("mouseover", self.stationMouseover = function () {
                                    marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                                        offset: new AMap.Pixel(-20, -(20+2*radius1)),//修改label相对于maker的位置
                                        content: "(" + self.mapData.lineStations[j].line_name + ')' +
                                        self.mapData.lineStations[j].lineArrStation[i]['stationName'] +
                                        '\t客流量：' + self.mapData.lineStations[j].lineArrStation[i]['passenger_num']
                                    });
                                    marker.setzIndex(110);
                                    marker.setAnimation('AMAP_ANIMATION_BOUNCE');
                                }, self);
                                //将事件添加进全局数组,最后
                                self.aMap.markersEvent.stationMarkersEvent.mouseover.push({
                                    line_code: self.mapData.lineStations[j].line_code,
                                    marker: marker,
                                    event: self.stationMouseover,
                                    context: self
                                });
                                delete self.stationMouseover;//最后置空，由于数组里面有，js内存也不会清空它

                                //鼠标移出点标记时触发事件
                                marker.on("mouseout", self.stationMouseout = function () {
                                    marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                                        offset: new AMap.Pixel(0, 0),//修改label相对于maker的位置
                                        content: ''
                                    });
                                    marker.setzIndex(100);
                                    marker.setAnimation('AMAP_ANIMATION_NONE');
                                }, self);
                                //将事件添加进全局数组,最后
                                self.aMap.markersEvent.stationMarkersEvent.mouseout.push({
                                    line_code: self.mapData.lineStations[j].line_code,
                                    marker: marker,
                                    event: self.stationMouseout,
                                    context: self
                                });
                                delete self.stationMouseout;//最后置空，由于数组里面有，js内存也不会清空它

                            })(i, j);
                        }

                        self.mapData.markers.stationMarkers.push({//不能置空，这是存的此次数据，用于下一次清空
                            line_code: self.mapData.lineStations[j].line_code,
                            color: lineStationColor,
                            arr: lineStationTemp
                        })

                        //存入回调函数数组
                        self.mapData.cache.stationCache.push({
                            line_code: self.mapData.lineStations[j]['line_code'],
                            line_name: self.mapData.lineStations[j]['line_name'],
                            lineArrStation: self.mapData.lineStations[j]['lineArrStation']
                        });
                    }

                }
            }

            //判断状态是走ajax还是走缓存,还是都不走
            // 1.
            if (self.mapData.mapState == 'change'){
                executeDataCache();
            } else {
                // if(self.mapData.handleState == 1 && self.mapData.handleMapStatus) {
                //     // executeDataCache();
                //     executeData();
                // } else {
                    executeData();
                // }
            }
         },
        // 描起点的
        addStartPointMarker: function () {
            let self = this;
            let scaleBy = self.mapData.scaleBy;

            //(1).全部清除  removeAll
            let removeAll = function () {
                //1.ajax覆盖物及map
                if (self.mapData.markers.startPointMarkers.length) {
                    let startPointMarkers = self.mapData.markers.startPointMarkers;
                    for (let i = 0; i < startPointMarkers.length; i++) {
                        self.map.remove(startPointMarkers[i]['arr']);
                    }
                    self.mapData.markers.startPointMarkers = [];
                }
                //2.缓存数据
                self.mapData.cache.startPointCache = [];
                //3.缓存覆盖物及map
                if (self.mapData.markersCache.startPointCacheMarkers.length) {
                    let startPointCacheMarkers = self.mapData.markersCache.startPointCacheMarkers;
                    for (let i = 0; i < startPointCacheMarkers.length; i++) {
                        self.map.remove(startPointCacheMarkers[i]['arr']);
                    }
                    self.mapData.markersCache.startPointCacheMarkers = [];
                }
            }

            //(2).地图change清除 removeChangePart
            let removeChangePart = function () {
                //1.ajax覆盖物及map
                if (self.mapData.markers.startPointMarkers.length) {
                    let startPointMarkers = self.mapData.markers.startPointMarkers;
                    for (let i = 0; i < startPointMarkers.length; i++) {
                        self.map.remove(startPointMarkers[i]['arr']);
                    }
                    self.mapData.markers.startPointMarkers = [];
                }
                //2.缓存数据(不清)
                //3.缓存覆盖物及map
                if (self.mapData.markersCache.startPointCacheMarkers.length) {
                    let startPointCacheMarkers = self.mapData.markersCache.startPointCacheMarkers;
                    for (let i = 0; i < startPointCacheMarkers.length; i++) {
                        self.map.remove(startPointCacheMarkers[i]['arr']);
                    }
                    self.mapData.markersCache.startPointCacheMarkers = [];
                }
            }

            //(3).选择性清除 removeSeletePart
            let removeSeletePart = function () {
                let linesArr = self.lines.split(',');
                //选择线路，
                // 地图正常时， 1.ajax覆盖物及map （选择性清除） 2.缓存数据(选择性清除) 3.缓存覆盖物及map（没有）
                // 地图缩放时， 1.ajax覆盖物及map （没有） 2.缓存数据(选择性清除) 3.缓存覆盖物及map（选择性清除）
                //1.ajax覆盖物及map  （选择性清除）
                if (self.mapData.markers.startPointMarkers.length) {
                    let startPointMarkers = self.mapData.markers.startPointMarkers;
                    for (let i = 0; i < startPointMarkers.length; i++) {
                        //判断在 lines 里面有没有选择，没有就清除掉
                        if (!(Boolean(linesArr.indexOf(startPointMarkers[i]['line_code']) + 1) && self.kindChoose.toUpperCase() == startPointMarkers[i]['kind'].toUpperCase())) {
                            self.map.remove(startPointMarkers[i]['arr']);
                            self.mapData.markers.startPointMarkers.splice(i, 1);
                            i--;
                        }
                    }
                }
                //2.缓存数据
                if (self.mapData.cache.startPointCache.length) {
                    let startPointCache = self.mapData.cache.startPointCache;
                    for (let i = 0; i < startPointCache.length; i++) {
                        //判断在 lines 里面有没有选择，没有就清除掉
                        if (!(Boolean(linesArr.indexOf(startPointCache[i]['line_code']) + 1) && self.kindChoose.toUpperCase() == startPointCache[i]['kind'].toUpperCase())) {
                            self.mapData.cache.startPointCache.splice(i, 1);
                            i--;
                        }
                    }
                }
                //3.缓存覆盖物及map
                if (self.mapData.markersCache.startPointCacheMarkers.length) {
                    let startPointCacheMarkers = self.mapData.markersCache.startPointCacheMarkers;
                    for (let i = 0; i < startPointCacheMarkers.length; i++) {
                        //判断在 lines 里面有没有选择，没有就清除掉
                        if (!(Boolean(linesArr.indexOf(startPointCacheMarkers[i]['line_code']) + 1) && self.kindChoose.toUpperCase() == startPointCacheMarkers[i]['kind'].toUpperCase())) {
                            self.map.remove(startPointCacheMarkers[i]['arr']);
                            self.mapData.markersCache.startPointCacheMarkers.splice(i, 1);
                            i--;
                        }
                    }
                }
            }


            //描绘之前，先清除覆盖物,遍历之前先清除点
            if (self.mapData.handleStatus) {
                removeAll();
            } else {
                if (self.mapData.mapState == 'change') {
                    removeChangePart();
                } else {
                    //只有在站点选择站点的时候才会有 3 全清
                    if(self.mapData.handleState == 1) {
                        removeSeletePart();
                    } else {
                        removeAll();
                    }
                }
            }

            //走缓存
            let executeDataCache = function () {
                if (self.mapData.cache.startPointCache.length) {
                    let startPointCache = self.mapData.cache.startPointCache;
                    // 遍历对象
                    startPointCache.forEach(function (item, index) {
                        let startPointMarker = new AMap.Marker({
                            map: self.map,
                            position: item['latlng'],
                            icon: new AMap.Icon({
                                image: "../../res/xiangtan/images/startPoint.svg",
                                size: new AMap.Size(15 * scaleBy, 20 * scaleBy), // 图标大小
                                imageOffset: new AMap.Pixel(0, 0),
                                imageSize: new AMap.Size(15 * scaleBy, 20 * scaleBy)
                            }),
                            // 这里用/img/loc.png图片的left:一半;top:全部
                            offset: new AMap.Pixel(-(7.5 * scaleBy), -(20 * scaleBy))
                        });
                        startPointMarker.setTitle('' + item.line_name);

                        //存入覆盖物，偏于清除
                        self.mapData.markersCache.startPointCacheMarkers.push({
                            line_code: item.line_code,
                            kind: item.kind,
                            arr: startPointMarker
                        });
                    });
                }
            }

            //走ajax数据
            let executeData = function () {
                if (self.mapData.startEndPoint.startPoint.length) {
                    let startPoint = self.mapData.startEndPoint.startPoint;
                    // 遍历对象
                    startPoint.forEach(function (item, index) {
                        let startPointMarker = new AMap.Marker({
                            map: self.map,
                            position: item['latlng'],
                            icon: new AMap.Icon({
                                image: "../../res/xiangtan/images/startPoint.svg",
                                size: new AMap.Size(15 * scaleBy, 20 * scaleBy), // 图标大小
                                imageOffset: new AMap.Pixel(0, 0),
                                imageSize: new AMap.Size(15 * scaleBy, 20 * scaleBy)
                            }),
                            // 这里用/img/loc.png图片的left:一半;top:全部
                            offset: new AMap.Pixel(-(7.5 * scaleBy), -(20 * scaleBy))
                        });
                        startPointMarker.setTitle('' + item.line_name);

                        //存入覆盖物，偏于清除
                        self.mapData.markers.startPointMarkers.push({
                            line_code: item.line_code,
                            kind: item.kind,
                            arr: startPointMarker
                        });
                    });

                    //存入回调函数数组
                    self.mapData.cache.startPointCache.push(...self.mapData.startEndPoint.startPoint);
                }
            }

            //判断状态是走ajax还是走缓存,还是都不走
            if (self.mapData.mapState == 'change'){
                executeDataCache();
            } else {
                executeData();
            }

        },
        // 描终点的
        addEndPointMarker: function () {
            let self = this;
            let scaleBy = self.mapData.scaleBy;

            //(1).全部清除  removeAll
            let removeAll = function () {
                //1.ajax覆盖物及map
                if (self.mapData.markers.endPointMarkers.length) {
                    let endPointMarkers = self.mapData.markers.endPointMarkers;
                    for (let i = 0; i < endPointMarkers.length; i++) {
                        self.map.remove(endPointMarkers[i]['arr']);
                    }
                    self.mapData.markers.endPointMarkers = [];
                }
                //2.缓存数据
                self.mapData.cache.endPointCache = [];
                //3.缓存覆盖物及map
                if (self.mapData.markersCache.endPointCacheMarkers.length) {
                    let endPointCacheMarkers = self.mapData.markersCache.endPointCacheMarkers;
                    for (let i = 0; i < endPointCacheMarkers.length; i++) {
                        self.map.remove(endPointCacheMarkers[i]['arr']);
                    }
                    self.mapData.markersCache.endPointCacheMarkers = [];
                }
            }

            //(2).地图change清除 removeChangePart
            let removeChangePart = function () {
                //1.ajax覆盖物及map
                if (self.mapData.markers.endPointMarkers.length) {
                    let endPointMarkers = self.mapData.markers.endPointMarkers;
                    for (let i = 0; i < endPointMarkers.length; i++) {
                        self.map.remove(endPointMarkers[i]['arr']);
                    }
                    self.mapData.markers.endPointMarkers = [];
                }
                //2.缓存数据(不清)
                //3.缓存覆盖物及map
                if (self.mapData.markersCache.endPointCacheMarkers.length) {
                    let endPointCacheMarkers = self.mapData.markersCache.endPointCacheMarkers;
                    for (let i = 0; i < endPointCacheMarkers.length; i++) {
                        self.map.remove(endPointCacheMarkers[i]['arr']);
                    }
                }
            }

            //(3).选择性清除 removeSeletePart
            let removeSeletePart = function () {
                let linesArr = self.lines.split(',');
                //1.ajax覆盖物及map （选择性清除）
                if (self.mapData.markers.endPointMarkers.length) {
                    let endPointMarkers = self.mapData.markers.endPointMarkers;
                    for (let i = 0; i < endPointMarkers.length; i++) {
                        //判断在 lines 里面有没有选择，没有就清除掉
                        if (!(Boolean(linesArr.indexOf(endPointMarkers[i]['line_code']) + 1) && self.kindChoose.toUpperCase() == endPointMarkers[i]['kind'].toUpperCase())) {
                            self.map.remove(endPointMarkers[i]['arr']);
                            self.mapData.markers.endPointMarkers.splice(i, 1);
                            i--;
                        }
                    }
                }
                //2.缓存数据(选择性清除)
                if (self.mapData.cache.endPointCache.length) {
                    let endPointCache = self.mapData.cache.endPointCache;
                    for (let i = 0; i < endPointCache.length; i++) {
                        //判断在 lines 里面有没有选择，没有就清除掉
                        if (!(Boolean(linesArr.indexOf(endPointCache[i]['line_code']) + 1) && self.kindChoose.toUpperCase() == endPointCache[i]['kind'].toUpperCase())) {
                            self.mapData.cache.endPointCache.splice(i, 1);
                            i--;
                        }
                    }
                }
                // 3.缓存覆盖物及map(选择性清除)
                if (self.mapData.markersCache.endPointCacheMarkers.length) {
                    let endPointCacheMarkers = self.mapData.markersCache.endPointCacheMarkers;
                    for (let i = 0; i < endPointCacheMarkers.length; i++) {
                        //判断在 lines 里面有没有选择，没有就清除掉
                        if (!(Boolean(linesArr.indexOf(endPointCacheMarkers[i]['line_code']) + 1) && self.kindChoose.toUpperCase() == endPointCacheMarkers[i]['kind'].toUpperCase())) {
                            self.map.remove(endPointCacheMarkers[i]['arr']);
                            self.mapData.markersCache.endPointCacheMarkers.splice(i, 1);
                            i--;
                        }
                    }
                }
            }

            //描绘之前，先清除覆盖物,遍历之前先清除点
            if (self.mapData.handleStatus) {
                removeAll();
            } else {
                if (self.mapData.mapState == 'change') {
                    removeChangePart();
                } else {
                    //只有在站点选择站点的时候才会有 3 全清
                    if(self.mapData.handleState == 1) {
                        removeSeletePart();
                    } else {
                        removeAll();
                    }
                }
            }

            //走缓存
            let executeDataCache = function () {
                if (self.mapData.cache.endPointCache.length) {
                    let endPointCache = self.mapData.cache.endPointCache;
                    // 遍历对象
                    endPointCache.forEach(function (item, index) {
                        let endPointMarker = new AMap.Marker({
                            map: self.map,
                            position: item['latlng'],
                            icon: new AMap.Icon({
                                image: "../../res/xiangtan/images/endPoint.svg",
                                size: new AMap.Size(15 * scaleBy, 20 * scaleBy), // 图标大小
                                imageOffset: new AMap.Pixel(0, 0),
                                imageSize: new AMap.Size(15 * scaleBy, 20 * scaleBy)
                            }),
                            // 这里用/img/loc.png图片的left:一半;top:全部
                            offset: new AMap.Pixel(-(7.5 * scaleBy), -(20 * scaleBy))
                        });
                        endPointMarker.setTitle('' + item.line_name);

                        //存入覆盖物，偏于清除
                        self.mapData.markersCache.endPointCacheMarkers.push({
                            line_code: item.line_code,
                            kind: item.kind,
                            arr: endPointMarker
                        });
                    });
                }
            }

            //走ajax数据
            let executeData = function () {
                if (self.mapData.startEndPoint.endPoint.length) {
                    let endPoint = self.mapData.startEndPoint.endPoint;
                    // 遍历对象
                    for (let i = 0; i < endPoint.length; i++) {
                        let endPointMarker = new AMap.Marker({
                            map: self.map,
                            position: endPoint[i]['latlng'],
                            icon: new AMap.Icon({
                                image: "../../res/xiangtan/images/endPoint.svg",
                                size: new AMap.Size(15 * scaleBy, 20 * scaleBy), // 图标大小
                                imageOffset: new AMap.Pixel(0, 0),
                                imageSize: new AMap.Size(15 * scaleBy, 20 * scaleBy)
                            }),
                            // 这里用/img/loc.png图片的left:一半;top:全部
                            offset: new AMap.Pixel(-(7.5 * scaleBy), -(20 * scaleBy))
                        });
                        endPointMarker.setTitle('' + endPoint[i]['line_name']);

                        //存入覆盖物，偏于下一次清除
                        self.mapData.markers.endPointMarkers.push({
                            line_code: endPoint[i]['line_code'],
                            kind: endPoint[i]['kind'],
                            arr: endPointMarker
                        });
                    }
                    //存入回调函数数组
                    self.mapData.cache.endPointCache.push(...self.mapData.startEndPoint.endPoint);
                }
            }

            //判断状态是走ajax还是走缓存,还是都不走
            if (self.mapData.mapState == 'change'){
                executeDataCache();
            } else {
                executeData();
            }
        },
        // 描公交在地图线路上线路上的
        addBusOnMapMarkerClear: function () {
            let self = this;
            let scaleBy = self.mapData.scaleBy;

            //(1).全部清除  removeAll
            let removeAll = function () {
                //1.ajax覆盖物及map
                if (self.mapData.markers.busOnMapMarkers.length) {
                    let busOnMapMarkers = self.mapData.markers.busOnMapMarkers;
                    for (let i = 0; i < busOnMapMarkers.length; i++) {
                        self.map.remove(busOnMapMarkers[i]['arr']);
                    }
                    self.mapData.markers.busOnMapMarkers = [];
                }
                //2.缓存数据
                self.mapData.cache.busOnMapCache = [];
                //3.缓存覆盖物及map
                if (self.mapData.markersCache.busOnMapCacheMarkers.length) {
                    let busOnMapCacheMarkers = self.mapData.markersCache.busOnMapCacheMarkers;
                    for (let i = 0; i < busOnMapCacheMarkers.length; i++) {
                        self.map.remove(busOnMapCacheMarkers[i]['arr']);
                    }
                    self.mapData.markersCache.busOnMapCacheMarkers = [];
                }
            }

            //(2).地图change清除 removeChangePart
            let removeChangePart = function () {
                //1.ajax覆盖物及map
                if (self.mapData.markers.busOnMapMarkers.length) {
                    let busOnMapMarkers = self.mapData.markers.busOnMapMarkers;
                    for (let i = 0; i < busOnMapMarkers.length; i++) {
                        self.map.remove(busOnMapMarkers[i]['arr']);
                    }
                    self.mapData.markers.busOnMapMarkers = [];
                }
                //2.缓存数据(不清)
                //3.缓存覆盖物及map
                if (self.mapData.markersCache.busOnMapCacheMarkers.length) {
                    let busOnMapCacheMarkers = self.mapData.markersCache.busOnMapCacheMarkers;
                    for (let i = 0; i < busOnMapCacheMarkers.length; i++) {
                        self.map.remove(busOnMapCacheMarkers[i]['arr']);
                    }
                }
            }

            //(3).选择性清除 removeSeletePart
            let removeSeletePart = function () {
                let linesArr = self.lines.split(',');
                //1.ajax覆盖物及map （选择性清除）
                if (self.mapData.markers.busOnMapMarkers.length) {
                    let busOnMapMarkers = self.mapData.markers.busOnMapMarkers;
                    for (let i = 0; i < busOnMapMarkers.length; i++) {
                        //判断在 lines 里面有没有选择，没有就清除掉
                        if (!(Boolean(linesArr.indexOf(busOnMapMarkers[i]['line_code']) + 1) && self.kindChoose.toUpperCase() == busOnMapMarkers[i]['kind'].toUpperCase())) {
                            self.map.remove(busOnMapMarkers[i]['arr']);
                            self.mapData.markers.busOnMapMarkers.splice(i, 1);
                            i--;
                        }
                    }
                }
                //2.缓存数据(选择性清除)
                if (self.mapData.cache.busOnMapCache.length) {
                    let busOnMapCache = self.mapData.cache.busOnMapCache;
                    for (let i = 0; i < busOnMapCache.length; i++) {
                        //判断在 lines 里面有没有选择，没有就清除掉
                        if (!(Boolean(linesArr.indexOf(busOnMapCache[i]['line_code']) + 1) && self.kindChoose.toUpperCase() == busOnMapCache[i]['kind'].toUpperCase())) {
                            self.mapData.cache.busOnMapCache.splice(i, 1);
                            i--;
                        }
                    }
                }
                // 3.缓存覆盖物及map(选择性清除)
                if (self.mapData.markersCache.busOnMapCacheMarkers.length) {
                    let busOnMapCacheMarkers = self.mapData.markersCache.busOnMapCacheMarkers;
                    for (let i = 0; i < busOnMapCacheMarkers.length; i++) {
                        //判断在 lines 里面有没有选择，没有就清除掉
                        if (!(Boolean(linesArr.indexOf(busOnMapCacheMarkers[i]['line_code']) + 1) && self.kindChoose.toUpperCase() == busOnMapCacheMarkers[i]['kind'].toUpperCase())) {
                            self.map.remove(busOnMapCacheMarkers[i]['arr']);
                            self.mapData.markersCache.busOnMapCacheMarkers.splice(i, 1);
                            i--;
                        }
                    }
                }
            }

            //描绘之前，先清除覆盖物,遍历之前先清除点
            if (self.mapData.handleStatus) {
                removeAll();
            } else {
                if (self.mapData.mapState == 'change') {
                    removeChangePart();
                } else {
                    //只有在站点选择站点的时候才会有 3 全清
                    if(self.mapData.handleState == 1) {
                        removeSeletePart();
                    } else {
                        removeAll();
                    }
                }
            }
        },
        addBusOnMapMarker: function () {
            let self = this;
            let scaleBy = self.mapData.scaleBy;

            //走缓存
            let executeDataCache = function () {
                if (self.mapData.cache.busOnMapCache.length) {
                    let busOnMapCache = self.mapData.cache.busOnMapCache;
                    // 遍历对象
                    busOnMapCache.forEach(function (item, index) {
                        let busOnMapMarker = new AMap.Marker({
                            map: self.map,
                            title: item['car_no'],
                            position: [item['lng'], item['lat']],
                            icon: new AMap.Icon({
                                image: "../../res/xiangtan/images/bus4.png",
                                size: new AMap.Size(10 * scaleBy, 10 * scaleBy), // 图标大小
                                imageOffset: new AMap.Pixel(0, 0),
                                imageSize: new AMap.Size(10 * scaleBy, 10 * scaleBy)
                            }),
                            // 这里用/img/loc.png图片的left:一半;top:一半
                            offset: new AMap.Pixel(-(5 * scaleBy), -(5 * scaleBy)),
                            zIndex: 150
                        });

                        //存入覆盖物，偏于清除
                        self.mapData.markersCache.busOnMapCacheMarkers.push({
                            line_code: item.line_code,
                            kind: item.kind,
                            arr: busOnMapMarker
                        });
                    });
                }
            }

            //走ajax数据
            let executeData = function () {
                if (self.mapData.busOnMap.length) {
                    let busOnMap = self.mapData.busOnMap;
                    // 遍历对象
                    for (let i = 0; i < busOnMap.length; i++) {
                        let busOnMapMarker = new AMap.Marker({
                            map: self.map,
                            title: busOnMap[i]['car_no'],
                            position: [busOnMap[i]['lng'] * 1 ,busOnMap[i]['lat'] * 1],
                            icon: new AMap.Icon({
                                image: "../../res/xiangtan/images/bus4.png",
                                size: new AMap.Size(10 * scaleBy, 10 * scaleBy), // 图标大小
                                imageOffset: new AMap.Pixel(0, 0),
                                imageSize: new AMap.Size(10 * scaleBy, 10 * scaleBy)
                            }),
                            // 这里用/img/loc.png图片的left:一半;top:一半
                            offset: new AMap.Pixel(-(5 * scaleBy), -(5 * scaleBy)),
                            zIndex: 150
                        });
                        // endPointMarker.setTitle('' + endPoint[i]['line_name']);

                        //存入覆盖物，偏于下一次清除
                        self.mapData.markers.busOnMapMarkers.push({
                            line_code: busOnMap[i]['line_code'],
                            kind: busOnMap[i]['direct'],
                            arr: busOnMapMarker
                        });
                    }
                    //存入回调函数数组
                    self.mapData.cache.busOnMapCache.push(...self.mapData.busOnMap);
                }
            }

            //判断状态是走ajax还是走缓存,还是都不走
            if (self.mapData.mapState == 'change'){
                executeDataCache();
            } else {
                executeData();
            }
        },
        //地图注册事件
        initMapEventLietener: function () {
            let self = this;
            //地图点击事件
           this.map.on('click', self.aMap.event.click = function(e) {
        	   self.$refs.complete.close();
            }, self);
            //地图缩放事件
            this.map.on("zoomchange", self.aMap.event.zoomchange = function () {
                self.mapData.mapState = 'change';
                // self.mapData.handleMapStatus = true;
                self.sureHandleStateStatus(self.mapData.handleState);
                self.mapData.scaleBy = Math.pow(1.2, (self.map.getZoom() - 13));
                self.mapData.scaleBy2 = Math.pow(1.8, (self.map.getZoom() - 13));
                if(self.mapData.handleState == 2) {
                    self.addBusOnMapMarkerClear();
                    self.addBusOnMapMarker();
                }
                self.addStartPointMarker(); // 描起点的
                self.addEndPointMarker(); // 描起点的
                self.drivingBusLineStation()
                self.addBusyMarker();//添加拥挤坐标点
                self.drawODArrowLine();//画箭头线（od交换线）
                self.mapData.mapState = 'normal';
            }, self);
            //地图停止拖拽地图事件
            this.map.on("dragend",  self.aMap.event.dragend = function () {
                self.mapData.mapState = 'dragend';
                self.drawODArrowLine();//画箭头线（od交换线）
                self.mapData.mapState = 'normal';
            }, self);
        },
        distroyMapEventLietener: function(){
            let self = this;
            if(self.aMap.event) {
                //地图点击事件
                self.map.off('click', self.aMap.event.click, self);
                //地图缩放事件
                self.map.off("zoomchange", self.aMap.event.zoomchange, self);
                //地图停止拖拽地图事件
                self.map.off("dragend",  self.aMap.event.dragend, self);
            }
        },
        //定时器的使用
        // 1.初始化线路，和选择线路
        setTimerInit: function () {/* 设置定时器  */
            let self = this;
            if (!self.timerInit) {
                self.timerInit = setInterval(() => {
                    self.selectInfoIntime("info");
                }, 60 * 1000);
            }
            if (!self.timerOdInit) {
                self.timerOdInit = setInterval(() => {
                    self.selectInfoIntime("odInfo");
                }, 10 * 60 * 1000);
            }
        },
        distroyedTimerInit: function () { /*  清除定时器  */
            let self = this;
            if (self.timerInit) {
                clearInterval(self.timerInit);
                self.timerInit = null;
            }
            if (self.timerOdInit) {
                clearInterval(self.timerOdInit);
                self.timerOdInit = null;
            }
        },
        // 2.搜索线路
        setTimer: function () {/* 设置定时器  */
            let self = this;
            //保证定时器的唯一
            if (!self.timer) {
                self.timer = setInterval(() => {
                    self.selectInfoByLineCodeIntime("infoLine");
                }, 60 * 1000);
            }
            if (!self.timerOd) {
                self.timerOd = setInterval(() => {
                    self.selectInfoByLineCodeIntime("odInfoLine");
                }, 10 * 60 * 1000);
            }
            if (!self.timerCarInfo) {
                self.timerCarInfo = setInterval(() => {
                    self.selectInfoByLineCodeIntime("carInfo");
                }, 10 * 1000);
            }
        },
        distroyedTimer: function () { /*  清除定时器  */
            let self = this;
            if (self.timer) {
                clearInterval(self.timer);
                self.timer = null;
            }
            if (self.timerOd) {
                clearInterval(self.timerOd);
                self.timerOd = null;
            }
            if (self.timerCarInfo) {
                clearInterval(self.timerCarInfo);
                self.timerCarInfo = null;
            }
        },
        // 3.搜索站点
        setTimerStation: function () {/* 设置定时器  */
            let self = this;
            if (!self.timerStation) {
                self.timerStation = setInterval(() => {
                    self.selectInfoByStationIntime("infoStation");
                }, 60 * 1000);
            }
            if (!self.timerStationOd) {
                self.timerStationOd = setInterval(() => {
                    self.selectInfoByStationIntime("infoOdStation");
                }, 60 * 10 * 1000);
            }
        },
        distroyedTimerStation: function () { /*  清除定时器  */
            let self = this;
            if (self.timerStation) {
                clearInterval(self.timerStation);
                self.timerStation = null;
            }
            if (self.timerStationOd) {
                clearInterval(self.timerStationOd);
                self.timerStationOd = null;
            }
        },
        //判断 操作码handleState 变化然后更新 操作状态handleStatus
        sureHandleStateStatus: function (state) {
            let self = this;
            //操作码没变，状态false
            if (state == self.mapData.handleState) {
                self.mapData.handleStatus = false;
            } else {
                self.mapData.handleStatus = true;
            }
            //最后才赋值操作状态
            this.mapData.handleState = state;

        },
        // 进入 公交运行页面 获得所有信息（高德地图，及图标）
        initPageConfig: function (state) {
            //1.选择线路,初始化进入   1
            //2.搜索线路   2
            //3.搜索站点   3
            let self = this;
            /* 公共 start */
            //线路状态变化重置map为13
            if (self.mapData.handleStatus) {
                self.map.setZoom(13);
            }
            this.sureHandleStateStatus(state)//1.确定操作状态 2.确定操作状态是否变化
            /* 公共 end */
            let handleState = self.mapData.handleState;//操作状态
            //只有初始化的时候执行一次
            if (handleState == 0) {
                //点击不同的时候这个页面窗口的打开关闭
                self.stationResult2_1 = false;
                self.stationResult2_2 = false;
                self.rightContainer = true;
                self.realTimeLine = false;

                self.setTimerInit();

                self.input5 = '';
                self.inputCode5 = '';
                self.inputId5 = '';
                self.inputFtl5 = '';
                self.kindChoose = 'UP';//置线路方向为正UP

                self.getHotLinesMap();// 获得高德地图数据
                self.selectInfo();// 获得图标数据

                self.$nextTick(function () {
                    self.initKylbhqsChart();
                });

                self.mapData.handleState = 1;
            } else if (handleState == 1) {
                //代表在选择线路状态,会 return
                if(!self.mapData.handleStatus) {
                    self.$refs.complete.close();//关闭搜索框
                    self.chooseGaodeLines();// 获得高德地图数据
                    return;
                }

                //点击不同的时候这个页面窗口的打开关闭
                self.stationResult2_1 = false;
                self.stationResult2_2 = false;
                self.rightContainer = true;
                self.realTimeLine = false;

                self.$refs.complete.close();//关闭搜索框
                //清除定时器
                self.distroyedTimer();  //2.搜索站点
                self.distroyedTimerStation();  // 3.搜索站点
                self.setTimerInit();

                self.input5 = '';
                self.inputCode5 = '';
                self.inputId5 = '';
                self.inputFtl5 = '';
                self.kindChoose = 'UP';//置线路方向为正UP

                self.addBusOnMapMarkerClear(); // 描线上车辆
                self.selectGaodeInfo1();// 获得高德地图数据
                self.selectInfo();// 获得图标数据

                self.$nextTick(function () {
                    self.initKylbhqsChart();
                });
            } else if (handleState == 2) {  //搜索线路（包括切换方向的正向反向）.以及点击线路 2
                self.stationResult2_1 = false;
                self.stationResult2_2 = true;
                self.rightContainer = false;
                self.realTimeLine = true;

                self.$refs.complete.close();//关闭搜索框
                //清除定时器
                self.distroyedTimerInit();  // 1.初始化和选择线路
                self.distroyedTimerStation();  // 3.搜索站点
                self.setTimer();

                self.inputId5 = '';
                self.inputFtl5 = JSON.parse(JSON.stringify(self.input5));
                self.lines = '';
                self.linesDif = '';

                self.checkboxGroup = []; //清除多选框的值
                lastCheckedBox = [];

                self.selectGaodeInfo2();
                self.selectInfoByLineCode();
                self.$nextTick(function () {
                    self.initKlljkChart();
                });
            } else if (handleState == 3) {// 搜索站点3
                self.stationResult2_1 = true;
                self.stationResult2_2 = false;
                self.rightContainer = false;
                self.realTimeLine = false;

                self.$refs.complete.close();//关闭搜索框

                //清除定时器
                self.distroyedTimerInit();
                self.distroyedTimer();

                self.inputFtl5 = JSON.parse(JSON.stringify(self.input5));
                self.linesDif = '';
                self.kindChoose = 'UP';//置线路方向为正UP

                self.checkboxGroup = []; //清除多选框的值
                lastCheckedBox = [];

                self.placeholderSearch = '全网线路概览';
                self.changeIcon();//在地图点击站点的时候收起选择框

                self.addBusOnMapMarkerClear(); // 描线上车辆
                self.selectGaodeByStation();//先更新此站点所在的线路;1.查询高德数据;2.查询图表数据
                // self.getWayLinesByStation();//先更新此站点所在的线路;1.查询高德数据;2.查询图表数据

                self.$nextTick(function () {
                    self.initSdklljkChart();
                });
            }
        },

        //处理data数据中心  data数据处理中心（一般用于一些需要重复利用数据）
        dealDataVue: function(msg, data) {
    	    let self = this;
    	    //if('passengerNumScale' == msg){}
            if('citybusLineStationByLine' == msg) {
                self.mapData.lineStations = [];//置空
                if (data && data.length) {
                    // 第一部分数据:获得线路以及所有站点(根据line，默认取up)
                    commonMain.groupJs(data).forEach(function (item, index) {
                        let lineArr = [];
                        let lineArrStation = [];//站点及名称
                        item.data.forEach(function (item2, index2) {
                            let latlng = [];
                            latlng.push(item2.lng);
                            latlng.push(item2.lat);
                            lineArr.push(latlng);
                            lineArrStation.push({
                                latlng: latlng,
                                stationName: item2['station_name'],
                                standar_id: item2['standar_id'],
                                stationCodeName: item2['standar_name'],
                                passenger_num: item2.passenger_num,
                            });
                        });
                        //赋值给全局变量
                        self.mapData.lineStations.push({
                            kind: item.kind,
                            line_code: item.line_code,
                            line_name: item.line_name,
                            lineArr: lineArr,
                            lineArrStation: lineArrStation
                        });
                    });
                }
            }

            if('busOnMap' == msg) {
                self.mapData.busOnMap = [];//置空
                if (data && data.length) {
                   self.mapData.busOnMap = data;
                }
            }

            if('passengerNumScale' == msg) {
                if (data) {
                    self.mapData.passengerNumScale = null;//置空
                    self.mapData.passengerNumScale = data;
                }
            }

            if('citybusLineStartEndStation' == msg){
                self.mapData.startEndPoint.startPoint = [];//先清除，这真是一个坑爹地方
                self.mapData.startEndPoint.endPoint = [];//先清除
                if (data && data['firstStation'] && data['firstStation'].length) {
                    /* 获得所有起点和终点 */
                    data['firstStation'].forEach(function (item, index) {
                        let latlng = [];
                        latlng.push(item.lng);
                        latlng.push(item.lat);
                        self.mapData.startEndPoint.startPoint.push({
                            line_code: item['line_code'],
                            line_name: item['line_name'],
                            kind: item.kind,
                            latlng: latlng
                        });
                    });
                }
                if (data && data['lastStation'] && data['lastStation'].length) {
                    data['lastStation'].forEach(function (item, index) {
                        let latlng = [];
                        latlng.push(item.lng);
                        latlng.push(item.lat);
                        self.mapData.startEndPoint.endPoint.push({
                            line_code: item['line_code'],
                            line_name: item['line_name'],
                            kind: item.kind,
                            latlng: latlng
                        });
                    });
                }
            }

            if('busOd' == msg){
                self.mapData.od = [];// 置空
                self.mapData.odPoints = [];
                self.mapData.odPointNames = [];
                self.mapData.odNum = [];
                if (data && data.length) {
                    // 第三部分数据： 获得公交车od
                    data.forEach(function (item1, index1) {
                        let od = [];
                        let latlng1 = [];
                        latlng1.push(item1['od_info']['o_lng']);
                        latlng1.push(item1['od_info']['o_lat']);
                        od.push(latlng1);
                        let latlng2 = [];
                        latlng2.push(item1['od_info']['d_lng']);
                        latlng2.push(item1['od_info']['d_lat']);
                        od.push(latlng2)
                        self.mapData.od.push({od: od});
                        self.mapData.odPoints.push(latlng1);
                        self.mapData.odPoints.push(latlng2);
                        self.mapData.odPointNames.push({
                            station_name: item1['o_station_name'],
                            latlng: latlng1
                        });
                        self.mapData.odPointNames.push({
                            station_name: item1['d_station_name'],
                            latlng: latlng2
                        });
                        self.mapData.odNum.push({
                            o: latlng1,
                            o_name: item1['od_info']['o_station_name'],
                            d: latlng2,
                            d_name: item1['od_info']['d_station_name'],
                            num: item1['od_num_sum']
                        });
                    });
                }
            }

            if('busyBusByLine' == msg){
                self.mapData.busyPoints = [];       //先置零
                self.mapData.busyNum = [];       //先置零
                if (data && data.length) {
                    // 第四部分数据：获得拥挤坐标点
                    data.forEach(function (item1, index1) {
                        let latlng1 = [];
                        latlng1.push(item1.lng);
                        latlng1.push(item1.lat);
                        self.mapData.busyPoints.push({
                            stationName: item1.station_name,
                            passengerNum: item1.passenger_num,
                            latlng: latlng1
                        });
                        self.mapData.busyNum.push(item1.passenger_num);
                    });
                }
            }

            if('from' == msg){
                self.from['busCount'] = data['busCount'];
                self.from['busAllCount'] = data['busAllCount'];
                let busRode = (data['busCount'] / data['busAllCount']) * 100;
                self.from['busRode'] = busRode.toFixed(1) + '%';
                self.from['passengerNum'] = data['passenger_num'];
                self.from['passengerCard'] = data['passenger_card'];
            }

            if('passenger24' == msg){
                let m = new Map();
                let arr = [];
                data.forEach(function (item, index) {
                    arr.push(parseInt(item['collect_hour']));
                    m.set(item['collect_hour'], parseInt(item['passenger_num']));
                });
                self.echartData.kylbhqs = {hours: arr, hourNums: m};
            }

            if('fromLine' == msg){
                if(data) {
                    //1.客流量
                    self.fromLine['passengerNum'] = data['passenger_num'];
                    //2.获得在线车辆数
                    self.fromLine['busOnline'] = data['busOnline'];
                    //3.投币量/刷卡量
                    self.fromLine['cardCash'] = data['passenger_cash'] + '/' + data['passenger_card'];
                    //4.获得24小时
                    let m = new Map();
                    let arr = [];
                    data['capacityBylineCode'].forEach(function (item, index) {
                        arr.push(parseInt(item['collect_hour']));
                        m.set(item['collect_hour'], parseInt(item['passenger_num']));
                    });
                    self.fromLine['seriesData'] = {hours: arr, hourNums: m};
                    //5.获得线路基本信息
                    self.fromLine['lineMessage'] = data['lineMessage'][0];
                    //5.获得当前线路总车辆数
                    self.fromLine['busStationByLine'] = data['busStationByLine'];
                    //5.获得线路平均速度
                    self.fromLine['lineAvg'] = data['lineAvg'];
                    //6.获得在线公交
                    self.fromLine['intimeBusStation'] = data['stationBylineCode'];
                    //7.获得所有公交站点
                    self.fromLine['lineStationList'] = data['stationBylineCode'];
                }
            }

            if('fromLineIntime' == msg){
                if(data) {
                    //1.客流量
                    self.fromLine['passengerNum'] = data['passenger_num'];
                    //3.投币量/刷卡量
                    self.fromLine['cardCash'] = data['passenger_cash'] + '/' + data['passenger_card'];
                    //4.获得24小时
                    let m = new Map();
                    let arr = [];
                    data['capacityBylineCode'].forEach(function (item, index) {
                        arr.push(parseInt(item['collect_hour']));
                        m.set(item['collect_hour'], parseInt(item['passenger_num']));
                    });
                    self.fromLine['seriesData'] = {hours: arr, hourNums: m};
                    //5.获得线路平均速度
                    self.fromLine['lineAvg'] = data['lineAvg'];
                }
            }

            if('carInfoIntime' == msg){
                if(data) {
                    //2.获得在线车辆数
                    self.fromLine['busOnline'] = data['busOnline'];
                    //6.获得在线公交7.获得所有公交站点
                    self.fromLine['intimeBusStation'] = data['stationBylineCode'];
                }
            }

            if('lineByStation' == msg){
                if (data['lineByStation'].length) {
                    let differenceABSet = commonMain.getSubtract(data['lineByStation'], data['top3Lines'], 'line_code');
                    self.stationEchart.lineList = differenceABSet;
                    self.stationEchart.top3Lines = data['top3Lines'];
                } else {
                    self.stationEchart.lineList = [];
                    self.stationEchart.top3Lines = data['top3Lines'];
                }
            }

            if('busOdByStation' == msg){
                if (data && data.length) {
                    //2.od的top
                    let busOdByStation = data;
                    let odArray = [];
                    busOdByStation.forEach(function (item, index) {
                        let temp = {};
                        temp['index'] = index + 1;
                        if(self.input5 == item['station_name1']) {
                            temp['station_name2'] = item['station_name2'];
                        } else {
                            temp['station_name2'] = item['station_name1'];
                        }
                        temp['od_num'] = item['od_num_sum'];
                        odArray.push(temp);
                    })
                    self.stationEchart.odArray = odArray;
                } else {
                    self.stationEchart.odArray = [];
                }
            }


            if('capacityByStation' == msg){
                if (data && data.length) {
                    //3.24小时交换量
                    let m = new Map();
                    let arr = [];
                    data.forEach(function (item, index) {
                        arr.push(parseInt(item['collect_hour']));
                        m.set(item['collect_hour'], parseInt(item['passenger_num']));
                    });
                    self.echartData.sdklljkData = {hours: arr, hourNums: m};
                }
            }
        },

        //----------------------------------------数据请求操作-------------------------------------//
        //获得所有线路信息
        getAllLines: function () {
            let self = this;
            axios.post(this.contextPath + "/intimeBus/getAllLines").then(function (result) {
                let data = result.data;
                let busyline = [];//热门线路(line_code)
                let temphotLine = [];//热门线路(line_code, line_name)
                data.slice(0, 3).map(function (item) {
                    temphotLine.push({
                        hotLineNum: item.line_code,
                        hotLineName: item.line_name
                    });
                    busyline.push(item.line_code);
                });
                self.linesDif = busyline.join();//拼接成字符串，赋值给搜索条件
                self.lines = busyline.join();//拼接成字符串，赋值给搜索条件
                self.hotLines = JSON.parse(JSON.stringify(temphotLine));
                self.hotLinesArr = JSON.parse(JSON.stringify(busyline));
                let templine = [];//普通线路(line_code, line_name)
                data.slice(3).map(function (item) {
                    templine.push({
                        lineNum: item.line_code,
                        lineName: item.line_name
                    });
                });
                self.poorLines = JSON.parse(JSON.stringify(templine));
            }.bind(this));
        },
        //初始化时：获得热门线路信息
        getHotLines: function () {
            let self = this;
            axios.post(this.contextPath + "/intimeBus/getHotLines").then(function (result) {
                let data = result.data;
                let busyline = [];//热门线路(line_code)
                data.slice(0, 3).map(function (item) {
                    busyline.push(item.line_code);
                });
                self.linesDif = busyline.join();//拼接成字符串，赋值给搜索条件
                self.lines = JSON.parse(JSON.stringify(busyline.join()));;//拼接成字符串，赋值给搜索条件
                self.hotLinesArr = JSON.parse(JSON.stringify(busyline));

                self.checkboxGroup = busyline; //改变默认多选框的值
                lastCheckedBox = self.checkboxGroup;//存入上一次多选框的值

                self.initPageConfig(1);
            }.bind(this));
        },
        // 进入 公交运行页面 获得所有信息（高德地图）
        getHotLinesMap: function () {
            let self = this;
            let url = self.contextPath + "/intimeBus/getHotLinesMap";
            axios.get(url).then(function (result) {
                let data = result.data;
                let hotLines = data['hotLines'];
                let busyline = [];//热门线路(line_code)
                hotLines.slice(0, 3).forEach(function (item) {
                    busyline.push(item.line_code);
                });
                self.linesDif = busyline.join();//拼接成字符串，赋值给搜索条件
                self.lines = JSON.parse(JSON.stringify(busyline.join()));;//拼接成字符串，赋值给搜索条件
                self.hotLinesArr = JSON.parse(JSON.stringify(busyline));

                self.checkboxGroup = busyline; //改变默认多选框的值
                lastCheckedBox = self.checkboxGroup;//存入上一次多选框的值
                // self.mapData.lineStations = [];//置空
                // self.mapData.passengerNumScale = {};//置空
                // self.mapData.startEndPoint.startPoint = [];//先清除，这真是一个坑爹地方
                // self.mapData.startEndPoint.endPoint = [];//先清除
                // self.mapData.od = [];// 置空
                // self.mapData.odPoints = [];
                // self.mapData.odPointNames = [];
                // self.mapData.odNum = [];
                // self.mapData.busyPoints = [];       //先置零
                // self.mapData.busyNum = [];       //先置零
                self.dealDataVue('citybusLineStationByLine', data['citybusLineStationByLine']);
                self.dealDataVue('passengerNumScale', data['passengerNumScale']);
                self.dealDataVue('citybusLineStartEndStation', data['citybusLineStartEndStation']);
                self.dealDataVue('busOd', data['busOd']);
                self.dealDataVue('busyBusByLine', data['busyBusByLine']);

                self.addStartPointMarker(); // 描起点的
                self.addEndPointMarker(); // 描起点的
                self.drivingBusLineStation()
                self.addBusyMarker();//添加拥挤坐标点
                self.drawODArrowLine();//画箭头线（od交换线）
            }.bind(this));
        },
        // 进入 公交运行页面 获得所有信息（高德地图）
        selectGaodeInfo1: function () {
            let self = this;
            let url = self.contextPath + "/intimeBus/selectGaodeInfo1";
            let params = {lines: self.lines, linesDif: self.linesDif, kind: self.kindChoose};
            axios.get(url, {params: params}).then(function (result) {
                let data = result.data;
                // self.mapData.lineStations = [];//置空
                // self.mapData.passengerNumScale = {};//置空
                // self.mapData.startEndPoint.startPoint = [];//先清除，这真是一个坑爹地方
                // self.mapData.startEndPoint.endPoint = [];//先清除
                // self.mapData.od = [];// 置空
                // self.mapData.odPoints = [];
                // self.mapData.odPointNames = [];
                // self.mapData.odNum = [];
                // self.mapData.busyPoints = [];       //先置零
                // self.mapData.busyNum = [];       //先置零
                self.dealDataVue('citybusLineStationByLine', data['citybusLineStationByLine']);
                self.dealDataVue('passengerNumScale', data['passengerNumScale']);
                self.dealDataVue('citybusLineStartEndStation', data['citybusLineStartEndStation']);
                self.dealDataVue('busOd', data['busOd']);
                self.dealDataVue('busyBusByLine', data['busyBusByLine']);

                self.addStartPointMarker(); // 描起点的
                self.addEndPointMarker(); // 描起点的
                self.drivingBusLineStation()
                self.addBusyMarker();//添加拥挤坐标点
                self.drawODArrowLine();//画箭头线（od交换线）
            }.bind(this));
        },
        chooseGaodeLines: function () {
            let self = this;
            let url = self.contextPath + "/intimeBus/chooseGaodeLines";
            let params = {lines: self.lines, linesDif: self.linesDif, kind: self.kindChoose};
            axios.get(url, {params: params}).then(function (result) {
                let data = result.data;
                self.dealDataVue('citybusLineStationByLine', data['citybusLineStationByLine']);
                self.dealDataVue('citybusLineStartEndStation', data['citybusLineStartEndStation']);
                self.addStartPointMarker(); // 描起点的
                self.addEndPointMarker(); // 描起点的
                self.drivingBusLineStation()
                self.dealDataVue('passengerNumScale', data['passengerNumScale']);
            }.bind(this));
        },
        selectGaodeInfo2: function () {
            let self = this;
            //搜索线路（包括切换方向的正向反向） 2
            let url = self.contextPath + "/intimeBus/selectGaodeInfo2";
            let params = {line: self.inputCode5, kind: self.kindChoose}
            axios.get(url, {params: params}).then(function (result) {
                let data = result.data;
                // self.mapData.lineStations = [];//置空
                // self.mapData.passengerNumScale = {};//置空
                // self.mapData.startEndPoint.startPoint = [];//先清除，这真是一个坑爹地方
                // self.mapData.startEndPoint.endPoint = [];//先清除
                // self.mapData.od = [];// 置空
                // self.mapData.odPoints = [];
                // self.mapData.odPointNames = [];
                // self.mapData.odNum = [];
                // self.mapData.busyPoints = [];       //先置零
                // self.mapData.busyNum = [];       //先置零
                self.dealDataVue('citybusLineStationByLine', data['citybusLineStationByLine']);
                self.dealDataVue('busOnMap', data['busOnMap']);
                self.dealDataVue('passengerNumScale', data['passengerNumScale']);
                self.dealDataVue('citybusLineStartEndStation', data['citybusLineStartEndStation']);
                self.dealDataVue('busOd', data['busOd']);
                self.dealDataVue('busyBusByLine', data['busyBusByLine']);

                self.addStartPointMarker(); // 描起点的
                self.addEndPointMarker(); // 描起点的
                self.addBusOnMapMarkerClear(); // 描线上车辆
                self.addBusOnMapMarker(); // 描线上车辆
                self.drivingBusLineStation()
                self.addBusyMarker();//添加拥挤坐标点
                self.drawODArrowLine();//画箭头线（od交换线）
            }.bind(this));
        },
        selectGaodeInfo3: function () {
            let self = this;
            // 搜索站点3
            let url = self.contextPath + "/intimeBus/selectGaodeInfo3";
            let params = {lines: self.lines, stardarId: self.inputId5, stationName1: self.input5, kind: self.kindChoose};
            axios.get(url, {params: params}).then(function (result) {
                let data = result.data;
                self.dealDataVue('citybusLineStationByLine', data['citybusLineStationByLine']);
                self.dealDataVue('passengerNumScale', data['passengerNumScale']);
                self.dealDataVue('citybusLineStartEndStation', data['citybusLineStartEndStation']);
                self.dealDataVue('busOd', data['busOd']);
                self.dealDataVue('busyBusByLine', data['busyBusByLine']);

                self.addStartPointMarker(); // 描起点的
                self.addEndPointMarker(); // 描起点的
                self.drivingBusLineStation()
                self.addBusyMarker();//添加拥挤坐标点
                self.drawODArrowLine();//画箭头线（od交换线）

            }.bind(this));
        },
        //初始化，选择线路
        selectInfo: function () {
            let self = this;
            axios.post(this.contextPath + "/intimeBus/selectInfo").then(function (result) {
                let data = result.data;
                // 第一部分数据
                self.dealDataVue('from', data);
                //赋值给   24小时客运量变化
                self.dealDataVue('passenger24', data['passenger24']);
            }.bind(this));
        },
        //初始化，选择线路 实时
        selectInfoIntime: function (msg) {
            let self = this;
            let params = {msg: msg};
            axios.get(this.contextPath + "/intimeBus/selectInfoIntime",
                {params: params}
                ).then(function (result) {
                    let data = result.data;
                    if("info" == msg) {
                        // 第一部分数据
                        self.dealDataVue('from', data);
                        //赋值给   24小时客运量变化
                        self.dealDataVue('passenger24', data['passenger24']);
                    } else if("odInfo" == msg) {
                        self.dealDataVue('busOd', data['busOd']);
                        self.dealDataVue('busyBusByLine', data['busyBusByLine']);

                        self.addBusyMarker();//添加拥挤坐标点
                        self.drawODArrowLine();//画箭头线（od交换线）
                    }
                }.bind(this));
        },
        //线路搜索
        selectInfoByLineCode: function () {
            let self = this;
            let url = this.contextPath + "/intimeBus/selectInfoByLineCode?line_code=" + self.inputCode5
            let kind = self.fromLine.lineMessage.kind;
            if (kind) {
                url += "&kind=" + self.kindChoose;
            }
            axios.post(url).then(function (result) {
                let data = result.data;
                self.dealDataVue('fromLine', data);
            }.bind(this));
        },
        //线路搜索实时
        selectInfoByLineCodeIntime: function (msg) {
            let self = this;
            let kind = self.fromLine.lineMessage.kind?self.fromLine.lineMessage.kind:"up";
            var params = `?line_code=${self.inputCode5}&kind=${kind}&msg=${msg}`;

            //1.实时刷新公交车
            axios.post(this.contextPath + "/intimeBus/selectInfoByLineCodeIntime" + params).then(function (result) {
                let data = result.data;
                if("infoLine" == msg) {
                    self.dealDataVue('fromLineIntime', data);
                } else if("carInfo" == msg) {
                    self.dealDataVue('carInfoIntime', data);
                    self.dealDataVue('busOnMap', data["busOnMap"]);
                    self.addBusOnMapMarkerClear();
                    self.addBusOnMapMarker();
                } else if("odInfoLine" == msg) {
                    self.dealDataVue('busOd', data['busOd']);
                    self.dealDataVue('busyBusByLine', data['busyBusByLine']);

                    self.addBusyMarker();//添加拥挤坐标点
                    self.drawODArrowLine();//画箭头线（od交换线）
                }
            }.bind(this));
        },
        //通过站点获取途径线路
        selectGaodeByStation: function () {
            let self = this;
            axios.post(self.contextPath + "/intimeBus/selectGaodeByStation?stationName1=" + self.input5 + "&standarId=" + self.inputId5
            ).then(function (result) {
                let data = result.data;
                //1.途径线路
                self.dealDataVue('lineByStation', data);
                self.dealDataVue('busOdByStation', data['busOdByStation']);
                self.dealDataVue('capacityByStation', data['capacityByStation']);

                let arrLine = [];//所有线路集合（line_code, line_name）
                data['allLines'].forEach(function (item, index) {
                    arrLine.push(item["line_code"]);
                    self.allLines.push({line_code: item["line_code"], line_name: item["line_name"]});
                });

                let top3 = [];
                //小于3取所有，大于3只取前3个(用于地图显示)
                data['top3Lines'].forEach(function (item, index) {
                     top3.push(item["line_code"]);
                });
                self.lines = commonUtil.arrToStrByComma(top3);//赋值给全局变量

                self.dealDataVue('citybusLineStationByLine', data['citybusLineStationByLine']);
                self.dealDataVue('passengerNumScale', data['passengerNumScale']);
                self.dealDataVue('citybusLineStartEndStation', data['citybusLineStartEndStation']);
                self.dealDataVue('busOd', data['busOd']);
                self.dealDataVue('busyBusByLine', data['busyBusByLine']);

                self.addStartPointMarker(); // 描起点的
                self.addEndPointMarker(); // 描起点的
                self.drivingBusLineStation()
                self.addBusyMarker();//添加拥挤坐标点
                self.drawODArrowLine();//画箭头线（od交换线）

                self.setTimerStation();
            }.bind(this));
        },
        getWayLinesByStation: function () {
            let self = this;
            axios.post(self.contextPath + "/intimeBus/getWayLinesByStation?stardarName=" + self.input5 + "&standarId=" + self.inputId5
            ).then(function (result) {
                let data = result.data;
                let arrLine = [];//所有线路集合（line_code, line_name）
                data['allLines'].forEach(function (item, index) {
                    arrLine.push(item["line_code"]);
                    self.allLines.push({line_code: item["line_code"], line_name: item["line_name"]});
                });

                let top3 = [];
                //小于3取所有，大于3只取前3个(用于地图显示)
                data['top3Lines'].forEach(function (item, index) {
                     top3.push(item["line_code"]);
                });
                self.lines = commonUtil.arrToStrByComma(top3);//赋值给全局变量

                self.selectGaodeInfo3();
                self.selectInfoByStation();
                self.setTimerStation();
            }.bind(this));
        },
        //搜索站点
        selectInfoByStation: function () {
            let self = this;
            axios.post(
                self.contextPath + "/intimeBus/selectInfoByStation?station=" + self.input5 + '&lines=' + self.lines + '&stardarId=' + self.inputId5
            ).then(function (result) {
                let data = result.data;
                //1.途径线路
                self.dealDataVue('lineByStation', data);
                self.dealDataVue('busOdByStation', data['busOdByStation']);
                self.dealDataVue('capacityByStation', data['capacityByStation']);
            }.bind(this));
        },
        //搜索站点实时
        selectInfoByStationIntime: function (msg) {
            let self = this;
            var params = `?station=${self.input5}&lines=${self.lines}&stardarId=${self.inputId5}&msg=${msg}`;
            axios.post(
                self.contextPath + "/intimeBus/selectInfoByStationIntime" + params
            ).then(function (result) {
                let data = result.data;
                if("infoStation" == msg) {
                    self.dealDataVue('capacityByStation', data['capacityByStation']);

                } else if("infoOdStation" == msg) {
                    self.dealDataVue('busOdByStation', data['busOdByStation']);
                    self.dealDataVue('busyBusByLine', data['busyBusByLine']);

                    self.addBusyMarker();
                    self.drawODArrowLine();
                }
            }.bind(this));
        },
        //点击线路查询线路
        selectLinebyLine: function (line_code, line_name) {
            this.lines = '';
            this.inputCode5 = line_code;
            this.input5 = line_name;
            this.inputFtl5 = JSON.parse(JSON.stringify(line_name));
            this.initPageConfig(2);
        },
        linesCheckboxChange: function () {// 多选框选择线路的改变
            let self = this;
            self.input5 = '';
            // self.lines = '';
            let tempLine = [];
            // filter的作用，只增加某条新增的线路，或删除某条已画的线路
            if (self.checkboxGroup.length > lastCheckedBox.length) {// 地图上加上tempLine线路
                tempLine = self.checkboxGroup.filter(function (e) {
                    return lastCheckedBox.indexOf(e) < 0;
                });
            } else if (self.checkboxGroup.length < lastCheckedBox.length) {// 地图上去掉已经画的templine线路
                tempLine = lastCheckedBox.filter(function (e) {
                    return self.checkboxGroup.indexOf(e) < 0;
                });
            }
            //获得此次和上次的差，如果更少返回''
            if (this.checkboxGroup.length > lastCheckedBox.length) {
                self.linesDif = commonUtil.arrToStrByComma(commonMain.getArrDif([...this.checkboxGroup], lastCheckedBox));
            } else {
                // 获得切换值(此次和上一次的差)
                self.linesDif = '';
            }
            self.lines = commonUtil.arrToStrByComma(this.checkboxGroup);
            lastCheckedBox = this.checkboxGroup;// lastCheckedBox保存上一次多选框选中的所有选项
            //设置地图状态
            this.initPageConfig(1);
        },
        //模糊查询
        querySearchAsync(queryString, cb) {
        	var self = this;
            let promptMessage = this.promptMessage ? this.promptMessage : [];
            promptMessage = JSON.parse(promptMessage);
            var results = queryString ? promptMessage.filter(this.createFilter(queryString)) : promptMessage;
            //没有输入时，只显示出线路
            if (results.length > 63) {
                results = results.slice(0, 63);
            }
            this.callbackResult = results;
            // 调用 callback 返回建议列表的数据
            // clearTimeout(this.timeout);
            // this.timeout = setTimeout(() => {
            		cb(results);
            // }, 3000 * Math.random());
    		// self.inputResult = '';
        },
        createFilter(queryString) {
            return (promptMessage) => {
                //取 >= 0 类似模糊查询 %%
                return (promptMessage['value'].toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
            };
        },
        changeIcon:function(){
            var self = this;
            if(this.placeholderSearch == '全网线路概览') {
                self.fontClass='iconfont-xianlu';
                self.iconClass = 'icon-xianlu'
                self.placeholderSearch='查线路、站点';
                self.placeholderSearch2='全网线路概览';
                if(self.mapData.handleState == 2) {
                    self.stationResult2_2 = true;
                }
                if(self.mapData.handleState == 3) {
                    self.stationResult2_1 = true;
                }
                self.disabledSearch = false;
                self.popperClass = false;
            } else {
                self.fontClass = 'iconfont-shuliang'
                self.iconClass='icon-shuliang'
                self.placeholderSearch='全网线路概览';
                self.placeholderSearch2='查线路、站点';
                if(self.mapData.handleState == 2) {
                    self.stationResult2_2 = false;
                }
                if(self.mapData.handleState == 3) {
                    self.stationResult2_1 = false;
                }
                self.disabledSearch = true;
                self.popperClass = true;
                //首次去请求线路信息
                if(!(self.poorLines && self.poorLines.length)) {
                    self.getAllLines();
                }
            }

        },
        //模糊查询结果点击
        handleSelect: function (item) {// 可匹配选项的按钮选择改变
            let self = this;
            self.input5 = item['value'];
            self.inputFtl5 = JSON.parse(JSON.stringify(item['value']));
            self.inputCode5 = item.standar;
            if (item.type == '1') {
                self.initPageConfig(2);
            } else if (item.type == '2') {
                self.initPageConfig(3);
            }
        },
        switchDirection: function (line_code, line_name) {//切换方向
            let self = this;
            //upColorClass:'up-color',
            //downColorClass:'down-color',
            self.upColorClass==="up-color" ? self.upColorClass = "down-color ": self.upColorClass = "up-color ";
            self.downColorClass==="down-color" ? self.downColorClass = "up-color ": self.downColorClass = "down-color ";
            //过滤调25返，D83路返 25，25返，D83路，D83路返做特殊处理，本来该是一条线路正反，这里分成2条线路的up
            if (line_code == '2501') {
                self.input5 = '25路';
                self.inputCode5 = '25';
                self.kindChoose = "UP";
                self.up_down = '下行';
                self.color
            } else if (line_code == '25') {
                self.input5 = '25路反';
                self.inputCode5 = '2501';
                self.kindChoose = "UP";
                self.up_down = '上行';
            } else if (line_code == '83') {
                self.input5 = 'D83路反';
                self.inputCode5 = '8301';
                self.kindChoose = "UP";
                self.up_down = '下行';
            } else if (line_code == '8301') {
                self.input5 = 'D83路';
                self.inputCode5 = '83';
                self.kindChoose = "UP";
                self.up_down = '上行';
            } else {
                let kind = self.fromLine.lineMessage.kind;
                if (kind.toLowerCase() == 'DOWN'.toLowerCase()) {
                    self.kindChoose = "UP"
                    self.up_down = '下行';
                } else {
                    self.kindChoose = "DOWN"
                    self.up_down = '上行';
                }
            }
            self.inputFtl5 = JSON.parse(JSON.stringify(self.input5));
            this.initPageConfig(2);
        },
    },
    watch: {//监听数据变化
        kylbhqsChartOption: function (newVal) {
            this.kylbhqsChart && this.kylbhqsChart.setOption(newVal);
        },
        sdklljkChartOption: function (newVal) {  //站点
            this.echartData.sdklljkChart && this.echartData.sdklljkChart.setOption(newVal);
        },
        klljkChartOption: function (newVal) {   //线路
            this.klljkChart && this.klljkChart.setOption(newVal);
        },
    },
// 定义过滤器对不符合展示的数据进行过滤
    created: function () {
        let self = this;
        this.getContextPath();
      
        // this.getHotLines();
    },
    mounted: function () {
        let self = this;
        //清除定时器
        this.distroyedTimerInit();  // 1.初始化和选择线路
        this.distroyedTimer();  // 2.搜索线路
        this.distroyedTimerStation();  // 3.搜索站点
        /*高德初始化组件 z这里初始化一次，回调函数还有一次*/
        this.initMap();
        this.initMapEventLietener();//初始化地图注册函数
        this.initPageConfig(0);//初始化时：获得所有线路信息
    },
    beforeDestroy: function() {
        let self = this;
        //清除定时器
        this.distroyedTimerInit();  // 1.初始化和选择线路
        this.distroyedTimer();  // 2.搜索线路
        this.distroyedTimerStation();  // 3.搜索站点

        //删除地图
        this.distroyMapEventLietener();//注销地图注册函数
        this.distroyMap();
    },
    distroyed: function () {
        let self = this;

    },
    beforeCreate: function () {
        let self = this;
        this.contextPath='';
        this.callbackResult=[];
        this.allLines= [];//用于展示当前站点的所有线路
        this.hotLinesArr= [];//热门线路
        this.poorLines= [];//普通线路
        this.up_down= '下行';
        //用于存放本页面的url和页面状态（适合不同页面有定时刷新的需求）
        this.timerInit= '';// 1 初始化页面，选择线路页面 定时器
        this.timer= '';// 2 搜索线路页面 定时器
        this.timerStation= '';// 3 搜索线路页面 定时器
        this.timerKlljk= null;
        this.klljkIndex= 0;
        this.timerKylbhqs=null;
        this.kylbhqsIndex= 0;
        this.timerSdklljk= null;
        this.inputCode5= '';//对应线路code
        this.inputId5= '';//对应线路id
        this.lines= '';//选择的线路数
        this.linesDif= '';//选择的线路差数()
        this.kindChoose= 'UP';//线路的UP还是down
            // 显示框判断
        this.map= ''; // 全局地图函数
        this.aMap = {
            //地图控件
            control: {
                toolBar: null,
                markerClusterer: null,
                driving: null
            },
            //地图事件
            event: {
                click: null,
                zoomchange: null,
                dragend: null
            },
            //覆盖物事件
            markersEvent: {
                //od 覆盖物事件
                odMarkersEvent: {
                    click: [],
                    mouseover: [],
                    mouseout: []
                },
                //拥挤点 覆盖物事件
                busyMarkersEvent: {
                    click: [],
                    mouseover: [],
                    mouseout: []
                },
                //拥挤点 覆盖物事件
                stationMarkersEvent: {
                    click: [],
                    mouseover: [],
                    mouseout: []
                }
            }
        },
        this.mapData= {
            centerCoordinate: [112.90747518931073, 27.859305978350736], // 地图中心坐标
            scaleBy: 1,//线路、od线和站点，起点终点
            scaleBy2: 1, //od圈，站点圈
            mapState: 'normal',//地图状态：正常，平移dragend，放大缩小 change
            handleState: 0,//操作状态:  0,初始化进入 1.选择线路 2.搜索线路  3.搜索站点
            handleStatus: false,//操作状态没变化
            // handleMapStatus: false,//在1选择线路时，是否缩放后操作
            lineStations: [],      //线路站点信息
            passengerNumAvg: {},      //线路站点平均值
            //起点和终点标记(地图上所有)
            startEndPoint: {
                startPoint: [],
                endPoint: []
            },
            busOnMap: [],
            busyPoints: [],      //拥挤点
            busyNum: [],         //拥挤点数据，只是单纯的为了清除线路的圈圈
            cxt: '',
            odPoints: [],       //od 点
            odPointNames: [],     //od 点名
            odNum: [],     //od
            od: [],              //od
            //需要清除的覆盖物（marker封装后）
            markers: {
                startPointMarkers: [],        //起点覆盖物
                endPointMarkers: [],        //终点覆盖物
                busOnMapMarkers: [],        //线路上的公交车覆盖物
                stationMarkers: [],         //站点覆盖物
                linesMarkers: [],         //线路覆盖物
                busyCircleMarkers: [],         //线路覆盖物
                odMarkers: []               //od 覆盖物
            },
            //覆盖物渲染数组，1.主要用于避免回调，直接存入回调数据  2.存原始数据
            cache: {
                lineCacheCall: [],        //线路回调数组集合
                stationCache: [],        //站点数组集合
                startPointCache: [],        //起点
                endPointCache: [],        //终点
                busOnMapCache: []
            },
            // 需要清除的 缓存 覆盖物（marker封装后）
            markersCache: {
                lineCacheCallMarkers: [],        //线路覆盖物
                stationCacheMarkers: [],        //站点覆盖物
                startPointCacheMarkers: [],        //起点
                endPointCacheMarkers: [],        //终点
                busOnMapCacheMarkers: []
            }
        };
        this.canvas = document.createElement('canvas');
        this.animationCanvas = document.createElement('canvas');
        this.canvasLayer = "";
        this.animationCanvasLayer = "";
        this.fmgr = null;//动态od线对象,下次渲染之前，请先清空
    }
});