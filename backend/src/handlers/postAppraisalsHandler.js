const { mailHandler } = require('./postMailHandler');
const postAppraisalsController = require('../controllers/postAppraisalsController');

const postAppraisalsHandler = async (req, res) => {
  try {
    const { name, lastName, email, phone, mobile, comment, address, callTime, userId } =
      req.body;

    const AppraisalPosted = await postAppraisalsController(
      name,
      lastName,
      email,
      phone,
      mobile,
      comment,
      address,
      callTime,
      userId
    );
    const asunto = 'Consulta con Henry Real State';
    const destinatario = email;
    const cuerpo = `Buenas ${name} ${lastName}. Gracias por comunicarte con nosotros. Estamos analizando tu consulta por tasacion y te contactaremos a la brevedad.`
    await mailHandler(destinatario, asunto, cuerpo);

    return res.status(200).json(AppraisalPosted);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postAppraisalsHandler,
};
