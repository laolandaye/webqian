/**
 * 一般有 3axios 和 别名axios方式
 * 1.URL + 无参数
 * 2.1 地址/
 * 3.URL + 字符串参数: @RequestParam（字段），map，对象
 *      3.1 地址拼接  ?&
 *      3.1 参数拼接  ?&
 * 3.URL + json对象｛｝@RequestBody
 */
//1.url + 无参数
axios.post(self.contextPath + "/post/url")
    .then(function (response) {
        const data = response.data;
    }.bind(this))
    .catch(function (error) {
        debugger
    }.bind(this));

axios.post(self.contextPath + "/post/url/1")
    .then(function (response) {
        const data = response.data;
    }.bind(this))
    .catch(function (error) {
        debugger
    }.bind(this));

// 3.URL + 字符串参数?&: @RequestParam（字段），map，对象
// 3.1 拼接
axios.post(self.contextPath + "/post/urlStr1?station=" + self.searchInput)
    .then(function (response) {
        const data = response.data;
    }.bind(this))
    .catch(function (error) {
        debugger
    }.bind(this))
// 3.2 拼接对象
var datas = "station=" + self.searchInput;
axios.post(self.contextPath + "/post/urlStr1", datas)
    .then(function (response) {
        const data = response.data;
    }.bind(this))
    .catch(function (error) {
        debugger
    }.bind(this));


this.$http.post('/item/brand', this.$qs.stringify(params))  //多对象
    .then(() => {
        // 关闭窗口
        this.$emit("close");
        this.$message.success("保存成功！");
    })
    .catch(() => {
        this.$message.error("保存失败！");
    });


// 3.URL + 对象｛｝
axios({
    method: 'post',
    url: this.contextPath + "/transport/getStationNumDayOrMonth",
    data: {
        stationName: stationName,
        date: date,
        value: value,
        size: size,
        page: page,
    }
}).then(function (response) {
    const data = response.data;
}.bind(this))
.catch(function (error) {
    debugger
}.bind(this));

axios.post(
    this.contextPath + "/post/urlData",
    {
        stationName: stationName,
        date: date,
        value: value,
        size: size,
        page: page,
    }).then(function (response) {
        const data = response.data;
    }.bind(this))
    .catch(function (error) {
        debugger
    }.bind(this));
