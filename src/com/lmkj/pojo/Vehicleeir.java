package com.lmkj.pojo;
// Generated 2016-9-28 9:15:49 by Hibernate Tools 4.0.1.Final

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Vehicleeir generated by hbm2java
 */
public class Vehicleeir implements java.io.Serializable {

	private BigDecimal vid;
	private BigDecimal billid;
	private BigDecimal oodrivinglicense;
	private BigDecimal iodrivinglicense;
	private BigDecimal olicensetag;
	private BigDecimal ilicensetag;
	private BigDecimal omrcercertify;
	private BigDecimal imrcercertify;
	private BigDecimal oinscard;
	private BigDecimal iinscard;
	private BigDecimal oinstructions;
	private BigDecimal iinstructions;
	private BigDecimal osewagepermit;
	private BigDecimal isewagepermit;
	private BigDecimal oleftbiglight;
	private BigDecimal ileftbiglight;
	private BigDecimal orightbiglight;
	private BigDecimal irightbiglight;
	private BigDecimal oleftsmalllight;
	private BigDecimal orightsamlllight;
	private BigDecimal irightsmalllight;
	private BigDecimal oleftturnlight;
	private BigDecimal ileftturnlight;
	private BigDecimal orightturnlight;
	private BigDecimal irightturnlight;
	private BigDecimal oleftmirror;
	private BigDecimal ileftmirror;
	private BigDecimal orightmirror;
	private BigDecimal irightmirror;
	private BigDecimal oleftaturnlight;
	private BigDecimal ileftaturnlight;
	private BigDecimal orightaturnlight;
	private BigDecimal irightaturnlight;
	private BigDecimal oleftbrakelights;
	private BigDecimal ileftbrakelights;
	private BigDecimal orightbrakelights;
	private BigDecimal irightbrakelights;
	private BigDecimal oplatelight;
	private BigDecimal iplatelight;
	private BigDecimal osidelights;
	private BigDecimal isidelights;
	private BigDecimal oantifog;
	private BigDecimal iantifog;
	private BigDecimal odashboard;
	private BigDecimal idashboard;
	private BigDecimal owiper;
	private BigDecimal iwiper;
	private BigDecimal obumper;
	private BigDecimal ibumper;
	private BigDecimal oseatcover;
	private BigDecimal iseatcover;
	private BigDecimal ocigarettelighter;
	private BigDecimal icigarettelighter;
	private BigDecimal ochassis;
	private BigDecimal ichassis;
	private BigDecimal oantenna;
	private BigDecimal iantenna;
	private BigDecimal ocassetteplayers;
	private BigDecimal icassetteplayers;
	private BigDecimal oottomans;
	private BigDecimal iottomans;
	private BigDecimal oashtray;
	private BigDecimal iashtray;
	private BigDecimal ooilcap;
	private BigDecimal ioilcap;
	private BigDecimal ogatelights;
	private BigDecimal igatelights;
	private BigDecimal oreflectlight;
	private BigDecimal ireflectlight;
	private BigDecimal oenginecondition;
	private BigDecimal ienginecondition;
	private BigDecimal oaircondition;
	private BigDecimal iaircondition;
	private BigDecimal ojack;
	private BigDecimal ijack;
	private BigDecimal ofireextinguisher;
	private BigDecimal ifireextinguisher;
	private BigDecimal osparetire;
	private BigDecimal isparetire;
	private BigDecimal okey;
	private BigDecimal ikey;
	private BigDecimal otirewrench;
	private BigDecimal itirewrench;
	private BigDecimal oscrewdriver;
	private BigDecimal iscrewdriver;
	private BigDecimal owrench;
	private BigDecimal iwrench;
	private BigDecimal owarningsigns;
	private BigDecimal iwarningsigns;
	private String lesseemanager;
	private String lesseeman;
	private String rentmanager;
	private String rentman;
	private String remark;
	private Serializable lesseebdate;
	private Serializable lesseeedate;
	private BigDecimal bmileage;
	private BigDecimal emileage;
	private Serializable realdate;
	private String vehiclename;
	private Serializable adddate;
	private String traveldestination;
	private BigDecimal ileftsmalllight;
	private BigDecimal billstatus;

	public Vehicleeir() {
	}

