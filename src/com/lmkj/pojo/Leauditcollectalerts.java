package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.math.BigDecimal;

/**
 * Leauditcollectalerts generated by hbm2java
 */
public class Leauditcollectalerts implements java.io.Serializable {

	private BigDecimal alertid;
	private BigDecimal databaseid;
	private BigDecimal notificationid;

	public Leauditcollectalerts() {
	}

	public Leauditcollectalerts(BigDecimal alertid) {
		this.alertid = alertid;
	}

	public Leauditcollectalerts(BigDecimal alertid, BigDecimal databaseid, BigDecimal notificationid) {
		this.alertid = alertid;
		this.databaseid = databaseid;
		this.notificationid = notificationid;
	}

	public BigDecimal getAlertid() {
		return this.alertid;
	}

	public void setAlertid(BigDecimal alertid) {
		this.alertid = alertid;
	}

	public BigDecimal getDatabaseid() {
		return this.databaseid;
	}

	public void setDatabaseid(BigDecimal databaseid) {
		this.databaseid = databaseid;
	}

	public BigDecimal getNotificationid() {
		return this.notificationid;
	}

	public void setNotificationid(BigDecimal notificationid) {
		this.notificationid = notificationid;
	}

}