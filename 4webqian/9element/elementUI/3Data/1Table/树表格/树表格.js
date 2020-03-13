var vue = new Vue({
	el: "#app",
	data: function() {
		return {
            tableData: [{"fieldName":"16-30日任务数量","fieldLevel":1,"desensType":"0","chargingTimes":0,"parentField":"","parentId":null,"desensRuleId":null,"field":"task_third_cycle","parentFullField":null,"id":"2c9849546e21bbe9016e3e81cf7f004e","fieldType":"Integer","apiId":"297e8a876e37971e016e379a89870017","seq":3},{"fieldName":"90日以上任务数量","fieldLevel":1,"desensType":"0","chargingTimes":0,"parentField":"","parentId":null,"desensRuleId":null,"field":"task_fifth_cycle","children":[{"fieldName":"c","fieldLevel":2,"desensType":"0","chargingTimes":0,"parentField":"task_fifth_cycle","parentId":"2c9849546e21bbe9016e3e81cf7f004f","desensRuleId":null,"field":"c","parentFullField":null,"id":"297e8a876eb7d928016eb7e1023f0009","fieldType":"Integer","apiId":"297e8a876e37971e016e379a89870017","seq":0}],"parentFullField":null,"id":"2c9849546e21bbe9016e3e81cf7f004f","fieldType":"Integer","apiId":"297e8a876e37971e016e379a89870017","seq":5},{"fieldName":"8-15日任务数量","fieldLevel":1,"desensType":"0","chargingTimes":0,"parentField":"","parentId":null,"desensRuleId":null,"field":"task_second_cycle","parentFullField":null,"id":"2c9849546e21bbe9016e3e81cf7f0050","fieldType":"Integer","apiId":"297e8a876e37971e016e379a89870017","seq":2},{"fieldName":"30-90日任务数量","fieldLevel":1,"desensType":"0","chargingTimes":0,"parentField":"","parentId":null,"desensRuleId":null,"field":"task_fourth_cycle","children":[{"fieldName":"b","fieldLevel":2,"desensType":"0","chargingTimes":0,"parentField":"task_fourth_cycle","parentId":"2c9849546e21bbe9016e3e81cf800051","desensRuleId":null,"field":"b","parentFullField":null,"id":"297e8a876eb7d928016eb7df4fbf0007","fieldType":"Integer","apiId":"297e8a876e37971e016e379a89870017","seq":0}],"parentFullField":null,"id":"2c9849546e21bbe9016e3e81cf800051","fieldType":"Integer","apiId":"297e8a876e37971e016e379a89870017","seq":4},{"fieldName":"2-7日任务数量","fieldLevel":1,"desensType":"0","chargingTimes":0,"parentField":"","parentId":null,"desensRuleId":null,"field":"task_first_cycle","children":[{"fieldName":"a","fieldLevel":2,"desensType":"0","chargingTimes":0,"parentField":"task_first_cycle","parentId":"2c9849546e21bbe9016e3e81cf800052","desensRuleId":null,"field":"a","parentFullField":null,"id":"297e8a876eb7d928016eb7de0d050001","fieldType":"Integer","apiId":"297e8a876e37971e016e379a89870017","seq":0}],"parentFullField":null,"id":"2c9849546e21bbe9016e3e81cf800052","fieldType":"Integer","apiId":"297e8a876e37971e016e379a89870017","seq":1}],
		}
	},
	created: function() {
        let self = this;
	},
	mounted: function() {
	},
	beforeCreate: function () {

    },
    methods: {
    }
});