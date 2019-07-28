var vue = new Vue({
    el: "#app",
    data: function () {
        return {
            radio3: '上海',
        }
    },
    computed: {
    },
    methods: {
        getContextPath: function () {
            var contextPath = document.location.pathname;
            var contextPath = contextPath.split('/')[1];
            var contextPath = "/" + contextPath;
            this.contextPath = contextPath;
        },
        handleRadioChange: function (value) {
            let self = this;
            debugger
        },
    },
    watch: {//监听数据变化

    },
    created: function () {
        var self = this;
    },
    mounted: function () {
        var self = this;
        this.getContextPath();
        this.$nextTick(function () {

        });
    }
});