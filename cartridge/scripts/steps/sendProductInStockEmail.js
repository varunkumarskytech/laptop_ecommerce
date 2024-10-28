"use strict";

var File = require("dw/io/File");
var FileWriter = require("dw/io/FileWriter");
var XMLStreamWriter = require("dw/io/XMLStreamWriter");
var Status = require("dw/system/Status");
var ProductMgr = require("dw/catalog/ProductMgr");
var CustomObjectMgr = require("dw/object/CustomObjectMgr");
var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");
var Mail = require("dw/net/Mail");
var Transaction = require("dw/system/Transaction");


function importproduct(parameters) {
  var productDetails = [];
  var notifyMeIterator = CustomObjectMgr.getAllCustomObjects("NotifyMe");
  while (notifyMeIterator.hasNext()) {
    var notifyMe = notifyMeIterator.next();
    var receiverEmails = JSON.parse(notifyMe.custom.email);
    var productDetail = ProductMgr.getProduct(notifyMe.custom.productId);
    productDetails.push(productDetail);

    if (productDetail.available) {
      sendMail(receiverEmails, productDetail);
      Transaction.wrap(function () {
        CustomObjectMgr.remove(notifyMe);
      });
    }
  }            
  if (productDetails.length != 0) {
    generateProductInStockXML(parameters.FileName, productDetails);
  }
}

function sendMail(receiverEmails, productDetail) {
  receiverEmails.forEach((email) => {
    var context = new HashMap();
    context.put("productDetail", productDetail);
    context.put("email", email);
    var mail = new Mail();
    var template = new Template("email/email");
    var content = template.render(context);
    mail.addTo(email);
    mail.setFrom("devilvarun!8@gmail.com");
    mail.setSubject("Product is back in stock ");
    mail.setContent(content);
    mail.send();
  });
}

function generateProductInStockXML(fileName, productDetails) {
  var xmlFullPath = File.IMPEX + "/src/" + fileName;

  var file = new File(xmlFullPath);

  var fileWriter = new FileWriter(file, "UTF-8");

  var xsw = new XMLStreamWriter(fileWriter);

  xsw.writeStartDocument("UTF-8", "1.0");

  xsw.writeStartElement("catalog");

  xsw.writeAttribute(
    "xmlns",
    "http://www.demandware.com/xml/impex/catalog/2006-10-31"
  );

  xsw.writeAttribute("catalog-id", "apparel-m-product");

  productDetails.forEach(function (productData) {
    xsw.writeStartElement("product");

    xsw.writeAttribute("product-id", productData.ID);
    xsw.writeAttribute("product-name", productData.name);
    xsw.writeAttribute("product-avaialable", productData.available);

    // writeElement(xsw, 'display-name', { 'xml:lang': 'x-default' }, productData.name);

    // writeElement(xsw, 'display-name', { 'xml:lang': 'el-GR' }, productData[2]);

    xsw.writeEndElement(); // Closing 'product'
  });

  xsw.writeEndElement(); // Closing 'catalog'

  xsw.writeEndDocument();

  closeWriter(xsw);

  closeWriter(fileWriter);
}


function closeWriter(writer) {
  writer.flush(); // flush ensures that any remaining data in the buffer is written out.

  writer.close();
}

module.exports = {
  importproduct: importproduct,
  generateProductInStockXML: generateProductInStockXML,
  sendMail:sendMail
};
