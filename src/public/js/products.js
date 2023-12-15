document.addEventListener('DOMContentLoaded', function (){
    
    // Add Product Button
    const addProductButton = document.querySelector('button#addProductButton');
    const addProductForm = document.querySelector('div#AddProduct');

    addProductButton.addEventListener('click', function () {
        addProductForm.style.display = 'block';

    });

    const submitAddProductButton = document.querySelector('#submitAddProduct');
    submitAddProductButton.addEventListener('click', function () {
        const title = document.querySelector('#addTitle').value;
        const description = document.querySelector('#addDescription').value;
        const price = document.querySelector('#addPrice').value;
        const stock = document.querySelector('#addStock').value;

        const payload = {
            title: title,
            description: description,
            price: price,
            stock: stock
        };

        fetch('/api/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).then(response => {
            if (response.ok) {
                console.log('Product added successfully');
            } else {
                console.log('Product added successfully');

            }
        });
    });
        const addToCartButtons = document.querySelectorAll('button[userId][productId]');
        addToCartButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                const userId = button.getAttribute('userId');
                const productId = button.getAttribute('productId');
                const quantityInputId = `#quantityProduct_${productId}`;
                const quantity = document.querySelector(quantityInputId).value;
                fetch(`/api/carts/${userId}/products/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ quantity: quantity }),
                }).then(response => {
                    if (response.ok) {
                        console.log(`Product with ID ${productId} added to the cart for user ${userId}`);
                    } else {
                        console.error('Error adding product to the cart');
                    }
                }).catch(error => {
                    console.error('Error:', error);
                });
            });
        });
 

    // Edit Product Buttons
    const editProductButtons = document.querySelectorAll('button#editButton');
    editProductButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const editId = button.getAttribute('editId');
            const editProductForm = document.querySelector(`div.editProduct[editId="${editId}"]`);

            if (editProductForm) {
                editProductForm.style.display = 'block';
            }
        });
    });

    const submitEditProductButton = document.querySelector('#submitEditProduct');
    submitEditProductButton.addEventListener('click', function () {
        const editId = document.querySelector('#editButton').getAttribute('editId');
        const title = document.querySelector('#editTitle').value;
        const description = document.querySelector('#editDescription').value;
        const price = document.querySelector('#editPrice').value;
        const stock = document.querySelector('#editStock').value;

        const payload = {
            title: title,
            description: description,
            price: price,
            stock: stock
        };

        fetch(`/api/products/${editId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => {
            if (response.ok) {
                console.log(`Product with ID ${editId} edited successfully`);
            } else {
                console.error('Error editing product');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });


    // Delete Product Buttons
    const deleteProductButtons = document.querySelectorAll('button#deleteButton');
    deleteProductButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const productId = button.getAttribute('deleteId');
    
            const confirmDelete = confirm('Are you sure you want to delete this product?');
    
            if (confirmDelete) {
                fetch(`/api/products/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId: productId }),
                })
                .then(response => {
                    if (response.ok) {
                        console.log(`Product with ID ${productId} deleted`);
                    } else {
                        console.error('Error deleting product');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        });
    });
});