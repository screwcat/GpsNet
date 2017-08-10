package com.lmkj.dao;

import java.sql.ResultSet;

public interface WebServiceDao {
	public ResultSet GetMenu(String userid) throws Exception;
	
}
