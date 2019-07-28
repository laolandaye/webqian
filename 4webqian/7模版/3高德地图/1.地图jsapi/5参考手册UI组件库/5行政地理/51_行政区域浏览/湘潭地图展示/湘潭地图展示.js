var vue = new Vue({
	el: "#app",
	data: function() {
		return {
			map: '', //全局地图函数
			mapData: {
				centerCoordinate: [112.90747518931073, 27.859305978350736], //地图中心坐标
				features: ['bg', 'road', 'point'],
				mapStyle: 'amap://styles/d6ddb62dcec953082bd4437bddfd75f8'
				
			},
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
		mainMap: function() {
			let self = this;
			self.map = new AMap.Map('mapcontent', {
				resizeEnable: true,
				zoom: 13, //初始化地图
				center: self.mapData.centerCoordinate,
				preloadMode: true
			});
			self.map.setFeatures(self.mapData.features);
			self.map.setMapStyle(self.mapData.mapStyle);
			self.map.plugin(["AMap.ToolBar", "AMap.MarkerClusterer"], function () {
                self.map.addControl(new AMap.ToolBar());
                self.map.addControl(new AMap.MarkerClusterer());
            });
		},
		//绘制线边界
        drawBackground: function () {
            let self = this;
            // if(typeof(AMapUI) == "undefined"){
            // 	$.getScript("http://webapi.amap.com/ui/1.0/main.js?v=1.0.11").done(function(script,textstatus){
            // 		if(textstatus == "success" && typeof(AMapUI) != undefined ){


            AMapUI.loadUI(['geo/DistrictExplorer'], function (DistrictExplorer) {
                //启动页面
                initPage(DistrictExplorer);
            });

            // 		}
            // 	})
            // }
			
			function initPage(DistrictExplorer) {
				var districtExplorer = new DistrictExplorer({
                    map: self.map,
                    eventSupport: true,
                });
                var adcode = 430300; //全国的区划编码
                districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
                    if (error) {
                        return;
                    }
                    //绘制载入的区划节点
                    renderAreaNode(districtExplorer, areaNode);
                });
			}

            function renderAreaNode(districtExplorer, areaNode) {
                //清除已有的绘制内容
                districtExplorer.clearFeaturePolygons();
                //just some colors
                var colors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00"];
                //绘制子级区划
                districtExplorer.renderSubFeatures(areaNode, function (feature, i) {
                    var fillColor = colors[i % colors.length];
                    var strokeColor = colors[colors.length - 1 - i % colors.length];
                    return {
                        cursor: 'default',
                        bubble: true,
                        strokeColor: strokeColor, //线颜色
                        strokeOpacity: 1, //线透明度
                        strokeWeight: 1, //线宽
                        fillColor: fillColor, //填充色
                        fillOpacity: 0.35, //填充透明度
                    };
                });
                //绘制父级区划，仅用黑色描边
                districtExplorer.renderParentFeature(areaNode, {
                    cursor: 'default',
                    bubble: true,
                    strokeColor: 'black', //线颜色
                    fillColor: null,
                    strokeWeight: 3, //线宽
                });
                
                //调整可视化布局，会自动改变经纬度大小
                self.map.setFitView(districtExplorer.getAllFeaturePolygons());
     
            }
        },
	},
	created: function() {
		let self = this;
        this.getContextPath();
	},
	mounted: function() {
		let self = this;
		this.mainMap();
		this.drawBackground(); //实际开发中就写地图加载之后
	}
});