	public Vehicleeir(BigDecimal vid, BigDecimal billid, BigDecimal oodrivinglicense, BigDecimal iodrivinglicense,
			BigDecimal olicensetag, BigDecimal ilicensetag, BigDecimal omrcercertify, BigDecimal imrcercertify,
			BigDecimal oinscard, BigDecimal iinscard, BigDecimal oinstructions, BigDecimal iinstructions,
			BigDecimal osewagepermit, BigDecimal isewagepermit, BigDecimal oleftbiglight, BigDecimal ileftbiglight,
			BigDecimal orightbiglight, BigDecimal irightbiglight, BigDecimal oleftsmalllight,
			BigDecimal orightsamlllight, BigDecimal irightsmalllight, BigDecimal oleftturnlight,
			BigDecimal ileftturnlight, BigDecimal orightturnlight, BigDecimal irightturnlight, BigDecimal oleftmirror,
			BigDecimal ileftmirror, BigDecimal orightmirror, BigDecimal irightmirror, BigDecimal oleftaturnlight,
			BigDecimal ileftaturnlight, BigDecimal orightaturnlight, BigDecimal irightaturnlight,
			BigDecimal oleftbrakelights, BigDecimal ileftbrakelights, BigDecimal orightbrakelights,
			BigDecimal irightbrakelights, BigDecimal oplatelight, BigDecimal iplatelight, BigDecimal osidelights,
			BigDecimal isidelights, BigDecimal oantifog, BigDecimal iantifog, BigDecimal odashboard,
			BigDecimal idashboard, BigDecimal owiper, BigDecimal iwiper, BigDecimal obumper, BigDecimal ibumper,
			BigDecimal oseatcover, BigDecimal iseatcover, BigDecimal ocigarettelighter, BigDecimal icigarettelighter,
			BigDecimal ochassis, BigDecimal ichassis, BigDecimal oantenna, BigDecimal iantenna,
			BigDecimal ocassetteplayers, BigDecimal icassetteplayers, BigDecimal oottomans, BigDecimal iottomans,
			BigDecimal oashtray, BigDecimal iashtray, BigDecimal ooilcap, BigDecimal ioilcap, BigDecimal ogatelights,
			BigDecimal igatelights, BigDecimal oreflectlight, BigDecimal ireflectlight, BigDecimal oenginecondition,
			BigDecimal ienginecondition, BigDecimal oaircondition, BigDecimal iaircondition, BigDecimal ojack,
			BigDecimal ijack, BigDecimal ofireextinguisher, BigDecimal ifireextinguisher, BigDecimal osparetire,
			BigDecimal isparetire, BigDecimal okey, BigDecimal ikey, BigDecimal otirewrench, BigDecimal itirewrench,
			BigDecimal oscrewdriver, BigDecimal iscrewdriver, BigDecimal owrench, BigDecimal iwrench,
			BigDecimal owarningsigns, BigDecimal iwarningsigns, Serializable lesseebdate, Serializable lesseeedate) {
		this.vid = vid;
		this.billid = billid;
		this.oodrivinglicense = oodrivinglicense;
		this.iodrivinglicense = iodrivinglicense;
		this.olicensetag = olicensetag;
		this.ilicensetag = ilicensetag;
		this.omrcercertify = omrcercertify;
		this.imrcercertify = imrcercertify;
		this.oinscard = oinscard;
		this.iinscard = iinscard;
		this.oinstructions = oinstructions;
		this.iinstructions = iinstructions;
		this.osewagepermit = osewagepermit;
		this.isewagepermit = isewagepermit;
		this.oleftbiglight = oleftbiglight;
		this.ileftbiglight = ileftbiglight;
		this.orightbiglight = orightbiglight;
		this.irightbiglight = irightbiglight;
		this.oleftsmalllight = oleftsmalllight;
		this.orightsamlllight = orightsamlllight;
		this.irightsmalllight = irightsmalllight;
		this.oleftturnlight = oleftturnlight;
		this.ileftturnlight = ileftturnlight;
		this.orightturnlight = orightturnlight;
		this.irightturnlight = irightturnlight;
		this.oleftmirror = oleftmirror;
		this.ileftmirror = ileftmirror;
		this.orightmirror = orightmirror;
		this.irightmirror = irightmirror;
		this.oleftaturnlight = oleftaturnlight;
		this.ileftaturnlight = ileftaturnlight;
		this.orightaturnlight = orightaturnlight;
		this.irightaturnlight = irightaturnlight;
		this.oleftbrakelights = oleftbrakelights;
		this.ileftbrakelights = ileftbrakelights;
		this.orightbrakelights = orightbrakelights;
		this.irightbrakelights = irightbrakelights;
		this.oplatelight = oplatelight;
		this.iplatelight = iplatelight;
		this.osidelights = osidelights;
		this.isidelights = isidelights;
		this.oantifog = oantifog;
		this.iantifog = iantifog;
		this.odashboard = odashboard;
		this.idashboard = idashboard;
		this.owiper = owiper;
		this.iwiper = iwiper;
		this.obumper = obumper;
		this.ibumper = ibumper;
		this.oseatcover = oseatcover;
		this.iseatcover = iseatcover;
		this.ocigarettelighter = ocigarettelighter;
		this.icigarettelighter = icigarettelighter;
		this.ochassis = ochassis;
		this.ichassis = ichassis;
		this.oantenna = oantenna;
		this.iantenna = iantenna;
		this.ocassetteplayers = ocassetteplayers;
		this.icassetteplayers = icassetteplayers;
		this.oottomans = oottomans;
		this.iottomans = iottomans;
		this.oashtray = oashtray;
		this.iashtray = iashtray;
		this.ooilcap = ooilcap;
		this.ioilcap = ioilcap;
		this.ogatelights = ogatelights;
		this.igatelights = igatelights;
		this.oreflectlight = oreflectlight;
		this.ireflectlight = ireflectlight;
		this.oenginecondition = oenginecondition;
		this.ienginecondition = ienginecondition;
		this.oaircondition = oaircondition;
		this.iaircondition = iaircondition;
		this.ojack = ojack;
		this.ijack = ijack;
		this.ofireextinguisher = ofireextinguisher;
		this.ifireextinguisher = ifireextinguisher;
		this.osparetire = osparetire;
		this.isparetire = isparetire;
		this.okey = okey;
		this.ikey = ikey;
		this.otirewrench = otirewrench;
		this.itirewrench = itirewrench;
		this.oscrewdriver = oscrewdriver;
		this.iscrewdriver = iscrewdriver;
		this.owrench = owrench;
		this.iwrench = iwrench;
		this.owarningsigns = owarningsigns;
		this.iwarningsigns = iwarningsigns;
		this.lesseebdate = lesseebdate;
		this.lesseeedate = lesseeedate;
	}

