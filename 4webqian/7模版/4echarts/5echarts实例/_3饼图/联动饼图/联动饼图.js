'use strict'; //严格模式
let vue = new Vue({
	el: "#app",
	data: function() {
		return {
			htjdqy: '', //开始ref指向 dom节点，然后是ajax返回的数据（监测数据）
		}
	},
	computed: {
		htjdqyChartOption: function () {
			let self = this;

			let option = {
				title : {
					text: '南丁格尔玫瑰图',
					subtext: '纯属虚构',
					x:'center'
				},
				tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					x : 'center',
					y : 'bottom',
					data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
				},
				toolbox: {
					show : true,
					feature : {
						mark : {show: true},
						dataView : {show: true, readOnly: false},
						magicType : {
							show: true,
							type: ['pie', 'funnel']
						},
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				calculable : true,
				series : [
					{
						name:'半径模式',
						type:'pie',
						radius : ['35%', '55%'],
						center : ['20%', '50%'],
						label: {
							normal: {
								show: true
							},
							emphasis: {
								show: true
							}
						},
						lableLine: {
							normal: {
								show: true
							},
							emphasis: {
								show: true
							}
						},
						data:[
							{value:10, name:'rose1'},
							{value:5, name:'rose2'},
							{value:15, name:'rose3'},
							{value:25, name:'rose4'},
							{value:20, name:'rose5'},
							{value:35, name:'rose6'},
							{value:30, name:'rose7'},
							{value:40, name:'rose8'}
						]
					},
					{
						name:'半径模式',
						type:'pie',
						radius : [20, 110],
						center : ['50%', '50%'],
						roseType : 'radius',
						label: {
							normal: {
								show: false
							},
							emphasis: {
								show: true
							}
						},
						lableLine: {
							normal: {
								show: false
							},
							emphasis: {
								show: true
							}
						},
						data:[
							{value:10, name:'rose1'},
							{value:5, name:'rose2'},
							{value:15, name:'rose3'},
							{value:25, name:'rose4'},
							{value:20, name:'rose5'},
							{value:35, name:'rose6'},
							{value:30, name:'rose7'},
							{value:40, name:'rose8'}
						]
					},
					{
						name:'面积模式',
						type:'pie',
						radius : [30, 110],
						center : ['80%', '50%'],
						roseType : 'area',
						data:[
							{value:10, name:'rose1'},
							{value:5, name:'rose2'},
							{value:15, name:'rose3'},
							{value:25, name:'rose4'},
							{value:20, name:'rose5'},
							{value:35, name:'rose6'},
							{value:30, name:'rose7'},
							{value:40, name:'rose8'}
						]
					}
				]
			};

			return option;
		},
	},
	watch: { //监听数据变化
		htjdqyChartOption: function (newVal) {
			this.htjdqyChart
			&& this.htjdqyChart.setOption(newVal);
		},
	},
	methods: {
		getContextPath: function() {
			let local = document.location;
			let contextPath = "/" + local.pathname.split('/')[1];
			let basePath = local.protocol + "//" + local.host + "/" + contextPath;
			this.contextPath = contextPath; //项目路径
		},
		initHtjdqyChart: function () {
			let self = this;
			this.htjdqyChart = echarts.init(this.$refs.htjdqy, "qhjscEchartsTheme");
			this.htjdqyChart && this.htjdqyChart.setOption(this.htjdqyChartOption);
			window.addEventListener("resize", function () {
				self.htjdqyChart && self.htjdqyChart.resize();
			})
		},

	},
	beforeCreate: function() {
		this.contextPath = '';

	},
	// 定义过滤器对不符合展示的数据进行过滤
	created: function() {
		let self = this;
		this.getContextPath();
		this.htjdqy = staticData.htjdqy;
	},
	mounted: function() {
		let self = this;
		this.$nextTick(function() {
			self.initHtjdqyChart();
		});
	},
	distroyed: function() {
		let self = this;
	},
});
