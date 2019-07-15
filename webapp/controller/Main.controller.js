sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/ui/model/Filter', 'sap/ui/model/FilterOperator'
], function (Controller,Filter,FilterOperator,JSONModel) {
	"use strict";

	return Controller.extend("com.ui5.table.binding.TaBinding.controller.Main", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.ui5.table.binding.TaBinding.view.Main
		 */
		 onf4Order:function(e){
		 	
		 	var oSrc = e.getSource();
		 	var oContxt= oSrc.getParent().getCells()[2].getSelectedItem().getBindingContext('MDL1');
			
				if (!this._oMainCatDialog) {
				this._oMainCatDialog = sap.ui.xmlfragment('searchDialogPopup',
					"com.ui5.table.binding.TaBinding.view.fragment.MainCatF4",
					this
				);
			}
				this.getView().addDependent(this._oMainCatDialog);
				
				var oTemplate = sap.ui.core.Fragment.byId("searchDialogPopup",'cliItem' );
				this._oMainCatDialog.setBindingContext(oContxt,'MDL1');
				//	oTemplate = new sap.ui.core.Item({text:"{MDL1>UnitPrice}"}) ;
					oTemplate = new sap.m.ColumnListItem({cells:[new sap.m.Text({text:"{MDL1>OrderID}"})]}) ;

				this._oMainCatDialog.bindAggregation('items', {
				 			path: "MDL1>"+oContxt.getPath()+"/Orders/results/",
				 			template:  oTemplate,
				 			templateShareable: true
				 			});
				this._oMainCatDialog.open();
		 	
		 },
		 onMainCatPress:function(oEvent){
		 	var selVal = this.getView().getModel('MDL1').getProperty(oEvent.getParameter('selectedItem').getBindingContextPath()).OrderID;
		 	var oModel = this.getView().getModel('MDL1');
		 	oModel.setProperty('/'+oEvent.getParameter('selectedItem').getBindingContextPath().substring(1,2)+'/'+'selectedOrder',selVal);
		 	
		 },
		 _onObjectMatched:function(oEvent){
		 	var oView = this.getView();
		 	if(oEvent.getParameter('name')==="RouteApp"){
		 		/*debugger;
		 		this.catPro = oView.getModel("MDL1").getProperty('/d/results');
		 		this.proOrd = oView.getModel("MDL2").getProperty('/d/results');
		 		alert('mdl-'+this.catPro.length.toString()+'--mdl2-'+this.proOrd.length.toString());*/
		 		
		 		
		 		
				var url = oView.getModel().sServiceUrl+'/Categories?$format=json&$expand=Products';
			//	oModel .loadData(url, "", false);
				var oModel =  new sap.ui.model.json.JSONModel(url);
				var that = this;
				oModel.attachRequestCompleted(null,function() { 
					that.data = oModel.getData().d.results;
					var url2 = oView.getModel().sServiceUrl+'/Products?$format=json&$expand=Order_Details';
					var oM2 = new sap.ui.model.json.JSONModel(url2);
					oM2.attachRequestCompleted(null,function() { 
						var dataPart2 = oM2.getData().d.results;
						
							for (var i=0; i<that.data.length; i++) {
								var catProd = that.data[i];
									for (var j=0; j<catProd.Products.results.length; j++) {
										var productMdl1 = catProd.Products.results[j];
										
										for (var k=0; k<dataPart2.length; k++) {
											var productMdl2 = dataPart2[k];
											if(productMdl1.ProductID === productMdl2.ProductID){
												
												that.data[i].Products.results[j].Orders = dataPart2[k].Order_Details;
											}
										}
										
									}
							}//end of all for loops
							//console.log(that.data);
							oView.getModel('MDL1').setData(that.data);
					},that);
					
				},
					that);
				
				
		 		
		 		
		 		
		 	}
		 	
		 },
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
           	
            oRouter.getRoute("RouteApp").attachPatternMatched(this._onObjectMatched, this);
		},
		bindOrders:function(e){/*
			var sI=e.getParameter('selectedItem');
			var oView = this.getView();
			var oTable = oView.byId('tab');
			var mdl2 = oView.getModel('MDL2');
			var oTemplate = oTable.getBindingInfo('items').template;
			//var orderSel = oTemplate.getCells()[3];
		var oTemplateOrders =new sap.ui.core.ListItem({key:"{MDL1>OrderID}",text:"{MDL1>OrderID}"}) ;
		var oTemplateOrders2 =new sap.ui.core.Item({text:"{MDL1>OrderID}"}) ;
			var oContext= 	sI.getBindingContext('MDL1');
			var orderSel = oTemplate.getCells()[3];		
				orderSel.unbindItems();
				orderSel.setModel(oView.getModel('MDL1'),'MDL1');
				orderSel.setBindingContext(oContext,'MDL1');
				
				orderSel.bindItems( {
							path: "MDL1>"+oContext.getPath()+"/Orders/results/",
							template: oView.byId('phani'), //oTemplateOrders,
							templateShareable: true
							});
							
				var selInp = oTemplate.getCells()[4];		
				selInp.setModel(oView.getModel('MDL1'),'MDL1');
				selInp.setBindingContext(oContext,'MDL1');
				
					selInp.bindAggregation('suggestionItems', {
							path: "MDL1>"+oContext.getPath()+"/Orders/results/",
							template:oTemplateOrders2 , //oTemplateOrders,
							templateShareable: true
							});		
							
							
							
							
			
			
		*/}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.ui5.table.binding.TaBinding.view.Main
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.ui5.table.binding.TaBinding.view.Main
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.ui5.table.binding.TaBinding.view.Main
		 */
		//	onExit: function() {
		//
		//	}

	});

});