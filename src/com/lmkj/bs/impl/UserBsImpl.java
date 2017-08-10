package com.lmkj.bs.impl;

import java.sql.SQLException;
import java.util.List;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.lmkj.bs.UserBs;
import com.lmkj.dao.UserDao;
import com.lmkj.pojo.BaseUserinfo;

@Component
public class UserBsImpl implements UserBs{

	@Autowired
	private UserDao userDao;
	
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
	@Override
	public List<BaseUserinfo> login(String action, String user_Account, String userPwd, String code) {
		return userDao.login(action, user_Account, userPwd, code);
	}
	
	/**
	 * 根据用户ID查询用户菜单
	 * 
	 * @param userID
	 * @throws JSONException 
	 * @throws SQLException 
	 */
	@Override
	public String getMenuByUserID(String userID) throws SQLException, JSONException{
		return userDao.getMenuByUserID(userID);
	}
	
	/**
	 * 获取IP地址
	 * @return
	 */
	@Override
	public String getIPAddress(){
		return userDao.getIPAddress();
	}
	
	/**
	 * 获得当前时间
	 */
	@Override
	public String getTime(){
		return userDao.getTime();
	}

}
