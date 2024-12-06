
$(document).ready(() => {
    let articleList;

    const articleInfoList = () => {
        console.log("Data: ", articleList)
        articleList.forEach(article => {
            $('#content').append(`
                    <div id="article_${article.id}" class="info-box">
                         ID: ${article.id}, ${article.title}, ${article.author}
                         <button id=${article.id} class="btn btn-danger" >X</button>
                    </div>
                `)
                $(`#${article.id}`).click(() => removeItem(article.id))
        })
    }

    $.get('http://localhost:3000/articles', data => {
        articleList = data
        console.log("get data: ", data)
    }).done(() => articleInfoList())


    const removeItem = id => {
        $.ajax({
            url: `http://localhost:3000/articles/${id}`,
            type: 'DELETE',
        })
    }

    $('#myForm').submit(event => {
        event.preventDefault()
        const formData ={
            title: $('#title').val(),
            author: $('#author').val()
        }
        
        $.post('http://localhost:3000/articles', formData, data =>{
            alert(`data added: Title ${data.title}, Author: ${data.author}`)
        })

        $('#myForm').trigger('reset')
    })

    $('#myForm').submit(event => {
        event.preventDefault()
        const formData ={
            id: $('#id').val(),
            title: $('#title').val(),
            author: $('#author').val(),
        }

        $.ajax({
            url: `http://localhost:3000/articles/`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(formData)
        })

        $('myUpdateForm').trigger('reset')
    })
})