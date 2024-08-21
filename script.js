//filtro de busqueda 
function filterProducts() {
    // Obtener el valor del campo de búsqueda
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    
    // Obtener todos los productos
    const products = document.querySelectorAll('.funko-item');
    
    // Recorrer cada producto y verificar si coincide con la búsqueda
    products.forEach(function(product) {
        const productName = product.querySelector('figcaption').textContent.toLowerCase();
        
        // Si el nombre del producto incluye el texto de búsqueda, mostrarlo; de lo contrario, ocultarlo
        if (productName.includes(searchValue)) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
}




// Carrito de compras

document.addEventListener('DOMContentLoaded', function() {
    // Configuración de botones de añadir al carrito
    const buttons = document.querySelectorAll('button[id^="addToCart"]');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const product = {
                id: this.getAttribute('data-id'),
                name: this.getAttribute('data-name'),
                price: parseFloat(this.getAttribute('data-price')),  // Usar parseFloat para permitir decimales
                image: this.getAttribute('data-image'),
                quantity: 1,
            };

            // Validar que todos los campos del producto estén definidos
            if (!product.id || !product.name || !product.price || !product.image) {
                console.error("Producto con datos incompletos no se puede añadir al carrito:", product);
                return; // Evitar añadir productos con valores `null` o `undefined`
            }
            
            addToCart(product);
        });
    });

    // Mostrar items en el carrito y calcular el total
    displayCartItems();
    calculateTotal();
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert("Producto añadido al carrito");
}

function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
        return;
    }

    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        let cartItem = document.createElement('section');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <section class="cart-item-details">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <p>Cantidad: ${item.quantity}</p>
                <button class="remove-item" data-id="${item.id}">Eliminar</button>
            </section>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItemFromCart);
    });
}

function calculateTotal() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('total-amount').textContent = `$${total}`;
}

function removeItemFromCart(event) {
    let id = event.target.dataset.id;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart = cart.filter(item => item.id != id);

    localStorage.setItem('cart', JSON.stringify(cart));

    displayCartItems();
    calculateTotal();
}


//codigo para lo del contacto 
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Recoger los valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Crear un objeto con la información del contacto
    const contactInfo = {
        name: name,
        email: email,
        message: message
    };

    // Guardar la información en localStorage
    saveContactInfo(contactInfo);

    // Limpiar el formulario
    document.getElementById('contactForm').reset();

    alert('¡Gracias por contactarnos! Su información ha sido enviada.');
});

function saveContactInfo(contactInfo) {
    // Obtener los datos existentes en localStorage
    let contactos = JSON.parse(localStorage.getItem('contactos')) || [];

    // Agregar el nuevo contacto a la lista
    contactos.push(contactInfo);

    // Guardar la lista actualizada en localStorage
    localStorage.setItem('contactos', JSON.stringify(contactos));
}
