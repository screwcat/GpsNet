package com.lmkj.dao.impl;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONException;
import org.springframework.stereotype.Component;

import com.lmkj.dao.UserDao;
import com.lmkj.pojo.BaseUserinfo;
import com.lmkj.util.CommonUtil;
import com.lmkj.util.JsonTools;
import com.lmkj.util.dao.OracleDB;

@Component
public class UserDaoImpl implements UserDao {

	// 创建数据库对象
	OracleDB odb = new OracleDB();

	ResultSet rs;

	/**
	 * 登录功能
	 * 
	 * @param action
	 *            权限用户
	 * @param user_Account
	 *            登录用户
	 * @param userPwd
	 *            登录密码
	 * @param code
	 *            登录验证码
	 * @return
	 */
	@Override
	public List<BaseUserinfo> login(String action, String user_Account, String userPwd, String code) {
		// 连接数据库
		odb.db_conn();
		String sql = String.format(
				"Select User_ID,User_Account,User_Pwd,uId,User_Name,DeleteMark,ComIds from Base_UserInfo where User_Account='%s' and User_Pwd='%s'",
				user_Account, userPwd);
		rs = odb.db_query(sql);
		List<BaseUserinfo> list = new ArrayList<BaseUserinfo>();
		try {
			while (rs.next()) {
				BaseUserinfo user = new BaseUserinfo();
				user.setDeletemark(rs.getBigDecimal("DeleteMark"));
				user.setUserId(rs.getString("User_ID"));
				user.setUserAccount(rs.getString("User_Account"));
				user.setUserPwd(rs.getString("User_Pwd"));
				user.setUid(rs.getBigDecimal("uId"));
				user.setUserName(rs.getString("User_Name"));
				user.setComids(rs.getString("ComIds"));
				list.add(user);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		odb.db_close();
		try {
			rs.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 根据用户ID查询用户菜单
	 * 
	 * @param userID
	 * @throws JSONException
	 * @throws SQLException
	 */
	@Override
	public String getMenuByUserID(String userID) throws SQLException, JSONException {
		// 连接数据库
		odb.db_conn();
		String sql = String.format("SELECT  M.Menu_Name ,M.Menu_Title ,M.Menu_Img ,M.TARGET ,M.ParentId ,M.Menu_Id ,"
				+ "M.NavigateUrl ,M.SortCode ,'角色权限' AS TheirTYPE FROM Base_SysMenu M LEFT JOIN "
				+ "Base_RoleRight R_R ON R_R.Menu_Id = M.Menu_Id LEFT JOIN Base_UserRole U_R ON "
				+ "U_R.Roles_ID = R_R.Roles_ID WHERE M.TARGET = 'Iframe' AND U_R.User_ID = "
				+ "'%s' AND M.DeleteMark = 1 UNION ALL SELECT  M.Menu_Name ,"
				+ "M.Menu_Title ,M.Menu_Img ,M.TARGET ,M.ParentId ,M.Menu_Id ,M.NavigateUrl ,"
				+ "M.SortCode ,'用户组权限' AS TheirTYPE  FROM Base_SysMenu M LEFT JOIN Base_UserGroupRight"
				+ " U_R ON U_R.Menu_Id = M.Menu_Id LEFT JOIN Base_UserInfoUserGroup U_G ON "
				+ "U_G.UserGroup_ID = U_R.UserGroup_ID  WHERE M.TARGET = 'Iframe' AND U_G.User_ID = "
				+ "'%s' AND M.DeleteMark = 1 UNION ALL SELECT M.Menu_Name ,"
				+ "M.Menu_Title ,M.Menu_Img ,M.TARGET ,M.ParentId ,M.Menu_Id ,M.NavigateUrl ,"
				+ "M.SortCode ,'用户权限' AS TheirTYPE FROM Base_SysMenu M LEFT JOIN Base_UserRight "
				+ "U_R ON U_R.Menu_Id = M.Menu_Id WHERE M.TARGET = 'Iframe' AND U_R.User_ID = "
				+ "'%s' AND M.DeleteMark = 1", userID, userID, userID);
		rs = odb.db_query(sql);
		odb.db_close();
		rs.close();
		return JsonTools.resultSetToJson(rs);
	}
	
	/**
	 * 获取IP地址
	 * @return
	 */
	@Override
	public String getIPAddress(){
		InetAddress addr = null;
		try {
			addr = InetAddress.getLocalHost();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return addr.getHostAddress().toString();//获得本机IP
	}
	
	/**
	 * 获得当前时间
	 */
	@Override
	public String getTime(){
		return CommonUtil.get_time();
	}

}
