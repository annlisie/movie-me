import { browser} from 'protractor';

export class MovieMe {
  navigateTo() {
    return browser.get('/');
  }

}
