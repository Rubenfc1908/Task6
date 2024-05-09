const puppeteer = require('puppeteer');

(async () => {
    // Iniciar Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Event listener para capturar logs de la consola del navegador y errores
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => {
        console.error('PAGE ERROR:', error.message);
    });

    // Navegar a la página de pruebas
    await page.goto(`file://${__dirname}/test.html`, { waitUntil: 'networkidle0' });

    // Esperar a que QUnit finalice todas las pruebas
    await page.waitForFunction(() => window.QUnit && QUnit.isDone());

    // Obtener los resultados de las pruebas desde el objeto QUnit en la página
    const testResults = await page.evaluate(() => {
        return {
            passed: QUnit.config.stats.passed,
            failed: QUnit.config.stats.failed,
            total: QUnit.config.stats.total
        };
    });

    console.log(`Tests completed: ${testResults.total}, Passed: ${testResults.passed}, Failed: ${testResults.failed}`);

    // Cerrar el navegador
    await browser.close();

    // Establecer el código de salida del proceso basado en si hubo fallos o no
    process.exit(testResults.failed === 0 ? 0 : 1);
})();
