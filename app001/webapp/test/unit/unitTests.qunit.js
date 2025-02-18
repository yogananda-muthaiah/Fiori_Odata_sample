/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comaccentureempleados/app001/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
