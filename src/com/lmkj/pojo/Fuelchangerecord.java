package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Fuelchangerecord generated by hbm2java
 */
public class Fuelchangerecord implements java.io.Serializable {

	private BigDecimal id;
	private String plateno;
	private Double fuel;
	private String type;
	private Serializable happentime;
	private Serializable createdate;
	private Boolean deleted;
	private String manual;
	private String location;
	private Double latitude;
	private Double longitude;
	private Double mileage;
	private String owner;

	public Fuelchangerecord() {
	}

	public Fuelchangerecord(BigDecimal id) {
		this.id = id;
	}

	public Fuelchangerecord(BigDecimal id, String plateno, Double fuel, String type, Serializable happentime,
			Serializable createdate, Boolean deleted, String manual, String location, Double latitude, Double longitude,
			Double mileage, String owner) {
		this.id = id;
		this.plateno = plateno;
		this.fuel = fuel;
		this.type = type;
		this.happentime = happentime;
		this.createdate = createdate;
		this.deleted = deleted;
		this.manual = manual;
		this.location = location;
		this.latitude = latitude;
		this.longitude = longitude;
		this.mileage = mileage;
		this.owner = owner;
	}

	public BigDecimal getId() {
		return this.id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

	public String getPlateno() {
		return this.plateno;
	}

	public void setPlateno(String plateno) {
		this.plateno = plateno;
	}

	public Double getFuel() {
		return this.fuel;
	}

	public void setFuel(Double fuel) {
		this.fuel = fuel;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Serializable getHappentime() {
		return this.happentime;
	}

	public void setHappentime(Serializable happentime) {
		this.happentime = happentime;
	}

	public Serializable getCreatedate() {
		return this.createdate;
	}

	public void setCreatedate(Serializable createdate) {
		this.createdate = createdate;
	}

	public Boolean getDeleted() {
		return this.deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public String getManual() {
		return this.manual;
	}

	public void setManual(String manual) {
		this.manual = manual;
	}

	public String getLocation() {
		return this.location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Double getLatitude() {
		return this.latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return this.longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public Double getMileage() {
		return this.mileage;
	}

	public void setMileage(Double mileage) {
		this.mileage = mileage;
	}

	public String getOwner() {
		return this.owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

}
