

var chips = document.querySelectorAll('.modal-content span');
Array.from(chips).forEach(v => v.addEventListener('click', function() {
    //this.classList.toggleClass('.chipclicked')
    //console.log(this.classList.length);
    if(!this.classList.length) {

        this.classList.add("chipclicked");
        console.log('Class List added');
        
    }
    else {
        this.classList.remove('chipclicked');
        console.log('class removed')
    }
    
    
  }));