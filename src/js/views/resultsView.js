import view from './view';
import previewView from './previewView';
import * as icons from 'url:../../img/icons.svg';

class resultsView extends view {
  _message = '';
  _parentElement = document.querySelector('.results');
  _errorMessage = `4🌚4: Recipe not found. <br/> Please try again or add new recipe. 😉`;

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new resultsView();
