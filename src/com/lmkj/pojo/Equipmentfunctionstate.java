package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.math.BigDecimal;

/**
 * Equipmentfunctionstate generated by hbm2java
 */
public class Equipmentfunctionstate implements java.io.Serializable {

	private BigDecimal id;
	private String imei;
	private String functionname;
	private BigDecimal state;

	public Equipmentfunctionstate() {
	}

	public Equipmentfunctionstate(BigDecimal id) {
		this.id = id;
	}

	public Equipmentfunctionstate(BigDecimal id, String imei, String functionname, BigDecimal state) {
		this.id = id;
		this.imei = imei;
		this.functionname = functionname;
		this.state = state;
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

	public String getFunctionname() {
		return this.functionname;
	}

	public void setFunctionname(String functionname) {
		this.functionname = functionname;
	}

	public BigDecimal getState() {
		return this.state;
	}

	public void setState(BigDecimal state) {
		this.state = state;
	}

}
