import { AnglrPage } from './app.po';

describe('anglr App', () => {
  let page: AnglrPage;

  beforeEach(() => {
    page = new AnglrPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
