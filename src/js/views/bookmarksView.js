import previewView from './previewView';
import view from './view';
import * as icons from 'url:../../img/icons.svg';

class bookmarksView extends view {
  _message = '';
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `4🌚4: No bookmarks yet. <br/> find a nice recipe and bookmark it. 😉`;

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new bookmarksView();
