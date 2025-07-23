document.addEventListener('DOMContentLoaded', () => {
    // Rolagem suave para as seções
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Lógica do Quiz ---
    const quizQuestions = [
        {
            question: "O que NÃO é um sinal de alerta de que alguém pode estar precisando de ajuda em relação à saúde mental?",
            options: [
                "a) Isolamento social repentino",
                "b) Mudanças drásticas de humor",
                "c) Falar abertamente sobre seus sentimentos sem receio",
                "d) Perda de interesse em atividades antes prazerosas"
            ],
            correctAnswer: "c) Falar abertamente sobre seus sentimentos sem receio",
            explanation: "Falar abertamente sobre sentimentos é um sinal positivo de que a pessoa está buscando desabafar e pode estar mais aberta a receber ajuda."
        },
        {
            question: "Qual a principal mensagem do Setembro Amarelo?",
            options: [
                "a) Que o suicídio é um tema proibido.",
                "b) Que buscar ajuda é um sinal de fraqueza.",
                "c) Que falar sobre suicídio e buscar ajuda profissional salva vidas.",
                "d) Que apenas médicos podem ajudar em casos de sofrimento emocional."
            ],
            correctAnswer: "c) Que falar sobre suicídio e buscar ajuda profissional salva vidas.",
            explanation: "A campanha Setembro Amarelo tem como foco principal desmistificar o tema e incentivar o diálogo e a busca por auxílio profissional e emocional."
        },
        {
            question: "Se alguém que você conhece fala em tirar a própria vida, o que você deve fazer?",
            options: [
                "a) Ignorar, pois é apenas um chamado de atenção.",
                "b) Julgar a pessoa e dizer para ela 'reagir'.",
                "c) Oferecer escuta ativa, validar os sentimentos e incentivar a busca por ajuda profissional.",
                "d) Dizer que a vida é bonita e que ela não tem motivos para estar triste."
            ],
            correctAnswer: "c) Oferecer escuta ativa, validar os sentimentos e incentivar a busca por ajuda profissional.",
            explanation: "É fundamental levar a sério qualquer menção de autoextermínio. Oferecer apoio, ouvir sem julgamento e direcionar para profissionais é crucial."
        }
        // Adicione mais perguntas aqui se desejar
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    const quizContainer = document.getElementById('quiz-container');
    const startQuizBtn = document.getElementById('startQuizBtn');

    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', startQuiz);
    }

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestionIndex < quizQuestions.length) {
            const q = quizQuestions[currentQuestionIndex];
            quizContainer.innerHTML = `
                <div class="quiz-question">
                    <h3>${q.question}</h3>
                    <div class="options-container">
                        ${q.options.map(option => `<button class="quiz-option-btn">${option}</button>`).join('')}
                    </div>
                </div>
            `;
            document.querySelectorAll('.quiz-option-btn').forEach(button => {
                button.addEventListener('click', handleOptionClick);
            });
        } else {
            showQuizResult();
        }
    }

    function handleOptionClick(event) {
        const selectedButton = event.target; // Pega o botão clicado
        const selectedOption = selectedButton.textContent;
        const correct = quizQuestions[currentQuestionIndex].correctAnswer;

        // Desabilita todos os botões para evitar múltiplos cliques
        document.querySelectorAll('.quiz-option-btn').forEach(button => {
            button.disabled = true;
            button.style.opacity = '0.7'; // Adiciona um estilo sutil para botões desabilitados
            button.style.cursor = 'default';
        });

        if (selectedOption === correct) {
            score++;
            selectedButton.classList.add('correct'); // Adiciona classe 'correct'
        } else {
            selectedButton.classList.add('incorrect'); // Adiciona classe 'incorrect'
            // Também mostra a resposta correta se a selecionada estiver errada
            document.querySelectorAll('.quiz-option-btn').forEach(button => {
                if (button.textContent === correct) {
                    button.classList.add('correct');
                }
            });
        }

        // Exibe feedback e avança para a próxima pergunta após um pequeno atraso
        setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion();
        }, 1500); // 1.5 segundos para o usuário ver o feedback
    }

    function showQuizResult() {
        quizContainer.innerHTML = `
            <div class="quiz-result">
                <h3>Quiz Finalizado!</h3>
                <p>Você acertou ${score} de ${quizQuestions.length} perguntas.</p>
                <p>${score === quizQuestions.length ? "Excelente! Você está muito bem informado(a)." : "Continue aprendendo! O conhecimento é uma ferramenta poderosa."}</p>
                <button id="restartQuizBtn">Refazer Quiz</button>
                <p>Para mais informações, visite nossa seção <a href="#ajuda">Precisa de Ajuda?</a></p>
            </div>
        `;
        document.getElementById('restartQuizBtn').addEventListener('click', startQuiz);
    }

    // --- Lógica para o envio de Depoimentos (Aviso Simples) ---
    const submitDepoimentoBtn = document.getElementById('submitDepoimentoBtn');
    if (submitDepoimentoBtn) {
        submitDepoimentoBtn.addEventListener('click', () => {
            alert('A funcionalidade de envio de depoimentos está em desenvolvimento. Por favor, envie sua história para [email@exemplo.com] ou aguarde nossa plataforma online de envio!');
        });
    }

    // --- Lógica do Modo Escuro ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedMode = localStorage.getItem('darkMode');

        if (savedMode === 'true' || (savedMode === null && prefersDarkMode)) {
            document.body.classList.add('dark-mode');
            darkModeToggle.textContent = '☀️';
        } else {
            darkModeToggle.textContent = '🌙';
        }

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
        });
    }
});