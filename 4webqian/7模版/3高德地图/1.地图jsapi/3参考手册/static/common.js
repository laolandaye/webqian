var commonData = {
    //几区定位
    areaLnglat: [
        {
            area_code: '002',
            name: "岳塘区",
            lnglat: [112.968471, 27.872388]
        },
        {
            area_code: '003',
            name: "湘潭县",
            lnglat: [112.765365, 27.671687]
        },
        {
            area_code: '004',
            name: "湘乡市",
            lnglat: [112.550481, 27.718261]
        },
        {
            area_code: '005',
            name: "韶山市",
            lnglat: [112.526792, 27.914799]
        },
        {
            area_code: '001',
            name: "雨湖区",
            lnglat: [112.776352, 27.904345]
        }
    ],
    colors: ["rgb(255,0,0)", "rgb(255,71,0)", "rgb(200,220,0)", '#9BD3F8'],
    colors2: ["rgb(250,95,82)", "rgb(248,167,94)", "rgb(251,247,105)", '#9BD3F8'],
    colors3: ["#fa1705", "#fd8a02", "#f8ee67"],
    colors4: ["#fa5f52", "#f8a75e", "#fbf769"]

}

var commonUtil = {
    //数组转字符传（连接符）
    arrToStrByComma: function (arr, joinFalg) {
        var str = '';
        if (!joinFalg) {
            joinFalg = ','
        }
        str = arr.join(joinFalg);
        return str; //a-b-c-d-e  使用-拼接数组元素
    }
}

var commonMain = {
    //js数组分组
    groupJs: function (arr) {
        var map = {},
            dest = [];
        for (var i = 0; i < arr.length; i++) {
            var ai = arr[i];
            if (!map[ai.line_code]) {
                dest.push({
                    line_code: ai.line_code,
                    line_name: ai.line_name,
                    kind: ai.kind,
                    data: [ai]
                });
                map[ai.line_code] = ai;
            } else {
                for (var j = 0; j < dest.length; j++) {
                    var dj = dest[j];
                    if (dj.line_code == ai.line_code) {
                        dj.data.push(ai);
                        break;
                    }
                }
            }
        }
        return dest;
    },
    /**
     * 1.分组转换(一个对象数组转换成多个对象数组)
     *		对象map(key,value) key是一个（查询条件）数组，value是要放回的格式
     *		数组dest，最后结果dest(map,map,map...)
     * 2.参数：数组，分组条件，map的名称（分组后集合的名称）
     */

    getObjArrGroup2: function (arr, paramArr, dataName) {
        var map = {},
            dest = [];
        for(var i = 0; i < arr.length; i++){
            var ai = arr[i];

            var keyTemp = [];//map的这个key是否存在
            var myFunction1 = function(item, index) {
                keyTemp.push(ai[item]);
            }
            paramArr.forEach(myFunction1);
            //判断key，添加是否匹配
            if(!map[keyTemp]){//1.创建不同的对象
                //拼接此map的值value
                var destTemp = {};//map多条件
                var myFunction11 = function(item, index) {
                    destTemp[item] = ai[item];
                }
                paramArr.forEach(myFunction11);
                if(dataName) {
                    dataName = 'data';
                }
                destTemp[dataName] = [ai];
                dest.push(destTemp);

                //加入新key的map
                var paramArrTemp = [];
                var myFunction12 = function(item, index) {
                    paramArrTemp.push(ai[item]);
                }
                paramArr.forEach(myFunction12);
                map[paramArrTemp] = ai;
            }else{//2.匹配条件并添加相应map
                for(var j = 0; j < dest.length; j++){
                    var dj = dest[j];
                    var flag2 = false;
                    var myFunction2 = function(item, index) {
                        //此时map的条件与新列不等，会创建新map
                        //由于本else是匹配条件添加的
                        if(dj[item] != ai[item]){
                            flag2 = true;
                        }
                    }
                    paramArr.forEach(myFunction2);
                    if(!flag2){//条件匹配（false）添加
                        if(dataName) {
                            dataName = 'data';
                        }
                        dj[dataName].push(ai);
                        break;
                    }
                }
            }
        }
        return dest;
    },
    //js拆分数组
    splitArr: function (chartArr) {
        var allData = []; //用来装处理完的数组
        var currData = []; //子数组用来存分割完的数据
        //循环需要处理的数组
        for (var i = 0; i < chartArr.length; i++) {
            //将chartArr[i]添加到子数组
            currData.push(chartArr[i]);
            //在这里求4的余数,如果i不等于0,且可以整除 或者考虑到不满4个或等于4个的情况就要加上  i等于当前数组长度-1的时候
            if ((i != 0 && (i + 1) % 17 == 0) || i == chartArr.length - 1) {
                if (i < chartArr.length - 1) {//这里做个小变动，取后面的第一条加入数组
                    currData.push(chartArr[i + 1]);
                }
                //把currData加到allData里
                allData.push(currData);
                //在这里清空currData
                currData = [];
            }
        }
        ;
        return allData;
    },

    //获得数组差（arr1为大数组）
    getArrDif: function (arr1, arr2) {
        for (var i = arr1.length - 1; i >= 0; i--) {
            a = arr1[i];
            for (var j = arr2.length - 1; j >= 0; j--) {
                b = arr2[j];
                if (a == b) {
                    arr1.splice(i, 1);
                    arr2.splice(j, 1);
                    break;
                }
            }
        }
        return arr1;//得到差
    },
    //数组求差（类似二维数组，双重循环）,目前单条件,得第一位的
    getSubtract: function (unionArr, subsetArr, condition) {
        var new_tmp = [];
        for (var i = 0; i < unionArr.length; i++) {
            var flag = true;
            for (var j = 0; j < subsetArr.length; j++) {
                if (unionArr[i][condition] == subsetArr[j][condition]) {
                    flag = false;
                }
            }
            if (flag) {
                new_tmp.push(unionArr[i]);
            }
        }
        return new_tmp;
    },
    //4.在对象数组中，抽取一列，组成数组
    getArrFromObjArr(ObjArr, key) {
        let arr = [];
        for (let i = 0; i < ObjArr.length; i++) {
            arr.push(ObjArr[i][key]);
        }
        return arr;
    },
    //5.重新组合数组对象
    // 对象数组， 对象数组的key， 结果key， 对数据处理
    converObjArr:function(ObjArr, conkeys, resultkeys, format){

        //遍历数组
        for (let i = 0; i < ObjArr.length; i++) {
            //遍历对象
            for(let key in ObjArr[i]) {

            }
        }
    }

}

var arr3 = [
    {"rolename":"aaa"},
    {"rolename":"bbb"},
    {"rolename":"ccc"},
    {"rolename":"ddd"}
];

var arr1 = [
    {"rolename":"aaa"},
    {"rolename":"bbb"},
    {"rolename":"ccc"},
    {"rolename":"ddd"}
];
var arr2 = [
    {"rolename":"eee"},
    {"rolename":"ccc"},
    {"rolename":"aaa"},
    {"rolename":"fff"}
];

var subtract = commonMain.getSubtract(arr1,arr2, "rolename");
console.log(subtract);

var subtract2 = commonMain.getSubtract(arr2,arr1, "rolename");
console.log(subtract2);


var subtract3 = commonMain.getSubtract(arr3,arr1, "rolename");
console.log(subtract3);