	public Vehicleeir(BigDecimal vid, BigDecimal billid, BigDecimal oodrivinglicense, BigDecimal iodrivinglicense,
			BigDecimal olicensetag, BigDecimal ilicensetag, BigDecimal omrcercertify, BigDecimal imrcercertify,
			BigDecimal oinscard, BigDecimal iinscard, BigDecimal oinstructions, BigDecimal iinstructions,
			BigDecimal osewagepermit, BigDecimal isewagepermit, BigDecimal oleftbiglight, BigDecimal ileftbiglight,
			BigDecimal orightbiglight, BigDecimal irightbiglight, BigDecimal oleftsmalllight,
			BigDecimal orightsamlllight, BigDecimal irightsmalllight, BigDecimal oleftturnlight,
			BigDecimal ileftturnlight, BigDecimal orightturnlight, BigDecimal irightturnlight, BigDecimal oleftmirror,
			BigDecimal ileftmirror, BigDecimal orightmirror, BigDecimal irightmirror, BigDecimal oleftaturnlight,
			BigDecimal ileftaturnlight, BigDecimal orightaturnlight, BigDecimal irightaturnlight,
			BigDecimal oleftbrakelights, BigDecimal ileftbrakelights, BigDecimal orightbrakelights,
			BigDecimal irightbrakelights, BigDecimal oplatelight, BigDecimal iplatelight, BigDecimal osidelights,
			BigDecimal isidelights, BigDecimal oantifog, BigDecimal iantifog, BigDecimal odashboard,
			BigDecimal idashboard, BigDecimal owiper, BigDecimal iwiper, BigDecimal obumper, BigDecimal ibumper,
			BigDecimal oseatcover, BigDecimal iseatcover, BigDecimal ocigarettelighter, BigDecimal icigarettelighter,
			BigDecimal ochassis, BigDecimal ichassis, BigDecimal oantenna, BigDecimal iantenna,
			BigDecimal ocassetteplayers, BigDecimal icassetteplayers, BigDecimal oottomans, BigDecimal iottomans,
			BigDecimal oashtray, BigDecimal iashtray, BigDecimal ooilcap, BigDecimal ioilcap, BigDecimal ogatelights,
			BigDecimal igatelights, BigDecimal oreflectlight, BigDecimal ireflectlight, BigDecimal oenginecondition,
			BigDecimal ienginecondition, BigDecimal oaircondition, BigDecimal iaircondition, BigDecimal ojack,
			BigDecimal ijack, BigDecimal ofireextinguisher, BigDecimal ifireextinguisher, BigDecimal osparetire,
			BigDecimal isparetire, BigDecimal okey, BigDecimal ikey, BigDecimal otirewrench, BigDecimal itirewrench,
			BigDecimal oscrewdriver, BigDecimal iscrewdriver, BigDecimal owrench, BigDecimal iwrench,
			BigDecimal owarningsigns, BigDecimal iwarningsigns, String lesseemanager, String lesseeman,
			String rentmanager, String rentman, String remark, Serializable lesseebdate, Serializable lesseeedate,
			BigDecimal bmileage, BigDecimal emileage, Serializable realdate, String vehiclename, Serializable adddate,
			String traveldestination, BigDecimal ileftsmalllight, BigDecimal billstatus) {
		this.vid = vid;
		this.billid = billid;
		this.oodrivinglicense = oodrivinglicense;
		this.iodrivinglicense = iodrivinglicense;
		this.olicensetag = olicensetag;
		this.ilicensetag = ilicensetag;
		this.omrcercertify = omrcercertify;
		this.imrcercertify = imrcercertify;
		this.oinscard = oinscard;
		this.iinscard = iinscard;
		this.oinstructions = oinstructions;
		this.iinstructions = iinstructions;
		this.osewagepermit = osewagepermit;
		this.isewagepermit = isewagepermit;
		this.oleftbiglight = oleftbiglight;
		this.ileftbiglight = ileftbiglight;
		this.orightbiglight = orightbiglight;
		this.irightbiglight = irightbiglight;
		this.oleftsmalllight = oleftsmalllight;
		this.orightsamlllight = orightsamlllight;
		this.irightsmalllight = irightsmalllight;
		this.oleftturnlight = oleftturnlight;
		this.ileftturnlight = ileftturnlight;
		this.orightturnlight = orightturnlight;
		this.irightturnlight = irightturnlight;
		this.oleftmirror = oleftmirror;
		this.ileftmirror = ileftmirror;
		this.orightmirror = orightmirror;
		this.irightmirror = irightmirror;
		this.oleftaturnlight = oleftaturnlight;
		this.ileftaturnlight = ileftaturnlight;
		this.orightaturnlight = orightaturnlight;
		this.irightaturnlight = irightaturnlight;
		this.oleftbrakelights = oleftbrakelights;
		this.ileftbrakelights = ileftbrakelights;
		this.orightbrakelights = orightbrakelights;
		this.irightbrakelights = irightbrakelights;
		this.oplatelight = oplatelight;
		this.iplatelight = iplatelight;
		this.osidelights = osidelights;
		this.isidelights = isidelights;
		this.oantifog = oantifog;
		this.iantifog = iantifog;
		this.odashboard = odashboard;
		this.idashboard = idashboard;
		this.owiper = owiper;
		this.iwiper = iwiper;
		this.obumper = obumper;
		this.ibumper = ibumper;
		this.oseatcover = oseatcover;
		this.iseatcover = iseatcover;
		this.ocigarettelighter = ocigarettelighter;
		this.icigarettelighter = icigarettelighter;
		this.ochassis = ochassis;
		this.ichassis = ichassis;
		this.oantenna = oantenna;
		this.iantenna = iantenna;
		this.ocassetteplayers = ocassetteplayers;
		this.icassetteplayers = icassetteplayers;
		this.oottomans = oottomans;
		this.iottomans = iottomans;
		this.oashtray = oashtray;
		this.iashtray = iashtray;
		this.ooilcap = ooilcap;
		this.ioilcap = ioilcap;
		this.ogatelights = ogatelights;
		this.igatelights = igatelights;
		this.oreflectlight = oreflectlight;
		this.ireflectlight = ireflectlight;
		this.oenginecondition = oenginecondition;
		this.ienginecondition = ienginecondition;
		this.oaircondition = oaircondition;
		this.iaircondition = iaircondition;
		this.ojack = ojack;
		this.ijack = ijack;
		this.ofireextinguisher = ofireextinguisher;
		this.ifireextinguisher = ifireextinguisher;
		this.osparetire = osparetire;
		this.isparetire = isparetire;
		this.okey = okey;
		this.ikey = ikey;
		this.otirewrench = otirewrench;
		this.itirewrench = itirewrench;
		this.oscrewdriver = oscrewdriver;
		this.iscrewdriver = iscrewdriver;
		this.owrench = owrench;
		this.iwrench = iwrench;
		this.owarningsigns = owarningsigns;
		this.iwarningsigns = iwarningsigns;
		this.lesseemanager = lesseemanager;
		this.lesseeman = lesseeman;
		this.rentmanager = rentmanager;
		this.rentman = rentman;
		this.remark = remark;
		this.lesseebdate = lesseebdate;
		this.lesseeedate = lesseeedate;
		this.bmileage = bmileage;
		this.emileage = emileage;
		this.realdate = realdate;
		this.vehiclename = vehiclename;
		this.adddate = adddate;
		this.traveldestination = traveldestination;
		this.ileftsmalllight = ileftsmalllight;
		this.billstatus = billstatus;
	}

