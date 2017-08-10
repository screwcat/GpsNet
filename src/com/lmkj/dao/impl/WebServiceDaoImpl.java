package com.lmkj.dao.impl;

import java.sql.ResultSet;

import org.springframework.stereotype.Component;

import com.lmkj.dao.WebServiceDao;
import com.lmkj.util.dao.OracleDB;

@Component
public class WebServiceDaoImpl implements WebServiceDao {

	@Override
	public ResultSet GetMenu(String userid) throws Exception {
		OracleDB odb = new OracleDB();
		odb.db_conn();
		String sql = String.format(
				"SELECT M.Menu_Id,M.Menu_Name ,M.Menu_Title ,M.Menu_Img ,M.TARGET ,M.ParentId,M.NavigateUrl ,M.SortCode FROM (SELECT M.Menu_Name ,M.Menu_Title ,M.Menu_Img ,M.TARGET ,M.ParentId,M.Menu_Id ,M.NavigateUrl ,M.SortCode ,'角色权限' AS TheirTYPE FROM Base_SysMenu M LEFT JOIN Base_RoleRight R_R ON R_R.Menu_Id = M.Menu_Id LEFT JOIN Base_UserRole U_R ON U_R.Roles_ID = R_R.Roles_ID WHERE M.TARGET = 'Iframe' AND U_R.User_ID = '%s' AND M.DeleteMark = 1 UNION ALL SELECT M.Menu_Name ,M.Menu_Title ,M.Menu_Img ,M.TARGET ,M.ParentId,M.Menu_Id ,M.NavigateUrl ,M.SortCode ,'用户组权限' AS TheirTYPE FROM Base_SysMenu M LEFT JOIN Base_UserGroupRight U_R ON U_R.Menu_Id = M.Menu_Id LEFT JOIN Base_UserInfoUserGroup U_G ON U_G.UserGroup_ID = U_R.UserGroup_ID WHERE M.TARGET = 'Iframe' AND U_G.User_ID = '%s' AND M.DeleteMark = 1 UNION ALL SELECT M.Menu_Name ,M.Menu_Title ,M.Menu_Img ,M.TARGET ,M.ParentId,M.Menu_Id ,M.NavigateUrl ,M.SortCode ,'用户权限' AS TheirTYPE FROM Base_SysMenu M LEFT JOIN Base_UserRight U_R ON U_R.Menu_Id = M.Menu_Id WHERE M.TARGET = 'Iframe' AND U_R.User_ID ='%s' AND M.DeleteMark = 1 ) M GROUP BY M.Menu_Id ,M.Menu_Name ,M.Menu_Title,M.Menu_Img ,M.TARGET,M.ParentId ,M.NavigateUrl ,M.SortCode ORDER BY M.SortCode",
				userid, userid, userid);
		ResultSet rs = odb.db_query(sql);
		return rs;
	}

	
}