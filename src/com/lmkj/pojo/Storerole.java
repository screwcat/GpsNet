package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Storerole generated by hbm2java
 */
public class Storerole implements java.io.Serializable {

	private BigDecimal id;
	private String storename;
	private String name;
	private String phone;
	private String address;
	private Serializable addtime;
	private String password;
	private String status;

	public Storerole() {
	}

	public Storerole(BigDecimal id, String phone, String password, String status) {
		this.id = id;
		this.phone = phone;
		this.password = password;
		this.status = status;
	}

	public Storerole(BigDecimal id, String storename, String name, String phone, String address, Serializable addtime,
			String password, String status) {
		this.id = id;
		this.storename = storename;
		this.name = name;
		this.phone = phone;
		this.address = address;
		this.addtime = addtime;
		this.password = password;
		this.status = status;
	}

	public BigDecimal getId() {
		return this.id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

	public String getStorename() {
		return this.storename;
	}

	public void setStorename(String storename) {
		this.storename = storename;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Serializable getAddtime() {
		return this.addtime;
	}

	public void setAddtime(Serializable addtime) {
		this.addtime = addtime;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
