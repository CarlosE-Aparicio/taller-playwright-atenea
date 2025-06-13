import { test, expect } from '@playwright/test';

test('TC-1 Verificación de elementos visuales en la página de registro', async ({ page }) => {
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

let registeredEmail;
let registeredPassword;

test('TC-5 Verificar registro exitoso con datos válidos', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.locator('input[name="firstName"]').fill('Juan');
    await page.locator('input[name="lastName"]').fill('Torres');
    registeredEmail = 'juantorres' + Date.now().toString() + '@gmail.com'; //guardando el mail en una variable
    registeredPassword = '123456'; //Asignar la contraseña en el test de registro
    await page.locator('input[name="email"]').fill(registeredEmail);
    await page.locator('input[name="password"]').fill(registeredPassword);
    await page.getByTestId('boton-registrarse').click();
    await expect(page.getByText('Registro exitoso')).toBeVisible();
});

test('TC-6 Verificar que un usuario no pueda registrarse con un correo electronico ya existente', async ({ page }) => {
    //const email = 'Juan'+ Date.now().toString() + '@gmail.com';
    await page.goto('http://localhost:3000/');
    await page.locator('input[name="firstName"]').fill('Juan');
    await page.locator('input[name="lastName"]').fill('Torres');
    registeredEmail = 'juantorres' + Date.now().toString() + '@gmail.com'; //guardando el mail en una variable
    registeredPassword = '123456'; //Asignar la contraseña en el test de registro
    await page.locator('input[name="email"]').fill(registeredEmail);
    await page.locator('input[name="password"]').fill(registeredPassword);
    await page.getByTestId('boton-registrarse').click();
    await expect(page.getByText('Registro exitoso')).toBeVisible();
    await page.goto('http://localhost:3000/');
    await page.locator('input[name="firstName"]').fill('Juan');
    await page.locator('input[name="lastName"]').fill('Torres');
    await page.locator('input[name="email"]').fill(registeredEmail);
    await page.locator('input[name="password"]').fill(registeredPassword);
    await page.getByTestId('boton-registrarse').click();
    await expect(page.getByText('Email already in use')).toBeVisible();
    await expect(page.getByText('Registro exitoso')).not.toBeVisible();
});