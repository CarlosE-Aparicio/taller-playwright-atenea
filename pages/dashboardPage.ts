import { Page, Locator } from "@playwright/test"; 

export class DashboardPage {
    readonly page: Page;
    readonly dashboardTitle : Locator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardTitle = page.getByTestId('titulo-dashboard');
    }
    async visitarPaginaLogin() {
        await this.page.goto('http://localhost:3000/dashboard');
        await this.page.waitForLoadState('networkidle');
    }

    /*async completarFormularioRegistro(firstName: string, lastName: string, email: string, password: string){
        await this.firsNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password); 
    } */

}

