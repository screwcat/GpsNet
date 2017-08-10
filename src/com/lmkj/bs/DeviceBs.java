package com.lmkj.bs;

import com.lmkj.pojo.Deviceinfo;
import com.lmkj.util.dao.Pager;

public interface DeviceBs {
	/**
	 * 
	 * @param colOrder排序
	 * @param PageSize每页显示条数
	 * @param pageNum页码
	 * @param strWhere查询条件
	 * @return
	 * @throws Exception
	 */
	public Pager<Deviceinfo> GetDevice(String colOrder, int PageSize, int pageNum, String strWhere) throws Exception;
	
	/**
	 * 解锁和锁定设备
	 * @param id
	 * 		主键Id
	 * @param oper
	 * 		 0 锁定,1 解锁
	 */
	public int LockOrUnlockDevice(int id,int oper);
	
	/**
	 * 删除设备信息
	 * @param id
	 * @return
	 */
	public int DeviceDelete(int id);
}
