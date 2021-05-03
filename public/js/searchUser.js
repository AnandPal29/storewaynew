document.querySelector('.searchUser').addEventListener('click', e => {
    e.preventDefault();
   
    const name = document.getElementById('searchBox').value || undefined;
    
    if(name) {
        const url = `/searchUser/${name}`;
        window.location.href = url;
    }
});