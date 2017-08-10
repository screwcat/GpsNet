package com.lmkj.bs.impl;

import java.sql.ResultSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.lmkj.bs.WebServiceBs;
import com.lmkj.dao.WebServiceDao;

@Component
public class WebServiceBsImpl implements WebServiceBs {

	@Autowired
	WebServiceDao wsd;

	@Override
	public ResultSet GetMenu(String userid) throws Exception {
		return wsd.GetMenu(userid);
	}

	


}
