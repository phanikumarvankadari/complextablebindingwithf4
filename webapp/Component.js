sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/ui5/table/binding/TaBinding/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.ui5.table.binding.TaBinding.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();
			
			
			//var oModel = this.getModel("MDL1");
		/*	var oModel = new sap.ui.model.json.JSONModel(this.getModel().sServiceUrl+'/Categories?$format=json&$expand=Products');
			this.setModel(oModel,'MDL1');
			
			oModel = new sap.ui.model.json.JSONModel(this.getModel().sServiceUrl+'/Products?$format=json&$expand=Order_Details');
			this.setModel(oModel,'MDL2');
			// set the device model
			*/
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});