'use strict'; //严格模式
let vue = new Vue({
	el: "#app",
	data: function() {
		return {
            qylrfx: '', //1.开始ref指向 dom节点，2.然后是ajax返回的数据（监测数据）3.qylrfx 取代item数据,方便再次渲染 self.initDzzmbChart(self.qylrfx)
            gyczbq: '',
            qylrfx2: '',
            gyczbq2: '',
            gycz: '',
            czzzqs: '',
            gyhyzb: '',
		}
	},
	computed: {
        dzxmbChartOption:function(item){
            return function (item) {
            	let self = this;

            	//格式化显示
                var axisLabelFormatter = function(a, key) {
                    if(key) {
                        if('normol' == key) {
                            return a;
                        } else if('dateFormatter' == key){
                            let b = '';
                            if (a.length > 3) {
                                b = a.substring(2, a.length) ;
                            } else {
                                b = a + "";
                            }
                            return b;
                        }
                    } else {
                        //默认值
                        return a;
                    }
                }

                let xAxis0Data = [];
                let yAxis0Data = [];
                let legendData = [];
                let series = [];
                let seriesData = {};

                let colors = ['#d32c6b', '#7CABCA', '#009900', '#331c23', "#161fd3"];
                //默认值设置,数据处理（以及默认值设置）
                let title = item.title;
                let data = item.data;
                let legends = item.legends;
                let tooltip = item.tooltip;
                let xAxis = item.xAxis;
                let yAxis = item.yAxis;
                let grid = item.grid;

                // title非空判断，处理默认值
                // grid 的非空判断
                if(title) {
                    if(title.text) {
                    }else {
                        title.text = '';
                    }
                } else {
                    title = {};
                    title.text = '';
                }

                for (let i = 0; i < data.length; i++) {
                	//处理横坐标，或者纵坐标
                    if(xAxis.key) {
                        xAxis0Data.push(data[i][xAxis.key]);
                    } else if(yAxis.key) {
                        yAxis0Data.push(data[i][yAxis.key]);
                    }

                    for (let able in data[i]) {
                    	if(seriesData[able]) {
                            seriesData[able].push(data[i][able]);
						} else {
                    		//添加数组第一个元素
                    		self.$set(seriesData, able , [data[i][able]]);
						}
					}
                }

                for (let i = 0; i < legends.length; i++) {
                    legendData.push({
                        name: legends[i].val,
                        icon:'circle',
                        textStyle: {
                            fontSize: 12,
                            fontWeight: 'bolder',
                            color: colors[i]
                        }
                    });
                    //处理 主题柱状,默认用柱状 'bar'
                    //处理 主题柱状,y轴,默认用0
                    //处理 主题柱状,stack,柱子合并
                    series.push({
                        name:  legends[i].val,
                        type: legends[i].type?legends[i].type: 'bar',
                        smooth: true,
                        color: colors[i],
                        symbolSize:'5',
                        stack: legends[i].stack?legends[i].stack: legends[i].key,
                        yAxisIndex:legends[i].yAxisIndex?legends[i].yAxisIndex: 0,
                        data:seriesData[legends[i].key]
                    })
                }

                // tooltip 的非空判断，处理默认值
                if(tooltip) {
                } else {
                    tooltip = {};
                    tooltip.axisPointer = {};
                    tooltip.axisPointer.axis = 'x';
                }

                // xAxis 的非空判断，处理默认值
                if(xAxis) {
                    if(xAxis.boundaryGap) {
                    } else {
                        xAxis.boundaryGap = false;
                    }
                    if(xAxis.type) {
                    } else {
                        xAxis.type = 'category';
                    }
                    if(xAxis.axisLabel) {
                        if(!xAxis.axisLabel.rotate) {
                            xAxis.axisLabel.rotate = 0;
                        }
                        if(!xAxis.axisLabel.formatter) {
                            xAxis.axisLabel.formatter = 'normol';
                        }
                    } else {
                        xAxis.axisLabel = {};
                        xAxis.axisLabel.rotate = 0;
                        xAxis.axisLabel.formatter = 'normol';
                    }
                }

                // yAxis 的非空判断，处理默认值
                if(yAxis) {
                    if(yAxis.type) {
                    } else {
                        yAxis.type = 'value';
                    }
                }

                // grid 的非空判断，处理默认值
                if(grid) {
                    if(grid.position) {
                    }else {
                        grid.position =['25%', '15%', '10%', '15%'];
                    }
                } else {
                    grid = {};
                    grid.position = ['25%', '15%', '10%', '15%'];
                }

                let option = {
                    title: {
                        text:title.text,
                        textStyle: {
                            color: '#7CABCA',
                            fontSize: 15,
                        },
                        x: 'center',
                        align: 'right'
                    },
                    legend: {
                        itemWidth:12,
                        itemHeight:8,
                        itemGap:2,
                        right:40,
                        orient: 'horizontal',
                        data: legendData,
                    },
                    grid: {
                        top: grid.position[0],
                        right: grid.position[1],
                        bottom: grid.position[2],
                        left: grid.position[3],
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                            axis: tooltip.axisPointer.axis,              //'x', 'y', 'radius', 'angle'
                        },
                        backgroundColor:'rgba(0,129,219,1)',
                        padding:[0,4,0,4],
                        textStyle:{
                            fontSize:12
                        },
                        formatter:function(params){
                            let result = "";
                            if(xAxis.key) {
                                result += `${params[0].name}${xAxis.name}<br />`;
                                for (let i = 0; i < legends.length; i++) {
                                    //判断坐标单位
                                    if(legends[i].yAxisIndex) {
                                        result += `${params[i].seriesName}:${params[i].value}${yAxis.name2}<br />`;
                                    } else {
                                        result += `${params[i].seriesName}:${params[i].value}${yAxis.name}<br />`;
                                    }
                                }
                            } else if(yAxis.key) {
                                result += `${params[0].name}${yAxis.name}<br />`;
                                for (let i = 0; i < legends.length; i++) {
                                    result += `${params[i].seriesName}:${params[i].value}${xAxis.name}<br />`;
                                }
                            }
                            return result;
                        }
                    },
                    xAxis: {
                        name: xAxis.name?`/${xAxis.name}`:``,
                        nameTextStyle: {
                            padding:[25,0,0,0],
                        },
                        boundaryGap: xAxis.boundaryGap,
                        type: `${xAxis.type}`,
                        splitLine: {show: false},
                        axisTick: {show: false},
                        axisLabel: {
                            show: true,
                            rotate: xAxis.axisLabel.rotate,
                            formatter: function (a) {
                                return axisLabelFormatter(a, xAxis.axisLabel.formatter);
                            },
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#7CABCA',
                            },
                            show: true,
                        },
                        data: xAxis0Data,
                    },
                    yAxis:[{
                        splitNumber:3,
                        name: `/${yAxis.name}`,
                        nameLocation: 'end',
                        nameTextStyle: {
                            padding:[0,0,0,-10],
                        },
                        type: `${yAxis.type}`,
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
                        data: yAxis0Data,
                    },{
                        splitNumber:3,
                        name: `/${yAxis.name2}`,
                        nameLocation: 'end',
                        nameTextStyle: {
                            padding:[0,0,0,10],
                        },
                        type: 'value',
                        show: Boolean(yAxis.name2),
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
                    }],
                    series: series,
                };

                return option;
            }
        },
	},
	watch: { //监听数据变化
        dzxmbChartOption: function (newVal) {
            this.dzxmbChart && this.dzxmbChart.setOption(newVal);
        },
	},
	// 定义过滤器对不符合展示的数据进行过滤
	created: function() {
		let self = this;

	},
	mounted: function() {
		let self = this;
		this.getContextPath();
        this.qylrfx = staticData.qylrfx;
        this.gyczbq = staticData.gyczbq;
        this.qylrfx2 = staticData.qylrfx2;
        this.gyczbq2 = staticData.gyczbq2;
        this.gycz = staticData.gycz;
        this.czzzqs = staticData.czzzqs;
        this.gyhyzb = staticData.gyhyzb;
        this.$nextTick(function() {
            self.dealData("qylrfx", self.qylrfx);
            self.dealData("gyczbq", self.gyczbq);
            self.dealData("qylrfx2", self.qylrfx2);
            self.dealData("gyczbq2", self.gyczbq2);
            self.dealData("gycz", self.gycz);
            self.dealData("czzzqs", self.czzzqs);
            self.dealData("gyhyzb", self.gyhyzb);
		});
	},
	distroyed: function() {
		let self = this;
	},
	beforeCreate: function() {
		this.contextPath = '';

	},
    methods: {
        getContextPath: function() {
            let local = document.location;
            let contextPath = "/" + local.pathname.split('/')[1];
            let basePath = local.protocol + "//" + local.host + "/" + contextPath;
            this.contextPath = contextPath; //项目路径
        },
        initDzzmbChart: function(item) {
            let self = this;
            this.dzxmbChart = echarts.init(this.$refs[item.ref], "qhjscEchartsTheme");
            this.dzxmbChart && this.dzxmbChart.setOption(this.dzxmbChartOption(item));
            window.addEventListener("resize", function() {
                self.dzxmbChart && self.dzxmbChart.resize();
            })
        },
        dealData(msg, data, lastData) {
            let self = this;
            if(msg == "qylrfx") {
                self.initDzzmbChart({
                    ref: "qylrfx",
                    data: data,
                    legends: [
                        {val: '产品占用资金', key: "capital_cur_cumulative" },
                        {val: '应收账款', key: "receivable_cur_cumulative" },
                        {val: '资产总额', key: "assets_cur_cumulative" }
                    ],
                    xAxis: {
                        key: "fill_year",
                        // name: "年",
                        boundaryGap: ['20%', '20%'],

                    },
                    yAxis: {
                        name: "亿元"
                    },
                    title: {
                        text: "测试标题"
                    }
                });
                return;// 找到了之后的就没必要走了
            }
            if(msg == "gyczbq") {
                self.initDzzmbChart({
                    ref: "gyczbq",
                    data: data,
                    legends: [
                        {val: '上年同期累计', key: "total_pre_cumulative" },
                        {val: '本期', key: "total_cur_month" },
                        {val: '本期累计', key: "total_cur_cumulative" },
                        {val: '上年同期', key: "total_pre_month" }
                    ],
                    xAxis: {
                        key: "fill_date",
                        name: "月",
                        axisLabel: {
                            rotate: 30,
                            formatter:'dateFormatter'
                        }
                    },
                    yAxis: {
                        name: "亿元"
                    }
                });
                return;// 找到了之后的就没必要走了
            }
            if(msg == "qylrfx2") {
                self.initDzzmbChart(self.qylrfx2 = {
                    ref: "qylrfx2",
                    data: data,
                    legends: [
                        {val: '产品占用资金', key: "capital_cur_cumulative", type: 'line' },
                        {val: '应收账款', key: "receivable_cur_cumulative", type: 'line' },
                        {val: '资产总额', key: "assets_cur_cumulative", type: 'line' }
                    ],
                    xAxis: {
                        key: "fill_year",
                        name: "年"
                    },
                    yAxis: {
                        name: "亿元"
                    }
                });
                return;// 找到了之后的就没必要走了
            }
            if(msg == "gyczbq2") {
                self.initDzzmbChart( {
                    ref: "gyczbq2",
                    data: data,
                    legends: [
                        {val: '上年同期累计', key: "total_pre_cumulative", type: 'line' },
                        {val: '本期', key: "total_cur_month", type: 'line' },
                        {val: '本期累计', key: "total_cur_cumulative", type: 'line' },
                        {val: '上年同期', key: "total_pre_month", type: 'line' }
                    ],
                    xAxis: {
                        key: "fill_date",
                        name: "月"
                    },
                    yAxis: {
                        name: "亿元"
                    }
                });
                return;// 找到了之后的就没必要走了
            }
            if(msg == "gycz") {
                self.initDzzmbChart( {
                    ref: "gycz",
                    data: data,
                    legends: [
                        {val: '本期产值', key: "total_cur_month", type: 'bar' },
                        {val: '同比', key: "tbzzl", type: 'line', yAxisIndex: 1 },
                    ],
                    xAxis: {
                        key: "fill_date",
                        name: "月"
                    },
                    yAxis: {
                        name: "亿元",
                        name2: "%",
                    }
                });
                return;// 找到了之后的就没必要走了
            }
            if(msg == "czzzqs") {
                self.initDzzmbChart({
                    ref: "czzzqs",
                    data: data,
                    legends: [
                        {val: '总产值', key: "scale_total", type: 'line' },
                        {val: '以上', key: "scale_up", stack: '1' },
                        {val: '以下', key: "scale_down", stack: '1' },
                    ],
                    xAxis: {
                        key: "fill_date",
                        name: "月"
                    },
                    yAxis: {
                        name: "亿元",
                    }
                });
                return;// 找到了之后的就没必要走了
            }
            if(msg == "gyhyzb") {
                self.initDzzmbChart({
                    ref: "gyhyzb",
                    data: data,
                    legends: [
                        {val: '实现利润', key: "income_cur_cumulative", type: 'bar' },
                        {val: '负载总额', key: "profit_cur_cumulative", type: 'bar' },
                        {val: '销售收入', key: "bilit_cur_cumulative", type: 'bar' },
                    ],
                    tooltip: {
                        axisPointer: {
                            axis: 'y'
                        }
                    },
                    xAxis: {
                        name: "亿元",
                        type : 'value',
                    },
                    yAxis: {
                        key: "dim_name",
                        name: "行业",
                        type : 'category',
                    }
                });
                return;// 找到了之后的就没必要走了
            }
        },
    },

});