

//initialize objectStores
var dbPromise = idb.open('posts-store', 1, function (db) {
    if (!db.objectStoreNames.contains('posts')) {
      db.createObjectStore('recent-posts', {keyPath: 'id'});
    }
    
  });

//function to add post to idb poststore
function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

function addPostToIdb(st,postData) {
    return dbPromise
        .then(db => {
            toDataURL('https://cors-anywhere.herokuapp.com/' + 'https://image.tmdb.org/t/p/w500' + 
                postData.backdrop_path,(dataUrl) => {
                    if(postData.backdrop_path) {
                        postData.lowbackdrop_path = dataUrl;
                    }
                    else {
                        postData.lowbackdrop_path = null;
                    }
                    toDataURL('https://cors-anywhere.herokuapp.com/' + 'https://image.tmdb.org/t/p/w780' + 
                        postData.backdrop_path,(dataUrl) => {
                            if(postData.backdrop_path) {
                                postData.highbackdrop_path = dataUrl;
                            }
                            else {
                                postData.highbackdrop_path = null;
                            }
                            var tx = db.transaction(st,'readwrite');
                            var store = tx.objectStore(st);
                            store.put(postData);
                            return tx.complete;

                        })
                })   
        });
}
function checkPostById(st,key) {
  return dbPromise
        .then(db => {
            var tx = db.transaction(st,'readonly');
            var store = tx.objectStore(st);
            return store.get(parseInt(parseInt(key)));
        })
}

//function to delete last post if store exceeedes limmit of a store

//function to append posts from idb

function getDataFromIdb(st) {
    return dbPromise
        .then(db => {
            var tx = db.transaction(st,'readonly');
            var store = tx.objectStore(st);
            return store.getAll();
        })
}
