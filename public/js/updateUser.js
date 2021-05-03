const deactivateUser = async(userId) => {
    const data ={
        isActive: false
    }
    try{
        const res = await axios({
            method: 'PATCH',
            url:   `/api/v1/users/${userId}`,
            data
        });
        if(res.data.status === 'success'){
            showAlert('success', 'User Successfully Updated');
        }
    }
    catch(err){
        showAlert('error',err.response.data.message);
    }
}

document.querySelector('.deactivateBtn').addEventListener('click', e => {
    e.preventDefault();
    const userId = document.getElementById('userId').value;
    deactivateUser(userId);
})

const activateUser = async(userId) => {
    const data ={
        isActive: true
    }
    try{
        const res = await axios({
            method: 'PATCH',
            url:   `/api/v1/users/${userId}`,
            data
        });
        if(res.data.status === 'success'){
            showAlert('success', 'User Successfully Updated');
        }
    }
    catch(err){
        showAlert('error',err.response.data.message);
    }
}


document.querySelector('.activateBtn').addEventListener('click', e => {
    e.preventDefault();
    const userId = document.getElementById('userId').value;
    activateUser(userId);
})