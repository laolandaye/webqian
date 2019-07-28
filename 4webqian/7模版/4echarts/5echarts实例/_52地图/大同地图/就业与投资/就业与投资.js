var vue = new Vue({
    el: "#app",
    data: function () {
        return {
            activeName:'stationArea',//选中的tab
            isFullSrceen:false,//全屏显示或退出全屏(icon-compress)
            mapEcharts: [],  //开始ref指向 dom节点，然后是ajax返回的数据（监测数据）
        }
    },
    computed: {
        mapEchartsChartOption: function () {
            let self = this;
            var geoCoordMap = {};
            var data = [];

            for (var i = 0; i < this.mapEcharts.length; i++) {
                self.$set(geoCoordMap, this.mapEcharts[i].area_name + '', [this.mapEcharts[i].lng, this.mapEcharts[i].lat]);
                data.push({
                    name:  this.mapEcharts[i].area_name + '',
                    value:  this.mapEcharts[i].pm2,
                    areaId:  this.mapEcharts[i].area_id,
                    lng:  this.mapEcharts[i].lng,
                    lat:  this.mapEcharts[i].lat,
                    investment_total:  this.mapEcharts[i].investment_total,
                    investment_completed:  this.mapEcharts[i].investment_completed,
                    pm:  this.mapEcharts[i].pm
                });
            }

            this.mapEchartsIntervalLength = data.length;

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
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        return `${params.data.name} 排名：第${params.data.pm}<br />已完成投资：${params.data.investment_completed}亿元<br />总投资：${params.data.investment_total}亿元`
                    }
                },
                visualMap: {
                    show:false,
                    min: 1,
                    max: 4,
                    z: 2,
                    calculable: true,
                    seriesIndex: [1],
                    inRange: {
                        color: ["#e697b1", "#fed49c", "#aeecb4", "rgba(4, 23, 66, 0)"], // 黑紫黑
                        colorAlpha: 0.8,
                        opacity: 0.8
                    }
                },
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
                    zoom:1.4,
                    roam: true,
                    itemStyle: {
                        borderColor: '#43b2ca',
                        borderWidth: 2,//设置外层边框
                        shadowColor: '#270dca',
                        shadowBlur: 10,
                        shadowOffsetX: 3,
                        shadowOffsetY: 3,
                    },
                    emphasis: {
                        itemStyle: {
                            /* borderWidth: 3,//设置外层边框
                             shadowColor: '#80D9F8',
                             shadowBlur: 15,
                             shadowOffsetX: 5,
                             shadowOffsetY: 5,*/
                        },
                    }
                },
                series : [
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(data),
                        label: {
                            normal: {
                                formatter: function (item) {
                                    return `${item.data.name}`
                                },
                                position: 'right',
                                fontSize: 14,
                                show: true
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: '#FFF'
                            }
                        }
                    },
                    {
                        type: 'map',
                        map: 'datong',
                        geoIndex: 0,
                        aspectScale: 0.75, //长宽比
                        showLegendSymbol: false, // 存在legend时显示
                        zoom:1.4,
                        scaleLimit:{
                            min:1,
                            max :5,
                        },
                        z: 1,
                        roam: true,
                        animation: false,
                        data: data
                    },
                ]
            };
            return option;


        },
        maxItemStyleObj:function(){
            var self = this;
            var styleObj = {
                width:(document.getElementById("maxItem").clientWidth-1)+"px",
                height:(document.getElementById("maxItem").clientHeight-1)+"px",
                position:"absolute",
                top:"-"+(document.getElementById("mapLoc").getBoundingClientRect().top)+"px",
                left:"-"+(document.getElementById("mapLoc").getBoundingClientRect().left)+"px",
                padding:"0px",
                backgroundColor:"#041742"
            };
            if(self.isFullSrceen){
                return styleObj;
            }else {
                return {}
            }
        },
        maxItemStyleObj2:function(){
            var self = this;
            var styleObj = {
                width:(document.getElementById("maxItem").clientWidth-301)+"px",
                height:(document.getElementById("maxItem").clientHeight-1)+"px",
                position:"absolute",
                top:"20px",
                left:"300px",
                padding:"0px",
                backgroundColor:"#041742"
            };
            if(self.isFullSrceen){
                return styleObj;
            }else {
                return {}
            }
        },
    },
    methods: {
        getContextPath: function () {
            var contextPath = document.location.pathname;
            var contextPath = contextPath.split('/')[1];
            var contextPath = "/" + contextPath;
            this.contextPath = contextPath;
        },
        handleFullScreenChange:function(){//全屏和退出全屏时的切换
            var self = this;
            if(self.isFullSrceen){
                self.isFullSrceen = false;//目前全屏状态，退出
            }else{
                self.isFullSrceen = true;//目前小屏状态，进入全屏
            }
            setTimeout(function () {
                self.mapEchartsChart && self.mapEchartsChart.resize();
            }, 30)
        },
        initMapEchartsChart: function () {
            let self = this;
            //这个不使用强哥组件
            this.mapEchartsChart = echarts.init(this.$refs.mapEcharts);
//             this.mapEchartsChart = echarts.init(this.$refs.echar2, "qhjscEchartsTheme");
//             this.mapEchartsChart.showLoading();
//             $.getJSON(uploadedDataURL2, function(geoJson) {
            echarts.registerMap('datong', ownmaps.datong );
            self.mapEchartsChart && self.mapEchartsChart.setOption(self.mapEchartsChartOption);
            // });
            let EC = echarts.getInstanceByDom(this.$refs.mapEcharts);
            var index = 0
            setInterval(function () {
                EC.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: index
                })
                index++
                if (index >= self.mapEchartsIntervalLength) {
                    index = 0
                }
            }, 3000)
            this.mapEchartsChart.on('click', function (params) {
                console.log(params)
            });
            window.addEventListener("resize", function () {
                self.mapEchartsChart && self.mapEchartsChart.resize();
            });
        },
    },
    watch: {
        mapEchartsChartOption: function (newVal) {
            this.mapEchartsChart && this.mapEchartsChart.setOption(newVal);
        },
    },
    created: function () {
        this.getContextPath();
    },
    mounted: function () {
        let self = this;
        this.mapEcharts = [{"area_name":"灵丘县","lng":"114.233269","pm2":1,"investment_total":1.53,"investment_completed":2.16,"area_id":"140224","pm":1,"lat":"39.442025"},{"area_name":"云州区","lng":"113.609795","pm2":2,"investment_total":1.25,"investment_completed":1.55,"area_id":"140227","pm":2,"lat":"40.047756"},{"area_name":"广灵县","lng":"114.271722","pm2":3,"investment_total":0.56,"investment_completed":0.87,"area_id":"140223","pm":3,"lat":"39.761573"},{"area_name":"云冈区","lng":"113.16892","pm2":4,"investment_total":1.07,"investment_completed":0.87,"area_id":"140211","pm":4,"lat":"40.024624"},{"area_name":"阳高县","lng":"113.749871","pm2":4,"investment_total":0.76,"investment_completed":0.81,"area_id":"140221","pm":5,"lat":"40.369112"},{"area_name":"天镇县","lng":"114.090447","pm2":4,"investment_total":0.63,"investment_completed":0.8,"area_id":"140222","pm":6,"lat":"40.425518"},{"area_name":"新荣区","lng":"113.137623","pm2":4,"investment_total":1.19,"investment_completed":0.8,"area_id":"140212","pm":7,"lat":"40.260365"},{"area_name":"平城区","lng":"113.300069","pm2":4,"investment_total":0.29,"investment_completed":0.41,"area_id":"140202","pm":8,"lat":"40.091359"},{"area_name":"左云县","lng":"112.703663","pm2":4,"investment_total":1.0,"investment_completed":1.0,"area_id":"140226","pm":9,"lat":"40.016299"},{"area_name":"浑源县","lng":"113.689446","pm2":4,"investment_total":1.0,"investment_completed":1.0,"area_id":"140225","pm":10,"lat":"39.699099"},{"area_name":"开发区","lng":"113.168594","pm2":4,"investment_total":1.0,"investment_completed":1.0,"area_id":"140203","pm":11,"lat":"40.035885"}];
        this.$nextTick(function () {
            self.initMapEchartsChart();
        });
    },
    beforeCreate: function () {
        let self = this;
        this.contextPath='';
        this.mapEchartsIntervalLength = 0;
    }
})