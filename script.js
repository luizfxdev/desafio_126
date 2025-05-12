// Função principal para ordenar emojis por código Unicode
function sortEmojisByUnicode(emojiString) {
    // Converte a string em um array de caracteres (emojis)
    const emojiArray = Array.from(emojiString);

    // Ordena os emojis com base em seus códigos Unicode
    emojiArray.sort((a, b) => {
        return a.codePointAt(0) - b.codePointAt(0);
    });

    // Junta o array ordenado de volta em uma string
    return emojiArray.join('');
}

// Função para verificar se a string contém apenas emojis
function containsOnlyEmojis(str) {
    // Expressão regular para identificar emojis
    const emojiRegex = /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)+$/u;
    return emojiRegex.test(str);
}

// Função para lidar com o clique no botão REVELAR
function handleReveal() {
    const input = document.getElementById('emojiInput').value;
    const resultOutput = document.getElementById('resultOutput');

    // Verifica se o input está vazio
    if (!input) {
        resultOutput.textContent = 'Por favor, insira alguns emojis!';
        return;
    }

    // Verifica se o input contém apenas emojis
    if (!containsOnlyEmojis(input)) {
        resultOutput.textContent = 'Por favor, insira apenas emojis!';
        return;
    }

    // Ordena os emojis e exibe o resultado
    const sortedEmojis = sortEmojisByUnicode(input);
    resultOutput.textContent = sortedEmojis;
}

// Função para lidar com o clique no botão RETORNAR
function handleReturn() {
    const resultOutput = document.getElementById('resultOutput');
    const inputField = document.getElementById('emojiInput');

    // Copia o resultado de volta para o campo de entrada e limpa o resultado
    if (resultOutput.textContent && containsOnlyEmojis(resultOutput.textContent)) {
        inputField.value = resultOutput.textContent;
        resultOutput.textContent = '';
    } else {
        resultOutput.textContent = 'Nada para retornar!';
        inputField.value = ''; // Limpa o input também quando não há resultado válido
    }

    // Foca no campo de input após retornar
    inputField.focus();
}

// Adiciona event listeners quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Botão REVELAR
    document.getElementById('revealBtn').addEventListener('click', handleReveal);

    // Botão RETORNAR
    document.getElementById('returnBtn').addEventListener('click', handleReturn);

    // Permite também usar a tecla Enter no campo de input
    document.getElementById('emojiInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleReveal();
        }
    });
});