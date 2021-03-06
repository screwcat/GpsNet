package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.math.BigDecimal;
import java.util.Date;

/**
 * Vehicleinfo generated by hbm2java
 */
public class Vehicleinfo implements java.io.Serializable {

	private BigDecimal id;
	private String vehicleid;
	private String plateno;
	private BigDecimal commandid;
	private String orderid;
	private Date sendtime;
	private Double longitude;
	private Double latitude;
	private Double velocity;
	private BigDecimal direction;
	private BigDecimal flow;
	private BigDecimal flowtype;
	private String status;
	private String fn;
	private Double mileage;
	private Double recordvelocity;
	private String location;
	private Double oil;
	private String alarmstate;
	private String imei;
	private BigDecimal meterstatus;
	private Double calcmileage;
	private BigDecimal locationheight;
	private BigDecimal satellitenum;

	public Vehicleinfo() {
	}

	public Vehicleinfo(BigDecimal id) {
		this.id = id;
	}

	public Vehicleinfo(BigDecimal id, String vehicleid, String plateno, BigDecimal commandid, String orderid,
			Date sendtime, Double longitude, Double latitude, Double velocity, BigDecimal direction, BigDecimal flow,
			BigDecimal flowtype, String status, String fn, Double mileage, Double recordvelocity, String location,
			Double oil, String alarmstate, String imei, BigDecimal meterstatus, Double calcmileage,
			BigDecimal locationheight, BigDecimal satellitenum) {
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
		this.flow = flow;
		this.flowtype = flowtype;
		this.status = status;
		this.fn = fn;
		this.mileage = mileage;
		this.recordvelocity = recordvelocity;
		this.location = location;
		this.oil = oil;
		this.alarmstate = alarmstate;
		this.imei = imei;
		this.meterstatus = meterstatus;
		this.calcmileage = calcmileage;
		this.locationheight = locationheight;
		this.satellitenum = satellitenum;
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

	public Date getSendtime() {
		return this.sendtime;
	}

	public void setSendtime(Date sendtime) {
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

	public BigDecimal getFlow() {
		return this.flow;
	}

	public void setFlow(BigDecimal flow) {
		this.flow = flow;
	}

	public BigDecimal getFlowtype() {
		return this.flowtype;
	}

	public void setFlowtype(BigDecimal flowtype) {
		this.flowtype = flowtype;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getFn() {
		return this.fn;
	}

	public void setFn(String fn) {
		this.fn = fn;
	}

	public Double getMileage() {
		return this.mileage;
	}

	public void setMileage(Double mileage) {
		this.mileage = mileage;
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

	public Double getOil() {
		return this.oil;
	}

	public void setOil(Double oil) {
		this.oil = oil;
	}

	public String getAlarmstate() {
		return this.alarmstate;
	}

	public void setAlarmstate(String alarmstate) {
		this.alarmstate = alarmstate;
	}

	public String getImei() {
		return this.imei;
	}

	public void setImei(String imei) {
		this.imei = imei;
	}

	public BigDecimal getMeterstatus() {
		return this.meterstatus;
	}

	public void setMeterstatus(BigDecimal meterstatus) {
		this.meterstatus = meterstatus;
	}

	public Double getCalcmileage() {
		return this.calcmileage;
	}

	public void setCalcmileage(Double calcmileage) {
		this.calcmileage = calcmileage;
	}

	public BigDecimal getLocationheight() {
		return this.locationheight;
	}

	public void setLocationheight(BigDecimal locationheight) {
		this.locationheight = locationheight;
	}

	public BigDecimal getSatellitenum() {
		return this.satellitenum;
	}

	public void setSatellitenum(BigDecimal satellitenum) {
		this.satellitenum = satellitenum;
	}

}
