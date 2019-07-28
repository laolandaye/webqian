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
			let xAxisData = ['2012', '2013', '2014', '2015', '2016'];
			var labelOption = {
				normal: {
					show: true,
                    position: 'insideBottom',
                    distance: 15,
                    align: 'left',
                    verticalAlign: 'middle',
                    rotate: 90,
                    formatter: '{c}',
                    fontSize: 16,
                    rich: {
                        name: {
                            textBorderColor: '#FFF'
                        }
                    }
				}
			};
			let series = [
        {
            name: 'Forest',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            data: [320, 332, 301, 334, 390]
        },
        {
            name: 'Steppe',
            type: 'bar',
            label: labelOption,
            data: [220, 182, 191, 234, 290]
        },
        {
            name: 'Desert',
            type: 'bar',
            label: labelOption,
            data: [150, 232, 201, 154, 190]
        }
    ];	
			

			var option = {
				color: ['#F1A400', '#68CB7B', '#0088DE', '#e5323e'],
			    tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				legend: {
			        data: ['Forest', 'Steppe', 'Desert']
			    },
			    calculable: true,
			    xAxis: [{
					type: 'category',
					axisTick: {
						show: false
					},
					data: xAxisData
				}],
				yAxis: [{
					type: 'value',
					name: '/票数'
				}],
				series: series
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
			this.csztjkChart = echarts.init(this.$refs.csztjk);
			//          this.csztjkChart = echarts.init(this.$refs.csztjk, "qhjscEchartsTheme");
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