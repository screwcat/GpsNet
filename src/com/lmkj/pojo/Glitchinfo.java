package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.math.BigDecimal;

/**
 * Glitchinfo generated by hbm2java
 */
public class Glitchinfo implements java.io.Serializable {

	private BigDecimal id;
	private String applicable;
	private String faultcode;
	private String chinesedef;
	private String englishdef;
	private String category;
	private String knowledge;

	public Glitchinfo() {
	}

	public Glitchinfo(BigDecimal id) {
		this.id = id;
	}

	public Glitchinfo(BigDecimal id, String applicable, String faultcode, String chinesedef, String englishdef,
			String category, String knowledge) {
		this.id = id;
		this.applicable = applicable;
		this.faultcode = faultcode;
		this.chinesedef = chinesedef;
		this.englishdef = englishdef;
		this.category = category;
		this.knowledge = knowledge;
	}

	public BigDecimal getId() {
		return this.id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

	public String getApplicable() {
		return this.applicable;
	}

	public void setApplicable(String applicable) {
		this.applicable = applicable;
	}

	public String getFaultcode() {
		return this.faultcode;
	}

	public void setFaultcode(String faultcode) {
		this.faultcode = faultcode;
	}

	public String getChinesedef() {
		return this.chinesedef;
	}

	public void setChinesedef(String chinesedef) {
		this.chinesedef = chinesedef;
	}

	public String getEnglishdef() {
		return this.englishdef;
	}

	public void setEnglishdef(String englishdef) {
		this.englishdef = englishdef;
	}

	public String getCategory() {
		return this.category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getKnowledge() {
		return this.knowledge;
	}

	public void setKnowledge(String knowledge) {
		this.knowledge = knowledge;
	}

}
