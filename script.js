// =============================================================
// EsToDoList - CRUD de tarefas adaptado ao seu HTML
// =============================================================

// -------------------------------
// 1. Selecionar os elementos da página (ATUALIZADO)
// -------------------------------
const campoNovaTarefa = document.getElementById('adicionar-tarefa');
const botaoAdicionar = document.querySelector('header button');
const listaTarefas = document.getElementById('lista-de-tarefas');
const campoPesquisa = document.getElementById('pesquisar-tarefa');

// Seleção dos botões de filtro (ATUALIZADA com novos IDs)
const botaoFiltroTodas = document.getElementById('filtro-todas'); // NOVO BOTÃO
const botaoFiltroConcluidas = document.getElementById('filtro-concluidas'); // ID adicionado no HTML
const botaoFiltroPendentes = document.getElementById('filtro-pendentes');   // ID adicionado no HTML

// Array principal que armazenará todas as tarefas
let tarefas = [];
// Variável para rastrear o filtro ativo (usaremos 'todos' por padrão)
let filtroAtual = 'todos';


// -------------------------------
// 2. Carregar tarefas salvas no navegador (localStorage)
// -------------------------------
function carregarTarefasSalvas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
        aplicarFiltro(filtroAtual);
    }
}

// -------------------------------
// 3. Salvar as tarefas no navegador
// -------------------------------
function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// -------------------------------
// 4. Função para adicionar uma nova tarefa
// -------------------------------
function adicionarTarefa() {
    const texto = campoNovaTarefa.value.trim();

    if (texto === '') {
        alert('Digite uma tarefa antes de adicionar!');
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        texto: texto,
        concluida: false,
        dataCriacao: new Date().toLocaleDateString('pt-BR')
    }

    tarefas.push(novaTarefa);
    salvarTarefas();
    aplicarFiltro(filtroAtual);
    campoNovaTarefa.value = '';
}

// -------------------------------
// 5. Função para exibir as tarefas na tela
// -------------------------------
function exibirTarefas(listaParaMostrar) {
    if (!listaTarefas) return;

    listaTarefas.innerHTML = '';

    for (let tarefa of listaParaMostrar) {
        const card = document.createElement('div');
        // Adicionamos a classe 'tarefa-card' para facilitar a identificação do clique
        card.className = `tarefa-card p-4 mb-6 bg-white border rounded-lg shadow-md transition-all cursor-pointer ${tarefa.concluida ? 'border-green-400 opacity-75' : 'border-gray-200 hover:shadow-lg'}`;
        card.setAttribute('data-id', tarefa.id); // Adicionamos o data-id no card principal

        card.innerHTML = `
            <div class="relative flex justify-end mb-2">
                <div id="configuracoes-tarefa-${tarefa.id}"
                    class="absolute right-0 z-10 hidden w-40 mt-2 bg-white rounded-md shadow-lg top-full">
                    <a href="#" class="editar-btn flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                       data-id="${tarefa.id}">
                        <i class="mr-2 bi bi-pencil"></i> Editar
                    </a>
                    <a href="#" class="excluir-btn flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                       data-id="${tarefa.id}">
                        <i class="mr-2 bi bi-trash"></i> Excluir
                    </a>
                    <a href="#" class="alternar-conclusao-btn flex items-center px-4 py-2 text-sm ${tarefa.concluida ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50'}"
                       data-id="${tarefa.id}">
                        <i class="mr-2 bi ${tarefa.concluida ? 'bi-x-circle' : 'bi-check-circle'}"></i> ${tarefa.concluida ? 'Marcar Pendente' : 'Marcar Concluída'}
                    </a>
                </div>
                
                <button id="ellipsisIcon-${tarefa.id}"
                    class="ellipsis-btn p-1 text-gray-500 transition-colors duration-200 rounded-full hover:text-gray-700 hover:bg-gray-100"
                    data-id="${tarefa.id}">
                    <i class="text-lg bi bi-three-dots"></i>
                </button>
            </div>

            <div class="mb-4 post-content pointer-events-none">
                <div class="flex flex-row w-full items-center">
                    <h2 class="w-full text-xl font-bold ${tarefa.concluida ? 'line-through text-gray-500' : 'text-gray-900'}">
                        ${tarefa.texto}
                    </h2>
                    <p class="text-sm text-gray-500 whitespace-nowrap">
                        Data: ${tarefa.dataCriacao}
                    </p>
                </div>
            </div>
        `;

        listaTarefas.appendChild(card);
    }

    // Após exibir, adiciona os event listeners aos novos elementos criados
    adicionarListenersAosCards();
}

