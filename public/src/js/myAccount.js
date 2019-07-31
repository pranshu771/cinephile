fetch('/myAccount/:id')
.then(response => {
    response.json()
    .then(res=> {
        console.log(res);
    })
})