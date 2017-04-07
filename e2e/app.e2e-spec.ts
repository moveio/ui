import { MoveioPage } from './app.po';

describe('moveio App', () => {
  let page: MoveioPage;

  beforeEach(() => {
    page = new MoveioPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
