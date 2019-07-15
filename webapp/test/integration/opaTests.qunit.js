/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/ui5/table/binding/TaBinding/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});