/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comaccentureorderlist/app004/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
