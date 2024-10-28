"use strict";

var File = require("dw/io/File");
var Status = require("dw/system/Status");
var ProductMgr = require("dw/catalog/ProductMgr");
var Transaction = require("dw/system/Transaction");
var Logger = require('dw/system/Logger');
var CSVStreamReader = require('dw/io/CSVStreamReader');
var FileReader = require('dw/io/FileReader');


function importproduct(parameters) {
    try {
        // Specify the path to the XML data file in WebDAV
        var filePath = new File(File.IMPEX + '/src/product/Apparel_Product.csv');
        if (!filePath.exists()) {
            Logger.error('File not found: ' + filePath.fullPath);
            return;
        }

        var reader = new FileReader(filePath);
        var csvReader = new CSVStreamReader(reader, ",");
        var csvHeader = csvReader.readNext()
        if (csvHeader === null) {
            Logger.error('Header row is empty or not found.');
            return;
        }
        var csvRow = csvReader.readNext();
        while (csvRow!=null){
           
            if (csvRow!=null) {
                var productData = {};
                for (var i = 0; i < csvHeader.length; i++) {
                    productData[csvHeader[i]] = csvRow[i]; // Store each row value based on the header name
                }


                var product = ProductMgr.getProduct(productData.ID);
                if (product) {
                   
                    Transaction.wrap(function() {
                        product.name=productData.name_default;
                    });
                } else {
                    Logger.warn('Product not found: ' + sku);
                } 
            }
        }
        csvReader.close();
        reader.close();
    } catch (e) {
        Logger.error('Error while importing product data: ' + e.message);
    }
}

module.exports = {
importproduct: importproduct,

};
