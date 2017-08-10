package com.lmkj.util;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class JsonTools {
	public static String resultSetToJson(ResultSet rs) throws SQLException, JSONException {
		// json数组
		JSONArray array = new JSONArray();

		// 获取列数
		ResultSetMetaData metaData = rs.getMetaData();
		int columnCount = metaData.getColumnCount();

		// 遍历ResultSet中的每条数据
		while (rs.next()) {
			JSONObject jsonObj = new JSONObject();

			// 遍历每一列
			for (int i = 1; i <= columnCount; i++) {
				String columnName = metaData.getColumnLabel(i);
				String value = rs.getString(columnName);
				if (value == null) {
					value = "";
				}
				jsonObj.put(columnName, value);
			}
			array.put(jsonObj);
		}

		return array.toString();
	}
	public static List ResultsetToList(ResultSet rs) throws Exception{
		List list = new ArrayList();
		ResultSetMetaData md = rs.getMetaData();
		int columnCount = md.getColumnCount();
		while (rs.next()) {
			Map rowData = new HashMap();
			for (int i = 1; i <= columnCount; i++) {
				rowData.put(md.getColumnName(i), rs.getObject(i));
			}
			list.add(rowData);
		}
		return list;
	}
}