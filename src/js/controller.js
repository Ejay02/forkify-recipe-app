import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import { MODAL_CLOSE_SEC } from './config';

//from parcel not js
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage()); // update results view and highlight selected result

    bookmarksView.update(model.state.bookmarks); //updating bookmarks view

    await model.loadRecipe(id); // Loading recipe

    recipeView.render(model.state.recipe); // render recipe
  } catch (e) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery(); // get search query

    if (!query) return;

    await model.loadSearchResult(query); // load query results

    resultsView.render(model.getSearchResultsPage()); // render results

    paginationView.render(model.state.search); //render pagination button
  } catch (e) {
    console.log('e:', e);
    throw e;
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage)); // render new results

  paginationView.render(model.state.search); //render new pagination button
};

const controlServings = function (newServings) {
  model.updateServings(newServings); // update serving in the state

  // recipeView.render(model.state.recipe); // render recipe && update view
  recipeView.update(model.state.recipe); // render recipe && update view
};

const controlAddBookmark = function () {
  // add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe); // update recipe view

  bookmarksView.render(model.state.bookmarks); // render bookmarks
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner(); //show loading state

    await model.uploadRecipe(newRecipe); // upload the new recipe

    recipeView.render(model.state.recipe); //render recipe

    addRecipeView.renderMessage(); // success message

    bookmarksView.render(model.state.bookmarks); //render bookmark view

    window.history.pushState(null, '', `#${model.state.recipe.id}`); // change url id

    //close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (e) {
    console.log('error:', e);
    addRecipeView.renderError(e.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
