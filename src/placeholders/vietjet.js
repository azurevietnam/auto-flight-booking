var vj = JSON.parse(localStorage.getItem('checkout_vja_mobile'));

function $(selector) {
	return document.querySelector(selector);
}

$('[name="flightType"]').value = vj.flightType;
$('[name="departureAirport"]').value = vj.departureAirport;
$('[name="arrivalAirport"]').value = vj.arrivalAirport;
$('[name="departureDate"]').value = vj.departureDate;
$('[name="arrivalDate"]').value = vj.arrivalDate;
$('[name="adult"]').value = vj.adult;
$('[name="child"]').value = vj.child;
$('[name="infant"]').value = vj.infant;


document.querySelector('#iframe').onload = function () {
	location = 'https://m.vietjetair.com/booking/step2';
};

document.querySelector('form').submit();