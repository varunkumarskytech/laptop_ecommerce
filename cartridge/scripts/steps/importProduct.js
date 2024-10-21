// ImportProductDataJob.js
const File = require('dw/io/File');
const FileReader = require('dw/io/FileReader');
const FileWriter = require('dw/io/FileWriter');
const FileSystem = require('dw/io/FileSystem');
const FileUtils = require('dw/io/FileUtils');
const ProductMgr = require('dw/catalog/ProductMgr');
const Transaction = require('dw/system/Transaction');
const Logger = require('dw/system/Logger');

function ImportProductDataJob() {

            // Specify the path to the data file
            const filePath = FileSystem.getFile('C:\Users\user\Downloads\Apparel_Catalog (1).csv');
            const reader = new FileReader(filePath);
            let line;

            while ((line = reader.readLine()) !== null) {
                const data = line.split(',');

                // Assuming the CSV has: SKU, Price, Inventory
                const sku = data[0].trim();
                const price = parseFloat(data[1].trim());
                const inventory = parseInt(data[2].trim());

                const product = ProductMgr.getProduct(sku);
                if (product) {
                    // Update product price and inventory
                    Transaction.wrap(function() {
                        product.setPriceModel(price);
                        product.setInventoryRecord(inventory);
                        Logger.info('Updated product: ' + sku);
                    });
                } else {
                    Logger.warn('Product not found: ' + sku);
                }

            reader.close();
        } 
            Logger.error('Error while importing product data: ' + e.message);
        
    }


module.exports = ImportProductDataJob;
