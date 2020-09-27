import { browser, by, element, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export class AppPage {
   public navigateToStartPage() {
      return browser.get('http://localhost:3000/');
   }

   public async geRulesDialog(): Promise<ElementFinder> {
      const EC = protractor.ExpectedConditions;

      return await browser.driver.wait(() => {
         const el = element(by.css('app-page-rules'));

         browser.wait(EC.visibilityOf(el), 5000);
         return el;
      });
   }
}
