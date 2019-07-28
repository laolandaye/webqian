
/**
 此版本通过设置geoindex && seriesIndex: [1] 属性来实现geo和map共存，来达到hover散点和区域显示tooltip的效果

 默认情况下，map series 会自己生成内部专用的 geo 组件。但是也可以用这个 geoIndex 指定一个 geo 组件。这样的话，map 和 其他 series（例如散点图）就可以共享一个 geo 组件了。并且，geo 组件的颜色也可以被这个 map series 控制，从而用 visualMap 来更改。
 当设定了 geoIndex 后，series-map.map 属性，以及 series-map.itemStyle 等样式配置不再起作用，而是采用 geo 中的相应属性。

 http://echarts.baidu.com/option.html#series-map.geoIndex

 并且加了pin气泡图标以示数值大小
 */

// var myChart = echarts.init(document.getElementById('echar'));
// myChart.showLoading();
//
// myChart.on('click', function (params) {
//     // 控制台打印数据的名称
//     console.log(params);
// });

'use strict';//严格模式
let vue = new Vue({
    el: "#app",
    data: function () {
        return {
            mapEcharts: [],  //开始ref指向 dom节点，然后是ajax返回的数据（监测数据）
        }
    },
    computed: {
        mapEchartsChartOption: function () {
            let self = this;

            var geoCoordMap = {};
            var data = [];
            for (var i = 0; i < this.mapEcharts.length; i++) {
                self.$set(geoCoordMap, this.mapEcharts[i].area_name, [this.mapEcharts[i].lng, this.mapEcharts[i].lat]);
                data.push({
                    name:  this.mapEcharts[i].area_name,
                    value:  this.mapEcharts[i].pm2,
                    lng:  this.mapEcharts[i].lng,
                    lat:  this.mapEcharts[i].lat,
                    investment_total:  this.mapEcharts[i].investment_total,
                    investment_completed:  this.mapEcharts[i].investment_completed,
                    pm:  this.mapEcharts[i].pm
                });
            }
            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value),
                            lng:  data[i].lng,
                            lat:  data[i].lat,
                            investment_total:  data[i].investment_total,
                            investment_completed:  data[i].investment_completed,
                            pm:  data[i].pm
                        });
                    }
                }
                return res;
            };

            var option = {
                title: {
                    text: '大同市',
                    subtext: '',
                    x: 'center',
                    textStyle: {
                        color: '#ccc'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        // debugger
                        // if(typeof(params.value)[2] == "undefined"){
                        //     return params.name + ' : ' + params.value;
                        // }else{
                        //     return params.name + ' : ' + params.value[2];
                        // }
                        return `${params.data.name} 排名：第${params.data.pm}<br />工业增加值：${params.data.investment_completed}亿元<br />总产值：${params.data.investment_total}亿元`
                    }
                },
                legend: {
                    orient: 'vertical',
                    y: 'bottom',
                    x: 'right',
                    data: ['credit_pm2.5'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                visualMap: {
                    show: false,
                    min: 1,
                    max: 4,
                    left: 'left',
                    top: 'bottom',
                    text: ['高', '低'], // 文本，默认为数值文本
                    calculable: true,
                    seriesIndex: [1],
                    inRange: {
                        // color: ['#3B5077', '#031525'], // 蓝黑
                        // color: ['#ffc0cb', '#800080'], // 红紫
                        // color: ['#3C3B3F', '#605C3C'], // 黑绿
                        color: ["#e697b1", "#fed49c", "#aeecb4", "#b6c2e9"], // 黑紫黑
                        // color: ['#23074d', '#cc5333'], // 紫红
                        // color: ['#00467F', '#A5CC82'], // 蓝绿
                        // color: ['#1488CC', '#2B32B2'], // 浅蓝
                        // color: ['#00467F', '#A5CC82'], // 蓝绿
                        // color: ['#00467F', '#A5CC82'], // 蓝绿
                        // color: ['#00467F', '#A5CC82'], // 蓝绿
                        // color: ['#00467F', '#A5CC82'] // 蓝绿
                    }
                },
                // toolbox: {
                //     show: true,
                //     orient: 'vertical',
                //     left: 'right',
                //     top: 'center',
                //     feature: {
                //             dataView: {readOnly: false},
                //             restore: {},
                //             saveAsImage: {}
                //             }
                // },
                geo: {
                    show: true,
                    map: 'datong',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false,
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#1824ca',
                            borderColor: '#3B5077',
                        },
                        emphasis: {
                            areaColor: '#2B91B7',
                        }
                    }
                },
                series : [
                    {
                        name: '游客',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(data),
                        // symbolSize: function (val) {
                        //     return val[2] / 10;
                        // },
                        label: {
                            normal: {
                                formatter: function (item) {
                                    // return `${item.data.name} 排名：第${item.data.pm}\n工业增加值：${item.data.investment_completed}亿元\n总产值：${item.data.investment_total}亿元`
                                    return `${item.data.name}\n 排名：第${item.data.pm}`
                                },
                                position: 'bottom',
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#270dca'
                            }
                        }
                    },
                    {
                        type: 'map',
                        map: 'datong',
                        geoIndex: 0,
                        aspectScale: 0.75, //长宽比
                        showLegendSymbol: false, // 存在legend时显示
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#ca3125',
                                borderColor: '#3B5077',
                            },
                            emphasis: {
                                areaColor: '#2B91B7'
                            }
                        },
                        animation: false,
                        data: data
                    },
                ]
            };
            return option;
        },
    },
    watch: {//监听数据变化
        mapEchartsChartOption: function (newVal) {
            this.mapEchartsChart && this.mapEchartsChart.setOption(newVal);
        },
    },
    methods: {
        getContextPath: function () {
            let local = document.location;
            let contextPath = "/" + local.pathname.split('/')[1];
            let basePath = local.protocol + "//" + local.host + "/" + contextPath;
            this.contextPath = contextPath;//项目路径
        },
        initMapEchartsChart: function () {
            let self = this;
            //这个不使用强哥组件
            this.mapEchartsChart = echarts.init(this.$refs.mapEcharts);
//             this.mapEchartsChart = echarts.init(this.$refs.mapEcharts, "qhjscEchartsTheme");
//             this.mapEchartsChart.showLoading();
            $.getJSON(this.getContextPath() + "/5echarts实列/_52地图/大同地图/大同市.json", function(geoJson) {
                echarts.registerMap('datong', geoJson);
                self.mapEchartsChart && self.mapEchartsChart.setOption(self.mapEchartsChartOption);
            });
            this.mapEchartsChart.on('click', function (params) {
                // 控制台打印数据的名称
                console.log(params);
            });
            window.addEventListener("resize", function () {
                self.mapEchartsChart && self.mapEchartsChart.resize();
            });
        },
    },
