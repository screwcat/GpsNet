package com.lmkj.bs;

import java.sql.ResultSet;


public interface WebServiceBs {
	public ResultSet GetMenu(String userid) throws Exception;
}
