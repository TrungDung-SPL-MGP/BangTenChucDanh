<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:choose>
	<c:when test="${empty param.lang}">
		<f:setLocale value="en_US" scope="session" />
	</c:when>
	<c:otherwise>
		<f:setLocale value="${param.lang}" scope="session" />
		<c:set var="lang" value="${param.lang}" scope="session" />
	</c:otherwise>
</c:choose>
<f:setBundle basename="lang.Language" var="bundle" scope="session" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title><f:message bundle="${bundle}" key="title" /></title>
</head>
<body>
	<div style="margin: auto; width: 500px;">
		<p>
			<a href="?lang=vi_VN"><f:message bundle="${bundle}" key="vi" /></a>
			| <a href="?lang=en_US"><f:message bundle="${bundle}" key="en" /></a>
		</p>
		<h1>
			<f:message bundle="${bundle}" key="title" />
		</h1>
		<form action="test_dangonngu_trave.jsp" method="post">
			<table>
				<tr>
					<td><f:message key="id" bundle="${bundle}" /></td>
					<td><input type="text" name="id" /></td>
				</tr>
				<tr>
					<td><f:message key="fullname" bundle="${bundle}" /></td>
					<td><input type="text" name="fullname" /></td>
				</tr>
				<tr>
					<td><f:message key="birthday" bundle="${bundle}" /></td>
					<td><input type="date" name="birthday" /></td>
				</tr>
				<tr>
					<td><f:message key="salary" bundle="${bundle}" /></td>
					<td><input type="number" name="salary" /></td>
				</tr>
				<tr>
					<td><f:message key="rate" bundle="${bundle}" /></td>
					<td><input type="text" name="rate" /></td>
				</tr>
				<tr>
					<td>
						<button>
							<f:message key="submit" bundle="${bundle}" />
						</button>
					</td>
				</tr>
			</table>
		</form>
	</div>
</body>
</html>
