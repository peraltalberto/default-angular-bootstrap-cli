import { GimWebPage } from './app.po';

describe('gim-web App', function() {
  let page: GimWebPage;

  beforeEach(() => {
    page = new GimWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
