var uploadedDataURL = "/5echarts实例/_10关系图/大同地图/data-1507621331560-H1nRFl53b.json";
var uploadedDataURL2 = "/5echarts实例/_10关系图/大同地图/大同市.json";

/**
 此版本通过设置geoindex && seriesIndex: [1] 属性来实现geo和map共存，来达到hover散点和区域显示tooltip的效果

 默认情况下，map series 会自己生成内部专用的 geo 组件。但是也可以用这个 geoIndex 指定一个 geo 组件。这样的话，map 和 其他 series（例如散点图）就可以共享一个 geo 组件了。并且，geo 组件的颜色也可以被这个 map series 控制，从而用 visualMap 来更改。
 当设定了 geoIndex 后，series-map.map 属性，以及 series-map.itemStyle 等样式配置不再起作用，而是采用 geo 中的相应属性。

 http://echarts.baidu.com/option.html#series-map.geoIndex

 并且加了pin气泡图标以示数值大小
 */

var myChart = echarts.init(document.getElementById('echar'));
myChart.showLoading();
$.getJSON(uploadedDataURL2, function(geoJson) {
    echarts.registerMap('datong', geoJson);
    myChart.hideLoading();
    var geoCoordMap = {
        '平城区':[113.300069,40.091359],
        '开发区':[113.168594,40.035885],
        '云冈区':[113.16892,40.024624],
        '新荣区':[113.137623,40.260365],
        '阳高县':[113.749871,40.369112],
        '天镇县':[114.090447,40.425518],
        '广灵县':[114.271,39.761573],
        '灵丘县':[114.233269,39.442025],
        '浑源县':[113.689446,39.699099],
        '左云县':[112.703663,40.016299],
        '云州区':[113.609795,40.047756],
    }
    var data = [
        {name: '平城区', value: 370},
        {name: '开发区', value: 450},
        {name: '云冈区', value: 240},
        {name: '新荣区', value: 120},
        {name: '阳高县', value: 450},
        {name: '天镇县', value: 450},
        {name: '广灵县', value: 450},
        {name: '灵丘县', value: 450},
        {name: '浑源县', value: 450},
        {name: '左云县', value: 450},
        {name: '云州区', value: 450},
    ];
    var max = 480, min = 9; // todo
    var maxSize4Pin = 100, minSize4Pin = 20;

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
                if(typeof(params.value)[2] == "undefined"){
                    return params.name + ' : ' + params.value;
                }else{
                    return params.name + ' : ' + params.value[2];
                }
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
            min: 0,
            max: 500,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            seriesIndex: [1],
            inRange: {
                // color: ['#3B5077', '#031525'], // 蓝黑
                // color: ['#ffc0cb', '#800080'], // 红紫
                // color: ['#3C3B3F', '#605C3C'], // 黑绿
                color: ['#1824CA', '#D3C9FF', '#5ACA8A', '#43B2CA'], // 黑紫黑
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
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#1824ca'
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
    myChart.setOption(option);
});
myChart.on('click', function (params) {
    // 控制台打印数据的名称
    console.log(params);
});