package com.lmkj.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;



@Controller
public class GpsController {
	
	@RequestMapping(value = "/GPS/Map")
	public ModelAndView Map(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		ModelAndView mv = new ModelAndView();
		// Pager<Deviceinfo> page = db.GetDevice("id", 30, pageNum, "");
		// mv.addObject("Device", page);
		mv.setViewName("GPS/Map");
		return mv;
	}

}
