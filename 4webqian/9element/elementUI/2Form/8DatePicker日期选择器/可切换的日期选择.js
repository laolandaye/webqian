//写一个方法对日期格式化  https://blog.csdn.net/settingsun66/article/details/53064019
Date.prototype.format = function(fmt) {
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
} 
var vue = new Vue({
    el: "#app",
    data: function () {
        return {
        	xForm:{
				dateType: 'year',
				dateValue: new Date().format("yyyy"),
				dateFormat: 'yyyy'
			},
        }
    },
    computed: {
    },
    methods: {
        getContextPath: function () {
            let local = document.location;
            let contextPath = "/" + local.pathname.split('/')[1];
            let basePath = local.protocol + "//" + local.host + "/" + contextPath;
            this.contextPath = contextPath;//项目路径
        },
        handleRadioChange:function(value){//处理时间日期选择器变化时
            //更多打开时
            let self = this;
            if(value == 'year'){
                self.xForm.dateValue =  new Date().format("yyyy");
                self.xForm.dateFormat =  "yyyy";
			} else if(value == 'month'){
				self.xForm.dateValue =  new Date().format("yyyy-MM");
				self.xForm.dateFormat =  "yyyy-MM";
			}else if(value == 'date') {
				self.xForm.dateValue =  new Date().format("yyyy-MM-dd");
				self.xForm.dateFormat =  "yyyy-MM-dd";
			}
		},
    },
    watch: {//监听数据变化

    },
    created: function () {
        var self = this;
        self.getContextPath();
    },
    mounted: function () {
        var self = this;
        self.$nextTick(function () {

        });
    }
});