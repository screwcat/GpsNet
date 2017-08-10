package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.io.Serializable;

/**
 * BaseUserrole generated by hbm2java
 */
public class BaseUserrole implements java.io.Serializable {

	private String userroleId;
	private String userId;
	private String rolesId;
	private Serializable createdate;
	private String createuserid;
	private String createusername;

	public BaseUserrole() {
	}

	public BaseUserrole(String userroleId) {
		this.userroleId = userroleId;
	}

	public BaseUserrole(String userroleId, String userId, String rolesId, Serializable createdate, String createuserid,
			String createusername) {
		this.userroleId = userroleId;
		this.userId = userId;
		this.rolesId = rolesId;
		this.createdate = createdate;
		this.createuserid = createuserid;
		this.createusername = createusername;
	}

	public String getUserroleId() {
		return this.userroleId;
	}

	public void setUserroleId(String userroleId) {
		this.userroleId = userroleId;
	}

	public String getUserId() {
		return this.userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getRolesId() {
		return this.rolesId;
	}

	public void setRolesId(String rolesId) {
		this.rolesId = rolesId;
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