// -------------------------------
// 5.1. Adicionar Listeners aos Cards (ATUALIZADO com clique no card)
// -------------------------------
function adicionarListenersAosCards() {
    // 0. Clique no Card para alternar conclusão (NOVO)
    document.querySelectorAll('.tarefa-card').forEach(card => {
        card.addEventListener('click', function (e) {
            // Verifica se o clique foi em um botão dentro do card ou no dropdown
            if (e.target.closest('.ellipsis-btn') || e.target.closest('[id^="configuracoes-tarefa-"]')) {
                return; // Ignora o clique se for nos controles
            }

            // Alterna a conclusão da tarefa
            const id = parseInt(card.getAttribute('data-id'));
            alternarConclusao(id);
        });
    });

    // 1. Botões de 3 Pontos (Abrir/Fechar Dropdown)
    document.querySelectorAll('.ellipsis-btn').forEach(button => {
        button.onclick = function (e) {
            e.stopPropagation(); // Impede o clique de propagar para o card
            const id = button.getAttribute('data-id');
            const dropdown = document.getElementById(`configuracoes-tarefa-${id}`);

            document.querySelectorAll('[id^="configuracoes-tarefa-"]').forEach(d => {
                if (d !== dropdown) d.classList.add('hidden');
            });
            dropdown.classList.toggle('hidden');
        };
    });

    // 2. Botão Editar
    document.querySelectorAll('.editar-btn').forEach(button => {
        button.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation(); // Impede o clique de propagar para o card
            const id = parseInt(button.getAttribute('data-id'));
            editarTarefa(id);
            document.getElementById(`configuracoes-tarefa-${id}`).classList.add('hidden');
        };
    });

    // 3. Botão Excluir
    document.querySelectorAll('.excluir-btn').forEach(button => {
        button.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation(); // Impede o clique de propagar para o card
            const id = parseInt(button.getAttribute('data-id'));
            excluirTarefa(id);
        };
    });

    // 4. Botão Alternar Conclusão
    document.querySelectorAll('.alternar-conclusao-btn').forEach(button => {
        button.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation(); // Impede o clique de propagar para o card
            const id = parseInt(button.getAttribute('data-id'));
            alternarConclusao(id);
            document.getElementById(`configuracoes-tarefa-${id}`).classList.add('hidden');
        };
    });

    // Fechar dropdown se clicar fora dele
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.ellipsis-btn') && !e.target.closest('[id^="configuracoes-tarefa-"]')) {
            document.querySelectorAll('[id^="configuracoes-tarefa-"]').forEach(d => {
                d.classList.add('hidden');
            });
        }
    });
}


// -------------------------------
// 6. Função para alternar entre concluída e ativa
// -------------------------------
function alternarConclusao(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        salvarTarefas();
        aplicarFiltro(filtroAtual);
    }
}

// -------------------------------
// 7. Função para editar o texto de uma tarefa
// -------------------------------
function editarTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        const novaDescricao = prompt('Edite a tarefa:', tarefa.texto);

        if (novaDescricao === null || novaDescricao.trim() === '') {
            return;
        }

        tarefa.texto = novaDescricao.trim();
        salvarTarefas();
        aplicarFiltro(filtroAtual);
    }
}