// 定义过滤器对不符合展示的数据进行过滤
    created: function () {
        let self = this;

    },
    mounted: function () {
        let self = this;
        this.getContextPath();
        this.mapEcharts = [{"area_name":"云冈区","lng":"113.16892","pm2":1,"investment_total":3.33,"investment_completed":4.38,"pm":1,"lat":"40.024624"},{"area_name":"广灵县","lng":"114.271722","pm2":2,"investment_total":2.54,"investment_completed":1.92,"pm":2,"lat":"39.761573"},{"area_name":"灵丘县","lng":"114.233269","pm2":3,"investment_total":1.42,"investment_completed":1.72,"pm":3,"lat":"39.442025"},{"area_name":"阳高县","lng":"113.749871","pm2":4,"investment_total":0.46,"investment_completed":0.76,"pm":4,"lat":"40.369112"},{"area_name":"新荣区","lng":"113.137623","pm2":4,"investment_total":1.1,"investment_completed":0.59,"pm":5,"lat":"40.260365"},{"area_name":"云州区","lng":"113.609795","pm2":4,"investment_total":0.16,"investment_completed":0.41,"pm":6,"lat":"40.047756"},{"area_name":"天镇县","lng":"114.090447","pm2":4,"investment_total":0.12,"investment_completed":0.31,"pm":7,"lat":"40.425518"},{"area_name":"浑源县","lng":"113.689446","pm2":4,"investment_total":1.0,"investment_completed":1.0,"pm":9,"lat":"39.699099"},{"area_name":"平城区","lng":"113.300069","pm2":4,"investment_total":1.0,"investment_completed":1.0,"pm":10,"lat":"40.091359"},{"area_name":"左云县","lng":"112.703663","pm2":4,"investment_total":1.0,"investment_completed":1.0,"pm":11,"lat":"40.016299"}];
        this.$nextTick(function () {
            self.initMapEchartsChart();
        });
    },
    distroyed: function () {
        let self = this;
    },
    beforeCreate: function () {
        this.contextPath = '';
    }

});