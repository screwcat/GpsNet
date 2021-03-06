package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Linesegment generated by hbm2java
 */
public class Linesegment implements java.io.Serializable {

	private BigDecimal segid;
	private String name;
	private BigDecimal enclosureid;
	private BigDecimal pointid;
	private Double latitude1;
	private Double longitude1;
	private Double latitude2;
	private Double longitude2;
	private BigDecimal linewidth;
	private Boolean isstation;
	private Boolean limitspeed;
	private Boolean bytime;
	private BigDecimal maxspeed;
	private BigDecimal overspeedtime;
	private BigDecimal maxtimelimit;
	private BigDecimal mintimelimit;
	private String alarmtype;
	private Serializable createdate;
	private Boolean deleted;

	public Linesegment() {
	}

	public Linesegment(BigDecimal segid) {
		this.segid = segid;
	}

	public Linesegment(BigDecimal segid, String name, BigDecimal enclosureid, BigDecimal pointid, Double latitude1,
			Double longitude1, Double latitude2, Double longitude2, BigDecimal linewidth, Boolean isstation,
			Boolean limitspeed, Boolean bytime, BigDecimal maxspeed, BigDecimal overspeedtime, BigDecimal maxtimelimit,
			BigDecimal mintimelimit, String alarmtype, Serializable createdate, Boolean deleted) {
		this.segid = segid;
		this.name = name;
		this.enclosureid = enclosureid;
		this.pointid = pointid;
		this.latitude1 = latitude1;
		this.longitude1 = longitude1;
		this.latitude2 = latitude2;
		this.longitude2 = longitude2;
		this.linewidth = linewidth;
		this.isstation = isstation;
		this.limitspeed = limitspeed;
		this.bytime = bytime;
		this.maxspeed = maxspeed;
		this.overspeedtime = overspeedtime;
		this.maxtimelimit = maxtimelimit;
		this.mintimelimit = mintimelimit;
		this.alarmtype = alarmtype;
		this.createdate = createdate;
		this.deleted = deleted;
	}

	public BigDecimal getSegid() {
		return this.segid;
	}

	public void setSegid(BigDecimal segid) {
		this.segid = segid;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BigDecimal getEnclosureid() {
		return this.enclosureid;
	}

	public void setEnclosureid(BigDecimal enclosureid) {
		this.enclosureid = enclosureid;
	}

	public BigDecimal getPointid() {
		return this.pointid;
	}

	public void setPointid(BigDecimal pointid) {
		this.pointid = pointid;
	}

	public Double getLatitude1() {
		return this.latitude1;
	}

	public void setLatitude1(Double latitude1) {
		this.latitude1 = latitude1;
	}

	public Double getLongitude1() {
		return this.longitude1;
	}

	public void setLongitude1(Double longitude1) {
		this.longitude1 = longitude1;
	}

	public Double getLatitude2() {
		return this.latitude2;
	}

	public void setLatitude2(Double latitude2) {
		this.latitude2 = latitude2;
	}

	public Double getLongitude2() {
		return this.longitude2;
	}

	public void setLongitude2(Double longitude2) {
		this.longitude2 = longitude2;
	}

	public BigDecimal getLinewidth() {
		return this.linewidth;
	}

	public void setLinewidth(BigDecimal linewidth) {
		this.linewidth = linewidth;
	}

	public Boolean getIsstation() {
		return this.isstation;
	}

	public void setIsstation(Boolean isstation) {
		this.isstation = isstation;
	}

	public Boolean getLimitspeed() {
		return this.limitspeed;
	}

	public void setLimitspeed(Boolean limitspeed) {
		this.limitspeed = limitspeed;
	}

	public Boolean getBytime() {
		return this.bytime;
	}

	public void setBytime(Boolean bytime) {
		this.bytime = bytime;
	}

	public BigDecimal getMaxspeed() {
		return this.maxspeed;
	}

	public void setMaxspeed(BigDecimal maxspeed) {
		this.maxspeed = maxspeed;
	}

	public BigDecimal getOverspeedtime() {
		return this.overspeedtime;
	}

	public void setOverspeedtime(BigDecimal overspeedtime) {
		this.overspeedtime = overspeedtime;
	}

	public BigDecimal getMaxtimelimit() {
		return this.maxtimelimit;
	}

	public void setMaxtimelimit(BigDecimal maxtimelimit) {
		this.maxtimelimit = maxtimelimit;
	}

	public BigDecimal getMintimelimit() {
		return this.mintimelimit;
	}

	public void setMintimelimit(BigDecimal mintimelimit) {
		this.mintimelimit = mintimelimit;
	}

	public String getAlarmtype() {
		return this.alarmtype;
	}

	public void setAlarmtype(String alarmtype) {
		this.alarmtype = alarmtype;
	}

	public Serializable getCreatedate() {
		return this.createdate;
	}

	public void setCreatedate(Serializable createdate) {
		this.createdate = createdate;
	}

	public Boolean getDeleted() {
		return this.deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

}