	public BigDecimal getVid() {
		return this.vid;
	}

	public void setVid(BigDecimal vid) {
		this.vid = vid;
	}

	public BigDecimal getBillid() {
		return this.billid;
	}

	public void setBillid(BigDecimal billid) {
		this.billid = billid;
	}

	public BigDecimal getOodrivinglicense() {
		return this.oodrivinglicense;
	}

	public void setOodrivinglicense(BigDecimal oodrivinglicense) {
		this.oodrivinglicense = oodrivinglicense;
	}

	public BigDecimal getIodrivinglicense() {
		return this.iodrivinglicense;
	}

	public void setIodrivinglicense(BigDecimal iodrivinglicense) {
		this.iodrivinglicense = iodrivinglicense;
	}

	public BigDecimal getOlicensetag() {
		return this.olicensetag;
	}

	public void setOlicensetag(BigDecimal olicensetag) {
		this.olicensetag = olicensetag;
	}

	public BigDecimal getIlicensetag() {
		return this.ilicensetag;
	}

	public void setIlicensetag(BigDecimal ilicensetag) {
		this.ilicensetag = ilicensetag;
	}

	public BigDecimal getOmrcercertify() {
		return this.omrcercertify;
	}

	public void setOmrcercertify(BigDecimal omrcercertify) {
		this.omrcercertify = omrcercertify;
	}

