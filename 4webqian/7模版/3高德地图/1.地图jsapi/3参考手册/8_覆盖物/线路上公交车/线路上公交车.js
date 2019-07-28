var vue = new Vue({
	el: "#app",
	data: function() {
		return {
			
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
		addBusyStationsClearMarkers: function() {
			let self = this;
			//先清除页面覆盖物
			let busyStationsMarkers = self.mapData.markers.busyStationsMarkers;
			if(busyStationsMarkers.length) {
				// 全清
				for(let j = 0; j < busyStationsMarkers.length; j++) { //地图清0
					self.map.remove(busyStationsMarkers[j]);
				}
				self.mapData.markers.busyStationsMarkers = []; //覆盖物清0
			}
		},
		addBusyStations: function() {
			let self = this;
			let scaleBy = Math.pow(2, (self.map.getZoom() - 13)); //基本比列尺

			let busyStations = self.mapData.busyStations;
			if (self.mapData.busOnMap.length) {
                    // debugger
                    let busOnMap = self.mapData.busOnMap;
                    // 遍历对象
                    for (let i = 0; i < busOnMap.length; i++) {
                    	console.log(busOnMap[i]['lng']+ "," +busOnMap[i]['lat']);
                    	console.log(AMap.LngLat(busOnMap[i]['lng'] * 1 ,busOnMap[i]['lat'] * 1));
                        let busOnMapMarker = new AMap.Marker({
                            map: self.map,
                            position: [busOnMap[i]['lng'] * 1 ,busOnMap[i]['lat'] * 1],
                            icon: new AMap.Icon({
                                image: "../img/bus2.png",
                                size: new AMap.Size(58 * scaleBy, 58 * scaleBy), // 图标大小
                                imageOffset: new AMap.Pixel(0, 0),
                                imageSize: new AMap.Size(36 * scaleBy, 36 * scaleBy)
                            }),
                            // 这里用/img/loc.png图片的left:一半;top:全部
                            // offset: new AMap.Pixel(-(20 * scaleBy), -(20 * scaleBy))
                        });
                        // endPointMarker.setTitle('' + endPoint[i]['line_name']);

                        //存入覆盖物，偏于下一次清除
                        // self.mapData.markers.endPointMarkers.push({
                        //     line_code: endPoint[i]['line_code'],
                        //     kind: endPoint[i]['kind'],
                        //     arr: endPointMarker
                        // });
                    }
                    //存入回调函数数组
                    // self.mapData.dataCache.endPointCache.push(...self.mapData.startEndPoint.endPoint);
                }
			//可删除  start
			self.map.setFitView();
			//end
		},

	},
	created: function() {
		let self = this;
		this.getContextPath();
	},
	mounted: function() {
		let self = this;
		this.mainMap();
		//initPageConfig
//		this.addBusyStationsClearMarkers();
		this.addBusyStations(); //实际开发中这里是写在ajax的回调函数里面的，写在create或者其他method
	},
	beforeCreate: function() {
		this.map = ''; //全局地图函数
		this.mapData = {
			centerCoordinate: [112.90747518931073, 27.859305978350736], //地图中心坐标
			features: ['bg', 'road', 'point'],
			mapStyle: 'amap://styles/d6ddb62dcec953082bd4437bddfd75f8',
			busOnMap: [{"car_no":"24-23","car_record":"湘C13015","line_code":"24","direct":"UP","lat":"27.865868","lng":"112.956451","station_code":"241001","cur_time":1543202481000,"car_state":"001","czjbh":"2423","company_code":"ggqc","passenger_num":14},{"car_no":"24-26","car_record":"湘C13018","line_code":"24","direct":"UP","lat":"27.833509","lng":"112.949158","station_code":"241008","cur_time":1543203650000,"car_state":"001","czjbh":"2426","company_code":"ggqc","passenger_num":0},{"car_no":"24-22","car_record":"湘C13028","line_code":"24","direct":"UP","lat":"27.865969","lng":"112.956276","station_code":"241001","cur_time":1543202830000,"car_state":"001","czjbh":"2422","company_code":"ggqc","passenger_num":0},{"car_no":"24-27","car_record":"湘C13017","line_code":"24","direct":"UP","lat":"27.865862","lng":"112.956429","station_code":"241001","cur_time":1543203296000,"car_state":"001","czjbh":"2427","company_code":"ggqc","passenger_num":4},{"car_no":"24-03","car_record":"湘C13033","line_code":"24","direct":"UP","lat":"27.865671","lng":"112.956268","station_code":"241001","cur_time":1543203576000,"car_state":"001","czjbh":"2403","company_code":"ggqc","passenger_num":2},{"car_no":"24-17","car_record":"湘C13007","line_code":"24","direct":"UP","lat":"27.844004","lng":"112.942047","station_code":"241014","cur_time":1543203687000,"car_state":"001","czjbh":"2417","company_code":"ggqc","passenger_num":0},{"car_no":"24-09","car_record":"湘C13011","line_code":"24","direct":"UP","lat":"27.861679","lng":"112.875351","station_code":"24_026","cur_time":1543203697000,"car_state":"001","czjbh":"2409","company_code":"ggqc","passenger_num":0},{"car_no":"24-05","car_record":"湘C13026","line_code":"24","direct":"UP","lat":"27.865593","lng":"112.95639","station_code":"241001","cur_time":1543202815000,"car_state":"001","czjbh":"2405","company_code":"ggqc","passenger_num":5},{"car_no":"24-28","car_record":"湘C12970","line_code":"24","direct":"UP","lat":"27.855379","lng":"112.937019","station_code":"241016","cur_time":1543203542000,"car_state":"001","czjbh":"2428","company_code":"ggqc","passenger_num":1},{"car_no":"24-24","car_record":"湘C13022","line_code":"24","direct":"UP","lat":"27.86393","lng":"112.955772","station_code":"24_002","cur_time":1543203645000,"car_state":"001","czjbh":"2424","company_code":"ggqc","passenger_num":0},{"car_no":"24-18","car_record":"湘C13001","line_code":"24","direct":"UP","lat":"27.865343","lng":"112.894966","station_code":"241024","cur_time":1543203681000,"car_state":"001","czjbh":"2418","company_code":"ggqc","passenger_num":8},{"car_no":"24-16","car_record":"湘C13009","line_code":"24","direct":"UP","lat":"27.852421","lng":"112.952652","station_code":"241004","cur_time":1543203681000,"car_state":"001","czjbh":"2416","company_code":"ggqc","passenger_num":1},{"car_no":"24-10","car_record":"湘C13013","line_code":"24","direct":"UP","lat":"27.8689","lng":"112.856339","station_code":"24_030","cur_time":1543203413000,"car_state":"001","czjbh":"2410","company_code":"ggqc","passenger_num":0},{"car_no":"24-15","car_record":"湘C13002","line_code":"24","direct":"UP","lat":"27.873976","lng":"112.920662","station_code":"241018","cur_time":1543203603000,"car_state":"001","czjbh":"2415","company_code":"ggqc","passenger_num":2},{"car_no":"3--14","car_record":"湘C15205","line_code":"3","direct":"UP","lat":"27.861286","lng":"112.877258","station_code":"3_034","cur_time":1543203690000,"car_state":"001","czjbh":"10314","company_code":"ggqc","passenger_num":28},{"car_no":"3--04","car_record":"湘C15369","line_code":"3","direct":"UP","lat":"27.84363","lng":"112.951309","station_code":"3_010","cur_time":1543203562000,"car_state":"001","czjbh":"10304","company_code":"ggqc","passenger_num":19},{"car_no":"3--10","car_record":"湘C15359","line_code":"3","direct":"UP","lat":"27.87851","lng":"112.961838","station_code":"3_001","cur_time":1543203558000,"car_state":"001","czjbh":"10310","company_code":"ggqc","passenger_num":0},{"car_no":"3--02","car_record":"湘C15220","line_code":"3","direct":"UP","lat":"27.832148","lng":"112.936012","station_code":"3_015","cur_time":1543203585000,"car_state":"001","czjbh":"10302","company_code":"ggqc","passenger_num":2},{"car_no":"3--32","car_record":null,"line_code":"3","direct":"UP","lat":"27.829294","lng":"112.919624","station_code":"3_020","cur_time":1543203609000,"car_state":"001","czjbh":"10332","company_code":"ggqc","passenger_num":27},{"car_no":"3--06","car_record":"湘C15212","line_code":"3","direct":"UP","lat":"27.857904","lng":"112.95388","station_code":"3_007","cur_time":1543203715000,"car_state":"001","czjbh":"10306","company_code":"ggqc","passenger_num":1},{"car_no":"3--16","car_record":"湘C15360","line_code":"3","direct":"UP","lat":"27.861214","lng":"112.877144","station_code":"3_034","cur_time":1543203702000,"car_state":"001","czjbh":"10316","company_code":"ggqc","passenger_num":3},{"car_no":"3--28","car_record":"湘C15517","line_code":"3","direct":"UP","lat":"27.846899","lng":"112.909706","station_code":"3_025","cur_time":1543203519000,"car_state":"001","czjbh":"10328","company_code":"ggqc","passenger_num":25},{"car_no":"3--08","car_record":"湘C15230","line_code":"3","direct":"UP","lat":"27.878714","lng":"112.961601","station_code":"3_001","cur_time":1543203092000,"car_state":"001","czjbh":"10308","company_code":"ggqc","passenger_num":17},{"car_no":"5--19","car_record":"湘C15387","line_code":"5","direct":"UP","lat":"27.839659","lng":"112.919441","station_code":"51018","cur_time":1543203708000,"car_state":"001","czjbh":"5019","company_code":"ggqc","passenger_num":2},{"car_no":"5--24","car_record":"湘C15373","line_code":"5","direct":"UP","lat":"27.840519","lng":"112.91217","station_code":"51020","cur_time":1543203580000,"car_state":"001","czjbh":"5024","company_code":"ggqc","passenger_num":13},{"car_no":"5--26","car_record":"湘C15505","line_code":"5","direct":"UP","lat":"27.87851","lng":"112.961533","station_code":"51001","cur_time":1543203424000,"car_state":"001","czjbh":"5026","company_code":"ggqc","passenger_num":7},{"car_no":"5--08","car_record":"湘C15388","line_code":"5","direct":"UP","lat":"27.878611","lng":"112.961357","station_code":"51001","cur_time":1543201482000,"car_state":"001","czjbh":"5008","company_code":"ggqc","passenger_num":5},{"car_no":"5--09","car_record":"湘C15398","line_code":"5","direct":"UP","lat":"27.867224","lng":"112.956978","station_code":"51005","cur_time":1543201608000,"car_state":"001","czjbh":"5009","company_code":"ggqc","passenger_num":0},{"car_no":"5--03","car_record":"湘C15250","line_code":"5","direct":"UP","lat":"27.878664","lng":"112.961235","station_code":"51001","cur_time":1543203299000,"car_state":"001","czjbh":"5003","company_code":"ggqc","passenger_num":3},{"car_no":"5--13","car_record":"湘C15389","line_code":"5","direct":"UP","lat":"27.857731","lng":"112.953819","station_code":"51008","cur_time":1543203665000,"car_state":"001","czjbh":"5013","company_code":"ggqc","passenger_num":0},{"car_no":"5--06","car_record":"湘C15385","line_code":"5","direct":"UP","lat":"27.846848","lng":"112.909683","station_code":"51021","cur_time":1543203475000,"car_state":"001","czjbh":"5006","company_code":"ggqc","passenger_num":22},{"car_no":"5--14","car_record":"湘C15380","line_code":"5","direct":"UP","lat":"27.847206","lng":"112.939766","station_code":"51013","cur_time":1543203616000,"car_state":"001","czjbh":"5014","company_code":"ggqc","passenger_num":0},{"car_no":"5--04","car_record":"湘C15355","line_code":"5","direct":"UP","lat":"27.878609","lng":"112.961334","station_code":"51001","cur_time":1543201976000,"car_state":"001","czjbh":"5004","company_code":"ggqc","passenger_num":0},{"car_no":"5--12","car_record":"湘C15503","line_code":"5","direct":"UP","lat":"27.878639","lng":"112.961838","station_code":"51001","cur_time":1543200802000,"car_state":"001","czjbh":"5012","company_code":"ggqc","passenger_num":0}],"busOd":[{"station_name1":"科技大学","station_name2":"园林局","od_num_sum":353,"od_info":{"d_lng":"112.910851","o_standar_id":"18-05-01","o_station_name":"科技大学","o_lat":"27.904022","d_station_name":"园林局","d_lat":"27.865847","o_lng":"112.916679","d_standar_id":"18-07-03"}},{"station_name1":"科工职院","station_name2":"公交西站","od_num_sum":308,"od_info":{"d_lng":"112.864871","o_standar_id":"05-08-02","o_station_name":"科工职院","o_lat":"27.84596","d_station_name":"公交西站","d_lat":"27.86425","o_lng":"112.650522","d_standar_id":"16-07-01"}},{"station_name1":"江南机械厂","station_name2":"公交西站","od_num_sum":261,"od_info":{"d_lng":"112.864871","o_standar_id":"06-08-02","o_station_name":"江南机械厂","o_lat":"27.845752","d_station_name":"公交西站","d_lat":"27.86425","o_lng":"112.661224","d_standar_id":"16-07-01"}}],
			markers: {
				busyStationsMarkers: []
			}
		};
	}
});