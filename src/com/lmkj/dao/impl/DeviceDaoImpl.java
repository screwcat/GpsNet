package com.lmkj.dao.impl;

import java.sql.ResultSet;

import org.springframework.stereotype.Component;

import com.lmkj.dao.DeviceDao;
import com.lmkj.pojo.Deviceinfo;
import com.lmkj.util.dao.OracleDB;
import com.lmkj.util.dao.Pager;

@Component
public class DeviceDaoImpl implements DeviceDao {
	
	// 创建数据库对象
	OracleDB odb = new OracleDB();

	ResultSet rs;

	@Override
	public Pager<Deviceinfo> GetDevice(String colOrder, int PageSize, int pageNum, String strWhere) throws Exception {
		Deviceinfo device = new Deviceinfo();
		return device.GetListByPage(colOrder, PageSize, pageNum, strWhere);
	}
	
	/**
	 * 解锁和锁定设备
	 * @param id
	 * 		主键Id
	 * @param oper
	 * 		 0 锁定,1 解锁
	 */
	public int LockOrUnlockDevice(int id,int oper){
		odb.db_conn();
		int num = 0;
		String sql = String.format("update DeviceInfo  set islocked='%s' where Id='%s'",oper,id);
		if(odb.db_excute(sql)){
			num = 1;
		}else {
			num = 0;
		}
		odb.db_close();
		return num;
	}
	
	/**
	 * 删除设备信息
	 * @param id
	 * @return
	 */
	public int DeviceDelete(int id){
		odb.db_conn();
		int num = 0;
		String sql = String.format("update DeviceInfo set isdel=1 where Id='%s'",id);
		if(odb.db_excute(sql)){
			++num;
			odb.db_commit();
		}else {
			num = 0;
			odb.db_rollback();
		}
		odb.db_close();
		return num;
	}

}