	public BigDecimal getImrcercertify() {
		return this.imrcercertify;
	}

	public void setImrcercertify(BigDecimal imrcercertify) {
		this.imrcercertify = imrcercertify;
	}

	public BigDecimal getOinscard() {
		return this.oinscard;
	}

	public void setOinscard(BigDecimal oinscard) {
		this.oinscard = oinscard;
	}

	public BigDecimal getIinscard() {
		return this.iinscard;
	}

	public void setIinscard(BigDecimal iinscard) {
		this.iinscard = iinscard;
	}

	public BigDecimal getOinstructions() {
		return this.oinstructions;
	}

	public void setOinstructions(BigDecimal oinstructions) {
		this.oinstructions = oinstructions;
	}

	public BigDecimal getIinstructions() {
		return this.iinstructions;
	}

	public void setIinstructions(BigDecimal iinstructions) {
		this.iinstructions = iinstructions;
	}

	public BigDecimal getOsewagepermit() {
		return this.osewagepermit;
	}

	public void setOsewagepermit(BigDecimal osewagepermit) {
		this.osewagepermit = osewagepermit;
	}

	public BigDecimal getIsewagepermit() {
		return this.isewagepermit;
	}

	public void setIsewagepermit(BigDecimal isewagepermit) {
		this.isewagepermit = isewagepermit;
	}

	public BigDecimal getOleftbiglight() {
		return this.oleftbiglight;
	}

	public void setOleftbiglight(BigDecimal oleftbiglight) {
		this.oleftbiglight = oleftbiglight;
	}

	public BigDecimal getIleftbiglight() {
		return this.ileftbiglight;
	}

	public void setIleftbiglight(BigDecimal ileftbiglight) {
		this.ileftbiglight = ileftbiglight;
	}

	public BigDecimal getOrightbiglight() {
		return this.orightbiglight;
	}

	public void setOrightbiglight(BigDecimal orightbiglight) {
		this.orightbiglight = orightbiglight;
	}

	public BigDecimal getIrightbiglight() {
		return this.irightbiglight;
	}

	public void setIrightbiglight(BigDecimal irightbiglight) {
		this.irightbiglight = irightbiglight;
	}

	public BigDecimal getOleftsmalllight() {
		return this.oleftsmalllight;
	}

	public void setOleftsmalllight(BigDecimal oleftsmalllight) {
		this.oleftsmalllight = oleftsmalllight;
	}

	public BigDecimal getOrightsamlllight() {
		return this.orightsamlllight;
	}

	public void setOrightsamlllight(BigDecimal orightsamlllight) {
		this.orightsamlllight = orightsamlllight;
	}

	public BigDecimal getIrightsmalllight() {
		return this.irightsmalllight;
	}

	public void setIrightsmalllight(BigDecimal irightsmalllight) {
		this.irightsmalllight = irightsmalllight;
	}

	public BigDecimal getOleftturnlight() {
		return this.oleftturnlight;
	}

	public void setOleftturnlight(BigDecimal oleftturnlight) {
		this.oleftturnlight = oleftturnlight;
	}

	public BigDecimal getIleftturnlight() {
		return this.ileftturnlight;
	}

	public void setIleftturnlight(BigDecimal ileftturnlight) {
		this.ileftturnlight = ileftturnlight;
	}

	public BigDecimal getOrightturnlight() {
		return this.orightturnlight;
	}

	public void setOrightturnlight(BigDecimal orightturnlight) {
		this.orightturnlight = orightturnlight;
	}

	public BigDecimal getIrightturnlight() {
		return this.irightturnlight;
	}

	public void setIrightturnlight(BigDecimal irightturnlight) {
		this.irightturnlight = irightturnlight;
	}

	public BigDecimal getOleftmirror() {
		return this.oleftmirror;
	}

	public void setOleftmirror(BigDecimal oleftmirror) {
		this.oleftmirror = oleftmirror;
	}

