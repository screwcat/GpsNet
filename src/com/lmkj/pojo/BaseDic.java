package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.math.BigDecimal;

/**
 * BaseDic generated by hbm2java
 */
public class BaseDic implements java.io.Serializable {

	private BigDecimal baseid;
	private String basename;
	private String baseicon;
	private BigDecimal parentid;
	private BigDecimal ischild;
	private BigDecimal basevalue;
	private String desc;
	private String enbasename;
	private BigDecimal showorder;

	public BaseDic() {
	}

	public BaseDic(BigDecimal baseid, String basename, BigDecimal parentid) {
		this.baseid = baseid;
		this.basename = basename;
		this.parentid = parentid;
	}

	public BaseDic(BigDecimal baseid, String basename, String baseicon, BigDecimal parentid, BigDecimal ischild,
			BigDecimal basevalue, String desc, String enbasename, BigDecimal showorder) {
		this.baseid = baseid;
		this.basename = basename;
		this.baseicon = baseicon;
		this.parentid = parentid;
		this.ischild = ischild;
		this.basevalue = basevalue;
		this.desc = desc;
		this.enbasename = enbasename;
		this.showorder = showorder;
	}

	public BigDecimal getBaseid() {
		return this.baseid;
	}

	public void setBaseid(BigDecimal baseid) {
		this.baseid = baseid;
	}

	public String getBasename() {
		return this.basename;
	}

	public void setBasename(String basename) {
		this.basename = basename;
	}

	public String getBaseicon() {
		return this.baseicon;
	}

	public void setBaseicon(String baseicon) {
		this.baseicon = baseicon;
	}

	public BigDecimal getParentid() {
		return this.parentid;
	}

	public void setParentid(BigDecimal parentid) {
		this.parentid = parentid;
	}

	public BigDecimal getIschild() {
		return this.ischild;
	}

	public void setIschild(BigDecimal ischild) {
		this.ischild = ischild;
	}

	public BigDecimal getBasevalue() {
		return this.basevalue;
	}

	public void setBasevalue(BigDecimal basevalue) {
		this.basevalue = basevalue;
	}

	public String getDesc() {
		return this.desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getEnbasename() {
		return this.enbasename;
	}

	public void setEnbasename(String enbasename) {
		this.enbasename = enbasename;
	}

	public BigDecimal getShoworder() {
		return this.showorder;
	}

	public void setShoworder(BigDecimal showorder) {
		this.showorder = showorder;
	}

}
