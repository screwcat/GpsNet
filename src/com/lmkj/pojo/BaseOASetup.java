package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.math.BigDecimal;

/**
 * BaseOASetup generated by hbm2java
 */
public class BaseOASetup implements java.io.Serializable {

	private String setupId;
	private String userId;
	private String setupIname;
	private String navigateurl;
	private String target;
	private String setupImg;
	private String setupRemak;
	private BigDecimal sortcode;

	public BaseOASetup() {
	}

	public BaseOASetup(String setupId) {
		this.setupId = setupId;
	}

	public BaseOASetup(String setupId, String userId, String setupIname, String navigateurl, String target,
			String setupImg, String setupRemak, BigDecimal sortcode) {
		this.setupId = setupId;
		this.userId = userId;
		this.setupIname = setupIname;
		this.navigateurl = navigateurl;
		this.target = target;
		this.setupImg = setupImg;
		this.setupRemak = setupRemak;
		this.sortcode = sortcode;
	}

	public String getSetupId() {
		return this.setupId;
	}

	public void setSetupId(String setupId) {
		this.setupId = setupId;
	}

	public String getUserId() {
		return this.userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getSetupIname() {
		return this.setupIname;
	}

	public void setSetupIname(String setupIname) {
		this.setupIname = setupIname;
	}

	public String getNavigateurl() {
		return this.navigateurl;
	}

	public void setNavigateurl(String navigateurl) {
		this.navigateurl = navigateurl;
	}

	public String getTarget() {
		return this.target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public String getSetupImg() {
		return this.setupImg;
	}

	public void setSetupImg(String setupImg) {
		this.setupImg = setupImg;
	}

	public String getSetupRemak() {
		return this.setupRemak;
	}

	public void setSetupRemak(String setupRemak) {
		this.setupRemak = setupRemak;
	}

	public BigDecimal getSortcode() {
		return this.sortcode;
	}

	public void setSortcode(BigDecimal sortcode) {
		this.sortcode = sortcode;
	}

}
