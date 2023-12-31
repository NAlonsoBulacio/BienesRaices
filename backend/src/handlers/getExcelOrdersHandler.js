const XLSX = require('xlsx');
const { Order } = require('../db')


const getExcelOrdersHandler = async (req, res)=>{

    const orders = await Order.findAll();
  const worksheet = XLSX.utils.json_to_sheet(orders.map(order => order.toJSON()));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'TableOrders');
  const excelData = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  res.setHeader('Content-Disposition', 'attachment; filename=TableOrders.xlsx');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(excelData);
}
module.exports = {
    getExcelOrdersHandler
  };
  