/*********************************************************************
 * EVENT LISTENERS, HTML TEMPLATE GENERATORS, DOM RENDERING          * 
 * REQUIRED FOR THE APP TO PROPERLY FUNCTION                         *
**********************************************************************/

import api from './api.js';
import store from './STORE.js';




/**********************************************************************
 * GENERATOR - BOOKMARK LIST ITEM HTML (TEMPLATE USAGE)
 * @param {Object} bookmark 
**********************************************************************/

function generateBookmarkElement(bookmark) {

  console.log('generateBookmarkElement ran');

  let bookmarkHead = `
    <div class="bookmark-head">
      <h2 class="title">${bookmark.title}</h2>
      ${generateStarRating(bookmark)}
    </div>
  `;

  let bookmarkBody = '<div class="bookmark-body hidden">';

  if(bookmark.expanded) {
    bookmarkBody = '<div class="bookmark-body">';
  }

  bookmarkBody += `
      <p class="description">${bookmark.desc}</p>
      <div class="bookmark-button-row">
        <button class="site-button button">Visit</button>
        <button class="delete-button button">Delete</button>
      </div> 
    </div>
  `;

  return `
    <div class="bookmark" data-bookmark-id="${bookmark.id}">
      ${bookmarkHead}
      ${bookmarkBody}
    </div>
  `;
}



////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
/**********************************************************************
 * GENERATOR - BOOMARK STAR-RATINGS HTML (TEMPLATE USAGE)
 * @param {Object} bookmark
**********************************************************************/
function generateStarRating(bookmark) {

  console.log('generateStarRating ran');

  let defaultClass = 'fa fa-star';
  let checkedClass = 'fa fa-star checked';
  return `
    <div class="star-rating">
      <span class="${bookmark.rating >= 1 ? checkedClass : defaultClass}"></span>
      <span class="${bookmark.rating >= 2 ? checkedClass : defaultClass}"></span>
      <span class="${bookmark.rating >= 3 ? checkedClass : defaultClass}"></span>
      <span class="${bookmark.rating >= 4 ? checkedClass : defaultClass}"></span>
      <span class="${bookmark.rating >= 5 ? checkedClass : defaultClass}"></span>
    </div>
  `;
}
////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////



/***************************************************************************
 * GENERATOR - BOOKMARK LIST HTML 
 * @param {Array} bookmarkList 
****************************************************************************/
function generateBookmarksString(bookmarkList) {

  console.log('generateBookmarksString ran');

  const bookmarks = bookmarkList.map((bookmark) => generateBookmarkElement(bookmark));
  return bookmarks.join('');
}

/****************************************************************************
 * GENERATOR - ADD-BOOKMARK HTML (TEMPLATE USAGE)
*****************************************************************************/
function generateAddBookmark() {

  console.log('generateAddBookmark ran');

  return `
    <form class="add-bookmark">

      <label for="title">Name of Website</label>
      <input type="text" placeholder="Rainbow Connection" name="title" required>

      <label for="link">URL of Website</label>
      <input type="text" placeholder=https://muppet.fandom.com/wiki/Rainbow_Connection" name="link" required>

      <label for="description">Brief Description</label>

      <textarea form="add-bookmark" name="description" type="text" placeholder="Someday we'll find it, That Rainbow Connection, The lovers the dreamers and me"></textarea>
      
      <div class="flex-wrap">
        <label for="rating">Rating</label>
        <div class="rating" name="rating">

          <input id="star5" name="star" type="radio" value="5" class="radio-btn hidden" />
          <label for="star5">&#9733</label>

          <input id="star4" name="star" type="radio" value="4" class="radio-btn hidden"/>
          <label for="star4">&#9733</label>

          <input id="star3" name="star" type="radio" value="3" class="radio-btn hidden"/>
          <label for="star3">&#9733</label>

          <input id="star2" name="star" type="radio" value="2" class="radio-btn hidden"/>
          <label for="star2">&#9733</label>

          <input id="star1" name="star" type="radio" value="1" class="radio-btn hidden"/>
          <label for="star1">&#9733</label>

        </div>
      </div>

      <div class="add-bookmark-buttons js-add-bookmark-control">
          <button class="cancel-button">Cancel</button>
          <input type="submit" class="submit-button">
      </div>
    </form>`;
}

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


/***************************************************************************
 * GET BOOKMARK LIST ITEM (USE ID)
 * @param {Object} bookmark 
***************************************************************************/
function getIdFromElement(bookmark) {

  console.log('getIdFromElement ran');

  return $(bookmark).closest('.bookmark').data('bookmark-id');
}



