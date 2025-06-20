const puppeteerService = require('../services/puppeteerService');
const { formatCpf, formatCnpj } = require('../utils/formatUtils');

exports.downloadCertidoes = async (req, res) => {
  try {
    const { cpf, cnpj } = req.body;
    
    if (!cpf && !cnpj) {
      return res.status(400).json({ error: 'CPF ou CNPJ é obrigatório' });
    }

    const formattedDoc = cpf ? formatCpf(cpf) : formatCnpj(cnpj);
    const pdfBuffer = await puppeteerService.generatePdf(formattedDoc);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=certidao_${formattedDoc}.pdf`
    });
    res.send(pdfBuffer);
    
  } catch (error) {
    console.error('Erro ao gerar certidão:', error);
    res.status(500).json({ error: 'Erro ao processar certidão' });
  }
};
