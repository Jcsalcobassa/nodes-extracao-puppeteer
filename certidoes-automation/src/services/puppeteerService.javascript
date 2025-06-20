const puppeteer = require('puppeteer');

const generatePdf = async (documentNumber) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Configurações da página
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36');

    // Navegar para a página de certidões (substitua pela URL real)
    await page.goto(`https://servico.receita.fazenda.gov.br/Servicos/certidao/CNDConjuntaInter/ConsultaPublica.asp?cnpj=${documentNumber}`, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Aguardar carregamento específico (ajuste conforme necessário)
    await page.waitForSelector('#conteudo', { timeout: 30000 });

    // Gerar PDF
    return await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
    });

  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = { generatePdf };
