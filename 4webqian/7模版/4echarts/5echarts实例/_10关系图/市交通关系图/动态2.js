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
            var getOption = function() {
                if(!self.zdlvfs.length) return {};
                var typedData = self.zdlvfs.reduce(function(acc, cur) {
                    var foundBeginTypedData = acc.find(function(item) {
                        return item.name === cur["beginStation"]
                    });
                    if(foundBeginTypedData) {
                        foundBeginTypedData.value += cur["ticketNumber"];
                        return acc;
                    } else {
                        acc.push({
                            name: cur["beginStation"],
                            value: cur["ticketNumber"]
                        });
                        return acc;
                    }
                }, []);
                console.log(typedData)


                var typedData1 = self.zdlvfs.reduce(function(acc, cur) {
                    var foundEndTypedData = acc.find(function(item) {
                        return item.name === cur["endStation"]
                    });
                    if(foundEndTypedData) {
                        foundEndTypedData.value += cur["ticketNumber"];
                        return acc;
                    } else {
                        acc.push({
                            name: cur["endStation"],
                            value: cur["ticketNumber"]
                        });
                        return acc;
                    }
                }, []);
                console.log(typedData1)
                var type = typedData.map(function(item){
                    return item.name;
                });
                var addArr=[];
                var num = typedData1.map(function(item){
                    if(type.indexOf(item.name)==-1){
                        item.value = 0;
                        addArr.push(item);
                    }
                });
                typedData = typedData.concat(addArr);
                console.log(typedData);




                var maxValue = typedData.reduce(function(max, cur) {
                    return cur.value > max ? cur.value : max;
                }, -Infinity);
                var ceiledMaxValue = Math.ceil(maxValue / 500) * 500;

                var sale = {
                    lv0: ceiledMaxValue,
                    lv1: ~~(ceiledMaxValue / 10),
                    lv2: ~~(ceiledMaxValue / 70),
                    lv3: ~~(ceiledMaxValue / 300)
                }

                var categories = [
                    {
                        name: (sale.lv1 + 1) + "-" + sale.lv0,
                        min: sale.lv1 + 1,
                        max: sale.lv0,
                        symbolSize: 50,
                        label: {
                            normal: {
                                textStyle: {
                                    color: "#fff",
                                    fontSize: 22,
                                }
                            },
                            emphasis: {
                                textStyle: {
                                    color: "#313131",
                                    fontSize: 20,
                                },
                            },
                        },
                        color: "#f8442c",
                        lineStyle: {
                            normal: {
                                color: "#f8442c"
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.5,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(248,68,44,1)'
                                    }, {
                                        offset: 0.8,
                                        color: 'rgba(248,68,44,1)'
                                    }, {
                                        offset: 0.8,
                                        color: 'rgba(248,68,44,0.5)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(248,68,44,0.5)'
                                    }]
                                }
                            }
                        }
                    },
                    {
                        name: (sale.lv2 + 1) + "-" + sale.lv1,
                        min: sale.lv2 + 1,
                        max: sale.lv1,
                        symbolSize: 30,
                        label: {
                            normal: {
                                textStyle: {
                                    color: "#fff",
                                    fontSize: 21,
                                }
                            },
                            emphasis: {
                                textStyle: {
                                    color: "#313131",
                                    fontSize: 18,
                                },
                            },
                        },
                        color: "#fb8b08",
                        lineStyle: {
                            normal: {
                                color: "#fb8b08"
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.5,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(251,139,8,1)'
                                    }, {
                                        offset: 0.8,
                                        color: 'rgba(251,139,8,1)'
                                    }, {
                                        offset: 0.8,
                                        color: 'rgba(251,139,8,0.5)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(251,139,8,0.5)'
                                    }]
                                }
                            }
                        }
                    },
                    {
                        name: (sale.lv3 + 1) + "-" + sale.lv2,
                        min: sale.lv3 + 1,
                        max: sale.lv2,
                        symbolSize: 25,
                        color: "#169cf3",
                        label: {
                            normal: {
                                position: "right",
                                textStyle: {
                                    color: "#fff",
                                    fontSize: 16,
                                }
                            },
                            emphasis: {
                                position: "right",
                                textStyle: {
                                    color: "#313131",
                                    fontSize: 14,
                                },
                            },
                        },
                        lineStyle: {
                            normal: {
                                color: "#169cf3"
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#169cf3"
                            }
                        },

                    },
                    {
                        name: "0-" + sale.lv3,
                        min: 0,
                        max: sale.lv3,
                        symbolSize: 20,
                        color: "red",
                        lineStyle: {
                            normal: {
                                color: "#ffffff"
                            }
                        },

                        itemStyle: {
                            normal: {
                                color: "#ffffff"
                            }
                        },
                        label: {
                            normal: {
                                position: "right",

                                textStyle: {
                                    color: "#fff",
                                    fontSize: 14,
                                },
                            },
                            emphasis: {
                                position: "right",
                                textStyle: {
                                    color: "#313131",
                                    fontSize: 12,
                                },
                            },
                        },

                    }];
                var data = typedData.map(function(item) {
                    var category = categories.find(function(categoryItem) {
                        return item.value >= categoryItem.min && item.value <= categoryItem.max;
                    });
                    return Object.assign({}, item, {
                        symbolSize: category.symbolSize,
                        category: categories.indexOf(category),
                        itemStyle: category.itemStyle,
                        label: category.label,
                    });
                });
                var arr = [];
                var testArr = self.zdlvfs.map(function(item) {
                    // noinspection JSAnnotator
                    return {
                        source: item["beginStation"],
                        target: item["endStation"],
                        value:`<br />发车班次：${item['departureFlight']}<br />检票人数：${item['ticketNumber']}<br />座位数量：${item['seatNumber']}<br />实载率：${item['actualLoadRate']}<br />检票金额：${item['ticketAmount']}`,
                    }
                });
                var links = self.zdlvfs.map(function(item) {
                    var foundTypedData = typedData.find(function(typedDataItem) {
                        return item["beginStation"] === typedDataItem.name
                    });
                    var category = categories.find(function(categoryItem) {
                        return foundTypedData.value >= categoryItem.min && foundTypedData.value <= categoryItem.max;
                    });

                    function getValue(begin, end) {
                        for(var i = 0; i < testArr.length; i++) {
                            if(testArr[i].source === begin && testArr[i].target === end) {
                                return testArr[i].value;
                            }
                        }
                    };

                    function getStation(begin, end, value) {
                        if(value === undefined) {
                            return ''
                        } else {
                            return '<br>' + begin + ' > ' + end + ':' + value;
                        }
                    }
                    // noinspection JSAnnotator
                    return {
                        source: item["beginStation"],
                        target: item["endStation"],
                        value: `<br />发车班次：${item['departureFlight']}<br />检票人数：${item['ticketNumber']}<br />座位数量：${item['seatNumber']}<br />实载率：${item['actualLoadRate']}<br />检票金额：${item['ticketAmount']}`,
                        value1: getStation(item["endStation"], item["beginStation"], getValue(item["endStation"], item["beginStation"])),
                        lineStyle: category.lineStyle,
                    }
                });
                //改动-->
                //真实数据存储位置
                var trueData = data;
                //获取legend最大最小值
                var legend = categories.map(function(item) {
                    return {
                        min: item.min,
                        max: item.max,
                    }
                });
                //处理假数据方法
                function changeFalseData(value) {
                    var found = legend.find(function(element) {
                        if(element.min <= value && value <= element.max) {
                            return 1;
                        }
                    });
                    return Math.ceil((found.max - found.min) / 2 + found.max - found.min);
                }
                //获取假数据
                var falseData = data.map(function(item) {
                    return {
                        category: item.category,
                        itemStyle: item.itemStyle,
                        label: item.label,
                        name: item.name,
                        symbolSize: item.symbolSize,
                        value: changeFalseData(item.value),
                    }
                });
                //改动-->
                console.log(links);
                var option = {

                    legend: {
                        orient: "vertical",
                        left: '80%',
                        top: '80%',
                        itemWidth: 20,
                        itemHeight: 20,
                        data: categories.map(function(item) {
                            return {
                                name: item.name,
                                nameTextStyle: {
                                    fontSize: 30,
                                },
                                icon: "circle",
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 18,
                                },

                            }
                        })
                    },
                    tooltip: {
                        formatter: function(params) {
                            if(params.dataType == 'edge') { //点击线
                                return params.name + ':' + params.value + params.data.value1;
                            } else if(params.dataType == 'node') {
                                //	console.log(params);
                                /*trueData.find(function(element){

                                });*/
                                //改动-->
                                var value = 0;
                                trueData.forEach(function(element) {
                                    if(element.name === params.name) {
                                        value = element.value;
                                    }
                                });
                                return params.name + ':' + value; //改动-->
                            } else {
                                return '';
                            } /*	*/
                        }
                    },
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series: [{
                        type: "graph",
                        layout: 'circular',
                        ribbonType: true,
                        edgeSymbol: ['circle', 'arrow'],
                        edgeSymbolSize: 10,
                        circular: {
                            rotateLabel: true
                        },
                        symbolOffset: [0, '10%'],
                        draggable: true,
                        distance: 5,
                        roam: true,
                        force: {
                            initLayout: 'circular',
                            repulsion: 50,
                            gravity: 0.5,
                            edgeLength: 500,
                            layoutAnimation: true,
                        },

                        focusNodeAdjacency: true,

                        //改动-->
                        nodes: falseData, //（改）设置假数据//改动-->
                        links: links, //设置线条之间关系
                        categories: categories, //设置左上角图标
                        focusNodeAdjacency: true,
                        lineStyle: {
                            normal: {
                                curveness: 0.15,
                                width: 4,
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                            }
                        },
                        emphasis: {
                            label: {
                                show: true,
                            }
                        }
                    }]
                };
                return option;
            };

            var option = getOption();
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
            this.sdklljkChart = echarts.init(this.$refs.sdklljk);
            // this.sdklljkChart = echarts.init(this.$refs.sdklljk, "qhjscEchartsTheme");
            this.sdklljkChart && this.sdklljkChart.setOption(this.sdklljkChartOption);
            window.addEventListener("resize", function () {
                self.sdklljkChart && self.sdklljkChart.resize();
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
        self.zdlvfs = [
             {"beginStation":"阿坝","endStation":"阿坝","departureFlight":56,"ticketNumber":879,"seatNumber":1690,"actualLoadRate":"52.01183432",ticketAmount:48560.5},
             {"beginStation":"阿坝","endStation":"巴中","departureFlight":4,"ticketNumber":54,"seatNumber":66,"actualLoadRate":"81.81818182",ticketAmount:2646},
             {"beginStation":"阿坝","endStation":"成都","departureFlight":63,"ticketNumber":635,"seatNumber":1848,"actualLoadRate":"34.36147186",ticketAmount:36741},
             {"beginStation":"阿坝","endStation":"甘孜","departureFlight":3,"ticketNumber":32,"seatNumber":114,"actualLoadRate":"28.07017544",ticketAmount:3074},
             {"beginStation":"阿坝","endStation":"广安","departureFlight":8,"ticketNumber":69,"seatNumber":204,"actualLoadRate":"33.82352941",ticketAmount:1542},
             {"beginStation":"阿坝","endStation":"凉山","departureFlight":3,"ticketNumber":46,"seatNumber":84,"actualLoadRate":"54.76190476",ticketAmount:1975},
             {"beginStation":"阿坝","endStation":"南充","departureFlight":3,"ticketNumber":15,"seatNumber":100,"actualLoadRate":"15",ticketAmount:2550},
             {"beginStation":"阿坝","endStation":"阿坝","departureFlight":42,"ticketNumber":1024,"seatNumber":1428,"actualLoadRate":"71.70868347",ticketAmount:118642},
             {"beginStation":"成都","endStation":"阿坝","departureFlight":340,"ticketNumber":6124,"seatNumber":11304,"actualLoadRate":"54.17551309",ticketAmount:514608},
             {"beginStation":"成都","endStation":"巴中","departureFlight":200,"ticketNumber":6464,"seatNumber":8203,"actualLoadRate":"78.80043886",ticketAmount:851516.5},
             {"beginStation":"成都","endStation":"成都","departureFlight":6166,"ticketNumber":121434,"seatNumber":194970,"actualLoadRate":"62.28342822",ticketAmount:2002162.8},
             {"beginStation":"成都","endStation":"达州","departureFlight":88,"ticketNumber":2162,"seatNumber":3770,"actualLoadRate":"57.34748011",ticketAmount:205884},
             {"beginStation":"成都","endStation":"德阳","departureFlight":1217,"ticketNumber":26946,"seatNumber":38262,"actualLoadRate":"70.42496472",ticketAmount:702444.6},
             {"beginStation":"成都","endStation":"甘孜","departureFlight":163,"ticketNumber":3879,"seatNumber":6388,"actualLoadRate":"60.72323106",ticketAmount:556899},
             {"beginStation":"成都","endStation":"广安","departureFlight":93,"ticketNumber":1577,"seatNumber":3080,"actualLoadRate":"51.2012987",ticketAmount:125054},
             {"beginStation":"成都","endStation":"广元","departureFlight":256,"ticketNumber":4229,"seatNumber":9182,"actualLoadRate":"46.05750381",ticketAmount:360349.5},
             {"beginStation":"成都","endStation":"乐山","departureFlight":965,"ticketNumber":16226,"seatNumber":31057,"actualLoadRate":"52.2458705",ticketAmount:781794.6},
             {"beginStation":"成都","endStation":"凉山","departureFlight":261,"ticketNumber":10061,"seatNumber":11072,"actualLoadRate":"90.86885838",ticketAmount:1697594.4},
             {"beginStation":"成都","endStation":"眉山","departureFlight":1666,"ticketNumber":26918,"seatNumber":50124,"actualLoadRate":"53.70281701",ticketAmount:807903},
             {"beginStation":"成都","endStation":"绵阳","departureFlight":956,"ticketNumber":18285,"seatNumber":29682,"actualLoadRate":"61.60299171",ticketAmount:843841.7},
             {"beginStation":"成都","endStation":"南充","departureFlight":463,"ticketNumber":8858,"seatNumber":16089,"actualLoadRate":"55.05624961",ticketAmount:730283.6},
             {"beginStation":"成都","endStation":"内江","departureFlight":1177,"ticketNumber":13025,"seatNumber":29655,"actualLoadRate":"43.92176699",ticketAmount:717636.1},
             {"beginStation":"成都","endStation":"攀枝花","departureFlight":29,"ticketNumber":835,"seatNumber":1184,"actualLoadRate":"70.52364865",ticketAmount:182299.5},
             {"beginStation":"成都","endStation":"遂宁","departureFlight":500,"ticketNumber":7385,"seatNumber":15169,"actualLoadRate":"48.68481772",ticketAmount:362180.5},
             {"beginStation":"成都","endStation":"成都","departureFlight":2081,"ticketNumber":19811,"seatNumber":67246,"actualLoadRate":"29.46048836",ticketAmount:982398.4},
             {"beginStation":"成都","endStation":"雅安","departureFlight":691,"ticketNumber":17664,"seatNumber":24944,"actualLoadRate":"70.81462476",ticketAmount:974977},
             {"beginStation":"成都","endStation":"宜宾","departureFlight":698,"ticketNumber":11335,"seatNumber":22646,"actualLoadRate":"50.05298949",ticketAmount:1112160.7},
             {"beginStation":"成都","endStation":"资阳","departureFlight":2210,"ticketNumber":39207,"seatNumber":61472,"actualLoadRate":"63.78025768",ticketAmount:1357305.1},
             {"beginStation":"成都","endStation":"自贡","departureFlight":617,"ticketNumber":10162,"seatNumber":17803,"actualLoadRate":"57.08026737",ticketAmount:686012.6},
             {"beginStation":"成都","endStation":"泸州","departureFlight":450,"ticketNumber":5924,"seatNumber":13954,"actualLoadRate":"42.45377669",ticketAmount:560689},
             {"beginStation":"达州","endStation":"巴中","departureFlight":17,"ticketNumber":73,"seatNumber":178,"actualLoadRate":"41.01123596",ticketAmount:5180},
             {"beginStation":"达州","endStation":"成都","departureFlight":43,"ticketNumber":920,"seatNumber":1492,"actualLoadRate":"61.66219839",ticketAmount:96570},
             {"beginStation":"达州","endStation":"达州","departureFlight":364,"ticketNumber":2136,"seatNumber":10015,"actualLoadRate":"21.32800799",ticketAmount:55537.5},
             {"beginStation":"达州","endStation":"德阳","departureFlight":6,"ticketNumber":52,"seatNumber":120,"actualLoadRate":"43.33333333",ticketAmount:6580},
             {"beginStation":"达州","endStation":"甘孜","departureFlight":73,"ticketNumber":529,"seatNumber":2117,"actualLoadRate":"24.98819084",ticketAmount:9679},
             {"beginStation":"达州","endStation":"广安","departureFlight":181,"ticketNumber":794,"seatNumber":5153,"actualLoadRate":"15.4084999",ticketAmount:19610},
             {"beginStation":"达州","endStation":"乐山","departureFlight":3,"ticketNumber":4,"seatNumber":15,"actualLoadRate":"26.66666667",ticketAmount:640},
             {"beginStation":"达州","endStation":"绵阳","departureFlight":10,"ticketNumber":96,"seatNumber":303,"actualLoadRate":"31.68316832",ticketAmount:12232},
             {"beginStation":"达州","endStation":"南充","departureFlight":24,"ticketNumber":242,"seatNumber":717,"actualLoadRate":"33.75174338",ticketAmount:16610},
             {"beginStation":"达州","endStation":"内江","departureFlight":8,"ticketNumber":24,"seatNumber":60,"actualLoadRate":"40",ticketAmount:2907},
             {"beginStation":"达州","endStation":"成都","departureFlight":214,"ticketNumber":1676,"seatNumber":4948,"actualLoadRate":"33.87227162",ticketAmount:93817},
             {"beginStation":"达州","endStation":"雅安","departureFlight":3,"ticketNumber":5,"seatNumber":15,"actualLoadRate":"33.33333333",ticketAmount:800},
             {"beginStation":"达州","endStation":"宜宾","departureFlight":7,"ticketNumber":19,"seatNumber":70,"actualLoadRate":"27.14285714",ticketAmount:2296},
             {"beginStation":"达州","endStation":"资阳","departureFlight":21,"ticketNumber":110,"seatNumber":481,"actualLoadRate":"22.86902287",ticketAmount:6522},
             {"beginStation":"达州","endStation":"自贡","departureFlight":4,"ticketNumber":7,"seatNumber":40,"actualLoadRate":"17.5",ticketAmount:1015},
             {"beginStation":"达州","endStation":"泸州","departureFlight":6,"ticketNumber":21,"seatNumber":60,"actualLoadRate":"35",ticketAmount:3129},
             {"beginStation":"德阳","endStation":"成都","departureFlight":122,"ticketNumber":1853,"seatNumber":3559,"actualLoadRate":"52.06518685",ticketAmount:47951.5},
             {"beginStation":"德阳","endStation":"德阳","departureFlight":789,"ticketNumber":7095,"seatNumber":23927,"actualLoadRate":"29.65269361",ticketAmount:45248},
             {"beginStation":"德阳","endStation":"绵阳","departureFlight":75,"ticketNumber":590,"seatNumber":2036,"actualLoadRate":"28.978389",ticketAmount:13080.5},
             {"beginStation":"德阳","endStation":"内江","departureFlight":5,"ticketNumber":33,"seatNumber":75,"actualLoadRate":"44",ticketAmount:2489.5},
             {"beginStation":"德阳","endStation":"遂宁","departureFlight":17,"ticketNumber":153,"seatNumber":411,"actualLoadRate":"37.22627737",ticketAmount:6075.5},
             {"beginStation":"德阳","endStation":"成都","departureFlight":9,"ticketNumber":66,"seatNumber":243,"actualLoadRate":"27.16049383",ticketAmount:762},
             {"beginStation":"德阳","endStation":"资阳","departureFlight":18,"ticketNumber":184,"seatNumber":516,"actualLoadRate":"35.65891473",ticketAmount:7075},
             {"beginStation":"乐山","endStation":"成都","departureFlight":560,"ticketNumber":3336,"seatNumber":14900,"actualLoadRate":"22.38926174",ticketAmount:127936},
             {"beginStation":"乐山","endStation":"乐山","departureFlight":1290,"ticketNumber":3279,"seatNumber":35113,"actualLoadRate":"9.338421667",ticketAmount:27917.5},
             {"beginStation":"乐山","endStation":"眉山","departureFlight":115,"ticketNumber":337,"seatNumber":3130,"actualLoadRate":"10.76677316",ticketAmount:3914},
             {"beginStation":"乐山","endStation":"绵阳","departureFlight":12,"ticketNumber":10,"seatNumber":72,"actualLoadRate":"13.88888889",ticketAmount:772},
             {"beginStation":"乐山","endStation":"内江","departureFlight":4,"ticketNumber":4,"seatNumber":20,"actualLoadRate":"20",ticketAmount:212},
             {"beginStation":"乐山","endStation":"成都","departureFlight":6,"ticketNumber":70,"seatNumber":186,"actualLoadRate":"37.6344086",ticketAmount:8280},
             {"beginStation":"乐山","endStation":"自贡","departureFlight":90,"ticketNumber":158,"seatNumber":1930,"actualLoadRate":"8.186528497",ticketAmount:2520},
             {"beginStation":"凉山","endStation":"巴中","departureFlight":12,"ticketNumber":46,"seatNumber":324,"actualLoadRate":"14.19753086",ticketAmount:2430},
             {"beginStation":"凉山","endStation":"成都","departureFlight":107,"ticketNumber":2935,"seatNumber":5026,"actualLoadRate":"58.39633904",ticketAmount:562944},
             {"beginStation":"凉山","endStation":"德阳","departureFlight":6,"ticketNumber":78,"seatNumber":222,"actualLoadRate":"35.13513514",ticketAmount:12870},
             {"beginStation":"凉山","endStation":"甘孜","departureFlight":35,"ticketNumber":406,"seatNumber":1303,"actualLoadRate":"31.15886416",ticketAmount:32085},
             {"beginStation":"凉山","endStation":"乐山","departureFlight":12,"ticketNumber":234,"seatNumber":444,"actualLoadRate":"52.7027027",ticketAmount:38060.5},
             {"beginStation":"凉山","endStation":"凉山","departureFlight":116,"ticketNumber":1398,"seatNumber":3496,"actualLoadRate":"39.98855835",ticketAmount:63714},
             {"beginStation":"凉山","endStation":"眉山","departureFlight":12,"ticketNumber":243,"seatNumber":450,"actualLoadRate":"54",ticketAmount:37268},
             {"beginStation":"凉山","endStation":"南充","departureFlight":12,"ticketNumber":78,"seatNumber":324,"actualLoadRate":"24.07407407",ticketAmount:17706},
             {"beginStation":"凉山","endStation":"内江","departureFlight":5,"ticketNumber":97,"seatNumber":185,"actualLoadRate":"52.43243243",ticketAmount:18624},
             {"beginStation":"凉山","endStation":"攀枝花","departureFlight":130,"ticketNumber":3262,"seatNumber":4525,"actualLoadRate":"72.08839779",ticketAmount:208253},
             {"beginStation":"凉山","endStation":"遂宁","departureFlight":6,"ticketNumber":48,"seatNumber":222,"actualLoadRate":"21.62162162",ticketAmount:9936},
             {"beginStation":"凉山","endStation":"成都","departureFlight":24,"ticketNumber":370,"seatNumber":1089,"actualLoadRate":"33.97612489",ticketAmount:75465},
             {"beginStation":"凉山","endStation":"雅安","departureFlight":58,"ticketNumber":1018,"seatNumber":1936,"actualLoadRate":"52.58264463",ticketAmount:90710},
             {"beginStation":"凉山","endStation":"宜宾","departureFlight":6,"ticketNumber":152,"seatNumber":222,"actualLoadRate":"68.46846847",ticketAmount:30351},
             {"beginStation":"凉山","endStation":"资阳","departureFlight":3,"ticketNumber":38,"seatNumber":102,"actualLoadRate":"37.25490196",ticketAmount:8252},
             {"beginStation":"凉山","endStation":"自贡","departureFlight":6,"ticketNumber":93,"seatNumber":222,"actualLoadRate":"41.89189189",ticketAmount:20739},
             {"beginStation":"凉山","endStation":"泸州","departureFlight":6,"ticketNumber":192,"seatNumber":282,"actualLoadRate":"68.08510638",ticketAmount:41529},
             {"beginStation":"南充","endStation":"成都","departureFlight":21,"ticketNumber":110,"seatNumber":581,"actualLoadRate":"18.93287435",ticketAmount:2411.5},
             {"beginStation":"南充","endStation":"达州","departureFlight":48,"ticketNumber":724,"seatNumber":1634,"actualLoadRate":"44.30844553",ticketAmount:36784},
             {"beginStation":"南充","endStation":"德阳","departureFlight":7,"ticketNumber":70,"seatNumber":119,"actualLoadRate":"58.82352941",ticketAmount:700},
             {"beginStation":"南充","endStation":"广安","departureFlight":237,"ticketNumber":2747,"seatNumber":7126,"actualLoadRate":"38.54897558",ticketAmount:84542.5},
             {"beginStation":"南充","endStation":"广元","departureFlight":43,"ticketNumber":741,"seatNumber":1208,"actualLoadRate":"61.3410596",ticketAmount:38051.5},
             {"beginStation":"南充","endStation":"乐山","departureFlight":6,"ticketNumber":15,"seatNumber":83,"actualLoadRate":"18.07228916",ticketAmount:1868},
             {"beginStation":"南充","endStation":"凉山","departureFlight":24,"ticketNumber":292,"seatNumber":823,"actualLoadRate":"35.4799514",ticketAmount:7568},
             {"beginStation":"南充","endStation":"绵阳","departureFlight":58,"ticketNumber":433,"seatNumber":1593,"actualLoadRate":"27.18141871",ticketAmount:18395.5},
             {"beginStation":"南充","endStation":"南充","departureFlight":624,"ticketNumber":3938,"seatNumber":12159,"actualLoadRate":"32.38753187",ticketAmount:51964},
             {"beginStation":"南充","endStation":"成都","departureFlight":1362,"ticketNumber":28287,"seatNumber":12555,"actualLoadRate":"225.3046595",ticketAmount:616370},
             {"beginStation":"南充","endStation":"宜宾","departureFlight":3,"ticketNumber":31,"seatNumber":69,"actualLoadRate":"44.92753623",ticketAmount:4203},
             {"beginStation":"南充","endStation":"资阳","departureFlight":7,"ticketNumber":70,"seatNumber":189,"actualLoadRate":"37.03703704",ticketAmount:740},
             {"beginStation":"内江","endStation":"成都","departureFlight":315,"ticketNumber":4286,"seatNumber":7928,"actualLoadRate":"54.06155399",ticketAmount:275983},
             {"beginStation":"内江","endStation":"达州","departureFlight":6,"ticketNumber":57,"seatNumber":159,"actualLoadRate":"35.8490566",ticketAmount:7943},
             {"beginStation":"内江","endStation":"德阳","departureFlight":19,"ticketNumber":109,"seatNumber":406,"actualLoadRate":"26.84729064",ticketAmount:8520},
             {"beginStation":"内江","endStation":"乐山","departureFlight":21,"ticketNumber":107,"seatNumber":583,"actualLoadRate":"18.35334477",ticketAmount:5099},
             {"beginStation":"内江","endStation":"凉山","departureFlight":6,"ticketNumber":122,"seatNumber":222,"actualLoadRate":"54.95495495",ticketAmount:24300},
             {"beginStation":"内江","endStation":"眉山","departureFlight":18,"ticketNumber":189,"seatNumber":529,"actualLoadRate":"35.72778828",ticketAmount:8230.5},
             {"beginStation":"内江","endStation":"绵阳","departureFlight":18,"ticketNumber":141,"seatNumber":516,"actualLoadRate":"27.3255814",ticketAmount:12867},
             {"beginStation":"内江","endStation":"南充","departureFlight":6,"ticketNumber":85,"seatNumber":174,"actualLoadRate":"48.85057471",ticketAmount:7682},
             {"beginStation":"内江","endStation":"内江","departureFlight":1827,"ticketNumber":7910,"seatNumber":51070,"actualLoadRate":"15.48854513",ticketAmount:101263.5},
             {"beginStation":"内江","endStation":"攀枝花","departureFlight":6,"ticketNumber":88,"seatNumber":222,"actualLoadRate":"39.63963964",ticketAmount:20416},
             {"beginStation":"内江","endStation":"遂宁","departureFlight":6,"ticketNumber":36,"seatNumber":168,"actualLoadRate":"21.42857143",ticketAmount:2304},
             {"beginStation":"内江","endStation":"成都","departureFlight":100,"ticketNumber":864,"seatNumber":2445,"actualLoadRate":"35.33742331",ticketAmount:63199},
             {"beginStation":"内江","endStation":"雅安","departureFlight":69,"ticketNumber":241,"seatNumber":1834,"actualLoadRate":"13.14067612",ticketAmount:15683},
             {"beginStation":"内江","endStation":"宜宾","departureFlight":108,"ticketNumber":1736,"seatNumber":3326,"actualLoadRate":"52.19482862",ticketAmount:67835},
             {"beginStation":"内江","endStation":"资阳","departureFlight":137,"ticketNumber":925,"seatNumber":1955,"actualLoadRate":"47.31457801",ticketAmount:36967},
             {"beginStation":"内江","endStation":"自贡","departureFlight":160,"ticketNumber":889,"seatNumber":4355,"actualLoadRate":"20.41331803",ticketAmount:8348.5},
             {"beginStation":"内江","endStation":"泸州","departureFlight":100,"ticketNumber":1549,"seatNumber":2762,"actualLoadRate":"56.08254888",ticketAmount:63416},
             {"beginStation":"攀枝花","endStation":"巴中","departureFlight":3,"ticketNumber":20,"seatNumber":120,"actualLoadRate":"16.66666667",ticketAmount:5672},
             {"beginStation":"攀枝花","endStation":"成都","departureFlight":11,"ticketNumber":206,"seatNumber":515,"actualLoadRate":"40",ticketAmount:55075},
             {"beginStation":"攀枝花","endStation":"广安","departureFlight":7,"ticketNumber":27,"seatNumber":278,"actualLoadRate":"9.712230216",ticketAmount:7901},
             {"beginStation":"攀枝花","endStation":"乐山","departureFlight":5,"ticketNumber":37,"seatNumber":180,"actualLoadRate":"20.55555556",ticketAmount:7848},
             {"beginStation":"攀枝花","endStation":"凉山","departureFlight":312,"ticketNumber":3055,"seatNumber":10449,"actualLoadRate":"29.23724758",ticketAmount:176188},
             {"beginStation":"攀枝花","endStation":"眉山","departureFlight":6,"ticketNumber":32,"seatNumber":232,"actualLoadRate":"13.79310345",ticketAmount:6460},
             {"beginStation":"攀枝花","endStation":"绵阳","departureFlight":3,"ticketNumber":6,"seatNumber":121,"actualLoadRate":"4.958677686",ticketAmount:1396},
             {"beginStation":"攀枝花","endStation":"南充","departureFlight":7,"ticketNumber":55,"seatNumber":239,"actualLoadRate":"23.0125523",ticketAmount:9843},
             {"beginStation":"攀枝花","endStation":"内江","departureFlight":6,"ticketNumber":44,"seatNumber":222,"actualLoadRate":"19.81981982",ticketAmount:10648},
             {"beginStation":"攀枝花","endStation":"攀枝花","departureFlight":323,"ticketNumber":569,"seatNumber":7288,"actualLoadRate":"7.807354555",ticketAmount:15609},
             {"beginStation":"攀枝花","endStation":"遂宁","departureFlight":2,"ticketNumber":30,"seatNumber":74,"actualLoadRate":"40.54054054",ticketAmount:1443},
             {"beginStation":"攀枝花","endStation":"成都","departureFlight":275,"ticketNumber":2658,"seatNumber":7068,"actualLoadRate":"37.60611205",ticketAmount:228270},
             {"beginStation":"攀枝花","endStation":"雅安","departureFlight":4,"ticketNumber":69,"seatNumber":188,"actualLoadRate":"36.70212766",ticketAmount:12781},
             {"beginStation":"攀枝花","endStation":"宜宾","departureFlight":4,"ticketNumber":35,"seatNumber":144,"actualLoadRate":"24.30555556",ticketAmount:7471},
             {"beginStation":"攀枝花","endStation":"资阳","departureFlight":6,"ticketNumber":71,"seatNumber":195,"actualLoadRate":"36.41025641",ticketAmount:17573},
             {"beginStation":"攀枝花","endStation":"自贡","departureFlight":6,"ticketNumber":61,"seatNumber":195,"actualLoadRate":"31.28205128",ticketAmount:13768},
             {"beginStation":"攀枝花","endStation":"泸州","departureFlight":6,"ticketNumber":95,"seatNumber":297,"actualLoadRate":"31.98653199",ticketAmount:28120},
             {"beginStation":"雅安","endStation":"成都","departureFlight":318,"ticketNumber":5890,"seatNumber":10452,"actualLoadRate":"56.35285113",ticketAmount:261641},
             {"beginStation":"雅安","endStation":"甘孜","departureFlight":9,"ticketNumber":151,"seatNumber":333,"actualLoadRate":"45.34534535",ticketAmount:9110},
             {"beginStation":"雅安","endStation":"乐山","departureFlight":6,"ticketNumber":43,"seatNumber":174,"actualLoadRate":"24.71264368",ticketAmount:1955},
             {"beginStation":"雅安","endStation":"绵阳","departureFlight":12,"ticketNumber":123,"seatNumber":396,"actualLoadRate":"31.06060606",ticketAmount:11439},
             {"beginStation":"雅安","endStation":"南充","departureFlight":6,"ticketNumber":117,"seatNumber":261,"actualLoadRate":"44.82758621",ticketAmount:13688},
             {"beginStation":"雅安","endStation":"雅安","departureFlight":589,"ticketNumber":4001,"seatNumber":15068,"actualLoadRate":"26.55295992",ticketAmount:75549}

         ];
     }
    
});