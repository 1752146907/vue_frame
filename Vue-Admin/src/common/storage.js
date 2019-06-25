function getToken () {
	var token = localStorage.getItem('token');

	if (token == null || typeof (token) == 'undefined') {
		return '';
	}

	return token;
}

function setToken (token) {
	localStorage.setItem('token', token);
}

function removeToken () {
	localStorage.setItem('token', '');
}

function getUser () {
	var user = localStorage.getItem('user');

	if (user == null || typeof (user) == 'undefined') {
		return '';
	}

	return user;
}

function setUser (user) {
	localStorage.setItem('user', JSON.stringify(user));
}

function removeUser () {
	localStorage.setItem('user', JSON.stringify('{}'));
}

function getProductId () {
	var productId = localStorage.getItem('productId');

	if (productId == null || typeof (productId) == 'undefined') {
		return '';
	}

	return productId;
}

function setProductId (productId) {
	localStorage.setItem('productId', productId);
}

export default {
	getToken: getToken,
	setToken: setToken,
	removeToken: removeToken,
	getUser: getUser,
	setUser: setUser,
	removeUser: removeUser,
	getProductId: getProductId,
	setProductId: setProductId
};
