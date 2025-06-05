/**
 * Controle da barra inferior expansível
 * 
 * Este arquivo contém toda a lógica relacionada ao painel inferior, incluindo:
 * - Expansão e retração do painel
 * - Animações e transições
 * - Interação com os elementos do painel
 */

// Elementos DOM
const bottomPanel = document.getElementById('bottomPanel');
const panelHandle = document.querySelector('.panel-handle');
const favoriteButton = document.getElementById('favoriteButton');

// Estado do painel
let isPanelExpanded = false;
let startY = 0;
let startTranslateY = 0;
let currentTranslateY = 0;

// Altura do painel quando retraído (em pixels)
const collapsedHeight = 150;

// Função para expandir o painel
function expandPanel() {
    bottomPanel.classList.add('expanded');
    isPanelExpanded = true;
    
    // Oculta o botão de favorito quando o painel está expandido
    if (favoriteButton) {
        favoriteButton.style.opacity = '0';
        favoriteButton.style.pointerEvents = 'none';
    }
}

// Função para retrair o painel
function collapsePanel() {
    bottomPanel.classList.remove('expanded');
    isPanelExpanded = false;
    
    // Mostra o botão de favorito quando o painel está retraído
    if (favoriteButton) {
        favoriteButton.style.opacity = '1';
        favoriteButton.style.pointerEvents = 'auto';
    }
}

// Função para alternar o estado do painel
function togglePanel() {
    if (isPanelExpanded) {
        collapsePanel();
    } else {
        expandPanel();
    }
}

// Inicialização de eventos após o carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Evento de clique no handle do painel
    if (panelHandle) {
        panelHandle.addEventListener('click', togglePanel);
    }
    
    // Eventos de toque para arrastar o painel (mobile)
    if (bottomPanel) {
        // Início do toque
        bottomPanel.addEventListener('touchstart', function(e) {
            startY = e.touches[0].clientY;
            
            // Obtém a posição atual do painel
            const style = window.getComputedStyle(bottomPanel);
            const transform = style.transform || style.webkitTransform;
            const matrix = new DOMMatrix(transform);
            startTranslateY = matrix.m42;
            
            // Remove a transição para movimento suave durante o arrasto
            bottomPanel.style.transition = 'none';
        });
        
        // Movimento do toque
        bottomPanel.addEventListener('touchmove', function(e) {
            const currentY = e.touches[0].clientY;
            const deltaY = currentY - startY;
            
            // Calcula a nova posição do painel
            currentTranslateY = Math.max(0, startTranslateY + deltaY);
            
            // Limita o movimento para não ultrapassar o tamanho do painel
            const maxTranslate = bottomPanel.offsetHeight - collapsedHeight;
            if (currentTranslateY > maxTranslate) {
                currentTranslateY = maxTranslate;
            }
            
            // Aplica a transformação
            bottomPanel.style.transform = `translateY(${currentTranslateY}px)`;
            
            // Atualiza a opacidade do botão de favorito com base na posição do painel
            if (favoriteButton) {
                const opacity = Math.min(1, currentTranslateY / (maxTranslate / 2));
                favoriteButton.style.opacity = opacity.toString();
                favoriteButton.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
            }
        });
        
        // Fim do toque
        bottomPanel.addEventListener('touchend', function() {
            // Restaura a transição para animação suave
            bottomPanel.style.transition = 'transform 0.3s ease-in-out';
            
            // Determina se o painel deve expandir ou retrair com base na posição final
            const panelHeight = bottomPanel.offsetHeight;
            const threshold = panelHeight * 0.3; // 30% da altura do painel
            
            if (currentTranslateY < threshold) {
                expandPanel();
            } else {
                collapsePanel();
            }
        });
    }
    
    // Evento de clique no botão de favorito
    if (favoriteButton) {
        favoriteButton.addEventListener('click', function() {
            // Aqui você pode implementar a lógica para favoritar a localização atual
            console.log('Localização favoritada!');
            
            // Animação simples para feedback visual
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    // Inicializa o painel na posição retraída
    collapsePanel();
});
