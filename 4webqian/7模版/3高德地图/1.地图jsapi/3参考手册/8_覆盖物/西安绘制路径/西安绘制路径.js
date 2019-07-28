
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
            self.map.plugin(["AMap.ToolBar", "AMap.MarkerClusterer"], function () {
                let toolBar = {
                    locate : false//是否显示定位按钮，默认为false
                }
                self.map.addControl(self.aMap.control.toolBar = new AMap.ToolBar(toolBar));
                self.map.addControl(self.aMap.control.markerClusterer = new AMap.MarkerClusterer());
            });
        },
        //地图注册事件
        initMapEventLietener: function () {
            var self = this;
            //地图点击事件
            this.map.on('click', self.aMap.event.click = function(e) {
                alert('grid_path.push([' + e.lnglat.lng + "," + e.lnglat.lat + ']);')
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
            var grid_path = [];
            grid_path.push([109.001815, 34.174412]);
            grid_path.push([109.002072, 34.171927]);
            grid_path.push([109.002072,34.169353]);
            grid_path.push([108.997094,34.170524]);
			self.odPolygon =  new AMap.Polygon({
				map: self.map,
				path: grid_path,
				strokeColor: "#270dca",
				strokeOpacity: 1,
				strokeWeight: 10,
				fillColor: 'none',
				fillOpacity: 0.25
			});
            self.odPolygon.on('click', function (e) {
                debugger
            }, self);//给多边形绑定点击事件——画odTop
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