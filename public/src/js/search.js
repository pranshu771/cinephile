$('.dropdown-trigger').dropdown({coverTrigger: false,inDuration:400});
$('.modal').modal({inDuration: 100});

function sendData() {
    var searchBar = document.querySelector('#searchbar input');
    var typingTimer;                //timer identifier
    var doneTypingInterval = 500;
    searchBar.addEventListener('keyup',e => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    })
    searchBar.addEventListener('keydown',e => {
        clearTimeout(typingTimer);
    })
    function doneTyping() {
        console.log(JSON.stringify({
            query: searchBar.value
        }))
        fetch('/getQueryResult?query=' + searchBar.value)
        .then(response => {
            response.json()
                .then(res => {
                    
                    res.forEach((element,index,array) => {
                        
                        let resultListParent = document.querySelector('#results');
                        // let resultList = document.querySelector('.search-item').cloneNode(true);
                        if(index === 0) {
                            
                            clearAllChild(resultListParent)
                        }
                        
                        // if(element.title !== undefined) {
                        //     resultList.querySelector('span').textContent = element.title;
                        //     resultList.setAttribute('id',element.id);
                        //     let imageUrl;
                        //     if(element.backdrop_path) {
                        //         imageUrl = 'https://image.tmdb.org/t/p/w185' + element.backdrop_path;
                        //     }
                        //     else {
                        //         imageUrl = null;
                        //     }
                        //     resultList.querySelector('img').style.display = 'inline';
                        //     resultList.querySelector('img').src = imageUrl;
                        //     resultListParent.appendChild(resultList);
                        //     clickMovieResult(resultList);
                        // }
                        // else if(element.username !== undefined) {
                        //     resultList.querySelector('span').textContent = element.username;
                        //     resultListParent.appendChild(resultList);
                            
                        // }
                        // else {

                        // }
                        
                        if(element.username) {
                            let resultList = document.querySelector('.search-item').cloneNode(true);
                            resultList.querySelector('span').textContent = element.username;
                            resultList.setAttribute('id',element.username);
                            let imageUrl = '/src/images/placeholder.png'

                            resultList.querySelector('img').style.display = 'inline';
                            resultList.querySelector('img').src = imageUrl;
                            resultListParent.appendChild(resultList);
                            clickPerson(resultList)
                            
                        }
                        else if(element.title){
                            let resultList = document.querySelector('.search-item').cloneNode(true);
                            resultList.querySelector('span').textContent = element.title;
                            resultList.setAttribute('id',element.id);
                            let imageUrl;
                            if(element.backdrop_path) {
                                imageUrl = 'https://image.tmdb.org/t/p/w185' + element.backdrop_path;
                            }
                            else {
                                imageUrl = '/src/images/placeholder.png'
                            }
                            
                            resultList.querySelector('img').style.display = 'inline';
                            resultList.querySelector('img').src = imageUrl;
                            resultListParent.appendChild(resultList);
                            clickMovieResult(resultList)
                        }
                        
                        
                        
                        
                    });
                    
                })
                .catch(err => {
                    console.log(err);
                })
        })
    }
}
sendData();
function clearAllChild(el) {
   
    // while(el.firstChild) {
    //     if(el.querySelector('.search-item').id==='org') {
    //         console.log('Don')
    //     }
    //     else {
    //         let resultList = document.querySelector('.search-item');
    //         el.removeChild(el.firstChild);
    //     }
        
        
    // }
    
    var x = el.children;
    
    Array.from ( x ) .forEach (((x) => { 
        if(x.id === 'org') {

        }
        else {
            el.removeChild(x)
        }
    }));
    
}
function clickMovieResult(el) {
    
    el.addEventListener('click',e => {
        window.location.href = '/movie/' + el.id
    })
}
function clickPerson(el) {
    el.addEventListener('click',e => {
        window.location.href = '/myAccount/' + el.id
    })
}