	public BigDecimal getIleftmirror() {
		return this.ileftmirror;
	}

	public void setIleftmirror(BigDecimal ileftmirror) {
		this.ileftmirror = ileftmirror;
	}

	public BigDecimal getOrightmirror() {
		return this.orightmirror;
	}

	public void setOrightmirror(BigDecimal orightmirror) {
		this.orightmirror = orightmirror;
	}

	public BigDecimal getIrightmirror() {
		return this.irightmirror;
	}

	public void setIrightmirror(BigDecimal irightmirror) {
		this.irightmirror = irightmirror;
	}

	public BigDecimal getOleftaturnlight() {
		return this.oleftaturnlight;
	}

	public void setOleftaturnlight(BigDecimal oleftaturnlight) {
		this.oleftaturnlight = oleftaturnlight;
	}

	public BigDecimal getIleftaturnlight() {
		return this.ileftaturnlight;
	}

	public void setIleftaturnlight(BigDecimal ileftaturnlight) {
		this.ileftaturnlight = ileftaturnlight;
	}

	public BigDecimal getOrightaturnlight() {
		return this.orightaturnlight;
	}

	public void setOrightaturnlight(BigDecimal orightaturnlight) {
		this.orightaturnlight = orightaturnlight;
	}

	public BigDecimal getIrightaturnlight() {
		return this.irightaturnlight;
	}

	public void setIrightaturnlight(BigDecimal irightaturnlight) {
		this.irightaturnlight = irightaturnlight;
	}

	public BigDecimal getOleftbrakelights() {
		return this.oleftbrakelights;
	}

	public void setOleftbrakelights(BigDecimal oleftbrakelights) {
		this.oleftbrakelights = oleftbrakelights;
	}

	public BigDecimal getIleftbrakelights() {
		return this.ileftbrakelights;
	}

	public void setIleftbrakelights(BigDecimal ileftbrakelights) {
		this.ileftbrakelights = ileftbrakelights;
	}

	public BigDecimal getOrightbrakelights() {
		return this.orightbrakelights;
	}

	public void setOrightbrakelights(BigDecimal orightbrakelights) {
		this.orightbrakelights = orightbrakelights;
	}

	public BigDecimal getIrightbrakelights() {
		return this.irightbrakelights;
	}

	public void setIrightbrakelights(BigDecimal irightbrakelights) {
		this.irightbrakelights = irightbrakelights;
	}

	public BigDecimal getOplatelight() {
		return this.oplatelight;
	}

	public void setOplatelight(BigDecimal oplatelight) {
		this.oplatelight = oplatelight;
	}

	public BigDecimal getIplatelight() {
		return this.iplatelight;
	}

	public void setIplatelight(BigDecimal iplatelight) {
		this.iplatelight = iplatelight;
	}

	public BigDecimal getOsidelights() {
		return this.osidelights;
	}

	public void setOsidelights(BigDecimal osidelights) {
		this.osidelights = osidelights;
	}

	public BigDecimal getIsidelights() {
		return this.isidelights;
	}

	public void setIsidelights(BigDecimal isidelights) {
		this.isidelights = isidelights;
	}

	public BigDecimal getOantifog() {
		return this.oantifog;
	}

	public void setOantifog(BigDecimal oantifog) {
		this.oantifog = oantifog;
	}

	public BigDecimal getIantifog() {
		return this.iantifog;
	}

	public void setIantifog(BigDecimal iantifog) {
		this.iantifog = iantifog;
	}

	public BigDecimal getOdashboard() {
		return this.odashboard;
	}

	public void setOdashboard(BigDecimal odashboard) {
		this.odashboard = odashboard;
	}

	public BigDecimal getIdashboard() {
		return this.idashboard;
	}

	public void setIdashboard(BigDecimal idashboard) {
		this.idashboard = idashboard;
	}

	public BigDecimal getOwiper() {
		return this.owiper;
	}

	public void setOwiper(BigDecimal owiper) {
		this.owiper = owiper;
	}

	public BigDecimal getIwiper() {
		return this.iwiper;
	}

	public void setIwiper(BigDecimal iwiper) {
		this.iwiper = iwiper;
	}

	public BigDecimal getObumper() {
		return this.obumper;
	}

	public void setObumper(BigDecimal obumper) {
		this.obumper = obumper;
	}

	public BigDecimal getIbumper() {
		return this.ibumper;
	}

	public void setIbumper(BigDecimal ibumper) {
		this.ibumper = ibumper;
	}

	public BigDecimal getOseatcover() {
		return this.oseatcover;
	}

	public void setOseatcover(BigDecimal oseatcover) {
		this.oseatcover = oseatcover;
	}

	public BigDecimal getIseatcover() {
		return this.iseatcover;
	}

	public void setIseatcover(BigDecimal iseatcover) {
		this.iseatcover = iseatcover;
	}

