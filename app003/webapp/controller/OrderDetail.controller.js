sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History"
], function (Controller, UIComponent, History) {
    "use strict";

    return Controller.extend("com.accenture.orders.app003.controller.orderDetail", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteOrderDetail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var sOrderId = oEvent.getParameter("arguments").OrderID;
            this.getView().bindElement({
                path: "/Orders(" + sOrderId + ")",
                parameters: {
                    expand: "Customer,Employee"
                }
            });
        },

        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("RouteOrders", {}, true);
            }
        }
    });
});