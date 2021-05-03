document.querySelector('.searchBtn1').addEventListener('click', e => {
    e.preventDefault();

    const searchItem = document.getElementById('searchBox').value || undefined;
    if(searchItem){
        const url = `/search/${searchItem}`;
        // console.log(url)
        window.location.href = url;
    }
})

document.querySelector('.searchBtn2').addEventListener('click', e => {
    e.preventDefault();

    const category = document.getElementById('category').value || undefined;
    // console.log(category);
    if(category){
        const url = `/categories/${category}`;
        // console.log(url)
        window.location.href = url;
    }
})
