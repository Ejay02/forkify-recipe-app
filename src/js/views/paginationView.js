import view from './view';
import * as icons from 'url:../../img/icons.svg';

class paginationView extends view {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupButton(dataGoto, label, icon) {
    return `
      <button data-goto="${dataGoto}" class="btn--inline pagination__btn--${icon}">
        ${
          icon === 'prev'
            ? `<svg class="search__icon"><use href="${icons}#icon-arrow-left"></use></svg>`
            : ''
        }
        <span>Page ${label}</span>
        ${
          icon === 'next'
            ? `<svg class="search__icon"><use href="${icons}#icon-arrow-right"></use></svg>`
            : ''
        }
      </button>
    `;
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButton(
        currentPage + 1,
        currentPage + 1,
        'next'
      );
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton(
        currentPage - 1,
        currentPage - 1,
        'prev'
      );
    }

    // Other page
    if (currentPage < numPages) {
      return (
        this._generateMarkupButton(currentPage - 1, currentPage - 1, 'prev') +
        this._generateMarkupButton(currentPage + 1, currentPage + 1, 'next')
      );
    }

    return ''; // Page 1, and there are NO other pages
  }
}

export default new paginationView();
