function navigateToSearchPage() {
    var searchEl = document.querySelector('.top-app-bar').querySelector('.search');
    searchEl.addEventListener('click',e => {
      window.location.href = '/search'
    })
    console.log(searchEl)
    
}

function clickPersonIcon() {
    var personIcon = document.querySelector('.top-app-bar').querySelector('.person');
    personIcon.addEventListener('click',e => {
        window.location.href = '/myAccount'
    })
    
}
function goBack() {
    var header = document.querySelector('#header-sm-md');
    if(header) {
        var backArrow = header.querySelector('i');
    }
    if(backArrow) {
        backArrow.addEventListener('click',e => {
            window.location.href = '../';
        })
    }
}


navigateToSearchPage();
clickPersonIcon();
goBack();
