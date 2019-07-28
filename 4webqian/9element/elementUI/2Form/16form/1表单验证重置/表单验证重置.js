"use strict";
var interactVm = new Vue({
    el: '#app',
    data:function(){
        var checkEamil = (rule, value, callback) => {
            var regemail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if (!regemail.test(value)) {
                return callback(new Error('注意邮箱格式'));
            }
            callback();
        };
        var checkPhone = (rule, value, callback) => {
            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(value)) {
                return callback(new Error('注意号码格式'));
            }
            callback();
        };
        return {
            openportalAdviceFrom: {
                title: '',
                content: '',
                contracrUser: '',
                contractEmail: '',
                contractPhone: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                    { min: 3, max: 64, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入内容', trigger: 'blur' },
                    { min: 0, max: 256, message: '长度在 0 到 256 个字符', trigger: 'blur' }
                ],
                contracrUser: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
                ],
                contractEmail: [
                    { validator: checkEamil, trigger: 'blur' },
                    { required: true, message: '请输入电子邮箱', trigger: 'blur' },
                    { min: 3, max: 64, message: '长度在 3 到 64 个字符', trigger: 'blur' }
                ],
                contractPhone: [
                    { validator: checkPhone, trigger: 'blur' },
                    { required: true, message: '请输入联系方式', trigger: 'blur' },
                    { min: 11, max: 11, message: '长度11个字符', trigger: 'blur' }
                ]
            },
        }
    },
    created: function() {
        let self = this;
        this.getContextPath();
    },
    watch: {

    },
    mounted: function() {
        let self = this;
    },
    updated: function() {
    },
    beforeCreate: function () {
        let self = this;
        this.contextPath = "";
    },
    methods: {
        getContextPath: function () {
            let local = document.location;
            let contextPath = "/" + local.pathname.split('/')[1];
            let basePath = local.protocol + "//" + local.host + "/" + contextPath;
            this.contextPath = contextPath; //项目路径
        },
        /* 咨询建议 */
        onSubmit: function (formName) {
            let self = this;
            this.$refs[formName].validate((valid) => {
                alert('submit!');
                if (valid) {
                    alert('submit!');
                    self.addOpenportalAdvice(formName);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            //
        },
        onReset: function (formName) {
            let self = this;
            this.$refs[formName].resetFields();//重置表单
            /*this.openportalAdviceFrom = {
                title: '',
                content: '',
                contracrUser: '',
                contractEmail: '',
                contractPhone: ''
            }*/
        },
        /* 咨询建议 end */

        /*  ajax操作 */
    },

});