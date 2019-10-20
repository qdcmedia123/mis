const articles = document.getElementById('articles');

if(articles){
    articles.addEventListener('click',e=>{
        if(e.target.className === 'btn btn-danger delete-article'){
            if(confirm('Are you sure?')){
                const id=e.target.getAttribute('data-id');
                fetch(`/article/delete/${id}`,{
                    method: 'DELETE'
                }).then(res=>window.location.reload());
            }
        }
    })
}

function deleteById(el) {

    /*alert(el.getAttribute('data-id'));*/
    if(confirm('Really wanna delete')) {
            const id  = el.getAttribute('data-id');
            fetch(`/movie/delete/${id}`,{
                    method: 'DELETE'
                }).then(res=>window.location.reload());

    }
}