let commonMain = {
    getObjArrWhere: function (Objarr, items) {
        let ObjArr2 = [];
        for (let i = 0; i < Objarr.length; i++) {
            let count = 0;
            // 循环判断条件满足并计数
            items.forEach((item, index) => {
                if (item.value.indexOf(Objarr[i][item.key]) + 1) {
                    count += 1;
                } else {
                    count += 0;
                }
            });
            if (items.length == count) {
                ObjArr2.push(Objarr[i]);
            }
        }
        return ObjArr2;
    },
    //数组中，根据一个对象找同一个对象的其他值
    getValByItem: function (Objarr, item, resKey) {
        for (let i = 0; i < Objarr.length; i++) {
            if(item.value.indexOf(Objarr[i][item.key]) + 1) {
                return Objarr[i][resKey];
                debugger
            }
        }
        return "";
    },
    getJpaMany2One:function (manyItems, oneItems, ids) {
        let res = JSON.parse(JSON.stringify(manyItems));
        labelB:for (let i = 0; i < manyItems.length; i++) {
            for (let j = 0; j < oneItems.length; j++) {
                if (manyItems[i][ids[0]] == oneItems[j][ids[0]]) {
                    res[i][ids[1]] = oneItems[j];
                    continue labelB;
                }
            }
        }
        return res;
    }
}