// -------------------------------
// 8. Função para excluir uma tarefa
// -------------------------------
function excluirTarefa(id) {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta tarefa?');

    if (confirmar) {
        tarefas = tarefas.filter(function (tarefa) {
            return tarefa.id !== id;
        });
        salvarTarefas();
        aplicarFiltro(filtroAtual);
    }
}

// -------------------------------
// 9. Função de pesquisa
// -------------------------------
function pesquisarTarefas() {
    const termo = campoPesquisa.value.toLowerCase();

    let listaFiltrada = [];
    if (filtroAtual === 'pendentes') {
        listaFiltrada = tarefas.filter(t => !t.concluida);
    } else if (filtroAtual === 'concluidas') {
        listaFiltrada = tarefas.filter(t => t.concluida);
    } else {
        listaFiltrada = tarefas;
    }

    const resultadosPesquisa = listaFiltrada.filter(function (tarefa) {
        return tarefa.texto.toLowerCase().includes(termo);
    });

    exibirTarefas(resultadosPesquisa);
}

// -------------------------------
// 10. Função para aplicar o filtro e atualizar a UI (ATUALIZADO para 'todas')
// -------------------------------
function aplicarFiltro(tipo) {
    filtroAtual = tipo;
    let listaFiltrada = [];

    // Lógica de filtragem
    if (tipo === 'pendentes') {
        listaFiltrada = tarefas.filter(tarefa => !tarefa.concluida);
    } else if (tipo === 'concluidas') {
        listaFiltrada = tarefas.filter(tarefa => tarefa.concluida);
    } else { // 'todos'
        listaFiltrada = tarefas;
    }

    // Atualiza a aparência dos botões de filtro (ATUALIZADO)
    const botoes = [botaoFiltroTodas, botaoFiltroConcluidas, botaoFiltroPendentes];

    botoes.forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-blue-200', 'text-black');
    });

    if (tipo === 'concluidas') {
        botaoFiltroConcluidas.classList.add('bg-blue-600', 'text-white');
        botaoFiltroConcluidas.classList.remove('bg-blue-200', 'text-black');
    } else if (tipo === 'pendentes') {
        botaoFiltroPendentes.classList.add('bg-blue-600', 'text-white');
        botaoFiltroPendentes.classList.remove('bg-blue-200', 'text-black');
    } else if (tipo === 'todos') { // NOVO ESTILO
        botaoFiltroTodas.classList.add('bg-blue-600', 'text-white');
        botaoFiltroTodas.classList.remove('bg-blue-200', 'text-black');
    }

    // Aplica a pesquisa sobre a lista já filtrada
    const termo = campoPesquisa.value.toLowerCase();
    const resultadosFinais = listaFiltrada.filter(tarefa => tarefa.texto.toLowerCase().includes(termo));


    exibirTarefas(resultadosFinais);
}


// -------------------------------
// 11. Eventos (interações do usuário) (ATUALIZADO)
// -------------------------------
botaoAdicionar.addEventListener('click', adicionarTarefa);
campoPesquisa.addEventListener('input', pesquisarTarefas);

// Eventos para os botões de filtro da sidebar (ATUALIZADO)
botaoFiltroTodas.addEventListener('click', () => aplicarFiltro('todos')); // NOVO EVENTO
botaoFiltroConcluidas.addEventListener('click', () => aplicarFiltro('concluidas'));
botaoFiltroPendentes.addEventListener('click', () => aplicarFiltro('pendentes'));


// -------------------------------
// 12. Permitir adicionar tarefa ao pressionar Enter
// -------------------------------
campoNovaTarefa.addEventListener('keydown', function (evento) {
    if (evento.key === 'Enter') {
        evento.preventDefault();
        adicionarTarefa();
    }
});

// -------------------------------
// 13. Quando a página carregar, buscamos as tarefas salvas
// -------------------------------
window.onload = carregarTarefasSalvas;