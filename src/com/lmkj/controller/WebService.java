package com.lmkj.controller;

import java.sql.ResultSet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.lmkj.bs.WebServiceBs;
import com.lmkj.util.JsonTools;
@Controller
public class WebService {
	@Autowired
	WebServiceBs wsb;

	@RequestMapping(value = "/GetMenu", method = RequestMethod.POST)
	public void GetMenu(HttpServletRequest req, HttpServletResponse resp, String userid) throws Exception {
		resp.setContentType("text/hmtl;charset=utf-8");
		ResultSet rs = wsb.GetMenu(userid);
		resp.getWriter().write(JsonTools.resultSetToJson(rs));
	}
	
	
	@RequestMapping(value = "/GetMap", method = RequestMethod.GET)
	public void GetMap(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		resp.setContentType("text/hmtl;charset=utf-8");

		resp.getWriter().write("OK");
	}
	
}