	public BigDecimal getOcigarettelighter() {
		return this.ocigarettelighter;
	}

	public void setOcigarettelighter(BigDecimal ocigarettelighter) {
		this.ocigarettelighter = ocigarettelighter;
	}

	public BigDecimal getIcigarettelighter() {
		return this.icigarettelighter;
	}

	public void setIcigarettelighter(BigDecimal icigarettelighter) {
		this.icigarettelighter = icigarettelighter;
	}

	public BigDecimal getOchassis() {
		return this.ochassis;
	}

	public void setOchassis(BigDecimal ochassis) {
		this.ochassis = ochassis;
	}

	public BigDecimal getIchassis() {
		return this.ichassis;
	}

	public void setIchassis(BigDecimal ichassis) {
		this.ichassis = ichassis;
	}

	public BigDecimal getOantenna() {
		return this.oantenna;
	}

	public void setOantenna(BigDecimal oantenna) {
		this.oantenna = oantenna;
	}

	public BigDecimal getIantenna() {
		return this.iantenna;
	}

	public void setIantenna(BigDecimal iantenna) {
		this.iantenna = iantenna;
	}

	public BigDecimal getOcassetteplayers() {
		return this.ocassetteplayers;
	}

	public void setOcassetteplayers(BigDecimal ocassetteplayers) {
		this.ocassetteplayers = ocassetteplayers;
	}

	public BigDecimal getIcassetteplayers() {
		return this.icassetteplayers;
	}

	public void setIcassetteplayers(BigDecimal icassetteplayers) {
		this.icassetteplayers = icassetteplayers;
	}

	public BigDecimal getOottomans() {
		return this.oottomans;
	}

	public void setOottomans(BigDecimal oottomans) {
		this.oottomans = oottomans;
	}

	public BigDecimal getIottomans() {
		return this.iottomans;
	}

	public void setIottomans(BigDecimal iottomans) {
		this.iottomans = iottomans;
	}

	public BigDecimal getOashtray() {
		return this.oashtray;
	}

	public void setOashtray(BigDecimal oashtray) {
		this.oashtray = oashtray;
	}

	public BigDecimal getIashtray() {
		return this.iashtray;
	}

	public void setIashtray(BigDecimal iashtray) {
		this.iashtray = iashtray;
	}

	public BigDecimal getOoilcap() {
		return this.ooilcap;
	}

	public void setOoilcap(BigDecimal ooilcap) {
		this.ooilcap = ooilcap;
	}

	public BigDecimal getIoilcap() {
		return this.ioilcap;
	}

	public void setIoilcap(BigDecimal ioilcap) {
		this.ioilcap = ioilcap;
	}

	public BigDecimal getOgatelights() {
		return this.ogatelights;
	}

	public void setOgatelights(BigDecimal ogatelights) {
		this.ogatelights = ogatelights;
	}

	public BigDecimal getIgatelights() {
		return this.igatelights;
	}

	public void setIgatelights(BigDecimal igatelights) {
		this.igatelights = igatelights;
	}

	public BigDecimal getOreflectlight() {
		return this.oreflectlight;
	}

	public void setOreflectlight(BigDecimal oreflectlight) {
		this.oreflectlight = oreflectlight;
	}

	public BigDecimal getIreflectlight() {
		return this.ireflectlight;
	}

	public void setIreflectlight(BigDecimal ireflectlight) {
		this.ireflectlight = ireflectlight;
	}

	public BigDecimal getOenginecondition() {
		return this.oenginecondition;
	}

	public void setOenginecondition(BigDecimal oenginecondition) {
		this.oenginecondition = oenginecondition;
	}

	public BigDecimal getIenginecondition() {
		return this.ienginecondition;
	}

	public void setIenginecondition(BigDecimal ienginecondition) {
		this.ienginecondition = ienginecondition;
	}

	public BigDecimal getOaircondition() {
		return this.oaircondition;
	}

	public void setOaircondition(BigDecimal oaircondition) {
		this.oaircondition = oaircondition;
	}

	public BigDecimal getIaircondition() {
		return this.iaircondition;
	}

	public void setIaircondition(BigDecimal iaircondition) {
		this.iaircondition = iaircondition;
	}

	public BigDecimal getOjack() {
		return this.ojack;
	}

	public void setOjack(BigDecimal ojack) {
		this.ojack = ojack;
	}

	public BigDecimal getIjack() {
		return this.ijack;
	}

	public void setIjack(BigDecimal ijack) {
		this.ijack = ijack;
	}

	public BigDecimal getOfireextinguisher() {
		return this.ofireextinguisher;
	}

	public void setOfireextinguisher(BigDecimal ofireextinguisher) {
		this.ofireextinguisher = ofireextinguisher;
	}

