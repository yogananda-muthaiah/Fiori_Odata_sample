/*global QUnit*/

sap.ui.define([
	"comaccentureorderlist/app004/controller/Orders.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Orders Controller");

	QUnit.test("I should test the Orders controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
