'use strict';//严格模式
let vue = new Vue({
    el: "#app",
    data: function () {
        return {
            contextPath: '',

            takeTaxiNum:[{"collect_month":"2018-08","up_num":485983,"operation_car":23237},{"collect_month":"2018-09","up_num":602738,"operation_car":24675},
            {"collect_month":"2018-10","up_num":789102,"operation_car":30986}],	//左2.年度打车量数据
        }
    },
    computed: {
       //echarts1打车变化趋势
		dclbhqsChartOption:function(){
			var self = this ;
			var takeNum=[0, 0, 0, 0, 0, 0, 0, 485983, 602738, 789102, '', ''];
			var taxiNum= [0, 0, 0, 0, 0, 0, 0, 23237, 24675, 30986, '', ''];
			var month= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
			let nowMonth = new Date().getMonth() + 1;
            var option = {
                title: {
                    textStyle: {
                        color: '#7CABCA',
                        fontSize: 15,
                    },
                },
                legend: {
                	 itemWidth:12,
                     itemHeight:8,
                     itemGap:2,
                     right:40,
                   orient: 'horizontal',
                    data: [{
                            name: '打车量',
                            icon:'circle',
                            textStyle: {
                                fontSize: 8,
                                fontWeight: 'bolder',
                                color: '#7CABCA'
                            }
                        },{
                            name: '运营车次数',
                             icon:'circle',
                            textStyle: {
                                fontSize: 8,
                                fontWeight: 'bolder',
                                color: '#7CABCA'
                            },
                            icon: 'circle'
                        }],
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    backgroundColor:'rgba(0,129,219,1)',
                    padding:[0,4,0,4],
                    textStyle:{
                    	fontSize:12
                    },
                    formatter:function(params){
			            let result = '';
						if (params[0]["name"] <= nowMonth) {
                            result = `${params[0]["name"]}月<br/>打车量： ${params[0]["data"]}次<br/>运营车次数：${params[1]["data"]}次`;
						}
						return result;
			        },
                },
                grid: {
                    left: '13%',
                    right: '14%',
                    containLabel:false,
                },
                xAxis:
                    {
                        name:"/月",
                         nameTextStyle: {
                            padding:[25,0,0,0],
                        },
                        boundaryGap: false,
                        type: 'category',
                        splitLine: {show: false},
                        axisTick: {show: false},
                        axisLine: {
                            lineStyle: {
                                color: '#7CABCA',
                            },
                            show: true,
                        },
                        data: month,
                    },
                yAxis: [{
                    	splitNumber:3,
                        name: '/次',
                        nameLocation: 'end',
                        nameTextStyle: {
                            padding:[0,0,0,-10],
                        },
                        type: 'value',
                        show: true,
                        axisLabel: {
                            show: true,
                            formatter: '{value}',
                            textStyle: {color: '#7CABCA',},
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                    },{
                    	splitNumber:3,
                        name: '/次',
                        nameLocation: 'end',
                        nameTextStyle: {
                            padding:[0,0,0,20],
                        },
                        type: 'value',
                        show: true,
                        axisLabel: {
                            show: true,
                            formatter: '{value}',
                            textStyle: {color: '#7CABCA',},
                        },
                        splitArea:{show:false},
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false},
                    }],
                series: [{
                        name: '打车量',
                        type: 'bar',
                        barWidth: '30%',
                        color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [{
                                    offset: 0.1,
                                    color: 'rgba(99,133,254, 1)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(99,133,254, 0.1)',
                                }
                            ]
                        ),
                        data:takeNum,
                    },{
                        name: '运营车次数',
                        type: 'line',
                        yAxisIndex: 1,
                        smooth: true,
                        color: '#24d39b',
                        symbolSize:'5',
                        data:taxiNum,
                    }],
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
        //打车量变化趋势初始化方法
		initDclbhqsChart: function() {
			var self = this;
			this.dclbhqsChart = echarts.init(this.$refs.dclbhqs, "qhjscEchartsTheme");
			this.dclbhqsChart && this.dclbhqsChart.setOption(this.dclbhqsChartOption);
			window.addEventListener("resize", function() {
				self.dclbhqsChart && self.dclbhqsChart.resize();
		 	})
		},	
    },
    watch: {//监听数据变化
        sdklljkChartOption: function (newVal) {
            this.echartData.sdklljkChart && this.echartData.sdklljkChart.setOption(newVal);
        },
    },
// 定义过滤器对不符合展示的数据进行过滤
    created: function () {
        let self = this;
        this.getContextPath();
    },
    mounted: function () {
        let self = this;
        this.$nextTick(function () {
        	self.initDclbhqsChart();
        });
    },
    distroyed: function () {
        let self = this;
    }
});