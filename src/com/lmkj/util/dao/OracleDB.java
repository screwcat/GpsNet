package com.lmkj.util.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.ResourceBundle;

public class OracleDB {
	// 数据库连接
	Connection con;
	PreparedStatement pre;

	static String driver;
	static String url;
	static String user;
	static String passwd;

	static {
		// 加载配置文件并获取内容信息
		ResourceBundle rb = ResourceBundle.getBundle("db");
		driver = rb.getString("oracle.driver");
		url = rb.getString("oracle.url");
		user = rb.getString("oracle.user");
		passwd = rb.getString("oracle.passwd");
	}

	public OracleDB() {
		this.con = null;
		this.pre = null;
	}

	/*
	 * 设置数据库非自动提交事务, 默认的是自动提交事务。
	 */
	public void Set_NAuto_Commit() {
		try {
			this.con.setAutoCommit(false);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public void db_conn() {
		try {
			// 加载Oracle驱动程序
			Class.forName(driver);
			// 获取连接
			con = DriverManager.getConnection(url, user, passwd);
			// System.out.println("连接成功！");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 执行查询 sql。
	 */
	public ResultSet db_query(String sql) {
		ResultSet result = null;
		try {
			// pre = con.prepareStatement(sql);
			pre = con.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			result = pre.executeQuery();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 执行insert, update, delete sql。 但没有事务提交
	 */
	public boolean db_excute(String sql) {
		int count = 0;
		try {
			pre = con.prepareStatement(sql);
			count = pre.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		if (count != 0) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 执行存储过程。
	 */
	public ResultSet excProcedure(String preName, List<String> parameter) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < parameter.size(); i++) {
			sb.append("?,");
		}
		String strMat = sb.substring(0, sb.length() - 1);
		try {
			CallableStatement proc = con.prepareCall("{ call " + preName + "(" + strMat + ")}");
			for (int i = 0; i < parameter.size(); i++) {
				proc.setString(i + 1, parameter.get(i));
			}
			System.out.println("{ call " + preName + "(" + strMat + ")}");
			return proc.executeQuery();
		} catch (SQLException e) {
			return null;
		}

	}

	/**
	 * 执行事务提交
	 */
	public void db_commit() {
		try {
			con.commit();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 执行事务回滚
	 */
	public void db_rollback() {
		try {
			con.rollback();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 关闭数据库连接
	 */
	public void db_close() {
		try {
			if (pre != null) {
				pre.close();
			}
			if (con != null) {
				con.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
