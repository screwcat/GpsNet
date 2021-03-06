package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Fuelrecord generated by hbm2java
 */
public class Fuelrecord implements java.io.Serializable {

	private BigDecimal id;
	private String vehicleid;
	private String plateno;
	private BigDecimal commandid;
	private String orderid;
	private Serializable sendtime;
	private Double longitude;
	private Double latitude;
	private Double velocity;
	private BigDecimal direction;
	private String status;
	private Double mileage;
	private Double oil;
	private Double recordvelocity;
	private String location;

	public Fuelrecord() {
	}

	public Fuelrecord(BigDecimal id) {
		this.id = id;
	}

	public Fuelrecord(BigDecimal id, String vehicleid, String plateno, BigDecimal commandid, String orderid,
			Serializable sendtime, Double longitude, Double latitude, Double velocity, BigDecimal direction,
			String status, Double mileage, Double oil, Double recordvelocity, String location) {
		this.id = id;
		this.vehicleid = vehicleid;
		this.plateno = plateno;
		this.commandid = commandid;
		this.orderid = orderid;
		this.sendtime = sendtime;
		this.longitude = longitude;
		this.latitude = latitude;
		this.velocity = velocity;
		this.direction = direction;
		this.status = status;
		this.mileage = mileage;
		this.oil = oil;
		this.recordvelocity = recordvelocity;
		this.location = location;
	}

	public BigDecimal getId() {
		return this.id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

	public String getVehicleid() {
		return this.vehicleid;
	}

	public void setVehicleid(String vehicleid) {
		this.vehicleid = vehicleid;
	}

	public String getPlateno() {
		return this.plateno;
	}

	public void setPlateno(String plateno) {
		this.plateno = plateno;
	}

	public BigDecimal getCommandid() {
		return this.commandid;
	}

	public void setCommandid(BigDecimal commandid) {
		this.commandid = commandid;
	}

	public String getOrderid() {
		return this.orderid;
	}

	public void setOrderid(String orderid) {
		this.orderid = orderid;
	}

	public Serializable getSendtime() {
		return this.sendtime;
	}

	public void setSendtime(Serializable sendtime) {
		this.sendtime = sendtime;
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

	public Double getVelocity() {
		return this.velocity;
	}

	public void setVelocity(Double velocity) {
		this.velocity = velocity;
	}

	public BigDecimal getDirection() {
		return this.direction;
	}

	public void setDirection(BigDecimal direction) {
		this.direction = direction;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Double getMileage() {
		return this.mileage;
	}

	public void setMileage(Double mileage) {
		this.mileage = mileage;
	}

	public Double getOil() {
		return this.oil;
	}

	public void setOil(Double oil) {
		this.oil = oil;
	}

	public Double getRecordvelocity() {
		return this.recordvelocity;
	}

	public void setRecordvelocity(Double recordvelocity) {
		this.recordvelocity = recordvelocity;
	}

	public String getLocation() {
		return this.location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

}
