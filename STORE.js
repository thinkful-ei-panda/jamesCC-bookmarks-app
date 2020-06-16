const bookmarks = [];
let adding = false;
let filter = 0;



/***************************************
 * FIND BOOKMARK (USE ID)
 * @param {String} id
****************************************/
function findById(id) {
  console.log('findById ran');
  
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
}


/***************************************
 * ADD BOOKMARK TO STORE/LIST
 * @param {Object} bookmark 
****************************************/
function addBookmark(bookmark) {
  this.bookmarks.push(bookmark);

  console.log('addBookmark ran');
}


/***************************************
 * UPDATE BOOKMARK STORE/LIST (USE ID)
 * @param {String} id 
 * @param {Object} newData 
****************************************/
function updateBookmark(id, newData) {
  const currentBookmark = this.findById(id);
  Object.assign(currentBookmark, newData);

  console.log('updateBookmark ran');
}


/***************************************
 * REMOVE BOOKMARK STORE/LIST (USE ID)
 * @param {String} id 
****************************************/
function deleteBookmark(id) {
  this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);

  console.log('deleteBookmark ran');
}


/***************************************
 * TOGGLE EXPAND/CONTRACT BOOKMARK (USE ID)
 * @param {String} id 
****************************************/
function toggleExpandBookmark(id) {
  let bookmark = this.findById(id);
  bookmark.expanded = !bookmark.expanded;

  console.log('toggleExpandBookmark ran');
}


/***************************************
 * TOGGLE ADD
****************************************/
function toggleAdding() {
  this.adding = !this.adding;

  console.log('toggleAdding ran');
}


/***************************************
 * SET RATINGS FILTER
 * @param {Number} num 
****************************************/
function setRatingsFilter(num) {
  this.filter = num;

  console.log('setRatingsFilter ran');
}



export default {
  bookmarks,
  adding,
  filter,
  findById,
  addBookmark,
  updateBookmark,
  deleteBookmark,
  toggleExpandBookmark,
  toggleAdding,
  setRatingsFilter
}