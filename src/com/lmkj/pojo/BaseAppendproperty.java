package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * BaseAppendproperty generated by hbm2java
 */
public class BaseAppendproperty implements java.io.Serializable {

	private String propertyId;
	private String propertyFunction;
	private String propertyFunctionurl;
	private String propertyControlId;
	private String propertyName;
	private BigDecimal propertyControlType;
	private String propertyControlDatasource;
	private String propertyControlLength;
	private BigDecimal propertyControlMaxlength;
	private String propertyControlStyle;
	private String propertyControlValidator;
	private BigDecimal propertyColspan;
	private String propertyEvent;
	private BigDecimal sortcode;
	private BigDecimal deletemark;
	private Serializable createdate;
	private String createuserid;
	private String createusername;
	private Serializable modifydate;
	private String modifyuserid;
	private String modifyusername;

	public BaseAppendproperty() {
	}

	public BaseAppendproperty(String propertyId) {
		this.propertyId = propertyId;
	}

	public BaseAppendproperty(String propertyId, String propertyFunction, String propertyFunctionurl,
			String propertyControlId, String propertyName, BigDecimal propertyControlType,
			String propertyControlDatasource, String propertyControlLength, BigDecimal propertyControlMaxlength,
			String propertyControlStyle, String propertyControlValidator, BigDecimal propertyColspan,
			String propertyEvent, BigDecimal sortcode, BigDecimal deletemark, Serializable createdate,
			String createuserid, String createusername, Serializable modifydate, String modifyuserid,
			String modifyusername) {
		this.propertyId = propertyId;
		this.propertyFunction = propertyFunction;
		this.propertyFunctionurl = propertyFunctionurl;
		this.propertyControlId = propertyControlId;
		this.propertyName = propertyName;
		this.propertyControlType = propertyControlType;
		this.propertyControlDatasource = propertyControlDatasource;
		this.propertyControlLength = propertyControlLength;
		this.propertyControlMaxlength = propertyControlMaxlength;
		this.propertyControlStyle = propertyControlStyle;
		this.propertyControlValidator = propertyControlValidator;
		this.propertyColspan = propertyColspan;
		this.propertyEvent = propertyEvent;
		this.sortcode = sortcode;
		this.deletemark = deletemark;
		this.createdate = createdate;
		this.createuserid = createuserid;
		this.createusername = createusername;
		this.modifydate = modifydate;
		this.modifyuserid = modifyuserid;
		this.modifyusername = modifyusername;
	}

	public String getPropertyId() {
		return this.propertyId;
	}

	public void setPropertyId(String propertyId) {
		this.propertyId = propertyId;
	}

	public String getPropertyFunction() {
		return this.propertyFunction;
	}

	public void setPropertyFunction(String propertyFunction) {
		this.propertyFunction = propertyFunction;
	}

	public String getPropertyFunctionurl() {
		return this.propertyFunctionurl;
	}

	public void setPropertyFunctionurl(String propertyFunctionurl) {
		this.propertyFunctionurl = propertyFunctionurl;
	}

	public String getPropertyControlId() {
		return this.propertyControlId;
	}

	public void setPropertyControlId(String propertyControlId) {
		this.propertyControlId = propertyControlId;
	}

	public String getPropertyName() {
		return this.propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}

	public BigDecimal getPropertyControlType() {
		return this.propertyControlType;
	}

	public void setPropertyControlType(BigDecimal propertyControlType) {
		this.propertyControlType = propertyControlType;
	}

	public String getPropertyControlDatasource() {
		return this.propertyControlDatasource;
	}

	public void setPropertyControlDatasource(String propertyControlDatasource) {
		this.propertyControlDatasource = propertyControlDatasource;
	}

	public String getPropertyControlLength() {
		return this.propertyControlLength;
	}

	public void setPropertyControlLength(String propertyControlLength) {
		this.propertyControlLength = propertyControlLength;
	}

	public BigDecimal getPropertyControlMaxlength() {
		return this.propertyControlMaxlength;
	}

	public void setPropertyControlMaxlength(BigDecimal propertyControlMaxlength) {
		this.propertyControlMaxlength = propertyControlMaxlength;
	}

	public String getPropertyControlStyle() {
		return this.propertyControlStyle;
	}

	public void setPropertyControlStyle(String propertyControlStyle) {
		this.propertyControlStyle = propertyControlStyle;
	}

	public String getPropertyControlValidator() {
		return this.propertyControlValidator;
	}

	public void setPropertyControlValidator(String propertyControlValidator) {
		this.propertyControlValidator = propertyControlValidator;
	}

	public BigDecimal getPropertyColspan() {
		return this.propertyColspan;
	}

	public void setPropertyColspan(BigDecimal propertyColspan) {
		this.propertyColspan = propertyColspan;
	}

	public String getPropertyEvent() {
		return this.propertyEvent;
	}

	public void setPropertyEvent(String propertyEvent) {
		this.propertyEvent = propertyEvent;
	}

	public BigDecimal getSortcode() {
		return this.sortcode;
	}

	public void setSortcode(BigDecimal sortcode) {
		this.sortcode = sortcode;
	}

	public BigDecimal getDeletemark() {
		return this.deletemark;
	}

	public void setDeletemark(BigDecimal deletemark) {
		this.deletemark = deletemark;
	}

	public Serializable getCreatedate() {
		return this.createdate;
	}

	public void setCreatedate(Serializable createdate) {
		this.createdate = createdate;
	}

	public String getCreateuserid() {
		return this.createuserid;
	}

	public void setCreateuserid(String createuserid) {
		this.createuserid = createuserid;
	}

	public String getCreateusername() {
		return this.createusername;
	}

	public void setCreateusername(String createusername) {
		this.createusername = createusername;
	}

	public Serializable getModifydate() {
		return this.modifydate;
	}

	public void setModifydate(Serializable modifydate) {
		this.modifydate = modifydate;
	}

	public String getModifyuserid() {
		return this.modifyuserid;
	}

	public void setModifyuserid(String modifyuserid) {
		this.modifyuserid = modifyuserid;
	}

	public String getModifyusername() {
		return this.modifyusername;
	}

	public void setModifyusername(String modifyusername) {
		this.modifyusername = modifyusername;
	}

}
