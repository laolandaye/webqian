var vue = new Vue({
	el: "#app",
	data: function() {
		return {
			defaultExpandedKeys: [2, 3],
			defaultCheckedKeys: [5],
			data2: [{
				id: 1,
				label: '一级 1',
				children: [{
					id: 4,
					label: '二级 1-1',
					children: [{
						id: 9,
						label: '三级 1-1-1'
					}, {
						id: 10,
						label: '三级 1-1-2'
					}]
				}]
			}, {
				id: 2,
				label: '一级 2',
				children: [{
					id: 5,
					label: '二级 2-1'
				}, {
					id: 6,
					label: '二级 2-2'
				}]
			}, {
				id: 3,
				label: '一级 3',
				children: [{
					id: 7,
					label: '二级 3-1'
				}, {
					id: 8,
					label: '二级 3-2'
				}]
			}],
			defaultProps: {
				children: 'children',
				label: 'label'
			}
		}
	},
	methods: {
		getContextPath: function() {
			let local = document.location;
			let contextPath = "/" + local.pathname.split('/')[1];
			let basePath = local.protocol + "//" + local.host + "/" + contextPath;
			this.contextPath = contextPath; //项目路径
		},
		aaa: function() {
			let self = this;
			debugger
			self.defaultExpandedKeys = [1];
			self.defaultCheckedKeys= [1];
		}
	},
	created: function() {
		// noinspection JSAnnotator
        let self = this;
		this.getContextPath();

	},
	mounted: function() {
		let self = this;
	},
	beforeCreate: function () {

    }
});