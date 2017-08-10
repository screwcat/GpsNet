package com.lmkj.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;

import com.lmkj.bs.UserBs;
import com.lmkj.pojo.BaseUserinfo;
import com.lmkj.util.MD5Util;
import com.lmkj.util.VerifyCodeUtils;

@Controller
public class UserController {

	@Autowired
	private UserBs userBs;

	/**
	 * 生成验证码
	 * 
	 * @param req
	 * @param resp
	 */
	@RequestMapping(value = "/code")
	public void code(HttpServletRequest req, HttpServletResponse resp) {
		resp.setHeader("Pragma", "No-cache");
		resp.setHeader("Cache-Control", "no-cache");
		resp.setDateHeader("Expires", 0);
		resp.setContentType("image/jpeg");

		// 生成随机字串
		String verifyCode = VerifyCodeUtils.generateVerifyCode(4);
		// 存入会话session
		HttpSession session = req.getSession(true);
		session.setAttribute("rand", verifyCode.toLowerCase());
		// 生成图片
		int w = 200, h = 80;
		try {
			VerifyCodeUtils.outputImage(w, h, resp.getOutputStream(), verifyCode.toLowerCase());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * 登录功能
	 * 
	 * @param req
	 * @param resp
	 */
	@RequestMapping(value = "/login")
	public void login(HttpServletRequest req, HttpServletResponse resp) {
		HttpSession session = req.getSession();
		String action = req.getParameter("action");
		String user_Account = req.getParameter("user_Account");
		String userPwd = req.getParameter("userPwd");
		String code = req.getParameter("code");
		String passWord = MD5Util.MD5Encode(userPwd, "UTF-8");
		List<BaseUserinfo> list = userBs.login(action, user_Account, passWord, code);
		BaseUserinfo user = new BaseUserinfo();
		BigDecimal deletemark = null;
		for (int i = 0; i < list.size(); i++) {
			user = list.get(i);
			deletemark = user.getDeletemark();
		}
		if (!action.equals("")) {
			if (!action.equals("login")) {
				if (action.equals("Menu")) {
					BaseUserinfo userinfo = (BaseUserinfo) session.getAttribute("user");
					try {
						try {
							resp.getWriter().write(userBs.getMenuByUserID(userinfo.getUserId()));
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					} catch (SQLException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			} else {
				String cookiecode = (String) session.getAttribute("rand");
				if (!code.equals(cookiecode)) {
					try {
						resp.getWriter().write("1");
						return;
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
				if (list.size() > 0) {
					if (deletemark.toString().equals("1")) {
						if (list.size() > 0) {
							session.setAttribute("user", user);
							try {
								resp.getWriter().write("3");
								return;
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
						} else {
							try {
								resp.getWriter().write("6");
								return;
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
						}
					} else {
						// o_idao.SysLoginLog(str2, "2", str5);
						try {
							resp.getWriter().write("2");
							return;
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				} else {
					// o_idao.SysLoginLog(str2, "0", str5);
					try {
						resp.getWriter().write("4");
						return;
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}
		}
	}

	/**
	 * 获取IP地址
	 * 
	 * @param req
	 * @param resp
	 */
	@RequestMapping(value = "/getIPAddress")
	public void getIPAddress(HttpServletRequest req, HttpServletResponse resp) {
		try {
			resp.getWriter().write(userBs.getIPAddress());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * 获得当前时间
	 * 
	 * @param req
	 * @param resp
	 */
	@RequestMapping(value = "/getTime")
	public void getTime(HttpServletRequest req, HttpServletResponse resp) {
		try {
			resp.getWriter().write(userBs.getTime());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
