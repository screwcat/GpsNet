package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.math.BigDecimal;

/**
 * Linebufferpoint generated by hbm2java
 */
public class Linebufferpoint implements java.io.Serializable {

	private BigDecimal ptid;
	private BigDecimal enclosureid;
	private Double latitude;
	private Double longitude;

	public Linebufferpoint() {
	}

	public Linebufferpoint(BigDecimal ptid) {
		this.ptid = ptid;
	}

	public Linebufferpoint(BigDecimal ptid, BigDecimal enclosureid, Double latitude, Double longitude) {
		this.ptid = ptid;
		this.enclosureid = enclosureid;
		this.latitude = latitude;
		this.longitude = longitude;
	}

	public BigDecimal getPtid() {
		return this.ptid;
	}

	public void setPtid(BigDecimal ptid) {
		this.ptid = ptid;
	}

	public BigDecimal getEnclosureid() {
		return this.enclosureid;
	}

	public void setEnclosureid(BigDecimal enclosureid) {
		this.enclosureid = enclosureid;
	}

	public Double getLatitude() {
		return this.latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return this.longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

}
