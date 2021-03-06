package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Storecheck generated by hbm2java
 */
public class Storecheck implements java.io.Serializable {

	private BigDecimal id;
	private String imei;
	private String drivepath;
	private String drivingpath;
	private String identitypath;
	private Serializable createdate;
	private BigDecimal status;
	private String plateno;
	private String storeid;
	private String storestatus;

	public Storecheck() {
	}

	public Storecheck(BigDecimal id) {
		this.id = id;
	}

	public Storecheck(BigDecimal id, String imei, String drivepath, String drivingpath, String identitypath,
			Serializable createdate, BigDecimal status, String plateno, String storeid, String storestatus) {
		this.id = id;
		this.imei = imei;
		this.drivepath = drivepath;
		this.drivingpath = drivingpath;
		this.identitypath = identitypath;
		this.createdate = createdate;
		this.status = status;
		this.plateno = plateno;
		this.storeid = storeid;
		this.storestatus = storestatus;
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

	public String getDrivepath() {
		return this.drivepath;
	}

	public void setDrivepath(String drivepath) {
		this.drivepath = drivepath;
	}

	public String getDrivingpath() {
		return this.drivingpath;
	}

	public void setDrivingpath(String drivingpath) {
		this.drivingpath = drivingpath;
	}

	public String getIdentitypath() {
		return this.identitypath;
	}

	public void setIdentitypath(String identitypath) {
		this.identitypath = identitypath;
	}

	public Serializable getCreatedate() {
		return this.createdate;
	}

	public void setCreatedate(Serializable createdate) {
		this.createdate = createdate;
	}

	public BigDecimal getStatus() {
		return this.status;
	}

	public void setStatus(BigDecimal status) {
		this.status = status;
	}

	public String getPlateno() {
		return this.plateno;
	}

	public void setPlateno(String plateno) {
		this.plateno = plateno;
	}

	public String getStoreid() {
		return this.storeid;
	}

	public void setStoreid(String storeid) {
		this.storeid = storeid;
	}

	public String getStorestatus() {
		return this.storestatus;
	}

	public void setStorestatus(String storestatus) {
		this.storestatus = storestatus;
	}

}
