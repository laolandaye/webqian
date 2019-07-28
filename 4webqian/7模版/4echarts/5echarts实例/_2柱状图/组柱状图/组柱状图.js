'use strict'; //严格模式
let vue = new Vue({
	el: "#app",
	data: function() {
		return {
			csztjk: '', //开始ref指向 dom节点，然后是ajax返回的数据（监测数据）
		}
	},
	computed: {
		csztjkChartOption: function() {
			let option = {
				title: {
					text: '深圳月最低生活费组成（单位:元）',
					subtext: 'From ExcelHome',
					sublink: 'http://e.weibo.com/1341556070/AjQH99che'
				},
				tooltip : {
					trigger: 'axis',
					axisPointer : {            // 坐标轴指示器，坐标轴触发有效
						type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					},
					formatter: function (params) {
						var tar = params[1];
						return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type : 'category',
					splitLine: {show:false},
					data : ['总费用','房租','水电费','交通费','伙食费','日用品数']
				},
				yAxis: {
					type : 'value'
				},
				series: [
					{
						name: '辅助',
						type: 'bar',
						stack:  '总量',
						itemStyle: {
							normal: {
								barBorderColor: 'rgba(0,0,0,0)',
								color: 'rgba(0,0,0,0)'
							},
							emphasis: {
								barBorderColor: 'rgba(0,0,0,0)',
								color: 'rgba(0,0,0,0)'
							}
						},
						data: [0, 1700, 1400, 1200, 300, 0]
					},
					{
						name: '生活费',
						type: 'bar',
						stack: '总量',
						label: {
							normal: {
								show: true,
								position: 'inside'
							}
						},
						data:[2900, 1200, 300, 200, 900, 300]
					}
				]
			};

			return option;
		},
	},
	watch: { //监听数据变化
		csztjkChartOption: function(newVal) {
			this.csztjkChart && this.csztjkChart.setOption(newVal);
		},
	},
	methods: {
		getContextPath: function() {
			let local = document.location;
			let contextPath = "/" + local.pathname.split('/')[1];
			let basePath = local.protocol + "//" + local.host + "/" + contextPath;
			this.contextPath = contextPath; //项目路径
		},
		initCsztjkChart: function() {
			let self = this;
			this.csztjkChart = echarts.init(this.$refs.csztjk, 'light');
			this.csztjkChart && this.csztjkChart.setOption(this.csztjkChartOption);
			window.addEventListener("resize", function() {
				self.csztjkChart && self.csztjkChart.resize();
			});
		},
	},
	// 定义过滤器对不符合展示的数据进行过滤
	created: function() {
		let self = this;

	},
	mounted: function() {
		let self = this;
		this.getContextPath();
		this.$nextTick(function() {
			self.initCsztjkChart();
		});
	},
	distroyed: function() {
		let self = this;
	},
	beforeCreate: function() {
		this.contextPath = '';

		this.csztjkChart = null; //echarts dom
		//   	this.csztjkChartOption = null;

	}

});
