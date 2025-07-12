import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import TestData from '../data/testData.json';
import { DashboardPage } from '../pages/dashboardPage';
import { BackendUtils } from '../utils/backednUtils';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;

test.beforeEach(async ({ page }) => {
   loginPage = new LoginPage(page);
   dashboardPage = new DashboardPage(page);
   await loginPage.visitarPaginaLogin();
});

test('TC-7 Verificar inicio de sesión exitoso con credenciales válidas', async ({ page }) => {
   await loginPage.completarYHacerClickBotonLogin(TestData.usuarioValido);
   await expect(page.getByText('Inicio de sesión exitoso')).toBeVisible();
   await expect(dashboardPage.dashboardTitle).toBeVisible();
   await expect(page).toHaveURL('http://localhost:3000/dashboard');
});

test('TC-8 Intento de Login con credenciales inválidas', async ({ page }) => {
   await loginPage.completarYHacerClickBotonLogin(TestData.usuarioInvalido);
   await expect(page.getByText('Invalid credentials')).toBeVisible();
   await expect(page).toHaveURL('http://localhost:3000/login');
});

//No aplica ya que al dejar los campos vacios muestra un mensaje que no se puede leer.
test('TC-9 Intento de login con campos vacíos', async ({ page }) => {
   await loginPage.hacerClickBotonLogin();
   await expect(page.getByText('please fill out this field')).toBeVisible();
   await expect(page).toHaveURL('http://localhost:3000/login');
})

//No aplica ya que al dejar los campos vacios muestra un mensaje que no se puede leer.
test('TC-10 Intento de login con Email sin contraseña', async ({ page }) => {
   await loginPage.LoginConEmailSinContraseña(TestData.usuarioValido);
   await expect(page.getByText('please fill out this field')).toBeVisible();
});


test('TC-11 Verificación del Enlace de Registro', async ({ page }) => {
   await loginPage.visitarPaginaLogin();
   await loginPage.linkRegistrarseLogin.click();
   await expect(page).toHaveURL('http://localhost:3000/signup');
});

test('TC-12 Cierre de sesión y protección de Rutas', async ({ page }) => {
   await loginPage.visitarPaginaLogin();
   await loginPage.completarYHacerClickBotonLogin(TestData.usuarioValido);
   await expect(page).toHaveURL('http://localhost:3000/dashboard');
   await dashboardPage.hacerLogout();
   await expect(page).toHaveURL('http://localhost:3000/login');
   await dashboardPage.visitarPaginaDashboard();
   await expect(page).toHaveURL('http://localhost:3000/login');
});

test('TC-11 Loguearse con nuevo usuario creado por backend', async ({ page, request }) => {
  const nuevoUsuario = await BackendUtils.crearUsuarioPorAPI(request, TestData.usuarioValido);

  const responsePromiseLogin = page.waitForResponse('http://localhost:6007/api/auth/login');
  await loginPage.completarYHacerClickBotonLogin(nuevoUsuario);

  const responseLogin = await responsePromiseLogin;
  const responseBodyLoginJson = await responseLogin.json();

  expect(responseLogin.status()).toBe(200);
  expect(responseBodyLoginJson).toHaveProperty('token');
  expect(typeof responseBodyLoginJson.token).toBe('string');
  expect(responseBodyLoginJson).toHaveProperty('user');
  expect(responseBodyLoginJson.user).toEqual(expect.objectContaining({
    id: expect.any(String),
    firstName: TestData.usuarioValido.nombre,
    lastName: TestData.usuarioValido.apellido,
    email: nuevoUsuario.email,
  }));


  await expect(page.getByText('Inicio de sesión exitoso')).toBeVisible();
  await expect(dashboardPage.dashboardTitle).toBeVisible();

});