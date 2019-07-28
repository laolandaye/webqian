'use strict';//严格模式
let vue = new Vue({
    el: "#app",
    data: function () {
        return {
            sdklljk: '',  //开始ref指向 dom节点，然后是ajax返回的数据（监测数据）
        }
    },
    computed: {
        sdklljkChartOption: function () {
            let self = this;
            let axisData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23];
            let seriesData = [];
            let sdklljkData = this.sdklljk;
            if (sdklljkData && sdklljkData.hours && sdklljkData.hourNums) {
                for (let i = 0; i < 24; i++) {
                    if (sdklljkData.hours.indexOf(i) + 2) {
                        seriesData.push(sdklljkData.hourNums.get(i));
                    } else {
                        seriesData.push('' + 0);
                    }
                }
            }
            self.sdklljkIndexLength = seriesData.length;
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
    },
    watch: {//监听数据变化
        sdklljkChartOption: function (newVal) {
            this.sdklljkChart && this.sdklljkChart.setOption(newVal);
        },
    },
    methods: {
        getContextPath: function () {
            let local = document.location;
            let contextPath = "/" + local.pathname.split('/')[1];
            let basePath = local.protocol + "//" + local.host + "/" + contextPath;
            this.contextPath = contextPath;//项目路径
        },
        initSdklljkChart: function () {
            let self = this;
            //这个不使用强哥组件
//          this.sdklljkChart = echarts.init(this.$refs.sdklljk);
            this.sdklljkChart = echarts.init(this.$refs.sdklljk, "qhjscEchartsTheme");
            this.sdklljkChart && this.sdklljkChart.setOption(this.sdklljkChartOption);
	       	this.setTimerSdklljk();
	       	this.$refs.sdklljk.addEventListener('mouseover',function(e){
				console.log("鼠标移入时间是否触发");
				self.distroyedTimerSdklljk();
			});
			this.$refs.sdklljk.addEventListener('mouseout',function(e){
				console.log("鼠标移出时间是否触发");
				self.setTimerSdklljk();
			});	
            window.addEventListener("resize", function () {
                self.sdklljkChart && self.sdklljkChart.resize();
            });
        },
        setTimerSdklljk: function () {/* 设置定时器  */
            let self = this;
            if(!this.timerSdklljk){
            	this.sdklljkChart.dispatchAction({
						type: 'showTip',
					    seriesIndex: 0,
					    dataIndex: self.sdklljkIndex,		
					});
				self.sdklljkIndex = self.sdklljkIndex * 1 + 1;
				console.time("测试时间间隔是否2s");
            	this.timerSdklljk = setInterval(function() {
	       			console.log("sdklljkIndexLength:" + self.sdklljkIndexLength + " ,self.sdklljkIndex=" + self.sdklljkIndex);
			 		console.timeEnd("测试时间间隔是否2s");
			 		self.sdklljkIndex <self.sdklljkIndexLength?self.sdklljkIndex++:self.sdklljkIndex=0;
//	  		 		!self.echartData.sdklljkStartIndex?self.echartData.sdklljkStartIndex++:self.echartData.sdklljkStartIndex;
			 		self.sdklljkChart.dispatchAction({
						type: 'showTip',
					    seriesIndex: 0,
					    dataIndex: self.sdklljkIndex,		
					});
					console.time("测试时间间隔是否2s");
		       	 },2000);
            }
            
        },
        distroyedTimerSdklljk: function () { /*  清除定时器  */
            let self = this;
            if (self.timerSdklljk) {
                clearInterval(self.timerSdklljk);
                self.sdklljkChart.dispatchAction({
						type: 'showTip',
					    seriesIndex: 0,
					    dataIndex: self.sdklljkIndex,		
					});
				self.timerSdklljk = null;
            }
        },
        //处理data数据中心  data数据处理中心（一般用于一些需要重复利用数据）
        dealDataVue: function() {
    	    let self = this;
    	    let data = {"lineByStation":[{"line_code":"9","line_name":"9路"},{"line_code":"91","line_name":"D91路"},{"line_code":"15","line_name":"15路"},{"line_code":"2","line_name":"2路"},{"line_code":"24","line_name":"24路"},{"line_code":"26","line_name":"26路"},{"line_code":"29","line_name":"29路"},{"line_code":"6","line_name":"6路"}],"capacityByStation":[{"id":"153972258138900000","station_name":"公交西站","passenger_num":4,"passenger_card":3,"passenger_cash":1,"collect_date":1539705600000,"collect_hour":4},{"id":"153972474437200000","station_name":"公交西站","passenger_num":10,"passenger_card":7,"passenger_cash":3,"collect_date":1539705600000,"collect_hour":5},{"id":"153972763017000009","station_name":"公交西站","passenger_num":310,"passenger_card":187,"passenger_cash":123,"collect_date":1539705600000,"collect_hour":6},{"id":"153973125606500350","station_name":"公交西站","passenger_num":502,"passenger_card":302,"passenger_cash":200,"collect_date":1539705600000,"collect_hour":7},{"id":"153973490195500086","station_name":"公交西站","passenger_num":498,"passenger_card":300,"passenger_cash":198,"collect_date":1539705600000,"collect_hour":8},{"id":"153973855071900259","station_name":"公交西站","passenger_num":392,"passenger_card":236,"passenger_cash":156,"collect_date":1539705600000,"collect_hour":9},{"id":"153974219150700321","station_name":"公交西站","passenger_num":276,"passenger_card":167,"passenger_cash":109,"collect_date":1539705600000,"collect_hour":10},{"id":"153974583068200255","station_name":"公交西站","passenger_num":113,"passenger_card":68,"passenger_cash":45,"collect_date":1539705600000,"collect_hour":11}],"top3Lines":[{"line_code":"9","line_name":"9路"},{"line_code":"24","line_name":"24路"},{"line_code":"29","line_name":"29路"}],"busOdByStation":[{"station_name1":"江南机械厂","station_name2":"公交西站","od_num_sum":632,"od_info":{"d_lng":"112.864871","o_standar_id":"06-08-02","o_station_name":"江南机械厂","o_lat":"27.845752","d_station_name":"公交西站","d_lat":"27.86425","o_lng":"112.661224","d_standar_id":"16-07-01"}},{"station_name1":"楠竹山","station_name2":"公交西站","od_num_sum":515,"od_info":{"d_lng":"112.864871","o_standar_id":"06-08-01","o_station_name":"楠竹山","o_lat":"27.845192","d_station_name":"公交西站","d_lat":"27.86425","o_lng":"112.663289","d_standar_id":"16-07-01"}},{"station_name1":"科工职院","station_name2":"公交西站","od_num_sum":493,"od_info":{"d_lng":"112.864871","o_standar_id":"05-08-02","o_station_name":"科工职院","o_lat":"27.84596","d_station_name":"公交西站","d_lat":"27.86425","o_lng":"112.650522","d_standar_id":"16-07-01"}}]};

                    //3.24小时交换量
                    let m = new Map();
                    let arr = [];
            data['capacityByStation'].forEach(function (item, index) {
                        arr.push(parseInt(item['collect_hour']));
                        m.set(item['collect_hour'], parseInt(item['passenger_num']));
                    });
                    self.sdklljk = {hours: arr, hourNums: m};

        },

    },
// 定义过滤器对不符合展示的数据进行过滤
    created: function () {
        let self = this;
        
    },
    mounted: function () {
        let self = this;
        this.getContextPath();
        this.dealDataVue();
        this.$nextTick(function () {
        	self.initSdklljkChart();
        });
    },
    distroyed: function () {
        let self = this;
    },
     beforeCreate: function () {
     	this.contextPath = '';
        
     	this.sdklljkChart = null;	//echarts dom
//   	this.sdklljkChartOption = null;
     	this.timerSdklljk = null;	//
     	this.sdklljkIndex= 0;	//在定时器之前就调用一次，所以从1开始，第二圈从0开始
        this.sdklljkIndexLength= 24;//24
     	
     }
    
});