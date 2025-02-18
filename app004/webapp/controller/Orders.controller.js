sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Input",
    "sap/m/Label",
    "sap/m/VBox",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, MessageToast, Dialog, Button, Input, Label, VBox, MessageBox, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.accenture.orderlist.app004.controller.Orders", {

        globalOrderId: null,

        onInit: function () {
            // Initialization code can be placed here
        },

        onSelectionChange: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("listItem");
            var oBindingContext = oSelectedItem.getBindingContext("orders");
            this.globalOrderId = oSelectedItem.getBindingContext("orders").getProperty("OrderID");
            this._selectedOrderPath = oBindingContext ? oBindingContext.getPath() : null;
        },

        onDeleteOrder: function () {
            if (!this._selectedOrderPath) {
                MessageToast.show("Please select an order to delete.");
                return;
            }

            var that = this;
            MessageBox.confirm("Are you sure you want to delete this order?", {
                title: "Confirmation",
                onClose: function (oAction) {
                    if (oAction === MessageBox.Action.OK) {
                        that._deleteOrder();
                    }
                }
            });
        },

        _deleteOrder: function () {
            var oOrdersModel = this.getView().getModel("orders");
            oOrdersModel.remove(this._selectedOrderPath, {
                success: function () {
                    MessageToast.show("Order deleted!");
                },
                error: function () {
                    MessageToast.show("Error deleting order.");
                }
            });
        },

        onOpenUpdateDialog: function () {
            if (!this._selectedOrderPath) {
                MessageToast.show("Please select an order to update.");
                return;
            }

            var oOrdersModel = this.getView().getModel("orders");
            var oSelectedOrder = oOrdersModel.getProperty(this._selectedOrderPath);
            this._createUpdateDialog(oSelectedOrder);
        },

        _createUpdateDialog: function (oOrder) {
            var oOriginalOrder = Object.assign({}, oOrder);
            var oDialog = new Dialog({
                title: 'Update Order',
                type: 'Message',
                content: [
                    new VBox({
                        items: [
                            new Label({ text: 'Order Date' }),
                            new Input({ value: oOrder.OrderDate, liveChange: function (oEvent) { oOrder.OrderDate = oEvent.getParameter('value'); } }),
                            new Label({ text: 'Required Date' }),
                            new Input({ value: oOrder.RequiredDate, liveChange: function (oEvent) { oOrder.RequiredDate = oEvent.getParameter('value'); } }),
                            new Label({ text: 'Shipped Date' }),
                            new Input({ value: oOrder.ShippedDate, liveChange: function (oEvent) { oOrder.ShippedDate = oEvent.getParameter('value'); } }),
                            new Label({ text: 'Ship Via' }),
                            new Input({ value: oOrder.ShipVia, liveChange: function (oEvent) { oOrder.ShipVia = oEvent.getParameter('value'); } }),
                            new Label({ text: 'Freight' }),
                            new Input({ value: oOrder.Freight.toString(), liveChange: function (oEvent) { oOrder.Freight = parseFloat(oEvent.getParameter('value')); } }),
                            new Label({ text: 'Ship Name' }),
                            new Input({ value: oOrder.ShipName, liveChange: function (oEvent) { oOrder.ShipName = oEvent.getParameter('value'); } }),
                            new Label({ text: 'Ship Address' }),
                            new Input({ value: oOrder.ShipAddress, liveChange: function (oEvent) { oOrder.ShipAddress = oEvent.getParameter('value'); } }),
                            new Label({ text: 'Ship City' }),
                            new Input({ value: oOrder.ShipCity, liveChange: function (oEvent) { oOrder.ShipCity = oEvent.getParameter('value'); } }),
                            new Label({ text: 'Ship Region' }),
                            new Input({ value: oOrder.ShipRegion, liveChange: function (oEvent) { oOrder.ShipRegion = oEvent.getParameter('value'); } }),
                            new Label({ text: 'Ship Postal Code' }),
                            new Input({ value: oOrder.ShipPostalCode, liveChange: function (oEvent) { oOrder.ShipPostalCode = oEvent.getParameter('value'); } }),
                            new Label({ text: 'Ship Country' }),
                            new Input({ value: oOrder.ShipCountry, liveChange: function (oEvent) { oOrder.ShipCountry = oEvent.getParameter('value'); } })
                        ]
                    })
                ],
                beginButton: new Button({
                    text: 'Update',
                    press: function () {
                        oOrdersModel.update(this._selectedOrderPath, oOrder, {
                            success: function () {
                                MessageToast.show("Order Updated");
                            },
                            error: function () {
                                MessageToast.show("Error updating order.");
                            }
                        });
                        oDialog.close();
                    }.bind(this)
                }),
                endButton: new Button({
                    text: 'Cancel',
                    press: function () {
                        Object.assign(oOrder, oOriginalOrder);
                        oDialog.close();
                    }
                }),
                afterClose: function () {
                    oDialog.destroy();
                }
            });

            oDialog.open();
        },

        onCreateOrder: function () {
            var oDialog = new Dialog({
                title: 'Add New Order',
                type: 'Message',
                content: [
                    new VBox({
                        items: [
                            new Label({ text: 'Order Date' }),
                            new Input({ id: "newOrderDate" }),
                            new Label({ text: 'Required Date' }),
                            new Input({ id: "newRequiredDate" }),
                            new Label({ text: 'Shipped Date' }),
                            new Input({ id: "newShippedDate" }),
                            new Label({ text: 'Ship Via' }),
                            new Input({ id: "newShipVia" }),
                            new Label({ text: 'Freight' }),
                            new Input({ id: "newFreight" }),
                            new Label({ text: 'Ship Name' }),
                            new Input({ id: "newShipName" }),
                            new Label({ text: 'Ship Address' }),
                            new Input({ id: "newShipAddress" }),
                            new Label({ text: 'Ship City' }),
                            new Input({ id: "newShipCity" }),
                            new Label({ text: 'Ship Region' }),
                            new Input({ id: "newShipRegion" }),
                            new Label({ text: 'Ship Postal Code' }),
                            new Input({ id: "newShipPostalCode" }),
                            new Label({ text: 'Ship Country' }),
                            new Input({ id: "newShipCountry" })
                        ]
                    })
                ],
                beginButton: new Button({
                    text: 'Add',
                    press: function () {
                        this._addNewOrder();
                        oDialog.close();
                    }.bind(this)
                }),
                endButton: new Button({
                    text: 'Cancel',
                    press: function () {
                        oDialog.close();
                    }
                }),
                afterClose: function () {
                    oDialog.destroy();
                }
            });

            oDialog.open();
        },

        _addNewOrder: function () {
            var oOrdersModel = this.getView().getModel("orders");

            var oNewOrder = {
                "OrderDate": sap.ui.getCore().byId("newOrderDate").getValue(),
                "RequiredDate": sap.ui.getCore().byId("newRequiredDate").getValue(),
                "ShippedDate": sap.ui.getCore().byId("newShippedDate").getValue(),
                "ShipVia": sap.ui.getCore().byId("newShipVia").getValue(),
                "Freight": parseFloat(sap.ui.getCore().byId("newFreight").getValue()),
                "ShipName": sap.ui.getCore().byId("newShipName").getValue(),
                "ShipAddress": sap.ui.getCore().byId("newShipAddress").getValue(),
                "ShipCity": sap.ui.getCore().byId("newShipCity").getValue(),
                "ShipRegion": sap.ui.getCore().byId("newShipRegion").getValue(),
                "ShipPostalCode": sap.ui.getCore().byId("newShipPostalCode").getValue(),
                "ShipCountry": sap.ui.getCore().byId("newShipCountry").getValue()
            };

            oOrdersModel.create("/Orders", oNewOrder, {
                success: function () {
                    MessageToast.show("New order added!");
                },
                error: function () {
                    MessageToast.show("Error adding new order.");
                }
            });
        },

        onOpenViewDialog: function () {
            if (this.globalOrderId == null) {
                MessageToast.show("Please select an order to display.");
                return;
            } else {
                this.getOwnerComponent().getRouter().navTo("orderDetail", {
                    orderId: this.globalOrderId
                });
            }
        },

        onSearchOrders: function (oEvent) {
            var sSearchValue = oEvent.getParameter("query").toLowerCase();
            var oTable = this.getView().byId("orderTable");
            var oBinding = oTable.getBinding("items");

            if (oBinding) {
                var aFilters = [];
                if (sSearchValue) {
                    var oFilter = new Filter({
                        filters: [
                            new Filter("OrderID", FilterOperator.Contains, sSearchValue),
                            new Filter("ShipName", FilterOperator.Contains, sSearchValue)
                        ],
                        and: false
                    });
                    aFilters.push(oFilter);
                }

                oBinding.filter(aFilters);
            }
        },

        onOrderPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oContext = oItem.getBindingContext("orders");
            var sOrderId = oContext.getProperty("OrderID");

            this.getOwnerComponent().getRouter().navTo("OrderDetail", {
                orderId: sOrderId
            });
        }
    });
});