/********************************************************************************
 * RENDER APPLICATION DOM TO VIEWPORT
********************************************************************************/
function render() {

  console.log('render ran');

  let html = '';

  // CHECK - User Add Bookmark
  if(store.adding) {
  // GENERATE - HTML
    html = generateAddBookmark();
  } else {
  // FILTER - Bookmarks by Rating
    let bookmarks = [...store.bookmarks];
    if(store.filter > 0) {
      bookmarks = bookmarks.filter(bookmark => bookmark.rating >= store.filter);
    }
  // GENERATE - Bookmark String HTML
    html = generateBookmarksString(bookmarks);
  }

  $('.bookmark-container').html(html);
}




/////////////////////////////////////////////////////////////////
/////////////////// HANDLE EVENT LISTENERS //////////////////////
/////////////////////////////////////////////////////////////////


////////////////////////////////
////////////////////////////////
/*************************************************************************
 * HANDLER - CLICK ADD BOOKMARK BUTTON
**************************************************************************/
function handleAddBookmarkClicked() {

  console.log('handleAddBookmarkClicked ran');

  $('.add-button').click(function(event) {
    store.adding = true;
    $('.js-add-bookmark-control').addClass('hidden');
    render();
  });
}



////////////////////////////////
////////////////////////////////
/*************************************************************************
 * HANDLER - SET RATINGS FILTER
**************************************************************************/
function handleFilterChange() {

  console.log('handleFilterChange ran');

  $('.filter').on('change', function(event) {
    event.preventDefault();
    let filter = $('.filter').val();
    store.filter = filter;
    render();
  });
}





////////////////////////////////
////////////////////////////////
/***************************************************************************
 * HANDLER - CLICK BOOKMARK DETAILS EXPAND/CONDENSE
***************************************************************************/
function handleBookmarkClick() {

  console.log('handleBookmarkClick ran');

  $('.bookmark-container').on('click', '.bookmark', function(event) {
    store.toggleExpandBookmark(getIdFromElement(event.currentTarget));
    render();
  });
}



////////////////////////////////
////////////////////////////////
/**************************************************************************
 * HANDLER - CLICK VISIT SITE BUTTON
***************************************************************************/
function handleVisitSiteClicked() {

  console.log('handleVisitSiteClicked ran');

  $('.bookmark-container').on('click', '.site-button', function(event) {
    event.preventDefault();
    let bookmark = store.findById(getIdFromElement(event.currentTarget));
    window.open(`${bookmark.url}`, '_blank');
  });
}



////////////////////////////////
////////////////////////////////
/****************************************************************************
 * HANDLER - CLICK DELETE BUTTON
*****************************************************************************/
function handleDeleteBookmarkClicked() {

  console.log('handleDeleteBookmarkClicked ran');

  $('.bookmark-container').on('click', '.delete-button', function(event) {
    event.preventDefault();
    const id = getIdFromElement(event.currentTarget);
    api.deleteBookmark(id)
      .then(function() {
        store.deleteBookmark(id);
        render();
      })
  });
}


////////////////////////////////
////////////////////////////////
/****************************************************************************
 * HANDLER - CLICK CANCEL BUTTON
*****************************************************************************/
function handleCancelButtonClicked() {

  console.log('handleCancelButtonClicked ran');

  $('.bookmark-container').on('click', '.cancel-button', function(event) {
    event.preventDefault();
    store.adding = false;
    $('.js-add-bookmark-control').removeClass('hidden');
    render();
  });
}


////////////////////////////////
////////////////////////////////
/****************************************************************************
 * HANDLER - SUBMIT 'ADD BOOKMARK' FORM
*****************************************************************************/
function handleAddBookmarkSubmit() {

  console.log('handleAddBookmarkSubmit ran');

  $('.bookmark-container').on('submit', '.add-bookmark', function(event) {
    event.preventDefault();
    let title = $('input[name="title"]').val();
    let link = $('input[name="link"]').val();
    let rating = $('input[name="star"]:checked').val();
    let description = $('textarea[name="description"]').val();
    api.createBookmark(title, link, description, rating)
      .then(function(newBookmark) {
        store.addBookmark(newBookmark);
        store.adding = false;
        $('.js-add-bookmark-control').removeClass('hidden');
        render();
      })
  });
}



/******************************************************************************
 * RUN EVENT HANDLER FUNCTIONS
 *****************************************************************************/
function bindEventListeners() {

  console.log('bindEventListeners ran');

  handleAddBookmarkClicked();
  handleFilterChange();
  handleBookmarkClick();
  handleVisitSiteClicked();
  handleDeleteBookmarkClicked();
  handleCancelButtonClicked();
  handleAddBookmarkSubmit();
}

export default {
  render,
  bindEventListeners
};