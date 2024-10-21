
/* eslint-disable indent */

/* eslint-disable vars-on-top */

var File = require('dw/io/File');

var FileReader = require('dw/io/FileReader');

var CSVStreamReader = require('dw/io/CSVStreamReader');

var fileType = '.csv';

var Site = require('dw/system/Site');

var CatalogMgr = require('dw/catalog/CatalogMgr');

var Site = require('dw/system/Site');

var xmlhelper = require('~/cartridge/scripts/steps/productCreationHelper.js');

function exportCustomerList(args) {

  try {

        var fileName = args.Filename;

        var xmlFilePath = args.xmlFile;

        // Get the path to the CSV file

        var filePath = fileName + fileType;

        // Create a File object for the CSV file

        var csvFile = new File(filePath);

        // Create a FileReader for the CSV file

        var fileReader = new FileReader(csvFile, 'UTF-8');

        // Create a CSVStreamReader to read CSV data

        var csvReader = new CSVStreamReader(fileReader);

        // Read the CSV header

        var headers = csvReader.readNext();

        var fileContent = [];

        if (headers) {

            // Loop through the CSV rows

            var row;

            // eslint-disable-next-line no-cond-assign

            while ((row = csvReader.readNext()) !== null) {
 
                fileContent.push(row);

                // Process each row as needed

                // pushes the all the rows in empty array

            }

            dw.system.Logger.info('CSV Row: ' + JSON.stringify(fileContent, null, 2));

            // eslint-disable-next-line no-undef

            xmlhelper.generateProductXML(xmlFilePath,fileContent);

        }

    } catch (e) {

        // Handle any exceptions that may occur during file reading or CSV parsing and generating the xml file.

        // eslint-disable-next-line no-undef

        dw.system.Logger.error('Error reading CSV file: ' + e.message);

    }

}

module.exports = {

    exportCustomerList: exportCustomerList

};
 