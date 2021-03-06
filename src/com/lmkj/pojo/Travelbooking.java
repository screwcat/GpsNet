package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Travelbooking generated by hbm2java
 */
public class Travelbooking implements java.io.Serializable {

	private BigDecimal id;
	private String imei;
	private String plateno;
	private String cmd;
	private String status;
	private Serializable createdate;
	private Serializable bdate;
	private Serializable edate;
	private String baddress;
	private String eaddress;
	private String remark;
	private String touserhuanxin;
	private String fromuser;
	private String messagetype;
	private BigDecimal key;

	public Travelbooking() {
	}

	public Travelbooking(BigDecimal id) {
		this.id = id;
	}

	public Travelbooking(BigDecimal id, String imei, String plateno, String cmd, String status, Serializable createdate,
			Serializable bdate, Serializable edate, String baddress, String eaddress, String remark,
			String touserhuanxin, String fromuser, String messagetype, BigDecimal key) {
		this.id = id;
		this.imei = imei;
		this.plateno = plateno;
		this.cmd = cmd;
		this.status = status;
		this.createdate = createdate;
		this.bdate = bdate;
		this.edate = edate;
		this.baddress = baddress;
		this.eaddress = eaddress;
		this.remark = remark;
		this.touserhuanxin = touserhuanxin;
		this.fromuser = fromuser;
		this.messagetype = messagetype;
		this.key = key;
	}

	public BigDecimal getId() {
		return this.id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

	public String getImei() {
		return this.imei;
	}

	public void setImei(String imei) {
		this.imei = imei;
	}

	public String getPlateno() {
		return this.plateno;
	}

	public void setPlateno(String plateno) {
		this.plateno = plateno;
	}

	public String getCmd() {
		return this.cmd;
	}

	public void setCmd(String cmd) {
		this.cmd = cmd;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Serializable getCreatedate() {
		return this.createdate;
	}

	public void setCreatedate(Serializable createdate) {
		this.createdate = createdate;
	}

	public Serializable getBdate() {
		return this.bdate;
	}

	public void setBdate(Serializable bdate) {
		this.bdate = bdate;
	}

	public Serializable getEdate() {
		return this.edate;
	}

	public void setEdate(Serializable edate) {
		this.edate = edate;
	}

	public String getBaddress() {
		return this.baddress;
	}

	public void setBaddress(String baddress) {
		this.baddress = baddress;
	}

	public String getEaddress() {
		return this.eaddress;
	}

	public void setEaddress(String eaddress) {
		this.eaddress = eaddress;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getTouserhuanxin() {
		return this.touserhuanxin;
	}

	public void setTouserhuanxin(String touserhuanxin) {
		this.touserhuanxin = touserhuanxin;
	}

	public String getFromuser() {
		return this.fromuser;
	}

	public void setFromuser(String fromuser) {
		this.fromuser = fromuser;
	}

	public String getMessagetype() {
		return this.messagetype;
	}

	public void setMessagetype(String messagetype) {
		this.messagetype = messagetype;
	}

	public BigDecimal getKey() {
		return this.key;
	}

	public void setKey(BigDecimal key) {
		this.key = key;
	}

}
