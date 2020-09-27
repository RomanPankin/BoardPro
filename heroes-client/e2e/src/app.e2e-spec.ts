import { AppPage } from './app.po';

describe('workspace-project App', () => {
   let page: AppPage;

   beforeEach(() => {
      page = new AppPage();
   });

   it('should display rules', async () => {
      page.navigateToStartPage();

      expect((await page.geRulesDialog()).isPresent()).toBeTruthy();
   });
});
