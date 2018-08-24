import { YoolkContactManagementPage } from './app.po';

describe('yoolk-contact-management App', () => {
  let page: YoolkContactManagementPage;

  beforeEach(() => {
    page = new YoolkContactManagementPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