	public BigDecimal getIfireextinguisher() {
		return this.ifireextinguisher;
	}

	public void setIfireextinguisher(BigDecimal ifireextinguisher) {
		this.ifireextinguisher = ifireextinguisher;
	}

	public BigDecimal getOsparetire() {
		return this.osparetire;
	}

	public void setOsparetire(BigDecimal osparetire) {
		this.osparetire = osparetire;
	}

	public BigDecimal getIsparetire() {
		return this.isparetire;
	}

	public void setIsparetire(BigDecimal isparetire) {
		this.isparetire = isparetire;
	}

	public BigDecimal getOkey() {
		return this.okey;
	}

	public void setOkey(BigDecimal okey) {
		this.okey = okey;
	}

	public BigDecimal getIkey() {
		return this.ikey;
	}

	public void setIkey(BigDecimal ikey) {
		this.ikey = ikey;
	}

	public BigDecimal getOtirewrench() {
		return this.otirewrench;
	}

	public void setOtirewrench(BigDecimal otirewrench) {
		this.otirewrench = otirewrench;
	}

	public BigDecimal getItirewrench() {
		return this.itirewrench;
	}

	public void setItirewrench(BigDecimal itirewrench) {
		this.itirewrench = itirewrench;
	}

	public BigDecimal getOscrewdriver() {
		return this.oscrewdriver;
	}

	public void setOscrewdriver(BigDecimal oscrewdriver) {
		this.oscrewdriver = oscrewdriver;
	}

	public BigDecimal getIscrewdriver() {
		return this.iscrewdriver;
	}

	public void setIscrewdriver(BigDecimal iscrewdriver) {
		this.iscrewdriver = iscrewdriver;
	}

	public BigDecimal getOwrench() {
		return this.owrench;
	}

	public void setOwrench(BigDecimal owrench) {
		this.owrench = owrench;
	}

	public BigDecimal getIwrench() {
		return this.iwrench;
	}

	public void setIwrench(BigDecimal iwrench) {
		this.iwrench = iwrench;
	}

	public BigDecimal getOwarningsigns() {
		return this.owarningsigns;
	}

	public void setOwarningsigns(BigDecimal owarningsigns) {
		this.owarningsigns = owarningsigns;
	}

	public BigDecimal getIwarningsigns() {
		return this.iwarningsigns;
	}

	public void setIwarningsigns(BigDecimal iwarningsigns) {
		this.iwarningsigns = iwarningsigns;
	}

	public String getLesseemanager() {
		return this.lesseemanager;
	}

	public void setLesseemanager(String lesseemanager) {
		this.lesseemanager = lesseemanager;
	}

	public String getLesseeman() {
		return this.lesseeman;
	}

	public void setLesseeman(String lesseeman) {
		this.lesseeman = lesseeman;
	}

	public String getRentmanager() {
		return this.rentmanager;
	}

	public void setRentmanager(String rentmanager) {
		this.rentmanager = rentmanager;
	}

	public String getRentman() {
		return this.rentman;
	}

	public void setRentman(String rentman) {
		this.rentman = rentman;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Serializable getLesseebdate() {
		return this.lesseebdate;
	}

	public void setLesseebdate(Serializable lesseebdate) {
		this.lesseebdate = lesseebdate;
	}

	public Serializable getLesseeedate() {
		return this.lesseeedate;
	}

	public void setLesseeedate(Serializable lesseeedate) {
		this.lesseeedate = lesseeedate;
	}

	public BigDecimal getBmileage() {
		return this.bmileage;
	}

	public void setBmileage(BigDecimal bmileage) {
		this.bmileage = bmileage;
	}

	public BigDecimal getEmileage() {
		return this.emileage;
	}

	public void setEmileage(BigDecimal emileage) {
		this.emileage = emileage;
	}

	public Serializable getRealdate() {
		return this.realdate;
	}

	public void setRealdate(Serializable realdate) {
		this.realdate = realdate;
	}

	public String getVehiclename() {
		return this.vehiclename;
	}

	public void setVehiclename(String vehiclename) {
		this.vehiclename = vehiclename;
	}

	public Serializable getAdddate() {
		return this.adddate;
	}

	public void setAdddate(Serializable adddate) {
		this.adddate = adddate;
	}

	public String getTraveldestination() {
		return this.traveldestination;
	}

	public void setTraveldestination(String traveldestination) {
		this.traveldestination = traveldestination;
	}

	public BigDecimal getIleftsmalllight() {
		return this.ileftsmalllight;
	}

	public void setIleftsmalllight(BigDecimal ileftsmalllight) {
		this.ileftsmalllight = ileftsmalllight;
	}

	public BigDecimal getBillstatus() {
		return this.billstatus;
	}

	public void setBillstatus(BigDecimal billstatus) {
		this.billstatus = billstatus;
	}

}
