var vue = new Vue({
	el: "#app",
	data: function() {
		return {
		}
	},
	created: function() {
		let self = this;
        this.getContextPath();
	},
	mounted: function() {
		let self = this;
		this.mainMap();
		this.drawODArrowLine(); //实际开发中这里是写在ajax的回调函数里面的，写在create或者其他method
	},
	beforeCreate: function() {
		this.map = ''; //全局地图函数
		this.mapData = {
				centerCoordinate: [112.90747518931073, 27.859305978350736], //地图中心坐标
				features: ['bg', 'road', 'point'],
				mapStyle: 'amap://styles/d6ddb62dcec953082bd4437bddfd75f8',
				odNum: [{"o":["112.914925","27.843273"],"o_name":"体育中心","d":["112.961285","27.860635"],"d_name":"铭扬广场","num":69},{"o":["112.855285","27.828121"],"o_name":"涟水桥","d":["112.914925","27.843273"],"d_name":"体育中心","num":44},{"o":["112.914925","27.843273"],"o_name":"体育中心","d":["112.917432","27.836909"],"d_name":"建设中路","num":42}]
		};
		this.fmgr = null;
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
		 drawODArrowLine: function () {
//          this.drawODArrowLineClearLayers();
//          this.drawODArrowLineClearMarkers();
//          this.drawODArrowLineClearMarkersEvent();

            let self = this;

            let canvas = document.createElement('canvas');
            canvas.width = this.map.getSize().width;
            canvas.height = this.map.getSize().height;

            let animationCanvas = document.createElement('canvas');
            animationCanvas.width = this.map.getSize().width;
            animationCanvas.height = this.map.getSize().height;

            let CanvasLayer = new AMap.CanvasLayer({
                canvas: canvas,
                bounds: self.map.getBounds(),
                zooms: [10, 14],
            });

            let animationCanvasLayer = new AMap.CanvasLayer({
                canvas: animationCanvas,
                bounds: self.map.getBounds(),
                zooms: [10, 14],
            });
            CanvasLayer.setMap(self.map);
            animationCanvasLayer.setMap(self.map);

            //清空动画
            if(this.fmgr) {
                this.fmgr.clear();
                this.fmgr = null;
            }

            var arc = new Arc(canvas);//弧线
            var fmgr = new Scene(animationCanvas);//动态线
            this.fmgr = fmgr;
            fmgr.start();

            let colors = commonData.colors;
           

            if (self.mapData.odNum.length) {
                for (let i = 0; i < self.mapData.odNum.length; i++) {
                    let odNum = self.mapData.odNum[i];
                    var tempStart = self.map.lnglatTocontainer(new AMap.LngLat(odNum['o'][0], odNum['o'][1]));
                    var tempStartList = [tempStart.x, tempStart.y];
                    var tempEnd = self.map.lnglatTocontainer(new AMap.LngLat(odNum['d'][0], odNum['d'][1]));
                    var tempEndList = [tempEnd.x, tempEnd.y];
                    var color = colors[i];

                    arc.drawArc(tempStartList, tempEndList, color, 2); //画线

                    var sparkArc1 = new SparkArc();//动画弧线
                    sparkArc1.isShadow = false;
                    var tempObj = {color: color};
                    sparkArc1.setLocation(tempStartList, tempEndList, tempObj,0.3);

                    fmgr.addShape(sparkArc1);

                    sparkArc1.play(); //线动画

                  }
            }

            
        },
    }
});