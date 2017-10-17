// Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookMark);

// Save Bookmark
function saveBookMark(e) {
  // Get form values  
var siteName =document.getElementById("siteName").value;
var siteUrl =document.getElementById("siteUrl").value;

if(!validateForm(siteName, siteUrl)) {
    return false;
}

var bookmark = {
    name: siteName,
    url: siteUrl
}
 
// Test if bookmarks is null (in local storage)
if(localStorage.getItem('bookmarks') === null) {
    // Initialize array
    var bookmarks = [];
    // Add to array 
    bookmarks.push(bookmark);
    // Set to localStorage and set the JSON array to a string before its stored in localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
} else {
    // Get bookmarks from localStorage and parse into JSON from its string format
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // Add bookmark (the varibale with site...values) to array
    bookmarks.push(bookmark);
    // Re-set back to localStorage 
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// Clear form
document.getElementById('myForm').reset();

// Re-fetch bookmarks 
fetchBookmarks();

// Prevent Form from submitting 
    e.preventDefault();
}

// Delete bookmark function
function deleteBookmark(url) {
 // Get bookmarks from localStorage 
 var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
 // Loop through bookmarks
 for(var i = 0;i < bookmarks.length;i++) {
   if(bookmarks[i].url == url) {
     // Remove from array
     bookmarks.splice (i, 1);
   }
  }
  // Re-set back to localStorage 
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Re-fetch bookmarks (so you don't have to reload to see the bookmark is now gone)
  fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
 // Get bookmarks from localStorage and parse into JSON from its string format
 var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
// Get output id
 var bookmarksResults = document.getElementById("bookmarksResults");

 // Build output
 bookmarksResults.innerHTML = '';
 for(var i = 0; i < bookmarks.length; i++) {
  var name = bookmarks[i].name;
  var url = bookmarks[i].url;

  bookmarksResults.innerHTML += '<div class="card card-body bg-light">' +
                                '<h3>'+name+
                                ' <a class="btn btn-primary visit-btn" target="_blank" href="'+url+'">Visit</a> ' +
                                ' <a onclick= "deleteBookmark(\''+url+'\')"class="btn btn-danger" href="#">Delete</a> ' +
                                '</h3>'+
                                '</div>';
 }
}


// Validate Form
function validateForm(siteName, siteUrl) {
    // Alert if nothing is either one of the fields is not filled in
if(!siteName || !siteUrl) {
    alert ('Please fill in the form');
    return false;
    }
    
    // Regular Expression for https 
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if(!siteUrl.match(regex)) {
    alert ('Please use a valid URL');
    return false;
    }

    return true;
}