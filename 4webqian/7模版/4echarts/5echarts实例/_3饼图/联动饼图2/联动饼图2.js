'use strict'; //严格模式
let vue = new Vue({
	el: "#app",
	data: function() {
		return {
			htjdqy: '',
			gmysqy: '',
			bdwdqy: '',
		}
	},
	computed: {
		gmysqyChartOption: function () {
			let self = this;

			let labelTop = {
				normal : {
					label : {
						show : false,
						position : 'center',
						formatter : '{b}',
						textStyle: {
							baseline : 'bottom'
						}
					},
					labelLine : {
						show : false
					}
				}
			};
			let labelFromatter = {
				normal : {
					label : {
						formatter : function (params){
							return params.value
						},
						textStyle: {
							baseline : 'top'
						}
					}
				},
			}
			let labelBottom = {
				normal : {
					color: '#ccc',
					label : {
						show : false,
						position : 'center'
					},
					labelLine : {
						show : false
					}
				},
				emphasis: {
					color: 'rgba(0,0,0,0)'
				}
			};
			let radius = [40, 55];
			let radius2 = [0, 25];
			let centerXs = ['10%', '25%', '40%', '55%', '75%', '85%'];

			let series = [];

			let serieIn = {
					type:'pie',
					selectedMode: 'single',
					center : ['10%', '50%'],
					radius : radius2,

					label: {
						show: true,
						normal: {
							show: true,
							position: 'center',
							color: '#fff',
						},
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data:[
						{value:335, name:'企业总数\n(个)'},
					]
				};
			let serieOut = {
					type : 'pie',
					center : ['10%', '50%'],
					radius : radius,
					itemStyle : labelFromatter,
					label: {
						show: false,
						normal: {
							show: false,
						},
					},
					labelLine: {
						show: false,
					},
					data : [
						{name:'其他', value:'500', itemStyle : labelBottom},
						{name:'规模以上企业', value:54,itemStyle : labelTop}
					]
				};

			let jj =0;
			if(self.htjdqy) {

				let qysCounts = commonMain.getObjArrWhere(self.htjdqy.gmysqy_qys, [{key: "dim_name", value: "总共"}])
				let qysCount = qysCounts[0].qys;
				for (let i = 0; i < self.htjdqy.gmysqy_qys.length; i++) {
					let item = self.htjdqy.gmysqy_qys[i];
					if(item.dim_code) {
						serieIn.center = [centerXs[jj], '50%'];
						serieIn.data[0].name = '企业总数\n(个)';
						serieIn.data[0].value = qysCount;
						serieOut.center = [centerXs[jj], '50%'];
						serieOut.data[0].value = qysCount - item.qys;
						serieOut.data[1].name = item.dim_name;
						serieOut.data[1].value = item.qys;
						series.push(JSON.parse(JSON.stringify(serieIn)));
						series.push(JSON.parse(JSON.stringify(serieOut)));
						jj++;
					}
				}

				let xssrCounts = commonMain.getObjArrWhere(self.htjdqy.gmysqy_xssr, [{key: "dim_name", value: "总共"}])
				let xssrCount = xssrCounts[0].xssr
				for (let i = 0; i < self.htjdqy.gmysqy_xssr.length; i++) {
					let item = self.htjdqy.gmysqy_xssr[i];
					if(item.dim_code) {
						serieIn.center = [centerXs[jj], '50%'];
						serieIn.data[0].name = '销售收入\n(万元)';
						serieIn.data[0].value = xssrCount;
						serieOut.center = [centerXs[jj], '50%'];
						serieOut.data[0].value = xssrCount - item.xssr;
						serieOut.data[1].name = item.dim_name;
						serieOut.data[1].value = item.xssr;
						series.push(JSON.parse(JSON.stringify(serieIn)));
						series.push(JSON.parse(JSON.stringify(serieOut)));
						jj++;
					}
				}

				let ynskCounts = commonMain.getObjArrWhere(self.htjdqy.gmysqy_ynsk, [{key: "dim_name", value: "总共"}])
				let ynskCount = ynskCounts[0].ynsk
				for (let i = 0; i < self.htjdqy.gmysqy_ynsk.length; i++) {
					let item = self.htjdqy.gmysqy_ynsk[i];
					if(item.dim_code) {
						serieIn.center = [centerXs[jj], '50%'];
						serieIn.data[0].name = '应纳税款\n(万元)';
						serieIn.data[0].value = ynskCount;
						serieOut.center = [centerXs[jj], '50%'];
						serieOut.data[0].value = ynskCount - item.ynsk;
						serieOut.data[1].name = item.dim_name;
						serieOut.data[1].value = item.ynsk;
						series.push(JSON.parse(JSON.stringify(serieIn)));
						series.push(JSON.parse(JSON.stringify(serieOut)));
						jj++;
					}
				}
			}


			let option = {
				legend: {
					x : 'center',
					y : 'bottom',
					data:[
						'规模以上企业','非规模以上企业', "其他"
					]
				},
				tooltip: {
					trigger: 'item',
					formatter: "{b}: {c} ({d}%)"
				},
				title : {
					text: '规模以上企业分析',
					x: 'center'
				},
				series : series
			};
			return option;
		},
		bdwdqyChartOption: function () {
			let self = this;

			let labelTop = {
				normal : {
					label : {
						show : false,
						position : 'center',
						formatter : '{b}',
						textStyle: {
							baseline : 'bottom'
						}
					},
					labelLine : {
						show : false
					}
				}
			};
			let labelFromatter = {
				normal : {
					label : {
						formatter : function (params){
							return params.value
						},
						textStyle: {
							baseline : 'top'
						}
					}
				},
			}
			let labelBottom = {
				normal : {
					color: '#ccc',
					label : {
						show : false,
						position : 'center'
					},
					labelLine : {
						show : false
					}
				},
				emphasis: {
					color: 'rgba(0,0,0,0)'
				}
			};
			let radius = [40, 55];
			let radius2 = [0, 25];
			let centerXs = ['10%', '25%', '40%', '55%', '75%', '85%'];

			let series = [];

			let serieIn = {
					type:'pie',
					selectedMode: 'single',
					center : ['10%', '50%'],
					radius : radius2,

					label: {
						show: true,
						normal: {
							show: true,
							position: 'center',
							color: '#fff',
						},
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data:[
						{value:335, name:'企业总数\n(个)'},
					]
				};
			let serieOut = {
					type : 'pie',
					center : ['10%', '50%'],
					radius : radius,
					itemStyle : labelFromatter,
					label: {
						show: false,
						normal: {
							show: false,
						},
					},
					labelLine: {
						show: false,
					},
					data : [
						{name:'其他', value:'500', itemStyle : labelBottom},
						{name:'本地企业', value:54,itemStyle : labelTop}
					]
				};

			let jj =0;
			if(self.htjdqy) {
				let qysCounts = commonMain.getObjArrWhere(self.htjdqy.bdwdqy_qys, [{key: "dim_name", value: "总共"}])
				let qysCount = qysCounts[0].qys;
				for (let i = 0; i < self.htjdqy.bdwdqy_qys.length; i++) {
					let item = self.htjdqy.bdwdqy_qys[i];
					if(item.dim_code) {
						serieIn.center = [centerXs[jj], '50%'];
						serieIn.data[0].name = '企业总数\n(个)';
						serieIn.data[0].value = qysCount;
						serieOut.center = [centerXs[jj], '50%'];
						serieOut.data[0].value = qysCount - item.qys;
						serieOut.data[1].name = item.dim_name;
						serieOut.data[1].value = item.qys;
						series.push(JSON.parse(JSON.stringify(serieIn)));
						series.push(JSON.parse(JSON.stringify(serieOut)));
						jj++;
					}
				}

				let xssrCounts = commonMain.getObjArrWhere(self.htjdqy.bdwdqy_xssr, [{key: "dim_name", value: "总共"}])
				let xssrCount = xssrCounts[0].xssr
				for (let i = 0; i < self.htjdqy.bdwdqy_xssr.length; i++) {
					let item = self.htjdqy.bdwdqy_xssr[i];
					if(item.dim_code) {
						serieIn.center = [centerXs[jj], '50%'];
						serieIn.data[0].name = '销售收入\n(万元)';
						serieIn.data[0].value = xssrCount;
						serieOut.center = [centerXs[jj], '50%'];
						serieOut.data[0].value = xssrCount - item.xssr;
						serieOut.data[1].name = item.dim_name;
						serieOut.data[1].value = item.xssr;
						series.push(JSON.parse(JSON.stringify(serieIn)));
						series.push(JSON.parse(JSON.stringify(serieOut)));
						jj++;
					}
				}

				let ynskCounts = commonMain.getObjArrWhere(self.htjdqy.bdwdqy_ynsk, [{key: "dim_name", value: "总共"}])
				let ynskCount = ynskCounts[0].ynsk
				for (let i = 0; i < self.htjdqy.bdwdqy_ynsk.length; i++) {
					let item = self.htjdqy.bdwdqy_ynsk[i];
					if(item.dim_code) {
						serieIn.center = [centerXs[jj], '50%'];
						serieIn.data[0].name = '应纳税款\n(万元)';
						serieIn.data[0].value = ynskCount;
						serieOut.center = [centerXs[jj], '50%'];
						serieOut.data[0].value = ynskCount - item.ynsk;
						serieOut.data[1].name = item.dim_name;
						serieOut.data[1].value = item.ynsk;
						series.push(JSON.parse(JSON.stringify(serieIn)));
						series.push(JSON.parse(JSON.stringify(serieOut)));
						jj++;
					}
				}
			}


			let option = {
				legend: {
					x : 'center',
					y : 'bottom',
					data:[
						'本地企业','外地企业', "其他"
					]
				},
				tooltip: {
					trigger: 'item',
					formatter: "{b}: {c} ({d}%)"
				},
				title : {
					text: '本地企业分析',
					x: 'center'
				},
				series : series
			};
			return option;
		},
	},
	watch: { //监听数据变化
		gmysqyChartOption: function (newVal) {
			this.gmysqyChart && this.gmysqyChart.setOption(newVal);
		},
		bdwdqyChartOption: function (newVal) {
			this.bdwdqyChart && this.bdwdqyChart.setOption(newVal);
		},
	},
	methods: {
		getContextPath: function() {
			let local = document.location;
			let contextPath = "/" + local.pathname.split('/')[1];
			let basePath = local.protocol + "//" + local.host + "/" + contextPath;
			this.contextPath = contextPath; //项目路径
		},
		initGmysqyChart: function () {
			let self = this;
			this.gmysqyChart = echarts.init(this.$refs.gmysqy);
			this.gmysqyChart && this.gmysqyChart.setOption(this.gmysqyChartOption);
			window.addEventListener("resize", function () {
				self.gmysqyChart && self.gmysqyChart.resize();
			})
		},
		initBdwdqyChart: function () {
			let self = this;
			this.bdwdqyChart = echarts.init(this.$refs.bdwdqy);
			this.bdwdqyChart && this.bdwdqyChart.setOption(this.bdwdqyChartOption);
			window.addEventListener("resize", function () {
				self.bdwdqyChart && self.bdwdqyChart.resize();
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
			self.initGmysqyChart();
			self.initBdwdqyChart();
		});
	},
	distroyed: function() {
		let self = this;
	},
});
