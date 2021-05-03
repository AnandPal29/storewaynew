


const createProduct = async(data, type) => {
    try{
        const res = await axios({
            method: 'POST',
            url: '/api/v1/products',
            data
        });
        if(res.data.status === 'success'){
            showAlert('success', 'Product Created Successfully');
        }
    }
    catch(err){
        showAlert('error',err.response.data.message);
    }
}


document.querySelector('.createProductForm').addEventListener('submit', e => {
    e.preventDefault();

    const form = new FormData();
    form.append('name',document.getElementById('name').value);
    form.append('price', document.getElementById('price').value);
    form.append('quantity', document.getElementById('quantity').value);
    form.append('unit', document.getElementById('unit').value);
    form.append('category', document.getElementById('category').value);
    form.append('inStock', document.getElementById('inStock').value);
    form.append('productImage', document.getElementById('productImage').files[0]);
    createProduct(form, 'data');
});