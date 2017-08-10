package com.lmkj.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Formatter;
import java.util.Random;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;

import java.net.URL;
import java.net.URLConnection;

//import org.json.JSONArray;
//import org.json.JSONException;
//import org.json.JSONObject;

public class CommonUtil
{

	/**
	 * 根据传入的ResultSet 结果集，拼接成JSON数组, 格式为：[{"结果集字段名":结果集字段值},{},......]
	 * 
	 * @param rs
	 * @param array
	 */
	public static void pack_json(ResultSet rs, JSONArray array)
	{
		try
		{
			while (rs.next())
			{
				JSONObject json = new JSONObject();
				// 获取结果集字段列数
				int columns = rs.getMetaData().getColumnCount();
				for (int i = 1; i <= columns; i++)
				{
					// 获取结果集列字段名
					String colname = rs.getMetaData().getColumnName(i);
					try
					{
						/*
						 * 获取结果集字段类型 String type =
						 * rs.getMetaData().getColumnTypeName(i);
						 * System.out.println("type is:" + type);
						 */
						json.put(colname, rs.getString(colname));
					} catch (JSONException e)
					{
						e.printStackTrace();
					}
				}
				array.add(json);
				// array.put(json);
			}
		} catch (SQLException e)
		{
			e.printStackTrace();
		}
	}

	/**
	 * 获取当前日期, 格式为：yyyy-MM-dd HH:mm:ss
	 */
	public static String get_time()
	{
		// 设置日期格式
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		// new Date()为获取当前系统时间
		return df.format(new Date());
	}

	/**
	 * 发送GET请求
	 * 
	 * @return
	 * @throws Exception
	 */
	public static String doGet(String url) throws Exception
	{
		URL localURL = new URL(url);
		URLConnection connection = localURL.openConnection();
		HttpURLConnection httpURLConnection = (HttpURLConnection) connection;

		httpURLConnection.setRequestProperty("Accept-Charset", "utf-8");
		httpURLConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

		InputStream inputStream = null;
		InputStreamReader inputStreamReader = null;
		BufferedReader reader = null;
		StringBuffer resultBuffer = new StringBuffer();
		String tempLine = null;

		if (httpURLConnection.getResponseCode() >= 300)
		{
			throw new Exception("HTTP Request is not success, Response code is " + httpURLConnection.getResponseCode());
		}

		try
		{
			inputStream = httpURLConnection.getInputStream();
			inputStreamReader = new InputStreamReader(inputStream);
			reader = new BufferedReader(inputStreamReader);

			while ((tempLine = reader.readLine()) != null)
			{
				resultBuffer.append(tempLine);
			}
		} finally
		{
			if (reader != null)
			{
				reader.close();
			}

			if (inputStreamReader != null)
			{
				inputStreamReader.close();
			}

			if (inputStream != null)
			{
				inputStream.close();
			}

		}
		return resultBuffer.toString();
	}

	/*
	 * 发送POST请求
	 * 
	 * @param url 目的地址
	 * 
	 * @param parameters 请求参数，String类型。
	 * 
	 * @return 远程响应结果
	 */
	public static String sendPost(String url, String msg) throws IOException
	{
		String result = "";// 返回的结果
		BufferedReader in = null;// 读取响应输入流
		PrintWriter out = null;

		// 创建URL对象
		java.net.URL connURL = new java.net.URL(url);
		// 打开URL连接
		java.net.HttpURLConnection httpConn = (java.net.HttpURLConnection) connURL.openConnection();
		// 设置通用属性
		httpConn.setRequestProperty("Accept", "*/*");
		httpConn.setRequestProperty("Connection", "Keep-Alive");
		httpConn.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)");
		// 设置POST方式
		httpConn.setDoInput(true);
		httpConn.setDoOutput(true);
		// 获取HttpURLConnection对象对应的输出流
		out = new PrintWriter(httpConn.getOutputStream());
		// 发送请求参数
		out.write(msg);
		// flush输出流的缓冲
		out.flush();
		// 定义BufferedReader输入流来读取URL的响应，设置编码方式
		in = new BufferedReader(new InputStreamReader(httpConn.getInputStream(), "UTF-8"));
		String line;
		// 读取返回的内容
		while ((line = in.readLine()) != null)
		{
			result += line;
		}

		try
		{
			if (out != null)
			{
				out.close();
			}
			if (in != null)
			{
				in.close();
			}
		} catch (IOException ex)
		{
			ex.printStackTrace();
		}

		return result;
	}

	// 封装返回callback返回参数
	public static String pack_callback(String callback, String json)
	{
		return callback + "(" + json + ")";
	}
	
	
	//获取随机字符串
    public static String createnNonce_str()
    {
        String[] strs = new String[]
                {
                 "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
                 "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
                };
        Random r = new Random();
        StringBuilder sb = new StringBuilder();
        int length = strs.length;
        for (int i = 0; i < 15; i++)
        {
            sb.append(strs[r.nextInt(length - 1)]);
        }
        return sb.toString();
    }
    
    //字符串加密
    public static String byteToHex(final byte[] hash) {
        Formatter formatter = new Formatter();
        for (byte b : hash)
        {
            formatter.format("%02x", b);
        }
        String result = formatter.toString();
        formatter.close();
        return result;
    }
	
}
