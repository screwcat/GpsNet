package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

/**
 * Platform generated by hbm2java
 */
public class Platform implements java.io.Serializable {

	private String platformid;
	private String imei;
	private String hxhbyimei;
	private String hxhbyplateno;

	public Platform() {
	}

	public Platform(String platformid, String imei, String hxhbyimei) {
		this.platformid = platformid;
		this.imei = imei;
		this.hxhbyimei = hxhbyimei;
	}

	public Platform(String platformid, String imei, String hxhbyimei, String hxhbyplateno) {
		this.platformid = platformid;
		this.imei = imei;
		this.hxhbyimei = hxhbyimei;
		this.hxhbyplateno = hxhbyplateno;
	}

	public String getPlatformid() {
		return this.platformid;
	}

	public void setPlatformid(String platformid) {
		this.platformid = platformid;
	}

	public String getImei() {
		return this.imei;
	}

	public void setImei(String imei) {
		this.imei = imei;
	}

	public String getHxhbyimei() {
		return this.hxhbyimei;
	}

	public void setHxhbyimei(String hxhbyimei) {
		this.hxhbyimei = hxhbyimei;
	}

	public String getHxhbyplateno() {
		return this.hxhbyplateno;
	}

	public void setHxhbyplateno(String hxhbyplateno) {
		this.hxhbyplateno = hxhbyplateno;
	}

}
