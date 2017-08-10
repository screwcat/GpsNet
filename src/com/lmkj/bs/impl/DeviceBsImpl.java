package com.lmkj.bs.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.lmkj.bs.DeviceBs;
import com.lmkj.dao.DeviceDao;
import com.lmkj.pojo.Deviceinfo;
import com.lmkj.util.dao.Pager;

@Component
public class DeviceBsImpl implements DeviceBs {

	@Autowired
	DeviceDao dd;

	@Override
	public Pager<Deviceinfo> GetDevice(String colOrder, int PageSize, int pageNum, String strWhere) throws Exception {
		return dd.GetDevice(colOrder, PageSize, pageNum, strWhere);
	}
	
	/**
	 * 解锁和锁定设备
	 * @param id
	 * 		主键Id
	 * @param oper
	 * 		 0 锁定,1 解锁
	 */
	public int LockOrUnlockDevice(int id,int oper){
		return dd.LockOrUnlockDevice(id, oper);
	}
	
	/**
	 * 删除设备信息
	 * @param id
	 * @return
	 */
	public int DeviceDelete(int id){
		return dd.DeviceDelete(id);
	}
}
