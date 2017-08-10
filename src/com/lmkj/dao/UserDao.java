package com.lmkj.dao;

import java.sql.SQLException;
import java.util.List;

import org.json.JSONException;

import com.lmkj.pojo.BaseUserinfo;


public interface UserDao {
	/**
	 * 登录功能
	 * 
	 * @param action
	 * 		权限用户
	 * @param user_Account
	 * 		登录用户
	 * @param userPwd
	 * 		登录密码
	 * @param code
	 * 		登录验证码
	 * @return
	 */
	public List<BaseUserinfo> login(String action,String user_Account,String userPwd,String code);
	
	/**
	 * 根据用户ID查询用户菜单
	 * 
	 * @param userID
	 * @throws JSONException 
	 * @throws SQLException 
	 */
	public String getMenuByUserID(String userID) throws SQLException, JSONException;
	
	/**
	 * 获取IP地址
	 * @return
	 */
	public String getIPAddress();
	
	/**
	 * 获得当前时间
	 */
	public String getTime();
}
