package com.lmkj.controller;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.lmkj.bs.DeviceBs;
import com.lmkj.pojo.Deviceinfo;
import com.lmkj.util.Result;
import com.lmkj.util.dao.Pager;

@Controller
public class DeviceController {
	@Autowired
	DeviceBs db;
	
	Result rt =  new Result();

	@RequestMapping(value = "/Device/Device_List/{pageNum}", method = RequestMethod.GET)
	public ModelAndView DeviceList(@PathVariable Integer pageNum) throws Exception {
		ModelAndView mv = new ModelAndView();
		Pager<Deviceinfo> page = db.GetDevice("id", 30, pageNum, "isdel = 0");
		mv.addObject("Device", page);
		mv.setViewName("Device/Device_list");
		return mv;
	}
	
	/**
	 * 新增设备信息
	 * @param req
	 * @param resp
	 */
	@RequestMapping(value = "/Save_Device")
	public void Save_Device(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		resp.setContentType("text/hmtl;charset=utf-8");
		String imei = req.getParameter("Tbimei");
		String PlateNo = req.getParameter("TbPlateNo");
		String CarPhone = req.getParameter("TbCarPhone");
		String SimNo = req.getParameter("TbSimNo");
		String cDate = req.getParameter("TbcDate");
		String uDate = req.getParameter("TbuDate");
		String IsInstall = req.getParameter("TbIsInstall");
		if(IsInstall == null){
			IsInstall = "0";
		}
		String IsActivation = req.getParameter("TbIsActivation");
		if(IsActivation == null ){
			IsActivation = "0";
		}
		String tcpProtocol = req.getParameter("TbtcpProtocol");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); 
		BigDecimal Install=new BigDecimal(IsInstall);
		BigDecimal Activation=new BigDecimal(IsActivation);
	    Date datec = null;
		try {
			datec = sdf.parse(cDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    Date dateu = null;
		try {
			dateu = sdf.parse(uDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Deviceinfo deviceinfo = new Deviceinfo();
		deviceinfo.setImei(imei);
		deviceinfo.setPlateno(PlateNo);
		deviceinfo.setCarphone(CarPhone);
		deviceinfo.setSimno(SimNo);
		deviceinfo.setCdate(datec);
		deviceinfo.setUdate(dateu);
		deviceinfo.setIsinstall(Install);
		deviceinfo.setActivation(Activation);
		deviceinfo.setTcpprotocol(tcpProtocol);
		try {
			if(deviceinfo.Insert() == 0){
				resp.getWriter().write("提交成功，谢谢！");
			}else{
				resp.getWriter().write("提交失败,请重试！");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * 查询设备信息
	 * @param req
	 * @param resp
	 */
	@RequestMapping(value = "/Select_Device")
	@ResponseBody
	public void Select_Device(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		resp.setContentType("text/hmtl;charset=utf-8");
		String Id = req.getParameter("did");
		Deviceinfo deviceinfo = new Deviceinfo();
		List<Deviceinfo> list = deviceinfo.GetList("ID="+Id);
		for(int i=0;i<list.size();i++) 
		{ 
		deviceinfo = (Deviceinfo)list.get(i);  
		} 
		String deviceinfo_json = JSONObject.toJSONString(deviceinfo).toString();
		resp.getWriter().write(deviceinfo_json);
	}
	
	/**
	 * 修改设备信息
	 * @param req
	 * @param resp
	 */
	@RequestMapping(value = "/Edit_Device")
	public void Edit_Device(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		resp.setContentType("text/hmtl;charset=utf-8");
		String id = req.getParameter("TbId");
		String imei = req.getParameter("Tbimei");
		String PlateNo = req.getParameter("TbPlateNo");
		String CarPhone = req.getParameter("TbCarPhone");
		String SimNo = req.getParameter("TbSimNo");
		String cDate = req.getParameter("TbcDate");
		String uDate = req.getParameter("TbuDate");
		String IsInstall = req.getParameter("TbIsInstall");
		if(IsInstall == null){
			IsInstall = "0";
		}
		String IsActivation = req.getParameter("TbIsActivation");
		if(IsActivation == null ){
			IsActivation = "0";
		}
		String tcpProtocol = req.getParameter("TbtcpProtocol");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); 
		BigDecimal Install=new BigDecimal(IsInstall);
		BigDecimal Activation=new BigDecimal(IsActivation);
		BigDecimal aId=new BigDecimal(id);
	    Date datec = null;
		try {
			datec = sdf.parse(cDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    Date dateu = null;
		try {
			dateu = sdf.parse(uDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Deviceinfo deviceinfo = new Deviceinfo();
		deviceinfo.setId(aId);
		deviceinfo.setImei(imei);
		deviceinfo.setPlateno(PlateNo);
		deviceinfo.setCarphone(CarPhone);
		deviceinfo.setSimno(SimNo);
		deviceinfo.setCdate(datec);
		deviceinfo.setUdate(dateu);
		deviceinfo.setIsinstall(Install);
		deviceinfo.setActivation(Activation);
		deviceinfo.setTcpprotocol(tcpProtocol);
		try {
			if(deviceinfo.Update() == 0){
				resp.getWriter().write("编辑成功，谢谢！");
			}else{
				resp.getWriter().write("编辑失败,请重试！");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * 删除、锁定、解锁设备信息
	 * @param req
	 * @param resp
	 */
	@RequestMapping(value = "/Delete_Device")
	public void Delete_Device(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		resp.setContentType("text/hmtl;charset=utf-8");
		String action = req.getParameter("action");
		String Id = req.getParameter("Id");
		String oper = req.getParameter("oper");
		int num = 0;
        if (action != null)
        {
            if (!action.equals("Cut"))
            {
                if (action.equals("devicedelete"))
                {
                        if (Id != null)
                        {
                            String[] ss = Id.split(",");

                            for (int i = 0; i < ss.length; i++)
                            {
                            	Id = ss[i];
                            	num = db.DeviceDelete(Integer.valueOf(Id));
                            	resp.getWriter().write(String.valueOf(num));
                            }
                        }
                        else
                        {
                        	resp.getWriter().write(String.valueOf(num));
                        }
                }
                else if (action.equals("LockOrUnlockDevice"))
                {
                    if (Id != null)
                    {
                        String[] ss = Id.split(",");

                        for (int i = 0; i < ss.length; i++)
                        {
                        	Id = ss[i];
                        	num = db.LockOrUnlockDevice(Integer.valueOf(Id), Integer.valueOf(oper));
                        	resp.getWriter().write(String.valueOf(num));
                        }
                    }
                    else
                    {
                    	resp.getWriter().write(String.valueOf(num));
                    }
                }
            }
        }
	}
	
	
}
