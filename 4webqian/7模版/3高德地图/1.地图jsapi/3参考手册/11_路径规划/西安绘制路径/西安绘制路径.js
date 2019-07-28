var vue = new Vue({
    el: "#app",
    data: function() {
        return {

        }
    },
    methods: {
        getContextPath: function () {
            let local = document.location;
            let contextPath = "/" + local.pathname.split('/')[1];
            let basePath = local.protocol + "//" + local.host + "/" + contextPath;
            this.contextPath = contextPath;//项目路径
        },
        //初始化地图(只执行一次)
        initMap: function() {
            let self = this;
            self.map = new AMap.Map('mapcontent', {
                resizeEnable: true,
                zoom: 14, //初始化地图
                center: self.mapData.centerCoordinate,
                preloadMode: true
            });
            self.map.setFeatures(self.mapData.features);
            // self.map.setMapStyle(self.mapData.mapStyle);
            self.map.plugin(["AMap.ToolBar", "AMap.MarkerClusterer", "AMap.Driving", "AMap.Walking"], function () {
                let toolBar = {
                    locate : false//是否显示定位按钮，默认为false
                }
                self.map.addControl(self.aMap.control.toolBar = new AMap.ToolBar(toolBar));
                self.map.addControl(self.aMap.control.markerClusterer = new AMap.MarkerClusterer());
                self.map.addControl(self.aMap.control.driving = new AMap.Driving());
                self.map.addControl(self.aMap.control.walking = new AMap.Walking());
            });
        },
        //地图注册事件
        initMapEventLietener: function () {
            var self = this;
            //地图点击事件
            this.map.on('click', self.aMap.event.click = function(e) {
                alert('item.push([' + e.lnglat.lng + "," + e.lnglat.lat + ']);')
            }, self);
            //地图缩放事件
            this.map.on("zoomchange", self.aMap.event.zoomchange = function () {
            }, self);
            //地图停止拖拽地图事件
            this.map.on("dragend",  self.aMap.event.dragend = function () {
                self.map.clearInfoWindow();
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
        drawOdPolygon:function(){//加载地图后画od时的基础网格
            var self = this;

            var item = [];
            item.push([109.001815,34.174395]);
            item.push([109.002115,34.171217]);
            item.push([109.002287,34.168376]);
            item.push([109.002373,34.167737]);
            /*item.push([109.002716,34.166033]);

            item.push([109.003145,34.162979]);

            item.push([109.003918,34.15609]);
            item.push([109.003918,34.14849]);

            item.push([109.001815,34.174395]);*/

            var walkOption = {
                map: self.map,
                panel: "panel",
                hideMarkers: false,
                isOutline: true,
                outlineColor: '#ffeeee',
                autoFitView: true
            }
            // 构造路线导航类
            let driving = new AMap.Walking (walkOption);
            for (let i = 0; i < item.length - 1; i++) {
                (function (i) { //闭包， 用于画线的(折线)
                driving.search(item[i], item[i + 1],
                    function (status, result) {
                        //status为complete时，result为DrivingResult；
                        if (status == 'complete') {
                            debugger
                            //拼接节点坐标数组
                            let steps = result.routes[0].steps;
                            let drawPath = [];
                            for (let ii = 0; ii < steps.length; ii++) {
                                drawPath = drawPath.concat(steps[ii].path);
                            }
                            let polyline = new AMap.Polyline({//绘制折线路径
                                map: self.map,
                                path: drawPath,
                                strokeColor: "#000",
                                strokeOpacity: 1,
                                strokeWeight: 4,
                                strokeDasharray: [10, 5],
                                lineJoin: 'round',
                                lineCap: 'round',
                                // showDir: true
                            });
                        }
                    }
                );
                })(i);
            }

        },
    },
    created: function() {
        let self = this;
        this.getContextPath();
    },
    mounted: function() {
        let self = this;
        this.initMap();
        this.initMapEventLietener();
        this.drawOdPolygon();
    },
    beforeDestroy: function() {
        let self = this;
        //删除地图
        this.distroyMapEventLietener();//注销地图注册函数
        this.distroyMap();
    },
    beforeCreate: function () {
        this.map=null;
        this.aMap = {
            //地图控件
            control: {
                toolBar: null
            },
            //地图事件
            event: {
                click: null,
                zoomchange: null,
                dragend: null
            },
            //覆盖物
            markers: {
                // 企业点
                qyMarker: []
            },
            //覆盖物事件
            markersEvent: {}
        };
        this.mapData = {
            centerCoordinate: [108.989927,34.164435], //地图中心坐标
            features: ['bg', 'point', 'road'],
            // mapStyle: 'amap://styles/d6ddb62dcec953082bd4437bddfd75f8',
            mapInvest: [] //获得地图 已投资产值排序 getMapInvest
        }
    }
});