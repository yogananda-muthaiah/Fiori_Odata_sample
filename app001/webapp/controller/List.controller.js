sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.accenture.empleados.app001.controller.List", {
        onInit: function () {
            // La carga del modelo JSON ya está configurada en el manifest.json
        },
        
        onFilterEmployees: function () {
            let oView = this.getView();
            let oList = oView.byId("employeeList");
            let oBinding = oList.getBinding("items");
            
            let aFilters = [];
            let sId = oView.byId("idInput").getValue();
            let sCity = oView.byId("citySelect").getSelectedKey();
            
            if (sId) {
                aFilters.push(new Filter("ID", FilterOperator.EQ, sId));
            }
            
            if (sCity) {
                aFilters.push(new Filter("ciudad", FilterOperator.EQ, sCity));
            }
            
            oBinding.filter(aFilters);
        }
    });
});
