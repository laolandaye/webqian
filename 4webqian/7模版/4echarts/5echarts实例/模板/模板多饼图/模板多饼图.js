'use strict'; //严格模式
let vue = new Vue({
	el: "#app",
	data: function() {
		return {
			cyryslgc: '', //开始ref指向 dom节点，然后是ajax返回的数据（监测数据）
		}
	},
	computed: {
		cyryslgcChartOption: function (item) {
			return function (item) {
				let self = this;

				let series = [];
				let seriesData = [];

				let dataArr = item.dataArr;// 多数组概念
				let seriesInfo = item.seriesInfo;


				for (let k = 0; k < dataArr.length; k++) {
					let data = dataArr[k];
					for (let i = 0; i < data.length; i++) {
					    if(i == 0) {
                            seriesData.push({
                                name: data[i][seriesInfo[k].name],
                                value: data[i][seriesInfo[k].value],
                                selected:true,
                            });
                        } else {
                            seriesData.push({
                                name: data[i][seriesInfo[k].name],
                                value: data[i][seriesInfo[k].value],
                            });
                        }
					}

					if(seriesInfo[k]) {
						if(seriesInfo[k].radius) {
						} else {
							seriesInfo[k].radius = ['0%', '50%'];
						}
						if(seriesInfo[k].center) {
						} else {
							seriesInfo[k].center = ['50%', '40%'];
						}
					}

					series.push({
						type: 'pie',
						radius: seriesInfo[k].radius,
						center: seriesInfo[k].center,
						selectedOffset: 5,
						color: ['#00B679', '#EC6100', '#EC8BCF', '#EBC13C', '#0B2EB1', '#036BCD', '#109DF3'],
                        avoidLabelOverlap: true,
                        label: {
                            normal: {
                                show: true,
                                position: 'outside'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
						data: seriesData
					})
				}

				/* 原生数据处理 */
				let title = item.title;
				if(title) {
					if(title.text) {
					}else {
						title.text = '';
					}
				} else {
					title = {};
					title.text = '';
				}

				let legend = item.legend;
				if(legend) {
					if(title.orient) {
					}else {
						title.orient = 'horizontal';
					}
				} else {
					legend = {};
					legend.orient = 'horizontal';
				}

				let option = {
					title: {
						text:title.text,
						textStyle: {
							color: '#7CABCA',
							fontSize: 15,
						},
						x: 'center',
						align: 'right'
					},
					tooltip: {
						show: true,
						backgroundColor: 'rgb(0,129,219)',
						padding: [0, 4, 0, 4],
						textStyle: {
                            // color: '#000000',
							fontSize: 12
						},
						formatter(params) {
							return `${params.name}:${params.value}`;
						}
					},
					legend: {
						orient: legend.orient,
						top: 'bottom',
						right: '0%',
						bottom: '0%',
						left: 'right',
						align: 'left',
						icon: 'rect',
						itemWidth: 14,
						itemHeight: 14,
						itemGap: 10,
						textStyle: {
							color: '#7BAAC9',
							fontSize: 14,
						},
					},
					series: series
				};
				return option;
			}
		},
	},
	watch: { //监听数据变化
		cyryslgcChartOption: function (newVal) {
			this.cyryslgcChart && this.cyryslgcChart.setOption(newVal);
		},
	},
	distroyed: function() {
		let self = this;
	},
	beforeCreate: function() {
		this.contextPath = '';
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
			self.dealData("cyryslgc", self.cyryslgc);
		});
	},
	methods: {
		getContextPath: function() {
			let local = document.location;
			let contextPath = "/" + local.pathname.split('/')[1];
			let basePath = local.protocol + "//" + local.host + "/" + contextPath;
			this.contextPath = contextPath; //项目路径
		},
		initCyryslgcChart: function (item) {
			let self = this;
			// this.cyryslgcChart = echarts.init(this.$refs[[item.ref]], "qhjscEchartsTheme");
			this.cyryslgcChart = echarts.init(this.$refs[[item.ref]]);
			this.cyryslgcChart && this.cyryslgcChart.setOption(this.cyryslgcChartOption(item));
			window.addEventListener("resize", function () {
				self.cyryslgcChart && self.cyryslgcChart.resize();
			})
		},
		dealData: function(msg, data, lastData) {
			let self = this;
			if (msg == "cyryslgc") {
				self.initCyryslgcChart({
					ref: "cyryslgc",
					dataArr: [
						data,
					],
					seriesInfo: [
						{name:"staff_type", value:"total_num", radius: ['0%', '50%'] },
					],
					title: {
						text: "你好"
					}
				})
			}
		}
	},


});
