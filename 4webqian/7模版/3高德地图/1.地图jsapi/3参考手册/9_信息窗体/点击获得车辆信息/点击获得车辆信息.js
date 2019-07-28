var vue = new Vue({
	el: "#app",
	data: function() {
		return {
			map: '', //全局地图函数
			mapData: {
				centerCoordinate: [112.90747518931073, 27.859305978350736], //地图中心坐标
				features: ['bg', 'road', 'point'],
				mapStyle: 'amap://styles/d6ddb62dcec953082bd4437bddfd75f8',
				lng: '',
				lat: ''
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
				self.mapData.lng = e.lnglat.getLng();
				self.mapData.lat = e.lnglat.getLat();
				//触发搜索车辆事件
				self.openCarInfoWindow();
			});
		},
		addBusyStationsClearMarkers: function() {
			let self = this;
		},
		openCarInfoWindow: function() {
			let self = this;

			// infowidnow 的 innerHTML
			var infoWindowContent = '<div>dfsdfsd</div>';

			// 创建一个自定义内容的 infowindow 实例
			var infoWindow = new AMap.InfoWindow({
				position: new AMap.LngLat(self.mapData.lng, self.mapData.lat),
				offset: new AMap.Pixel(0, 0),
				content: infoWindowContent
			});

			infoWindow.open(self.map);
		},

	},
	created: function() {
		let self = this;
		this.getContextPath();
	},
	mounted: function() {
		let self = this;
		this.mainMap();
		self.initMapEventLietener(); //初始化地图注册函数
		//initPageConfig
		//		this.addBusyStationsClearMarkers();
		 //实际开发中这里是写在ajax的回调函数里面的，写在create或者其他method
	}
});