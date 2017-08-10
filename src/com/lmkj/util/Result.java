package com.lmkj.util;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Result {
	private Boolean _autoShow;
	private List<String> _errors;
	private String _errorsHtml;
	private String _errorsText;
	private String _errorsJson;
	private String _status;
	private Object _Info;
	private int _RowNumber = 0;

	JSONObject obj = new JSONObject();

	public JSONObject getObj() {
		return obj;
	}

	public void setObj(JSONObject obj) {
		this.obj = obj;
	}

	public Result() {
		_autoShow = true;
		_errors = new ArrayList<String>();
		try {
			obj.put("AutoShow", true);
			obj.put("Errors", new JSONArray());
			obj.put("ErrorsHtml", "");
			obj.put("ErrorsText", "");
			obj.put("ErrorsJson", "{}");
			obj.put("status", "");
			obj.put("Info", "");
			obj.put("HasErrors", false);
			obj.put("extra", "");
			obj.put("RowNumber", 0);
			obj.put("IsValid", true);
		} catch (JSONException e1) {
			e1.printStackTrace();
		}
	}

	public String get_status() {
		return _status;
	}

	public void set_status(String _status) throws Exception {
		this.obj.put("status", _status);
	}
	
	public Boolean get_autoShow() {
		return _autoShow;
	}

	public void set_autoShow(Boolean _autoShow) throws Exception {
		this._autoShow = _autoShow;
		this.obj.put("AutoShow", _autoShow);
	}

	public List<String> get_errors() {
		return _errors;
	}

	public void set_errors(List<String> _errors) throws Exception {
		this._errors = _errors;
		this.obj.put("Errors", _errors);
	}

	public String get_errorsHtml() {
		return _errorsHtml;
	}

	public void set_errorsHtml(String _errorsHtml) throws Exception {
		this._errorsHtml = _errorsHtml;
		this.obj.put("ErrorsHtml", _errorsHtml);
	}

	public String get_errorsText() {
		return _errorsText;
	}

	public void set_errorsText(String _errorsText) throws Exception {
		this._errorsText = _errorsText;
		this.obj.put("ErrorsText", _errorsText);
	}

	public String get_errorsJson() {
		return _errorsJson;
	}

	public void set_errorsJson(String _errorsJson) throws Exception {
		this._errorsJson = _errorsJson;
		this.obj.put("ErrorsJson", _errorsJson);
	}

	public Object get_Info() {
		return _Info;
	}

	public void set_Info(Object _Info) throws Exception {
		this._Info = _Info;
		this.obj.put("Info", _Info);
	}

	public int get_RowNumber() {
		return _RowNumber;
	}

	public void set_RowNumber(int _RowNumber) throws Exception {
		this._RowNumber = _RowNumber;
		this.obj.put("RowNumber", _RowNumber);
	}

	public Boolean getHasErrors() {
		return (_errors.size() > 0);
	}

}
