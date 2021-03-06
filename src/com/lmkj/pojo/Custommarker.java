package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Custommarker generated by hbm2java
 */
public class Custommarker implements java.io.Serializable {

	private BigDecimal markerid;
	private String name;
	private String code;
	private String owner;
	private String phone;
	private String mobile;
	private String layer;
	private BigDecimal depid;
	private String office;
	private Double longitude;
	private Double latitude;
	private Boolean deleted;
	private Serializable createdate;
	private BigDecimal tenantid;
	private Boolean isenclosure;
	private BigDecimal scope;
	private String remark;
	private Boolean fixed;

	public Custommarker() {
	}

	public Custommarker(BigDecimal markerid) {
		this.markerid = markerid;
	}

	public Custommarker(BigDecimal markerid, String name, String code, String owner, String phone, String mobile,
			String layer, BigDecimal depid, String office, Double longitude, Double latitude, Boolean deleted,
			Serializable createdate, BigDecimal tenantid, Boolean isenclosure, BigDecimal scope, String remark,
			Boolean fixed) {
		this.markerid = markerid;
		this.name = name;
		this.code = code;
		this.owner = owner;
		this.phone = phone;
		this.mobile = mobile;
		this.layer = layer;
		this.depid = depid;
		this.office = office;
		this.longitude = longitude;
		this.latitude = latitude;
		this.deleted = deleted;
		this.createdate = createdate;
		this.tenantid = tenantid;
		this.isenclosure = isenclosure;
		this.scope = scope;
		this.remark = remark;
		this.fixed = fixed;
	}

	public BigDecimal getMarkerid() {
		return this.markerid;
	}

	public void setMarkerid(BigDecimal markerid) {
		this.markerid = markerid;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getOwner() {
		return this.owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getMobile() {
		return this.mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getLayer() {
		return this.layer;
	}

	public void setLayer(String layer) {
		this.layer = layer;
	}

	public BigDecimal getDepid() {
		return this.depid;
	}

	public void setDepid(BigDecimal depid) {
		this.depid = depid;
	}

	public String getOffice() {
		return this.office;
	}

	public void setOffice(String office) {
		this.office = office;
	}

	public Double getLongitude() {
		return this.longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public Double getLatitude() {
		return this.latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Boolean getDeleted() {
		return this.deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public Serializable getCreatedate() {
		return this.createdate;
	}

	public void setCreatedate(Serializable createdate) {
		this.createdate = createdate;
	}

	public BigDecimal getTenantid() {
		return this.tenantid;
	}

	public void setTenantid(BigDecimal tenantid) {
		this.tenantid = tenantid;
	}

	public Boolean getIsenclosure() {
		return this.isenclosure;
	}

	public void setIsenclosure(Boolean isenclosure) {
		this.isenclosure = isenclosure;
	}

	public BigDecimal getScope() {
		return this.scope;
	}

	public void setScope(BigDecimal scope) {
		this.scope = scope;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Boolean getFixed() {
		return this.fixed;
	}

	public void setFixed(Boolean fixed) {
		this.fixed = fixed;
	}

}
