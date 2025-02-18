sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
   "use strict";

   return Controller.extend("com.accenture.orderlist.app004.controller.OrderDetail", {
       onInit: function () {
           var oRouter = this.getOwnerComponent().getRouter();
           oRouter.getRoute("orderDetail").attachPatternMatched(this._onOrderMatched, this);
       },

       _onOrderMatched: function (oEvent) {
           var sOrderId = oEvent.getParameter("arguments").orderId;
           this._bindView("/Orders/" + sOrderId);
       },

       _bindView: function (sOrderPath) {
           var oView = this.getView();
           oView.bindElement({
               path: sOrderPath,
               model: "orders",
               events: {
                   dataRequested: function () {
                       oView.setBusy(true);
                   },
                   dataReceived: function () {
                       oView.setBusy(false);
                   }
               }
           });
       }
   });
});
