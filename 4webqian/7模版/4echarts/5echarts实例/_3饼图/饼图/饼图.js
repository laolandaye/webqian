'use strict'; //严格模式
let vue = new Vue({
	el: "#app",
	data: function() {
		return {
			cyryslgc: '', //开始ref指向 dom节点，然后是ajax返回的数据（监测数据）
		}
	},
	computed: {
		cyryslgcChartOption: function () {
			let echartData = [];
			for (let i = 0; i < this.cyryslgc.length; i++) {
				if(this.cyryslgc[i].staff_type === "从业人员"){
					echartData.push({
						name: this.cyryslgc[i].staff_type,
						value: this.cyryslgc[i].total_num
					});
				}else{
					echartData.push({
						name: this.cyryslgc[i].staff_type,
						value: this.cyryslgc[i].total_num,
						selected:true
					});
				}
			}
			let option = {
				tooltip: {
					show: true,
					backgroundColor: 'none',
					padding: [0, 4, 0, 4],
					textStyle: {
						fontSize: 12
					},
					formatter(params) {
						return `${params.name}:${params.value}人`;
					}
				},
				legend: {
					icon: 'rect',
					itemWidth: 10,
					itemHeight: 10,
					align: 'left',
					bottom: '5%',
					itemGap: 5,
					textStyle: {
						color: '#7BAAC9',
						fontSize: 10,
					},
				},
				series: [{
					type: 'pie',
					radius: ['0%', '50%'],
					selectedOffset: 5,
					center: ['50%', '40%'],
					color: ['#00B679', '#EC6100', '#EC8BCF', '#EBC13C', '#0B2EB1', '#036BCD', ' #109DF3'],
					label: {
						show:false,
						normal: {
							show:false,
							formatter: '{c}'
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data: echartData
				}]
			};
			return option;
		},
	},
	watch: { //监听数据变化
		cyryslgcChartOption: function (newVal) {
			this.cyryslgcChart
			&& this.cyryslgcChart.setOption(newVal);
		},
	},
	methods: {
		getContextPath: function() {
			let local = document.location;
			let contextPath = "/" + local.pathname.split('/')[1];
			let basePath = local.protocol + "//" + local.host + "/" + contextPath;
			this.contextPath = contextPath; //项目路径
		},
		initCyryslgcChart: function () {
			let self = this;
			this.cyryslgcChart = echarts.init(this.$refs.cyryslgc, "qhjscEchartsTheme");
			this.cyryslgcChart && this.cyryslgcChart.setOption(this.cyryslgcChartOption);
			window.addEventListener("resize", function () {
				self.cyryslgcChart && self.cyryslgcChart.resize();
			})
		},

	},
	// 定义过滤器对不符合展示的数据进行过滤
	created: function() {
		let self = this;

	},
	mounted: function() {
		let self = this;
		this.getContextPath();
		this.cyryslgc = staticData.cyryslgc;
		this.$nextTick(function() {
			self.initCyryslgcChart();
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