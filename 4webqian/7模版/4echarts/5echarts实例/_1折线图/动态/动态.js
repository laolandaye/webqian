'use strict';//严格模式
let vue = new Vue({
    el: "#app",
    data: function () {
        return {
            contextPath: '',
            echartData: {
                kylbhqs: {},
                kylbhqsData: []
            },
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
    },
    methods: {
    	getContextPath: function () {
            let local = document.location;
            let contextPath = "/" + local.pathname.split('/')[1];
            let basePath = local.protocol + "//" + local.host + "/" + contextPath;
            this.contextPath = contextPath;//项目路径
        },
    	initKylbhqsChart: function () {
            let self = this;
            this.kylbhqsChart = echarts.init(this.$refs.kylbhqs, "qhjscEchartsTheme");
            this.kylbhqsChart && this.kylbhqsChart.setOption(this.kylbhqsChartOption);
            var i = 0;
            if(!self.qwechartSureIndex){
	           	 setInterval(function() {
	  		 		i<self.qwechartIndex?i++:i=0;
	  		 		!self.qwechartSureIndex?self.qwechartSureIndex++:self.qwechartSureIndex;
	  		 		self.kylbhqsChart.dispatchAction(
	  				{
	  					type: 'showTip',
	  				    seriesIndex: 0,
	  				    dataIndex: i,		
	  				});
	         	 },2000);
            }
            window.addEventListener("resize", function () {
                self.kylbhqsChart && self.kylbhqsChart.resize();
            });
        },

        //处理data数据中心  data数据处理中心（一般用于一些需要重复利用数据）
        dealDataVue: function(msg) {
    	    let self = this;
    	    let data = {"passenger24":[{"collect_hour":4,"passenger_num":4,"passenger_card":3,"passenger_cash":1},{"collect_hour":5,"passenger_num":387,"passenger_card":253,"passenger_cash":134},{"collect_hour":6,"passenger_num":14683,"passenger_card":8866,"passenger_cash":5817},{"collect_hour":7,"passenger_num":44489,"passenger_card":26731,"passenger_cash":17758},{"collect_hour":8,"passenger_num":34106,"passenger_card":20516,"passenger_cash":13590},{"collect_hour":9,"passenger_num":21621,"passenger_card":13035,"passenger_cash":8586},{"collect_hour":10,"passenger_num":10158,"passenger_card":6124,"passenger_cash":4034}],"busCount":529,"busAllCount":1029,"passenger_num":125448,"passenger_card":75528};
            
                let m = new Map();
                let arr = [];
                data['passenger24'].forEach(function (item, index) {
                    arr.push(parseInt(item['collect_hour']));
                    m.set(item['collect_hour'], parseInt(item['passenger_num']));
                });
                self.echartData.kylbhqs = {hours: arr, hourNums: m};
            
        },
    },
    watch: {//监听数据变化
        kylbhqsChartOption: function (newVal) {
            this.kylbhqsChart && this.kylbhqsChart.setOption(newVal);
        },
    },
// 定义过滤器对不符合展示的数据进行过滤
    created: function () {
        let self = this;
        this.getContextPath();
        this.dealDataVue();
    },
    mounted: function () {
        let self = this;
        this.$nextTick(function () {
            self.initKylbhqsChart();
        });
    },
    distroyed: function () {
        let self = this;
    }
});