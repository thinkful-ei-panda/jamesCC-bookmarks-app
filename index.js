import api from './api.js';
import store from './STORE.js';
import bookmark from './bookmark.js';


/* ACCESS STORED BOOKMARKS FROM API -> 
RENDER DOM FROM CURRENT STATE */
function main() {
  api.getBookmarks()
    .then(function(bookmarks) {
      bookmarks.forEach(function(bookmark) {
        store.addBookmark(bookmark)
      });
      bookmark.render();
    })

  bookmark.bindEventListeners();

  console.log('main ran');
}

$(main);