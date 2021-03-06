package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Clob;

/**
 * Illegallog generated by hbm2java
 */
public class Illegallog implements java.io.Serializable {

	private BigDecimal id;
	private Serializable logtime;
	private String url;
	private Clob jresult;

	public Illegallog() {
	}

	public Illegallog(BigDecimal id) {
		this.id = id;
	}

	public Illegallog(BigDecimal id, Serializable logtime, String url, Clob jresult) {
		this.id = id;
		this.logtime = logtime;
		this.url = url;
		this.jresult = jresult;
	}

	public BigDecimal getId() {
		return this.id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

	public Serializable getLogtime() {
		return this.logtime;
	}

	public void setLogtime(Serializable logtime) {
		this.logtime = logtime;
	}

	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Clob getJresult() {
		return this.jresult;
	}

	public void setJresult(Clob jresult) {
		this.jresult = jresult;
	}

}
