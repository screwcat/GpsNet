package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.io.Serializable;

/**
 * BaseUsergroupright generated by hbm2java
 */
public class BaseUsergroupright implements java.io.Serializable {

	private String usergrouprightId;
	private String usergroupId;
	private String menuId;
	private Serializable createdate;
	private String createuserid;
	private String createusername;

	public BaseUsergroupright() {
	}

	public BaseUsergroupright(String usergrouprightId) {
		this.usergrouprightId = usergrouprightId;
	}

	public BaseUsergroupright(String usergrouprightId, String usergroupId, String menuId, Serializable createdate,
			String createuserid, String createusername) {
		this.usergrouprightId = usergrouprightId;
		this.usergroupId = usergroupId;
		this.menuId = menuId;
		this.createdate = createdate;
		this.createuserid = createuserid;
		this.createusername = createusername;
	}

	public String getUsergrouprightId() {
		return this.usergrouprightId;
	}

	public void setUsergrouprightId(String usergrouprightId) {
		this.usergrouprightId = usergrouprightId;
	}

	public String getUsergroupId() {
		return this.usergroupId;
	}

	public void setUsergroupId(String usergroupId) {
		this.usergroupId = usergroupId;
	}

	public String getMenuId() {
		return this.menuId;
	}

	public void setMenuId(String menuId) {
		this.menuId = menuId;
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

}
