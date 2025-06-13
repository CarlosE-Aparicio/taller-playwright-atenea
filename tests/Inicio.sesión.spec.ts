import { test, expect } from '@playwright/test';

let registeredEmail;
let registeredPassword;

test.describe('Registro de usuario', () => {
test.beforeEach(async ({ page }) => {
    // Registro de un usuario antes de ejecutar los tests
    await page.goto('http://localhost:3000/');
    await page.locator('input[name="firstName"]').fill('Juan');
    await page.locator('input[name="lastName"]').fill('Torres');
    registeredEmail = 'juantorres' + Date.now().toString() + '@gmail.com'; // Guardar el email en una variable
    registeredPassword = '123456'; // Asignar la contraseña
    await page.locator('input[name="email"]').fill(registeredEmail);
    await page.locator('input[name="password"]').fill(registeredPassword);
    await page.getByTestId('boton-registrarse').click();
    await expect(page.getByText('Registro exitoso')).toBeVisible();
}); 

test('TC-7 Verificar el inicio de sesión exitoso con datos validos', async ({ page }) => {
   await page.goto('http://localhost:3000/');
   await page.getByTestId('boton-login-header-signup').click();
   await page.locator('input[name="email"]').fill(registeredEmail);
   await page.locator('input[name="password"]').fill(registeredPassword);
   await page.getByTestId('boton-login').click();
   await expect(page.getByText('Inicio de sesión exitoso')).toBeVisible();
 }); 
});
test('TC-8 Verificar el inicio de sesión con credenciales invalidas', async ({ page }) => {
   await page.goto('http://localhost:3000/');
   await page.getByTestId('boton-login-header-signup').click();
   await page.locator('input[name="email"]').fill('prueba123@gmail.com');
   await page.locator('input[name="password"]').fill('12345');
   await page.getByTestId('boton-login').click();
   await expect(page.getByText('Invalid credentials')).toBeVisible();
})