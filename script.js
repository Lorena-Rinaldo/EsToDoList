document.addEventListener('DOMContentLoaded', function () {
    const ellipsisButtons = document.querySelectorAll('[id^="ellipsisIcon-"]');

    ellipsisButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation();
            
            // Para o seu exemplo estático, estamos assumindo que o menu é o elemento anterior
            const menuOptions = this.previousElementSibling; 

            if (!menuOptions) return;

            document.querySelectorAll('[id^="configuracoes-tarefa"]').forEach(openMenu => {
                if (openMenu !== menuOptions && !openMenu.classList.contains('hidden')) {
                    openMenu.classList.add('hidden');
                }
            });

            menuOptions.classList.toggle('hidden');
        });
    });

    document.addEventListener('click', function (event) {
        let clickedInsideEllipsis = false;
        let clickedInsideMenu = false;

        ellipsisButtons.forEach(button => {
            if (button.contains(event.target)) {
                clickedInsideEllipsis = true;
            }
        });

        document.querySelectorAll('[id^="configuracoes-tarefa"]').forEach(menu => {
            if (menu.contains(event.target)) {
                clickedInsideMenu = true;
            }
        });

        if (!clickedInsideEllipsis && !clickedInsideMenu) {
            document.querySelectorAll('[id^="configuracoes-tarefa"]').forEach(openMenu => {
                openMenu.classList.add('hidden');
            });
        }
    });
});