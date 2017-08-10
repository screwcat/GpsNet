package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Traffic generated by hbm2java
 */
public class Traffic implements java.io.Serializable {

	private BigDecimal id;
	private BigDecimal vid;
	private Serializable createtime;
	private String plateno;
	private String devid;
	private String simno;
	private String staticDate;
	private Serializable beginTime;
	private Serializable endTime;
	private Double maveo;
	private Double distance;
	private Double SOil;
	private String beginAddr;
	private String endAddr;
	private Double beginOil;
	private Double endOil;
	private Double beginDis;
	private Double endDis;

	public Traffic() {
	}

	public Traffic(BigDecimal id) {
		this.id = id;
	}

	public Traffic(BigDecimal id, BigDecimal vid, Serializable createtime, String plateno, String devid, String simno,
			String staticDate, Serializable beginTime, Serializable endTime, Double maveo, Double distance, Double SOil,
			String beginAddr, String endAddr, Double beginOil, Double endOil, Double beginDis, Double endDis) {
		this.id = id;
		this.vid = vid;
		this.createtime = createtime;
		this.plateno = plateno;
		this.devid = devid;
		this.simno = simno;
		this.staticDate = staticDate;
		this.beginTime = beginTime;
		this.endTime = endTime;
		this.maveo = maveo;
		this.distance = distance;
		this.SOil = SOil;
		this.beginAddr = beginAddr;
		this.endAddr = endAddr;
		this.beginOil = beginOil;
		this.endOil = endOil;
		this.beginDis = beginDis;
		this.endDis = endDis;
	}

	public BigDecimal getId() {
		return this.id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

	public BigDecimal getVid() {
		return this.vid;
	}

	public void setVid(BigDecimal vid) {
		this.vid = vid;
	}

	public Serializable getCreatetime() {
		return this.createtime;
	}

	public void setCreatetime(Serializable createtime) {
		this.createtime = createtime;
	}

	public String getPlateno() {
		return this.plateno;
	}

	public void setPlateno(String plateno) {
		this.plateno = plateno;
	}

	public String getDevid() {
		return this.devid;
	}

	public void setDevid(String devid) {
		this.devid = devid;
	}

	public String getSimno() {
		return this.simno;
	}

	public void setSimno(String simno) {
		this.simno = simno;
	}

	public String getStaticDate() {
		return this.staticDate;
	}

	public void setStaticDate(String staticDate) {
		this.staticDate = staticDate;
	}

	public Serializable getBeginTime() {
		return this.beginTime;
	}

	public void setBeginTime(Serializable beginTime) {
		this.beginTime = beginTime;
	}

	public Serializable getEndTime() {
		return this.endTime;
	}

	public void setEndTime(Serializable endTime) {
		this.endTime = endTime;
	}

	public Double getMaveo() {
		return this.maveo;
	}

	public void setMaveo(Double maveo) {
		this.maveo = maveo;
	}

	public Double getDistance() {
		return this.distance;
	}

	public void setDistance(Double distance) {
		this.distance = distance;
	}

	public Double getSOil() {
		return this.SOil;
	}

	public void setSOil(Double SOil) {
		this.SOil = SOil;
	}

	public String getBeginAddr() {
		return this.beginAddr;
	}

	public void setBeginAddr(String beginAddr) {
		this.beginAddr = beginAddr;
	}

	public String getEndAddr() {
		return this.endAddr;
	}

	public void setEndAddr(String endAddr) {
		this.endAddr = endAddr;
	}

	public Double getBeginOil() {
		return this.beginOil;
	}

	public void setBeginOil(Double beginOil) {
		this.beginOil = beginOil;
	}

	public Double getEndOil() {
		return this.endOil;
	}

	public void setEndOil(Double endOil) {
		this.endOil = endOil;
	}

	public Double getBeginDis() {
		return this.beginDis;
	}

	public void setBeginDis(Double beginDis) {
		this.beginDis = beginDis;
	}

	public Double getEndDis() {
		return this.endDis;
	}

	public void setEndDis(Double endDis) {
		this.endDis = endDis;
	}

}
