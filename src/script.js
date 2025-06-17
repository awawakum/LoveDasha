                // ===== Анимация сердца =====
        const canvas = document.getElementById('heartCanvas');
        const ctx = canvas.getContext('2d');
        const textContainer = document.getElementById('text-container');
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = 10;
        const points = [];
        let isDrawing = true;
        let currentIndex = 0;
        
        // Генерируем точки сердца
        for (let t = 0; t <= 2 * Math.PI; t += 0.01) {
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            points.push({ x: centerX + x * scale, y: centerY + y * scale });
        }

        // ===== Анимация текста =====
        const messages = ["Я очень тебя люблю! ( ˘⌣˘)♡(˘⌣˘ )", "Ето сердечко тебе!  Прости...(*・ω・)",];
        let currentMessage = 0;
        let currentChar = 0;
        let isDeleting = false;
        let wait = 0;

        function typeText() {
            const fullText = messages[currentMessage];
            
            if (isDeleting) {
                textContainer.textContent = fullText.substring(0, currentChar - 1);
                currentChar--;
            } else {
                textContainer.textContent = fullText.substring(0, currentChar + 1);
                currentChar++;
            }

            // Логика переключения между сообщениями
            if (!isDeleting && currentChar === fullText.length) {
                wait = 2000; // Пауза после полного набора
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentMessage = (currentMessage + 1) % messages.length;
                wait = 500;
            }

            const speed = isDeleting ? 100 : 150; // Скорость печати/удаления
            setTimeout(typeText, wait > 0 ? (wait = 0, 1000) : speed);
        }

        // ===== Общая анимация =====
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (isDrawing) {
                // Рисуем сердце
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                
                const maxIndex = Math.min(currentIndex, points.length - 1);
                for (let i = 0; i <= maxIndex; i++) {
                    ctx.lineTo(points[i].x, points[i].y);
                }
                
                ctx.fillStyle = '#ff3366';
                ctx.fill();
                
                currentIndex += 0.5;
                
                if (currentIndex >= points.length) {
                    isDrawing = false;
                    currentIndex = points.length - 1;
                }
            } else {
                // Стираем сердце
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                
                const maxIndex = Math.max(0, currentIndex);
                for (let i = 0; i <= maxIndex; i++) {
                    ctx.lineTo(points[i].x, points[i].y);
                }
                
                ctx.fillStyle = '#ff3366';
                ctx.fill();
                
                currentIndex -= 0.5;
                
                if (currentIndex <= 0) {
                    isDrawing = true;
                    currentIndex = 0;
                }
            }
            
            requestAnimationFrame(animate);
        }

        // Запускаем обе анимации
        animate();
        setTimeout(typeText, 100); // Задержка перед началом печати текста
