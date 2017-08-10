package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * BaseSysloginlog generated by hbm2java
 */
public class BaseSysloginlog implements java.io.Serializable {

	private String sysLoginlogId;
	private String sysLoginlogIp;
	private Serializable sysLoginlogTime;
	private String userAccount;
	private BigDecimal sysLoginlogStatus;
	private String ownerAddress;

	public BaseSysloginlog() {
	}

	public BaseSysloginlog(String sysLoginlogId) {
		this.sysLoginlogId = sysLoginlogId;
	}

	public BaseSysloginlog(String sysLoginlogId, String sysLoginlogIp, Serializable sysLoginlogTime, String userAccount,
			BigDecimal sysLoginlogStatus, String ownerAddress) {
		this.sysLoginlogId = sysLoginlogId;
		this.sysLoginlogIp = sysLoginlogIp;
		this.sysLoginlogTime = sysLoginlogTime;
		this.userAccount = userAccount;
		this.sysLoginlogStatus = sysLoginlogStatus;
		this.ownerAddress = ownerAddress;
	}

	public String getSysLoginlogId() {
		return this.sysLoginlogId;
	}

	public void setSysLoginlogId(String sysLoginlogId) {
		this.sysLoginlogId = sysLoginlogId;
	}

	public String getSysLoginlogIp() {
		return this.sysLoginlogIp;
	}

	public void setSysLoginlogIp(String sysLoginlogIp) {
		this.sysLoginlogIp = sysLoginlogIp;
	}

	public Serializable getSysLoginlogTime() {
		return this.sysLoginlogTime;
	}

	public void setSysLoginlogTime(Serializable sysLoginlogTime) {
		this.sysLoginlogTime = sysLoginlogTime;
	}

	public String getUserAccount() {
		return this.userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public BigDecimal getSysLoginlogStatus() {
		return this.sysLoginlogStatus;
	}

	public void setSysLoginlogStatus(BigDecimal sysLoginlogStatus) {
		this.sysLoginlogStatus = sysLoginlogStatus;
	}

	public String getOwnerAddress() {
		return this.ownerAddress;
	}

	public void setOwnerAddress(String ownerAddress) {
		this.ownerAddress = ownerAddress;
	}

}
