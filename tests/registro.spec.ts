import { test, expect } from '@playwright/test';

test('TC-1', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.locator('input[name="firstName"]')).toBeVisible();
  await expect(page.locator('input[name="lastName"]')).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.getByTestId('boton-registrarse')).toBeVisible();

});

test('TC-2 Verificar Boton de registro esta habilitado por defecto', async ({
  page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.getByTestId('boton-registrarse')).toBeDisabled();
});

test('TC-3 Verificar que el boton de registro se habilita al completar los campos obligatorios', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.locator('input[name="firstName"]').fill('Juan');
    await page.locator('input[name="lastName"]').fill('Torres');
    await page.locator('input[name="email"]').fill('juan@email.com');
    await page.locator('input[name="password"]').fill('123456');
    await expect(page.getByTestId('boton-registrarse')).toBeEnabled();
});

test('TC-4 Verificar redireccionamiento a pagina de inicio de sesión al hacer clic en el boton de registro', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByTestId('boton-login-header-signup').click();
    await expect(page).toHaveURL('http://localhost:3000/login');
});