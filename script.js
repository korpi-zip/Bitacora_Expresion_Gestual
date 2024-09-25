

document.addEventListener('DOMContentLoaded', function() {
    

    // Cargar el contenido de header.html, footer.html y nav.html
    cargarHeader();
    cargarFooter();
    cargarNav();

    // código para cargar los artículos
    // Llamar a la función para cargar los artículos

    cargarArticulosSecuencialmente();
});



// Cargar el contenido de header.html usando fetch
function cargarHeader() {
    var headerContainer = document.getElementById('header');
    fetch('templates/components/header.html')
        .then(function(response) {
            // Si la respuesta es exitosa, devolver el contenido del archivo como texto
            if (response.ok) {
                return response.text();
            }
            throw new Error('No se pudo cargar el header');
        })
        .then(function(data) {
            // Insertar el contenido de header.html en el contenedor
            headerContainer.innerHTML = data;
        })
        .catch(function(error) {
            console.error('Hubo un problema al cargar el header:', error);
        });
}


function cargarFooter() {
    var footerContainer = document.getElementById('footer');
    fetch('templates/components/footer.html')
        .then(function(response) {
            // Si la respuesta es exitosa, devolver el contenido del archivo como texto
            if (response.ok) {
                return response.text();
            }
            throw new Error('No se pudo cargar el footer');
        })
        .then(function(data) {
            // Insertar el contenido de header.html en el contenedor
            footerContainer.innerHTML = data;
        })
        .catch(function(error) {
            console.error('Hubo un problema al cargar el footer:', error);
        });
}

function cargarNav() {
    var navContainer = document.getElementById('nav');
    fetch('templates/components/nav.html')
        .then(function(response) {
            // Si la respuesta es exitosa, devolver el contenido del archivo como texto
            if (response.ok) {
                return response.text();
            }
            throw new Error('No se pudo cargar el nav');
        })
        .then(function(data) {
            // Insertar el contenido de header.html en el contenedor
            navContainer.innerHTML = data;
        })
        .catch(function(error) {
            console.error('Hubo un problema al cargar el nav:', error);
        });
}
async function cargarArticulo(num) {
    try {
        const response = await fetch(`templates/articles/article${num}.html`);
        if (!response.ok) {
            console.error(`Error ${response.status}: No se pudo cargar el artículo ${num}`);
            return `<p>Error al cargar el artículo ${num}</p>`;
        }
        const data = await response.text();
        
        // Crear un div para cada artículo y añadirlo al contenedor
        var articleDiv = document.createElement('div');
        articleDiv.innerHTML = data;

        // Agregar el artículo al contenedor
        var articlesContainer = document.getElementById('articles');
        articlesContainer.appendChild(articleDiv);

    } catch (error) {
        console.error(`Hubo un problema al cargar el artículo ${num}:`, error);
    }
}

// Funcion para contar la cantidad total de elementos en la carpeta articles
async function contarArticulos() {
    try {
        const response = await fetch('templates/articles/');
        if (!response.ok) {
            console.error(`Error ${response.status}: No se pudo cargar la lista de artículos`);
            return 0;
        }
        const data = await response.text();
        const parser = new DOMParser();
        const html = parser.parseFromString(data, 'text/html');
        const articles = html.querySelectorAll('a');
        return articles.length;
    } catch (error) {
        console.error('Hubo un problema al contar los artículos:', error);
        return 0;
    }
}

// Función para cargar todos los artículos secuencialmente
async function cargarArticulosSecuencialmente() {
    //contar articulos
    totalArticles = await contarArticulos();
    // Cargar los artículos secuencialmente

    
    for (let i = 1; i <= totalArticles; i++) {
        await cargarArticulo(i); // Espera a que cada artículo se cargue antes de pasar al siguiente
    }
}


