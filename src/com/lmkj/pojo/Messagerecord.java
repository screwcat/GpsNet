package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Messagerecord generated by hbm2java
 */
public class Messagerecord implements java.io.Serializable {

	private BigDecimal id;
	private String receiver;
	private String sender;
	private String message;
	private String targettype;
	private String messagetype;
	private String handlers;
	private Serializable senddate;

	public Messagerecord() {
	}

	public Messagerecord(BigDecimal id, String receiver, String sender, String message, String targettype,
			String messagetype, String handlers, Serializable senddate) {
		this.id = id;
		this.receiver = receiver;
		this.sender = sender;
		this.message = message;
		this.targettype = targettype;
		this.messagetype = messagetype;
		this.handlers = handlers;
		this.senddate = senddate;
	}

	public BigDecimal getId() {
		return this.id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

	public String getReceiver() {
		return this.receiver;
	}

	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}

	public String getSender() {
		return this.sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getTargettype() {
		return this.targettype;
	}

	public void setTargettype(String targettype) {
		this.targettype = targettype;
	}

	public String getMessagetype() {
		return this.messagetype;
	}

	public void setMessagetype(String messagetype) {
		this.messagetype = messagetype;
	}

	public String getHandlers() {
		return this.handlers;
	}

	public void setHandlers(String handlers) {
		this.handlers = handlers;
	}

	public Serializable getSenddate() {
		return this.senddate;
	}

	public void setSenddate(Serializable senddate) {
		this.senddate = senddate;
	}

}
