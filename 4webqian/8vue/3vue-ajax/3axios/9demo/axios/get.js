/**
 * 一般有 3axios 和 别名axios方式
 * 1.URL + 无参数
 * 2.拼接 /
 * 3.URL + 字符串参数 ?&: @RequestParam（字段），map，对象
 *      2.2 拼接对象
 *      2.3 拼接对象params
 */
//1.url + 无参数
axios.get(self.contextPath + "/get/url")
    .then(function (response) {
        const data = response.data;
    }.bind(this))
    .catch(function (error) {
        debugger
    }.bind(this));

// 2.URL + 字符串参数?&: @RequestParam（字段），map，对象
// 2.1 拼接
axios.get(self.contextPath + "/get/urlStr1?station=" + self.searchInput)
    .then(function (response) {
        const data = response.data;
    }.bind(this))
    .catch(function (error) {
        debugger
    }.bind(this));
// 2.2 拼接对象
var datas = "station=" + self.searchInput;
axios.get(self.contextPath + "/get/urlStr1", datas)
    .then(function (response) {
        const data = response.data;
    }.bind(this))
    .catch(function (error) {
        debugger
    }.bind(this));
// 2.3 拼接对象params
axios.get(
    self.contextPath + "/get/urlStr1",
    {
        params: {
            currentPage: i,
            pageSize: 20
        }
    }
)
    .then(function (response) {
        const data = response.data;
    }.bind(this))
    .catch(function (error) {
        debugger
    }.bind(this));




