const socket = io();

const form = document.getElementById('form');
const listProducts = document.getElementById('listProducts');

function updateProductList(products) {
    let listHTML = '';
    products.forEach(product => {
        listHTML += `
        <ul>
            <li><strong>Producto:</strong> ${product.title}</li>
            <li><strong>Categoria:</strong> ${product.category}</li>
            <li><strong>Descripción:</strong> ${product.description}</li>
            <li><strong>Codigo:</strong> ${product.code}</li>
            <li><strong>Precio:</strong> $${product.price}</li>
            <li><strong>Stock:</strong> ${product.stock}</li>
        </ul>`;
    });
    listProducts.innerHTML = listHTML;
}



socket.on('products', (data) => {
    updateProductList(data);
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const price = parseFloat(document.getElementById('price').value);
    const code = parseInt(document.getElementById('code').value);
    const stock = parseInt(document.getElementById('stock').value);

    const producto = {
        title, category, description, price, code, stock
    }

    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
        if (response.ok) {
            console.log("producto agregado")
            form.reset();
            socket.emit('addProduct', producto);
        }
    } catch (error) {
        console.error('Error', error)   
    }

})