function initModel() {
	var sUrl = "/northwind-service/V2/Northwind/Northwind.svc/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}