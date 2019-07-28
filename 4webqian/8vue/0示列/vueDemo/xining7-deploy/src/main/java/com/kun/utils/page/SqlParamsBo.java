package com.kun.utils.page;

import java.util.List;

public class SqlParamsBo {
    private String sql;
    private List<Object> params;

    public SqlParamsBo() {
    }

    public SqlParamsBo(String sql, List<Object> params) {
        this.sql = sql;
        this.params = params;
    }

    public String getSql() {
        return sql;
    }

    public void setSql(String sql) {
        this.sql = sql;
    }

    public List<Object> getParams() {
        return params;
    }

    public void setParams(List<Object> params) {
        this.params = params;
    }
}
