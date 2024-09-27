let btnCadastrar = document.getElementById("btnCadastrar");

btnCadastrar.addEventListener("click", async ()=>{
    const userData = localStorage.getItem('userData');
    const parsedData = JSON.parse(userData);
    if(validateForm()){
        let dataToSend = {
            titulo : document.getElementById("inputRegisterTitulo").value,
            autor : document.getElementById("inputRegisterAutor").value,
            genero : document.getElementById("inputRegisterGenero").value,
            nota: parseInt(document.getElementById("inputRegisterNota").value),
            avaliacao:  document.getElementById("inputRegisterAvaliacao").value,
            idUsuario: parsedData.data.id
        }
        const urlBase = window.location.origin + '/';
        let response = await fetch(`${urlBase}book/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'token':parsedData.data.token
            },
            body: JSON.stringify(dataToSend), 
        });
        let responseData = await response.json(); 
        if (responseData.has_error) {
            let errorMessages = responseData.error.map(err => err.message).join('\n');
            return alert(errorMessages);
        }else{
            alert("Livro cadastrado")
            window.location.reload();
        }
        
    }else{
        return;
    }
    
});

function validateForm() {
    const titulo = document.getElementById("inputRegisterTitulo").value;
    const autor = document.getElementById("inputRegisterAutor").value;
    const genero = document.getElementById("inputRegisterGenero").value;
    const nota = document.getElementById("inputRegisterNota").value;
    const avaliacao = document.getElementById("inputRegisterAvaliacao").value;

    if (!titulo && !autor && !genero && !nota && !avaliacao) {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    if (!titulo) {
         alert("O campo 'Título' deve ser preenchido.");
         return false;
    }
    if (!autor) {
         alert("O campo 'Autor' deve ser preenchido.");
         return false;
    }
    if (!genero) {
         alert("O campo 'Gênero' deve ser preenchido.");
         return false;
    }
    if (!nota) {
        alert("O campo 'Nota' deve ser preenchido.");
        return false;
    } else if (isNaN(nota) || nota < 0 || nota > 5) {
       alert("A nota deve ser um número entre 0 e 5.");
       return false;
    }
    if (!avaliacao) {
        alert("O campo 'Avaliação' deve ser preenchido.");
        return false;
    }

    if (titulo && autor && genero && nota && avaliacao && !isNaN(nota) && nota >= 0 && nota <= 5) {
        return true;
    }
}
function displayUserName() {
    const userData = localStorage.getItem('userData');
    if (userData) {
        const parsedData = JSON.parse(userData);
        const userName = parsedData.data.name; // Supondo que o nome do usuário esteja aqui
        document.getElementById("welcomeMessage").textContent = `Bem-vindo ${userName}`;
    }
}
displayUserName()
document.addEventListener("DOMContentLoaded", async () => {
    await fetchBookList();
});

async function fetchBookList() {
    const userData = localStorage.getItem('userData');
    const parsedData = JSON.parse(userData);
    const urlBase = window.location.origin + '/';
    
    // Dados a serem enviados na requisição
    let requestData = {
        idUsuario: parsedData.data.id
    };

    try {
        let response = await fetch(`${urlBase}book/list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': parsedData.data.token
            },
            body: JSON.stringify(requestData),
        });
        
        let responseData = await response.json();

        if (responseData.has_error) {
            alert("Erro ao buscar livros.");
            return;
        }

        // Preenche a lista de livros
        displayBooks(responseData.data);

    } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
    }
}

function displayBooks(books) {
    const bookListContainer = document.querySelector('.book-list');

    // Limpa a lista atual, exceto pelo cabeçalho
    const header = bookListContainer.firstElementChild; // Mantém o cabeçalho
    bookListContainer.innerHTML = ''; // Limpa tudo
    bookListContainer.appendChild(header); // Re-adiciona o cabeçalho

    // Cria os itens da lista de livros
    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.dataset.id = book.id; // Armazena o ID do livro

        bookItem.innerHTML = `
            <span class="AutorBook">${book.author}</span>
            <span class="NameBook">${book.title}</span>
            <span class="GeneroBook">${book.genre}</span>
            <span class="Nota">${book.rating}</span>
        `;

        // Adiciona evento de clique para abrir o modal
        bookItem.addEventListener('click', () => {
            document.getElementById('editTitle').value = book.title;
            document.getElementById('editAuthor').value = book.author;
            document.getElementById('editGenre').value = book.genre;
            document.getElementById('editRating').value = book.rating;
            document.getElementById('editReview').value = book.review; // Se você tiver um campo de avaliação

            // Armazena o ID do livro no botão de salvar e excluir
            document.getElementById('btnSaveChanges').dataset.bookId = book.id;
            document.getElementById('btnDeleteBook').dataset.bookId = book.id;

            // Exibe o modal
            const modal = new bootstrap.Modal(document.getElementById('editBookModal'));
            modal.show();
        });

        bookListContainer.appendChild(bookItem);
    });
}

///////////////
// Salvar alterações
document.getElementById('btnSaveChanges').addEventListener('click', async () => {
    const bookId = document.getElementById('btnSaveChanges').dataset.bookId;

    const dataToSend = {
        id: bookId,
        title: document.getElementById('editTitle').value,
        author: document.getElementById('editAuthor').value,
        genre: document.getElementById('editGenre').value,
        rating: parseInt(document.getElementById('editRating').value),
        review: document.getElementById('editReview').value,
    };

    const urlBase = window.location.origin + '/';
    try {
        let response = await fetch(`${urlBase}book`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': JSON.parse(localStorage.getItem('userData')).data.token
            },
            body: JSON.stringify(dataToSend),
        });

        let responseData = await response.json();
        if (responseData.has_error) {
            alert("Houve um erro ao editar o livro.");
        } else {
            alert("Livro editado com sucesso.");
            window.location.reload();
        }
    } catch (error) {
        console.error("Erro ao editar o livro:", error);
    }
});

// Excluir livro
document.getElementById('btnDeleteBook').addEventListener('click', async () => {
    const bookId = document.getElementById('btnDeleteBook').dataset.bookId;
    
    const urlBase = window.location.origin + '/';
    let dataToSend = {
        bookId: bookId
    }
    try {
        let response = await fetch(`${urlBase}book`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': JSON.parse(localStorage.getItem('userData')).data.token
            },
            body: JSON.stringify(dataToSend),
        });

        let responseData = await response.json();
        if (responseData.has_error) {
            alert("Houve um erro ao apagar o livro.");
        } else {
            alert("Livro removido com sucesso.");
            window.location.reload();
        }
    } catch (error) {
        console.error("Erro ao excluir o livro:", error);
    }
});