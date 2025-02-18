/*global QUnit*/

sap.ui.define([
	"comaccentureorders/app003/controller/Orders.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Orders Controller");

	QUnit.test("I should test the Orders controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
