package com.lmkj.util.dao;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.lmkj.util.dao.OracleDB;
import com.lmkj.util.dao.Pager;

public class BaseEntity<T> implements Cloneable {
	/**
	 * 查询数据列表
	 * @param strWhere
	 * @return
	 * @throws Exception
	 */
	public List<T> GetList(String strWhere) throws Exception {
		T obj = (T) this.clone();
		Class classType = obj.getClass();
		Field fields[] = classType.getDeclaredFields();
		String[] gClass = classType.getName().split("\\.");
		String TableName = gClass[gClass.length - 1];
		String sql = "SELECT ";
		for (int i = 0; i < fields.length; i++) {
			Field field = fields[i];
			String fieldName = field.getName();
			sql += fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1) + ",";
		}
		sql = sql.substring(0, sql.length() - 1);
		sql += " FROM " + TableName;
		if (strWhere != "") {
			sql += " WHERE " + strWhere;
		}
		// System.out.println(sql);
		OracleDB odb = new OracleDB();
		odb.db_conn();
		ResultSet rs = odb.db_query(sql);
		List<T> list = new ArrayList();
		while (rs.next()) {
			Object objectCopy = classType.getConstructor(new Class[] {}).newInstance(new Object[] {});
			for (int i = 0; i < fields.length; i++) {
				Field field = fields[i];
				String fieldName = field.getName();
				String firstLetter = fieldName.substring(0, 1).toUpperCase();
				String attributeName = firstLetter + fieldName.substring(1);
				String setMethodName = "set" + attributeName;
				Method setMethod = classType.getMethod(setMethodName, new Class[] { field.getType() });
				if (field.getGenericType() == Integer.class) {
					setMethod.invoke(objectCopy, new Object[] { rs.getInt(attributeName) });
				} else if (field.getGenericType() == String.class) {
					setMethod.invoke(objectCopy, new Object[] { rs.getString(attributeName) });
				} else if (field.getGenericType() == Date.class) {
					setMethod.invoke(objectCopy, new Object[] { rs.getDate(attributeName) });
				} else if (field.getGenericType() == Short.class) {
					setMethod.invoke(objectCopy, new Object[] { rs.getShort(attributeName) });
				} else if (field.getGenericType() == Long.class) {
					setMethod.invoke(objectCopy, new Object[] { rs.getLong(attributeName) });
				} else if (field.getGenericType() == Float.class) {
					setMethod.invoke(objectCopy, new Object[] { rs.getFloat(attributeName) });
				} else if (field.getGenericType() == Boolean.class) {
					setMethod.invoke(objectCopy, new Object[] { rs.getBoolean(attributeName) });
				} else if (field.getGenericType() == Byte.class) {
					setMethod.invoke(objectCopy, new Object[] { rs.getByte(attributeName) });
				} else if (field.getGenericType() == Double.class) {
					setMethod.invoke(objectCopy, new Object[] { rs.getDouble(attributeName) });
				} else if (field.getGenericType() == Timestamp.class) {
					setMethod.invoke(objectCopy, new Object[] { rs.getTimestamp(attributeName) });
				} else if (field.getGenericType() == BigDecimal.class) {
					setMethod.invoke(objectCopy, new Object[] { rs.getBigDecimal(attributeName) });
				} else {
					setMethod.invoke(objectCopy, new Object[] { null });
				}
			}
			list.add((T) objectCopy);
		}
		return list;
	}

	/**
	 * 插入当前记录
	 * @return
	 * @throws Exception
	 */
	public int Insert() throws Exception {
		T obj = (T) this.clone();
		Class classType = obj.getClass();
		Field fields[] = classType.getDeclaredFields();
		String[] gClass = classType.getName().split("\\.");
		String TableName = gClass[gClass.length - 1];
		String strCloumns = "";
		String strPlace = "";
		List<String> aValue = new ArrayList<String>();
		for (int i = 0; i < fields.length; i++) {
			Field field = fields[i];
			String fieldName = field.getName();
			String firstLetter = fieldName.substring(0, 1).toUpperCase();
			String attributeName = firstLetter + fieldName.substring(1);
			String getMethodName = "get" + attributeName;
			Method getMethod = classType.getMethod(getMethodName, new Class[] {});
			Object value = getMethod.invoke(obj, new Object[] {});
			if (value != null && !field.isAnnotationPresent(PrimaryKey.class)) {
				strCloumns += attributeName + ",";
				if (field.getGenericType() == String.class) {
					strPlace += "'%s',";
					aValue.add(value.toString());
				} else if (field.getGenericType() == Date.class) {
					strPlace += "to_date('%s', 'yyyy-mm-dd hh:mi:ss'),";
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
					aValue.add(sdf.format((Date) value));
				} else {
					strPlace += "%s,";
					aValue.add(value.toString());
				}
			}
		}
		strCloumns = strCloumns.substring(0, strCloumns.length() - 1);
		strPlace = strPlace.substring(0, strPlace.length() - 1);
		String sql = String.format("INSERT INTO " + TableName + "(" + strCloumns + ") VALUES (" + strPlace + ")",
				aValue.toArray(new String[aValue.size()]));
		// System.out.println(sql);
		OracleDB odb = new OracleDB();
		odb.db_conn();
		ResultSet rs = odb.db_query(sql);
		return 0;
	}

	/**
	 * 更新当前记录
	 * @return
	 * @throws Exception
	 */
	public int Update() throws Exception {
		T obj = (T) this.clone();
		Class classType = obj.getClass();
		Field fields[] = classType.getDeclaredFields();
		String[] gClass = classType.getName().split("\\.");
		String TableName = gClass[gClass.length - 1];
		String strCond = "";
		String statement = "";
		List<String> aValue = new ArrayList<String>();
		for (int i = 0; i < fields.length; i++) {
			Field field = fields[i];
			String fieldName = field.getName();
			String firstLetter = fieldName.substring(0, 1).toUpperCase();
			String attributeName = firstLetter + fieldName.substring(1);
			String getMethodName = "get" + attributeName;
			Method getMethod = classType.getMethod(getMethodName, new Class[] {});
			Object value = getMethod.invoke(obj, new Object[] {});
			if (field.isAnnotationPresent(PrimaryKey.class)) {
				if (field.getGenericType() == String.class || field.getGenericType() == Date.class) {
					strCond += " AND " + attributeName + " = '" + value + "'";
				} else {
					strCond += " AND " + attributeName + " = " + value;
				}
			} else {
				if (value != null) {
					if (field.getGenericType() == String.class) {
						statement += attributeName + " = '%s'";
						aValue.add(value.toString());
					} else if (field.getGenericType() == Date.class) {
						statement += attributeName + " = to_date('%s', 'yyyy-mm-dd hh:mi:ss')";
						SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
						aValue.add(sdf.format((Date) value));
					} else {
						statement += attributeName + " = %s";
						aValue.add(value.toString());
					}
					statement += ", ";

				}
			}

		}
		if (statement == "") {
			return -1;
		}
		String sql = String.format("UPDATE " + TableName + " SET " + statement,
				aValue.toArray(new String[aValue.size()]));
		strCond = strCond.substring(4);
		sql = sql.substring(0, sql.length() - 2) + " WHERE " + strCond;
		// System.out.println(sql);
		OracleDB odb = new OracleDB();
		odb.db_conn();
		ResultSet rs = odb.db_query(sql);
		return 0;
	}

	/**
	 * 分页查询
	 * @param colOrder：排序依据
	 * @param PageSize：每页条数
	 * @param pageNum：页码
	 * @param strWhere：查询条件
	 * @return Pager类
	 * @throws Exception
	 */
	public Pager GetListByPage(String colOrder, int PageSize, int pageNum, String strWhere) throws Exception {
		T obj = (T) this.clone();
		Class classType = obj.getClass();
		String[] gClass = classType.getName().split("\\.");
		String TableName = gClass[gClass.length - 1];
		String sql1 = "SELECT COUNT(*) FROM " + TableName;
		if (strWhere != "") {
			sql1 += " WHERE " + strWhere;
		}
		OracleDB odb = new OracleDB();
		odb.db_conn();
		ResultSet rs = odb.db_query(sql1);
		int total = 0;
		if (rs.next()) {
			total = rs.getInt(1);
		}
		int start = PageSize * pageNum;
		int end = PageSize * (pageNum - 1);
		String sql2 = "SELECT * FROM (SELECT A.*, ROWNUM RN FROM (SELECT ";
		Field fields[] = classType.getDeclaredFields();
		for (int i = 0; i < fields.length; i++) {
			Field field = fields[i];
			String fieldName = field.getName();
			sql2 += fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1) + ",";
		}
		sql2 = sql2.substring(0, sql2.length() - 1);

		sql2 += " FROM " + TableName;
		if (strWhere != "") {
			sql2 += " WHERE " + strWhere;
		}
		sql2 += " ORDER BY " + colOrder + " DESC) A WHERE ROWNUM <= " + start + ") WHERE RN > " + end;
		ResultSet rs2 = odb.db_query(sql2);
		List<T> list = new ArrayList();
		while (rs2.next()) {
			Object objectCopy = classType.getConstructor(new Class[] {}).newInstance(new Object[] {});
			for (int i = 0; i < fields.length; i++) {
				Field field = fields[i];
				String fieldName = field.getName();
				String firstLetter = fieldName.substring(0, 1).toUpperCase();
				String attributeName = firstLetter + fieldName.substring(1);
				String setMethodName = "set" + attributeName;
				Method setMethod = classType.getMethod(setMethodName, new Class[] { field.getType() });
				if (field.getGenericType() == Integer.class) {
					setMethod.invoke(objectCopy, new Object[] { rs2.getInt(attributeName) });
				} else if (field.getGenericType() == String.class) {
					setMethod.invoke(objectCopy, new Object[] { rs2.getString(attributeName) });
				} else if (field.getGenericType() == Date.class) {
					setMethod.invoke(objectCopy, new Object[] { rs2.getDate(attributeName) });
				} else if (field.getGenericType() == Short.class) {
					setMethod.invoke(objectCopy, new Object[] { rs2.getShort(attributeName) });
				} else if (field.getGenericType() == Long.class) {
					setMethod.invoke(objectCopy, new Object[] { rs2.getLong(attributeName) });
				} else if (field.getGenericType() == Float.class) {
					setMethod.invoke(objectCopy, new Object[] { rs2.getFloat(attributeName) });
				} else if (field.getGenericType() == Boolean.class) {
					setMethod.invoke(objectCopy, new Object[] { rs2.getBoolean(attributeName) });
				} else if (field.getGenericType() == Byte.class) {
					setMethod.invoke(objectCopy, new Object[] { rs2.getByte(attributeName) });
				} else if (field.getGenericType() == Double.class) {
					setMethod.invoke(objectCopy, new Object[] { rs2.getDouble(attributeName) });
				} else if (field.getGenericType() == Timestamp.class) {
					setMethod.invoke(objectCopy, new Object[] { rs2.getTimestamp(attributeName) });
				} else if (field.getGenericType() == BigDecimal.class) {
					setMethod.invoke(objectCopy, new Object[] { rs2.getBigDecimal(attributeName) });
				} else {
					setMethod.invoke(objectCopy, new Object[] { null });
				}
			}
			list.add((T) objectCopy);
		}

		Pager<T> pager = new Pager(total, pageNum, PageSize);
		pager.setList(list);
		return pager;
	}

}
