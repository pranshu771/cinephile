




// // var spinnerClone = document.getElementById('spinner').cloneNode(true);
// // document.getElementById('spinner').remove();
// $('.dropdown-trigger').dropdown({coverTrigger: false,inDuration:400});
// $('.modal').modal({inDuration: 100});

// var firebaseConfig = {
//   apiKey: "AIzaSyB4e-2iECy_EgCElXvEk7Zgz2K790T0K74",
//   authDomain: "maps-1533826918788.firebaseapp.com",
//   databaseURL: "https://maps-1533826918788.firebaseio.com",
//   projectId: "maps-1533826918788",
//   storageBucket: "maps-1533826918788.appspot.com",
//   messagingSenderId: "225919385241",
//   appId: "1:225919385241:web:46bb29005c7f94c2"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// function getMovieData(lastDocumentRef) {
//   //showSpinner();
//   return new Promise((resolve,reject) => {
//     fetch('https://us-central1-cinephile-7ce13.cloudfunctions.net/generateFeedPosts',{
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify({
//         lastDocumentRef: lastDocumentRef
//       })


//     })
//       .then(response => {
//         return response.json()
//           .then(result => {
            
//             var resultArray = result.array;
//             var resultArrayLength = resultArray.length;
//             for(let i = 0;i < resultArrayLength;i++) {
//               checkPostById('recent-posts',resultArray[i].id)
//                 .then(data => {
//                   if(data === undefined) {

//                   }
//                   else {
//                     resultArray.splice(i,1);
//                   }
//                 })
//               if(i === resultArrayLength - 1) {
//                 console.log(resultArray);
//                 resolve(result);
//               }
//             }

            
//           })
//       })
//       .catch(err => {
//         //hideSpinner();
//       })
//   })
// }

// //when this gets cleared it was working

// //appends posts to parent element in content section
// //writes movie-title
// //implements like,unlike,add to watchlist functionality
// //function-calls
// //->clickpost(scope on whole post)
// // -> lazyload - lazy loads the image
// // -> observelast and append - observe last post in maincontent section then calls appendpost
// function appendPostsFromIdb() {
//   getDataFromIdb('recent-posts')
//     .then(data => {
//       data.forEach((item,index,array) => {

//         let post = document.querySelector('.idb-post').cloneNode(true);
//         post.setAttribute('id',item.id);
//         post.style.display = 'block';
//         let poster = post.querySelector('img');
//         clickPost(poster);
//         lazyLoad(poster,item.backdropPath);


//         let row = document.querySelector('.idb-posts');
//         row.appendChild(post);
//       })
//     })
//     .catch(err => {
//       console.log(err);
//     })
// }
// appendPostsFromIdb();

// getMovieData(null)
//   .then(response => {
//     console.log(response);
//     appendPosts(response,null);
//   })
// // getMovieData(null)
// //   .then(response => {
// //     console.log(response.array[0]);
// //   })
// // function appendPosts(response,lastDocumentRef) {
// //   var responseArray = response.array;
// //   var responseArrayLength = responseArray.length;
// //   var lastDocRef = response.lastDoc;
// //   var count = 0;
// //   for(let i = 0;i<responseArrayLength;i++) {
// //     checkPostById('recent-posts',responseArray[i].id)
// //       .then(data => {
// //         if(data === undefined) {
// //           var post = document.querySelector('.post').cloneNode(true);
// //           post.style.display = 'block';
// //           var poster = post.querySelector('img');
// //           addPostToIdb('recent-posts',responseArray[i]);
// //           lazyLoad(poster,responseArray[i].backdropPath)
// //           var row = document.querySelectorAll('.row')[1];
// //           row.appendChild(post);
// //           count++;
// //         }
// //         else {
// //           console.log('In Cache');
// //         }
// //         console.log(count)
// //         if(count === 0) {
// //           if(i === responseArrayLength - 1) {
// //             getMovieData(lastDocRef)
// //               .then(result => {
// //                 appendPosts(result,lastDocRef);
// //               })
// //           }
// //         }
// //         else {
// //           if(count === 1) {
// //             observeLastAndAppend(post,lastDocRef);
// //           }
// //         }

// //       })
// //   }

// // }
// function appendPosts(response,lastDocumentRef) {
//   var responseArray = response.array;
//   var responseArrayLength = responseArray.length;
//   var lastDocRef = response.lastDoc;
//   var count = 0;
//   for(let i = 0;i<responseArrayLength;i++) {
//     var post = document.querySelector('.post').cloneNode(true);
//     post.style.display = 'block';
//     var poster = post.querySelector('img');
//     addPostToIdb('recent-posts',responseArray[i]);
//     lazyLoad(poster,responseArray[i].backdropPath)
//     var row = document.querySelectorAll('.row')[1];
//     row.appendChild(post);
//     count++;
//     if(i === responseArrayLength - 1) {
//       observeLastAndAppend(post,lastDocRef);
//     }
//   }

// }
// function observeNavbar(response,parentEl) {
//   console.log(parentEl)
// }

// //clickpost function - on clicking on post directs to page having info about that post
// function clickPost(el) {
//   el.addEventListener('click',(e) => {
//     var elID = el.id;
//     window.location.href = '/rts/' + elID;
//   })
// }


// //if last post intersects with viewport call appendMore posts
// function observeLastAndAppend(el,lastDocumentRef) {
//   //console.log('inside observeLastAndAppend')
//   var options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: 0
//   };

//   var callback = function(entries,observer) {
//     entries.forEach(entry => {
//       if(entry.isIntersecting) {
//         // appendPosts(lastDocumentRef);
//         getMovieData(lastDocumentRef)
//           .then(response => {
//             appendPosts(response,lastDocumentRef)
//           })
//         observer.unobserve(el)
//       }
//     })
//   };
//   var observer = new IntersectionObserver(callback,options);
//   observer.observe(el);

// }
// //function lazyload
// // -> when a post having a template image comes into viewport it replaces
// // -> template image with movi poster
// function lazyLoad(el,URL) {
//   var options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: 0
//   };
//   var callback = function(entries,observer) {
//     entries.forEach(entry => {
//       if(entry.isIntersecting) {
//         if(URL) {
//           var pictureEl = el.parentNode;
//           var sourceEl = pictureEl.querySelectorAll('source');
//           sourceEl[0].setAttribute('srcset','https://image.tmdb.org/t/p/w500' + URL);
//           sourceEl[1].setAttribute('srcset','https://image.tmdb.org/t/p/w780' + URL);
//           sourceEl[2].setAttribute('srcset','https://image.tmdb.org/t/p/w500' + URL);
//           sourceEl[3].setAttribute('srcset','https://image.tmdb.org/t/p/w780' + URL);
//           el.setAttribute('src','https://image.tmdb.org/t/p/w500' + URL);
//         }
//         else {

//         }

//         observer.unobserve(el)
//       }

//     })
//   };
//   var observer = new IntersectionObserver(callback,options);
//   observer.observe(el);
// }
// //showspinner()
// // -> shows circular loading spinner
// function showSpinner() {
//   spinnerClone.style.display = 'block';
//   document.body.appendChild(spinnerClone);


// }
// //hideSpinner()
// // -> hides the loading spinner
// function hideSpinner() {
//   spinnerClone.style.display = 'none';
//   spinnerClone.remove();
// }
// //postData()
// //->As of now dummy function implemented on clicking pst buton
// function showInstallButton() {
//   var postDataButton = document.querySelector('.postData');
//   postDataButton.addEventListener('click',e => {
//     if(deferredPrompt) {
//       deferredPrompt.prompt();
//       deferredPrompt.userChoice
//         .then(choiceResult =>{
//           if(choiceResult.outcome === 'dismissed') {
//             console.log('User Cancelled Installation');
//           }
//           else {
//             console.log('User added to homeScreen');

//           }
//         })
//         deferredPrompt = null;
//     }
//     else {
//       console.log(postDataButton);
//     }


//   })
// }

// //firebase config and firebaseapp initialization

// var URL;
// //when userAut state changes
// firebase.auth().onAuthStateChanged(firebaseUser => {
//   if(firebaseUser) {
//     //if user is loggen in URL stores ref to myAccount page
//       console.log(firebaseUser);
//       URL = '/myAccount';
//   }
//   else {
//     //if user is not logged in URL stores ref to /auth route-> login.html
//       console.log('Not Logged In');
//       URL = '/auth'
//   }
// })
// //clicking on userButton directs to /myAccount or /auth
// var userBtn = document.getElementById('user');
// userBtn.addEventListener('click',e => {
//   window.location.href = URL;
// });

//  function clickPostButton(movieDataArray) {
//   var postDataButton = document.querySelector('.postData');
//   postDataButton.addEventListener('click',e => {
//     fetch('https://us-central1-cinephile-7ce13.cloudfunctions.net/addPostsToDatabase', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//               },
//               body: JSON.stringify({
//                 result: movieDataArray
//               })
//             })
//               .then(function(res) {
//                 console.log('Sent data', res);
//                 if (res.ok) {
//                   res.json()
//                     .then(function(resData) {
//                       console.log(resData);

//                     });
//                 }
//               })
//               .catch(function(err) {
//                 console.log('Error while sending data', err);
//               });
//               console.log(movieDataArray);
//   })


// }

// // function toDataURL(url, callback) {
// //   var xhr = new XMLHttpRequest();
// //   xhr.onload = function() {
// //     var reader = new FileReader();
// //     reader.onloadend = function() {
// //       callback(reader.result);
// //     }
// //     reader.readAsDataURL(xhr.response);
// //   };
// //   xhr.open('GET', url);
// //   xhr.responseType = 'blob';
// //   xhr.send();
// // }

// //clickPostButton();

// function pushFetchResponseIntoArray() {
//   var resArray = new Array();
//   for(let i = 0;i<20;i++) {
//     fetch('https://api.themoviedb.org/3/movie/' + i + '?api_key=859d20db35af8be4b688c6305b8ddadb&append_to_response=credits')
//       .then(response => {
//         response.json()
//           .then(res => {
//             if(!res.status_code) {
//               resArray.push(res);
//             }
//             if(i == 19) {
//               // resArray.forEach(item => {
//               //   toDataURL('https://cors-anywhere.herokuapp.com/' + 'https://image.tmdb.org/t/p/w500' + item.backdrop_path,
//               //   (dataUrl) => {
//               //     if(item.backdrop_path) {
//               //       item.lowbackdrop_path = dataUrl;
//               //     }
//               //     else {
//               //       item.lowbackdrop_path = null;
//               //     }
//               //   });
//               //   toDataURL('https://cors-anywhere.herokuapp.com/' + 'https://image.tmdb.org/t/p/w780' + item.backdrop_path,
//               //   (dataUrl) => {
//               //     if(item.backdrop_path) {
//               //       item.highbackdrop_path = dataUrl;
//               //     }
//               //     else {
//               //       item.highbackdrop_path = null;
//               //     }
//               //   });
//               // })
//               console.log(resArray);
//               clickPostButton(resArray);
//             }
//           })
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   }
// }
// // pushFetchResponseIntoArray();

// //v2
// function notifyNewPosts() {


//   var options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: 0
//   };

//   var callback = function(entries,observer) {
//     entries.forEach(entry => {
//       if(!entry.isIntersecting) {
//         var banner = document.getElementById('newposts-notif');
//         banner.style.display = 'block';
//       }
//       else {

//       }


//       observer.unobserve(document.querySelector('.posts'))

//     })
//   };
//   var observer = new IntersectionObserver(callback,options);
//   observer.observe(document.querySelector('.posts'));


// }

// function navigateToNewPosts(el) {
//   var banner = document.getElementById('newposts-notif');
//   banner.addEventListener('click',e => {
//     console.log(el)
//     // var length = newpostsWrapper.length;
//     // var scrollpos = newpostsWrapper[0].scrollTop;
//     // window.scrollTo(scrollpos);
//     el.scrollIntoView();
//     banner.style.display = 'none';



//   })
// }
// function hideNewPostsBanner() {
//   var options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: 0
//   };

//   var callback = function(entries,observer) {
//     entries.forEach(entry => {
//       if(entry.isIntersecting) {
//         console.log('hide the banner')
//         var banner = document.getElementById('newposts-notif');
//         banner.style.display = 'none';
//       }


//       observer.unobserve(document.querySelector('.posts'))

//     })
//   };
//   var observer = new IntersectionObserver(callback,options);
//   observer.observe(document.querySelector('.posts'));

// }

