const BASE_URL = ' https://thinkful-list-api.herokuapp.com/james';



/************************************************
 * FETCH API FUNCTION
 * @param  {String} BASE_URL
 * @param {Object} options
 * @returns {Promise} 
*************************************************/
function apiFetch(...args) {

  console.log('apiFetch ran');
  
  return fetch(...args)
    .then(function (res) {
      return res.json();
    })
    
    .then(function (data) {
      return data;
  });
}



/*************************************************
 * GET BOOKMARK LIST FROM API
*************************************************/
function getBookmarks() {

  console.log('getBookmarks ran');
  
  return apiFetch(`${BASE_URL}/bookmarks`);
}



/*************************************************
 * CREATE BOOKMARK ITEMS FROM API LIST
 * @param {String} title 
 * @param {String} url 
 * @param {String} desc 
 * @param {String} rating 
*************************************************/
function createBookmark(title, url, desc, rating) {

  console.log('createBookmark ran');

  let newBookmark = JSON.stringify({ title, url, desc, rating });
  return apiFetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newBookmark
  });
}



/*************************************************
 * UPDATE BOOKMARK API (USE ID)
 * @param {String} id 
 * @param {Object} updateData
*************************************************/
function updateBookmark(id, updateData) {

  console.log('updateBookmark ran');

  let newData = JSON.stringify(updateData);
  
  return apiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newData
  });
}



/*************************************************
 * DELETE BOOKMARK API (USE ID)
 * @param {String} id 
*************************************************/
function deleteBookmark(id) {

  console.log('deleteBookmark ran');

  return apiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE'
  });
}




export default {
  getBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark
};