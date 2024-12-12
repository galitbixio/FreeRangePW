import { test, expect } from '@playwright/test';

test.describe('Navegación en www.freerangetesters.com', () => {
  const secciones = [
    { nombre: 'Cursos', url: '/cursos', tituloEsperado: 'Cursos' },
    { nombre: 'Udemy', url: '/udemy', tituloEsperado: 'Udemy' },
    { nombre: 'Recursos', url: '/recursos', tituloEsperado: 'Recursos' },
    { nombre: 'Blog', url: '/blog', tituloEsperado: 'Free Range Testers' },
  ];

  for (const seccion of secciones) {
    test(`Validar redirección a la sección "${seccion.nombre}"`, async ({ page }) => {
      // Paso 1: Navegar a la página principal
      await test.step('Estando en la web principal', async () => {
        await page.goto('https://www.freerangetesters.com');
        await expect(page).toHaveTitle('Free Range Testers');
      });

      // Paso 2: Hacer clic en el enlace de la sección
      await test.step(`Cuando hago clic en "${seccion.nombre}"`, async () => {
        const link = page.locator('#page_header').getByRole('link', { name: seccion.nombre, exact: true });
        await link.click();
        await page.waitForURL(`**${seccion.url}`);
      });

      // Paso 3: Validar que el título de la página sea el esperado
      await test.step(`Soy redirigido a la sección con título "${seccion.tituloEsperado}"`, async () => {
        await expect(page).toHaveTitle(seccion.tituloEsperado);
      });
    });
  }
});