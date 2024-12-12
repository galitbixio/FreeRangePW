import { test, expect } from '@playwright/test';


test('Valido que todos los valores cambian en la tabla dinámica luego de un reload', async ({ page }) => {
    await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    })

    await test.step('Valido que los valores cambiaron al hacer un reload a la web', async () => {
        //Creamos un arreglo con todos los valores de la tabla dinámica
        const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
        console.log(valoresTablaDinamica);

        //Hacemos una recarga para que cambien los valores
        await page.reload();

        //Creamos un segundo arreglo con los valores luego de la recarga
        const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
        console.log(valoresPostReload);

        //Validamos que todos los valores cambiaron para cada celda.
        expect(valoresTablaDinamica).not.toEqual(valoresPostReload);
    })
 
 
}) 

test('Valido la columna Nombres de la tabla estática', async ({ page }) => {
    await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    })

    await test.step('Puedo validar los elementos para la columna Nombre de la tabla estática', async () => {
        const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
        const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];
        
        expect(valoresColumnaNombres).toEqual(nombresEsperados);
    })

})

test('Ejemplo de Soft Assertions @Sandbox', async ({ page }) => {
    await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
        await page.goto('');
    })

    await test.step('Valido que todos los elementos de los checkboxes son los correctos', async () => {
        await expect.soft(page.getByText('Pizza 🍕'), 'No se encontró el elemento Pizza 🍕').toBeVisible();
        await expect.soft(page.getByText('Hamburguesa 🍔'), 'No se encontró el elemento Hamburguesa 🍔').toBeVisible();
        await expect.soft(page.getByText('Pasta 🍝'), 'No se encontró el elemento Pasta 🍝').toBeVisible();
        await expect.soft(page.getByText('Helado 🍧'), 'No se encontró el elemento Helado 🍧').toBeVisible();
        await expect.soft(page.getByText('Torta 🍰'), 'No se encontró el elemento Torta 🍰').toBeVisible();
    })
   
    await test.step('valido que el checkbox es chequeable', async () => {
        await page.getByText('Pizza 🍕').check();
        await expect.soft(page.getByText('Pizza 🍕'), 'No se encontró el elemento Pizza 🍕').toBeChecked();
        await test.info().attach('screenshot', {
            body: await page.screenshot(),
            contentType: 'image/png',
        })
    })


})