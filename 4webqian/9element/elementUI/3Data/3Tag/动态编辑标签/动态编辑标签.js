var vue = new Vue({
	el: "#app",
	data: function() {
		return {
            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: ''
		}
	},

	created: function() {
        let self = this;
	},
	mounted: function() {
		let self = this;
        this.getContextPath();
	},
	beforeCreate: function () {

    },
    methods: {
        getContextPath: function() {
            let local = document.location;
            let contextPath = "/" + local.pathname.split('/')[1];
            let basePath = local.protocol + "//" + local.host + "/" + contextPath;
            this.contextPath = contextPath; //项目路径
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        }
    },
});