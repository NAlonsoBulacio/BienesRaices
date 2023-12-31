const XLSX = require('xlsx');
const { User } = require('../db')


const getExcelUsersHandler = async (req, res)=>{

    const users = await User.findAll();
  const worksheet = XLSX.utils.json_to_sheet(users.map(user => user.toJSON()));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'TableUsers');
  const excelData = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  res.setHeader('Content-Disposition', 'attachment; filename=TableUsers.xlsx');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(excelData);
}
module.exports = {
    getExcelUsersHandler
  };
  