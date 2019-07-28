/**
 * beforeCreate
 *      map aMap mapData
 * created
 * mounted
 *      initMap， initMapEventLietener
 * beforeDestroy
 *      distroyMapEventLietener，  distroyMap
 */
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
				zoom: 9, //初始化地图
				center: self.mapData.centerCoordinate,
				preloadMode: true
			});
			self.map.setFeatures(self.mapData.features);
			self.map.setMapStyle(self.mapData.mapStyle);
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
                // alert(e.lnglat.lng + "," + e.lnglat.lat)
                alert(e.lnglat.lng)
                alert(e.lnglat.lat)
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
		//绘制线边界
        drawBackground: function () {
            let self = this;
            //加载相关组件
            AMapUI.load(['ui/geo/DistrictCluster', 'lib/$'], function(DistrictCluster, $) {
                let i = 0;
                //启动页面
                var distCluster = new DistrictCluster({
                    map: self.map, //所属的地图实例
                    zIndex:13,
                    topAdcodes:[140200],
                    autoSetFitView: false,
                    getPosition: function(item) {
                        if (!item) {
                            return null;
                        }
                        var parts = item.split(',');
                        //返回经纬度
                        return [parseFloat(parts[0]), parseFloat(parts[1])];
                    },
                    renderOptions: {
                        getClusterMarker: function(feature, dataItems, recycledMarker) {
                            //label内容
                            var content =feature.properties.name+' ('+dataItems.length+')';

                            var label = {
                                offset: new AMap.Pixel(16, 18), //修改label相对于marker的位置
                                content: content
                            };

                            //存在可回收利用的marker
                            if (recycledMarker) {
                                //直接更新内容返回
                                recycledMarker.setLabel(label);
                                return recycledMarker;
                            }

                            //返回一个新的Marker
                            return new AMap.Marker({
                                label: label
                            });
                        },
                        //基础样式
                        featureStyle: {
                            fillStyle: 'rgba(102,170,0,0.5)', //填充色
                            lineWidth: 2, //描边线宽
                            strokeStyle: 'rgb(31, 119, 180)', //描边色
                            //鼠标Hover后的样式
                            hoverOptions: {
                                fillStyle: 'rgba(255,255,255,0.2)',
                                lineWidth: 5,
                                strokeStyle:"#FFFFFF"
                            }
                        },
                        //特定区划级别的默认样式
                        featureStyleByLevel: {
                            //全国
                            country: {
                                fillStyle: 'rgba(49, 163, 84, 0.8)'
                            },
                            //省
                            province: {
                                fillStyle: 'rgba(116, 196, 118, 0.7)'
                            },
                            //市
                            city: {
                                fillStyle: 'rgba(161, 217, 155, 0.6)'
                            },
                            //区县
                            district: {
                                fillStyle: 'rgba(199, 233, 192, 0.5)'
                            }
                        },
                        //直接定义某写区划面的样式
                        getFeatureStyle: function(feature, dataItems) {
                            var colors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00"];
                            var fillColor = colors[i % colors.length];
                            i++;
                            return {
                                fillStyle: fillColor
                            };
                        }
                    }
                });

                $.get('https://a.amap.com/amap-ui/static/data/10w.txt', function(csv) {
                    var data = csv.split('\n');

                    distCluster.setData(data);
                    distCluster.zoomToShowSubFeatures(140200, [113.272278,40.090932]);

                    //事件支持
                    distCluster.on('featureClick', function(e, feature) {
                        // alert(feature.properties.adcode)
                    });
                });


            });

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
		this.drawBackground(); //实际开发中就写地图加载之后
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
            centerCoordinate: [113.272278,40.090932], //地图中心坐标
            features: ['bg', 'road', 'point'],
            mapStyle: 'amap://styles/d6ddb62dcec953082bd4437bddfd75f8',
            mapInvest: [] //获得地图 已投资产值排序 getMapInvest
        }
    }
});