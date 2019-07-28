var vue = new Vue({
	el: "#app",
	data: function() {
		return {
			map: '', //全局地图函数
			mapData: {
				centerCoordinate: [112.90747518931073, 27.859305978350736], //地图中心坐标
				features: ['bg', 'road', 'point'],
				mapStyle: 'amap://styles/d6ddb62dcec953082bd4437bddfd75f8',
				lng: '',	//用于存放当前点击点的坐标
				lat: '',
				carInfo: [{"start_station":"湘乡市泉塘","end_station":"湘潭县汽车站","car":"湘C76323,湘C76991,湘C77158,湘C77136"},{"start_station":"湘潭县南冲","end_station":"湘潭县汽车站","car":"湘C57538"},{"start_station":"湘潭县坳才","end_station":"湘潭县汽车站","car":"湘C57529"},{"start_station":"湘潭县星燎","end_station":"湘潭县汽车站","car":"湘C60037"},{"start_station":"湘潭县景泉","end_station":"湘潭县汽车站","car":"湘C56833"},{"start_station":"湘潭县梅市","end_station":"湘潭县汽车站","car":"湘C60326,湘C58036"},{"start_station":"湘潭县歇马","end_station":"湘潭县汽车站","car":"湘C57581,湘C58811"},{"start_station":"湘潭县汾水","end_station":"湘潭县汽车站","car":"湘C59073"},{"start_station":"湘潭县石坝","end_station":"湘潭县汽车站","car":"湘C57158"},{"start_station":"湘潭县石鼓","end_station":"湘潭县汽车站","car":"湘C56139,湘C56797"},{"start_station":"湘潭县碧泉","end_station":"湘潭县汽车站","car":"湘C60031"},{"start_station":"湘潭县联兴","end_station":"湘潭县汽车站","car":"湘C58727"},{"start_station":"湘潭县船形","end_station":"湘潭县汽车站","car":"湘C59132"},{"start_station":"湘潭县花桥","end_station":"湘潭市汽车西站","car":"湘C60101,湘C57381"},{"start_station":"湘潭县花石","end_station":"湘潭县汽车站","car":"湘C57273,湘C56799,湘C58082,湘C58719,湘C58037,湘C58199,湘C58265,湘C58081,湘C57795,湘C58089,湘C59163,湘C57718"},{"start_station":"湘潭县茅亭","end_station":"湘潭县汽车站","car":"湘C57638"},{"start_station":"湘潭县金石","end_station":"湘潭县汽车站","car":"湘C57892"},{"start_station":"湘潭县铁炉","end_station":"湘潭县汽车站","car":"湘C58739"},{"start_station":"湘潭县高塘","end_station":"湘潭县汽车站","car":"湘C58109"},{"start_station":"湘乡市汽车站","end_station":"湘潭县汽车站","car":"湘C76391,湘C73702,湘C77008"},{"start_station":"湘潭县万古桥","end_station":"湘潭县汽车站","car":"湘C60111,湘C60109,湘C60106"},{"start_station":"湘潭县大坟山","end_station":"湘潭县汽车站","car":"湘C58128"},{"start_station":"湘潭县方上桥","end_station":"湘潭县汽车站","car":"湘C56883"},{"start_station":"湘潭县楠竹山","end_station":"湘潭县汽车站","car":"湘C56776"},{"start_station":"湘潭县汽车站","end_station":"湘乡市泉塘","car":"湘C59823"},{"start_station":"湘潭县汽车站","end_station":"湘潭县坝塘","car":"湘C57557"},{"start_station":"湘潭县汽车站","end_station":"湘潭县日华","car":"湘C56189"},{"start_station":"湘潭县汽车站","end_station":"湘潭县盐埠","car":"湘C58702"},{"start_station":"湘潭县汽车站","end_station":"湘潭县石潭","car":"湘C59875,湘C55825,湘C60328,湘C59071,湘C55868,湘C60367,湘C58926,湘C60327"},{"start_station":"湘潭县汽车站","end_station":"湘潭县石鼓","car":"湘C59712,湘C58821"},{"start_station":"湘潭县汽车站","end_station":"湘潭县花石","car":"湘C59860,湘C57876,湘C58705,湘C59187,湘C57286,湘C56837,湘C57328,湘C57577,湘C59101,湘C58097"},{"start_station":"湘潭县汽车站","end_station":"湘潭县金石","car":"湘C58017"},{"start_station":"湘潭县汽车站","end_station":"湘潭县冷水湾","car":"湘C5M357"},{"start_station":"湘潭县汽车站","end_station":"湘潭县茶恩寺","car":"湘C56818,湘C57563,湘C57560,湘C60105,湘C56858,湘C58826,湘C58775,湘C58772,湘C58779,湘C58033,湘C58291,湘C58193,湘C57361,湘C59831,湘C60126,湘C60110,湘C60133"},{"start_station":"湘潭县汽车站","end_station":"湘潭县郭家桥","car":"湘C58083,湘C58113"},{"start_station":"湘潭县汽车站","end_station":"湘潭县黄荆坪","car":"湘C56159"},{"start_station":"湘潭县汽车站","end_station":"韶山市汽车站","car":"湘C57376"},{"start_station":"湘潭县火口岭","end_station":"湘潭县汽车站","car":"湘C60026"},{"start_station":"湘潭县继述桥","end_station":"湘潭县汽车站","car":"湘C58929,湘C60027,湘C59197"},{"start_station":"湘潭县茶恩寺","end_station":"湘潭县汽车站","car":"湘C60129,湘C59656,湘C58733,湘C60113,湘C58010,湘C60115,湘C58168,湘C60117,湘C59723,湘C56501,湘C58189,湘C58256,湘C57556,湘C59730"},{"start_station":"湘潭县踏莲桥","end_station":"湘潭县汽车站","car":"湘C60323"},{"start_station":"湘潭县郭家桥","end_station":"湘潭县汽车站","car":"湘C60306,湘C58072,湘C59102"},{"start_station":"湘潭县东风水库","end_station":"湘潭县汽车站","car":"湘C57698"},{"start_station":"湘潭市汽车西站","end_station":"湘潭县指路碑","car":"湘C14202"},{"start_station":"湘潭县龙口石膏矿","end_station":"湘潭县汽车站","car":"湘C57591"}],
				infoWindows: {
                    carInfoWindows: []
                }
			},
		}
	},
	methods: {
		getContextPath: function() {
			let local = document.location;
			let contextPath = "/" + local.pathname.split('/')[1];
			let basePath = local.protocol + "//" + local.host + "/" + contextPath;
			this.contextPath = contextPath; //项目路径
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
			self.map.plugin(["AMap.ToolBar", "AMap.MarkerClusterer"], function() {
				self.map.addControl(new AMap.ToolBar());
				self.map.addControl(new AMap.MarkerClusterer());
			});
		},
		initMapEventLietener: function() { //地图注册函数
			let self = this;
			//地图点击事件
			this.map.on('click', function(e) {
				self.closeCarInfoWindow();
				self.mapData.lng = e.lnglat.getLng();
				self.mapData.lat = e.lnglat.getLat();
				//触发搜索车辆事件
				self.openCarInfoWindow();
			});
		},
		closeCarInfoWindow: function() {
			let self = this;
			 let carInfoWindows = self.mapData.infoWindows.carInfoWindows;
            // 关闭信息窗体
            if (carInfoWindows && carInfoWindows.length) {
                for (let i = 0; i < carInfoWindows.length; i++) {
                    carInfoWindows[i].close();
                }
            }
		},
		 openCarInfoWindow: function() {
            let self = this;

            let carInfo = self.mapData.carInfo;
            if(carInfo && carInfo.length) {
                // infowidnow 的 innerHTML
                var infoWindowContent = '<div class="car-info-div">';
                infoWindowContent += '<div class="car-info-title"><div class="car-info-left">起点</div><div class="car-info-left">终点</div><div class="car-info-right">线路车辆</div></div>';
                self.mapData.carInfo.forEach(function(item, index, obj) {
                    infoWindowContent += '<div class="car-info-centent"><div class="car-info-left">' + item['start_station'] + '</div><div class="car-info-left">' + item['end_station'] + '</div><div class="car-info-right">' + item['car'] + '</div></div>';
                })
                infoWindowContent += '</div>';

                // 创建一个自定义内容的 infowindow 实例
                var infoWindow = new AMap.InfoWindow({
                    position: new AMap.LngLat(self.mapData.lng, self.mapData.lat),
                    offset: new AMap.Pixel(0, 0),
                    content: infoWindowContent
                });

                infoWindow.open(self.map);
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
		this.initMapEventLietener(); //初始化地图注册函数
		//initPageConfig
		//		this.addBusyStationsClearMarkers();
		 //实际开发中这里是写在ajax的回调函数里面的，写在create或者其他method
	}
});