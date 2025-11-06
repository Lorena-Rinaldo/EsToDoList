# 📝 EsToDoList 📝

<p align="center">
  <em>Um gerenciador de tarefas simples e intuitivo para organizar seu dia a dia.</em>
</p>

Bem-vindo ao projeto **EsToDoList**! Esta é uma aplicação de lista de tarefas (To-Do List) desenvolvida para ajudar você a organizar suas atividades de forma eficiente. Com um design responsivo e funcionalidades essenciais de CRUD (Criar, Ler, Atualizar, Deletar), o EsToDoList permite gerenciar tarefas, definir prazos e acompanhar seu progresso.

## Índice

* [Sobre o Projeto](#sobre-o-projeto)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Funcionalidades Implementadas](#funcionalidades-implementadas)
* [Como Executar o Projeto Localmente](#como-executar-o-projeto-localmente)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Contato](#contato)

## Sobre o Projeto

O objetivo principal deste projeto é fornecer uma ferramenta leve e eficaz para a gestão de tarefas pessoais. Ele permite aos usuários adicionar novas tarefas com prazos, marcar tarefas como concluídas ou pendentes, editar descrições e datas de entrega, pesquisar tarefas e filtrar a visualização por status (todas, concluídas, pendentes). As tarefas são salvas localmente no navegador, garantindo que suas informações persistam entre as sessões.

## Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias front-end:

*   **HTML5**: Para a estrutura semântica do conteúdo da aplicação.
*   **Tailwind CSS**: Um framework CSS utilitário para estilização rápida e responsiva. As classes são aplicadas diretamente no HTML, facilitando o desenvolvimento e a manutenção do layout.
    *   **CDN via Script**: Utilizado para garantir que classes dinâmicas funcionem corretamente.
*   **CSS3**: Para estilos personalizados e ajustes finos, como a fonte e o estilo do `input` de data.
    *   **Fontes Google (`Plus Jakarta Sans`)**: Para uma tipografia moderna e legível.
*   **JavaScript (Vanilla JS)**: Para toda a lógica de manipulação do DOM, gestão de estado das tarefas, persistência de dados (LocalStorage) e interatividade da aplicação.
    *   **CRUD de Tarefas**: Funções para adicionar, ler, atualizar e deletar tarefas.
    *   **Filtros e Pesquisa**: Lógica para filtrar tarefas por status e pesquisar por texto/data.
    *   **Persistência de Dados**: Utilização do `localStorage` para salvar e carregar tarefas.
*   **Bootstrap Icons**: Para a inclusão de ícones vetoriais que aprimoram a comunicação visual dos botões e ações.

## Funcionalidades Implementadas

*   **Adição de Tarefas com Prazo**:
    *   Campo de texto para a descrição da tarefa.
    *   Campo de seleção de data para definir um prazo de entrega.
    *   Botão para adicionar a tarefa.
*   **Visualização e Gestão de Tarefas**:
    *   Exibição das tarefas em formato de "cards" intuitivos.
    *   Indicação visual do status (concluída/pendente) e prazo.
    *   Menu de opções (três pontos) para cada tarefa, incluindo:
        *   **Editar**: Altera a descrição e/ou a data de entrega da tarefa.
        *   **Excluir**: Remove a tarefa da lista.
        *   **Marcar Concluída/Pendente**: Alterna o status de conclusão da tarefa.
    *   Clique direto no card para alternar a conclusão da tarefa.
*   **Filtros de Visualização**:
    *   Botões na barra lateral para filtrar tarefas por:
        *   Todas as Tarefas
        *   Concluídas
        *   Pendentes
    *   Feedback visual do filtro ativo.
*   **Pesquisa de Tarefas**:
    *   Campo de pesquisa na barra lateral para encontrar tarefas por descrição ou data de entrega.
*   **Persistência de Dados**:
    *   As tarefas são salvas no `localStorage` do navegador, garantindo que não sejam perdidas ao fechar ou recarregar a página.
*   **Design Responsivo**:
    *   O layout se adapta a diferentes tamanhos de tela, proporcionando uma boa experiência em desktops, tablets e celulares.

## Como Executar o Projeto Localmente

Para visualizar e interagir com este projeto em sua máquina local:

1.  **Clone o repositório** (substitua a URL pelo link do seu repositório no GitHub):
    ```sh
    git clone https://github.com/Lorena-Rinaldo/EsToDoList.git # Exemplo: ajuste se o repo estiver em outro nome
    cd EsToDoList
    ```
    Se você já possui os arquivos localmente, pode pular esta etapa.

2.  **Abra o arquivo `index.html`**:
    *   Navegue até a pasta raiz do projeto (onde está o `index.html`).
    *   Abra o arquivo `index.html` em qualquer navegador web moderno (como Google Chrome, Firefox, Edge).

## Estrutura do Projeto
```text
A estrutura de arquivos e pastas do projeto está organizada da seguinte forma:
.
├── .vscode/
│ └── settings.json
├── docs/
│ ├── requisitos-funcionais.md
│ └── wireframe.excalidraw
├── node_modules/
├── .package-lock.json 
├── index.html
├── package-lock.json 
├── package.json 
├── script.js
├── styles.css
└── tailwind.config.js 
```
**Observações:**
*   As pastas e arquivos relacionados ao `npm` (`node_modules`, `package.json`, `package-lock.json`, `tailwind.config.js`) são importantes para o desenvolvimento e, se você estiver usando o Tailwind CSS de forma local (não apenas via CDN), eles serão essenciais para compilar seus estilos. Se você usa apenas o CDN, eles podem ser removidos (mas geralmente é melhor mantê-los se houver histórico de instalação de dependências).
*   A pasta `docs` é um ótimo local para manter a documentação de design e requisitos do projeto.
*   O arquivo `styles.css` está presente, mas vazio no código fornecido. Ele pode ser usado para estilos personalizados que não são facilmente implementados com Tailwind, ou se você decidir compilar seu próprio CSS a partir de arquivos Tailwind.

## Contato
Desenvolvido por: **Lorena Rinaldo**

*   **Vercel**: [Meu Projeto](https://es-to-do-list-eight.vercel.app/)
*   **GitHub**: [Lorena-Rinaldo](https://github.com/Lorena-Rinaldo)
*   **LinkedIn**: [www.linkedin.com/in/lorena-rinaldo01](https://www.linkedin.com/in/lorena-rinaldo01)
*   **Email**: [lorena.rinaldodev@gmail.com](lorena.rinaldodev@gmail.com)

🗓️ Organizando suas tarefas, um passo de cada vez! ✅
