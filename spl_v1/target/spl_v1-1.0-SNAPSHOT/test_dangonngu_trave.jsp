<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:choose>
	<c:when test="${empty lang}">
		<f:setLocale value="en_US" scope="session" />
	</c:when>
	<c:otherwise>
		<f:setLocale value="${sessionScope.lang}" scope="session" />
	</c:otherwise>
</c:choose>
<f:setBundle basename="com.spl.bt.lang.Language" var="bundle" scope="session" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<%
	request.setCharacterEncoding("UTF-8");
	Date bd = new SimpleDateFormat("yyyy-MM-dd").parse(request.getParameter("birthday"));
	request.setAttribute("bd", bd);
%>
<title><f:message key="title" bundle="${bundle}" /></title>
</head>
<body>
	<div style="margin: auto; width: 500px;">

		<h1>
			<f:message bundle="${bundle}" key="title" />
		</h1>

		<table>
			<tr>
				<td><f:message key="id" bundle="${bundle}" /></td>
				<td>${param.id}</td>
			</tr>
			<tr>
				<td><f:message key="fullname" bundle="${bundle}" /></td>
				<td>${param.fullname}</td>
			</tr>
			<tr>
				<td><f:message key="birthday" bundle="${bundle}" /></td>
				<td><f:formatDate value="${bd}" dateStyle="short" /></td>
			</tr>
			<tr>
				<td><f:message key="salary" bundle="${bundle}" /></td>
				<td><f:formatNumber value="${param.salary}" type="currency" /></td>
			</tr>
			<tr>
				<td><f:message key="rate" bundle="${bundle}" /></td>
				<td><f:formatNumber value="${param.rate}" type="number" /></td>
			</tr>
			<tr>
				<td><f:message key="total" bundle="${bundle}" /></td>
				<td><f:formatNumber value="${param.salary*param.rate}" type="currency" /></td>
			</tr>
			<tr>
				<td><a href="javascript:history.back()"><f:message key="back" bundle="${bundle}" /></a></td>
			</tr>
		</table>

	</div>
</body>