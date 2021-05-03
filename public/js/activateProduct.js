const updateProduct = async(productId) => {
    const data = {
        isDeleted: false
    }
    try{
        const res = await axios({
            method: 'PATCH',
            url:   `/api/v1/products/${productId}`,
            data
        });
        if(res.data.status === 'success'){
            showAlert('success', 'Product Successfully Updated');
        }
    }
    catch(err){
        showAlert('error',err.response.data.message);
    }
}

document.querySelector('.activateBtn').addEventListener('click', e => {
    e.preventDefault();
    productId = document.getElementById('productId').innerText;
    console.log(productId);
    updateProduct(productId)
})