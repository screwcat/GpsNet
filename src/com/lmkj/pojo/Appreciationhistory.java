package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Appreciationhistory generated by hbm2java
 */
public class Appreciationhistory implements java.io.Serializable {

	private BigDecimal appreciationid;
	private Serializable vbdate;
	private Serializable vedate;
	private Serializable appcreatrdate;
	private String imei;
	private String plateno;
	private BigDecimal vmoney;
	private BigDecimal vmonth;
	private String remark;

	public Appreciationhistory() {
	}

	public Appreciationhistory(BigDecimal appreciationid) {
		this.appreciationid = appreciationid;
	}

	public Appreciationhistory(BigDecimal appreciationid, Serializable vbdate, Serializable vedate,
			Serializable appcreatrdate, String imei, String plateno, BigDecimal vmoney, BigDecimal vmonth,
			String remark) {
		this.appreciationid = appreciationid;
		this.vbdate = vbdate;
		this.vedate = vedate;
		this.appcreatrdate = appcreatrdate;
		this.imei = imei;
		this.plateno = plateno;
		this.vmoney = vmoney;
		this.vmonth = vmonth;
		this.remark = remark;
	}

	public BigDecimal getAppreciationid() {
		return this.appreciationid;
	}

	public void setAppreciationid(BigDecimal appreciationid) {
		this.appreciationid = appreciationid;
	}

	public Serializable getVbdate() {
		return this.vbdate;
	}

	public void setVbdate(Serializable vbdate) {
		this.vbdate = vbdate;
	}

	public Serializable getVedate() {
		return this.vedate;
	}

	public void setVedate(Serializable vedate) {
		this.vedate = vedate;
	}

	public Serializable getAppcreatrdate() {
		return this.appcreatrdate;
	}

	public void setAppcreatrdate(Serializable appcreatrdate) {
		this.appcreatrdate = appcreatrdate;
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

	public BigDecimal getVmoney() {
		return this.vmoney;
	}

	public void setVmoney(BigDecimal vmoney) {
		this.vmoney = vmoney;
	}

	public BigDecimal getVmonth() {
		return this.vmonth;
	}

	public void setVmonth(BigDecimal vmonth) {
		this.vmonth = vmonth;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}
