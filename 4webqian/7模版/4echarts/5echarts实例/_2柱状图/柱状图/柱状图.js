'use strict'; //严格模式
let vue = new Vue({
	el: "#app",
	data: function() {
		return {
			csjk: '', //开始ref指向 dom节点，然后是ajax返回的数据（监测数据）
		}
	},
	computed: {
		csjkChartOption: function() {
			var seriesData = [120, 200, 150];
			var colorList = ['#F1A400', '#68CB7B', '#0088DE'];

			seriesData = echarts.util.map(seriesData, function(item, index) {
				return {
					value: item,
					itemStyle: {
						normal: {
							color: colorList[index]
						}
					}
				};
			});

			var option = {
				legend: {
					data: ['未评价', '未提交', '已提交']
				},
				calculable: true,
				xAxis: {
					type: 'category',
					data: ['未评价', '未提交', '已提交']
				},
				

					yAxis: [{
						type: 'value',
						name: '/票数',
						minInterval: 1,
						axisLabel: {
							formatter: '{value}'
						},
						boundaryGap: [0, 0.1],
						min: 0,
						splitNumber: 1,
					}],
				
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				series: [{
					data: seriesData,
					type: 'bar',
				}]
			};
			return option;
		},
	},
	watch: { //监听数据变化
		csjkChartOption: function(newVal) {
			this.csjkChart && this.csjkChart.setOption(newVal);
		},
	},
	methods: {
		getContextPath: function() {
			let local = document.location;
			let contextPath = "/" + local.pathname.split('/')[1];
			let basePath = local.protocol + "//" + local.host + "/" + contextPath;
			this.contextPath = contextPath; //项目路径
		},
		initCsjkChart: function() {
			let self = this;
			this.csjkChart = echarts.init(this.$refs.csjk);
			this.csjkChart && this.csjkChart.setOption(this.csjkChartOption);
			window.addEventListener("resize", function() {
				self.csjkChart && self.csjkChart.resize();
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
			self.initCsjkChart();
		});
	},
	distroyed: function() {
		let self = this;
	},
	beforeCreate: function() {
		this.contextPath = '';

		this.csjkChart = null; //echarts dom
		//   	this.csjkChartOption = null;

	}

});