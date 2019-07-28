var vue = new Vue({
    el: "#app",
    data: function () {
        return {
            checkboxGroup4: ['上海'],
            cities:  ['上海', '北京', '广州', '深圳'],
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
        handleCheckedCitiesChange: function (value) {
            debugger

        },
        check: function (value) {
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