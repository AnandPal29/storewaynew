const updateProduct = async(data, productId) => {
    // console.log(data);
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

document.querySelector('.updateBtn').addEventListener('click', e=> {
    e.preventDefault();
    const productId = document.getElementById('productId').value;
    const name = document.getElementById('name').value;
    const inOffer = document.getElementById('inOffer').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    const unit = document.getElementById('unit').value;
    const category = document.getElementById('category').value;
    const inStock = document.getElementById('inStock').value;
   
    const data = {};
    data.name = name;
    data.inOffer = inOffer;
    data.price = price;
    data.quantity = quantity;
    data.unit = unit;
    data.category = category;
    data.inStock = inStock;
    updateProduct(data, productId);
})

const updateProductImage = async(data, type, productId) => {
    try{
        const res = await axios({
            method: 'PATCH',
            url:   `/api/v1/products/updateProductImage/${productId}`,
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

document.querySelector('.updateImgBtn').addEventListener('click', e => {
    e.preventDefault();
    const detailsForm = document.querySelector('.detailsForm');
    const productId = detailsForm.firstChild.lastChild.value;
    // console.log('Update Image Clicked')
    
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('productImage', document.getElementById('productImage').files[0]);  
    updateProductImage(form, 'data', productId);
})

const deleteProduct = async(productId) => {
    console.log(productId);
    try{
        const res = await axios({
            method: 'DELETE',
            url:   `/api/v1/products/${productId}`
        });
       
        showAlert('success', 'Product Successfully Deleted');
        
    }
    catch(err){
        showAlert('error',err.response.data.message);
    }
}

document.querySelector('.deleteBtn').addEventListener('click', e => {
    e.preventDefault();
    const detailsForm = document.querySelector('.detailsForm');
    const productId = detailsForm.firstChild.lastChild.value;
    // console.log('Update Image Clicked')
    deleteProduct(productId);
})

