var vue = new Vue({
	el: "#app",
	data: function() {
		return {
			map: '', //全局地图函数
			mapData: {
				centerCoordinate: [112.90747518931073, 27.859305978350736], //地图中心坐标
				features: ['bg', 'road', 'point'],
				mapStyle: 'amap://styles/d6ddb62dcec953082bd4437bddfd75f8',
				//地图线坐标点
				/**多条公交线路lineStations,线路（站点坐标lineStationLngLat，线路名，...）
				 * lineStations: [
				 * 		{lineStationLngLat: [],..},
				 * 		{lineStationLngLat: [],..},
				 * 		{lineStationLngLat: [],..}
				 * ]
				 */
				lineStations: [
					{
						lineCode: 2,
						lineStationLngLat: [
							[112.864871,27.86425],
							[112.871651,27.861666],
							[112.874649,27.860538],
							[112.880865,27.858139],
							[112.883751,27.857920],
							[112.887337,27.858715],
							[112.889297,27.859207],
							[112.891869,27.859814],
							[112.895210,27.860552],
							[112.900330,27.861792],
							[112.906075,27.860855],
							[112.907700,27.859348],
							[112.910284,27.863085],
							[112.908035,27.863680],
							[112.904572,27.866266],
							[112.903328,27.869757],
							[112.902763,27.873146],
							[112.903854,27.875334],
							[112.906166,27.879484],
							[112.905708,27.883989],
							[112.902306,27.887960],
							[112.898697,27.891418],
							[112.895363,27.894545],
							[112.890747,27.899805],
							[112.884328,27.906504],
							[112.881561,27.909979],
							[112.879761,27.912374],
							[112.874496,27.918007],
							[112.865239,27.927153],
							[112.862221,27.931723],
							[112.860466,27.938473],
							[112.859755,27.942116],
							[112.859634,27.948009],
							[112.858215,27.952444],
							[112.859962,27.956858],
							[112.860001,27.961168]
						],
					},
					{
						lineCode: 23,
						lineStationLngLat: [
							[112.912376,27.872587],
							[112.912029,27.871146],
							[112.911537,27.868984],
							[112.910851,27.865847],
							[112.910118,27.862818],
							[112.907829,27.859484],
							[112.905215,27.858255],
							[112.904689,27.855633],
							[112.90684,27.855595],
							[112.914925,27.843273],
							[112.917432,27.836909],
							[112.919618,27.832851],
							[112.921249,27.830578],
							[112.922531,27.82897],
							[112.924698,27.825929],
							[112.926914,27.824943],
							[112.929043,27.826067],
							[112.932906,27.827761],
							[112.937557,27.82824],
							[112.943489,27.828852],
							[112.949122,27.829421],
							[112.952781,27.829843],
							[112.954674,27.830076],
							[112.956682,27.826717],
							[112.956722,27.820797],
							[112.956776,27.816736],
							[112.957471,27.812983],
							[112.965078,27.792712],
							[112.959778,27.788353],
							[112.9565,27.786844],
							[112.953427,27.78542],
							[112.948373,27.783194],
							[112.94714,27.780859],
							[112.948144,27.778651],
							[112.949893,27.778271],
							[112.951947,27.778105],
							[112.952119,27.775547],
							[112.951116,27.773601]
						],
					}
				],
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
			self.map.plugin(["AMap.ToolBar", "AMap.MarkerClusterer", "AMap.Driving"], function () {
                self.map.addControl(new AMap.ToolBar());
                self.map.addControl(new AMap.MarkerClusterer());
                self.map.addControl(new AMap.Driving());
            });
		},
		drawGJLines: function() {
			let self = this;
			 // 设置画线路径
	        for (let j = 0; j < self.mapData.lineStations.length; j++) {
	            // 构造路线导航类
	            let driving = new AMap.Driving({
	                autoFitView: false,
	                policy: AMap.DrivingPolicy.LEAST_DISTANCE  //最短距离模式
	            });
	
	            let lineStationColor = commonData.colors[j];
	
	            //拆分成16个为一组的数组
	            let tempArr = commonMain.splitArr(self.mapData.lineStations[j].lineStationLngLat);
	            tempArr.forEach(function (item, index) {
	                // 根据起终点经纬度规划驾车导航路线
	                (function (j) { //闭包， 用于画线的(折线)
	                    driving.search(item[0], item[item.length - 1], {waypoints: item.slice(1, item.length - 1)},
	                        function (status, result) {
	                            //status为complete时，result为DrivingResult；
	                            if (status == 'complete') {
	                                //拼接节点坐标数组
	                                let steps = result.routes[0].steps;
	                                let drawPath = [];
	                                for (let ii = 0; ii < steps.length; ii++) {
	                                    drawPath = drawPath.concat(steps[ii].path);
	                                }
	                                let polyline = new AMap.Polyline({//绘制折线路径
	                                    map: self.map,
	                                    path: drawPath,
	                                    strokeColor: lineStationColor,
	                                    strokeOpacity: 0.7,
	                                    strokeWeight: 4,
	                                    strokeDasharray: [10, 5],
	                                    lineJoin: 'round',
	                                    lineCap: 'round',
	                                    // showDir: true
	                                });
	                            }
	                        }
	                    );
	                })(j);
	            });
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
		this.drawGJLines(); //实际开发中这里是写在ajax的回调函数里面的，写在create或者其他method
	}
});