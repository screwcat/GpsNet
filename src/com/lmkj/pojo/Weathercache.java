package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Weathercache generated by hbm2java
 */
public class Weathercache implements java.io.Serializable {

	private BigDecimal wid;
	private String jsonweather;
	private String wdate;
	private String citycode;
	private Serializable adate;

	public Weathercache() {
	}

	public Weathercache(BigDecimal wid) {
		this.wid = wid;
	}

	public Weathercache(BigDecimal wid, String jsonweather, String wdate, String citycode, Serializable adate) {
		this.wid = wid;
		this.jsonweather = jsonweather;
		this.wdate = wdate;
		this.citycode = citycode;
		this.adate = adate;
	}

	public BigDecimal getWid() {
		return this.wid;
	}

	public void setWid(BigDecimal wid) {
		this.wid = wid;
	}

	public String getJsonweather() {
		return this.jsonweather;
	}

	public void setJsonweather(String jsonweather) {
		this.jsonweather = jsonweather;
	}

	public String getWdate() {
		return this.wdate;
	}

	public void setWdate(String wdate) {
		this.wdate = wdate;
	}

	public String getCitycode() {
		return this.citycode;
	}

	public void setCitycode(String citycode) {
		this.citycode = citycode;
	}

	public Serializable getAdate() {
		return this.adate;
	}

	public void setAdate(Serializable adate) {
		this.adate = adate;
	}

}
