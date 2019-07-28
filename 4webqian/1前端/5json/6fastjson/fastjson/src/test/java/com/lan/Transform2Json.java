package com.lan;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/***
 * 利用alibaba的fastjson将数据转化为Json格式
 */
public class Transform2Json {
    /** 将Map转换为JsonObject */
    public static JSONObject map2JsonObject(){

        HashMap<Object, Object> hp = new HashMap<>();
        hp.put("lat",32.7681);
        hp.put("lon","114.1379");
        hp.put("header","iron");
        hp.put("request","post");
        hp.put("page","1");

        String s = JSON.toJSONString(hp);
        JSONObject jsonObject = JSONObject.parseObject(s);

        return jsonObject;
    }

    /** 将List<Map>格式数据转换为JsonArray */
    public static JSONArray list2JsonArray(){

        ArrayList<Map<Object, Object>> maps = new ArrayList<>();
        HashMap<Object, Object> dataMap = new HashMap<>();
        HashMap<Object, Object> dataMap1 = new HashMap<>();
        dataMap.put("request","get");
        dataMap.put("status",200);
        dataMap.put("header","git");

        dataMap1.put("block","1");
        maps.add(dataMap);
        maps.add(dataMap1);

        String s1 = JSON.toJSONString(maps);
        JSONArray jsonArray = JSONArray.parseArray(s1);

        return jsonArray;
    }

    public static void main(String[] args) {
        JSONObject jsonObject = map2JsonObject();
        JSONArray jsonArray = list2JsonArray();
        System.out.println("Map转换JsonObject后:"+jsonObject);
        System.out.println("List转换JsonArray后:"+jsonArray);
    }
}

