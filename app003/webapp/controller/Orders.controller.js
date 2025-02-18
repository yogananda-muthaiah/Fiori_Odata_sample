// controller/Orders.controller.js
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (Controller, MessageToast, JSONModel, Filter, FilterOperator,) {
  "use strict";

  return Controller.extend("com.accenture.orders.app003.controller.Orders", {

    onInit: function () {
      // Inicializar el modelo OData
      this.getView().setModel(this.getOwnerComponent().getModel());

      // Inicializar el modelo selectionScreen con datos de ejemplo
      var oSelectionScreenData = {
        ShipCountry: [],
        OrderID: "",
        Countries: [
          { "Country": "Germany" },
          { "Country": "France" },
          { "Country": "Brazil" },
          { "Country": "Belgium" },
          { "Country": "Switzerland" },
          { "Country": "Mexico" },
          { "Country": "Austria" },
          { "Country": "USA" },
          { "Country": "Finland" },
          { "Country": "Venezuela" },
          { "Country": "Italy" },
          { "Country": "Spain" },
          { "Country": "Sweden" },
          { "Country": "UK" },
          { "Country": "Ireland" },
          { "Country": "Canada" }
        ]
      };
      var oSelectionScreenModel = new JSONModel(oSelectionScreenData);
      this.getView().setModel(oSelectionScreenModel, "selectionScreen");
    },

    onFilter: function () {
      var oView = this.getView();
      var oModel = oView.getModel();
      var oSelectionScreen = oView.getModel("selectionScreen").getData();
      var aFilters = [];

      // Obtener los países seleccionados
      var aSelectedCountries = oSelectionScreen.ShipCountry || [];
      if (aSelectedCountries.length > 0) {
        var aCountryFilters = aSelectedCountries.map(function (country) {
          return new Filter("ShipCountry", FilterOperator.EQ, country);
        });
        aFilters.push(new Filter({
          filters: aCountryFilters,
          and: false
        }));
      }

      if (oSelectionScreen.OrderID) {
        aFilters.push(new Filter("OrderID", FilterOperator.EQ, oSelectionScreen.OrderID));
      }

      var oTable = this.byId("tableOrders");
      var oBinding = oTable.getBinding("items");
      oBinding.filter(aFilters);
      MessageToast.show("Filters applied");
    },

    onClearFilter: function () {
      var oView = this.getView();
      var oSelectionScreenModel = oView.getModel("selectionScreen");
      oSelectionScreenModel.setProperty("/ShipCountry", []);
      oSelectionScreenModel.setProperty("/OrderID", "");

      var oTable = this.byId("tableOrders");
      var oBinding = oTable.getBinding("items");
      oBinding.filter([]);
      MessageToast.show("Filters cleared");
    },

    onAddNewOrder: function () {
      MessageToast.show("Add new order functionality not implemented");
    },

    onModify: function (oEvent) {
      var sPath = oEvent.getSource().getBindingContext().getPath();
      var oOrder = this.getView().getModel().getProperty(sPath);
      MessageToast.show("Modify order: " + oOrder.OrderID);
    },

    onDelete: function (oEvent) {
      var sPath = oEvent.getSource().getBindingContext().getPath();
      var oModel = this.getView().getModel();

      oModel.remove(sPath, {
        success: function () {
          MessageToast.show("Order deleted");
        },
        error: function () {
          MessageToast.show("Error deleting order");
        }
      });
    },

    onOrderIDPress: function(oEvent) {
     
      if (this.globalOrderId == null){ 
        MessageToast.show("Please select a order to display.");
        return;
    }else{    
    this.getOwnerComponent().getRouter().navTo("OrderDetail", {
            OrderID: this.globalOrdertId
        });
       
    }
    },
  });
});

