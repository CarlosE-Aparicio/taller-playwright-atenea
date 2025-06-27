import { Page, Locator } from "@playwright/test"; 

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly dashboardTitle : Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByTestId('boton-login');
    }
    async visitarPaginaLogin() {
        await this.page.goto('http://localhost:3000/login');
        await this.page.waitForLoadState('networkidle');
    }

    /*async completarFormularioRegistro(firstName: string, lastName: string, email: string, password: string){
        await this.firsNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password); 
    } */

    async completarFormularioLogin(usuario: {nombre: string, apellido: string, email: string, contraseña: string}){
        await this.emailInput.fill(usuario.email);
        await this.passwordInput.fill(usuario.contraseña);
    }        

    async hacerClickBotonLogin() {
        await this.loginButton.click();
    }

    async completarYHacerClickBotonLogin(usuario: {nombre: string, apellido: string, email: string, contraseña: string}){
        await this.completarFormularioLogin(usuario);
        await this.hacerClickBotonLogin();
    }
}

