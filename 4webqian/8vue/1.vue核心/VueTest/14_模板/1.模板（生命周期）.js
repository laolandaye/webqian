'use strict';//严格模式
//创建vue对象
const vm = new Vue({
    el: "#app",
    data: function () {
        return {
            contextPath: '',
        }
    },
    computed: {
    },
    watch: {//监听数据变化
    },
    methods: {
        getContextPath: function () {
            let local = document.location;
            let contextPath = "/" + local.pathname.split('/')[1];
            let basePath = local.protocol + "//" + local.host + "/" + contextPath;
            this.contextPath = contextPath;//项目路径
        },
    },
    
    beforeCreate() {
      console.log('beforeCreate()')
    },

    // 定义过滤器对不符合展示的数据进行过滤
    created: function () {
        let self = this;
        this.getContextPath();
    },

    beforeMount() {
    },

    mounted: function () {
        let self = this;
        //1.定时器
    },

    beforeUpdate() {
      
    },
    updated () {
      //使用vm.$nextTick 替换掉 updated：
    },


    beforeDestroy() {
    	let self = this;
      	//1.关闭定时器
    },

    distroyed: function () {
        let self = this;
    }
});