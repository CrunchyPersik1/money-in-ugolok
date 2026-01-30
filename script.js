// Игровые данные
        let gameData = {
            playerName: "",
            balance: 1000,
            workers: [],
            totalIncomePerSecond: 0,
            openedCases: 0,
            totalEarned: 0,
            lastUpdateTime: Date.now(),
            experienceTimer: 0,
            city: {
                buildings: [],
                totalBonus: 1.0,
                totalBonusPercent: 0
            },
            rocket: {
                height: 0,
                maxHeight: 0,
                xp: 0,
                worker: null,
                isFlying: false,
                dangerLevel: 0,
                flightIncomeMultiplier: 1.0,
                baseCrashChance: 0.01,
                launchTime: null,
                exclusiveWorkers: [] // Эксклюзивные рабочие, полученные через ракетку
            },
            pvp: {
                unlocked: false,
                stamina: 30,
                maxStamina: 30,
                lastStaminaReset: Date.now(),
                selectedWorker: null,
                battles: 0,
                wins: 0,
                losses: 0
            },
            audio: {
                enabled: false,
                volume: 0.5,
                currentTrack: null,
                isPlaying: false,
                visualizerEnabled: true
            },
            shards: 0, // Новая валюта Шарды
            shop: {
                purchasedItems: []
            },
            achievements: [],
            version: "2.0" // Версия сохранения
        };

        // Настройки игры
        let gameSettings = {
            theme: 'default',
            icon: '💰',
            musicVolume: 0.5,
            sfxVolume: 0.7,
            musicEnabled: true,
            sfxEnabled: true
        };

        // Доступные темы
        const themes = [
            { id: 'default', name: 'Digital Luxury', primary: '#00ffff', secondary: '#6366f1', accent: '#ff006e' },
            { id: 'green', name: 'Зеленый изумруд', primary: '#10b981', secondary: '#059669', accent: '#34d399' },
            { id: 'purple', name: 'Фиолетовый космос', primary: '#8b5cf6', secondary: '#7c3aed', accent: '#a78bfa' },
            { id: 'red', name: 'Красный пламя', primary: '#ef4444', secondary: '#dc2626', accent: '#f87171' },
            { id: 'gold', name: 'Золотой роскошь', primary: '#fbbf24', secondary: '#f59e0b', accent: '#fcd34d' },
            { id: 'blue', name: 'Синяя глубина', primary: '#3b82f6', secondary: '#2563eb', accent: '#60a5fa' },
            { id: 'pink', name: 'Розовая мечта', primary: '#ec4899', secondary: '#db2777', accent: '#f472b6' },
            { id: 'orange', name: 'Оранжевый закат', primary: '#f97316', secondary: '#ea580c', accent: '#fb923c' }
        ];

        // Доступные иконки монет
        const coinIcons = ['💎', '💰', '🪙', '🏆', '⭐', '🔮', '💠', '🌟', '✨', '🎯', '🎰', '🎲'];

        // PvP способности для рабочих
        const pvpAbilities = {
            // Обычные рабочие (1-10)
            'Барсик': {
                health: 100,
                attack: 15,
                defense: 10,
                magic: 5,
                attackName: 'Когти атаки',
                defenseName: 'Кошачья реакция',
                magicName: 'Мурлыканье'
            },
            'Бензин': {
                health: 90,
                attack: 20,
                defense: 8,
                magic: 3,
                attackName: 'Огненный взрыв',
                defenseName: 'Горючее покрытие',
                magicName: 'Заправка энергией'
            },
            'Майн': {
                health: 110,
                attack: 18,
                defense: 12,
                magic: 2,
                attackName: 'Удар киркой',
                defenseName: 'Каменная кожа',
                magicName: 'Рудная удача'
            },
            'Донат': {
                health: 85,
                attack: 25,
                defense: 5,
                magic: 8,
                attackName: 'Денежный дождь',
                defenseName: 'Золотой щит',
                magicName: 'Инвестиция'
            },
            'Крипта': {
                health: 95,
                attack: 22,
                defense: 7,
                magic: 6,
                attackName: 'Волатильность',
                defenseName: 'Блокчейн',
                magicName: 'Майнинг'
            },
            'Фермер': {
                health: 105,
                attack: 16,
                defense: 11,
                magic: 4,
                attackName: 'Урожайный удар',
                defenseName: 'Защита поля',
                magicName: 'Рост'
            },
            'Шахтер': {
                health: 115,
                attack: 19,
                defense: 13,
                magic: 1,
                attackName: 'Горный обвал',
                defenseName: 'Прочная броня',
                magicName: 'Поиск руды'
            },
            'Строитель': {
                health: 100,
                attack: 17,
                defense: 14,
                magic: 3,
                attackName: 'Удар молотком',
                defenseName: 'Стенная защита',
                magicName: 'Ремонт'
            },
            'Повар': {
                health: 90,
                attack: 14,
                defense: 9,
                magic: 7,
                attackName: 'Острый нож',
                defenseName: 'Фартук защиты',
                magicName: 'Лечебный суп'
            },
            'Водитель': {
                health: 95,
                attack: 18,
                defense: 10,
                magic: 5,
                attackName: 'Таран',
                defenseName: 'Автозащита',
                magicName: 'Ускорение'
            },
            // Редкие рабочие (11-20)
            'Астрал': {
                health: 120,
                attack: 20,
                defense: 15,
                magic: 12,
                attackName: 'Пылевой меч',
                defenseName: 'Звездный щит',
                magicName: 'Вихрь звезд'
            },
            'Неон': {
                health: 110,
                attack: 24,
                defense: 12,
                magic: 10,
                attackName: 'Неоновый удар',
                defenseName: 'Световая завеса',
                magicName: 'Ослепление'
            },
            'Кибер': {
                health: 105,
                attack: 26,
                defense: 11,
                magic: 11,
                attackName: 'Кибератака',
                defenseName: 'Антивирус',
                magicName: 'Хакерство'
            },
            'Тесла': {
                health: 100,
                attack: 28,
                defense: 10,
                magic: 14,
                attackName: 'Электрический разряд',
                defenseName: 'Магнитное поле',
                magicName: 'Перезагрузка'
            },
            'Квант': {
                health: 95,
                attack: 30,
                defense: 8,
                magic: 16,
                attackName: 'Квантовый удар',
                defenseName: 'Портальный щит',
                magicName: 'Телепортация'
            },
            'Плазма': {
                health: 108,
                attack: 25,
                defense: 13,
                magic: 12,
                attackName: 'Плазменный выстрел',
                defenseName: 'Энергетический барьер',
                magicName: 'Плазменный шторм'
            },
            'Лазер': {
                health: 102,
                attack: 32,
                defense: 9,
                magic: 13,
                attackName: 'Лазерный луч',
                defenseName: 'Зеркальная защита',
                magicName: 'Преломление'
            },
            'Робот': {
                health: 125,
                attack: 22,
                defense: 16,
                magic: 8,
                attackName: 'Механический удар',
                defenseName: 'Стальной щит',
                magicName: 'Саморемонт'
            },
            'Дроид': {
                health: 115,
                attack: 24,
                defense: 14,
                magic: 10,
                attackName: 'Дроидная атака',
                defenseName: 'Энергетический купол',
                magicName: 'Сканирование'
            },
            'Меха': {
                health: 130,
                attack: 20,
                defense: 18,
                magic: 6,
                attackName: 'Мехаудар',
                defenseName: 'Титановая броня',
                magicName: 'Сверхрежим'
            },
            // Эпические рабочие (21-30)
            'Дракон': {
                health: 140,
                attack: 35,
                defense: 20,
                magic: 18,
                attackName: 'Огненное дыхание',
                defenseName: 'Чешуйчатый щит',
                magicName: 'Драконий рев'
            },
            'Феникс': {
                health: 120,
                attack: 38,
                defense: 16,
                magic: 22,
                attackName: 'Когти феникса',
                defenseName: 'Огненное оперение',
                magicName: 'Возрождение'
            },
            'Титан': {
                health: 160,
                attack: 30,
                defense: 25,
                magic: 10,
                attackName: 'Титанский удар',
                defenseName: 'Броня титана',
                magicName: 'Сила земли'
            },
            'Валькирия': {
                health: 130,
                attack: 32,
                defense: 18,
                magic: 20,
                attackName: 'Божественный удар',
                defenseName: 'Щит валькирии',
                magicName: 'Призыв небес'
            },
            'Самурай': {
                health: 125,
                attack: 40,
                defense: 15,
                magic: 12,
                attackName: 'Катана',
                defenseName: 'Быстрая защита',
                magicName: 'Медитация'
            },
            'Ниндзя': {
                health: 110,
                attack: 42,
                defense: 12,
                magic: 16,
                attackName: 'Сюрикен',
                defenseName: 'Теневой шаг',
                magicName: 'Иллюзия'
            },
            'Маг': {
                health: 100,
                attack: 28,
                defense: 14,
                magic: 30,
                attackName: 'Магический удар',
                defenseName: 'Магический барьер',
                magicName: 'Заклинание хаоса'
            },
            'Волшебник': {
                health: 95,
                attack: 25,
                defense: 12,
                magic: 35,
                attackName: 'Посох мага',
                defenseName: 'Щит мудрости',
                magicName: 'Волшебство'
            },
            'Алхимик': {
                health: 105,
                attack: 26,
                defense: 13,
                magic: 28,
                attackName: 'Эликсир силы',
                defenseName: 'Каменная кожа',
                magicName: 'Трансформация'
            },
            'Мондея': {
                health: 90,
                attack: 20,
                defense: 10,
                magic: 25,
                attackName: 'Накладываемая боль',
                defenseName: 'Понижение защиты',
                magicName: 'Геометрическая прогрессия'
            }
        };

        // Боты для PvP
        const pvpBots = [
            { name: 'Барсик', level: 1, health: 100, attack: 15, defense: 10, magic: 5, icon: '🐱' },
            { name: 'Бензин', level: 5, health: 90, attack: 20, defense: 8, magic: 3, icon: '⛽' },
            { name: 'Астрал', level: 10, health: 120, attack: 20, defense: 15, magic: 12, icon: '🌟' },
            { name: 'Дракон', level: 15, health: 140, attack: 35, defense: 20, magic: 18, icon: '🐲' },
            { name: 'Мондея', level: 20, health: 90, attack: 20, defense: 10, magic: 25, icon: '🔮' }
        ];

        // Аудио система
        let audioContext = null;
        let analyser = null;
        let source = null;
        let dataArray = null;
        let animationId = null;
        let visualizerStyle = 'bars';
        let particles = [];

        // Инициализация аудио системы
        function initAudioSystem() {
            const audioPlayer = document.getElementById('audioPlayer');
            
            audioPlayer.addEventListener('loadedmetadata', () => {
                updateTrackInfo();
            });
            
            audioPlayer.addEventListener('timeupdate', () => {
                updateCurrentTime();
                updateProgressBar();
            });
            
            audioPlayer.addEventListener('ended', () => {
                stopAudio();
            });
            
            // Инициализация Web Audio API
            if (!audioContext) {
                try {
                    audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    analyser = audioContext.createAnalyser();
                    analyser.fftSize = 256;
                    const bufferLength = analyser.frequencyBinCount;
                    dataArray = new Uint8Array(bufferLength);
                    
                    source = audioContext.createMediaElementSource(audioPlayer);
                    source.connect(analyser);
                    analyser.connect(audioContext.destination);
                } catch (e) {
                    console.log('Web Audio API не поддерживается');
                }
            }
            
            // Загрузка музыки из папки
            loadMusicFromFolder();
            
            // Запуск визуализатора если включен
            if (gameData.audio.visualizerEnabled && analyser) {
                startVisualizer();
            }
        }

        // Переключение боковой панели
        function toggleAudioSidebar() {
            const sidebar = document.getElementById('audioSidebar');
            const toggle = document.getElementById('sidebarToggle');
            
            sidebar.classList.toggle('expanded');
            
            if (sidebar.classList.contains('expanded')) {
                toggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                toggle.innerHTML = '<i class="fas fa-music"></i>';
            }
        }

        // Обновление прогресс-бара
        function updateProgressBar() {
            const audioPlayer = document.getElementById('audioPlayer');
            const progressFill = document.getElementById('progressFill');
            
            if (audioPlayer.duration) {
                const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                progressFill.style.width = progress + '%';
            }
        }

        // Клик по прогресс-бару для перемотки
        document.addEventListener('DOMContentLoaded', function() {
            const progressBar = document.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.addEventListener('click', function(e) {
                    const audioPlayer = document.getElementById('audioPlayer');
                    const rect = progressBar.getBoundingClientRect();
                    const percent = (e.clientX - rect.left) / rect.width;
                    
                    if (audioPlayer.duration) {
                        audioPlayer.currentTime = percent * audioPlayer.duration;
                    }
                });
            }
        });

        // Загрузка музыки из папки
        async function loadMusicFromFolder() {
            // Популярные аудиоформаты
            const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.flac', '.aac'];
            const musicFiles = [];
            
            // Проверяем стандартные пути
            const possiblePaths = [
                'music/',
                './music/',
                '../music/',
                '/music/'
            ];
            
            for (const path of possiblePaths) {
                try {
                    // Пробуем загрузить файлы из папки
                    for (const ext of audioExtensions) {
                        // Создаем тестовые файлы для проверки
                        const testFiles = [
                            'track1' + ext,
                            'song' + ext,
                            'music' + ext,
                            'audio' + ext
                        ];
                        
                        for (const file of testFiles) {
                            const fullPath = path + file;
                            try {
                                const response = await fetch(fullPath, { method: 'HEAD' });
                                if (response.ok) {
                                    musicFiles.push({
                                        name: file.replace(ext, ''),
                                        path: fullPath
                                    });
                                }
                            } catch (e) {
                                // Файл не найден, продолжаем поиск
                            }
                        }
                    }
                } catch (e) {
                    // Путь не найден, продолжаем
                }
            }
            
            // Если нашли файлы, добавляем их в плейлист
            if (musicFiles.length > 0) {
                gameData.audio.enabled = true;
                gameData.audio.currentTrack = musicFiles[0];
                loadTrack(musicFiles[0].path);
                showNotification(`🎵 Найдено ${musicFiles.length} треков в папке music!`, 'success');
            } else {
                // Создаем плейлист по умолчанию (можно добавить онлайн треки)
                showNotification('🎵 Папка music не найдена. Загрузите музыку вручную.', 'info');
            }
        }

        // Загрузка трека
        function loadTrack(trackPath) {
            const audioPlayer = document.getElementById('audioPlayer');
            audioPlayer.src = trackPath;
            
            // Извлекаем имя файла из пути
            const fileName = trackPath.split('/').pop().split('\\').pop();
            document.getElementById('trackName').textContent = fileName;
            
            gameData.audio.currentTrack = trackPath;
        }

        // Управление воспроизведением
        function togglePlayPause() {
            const audioPlayer = document.getElementById('audioPlayer');
            const playPauseBtn = document.getElementById('playPauseBtn');
            
            if (gameData.audio.isPlaying) {
                audioPlayer.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                gameData.audio.isPlaying = false;
            } else {
                audioPlayer.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                gameData.audio.isPlaying = true;
                
                if (!animationId && gameData.audio.visualizerEnabled) {
                    startVisualizer();
                }
            }
        }

        function stopAudio() {
            const audioPlayer = document.getElementById('audioPlayer');
            const playPauseBtn = document.getElementById('playPauseBtn');
            
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            gameData.audio.isPlaying = false;
        }

        // Загрузка файла вручную
        function loadAudioFile(event) {
            const file = event.target.files[0];
            if (file) {
                const audioPlayer = document.getElementById('audioPlayer');
                const url = URL.createObjectURL(file);
                
                audioPlayer.src = url;
                document.getElementById('trackName').textContent = file.name;
                
                gameData.audio.currentTrack = url;
                gameData.audio.enabled = true;
                
                showNotification(`🎵 Загружен: ${file.name}`, 'success');
            }
        }

        // Управление громкостью
        function updateVolume(value) {
            const audioPlayer = document.getElementById('audioPlayer');
            const volume = value / 100;
            
            audioPlayer.volume = volume;
            gameData.audio.volume = volume;
            
            // Обновляем отображение громкости
            document.getElementById('volumeValue').textContent = value + '%';
        }

        // Обновление информации о треке
        function updateTrackInfo() {
            const audioPlayer = document.getElementById('audioPlayer');
            const duration = formatTime(audioPlayer.duration);
            document.getElementById('duration').textContent = duration;
        }

        function updateCurrentTime() {
            const audioPlayer = document.getElementById('audioPlayer');
            const currentTime = formatTime(audioPlayer.currentTime);
            document.getElementById('currentTime').textContent = currentTime;
        }

        function formatTime(seconds) {
            if (isNaN(seconds)) return '0:00';
            
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs.toString().padStart(2, '0')}`;
        }

        // Визуализатор
        function startVisualizer() {
            const canvas = document.getElementById('visualizerCanvas');
            const ctx = canvas.getContext('2d');
            
            // Установка размера canvas
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            let lastTime = 0;
            const targetFPS = 30; // Уменьшаем FPS для оптимизации
            const frameInterval = 1000 / targetFPS;
            
            function draw(currentTime) {
                animationId = requestAnimationFrame(draw);
                
                // Ограничиваем FPS
                if (currentTime - lastTime < frameInterval) {
                    return;
                }
                lastTime = currentTime;
                
                if (!analyser) return;
                
                analyser.getByteFrequencyData(dataArray);
                
                // Очистка canvas с эффектом следа

function startVisualizer() {
    if (!visualizerRunning) {
        visualizerRunning = true;
        drawVisualizer();
    }
}

function drawVisualizer() {
    if (!visualizerRunning) return;
    
    requestAnimationFrame(drawVisualizer);
    
    const canvas = document.getElementById('visualizerCanvas');
    if (!canvas || !audioContext || !analyser) return;
    
    const ctx = canvas.getContext('2d');
    
    // Уменьшаем FPS для производительности
    if (!visualizerFrameCount) visualizerFrameCount = 0;
    if (visualizerFrameCount++ % 2 !== 0) return; // Пропускаем каждый второй кадр
    
    // Проверяем видимость canvas
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    analyser.getByteFrequencyData(dataArray);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 2;
        
        const r = barHeight + (25 * (i / bufferLength));
        const g = 250 * (i / bufferLength);
        const b = 50;
        
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);
        
        x += barWidth + 1;
    }
}

function drawBars(ctx, canvas) {
    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let x = 0;
    
    for (let i = 0; i < dataArray.length; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.7;
        
        // Градиент для полос
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, `hsl(${i * 360 / dataArray.length}, 100%, 50%)`);
        gradient.addColorStop(1, `hsl(${i * 360 / dataArray.length}, 100%, 30%)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
    }
}

function drawWave(ctx, canvas) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.8)';
    ctx.beginPath();
    
    const sliceWidth = canvas.width / dataArray.length;
    let x = 0;
    
    for (let i = 0; i < dataArray.length; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        x += sliceWidth;
    }
    
    ctx.stroke();
}

function drawCircular(ctx, canvas) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 50;
    
    for (let i = 0; i < dataArray.length; i++) {
        const angle = (i / dataArray.length) * Math.PI * 2;
        const barHeight = (dataArray[i] / 255) * radius;
        
        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(angle) * (radius + barHeight);
        const y2 = centerY + Math.sin(angle) * (radius + barHeight);
        
        ctx.strokeStyle = `hsl(${i * 360 / dataArray.length}, 100%, 50%)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}

function drawParticles(ctx, canvas) {
    // Создаем новые частицы на основе аудио
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    
    if (average > 50 && particles.length < 100) {
        particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height,
            vx: (Math.random() - 0.5) * 4,
            vy: -Math.random() * 10 - 5,
            size: Math.random() * 5 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            life: 1
        });
    }
    
    // Обновляем и рисуем частицы
    particles = particles.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.2; // гравитация
        particle.life -= 0.01;
        
        if (particle.life > 0) {
            ctx.globalAlpha = particle.life;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
            return true;
        }
        return false;
    });
}
                const y = v * canvas.height / 2;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                
                x += sliceWidth;
            }
            
            ctx.stroke();
        }

        function drawCircular(ctx, canvas) {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = Math.min(centerX, centerY) - 50;
            
            for (let i = 0; i < dataArray.length; i++) {
                const angle = (i / dataArray.length) * Math.PI * 2;
                const barHeight = (dataArray[i] / 255) * radius;
                
                const x1 = centerX + Math.cos(angle) * radius;
                const y1 = centerY + Math.sin(angle) * radius;
                const x2 = centerX + Math.cos(angle) * (radius + barHeight);
                const y2 = centerY + Math.sin(angle) * (radius + barHeight);
                
                ctx.strokeStyle = `hsl(${i * 360 / dataArray.length}, 100%, 50%)`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        }

        function drawParticles(ctx, canvas) {
            // Создаем новые частицы на основе аудио
            const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
            
            if (average > 50 && particles.length < 100) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: canvas.height,
                    vx: (Math.random() - 0.5) * 4,
                    vy: -Math.random() * 10 - 5,
                    size: Math.random() * 5 + 2,
                    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                    life: 1
                });
            }
            
            // Обновляем и рисуем частицы
            particles = particles.filter(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.2; // гравитация
                particle.life -= 0.01;
                
                if (particle.life > 0) {
                    ctx.globalAlpha = particle.life;
                    ctx.fillStyle = particle.color;
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                    
                    return true;
                }
                return false;
            });
        }

        // Управление визуализатором
        function toggleVisualizer() {
            gameData.audio.visualizerEnabled = !gameData.audio.visualizerEnabled;
            
            if (gameData.audio.visualizerEnabled) {
                startVisualizer();
                document.getElementById('vizToggle').innerHTML = '<i class="fas fa-eye-slash"></i> Скрыть';
            } else {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
                document.getElementById('vizToggle').innerHTML = '<i class="fas fa-eye"></i> Визуализатор';
            }
        }

        function changeVisualizerStyle(style) {
            visualizerStyle = style;
        }

        // Применить тему
        function applyTheme(themeId) {
            const theme = themes.find(t => t.id === themeId);
            if (!theme) return;

            document.documentElement.style.setProperty('--neon-cyan', theme.primary);
            document.documentElement.style.setProperty('--neon-purple', theme.secondary);
            document.documentElement.style.setProperty('--neon-pink', theme.accent);
            
            gameSettings.theme = themeId;
            saveSettings();
        }

        // Применить иконку монет
        function applyCoinIcon(icon) {
            gameSettings.icon = icon;
            
            // Обновляем все иконки монет в интерфейсе
            document.querySelectorAll('.coin-icon').forEach(el => {
                el.textContent = icon;
            });
            
            // Обновляем баланс
            updateBalance();
            
            saveSettings();
        }

        // Создать частицы для баланса
        function createBalanceParticles() {
            const container = document.getElementById('balanceParticles');
            if (!container) return;
            
            container.innerHTML = '';
            
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.className = 'balance-particle';
                particle.style.setProperty('--random-x', (Math.random() - 0.5) * 2);
                particle.style.left = `${20 + Math.random() * 60}%`;
                particle.style.top = `${20 + Math.random() * 60}%`;
                particle.style.animationDelay = `${Math.random() * 3}s`;
                particle.style.animationDuration = `${2 + Math.random() * 2}s`;
                container.appendChild(particle);
            }
        }

        // Анимировать изменение баланса
        function animateBalanceChange() {
            const balanceIcon = document.getElementById('balanceIcon');
            if (balanceIcon) {
                balanceIcon.classList.remove('bounce');
                void balanceIcon.offsetWidth; // Force reflow
                balanceIcon.classList.add('bounce');
            }
        }

        // Показать приветственное окно
        function showWelcome() {
            const welcomeModal = document.getElementById('welcomeModal');
            welcomeModal.classList.add('show');
            playSound('clickSound');
        }

        // Пропустить приветствие
        function skipWelcome() {
            const welcomeModal = document.getElementById('welcomeModal');
            welcomeModal.classList.remove('show');
            playSound('clickSound');
            
            // Начинаем игру после закрытия приветствия
            setTimeout(() => {
                initGameAfterStart();
            }, 300);
        }

        // PvP система
        let currentBattle = null;
        let battleState = {
            playerHealth: 100,
            playerMaxHealth: 100,
            botHealth: 100,
            botMaxHealth: 100,
            playerDefense: 0,
            botDefense: 0,
            turn: 'player',
            battleActive: false,
            selectedWorker: null,
            selectedBot: null,
            painStack: 0 // Для Мондея
        };

        // Проверка разблокировки PvP
        function checkPvpUnlock() {
            if (gameData.openedCases >= 10) {
                if (!gameData.pvp.unlocked) {
                    gameData.pvp.unlocked = true;
                    showNotification('⚔️ PvP Арена разблокирована! Доступна новая вкладка!', 'success');
                }
                document.getElementById('pvp-tab-btn').style.display = 'flex';
            }
        }

        // Обновление выносливости
        function updateStamina() {
            const now = Date.now();
            const lastReset = gameData.pvp.lastStaminaReset;
            const daysPassed = Math.floor((now - lastReset) / (1000 * 60 * 60 * 24));
            
            if (daysPassed >= 1) {
                gameData.pvp.stamina = Math.min(gameData.pvp.stamina + (daysPassed * 30), 30);
                gameData.pvp.lastStaminaReset = now;
            }
            
            document.getElementById('staminaAmount').textContent = gameData.pvp.stamina;
        }

        // Рендер PvP рабочих
        function renderPvpWorkers() {
            const container = document.getElementById('pvpWorkersGrid');
            container.innerHTML = '';
            
            const pvpWorkers = gameData.workers.filter(worker => {
                const abilities = pvpAbilities[worker.name];
                return abilities; // Только рабочие с PvP способностями
            });
            
            if (pvpWorkers.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">⚔️</div>
                        <div class="empty-title">Нет PvP рабочих</div>
                        <div class="empty-description">Откройте кейсы чтобы получить рабочих для PvP!</div>
                    </div>
                `;
                return;
            }
            
            pvpWorkers.forEach(worker => {
                const abilities = pvpAbilities[worker.name];
                const workerCard = document.createElement('div');
                workerCard.className = 'pvp-worker-card';
                
                // Добавляем класс если рабочий выбран
                if (selectedPvpWorker?.id === worker.id) {
                    workerCard.classList.add('selected');
                }
                
                workerCard.onclick = () => selectPvpWorker(worker);
                
                workerCard.innerHTML = `
                    <div class="pvp-worker-avatar">${worker.icon}</div>
                    <div class="pvp-worker-info">
                        <div class="pvp-worker-name">${worker.name}</div>
                        <div class="pvp-worker-stats">
                            <div class="stat">❤️ ${abilities.health}</div>
                            <div class="stat">⚔️ ${abilities.attack}</div>
                            <div class="stat">🛡️ ${abilities.defense}</div>
                            <div class="stat">✨ ${abilities.magic}</div>
                        </div>
                    </div>
                    ${selectedPvpWorker?.id === worker.id ? '<div class="selected-badge">✓</div>' : ''}
                `;
                
                container.appendChild(workerCard);
            });
        }

        // Выбор рабочего для PvP
        function selectPvpWorker(worker) {
            if (gameData.pvp.stamina < 5) {
                showNotification('Недостаточно выносливости! Нужно 5 очков.', 'error');
                return;
            }
            
            selectedPvpWorker = worker;
            gameData.pvp.selectedWorker = worker;
            
            // Показываем кнопку начала битвы
            document.getElementById('battleStartContainer').style.display = 'block';
            
            // Обновляем выделение рабочих
            renderPvpWorkers();
            
            showNotification(`⚔️ Выбран рабочий: ${worker.name}`, 'success');
        }

        // Начать выбранную битву
        function startSelectedBattle() {
            if (!selectedPvpWorker) {
                showNotification('Сначала выберите рабочего!', 'error');
                return;
            }
            
            if (gameData.pvp.stamina < 5) {
                showNotification('Недостаточно выносливости! Нужно 5 очков.', 'error');
                return;
            }
            
            // Выбираем бота
            const botLevel = Math.min(Math.floor(selectedPvpWorker.level / 5) + 1, 5);
            const bot = pvpBots[Math.min(botLevel - 1, pvpBots.length - 1)];
            
            // Начинаем битву в модальном окне
            startBattleInModal(selectedPvpWorker, bot);
            
            // Скрываем кнопку после начала битвы
            document.getElementById('battleStartContainer').style.display = 'none';
        }

        // Открытие модального окна PvP
        function openPvpModal() {
            document.getElementById('pvpModal').classList.add('show');
            playSound('clickSound');
        }

        // Попытка закрытия модального окна PvP
        function attemptClosePvpModal() {
            // Проверяем идет ли битва
            if (battleState && (battleState.playerHealth > 0 && battleState.botHealth > 0)) {
                showNotification('⚠️ Нельзя выйти во время битвы!', 'error');
                playSound('errorSound');
                return;
            }
            
            closePvpModal();
        }

        // Закрытие модального окна PvP
        function closePvpModal() {
            document.getElementById('pvpModal').classList.remove('show');
            playSound('clickSound');
            
            // Очищаем лог битвы
            document.getElementById('modalBattleLog').innerHTML = '';
            
            // Сбрасываем состояние битвы
            battleState = null;
        }

        // Начало битвы в модальном окне
        function startBattleInModal(worker, bot) {
            const abilities = pvpAbilities[worker.name];
            
            battleState = {
                playerHealth: abilities.health,
                playerMaxHealth: abilities.health,
                botHealth: bot.health,
                botMaxHealth: bot.health,
                playerDefense: 0,
                botDefense: 0,
                turn: 'player',
                playerSpecialStacks: 0,
                botSpecialStacks: 0,
                battleActive: true
            };
            
            // Блокируем кнопку закрытия
            const closeBtn = document.querySelector('.pvp-modal-close');
            closeBtn.classList.add('battle-active');
            
            // Обновляем UI
            document.getElementById('modalPlayerName').textContent = gameData.playerName;
            document.getElementById('modalPlayerIcon').textContent = worker.icon;
            document.getElementById('modalPlayerWorkerName').textContent = worker.name;
            
            document.getElementById('modalBotName').textContent = bot.name;
            document.getElementById('modalBotIcon').textContent = bot.icon;
            document.getElementById('modalBotWorkerName').textContent = bot.name;
            
            // Показываем арены
            document.getElementById('modalBattleArena').style.display = 'block';
            document.getElementById('modalBattleControls').style.display = 'block';
            document.getElementById('modalBattleLog').style.display = 'block';
            
            // Очищаем и обновляем UI
            document.getElementById('modalBattleLog').innerHTML = '';
            updateBattleUIModal();
            
            addBattleLogModal(`⚔️ Битва началась: ${worker.name} против ${bot.name}!`);
            addBattleLogModal(`📊 ${worker.name}: ${abilities.health} HP, ${abilities.attack} ATK, ${abilities.defense} DEF, ${abilities.magic} MAG`);
            addBattleLogModal(`📊 ${bot.name}: ${bot.health} HP, ${bot.attack} ATK, ${bot.defense} DEF, ${bot.magic} MAG`);
        }

        // Добавление сообщения в лог битвы в модальном окне
        function addBattleLogModal(message) {
            const log = document.getElementById('modalBattleLog');
            const logEntry = document.createElement('div');
            logEntry.className = 'battle-log-entry';
            logEntry.textContent = message;
            log.appendChild(logEntry);
            log.scrollTop = log.scrollHeight;
        }

        // Действие бота в модальном окне
        function botActionModal() {
            if (!battleState.battleActive) return;
            
            const bot = battleState.selectedBot;
            let damage = 0;
            let logMessage = '';
            
            // Простой AI для бота
            const actions = ['attack', 'defense', 'magic'];
            const action = actions[Math.floor(Math.random() * actions.length)];
            
            switch(action) {
                case 'attack':
                    damage = Math.max(bot.attack - battleState.playerDefense, 5);
                    battleState.playerHealth = Math.max(0, battleState.playerHealth - damage);
                    logMessage = `⚔️ ${bot.name} атакует и наносит ${damage} урона!`;
                    break;
                    
                case 'defense':
                    battleState.botDefense = bot.defense;
                    logMessage = `🛡️ ${bot.name} защищается и повышает защиту!`;
                    break;
                    
                case 'magic':
                    damage = bot.magic;
                    battleState.playerHealth = Math.max(0, battleState.playerHealth - damage);
                    logMessage = `✨ ${bot.name} использует магию и наносит ${damage} урона!`;
                    break;
            }
            
            addBattleLogModal(logMessage);
            
            // Сброс защиты после хода
            battleState.playerDefense = Math.max(0, battleState.playerDefense - 5);
            
            // Проверка поражения
            if (battleState.playerHealth <= 0) {
                endBattleModal(false);
                return;
            }
            
            // Возврат хода игроку
            battleState.turn = 'player';
            updateBattleUIModal(); // Обновляем UI после смены хода
        }

        // Завершение битвы в модальном окне
        function endBattleModal(playerWon) {
            battleState.battleActive = false;
            
            // Разблокируем кнопку закрытия
            const closeBtn = document.querySelector('.pvp-modal-close');
            closeBtn.classList.remove('battle-active');
            
            gameData.pvp.battles++;
            if (playerWon) {
                gameData.pvp.wins++;
                showNotification(`🏆 Победа! ${battleState.selectedWorker.name} победил ${battleState.selectedBot.name}!`, 'success');
                addBattleLogModal(`🏆 ${battleState.selectedWorker.name} победил!`);
                
                // Добавляем бота в коллекцию игрока
                const botWorker = {
                    id: Date.now(),
                    name: battleState.selectedBot.name,
                    icon: battleState.selectedBot.icon,
                    income: battleState.selectedBot.level * 10,
                    level: battleState.selectedBot.level,
                    experience: 0,
                    maxExperience: 100,
                    rarity: 'common',
                    style: 'normal'
                };
                gameData.workers.push(botWorker);
            } else {
                gameData.pvp.losses++;
                showNotification(`💀 Поражение! ${battleState.selectedWorker.name} проиграл ${battleState.selectedBot.name}!`, 'error');
                addBattleLogModal(`💀 ${battleState.selectedWorker.name} проиграл...`);
                
                // Удаляем рабочего
                gameData.workers = gameData.workers.filter(w => w.id !== battleState.selectedWorker.id);
            }
            
            // Обновляем статистику
            updatePvpStats();
            
            // Сохраняем игру
            saveGame();
            
            // Закрываем модальное окно через 3 секунды
            setTimeout(() => {
                closePvpModal();
                renderPvpWorkers();
                renderWorkers();
            }, 3000);
        }

        // Начало битвы
        function startBattle(worker, bot) {
            const abilities = pvpAbilities[worker.name];
            
            battleState = {
                playerHealth: abilities.health,
                playerMaxHealth: abilities.health,
                botHealth: bot.health,
                botMaxHealth: bot.health,
                playerDefense: 0,
                botDefense: 0,
                turn: 'player',
                battleActive: true,
                selectedWorker: worker,
                selectedBot: bot,
                painStack: 0
            };
            
            currentBattle = battleState;
            
            // Обновляем UI
            updateBattleUI();
            
            // Обновляем информацию о бойцах
            document.getElementById('playerBattleName').textContent = gameData.playerName;
            document.getElementById('playerWorkerIcon').textContent = worker.icon;
            document.getElementById('playerWorkerName').textContent = worker.name;
            document.getElementById('playerAvatar').textContent = worker.icon;
            document.getElementById('playerFighterName').textContent = worker.name;
            
            document.getElementById('botBattleName').textContent = bot.name;
            document.getElementById('botWorkerIcon').textContent = bot.icon;
            document.getElementById('botWorkerName').textContent = bot.name;
            document.getElementById('botAvatar').textContent = bot.icon;
            document.getElementById('botFighterName').textContent = bot.name;
            
            // Добавляем лог
            addBattleLog(`⚔️ Битва началась: ${worker.name} VS ${bot.name}!`);
            
            // Списываем выносливость
            gameData.pvp.stamina -= 5;
            updateStamina();
        }

        // Действие игрока
        function playerAction(action) {
            if (!battleState.battleActive || battleState.turn !== 'player') return;
            
            const abilities = pvpAbilities[battleState.selectedWorker.name];
            let damage = 0;
            let logMessage = '';
            
            switch(action) {
                case 'attack':
                    damage = Math.max(abilities.attack - battleState.botDefense, 5);
                    battleState.botHealth = Math.max(0, battleState.botHealth - damage);
                    logMessage = `⚔️ ${battleState.selectedWorker.name} использует ${abilities.attackName} и наносит ${damage} урона!`;
                    break;
                    
                case 'defense':
                    battleState.playerDefense = abilities.defense;
                    logMessage = `🛡️ ${battleState.selectedWorker.name} использует ${abilities.defenseName} и повышает защиту!`;
                    break;
                    
                case 'magic':
                    if (battleState.selectedWorker.name === 'Мондея') {
                        battleState.painStack++;
                        logMessage = `✨ ${battleState.selectedWorker.name} использует ${abilities.magicName}! Боль возрастает (${battleState.painStack}x)`;
                    } else {
                        damage = abilities.magic;
                        battleState.botHealth = Math.max(0, battleState.botHealth - damage);
                        logMessage = `✨ ${battleState.selectedWorker.name} использует ${abilities.magicName} и наносит ${damage} магического урона!`;
                    }
                    break;
            }
            
            addBattleLogModal(logMessage);
            
            // Применяем боль от Мондея
            if (battleState.painStack > 0 && battleState.selectedWorker.name === 'Мондея') {
                const painDamage = Math.floor(5 * Math.pow(1.5, battleState.painStack - 1));
                battleState.botHealth = Math.max(0, battleState.botHealth - painDamage);
                addBattleLogModal(`💀 Накладываемая боль наносит ${painDamage} урона!`);
            }
            
            // Сброс защиты после хода
            battleState.botDefense = Math.max(0, battleState.botDefense - 5);
            
            updateBattleUIModal();
            
            // Проверка победы
            if (battleState.botHealth <= 0) {
                endBattleModal(true);
                return;
            }
            
            // Ход бота
            battleState.turn = 'bot';
            setTimeout(() => botActionModal(), 1500);
        }

        // Действие бота
        function botAction() {
            if (!battleState.battleActive) return;
            
            const bot = battleState.selectedBot;
            let damage = 0;
            let logMessage = '';
            
            // Простой AI для бота
            const actions = ['attack', 'defense', 'magic'];
            const action = actions[Math.floor(Math.random() * actions.length)];
            
            switch(action) {
                case 'attack':
                    damage = Math.max(bot.attack - battleState.playerDefense, 5);
                    battleState.playerHealth = Math.max(0, battleState.playerHealth - damage);
                    logMessage = `⚔️ ${bot.name} атакует и наносит ${damage} урона!`;
                    break;
                    
                case 'defense':
                    battleState.botDefense = bot.defense;
                    logMessage = `🛡️ ${bot.name} защищается и повышает защиту!`;
                    break;
                    
                case 'magic':
                    damage = bot.magic;
                    battleState.playerHealth = Math.max(0, battleState.playerHealth - damage);
                    logMessage = `✨ ${bot.name} использует магию и наносит ${damage} урона!`;
                    break;
            }
            
            addBattleLog(logMessage);
            
            // Сброс защиты после хода
            battleState.playerDefense = Math.max(0, battleState.playerDefense - 5);
            
            // Проверка поражения
            if (battleState.playerHealth <= 0) {
                endBattle(false);
                return;
            }
            
            // Возврат хода игроку
            battleState.turn = 'player';
            updateBattleUI(); // Обновляем UI после смены хода
        }

        // Обновление UI битвы
        function updateBattleUI() {
            // Здоровье игрока
            const playerHealthPercent = (battleState.playerHealth / battleState.playerMaxHealth) * 100;
            document.getElementById('playerHealth').style.width = playerHealthPercent + '%';
            document.getElementById('playerHealthText').textContent = `${battleState.playerHealth}/${battleState.playerMaxHealth}`;
            
            // Здоровье бота
            const botHealthPercent = (battleState.botHealth / battleState.botMaxHealth) * 100;
            document.getElementById('botHealth').style.width = botHealthPercent + '%';
            document.getElementById('botHealthText').textContent = `${battleState.botHealth}/${battleState.botMaxHealth}`;
            
            // Блокировка кнопок
            const buttons = document.querySelectorAll('.battle-btn');
            buttons.forEach(btn => {
                btn.disabled = battleState.turn !== 'player' || !battleState.battleActive;
            });
        }

        // Добавление сообщения в лог битвы
        function addBattleLog(message) {
            const log = document.getElementById('battleLog');
            const logEntry = document.createElement('div');
            logEntry.className = 'battle-log-entry';
            logEntry.textContent = message;
            log.appendChild(logEntry);
            log.scrollTop = log.scrollHeight;
        }

        // Завершение битвы
        function endBattle(playerWon) {
            battleState.battleActive = false;
            
            gameData.pvp.battles++;
            if (playerWon) {
                gameData.pvp.wins++;
                showNotification(`🏆 Победа! ${battleState.selectedWorker.name} победил ${battleState.selectedBot.name}!`, 'success');
                addBattleLog(`🏆 ${battleState.selectedWorker.name} победил!`);
                
                // Добавляем бота в коллекцию игрока
                const botWorker = {
                    id: Date.now(),
                    name: battleState.selectedBot.name,
                    icon: battleState.selectedBot.icon,
                    income: battleState.selectedBot.level * 10,
                    level: battleState.selectedBot.level,
                    experience: 0,
                    maxExperience: 100,
                    rarity: 'common',
                    style: 'normal'
                };
                gameData.workers.push(botWorker);
            } else {
                gameData.pvp.losses++;
                showNotification(`💀 Поражение! ${battleState.selectedWorker.name} проиграл ${battleState.selectedBot.name}!`, 'error');
                addBattleLog(`💀 ${battleState.selectedWorker.name} проиграл...`);
                
                // Удаляем рабочего
                gameData.workers = gameData.workers.filter(w => w.id !== battleState.selectedWorker.id);
            }
            
            // Обновляем статистику
            updatePvpStats();
            
            // Сохраняем игру
            saveGame();
            
            // Закрываем арену через 3 секунды
            setTimeout(() => {
                document.getElementById('pvpArena').style.display = 'none';
                document.getElementById('battleLog').innerHTML = '';
                renderPvpWorkers();
                renderWorkers();
            }, 3000);
        }

        // Обновление PvP статистики
        function updatePvpStats() {
            document.getElementById('totalBattles').textContent = gameData.pvp.battles;
            document.getElementById('totalWins').textContent = gameData.pvp.wins;
            document.getElementById('totalLosses').textContent = gameData.pvp.losses;
            
            const winRate = gameData.pvp.battles > 0 ? Math.round((gameData.pvp.wins / gameData.pvp.battles) * 100) : 0;
            document.getElementById('winRate').textContent = winRate + '%';
        }

        // Рендер тем
        function renderThemes() {
            const container = document.getElementById('themesGrid');
            if (!container) return;
            
            container.innerHTML = themes.map(theme => `
                <div class="theme-card ${gameSettings.theme === theme.id ? 'active' : ''}" 
                     onclick="applyTheme('${theme.id}')"
                     style="background: linear-gradient(135deg, ${theme.primary}22, ${theme.secondary}22);
                            border: 2px solid ${gameSettings.theme === theme.id ? theme.primary : 'rgba(255,255,255,0.1)'};">
                    <div class="theme-preview" style="background: linear-gradient(135deg, ${theme.primary}, ${theme.secondary});"></div>
                    <div class="theme-name">${theme.name}</div>
                </div>
            `).join('');
        }

        // Рендер иконок
        function renderIcons() {
            const container = document.getElementById('iconsGrid');
            if (!container) return;
            
            container.innerHTML = coinIcons.map(icon => `
                <div class="icon-card ${gameSettings.icon === icon ? 'active' : ''}" 
                     onclick="applyCoinIcon('${icon}')"
                     style="border: 2px solid ${gameSettings.icon === icon ? '#00ffff' : 'rgba(255,255,255,0.1)'};">
                    <div class="icon-preview">${icon}</div>
                </div>
            `).join('');
        }

        // Система престижа
        let prestigeData = {
            prestigeCount: 0,
            kaiCoins: 0,
            prestigeUpgrades: [],
            totalEarned: 0,
            highestBalance: 0
        };
        
        // Расчет стоимости престижа
        function calculatePrestigeCost() {
            const baseCost = 50000000; // 50 миллионов
            const multiplier = 1.5;
            return Math.floor(baseCost * Math.pow(multiplier, prestigeData.prestigeCount));
        }
        
        // Расчет кайкоинов за престиж
        function calculateKaiCoins() {
            const baseKaiCoins = 1;
            const bonusMultiplier = Math.floor(prestigeData.totalEarned / 100000000); // +1 за каждые 100млн заработанных
            return baseKaiCoins + bonusMultiplier;
        }
        
        // Выполнить престиж
        function performPrestige() {
            const cost = calculatePrestigeCost();
            const kaiCoins = calculateKaiCoins();
            
            if (gameData.balance < cost) {
                showNotification(`Недостаточно монет! Нужно: ${formatNumber(cost)}`, 'error');
                return;
            }
            
            if (confirm(`Вы уверены что хотите сделать престиж?\n\nВы получите: ${kaiCoins} кайкоинов\nСбросьте весь прогресс!`)) {
                // Сохраняем статистику
                prestigeData.totalEarned += gameData.totalEarned;
                prestigeData.highestBalance = Math.max(prestigeData.highestBalance, gameData.balance);
                prestigeData.prestigeCount++;
                prestigeData.kaiCoins += kaiCoins;
                
                // Сброс игры
                resetGame();
                
                // Показать уведомление
                showNotification(`🎉 Престиж выполнен! Получено: ${kaiCoins} кайкоинов!`, 'success', 5000);
                
                // Обновить UI престижа
                updatePrestigeUI();
                saveGame();
            }
        }
        
        // Обновить UI престижа
        function updatePrestigeUI() {
            const prestigeButton = document.getElementById('prestigeButton');
            const prestigeCost = calculatePrestigeCost();
            const kaiCoins = calculateKaiCoins();
            
            if (prestigeButton) {
                prestigeButton.innerHTML = `
                    <div class="prestige-icon">⭐</div>
                    <div class="prestige-info">
                        <div class="prestige-title">Престиж</div>
                        <div class="prestige-cost">
                            ${gameData.balance >= prestigeCost ? 
                                `<span style="color: #4ade80;">Доступно!</span>` : 
                                `Нужно: ${formatNumber(prestigeCost)}`
                            }
                        </div>
                        <div class="prestige-reward">Награда: ${kaiCoins} кайкоинов</div>
                    </div>
                `;
                
                prestigeButton.disabled = gameData.balance < prestigeCost;
                prestigeButton.classList.toggle('prestige-available', gameData.balance >= prestigeCost);
            }
            
            // Обновить отображение кайкоинов
            const kaiCoinsDisplay = document.getElementById('kaiCoinsDisplay');
            if (kaiCoinsDisplay) {
                kaiCoinsDisplay.textContent = prestigeData.kaiCoins;
            }
        }
        
        // Показать магазин престиж улучшений
        function showPrestigeShop() {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(20px);
                z-index: 3000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
            `;
            
            modal.innerHTML = `
                <div style="
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(30px);
                    border: 2px solid rgba(99, 102, 241, 0.3);
                    border-radius: 30px;
                    width: 100%;
                    max-width: 900px;
                    max-height: 90vh;
                    overflow: hidden;
                    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 2rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                        <h2 style="margin: 0; color: #FFD700; font-size: 2rem;">🏪 Магазин престижа</h2>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="color: #FFD700; font-size: 1.2rem;">💰 ${prestigeData.kaiCoins} кайкоинов</div>
                            <button onclick="this.closest('div[style*=fixed]').remove()" style="background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;">×</button>
                        </div>
                    </div>
                    <div style="padding: 2rem; overflow-y: auto; max-height: 70vh;">
                        <div id="prestigeUpgradesList"></div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            renderPrestigeUpgrades();
        }
        
        // Рендер престиж улучшений
        function renderPrestigeUpgrades() {
            const container = document.getElementById('prestigeUpgradesList');
            if (!container) return;
            
            const prestigeUpgrades = [
                {
                    id: 'starting_workers',
                    name: 'Начальные рабочие',
                    description: 'Начинайте игру с 3 дополнительными рабочими',
                    cost: 5,
                    icon: '👥',
                    effect: 'startingWorkers'
                },
                {
                    id: 'income_boost',
                    name: 'Бонус к доходу',
                    description: '+20% к доходу всех рабочих',
                    cost: 10,
                    icon: '💰',
                    effect: 'incomeBoost'
                },
                {
                    id: 'experience_boost',
                    name: 'Бонус к опыту',
                    description: '+50% к скорости получения опыта',
                    cost: 8,
                    icon: '⚡',
                    effect: 'experienceBoost'
                },
                {
                    id: 'case_discount',
                    name: 'Скидка на кейсы',
                    description: '-15% стоимость всех кейсов',
                    cost: 12,
                    icon: '🎰',
                    effect: 'caseDiscount'
                },
                {
                    id: 'rocket_bonus',
                    name: 'Ракетный бонус',
                    description: '+25% к доходу ракетки',
                    cost: 15,
                    icon: '🚀',
                    effect: 'rocketBonus'
                },
                {
                    id: 'city_master',
                    name: 'Мастер города',
                    description: '+1 бесплатное здание при старте',
                    cost: 20,
                    icon: '🏙️',
                    effect: 'cityMaster'
                }
            ];
            
            container.innerHTML = prestigeUpgrades.map(upgrade => {
                const purchased = prestigeData.prestigeUpgrades.includes(upgrade.id);
                const canAfford = prestigeData.kaiCoins >= upgrade.cost && !purchased;
                
                return `
                    <div class="prestige-upgrade-card ${purchased ? 'purchased' : ''}" style="
                        background: ${purchased ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
                        border: 1px solid ${purchased ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
                        border-radius: 20px;
                        padding: 1.5rem;
                        margin-bottom: 1rem;
                        display: flex;
                        align-items: center;
                        gap: 1.5rem;
                        transition: all 0.3s ease;
                    ">
                        <div style="font-size: 3rem;">${upgrade.icon}</div>
                        <div style="flex: 1;">
                            <div style="font-size: 1.2rem; font-weight: 600; color: ${purchased ? '#4ade80' : '#fff'}; margin-bottom: 0.5rem;">
                                ${upgrade.name} ${purchased ? '✅' : ''}
                            </div>
                            <div style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 0.5rem;">
                                ${upgrade.description}
                            </div>
                            <div style="color: ${canAfford ? '#FFD700' : '#ef4444'}; font-weight: 600;">
                                💰 ${upgrade.cost} кайкоинов
                            </div>
                        </div>
                        <button 
                            onclick="buyPrestigeUpgrade('${upgrade.id}')" 
                            ${purchased || !canAfford ? 'disabled' : ''}
                            style="
                                background: ${canAfford ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255, 255, 255, 0.1)'};
                                color: ${canAfford ? '#fff' : '#64748b'};
                                border: none;
                                padding: 0.8rem 1.5rem;
                                border-radius: 15px;
                                font-weight: 600;
                                cursor: ${canAfford ? 'pointer' : 'not-allowed'};
                                transition: all 0.3s ease;
                            "
                        >
                            ${purchased ? 'Куплено' : 'Купить'}
                        </button>
                    </div>
                `;
            }).join('');
        }
        
        // Купить престиж улучшение
        function buyPrestigeUpgrade(upgradeId) {
            const upgrade = [
                { id: 'starting_workers', cost: 5 },
                { id: 'income_boost', cost: 10 },
                { id: 'experience_boost', cost: 8 },
                { id: 'case_discount', cost: 12 },
                { id: 'rocket_bonus', cost: 15 },
                { id: 'city_master', cost: 20 }
            ].find(u => u.id === upgradeId);
            
            if (!upgrade || prestigeData.prestigeUpgrades.includes(upgradeId)) return;
            
            if (prestigeData.kaiCoins < upgrade.cost) {
                showNotification('Недостаточно кайкоинов!', 'error');
                return;
            }
            
            prestigeData.kaiCoins -= upgrade.cost;
            prestigeData.prestigeUpgrades.push(upgradeId);
            
            showNotification(`🎉 Улучшение "${upgrade.name}" куплено!`, 'success');
            
            // Применить эффект немедленно если возможно
            applyPrestigeUpgradeEffects();
            
            // Обновить UI
            updatePrestigeUI();
            renderPrestigeUpgrades();
            saveGame();
        }
        
        // Применить эффекты престиж улучшений
        function applyPrestigeUpgradeEffects() {
            // Применяются при старте игры и при покупке
        }
        
        // Сброс игры для престижа
        function resetGame() {
            gameData.balance = 1000;
            gameData.workers = [];
            gameData.openedCases = 0;
            gameData.totalEarned = 0;
            gameData.city = {
                buildings: [],
                totalBonus: 1.0
            };
            gameData.rocket.height = 0;
            gameData.rocket.maxHeight = 0;
            gameData.rocket.xp = 0;
            gameData.rocket.worker = null;
            gameData.rocket.isFlying = false;
            gameData.achievements = [];
            
            // Применить престиж бонусы
            if (prestigeData.prestigeUpgrades.includes('starting_workers')) {
                // Добавить 3 начальных рабочих
                for (let i = 0; i < 3; i++) {
                    const randomWorker = workerNames[Math.floor(Math.random() * workerNames.length)];
                    gameData.workers.push({
                        id: Date.now() + i,
                        name: randomWorker.name,
                        icon: randomWorker.icon,
                        income: randomWorker.income,
                        level: 1,
                        experience: 0,
                        maxExperience: 100,
                        rarity: randomWorker.rarity || 'common',
                        style: randomWorker.style || 'normal'
                    });
                }
            }
        }
        
        // Система обновлений
        const GAME_VERSION = "1.1.0";
        const UPDATE_LOG = `
v1.1.0 (30.01.2026)
🎵 МУЗЫКАЛЬНЫЙ ПЛЕЕР С ВИЗУАЛИЗАТОРОМ
✨ Добавлен полноценный аудиоплеер с Web Audio API
🎨 4 режима визуализации: полосы, волна, круговой, частицы
📁 Автопоиск музыки из папки /music
🎛️ Боковая скрывающаяся панель управления
⏱️ Прогресс-бар с возможностью перемотки
🔊 Регулировка громкости с отображением процентов

⚔️ PvP СИСТЕМА УЛУЧШЕНА
🐛 Исправлен баг с блокировкой хода бота
🎭 Заменены боты на реальных рабочих (Барсик, Бензин, Астрал, Дракон, Мондея)
🪟 Битвы теперь в отдельном модальном окне
🎨 Улучшен интерфейс PvP арены

🔧 ИСПРАВЛЕНИЯ И УЛУЧШЕНИЯ
🐛 Исправлен баг с выбором рабочих для улучшений
🛡️ Усилена защита системы сохранений
📱 Улучшена адаптивность для мобильных устройств
🧹 Оптимизирован код и удалены ненужные файлы

v1.0.0 (2026-01-26)
🎉 Запуск Digital Luxury редизайна
💎 Новый премиальный интерфейс с неоновыми эффектами
🎰 Полностью переработанная система кейсов
✨ Частицы света и кинематографичные анимации
🎨 20 уникальных кейсов с редкими рабочими
⚡ Система опыта и улучшений
🚀 Космическая ракетка с рисками
🏙️ Система строительства города
🏆 Таблица лидеров и достижения
        `.trim();
        
        // Показать лог обновлений
        function showUpdateLog() {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(20px);
                border: 2px solid rgba(99, 102, 241, 0.3);
                border-radius: 20px;
                padding: 2rem;
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
                z-index: 3000;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            `;
            
            modal.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 1rem;">
                    <h3 style="margin: 0; color: #00FFFF; font-size: 1.5rem;">📜 История обновлений</h3>
                    <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;">×</button>
                </div>
                <pre style="
                    color: #f1f5f9;
                    font-family: 'Courier New', monospace;
                    font-size: 0.9rem;
                    line-height: 1.4;
                    white-space: pre-wrap;
                    margin: 0;
                    padding: 1rem;
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 10px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                ">${UPDATE_LOG}</pre>
                <div style="margin-top: 1.5rem; text-align: center; color: #94a3b8; font-size: 0.9rem;">
                    Текущая версия: <strong style="color: #FFD700;">v${GAME_VERSION}</strong>
                </div>
            `;
            
            document.body.appendChild(modal);
        }
        
        // Ограничения
        const MAX_CITY_MULTIPLIER = 100;
        const MAX_INCOME_PER_SECOND = 1000000000;
        const ROCKET_MAX_HEIGHT = 1000000;
        const ROCKET_XP_MULTIPLIER = 10;

        // Достижения
        const achievements = [
            { 
                id: 1,
                name: "Первый шаг", 
                description: "Открыть первый кейс", 
                icon: "🎁",
                condition: (data) => data.openedCases >= 1,
                reward: 1000,
                unlocked: false
            },
            { 
                id: 2,
                name: "Начало карьеры", 
                description: "Получить первого рабочего", 
                icon: "👷",
                condition: (data) => data.workers.length >= 1,
                reward: 2000,
                unlocked: false
            },
            { 
                id: 3,
                name: "Миллионер", 
                description: "Накопить 1,000,000 монет", 
                icon: "💰",
                condition: (data) => data.balance >= 1000000,
                reward: 10000,
                unlocked: false
            },
            { 
                id: 4,
                name: "Коллекционер", 
                description: "Получить 10 разных рабочих", 
                icon: "👥",
                condition: (data) => data.workers.length >= 10,
                reward: 5000,
                unlocked: false
            },
            { 
                id: 5,
                name: "Мастер кейсов", 
                description: "Открыть 50 кейсов", 
                icon: "📦",
                condition: (data) => data.openedCases >= 50,
                reward: 20000,
                unlocked: false
            },
            { 
                id: 6,
                name: "Городской архитектор", 
                description: "Построить 5 зданий", 
                icon: "🏗️",
                condition: (data) => data.city.buildings.length >= 5,
                reward: 15000,
                unlocked: false
            },
            { 
                id: 7,
                name: "Космический пионер", 
                description: "Запустить ракетку на высоту 10,000м", 
                icon: "🚀",
                condition: (data) => data.rocket.maxHeight >= 10000,
                reward: 25000,
                unlocked: false
            },
            { 
                id: 8,
                name: "Риск и награда", 
                description: "Потерять рабочего в ракетке", 
                icon: "💀",
                condition: (data) => data.rocket.crashes >= 1,
                reward: 50000,
                unlocked: false
            },
            { 
                id: 9,
                name: "Эксклюзивный коллектор", 
                description: "Получить эксклюзивного рабочего", 
                icon: "👑",
                condition: (data) => data.rocket.exclusiveWorkers.length >= 1,
                reward: 100000,
                unlocked: false
            },
            { 
                id: 10,
                name: "Легенда Уголка", 
                description: "Заработать 10,000,000 монет", 
                icon: "🏆",
                condition: (data) => data.totalEarned >= 10000000,
                reward: 500000,
                unlocked: false
            },
            { 
                id: 11,
                name: "Редкий улов", 
                description: "Получить рабочего редкости Легендарный или выше", 
                icon: "⭐",
                condition: (data) => data.workers.some(w => ['legendary', 'mythic', 'cosmic', 'divine', 'exotic', 'ultimate', 'beta-tester', 'exclusive'].includes(w.rarity)),
                reward: 30000,
                unlocked: false
            },
            { 
                id: 12,
                name: "Мастер улучшений", 
                description: "Улучшить рабочего до 10 уровня", 
                icon: "⚡",
                condition: (data) => data.workers.some(w => w.level >= 10),
                reward: 40000,
                unlocked: false
            }
        ];

        // Таблица лидеров
        let leaderboard = [
            { name: "Маней", balance: 729100000, workers: 78, income: 1600000 },
            { name: "ProPlayer", balance: 1500000, workers: 12, income: 8500 },
            { name: "GoldMiner", balance: 850000, workers: 8, income: 4200 },
            { name: "CaseKing", balance: 620000, workers: 6, income: 3100 },
            { name: "WorkerLord", balance: 450000, workers: 5, income: 2400 },
            { name: "Newbie", balance: 120000, workers: 3, income: 1500 }
        ];

        // Текущий выбранный рабочий
        let selectedWorker = null;
        let currentCase = null;
        let isRouletteSpinning = false;
        let rouletteItems = [];
        
        // Выбранный рабочий для PvP
        let selectedPvpWorker = null;
        let selectedReward = null;

        // Магазин
        let currentShopCategory = 'deals';
        
        // Товары магазина
        const shopItems = {
            deals: [
                {
                    id: 'new_currency_deal',
                    title: 'НОВАЯ ВАЛЮТА!',
                    badge: 'ОГРАНИЧЕННО',
                    description: '12 Шардов + эксклюзивный рабочий "Лада" + эксклюзивный фон "Золотой румянец"',
                    price: 3500000,
                    priceType: 'money',
                    type: 'deal',
                    action: () => purchaseNewCurrencyDeal()
                },
                {
                    id: 'starter_pack',
                    title: 'СТАРТОВЫЙ ПАК',
                    badge: 'ХИТ',
                    description: '5 случайных рабочих + 2 Шарда + 500,000 монет',
                    price: 2000000,
                    priceType: 'money',
                    type: 'deal',
                    action: () => purchaseStarterPack()
                }
            ],
            pvp: [
                {
                    id: 'stamina_boost',
                    title: 'Энергия выносливости',
                    description: '5 очков энергии для PvP битв',
                    price: 100000,
                    priceType: 'money',
                    type: 'pvp',
                    action: () => purchaseStaminaBoost()
                },
                {
                    id: 'barsik_pvp',
                    title: 'Барсик PvP',
                    description: 'Рабочий Барсик 3 уровня для PvP арены',
                    price: 25000,
                    priceType: 'money',
                    type: 'pvp',
                    action: () => purchaseBarsikPvp()
                },
                {
                    id: 'pvp_warrior',
                    title: 'Хирохито',
                    badge: 'ПРО',
                    description: 'Рабочий "Хирохито" 4 уровня для PvP',
                    price: 30,
                    priceType: 'shards',
                    type: 'pvp',
                    action: () => purchasePvpWarrior()
                },
                {
                    id: 'instant_heal',
                    title: 'Мгновенное лечение',
                    description: 'Полное восстановление выносливости',
                    price: 200000,
                    priceType: 'money',
                    type: 'pvp',
                    action: () => purchaseInstantHeal()
                }
            ],
            workers: [
                {
                    id: 'astral_discount',
                    title: 'Астрал',
                    badge: 'СКИДКА',
                    description: 'Могущественный магический рабочий',
                    price: 10000000,
                    oldPrice: 12500000,
                    priceType: 'money',
                    type: 'worker',
                    action: () => purchaseAstralDiscount()
                },
                {
                    id: 'mondea_shards',
                    title: 'Мондей',
                    badge: 'СКИДКА',
                    description: 'Таинственный рабочий с темной энергией',
                    price: 15,
                    oldPrice: 20,
                    priceType: 'shards',
                    type: 'worker',
                    action: () => purchaseMondeaShards()
                },
                {
                    id: 'phoenix_legend',
                    title: 'ФНМ',
                    badge: 'ЛЕГЕНДА',
                    description: 'Легендарный ФНМ с молниями',
                    price: 20,
                    priceType: 'shards',
                    type: 'worker',
                    action: () => purchasePhoenixLegend()
                },
                {
                    id: 'ice_mage',
                    title: 'Маттеокеллер',
                    badge: 'ЭКСКЛЮЗИВ',
                    description: 'Эксклюзивный Маттеокеллер с колбами',
                    price: 25000000,
                    priceType: 'money',
                    type: 'worker',
                    action: () => purchaseIceMage()
                }
            ],
            shards: [
                {
                    id: 'shard_pack_1',
                    title: 'Малый пакет Шардов',
                    description: '1 Шард за 1,000,000 монет',
                    price: 1000000,
                    priceType: 'money',
                    type: 'shards',
                    action: () => purchaseShardPack(1)
                },
                {
                    id: 'shard_pack_5',
                    title: 'Средний пакет Шардов',
                    badge: 'ЭКОНОМИЯ',
                    description: '5 Шардов за 4,500,000 монет',
                    price: 4500000,
                    priceType: 'money',
                    type: 'shards',
                    action: () => purchaseShardPack(5)
                },
                {
                    id: 'shard_pack_10',
                    title: 'Большой пакет Шардов',
                    badge: 'СУПЕР ЦЕНА',
                    description: '10 Шардов за 8,000,000 монет',
                    price: 8000000,
                    priceType: 'money',
                    type: 'shards',
                    action: () => purchaseShardPack(10)
                },
                {
                    id: 'shard_pack_50',
                    title: 'МЕГА ПАКЕТ',
                    badge: 'ВАУ!',
                    description: '50 Шардов за 35,000,000 монет',
                    price: 35000000,
                    priceType: 'money',
                    type: 'shards',
                    action: () => purchaseShardPack(50)
                }
            ]
        };

        // Функции магазина
        function openShop() {
            document.getElementById('shopModal').classList.add('show');
            updateShopBalance();
            renderAllShopItems();
            playSound('clickSound');
        }

        function closeShop() {
            document.getElementById('shopModal').classList.remove('show');
            playSound('clickSound');
        }

        function updateShopBalance() {
            document.getElementById('shopMoneyBalance').textContent = formatNumber(gameData.balance);
            document.getElementById('shopShardsBalance').textContent = formatNumber(gameData.shards);
        }

        function renderAllShopItems() {
            const container = document.getElementById('shopScrollContainer');
            container.innerHTML = '';
            
            // Добавляем разделители категорий
            const categories = [
                { key: 'deals', title: '🔥 ГОРЯЧИЕ АКЦИИ', type: 'deal' },
                { key: 'pvp', title: '⚔️ PvP ПРЕДЛОЖЕНИЯ', type: 'pvp' },
                { key: 'workers', title: '👷 РАБОЧИЕ СО СКИДКАМИ', type: 'worker' },
                { key: 'shards', title: '💎 ШАРДЫ', type: 'shards' }
            ];
            
            categories.forEach(category => {
                // Добавляем заголовок категории
                const categoryHeader = document.createElement('div');
                categoryHeader.className = 'shop-category-header';
                categoryHeader.innerHTML = `<h3>${category.title}</h3>`;
                container.appendChild(categoryHeader);
                
                // Добавляем товары категории
                const items = shopItems[category.key] || [];
                
                items.forEach(item => {
                    // Шардовые пакеты можно покупать многократно, остальные товары - единоразово
                    if (item.type === 'shards' || !gameData.shop.purchasedItems.includes(item.id)) {
                        const shopItem = createShopItemElement(item);
                        container.appendChild(shopItem);
                    }
                });
            });
            
            // Добавляем перетаскивание мышкой
            setupShopDragging(container);
        }

        function setupShopDragging(container) {
            let isDown = false;
            let startX;
            let scrollLeft;

            container.addEventListener('mousedown', (e) => {
                isDown = true;
                container.classList.add('dragging');
                startX = e.pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
            });

            container.addEventListener('mouseleave', () => {
                isDown = false;
                container.classList.remove('dragging');
            });

            container.addEventListener('mouseup', () => {
                isDown = false;
                container.classList.remove('dragging');
            });

            container.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - container.offsetLeft;
                const walk = (x - startX) * 2;
                container.scrollLeft = scrollLeft - walk;
            });
        }

        function createShopItemElement(item) {
            const div = document.createElement('div');
            div.className = `shop-item ${item.type}`;
            
            const canAfford = item.priceType === 'money' ? 
                gameData.balance >= item.price : 
                gameData.shards >= item.price;
            
            div.innerHTML = `
                <div class="shop-item-header">
                    <div class="shop-item-title">${item.title}</div>
                    ${item.badge ? `<div class="shop-item-badge">${item.badge}</div>` : ''}
                </div>
                <div class="shop-item-description">${item.description}</div>
                <div class="shop-item-price">
                    ${item.oldPrice ? `<span class="shop-item-old-price">${formatNumber(item.oldPrice)} ${item.priceType === 'money' ? '💰' : '💎'}</span>` : ''}
                    <span>${formatNumber(item.price)} ${item.priceType === 'money' ? '💰' : '💎'}</span>
                </div>
                <button class="shop-item-button" ${!canAfford ? 'disabled' : ''} onclick="purchaseShopItem('${item.id}')">
                    ${canAfford ? 'КУПИТЬ' : 'НЕДОСТАТОЧНО'}
                </button>
            `;
            
            return div;
        }

        function purchaseShopItem(itemId) {
            const item = findShopItem(itemId);
            if (!item) return;
            
            const canAfford = item.priceType === 'money' ? 
                gameData.balance >= item.price : 
                gameData.shards >= item.price;
            
            if (!canAfford) {
                showNotification('Недостаточно средств!', 'error');
                return;
            }
            
            // Шарды можно покупать многократно, остальные товары - единоразово
            if (item.type !== 'shards') {
                // Проверяем не куплен ли уже товар
                if (gameData.shop.purchasedItems.includes(itemId)) {
                    showNotification('Этот товар уже куплен!', 'error');
                    return;
                }
                
                // Добавляем товар в купленные
                gameData.shop.purchasedItems.push(itemId);
            }
            
            // Списываем средства
            if (item.priceType === 'money') {
                gameData.balance -= item.price;
            } else {
                gameData.shards -= item.price;
            }
            
            // Выполняем действие
            item.action();
            
            // Обновляем UI
            updateBalance();
            updateShopBalance();
            renderAllShopItems();
            saveGame();
            
            playSound('purchaseSound');
        }

        // Новые функции покупки
        function purchaseStarterPack() {
            gameData.balance += 500000;
            gameData.shards += 2;
            
            // Добавляем 5 случайных рабочих из существующих в игре
            const existingWorkers = [
                { name: 'Робот', icon: '🤖', income: 25, rarity: 'common' },
                { name: 'Призрак', icon: '👻', income: 30, rarity: 'rare' },
                { name: 'Вампир', icon: '🧛', income: 40, rarity: 'epic' },
                { name: 'Циклоп', icon: '👁️', income: 35, rarity: 'rare' },
                { name: 'Джинн', icon: '🧞', income: 50, rarity: 'epic' },
                { name: 'Лис', icon: '🦊', income: 55, rarity: 'common' },
                { name: 'Бомж Валера', icon: '🧔', income: 60, rarity: 'common' },
                { name: 'Накс', icon: '💊', income: 65, rarity: 'common' },
                { name: 'Арбузаня', icon: '🍉', income: 70, rarity: 'common' },
                { name: 'Квас', icon: '🥤', income: 75, rarity: 'common' }
            ];
            
            for (let i = 0; i < 5; i++) {
                const worker = existingWorkers[Math.floor(Math.random() * existingWorkers.length)];
                const newWorker = {
                    id: Date.now() + i,
                    name: worker.name,
                    icon: worker.icon,
                    income: worker.income,
                    level: 1,
                    experience: 0,
                    maxExperience: 100,
                    rarity: worker.rarity,
                    style: 'normal'
                };
                gameData.workers.push(newWorker);
            }
            
            showNotification('🎉 Получен стартовый пак! 5 рабочих + 2 Шарда + 500,000 монет!', 'success');
            renderWorkers();
            updatePassiveIncome();
        }

        function purchasePvpWarrior() {
            const warrior = {
                id: Date.now(),
                name: 'Хирохито',
                icon: '👑',
                income: 300,
                level: 4,
                experience: 0,
                maxExperience: 400,
                rarity: 'epic',
                style: 'normal',
                isRare: true
            };
            gameData.workers.push(warrior);
            showNotification('👑 Получен рабочий "Хирохито" 4 уровня!', 'success');
            renderWorkers();
        }

        function purchaseInstantHeal() {
            gameData.pvp.stamina = gameData.pvp.maxStamina;
            showNotification('💚 Выносливость полностью восстановлена!', 'success');
            updateStamina();
        }

        function purchasePhoenixLegend() {
            const fnm = {
                id: Date.now(),
                name: 'ФНМ',
                icon: '⚡',
                income: 600,
                level: 6,
                experience: 0,
                maxExperience: 600,
                rarity: 'legendary',
                style: 'normal',
                isRare: true,
                isSpecial: true
            };
            gameData.workers.push(fnm);
            showNotification('⚡ Получен легендарный ФНМ!', 'success');
            renderWorkers();
        }

        function purchaseIceMage() {
            const matteo = {
                id: Date.now(),
                name: 'Маттеокеллер',
                icon: '🧪',
                income: 650,
                level: 7,
                experience: 0,
                maxExperience: 700,
                rarity: 'legendary',
                style: 'normal',
                isRare: true
            };
            gameData.workers.push(matteo);
            showNotification('🧪 Получен эксклюзивный Маттеокеллер!', 'success');
            renderWorkers();
        }

        function findShopItem(itemId) {
            for (const category in shopItems) {
                const item = shopItems[category].find(item => item.id === itemId);
                if (item) return item;
            }
            return null;
        }

        // Функции покупки товаров
        function purchaseNewCurrencyDeal() {
            gameData.shards += 12;
            
            // Добавляем рабочего "Лада"
            const ladaWorker = {
                id: Date.now(),
                name: 'Лада',
                icon: '🚗',
                income: 500,
                level: 5,
                experience: 0,
                maxExperience: 500,
                rarity: 'exclusive',
                style: 'normal',
                isRare: true,
                isSpecial: true
            };
            gameData.workers.push(ladaWorker);
            
            // Добавляем эксклюзивный фон
            gameData.achievements.push({
                id: 'golden_blush_bg',
                name: 'Золотой румянец',
                description: 'Эксклюзивный фон с падающими монетками',
                icon: '🪙'
            });
            
            showNotification('🎉 Покупка выполнена! Получено: 12 Шардов, рабочий "Лада", фон "Золотой румянец"!', 'success');
            renderWorkers();
        }

        function purchaseStaminaBoost() {
            gameData.pvp.stamina = Math.min(gameData.pvp.stamina + 5, gameData.pvp.maxStamina);
            showNotification('⚡ Получено 5 очков выносливости!', 'success');
            updateStamina();
        }

        function purchaseBarsikPvp() {
            const barsikPvp = {
                id: Date.now(),
                name: 'Барсик',
                icon: '🐱',
                income: 50,
                level: 3,
                experience: 0,
                maxExperience: 300,
                rarity: 'rare',
                style: 'normal'
            };
            gameData.workers.push(barsikPvp);
            showNotification('🐱 Получен рабочий "Барсик" 3 уровня!', 'success');
            renderWorkers();
        }

        function purchaseAstralDiscount() {
            const astral = {
                id: Date.now(),
                name: 'Астрал',
                icon: '🌟',
                income: 1000,
                level: 10,
                experience: 0,
                maxExperience: 1000,
                rarity: 'mythic',
                style: 'normal',
                isRare: true
            };
            gameData.workers.push(astral);
            showNotification('🌟 Получен рабочий "Астрал" по скидке!', 'success');
            renderWorkers();
        }

        function purchaseMondeaShards() {
            const mondea = {
                id: Date.now(),
                name: 'Мондей',
                icon: '🔮',
                income: 800,
                level: 8,
                experience: 0,
                maxExperience: 800,
                rarity: 'legendary',
                style: 'normal',
                isRare: true
            };
            gameData.workers.push(mondea);
            showNotification('🔮 Получен рабочий "Мондей" за Шарды!', 'success');
            renderWorkers();
        }

        function purchaseShardPack(amount) {
            gameData.shards += amount;
            showNotification(`💎 Получено ${amount} Шардов!`, 'success');
        }

        // Для города
        let selectedTileIndex = null;
        let selectedBuildingId = null;

        // Эксклюзивные рабочие для ракетки
        const exclusiveRocketWorkers = [
            { 
                name: "Vanish Gold", 
                icon: "✨", 
                rarity: 'exclusive',
                income: 5000,
                level: 15,
                requirement: { minXp: 15000, minLevel: 15 },
                description: "Исчезающее золото - легенда космоса"
            },
            { 
                name: "Лада", 
                icon: "🚗", 
                rarity: 'exclusive',
                income: 4500,
                level: 12,
                requirement: { minXp: 10000, minLevel: 12 },
                description: "Классика советского автопрома в космосе"
            },
            { 
                name: "Комшот", 
                icon: "💻", 
                rarity: 'exclusive',
                income: 5500,
                level: 18,
                requirement: { minXp: 20000, minLevel: 18 },
                description: "Компьютерный гений космических масштабов"
            },
            { 
                name: "Костяшка", 
                icon: "🎲", 
                rarity: 'exclusive',
                income: 4000,
                level: 10,
                requirement: { minXp: 8000, minLevel: 10 },
                description: "Везение материализованное в рабочего"
            },
            { 
                name: "Микроволнiвка", 
                icon: "🌀", 
                rarity: 'exclusive',
                income: 6000,
                level: 20,
                requirement: { minXp: 25000, minLevel: 20 },
                description: "Энергия микроволн космического масштаба"
            }
        ];

        // Список рабочих (с обновленными уникальными рабочими и новым рабочим)
        const workerNames = [
            { name: "Барсик", icon: "🐱", rarity: 'common', style: 'normal', income: 10 },
            { name: "Бензин", icon: "⛽", rarity: 'common', style: 'normal', income: 12 },
            { name: "Майн", icon: "⛏️", rarity: 'common', style: 'normal', income: 15 },
            { name: "Найтвинг", icon: "🦇", rarity: 'common', style: 'normal', income: 18 },
            { name: "Вогонь", icon: "🔥", rarity: 'common', style: 'normal', income: 20 },
            { name: "Кефир", icon: "🥛", rarity: 'common', style: 'normal', income: 22 },
            { name: "Ночной бродяга", icon: "🌙", rarity: 'common', style: 'normal', income: 25 },
            { name: "Узи", icon: "🔫", rarity: 'common', style: 'normal', income: 28 },
            { name: "Фиолетовый челик", icon: "👾", rarity: 'common', style: 'normal', income: 30 },
            { name: "Блэк стикман", icon: "🕴️", rarity: 'common', style: 'normal', income: 35 },
            { name: "Польша", icon: "🇵🇱", rarity: 'common', style: 'normal', income: 40 },
            { name: "Дима", icon: "👨", rarity: 'common', style: 'normal', income: 45 },
            { name: "Мондей", icon: "📅", rarity: 'beta-tester', style: 'monday', income: 500, level: 10 },
            { name: "Лис", icon: "🦊", rarity: 'common', style: 'normal', income: 55 },
            { name: "Бомж Валера", icon: "🧔", rarity: 'common', style: 'normal', income: 60 },
            { name: "Накс", icon: "💊", rarity: 'common', style: 'normal', income: 65 },
            { name: "Арбузаня", icon: "🍉", rarity: 'common', style: 'normal', income: 70 },
            { name: "Квас", icon: "🥤", rarity: 'common', style: 'normal', income: 75 },
            { name: "Точка", icon: "🔴", rarity: 'common', style: 'normal', income: 80 },
            { name: "Осенний динозавр", icon: "🦖", rarity: 'common', style: 'normal', income: 85 },
            { name: "Гусь", icon: "🦢", rarity: 'common', style: 'normal', income: 90 },
            { name: "Годжо", icon: "👺", rarity: 'common', style: 'normal', income: 95 },
            { name: "Ромеро", icon: "🧛", rarity: 'common', style: 'normal', income: 100 },
            { name: "Кефф", icon: "👨‍💻", rarity: 'common', style: 'normal', income: 105 },
            { name: "Юки", icon: "❄️", rarity: 'common', style: 'normal', income: 110 },
            { name: "Шарлотта", icon: "👸", rarity: 'common', style: 'normal', income: 115 },
            { name: "Оливка", icon: "🫒", rarity: 'common', style: 'normal', income: 120 },
            { name: "Фокалорс", icon: "🐧", rarity: 'common', style: 'normal', income: 125 },
            { name: "Астрал", icon: "🌌", rarity: 'cosmic', style: 'astral', income: 1000, level: 15 },
            { name: "Кайсу", icon: "🌀", rarity: 'cosmic', style: 'kaysu', income: 1200, level: 15 },
            { name: "Хирохито", icon: "👑", rarity: 'epic', style: 'normal', income: 300, level: 4 },
            { name: "Минори", icon: "🌸", rarity: 'rare', style: 'normal', income: 180, level: 3 },
            { name: "Помидори", icon: "🍅", rarity: 'common', style: 'normal', income: 80, level: 2 },
            { name: "Эллаграх", icon: "🎭", rarity: 'epic', style: 'normal', income: 350, level: 4 },
            { name: "ФНМ", icon: "⚡", rarity: 'legendary', style: 'normal', income: 600, level: 6 },
            { name: "Коломов", icon: "🔧", rarity: 'common', style: 'normal', income: 90, level: 2 },
            { name: "Черкашик", icon: "🐈", rarity: 'rare', style: 'normal', income: 200, level: 3 },
            { name: "Вин", icon: "🍷", rarity: 'common', style: 'normal', income: 110, level: 2 },
            { name: "Сироп", icon: "🧃", rarity: 'common', style: 'normal', income: 95, level: 2 },
            { name: "НН", icon: "🎲", rarity: 'rare', style: 'normal', income: 220, level: 3 },
            { name: "Юрико", icon: "💮", rarity: 'epic', style: 'normal', income: 400, level: 5 },
            { name: "Маттеокеллер", icon: "🧪", rarity: 'legendary', style: 'normal', income: 650, level: 7 },
            { name: "Нуб", icon: "🐣", rarity: 'common', style: 'normal', income: 50, level: 1 },
            { name: "Ангел", icon: "😇", rarity: 'epic', style: 'normal', income: 380, level: 5 },
            { name: "Милли", icon: "💸", rarity: 'rare', style: 'normal', income: 250, level: 3 },
            { name: "Диана", icon: "🌙", rarity: 'epic', style: 'normal', income: 420, level: 5 },
            { name: "Таракашка", icon: "🪳", rarity: 'common', style: 'normal', income: 70, level: 2 },
            { name: "Корейка с кото", icon: "🍖🐱", rarity: 'exotic', style: 'normal', income: 480, level: 6 },
            { name: "Маруффи", icon: "🎩", rarity: 'rare', style: 'normal', income: 270, level: 4 },
            { name: "Кардикс", icon: "❤️‍🔥", rarity: 'divine', style: 'normal', income: 800, level: 8 },
            { name: "Аврора Бореалис", icon: "🌌", rarity: 'ultimate', style: 'normal', income: 1200, level: 10 },
            { name: "Ноу неим", icon: "👤", rarity: 'common', style: 'normal', income: 115, level: 2 }, // Добавлен новый рабочий
            { name: "Уильям Афтон", icon: "🐰🔪", rarity: 'mythic', style: 'normal', income: 900, level: 9 },
            { name: "Миниён", icon: "👾", rarity: 'common', style: 'normal', income: 85, level: 2 },
            { name: "Цианпиг где", icon: "🎨", rarity: 'exotic', style: 'normal', income: 520, level: 7 },
            { name: "Тасьянс", icon: "🌟", rarity: 'divine', style: 'normal', income: 950, level: 9 },
            { name: "Азалия", icon: "🌺", rarity: 'epic', style: 'normal', income: 450, level: 6 },
            { name: "Смерть в нищите", icon: "💀🏚️", rarity: 'legendary', style: 'normal', income: 700, level: 8 },
            { name: "Что то", icon: "❓", rarity: 'common', style: 'normal', income: 60, level: 1 },
            { name: "Стар", icon: "⭐", rarity: 'rare', style: 'normal', income: 290, level: 4 },
            { name: "Булко", icon: "🥖", rarity: 'common', style: 'normal', income: 100, level: 2 },
            { name: "Булочка", icon: "🥐", rarity: 'common', style: 'normal', income: 105, level: 2 },
            { name: "Оченьдобренькийшахтер", icon: "⛏️😇", rarity: 'divine', style: 'normal', income: 1100, level: 10 },
            { name: "Эпикфейс", icon: "😎", rarity: 'ultimate', style: 'normal', income: 1300, level: 11 },
            { name: "Шиша", icon: "💨", rarity: 'rare', style: 'normal', income: 310, level: 4 },
            { name: "Медик", icon: "⚕️", rarity: 'epic', style: 'normal', income: 480, level: 6 },
            { name: "Ъэ", icon: "🤨", rarity: 'common', style: 'normal', income: 55, level: 1 },
            { name: "Лелиша", icon: "🧚", rarity: 'exotic', style: 'normal', income: 580, level: 7 },
            { name: "Морарик", icon: "🕵️", rarity: 'rare', style: 'normal', income: 330, level: 5 },
            { name: "Я твой мрак", icon: "🌑", rarity: 'mythic', style: 'normal', income: 1000, level: 10 },
            { name: "Хару", icon: "🍵", rarity: 'epic', style: 'normal', income: 510, level: 7 },
            { name: "Миори", icon: "🎴", rarity: 'rare', style: 'normal', income: 350, level: 5 },
            { name: "Worfиол", icon: "🐺", rarity: 'legendary', style: 'normal', income: 780, level: 9 },
            { name: "Лемонучикомалесо", icon: "🍋🧄", rarity: 'exotic', style: 'normal', income: 620, level: 8 },
            { name: "Мунайба", icon: "🌕", rarity: 'divine', style: 'normal', income: 1050, level: 10 },
            { name: "Стандофюр", icon: "🗿", rarity: 'ultimate', style: 'normal', income: 1400, level: 12 },
            { name: "Аде", icon: "🔥", rarity: 'mythic', style: 'normal', income: 1150, level: 11 },
            { name: "MrCosmo", icon: "👽", rarity: 'ultimate', style: 'normal', income: 1500, level: 13 }
        ];

        // Кейсы (20 кейсов)
        const cases = [
            { 
                id: 1, 
                name: "Базовый кейс", 
                price: 500, 
                level: 1, 
                icon: "📦", 
                color: "#CD7F32", 
                rewards: [
                    { type: 'worker', names: ["Барсик", "Бензин", "Майн", "Найтвинг"] },
                    { type: 'coin', amount: 200, icon: '💰' },
                    { type: 'coin', amount: 400, icon: '💰' }
                ]
            },
            { 
                id: 2, 
                name: "Серебряный кейс", 
                price: 1500, 
                level: 2, 
                icon: "🥈", 
                color: "#C0C0C0", 
                locked: false,
                rewards: [
                    { type: 'worker', names: ["Вогонь", "Кефир", "Ночной бродяга", "Узи"] },
                    { type: 'coin', amount: 800, icon: '💰' },
                    { type: 'coin', amount: 1200, icon: '💰' },
                    { type: 'rare', names: ["Фиолетовый челик", "Блэк стикман"] }
                ]
            },
            { 
                id: 3, 
                name: "Золотой кейс", 
                price: 5000, 
                level: 3, 
                icon: "🥇", 
                color: "#FFD700", 
                locked: false,
                rewards: [
                    { type: 'worker', names: ["Польша", "Дима", "Лис"] },
                    { type: 'coin', amount: 2000, icon: '💰' },
                    { type: 'coin', amount: 4000, icon: '💰' },
                    { type: 'rare', names: ["Бомж Валера", "Накс"] }
                ]
            },
            { 
                id: 4, 
                name: "Платиновый кейс", 
                price: 15000, 
                level: 4, 
                icon: "💎", 
                color: "#E5E4E2", 
                locked: false,
                rewards: [
                    { type: 'worker', names: ["Арбузаня", "Квас", "Точка", "Осенний динозавр"] },
                    { type: 'coin', amount: 6000, icon: '💰' },
                    { type: 'coin', amount: 10000, icon: '💰' },
                    { type: 'rare', names: ["Гусь", "Годжо"] }
                ]
            },
            { 
                id: 5, 
                name: "Алмазный кейс", 
                price: 50000, 
                level: 5, 
                icon: "💠", 
                color: "#b9f2ff", 
                locked: false,
                rewards: [
                    { type: 'worker', names: ["Ромеро", "Кефф", "Юки", "Шарлотта"] },
                    { type: 'coin', amount: 20000, icon: '💰' },
                    { type: 'coin', amount: 40000, icon: '💰' },
                    { type: 'special', names: ["Оливка", "Фокалорс"] }
                ]
            },
            { 
                id: 6, 
                name: "Самурайский кейс", 
                price: 75000, 
                level: 6, 
                icon: "🗾", 
                color: "#C53030", 
                locked: false,
                rewards: [
                    { type: 'worker', names: ["Хирохито", "Минори", "Юрико", "Хару"] },
                    { type: 'coin', amount: 30000, icon: '💰' },
                    { type: 'coin', amount: 50000, icon: '💰' },
                    { type: 'rare', names: ["Миори", "Ангел"] },
                    { type: 'legendary', names: ["Эллаграх"], chance: 0.15 }
                ]
            },
            { 
                id: 7, 
                name: "Загадочный кейс", 
                price: 100000, 
                level: 7, 
                icon: "🔮", 
                color: "#7C3AED", 
                locked: false,
                rewards: [
                    { type: 'worker', names: ["Помидори", "Таракашка", "Что то", "Ъэ"] },
                    { type: 'coin', amount: 40000, icon: '💰' },
                    { type: 'coin', amount: 60000, icon: '💰' },
                    { type: 'rare', names: ["Черкашик", "НН"] },
                    { type: 'epic', names: ["Диана", "Медик"] },
                    { type: 'legendary', names: ["ФНМ"], chance: 0.12 }
                ]
            },
            { 
                id: 8, 
                name: "Научный кейс", 
                price: 150000, 
                level: 8, 
                icon: "🧪", 
                color: "#0891B2", 
                locked: false,
                rewards: [
                    { type: 'worker', names: ["Коломов", "Вин", "Сироп", "Нуб", "Ноу неим", "Ноу неим"] },
                    { type: 'coin', amount: 60000, icon: '💰' },
                    { type: 'coin', amount: 90000, icon: '💰' },
                    { type: 'rare', names: ["Милли", "Булко", "Булочка"] },
                    { type: 'legendary', names: ["Маттеокеллер", "Цианпиг где"], chance: 0.2 }
                ]
            },
            { 
                id: 9, 
                name: "Кулинарный кейс", 
                price: 200000, 
                level: 9, 
                icon: "🍳", 
                color: "#DC2626", 
                locked: false,
                rewards: [
                    { type: 'worker', names: ["Корейка с кото", "Лемонучикомалесо"] },
                    { type: 'coin', amount: 80000, icon: '💰' },
                    { type: 'coin', amount: 120000, icon: '💰' },
                    { type: 'exotic', names: ["Корейка с кото", "Лемонучикомалесо"] },
                    { type: 'legendary', names: ["Маруффи"], chance: 0.25 }
                ]
            },
            { 
                id: 10, 
                name: "Космический кейс", 
                price: 300000, 
                level: 10, 
                icon: "🚀", 
                color: "#0EA5E9", 
                locked: false,
                rewards: [
                    { type: 'worker', names: ["Кардикс", "Аврора Бореалис", "MrCosmo"] },
                    { type: 'coin', amount: 100000, icon: '💰' },
                    { type: 'coin', amount: 150000, icon: '💰' },
                    { type: 'divine', names: ["Кардикс", "Тасьянс", "Мунайба"] },
                    { type: 'ultimate', names: ["Аврора Бореалис", "MrCosmo", "Стандофюр"], chance: 0.1 }
                ]
            },
            { 
                id: 11, 
                name: "Ужасный кейс", 
                price: 400000, 
                level: 11, 
                icon: "👻", 
                color: "#1E293B", 
                locked: false,
                rewards: [
                    { type: 'worker', names: ["Уильям Афтон", "Смерть в нищите", "Я твой мрак"] },
                    { type: 'coin', amount: 150000, icon: '💰' },
                    { type: 'coin', amount: 200000, icon: '💰' },
                    { type: 'mythic', names: ["Уильям Афтон", "Я твой мрак", "Аде"] },
                    { type: 'legendary', names: ["Смерть в нищите"] },
                    { type: 'ultimate', names: ["Эпикфейс"], chance: 0.08 }
                ]
            },
            { 
                id: 12, 
                name: "Звёздный кейс", 
                price: 500000, 
                level: 12, 
                icon: "🌠", 
                color: "#FBBF24", 
                locked: false,
                rewards: [
                    { type: 'worker', names: ["Стар", "Миниён"] },
                    { type: 'coin', amount: 200000, icon: '💰' },
                    { type: 'coin', amount: 300000, icon: '💰' },
                    { type: 'rare', names: ["Стар", "Шиша", "Морарик"] },
                    { type: 'epic', names: ["Азалия"] },
                    { type: 'divine', names: ["Оченьдобренькийшахтер"], chance: 0.15 }
                ]
            },
            { 
                id: 13, 
                name: "Волшебный кейс", 
                price: 750000, 
                level: 13, 
                icon: "🧙", 
                color: "#8B5CF6", 
                locked: false,
                rewards: [
                    { type: 'worker', names: ["Лелиша"] },
                    { type: 'coin', amount: 300000, icon: '💰' },
                    { type: 'coin', amount: 400000, icon: '💰' },
                    { type: 'exotic', names: ["Лелиша"] },
                    { type: 'legendary', names: ["Worfиол"] },
                    { type: 'mythic', names: ["Аде"], chance: 0.12 }
                ]
            },
            { 
                id: 14, 
                name: "Божественный кейс", 
                price: 1000000, 
                level: 14, 
                icon: "🙏", 
                color: "#FFFFFF", 
                locked: false,
                rewards: [
                    { type: 'worker', names: ["Кардикс", "Тасьянс", "Мунайба"] },
                    { type: 'coin', amount: 500000, icon: '💰' },
                    { type: 'coin', amount: 750000, icon: '💰' },
                    { type: 'divine', names: ["Кардикс", "Тасьянс", "Мунайба"] },
                    { type: 'ultimate', names: ["Аврора Бореалиス", "Стандофюр", "MrCosmo"], chance: 0.2 }
                ]
            },
            { 
                id: 15, 
                name: "Легендарный кейс", 
                price: 1500000, 
                level: 15, 
                icon: "🏆", 
                color: "#FFD700", 
                locked: false,
                rewards: [
                    { type: 'worker', names: ["ФНМ", "Маттеокеллер", "Смерть в нищите"] },
                    { type: 'coin', amount: 750000, icon: '💰' },
                    { type: 'coin', amount: 1000000, icon: '💰' },
                    { type: 'legendary', names: ["ФНМ", "Маттеокеллер", "Смерть в нищите", "Worfиол"] },
                    { type: 'mythic', names: ["Уильям Афтон", "Я твой мрак", "Аде"], chance: 0.3 }
                ]
            },
            { 
                id: 16, 
                name: "Мифический кейс", 
                price: 2000000, 
                level: 16, 
                icon: "🐉", 
                color: "#EF4444", 
                locked: false,
                rewards: [
                    { type: 'worker', names: ["Астрал", "Кайсу", "Уильям Афтон"] },
                    { type: 'coin', amount: 1000000, icon: '💰' },
                    { type: 'coin', amount: 1500000, icon: '💰' },
                    { type: 'cosmic', names: ["Астрал", "Кайсу"], chance: 0.5 },
                    { type: 'mythic', names: ["Уильям Афтон", "Я твой мрак", "Аде"] },
                    { type: 'ultimate', names: ["Аврора Бореалис"], chance: 0.25 }
                ]
            },
            { 
                id: 17, 
                name: "Космический Элитный", 
                price: 3000000, 
                level: 17, 
                icon: "👽", 
                color: "#00FF00", 
                locked: false,
                rewards: [
                    { type: 'worker', names: ["MrCosmo", "Аврора Бореалис"] },
                    { type: 'coin', amount: 1500000, icon: '💰' },
                    { type: 'coin', amount: 2000000, icon: '💰' },
                    { type: 'cosmic', names: ["Астрал", "Кайсу"], chance: 0.7 },
                    { type: 'ultimate', names: ["MrCosmo", "Аврора Бореалиス", "Эпикфейс", "Стандофюр"] },
                    { type: 'divine', names: ["Оченьдобренькийшахтер"], chance: 0.4 }
                ]
            },
            { 
                id: 18, 
                name: "Экзотический кейс", 
                price: 5000000, 
                level: 18, 
                icon: "🦄", 
                color: "#FF6BCB", 
                locked: false,
                rewards: [
                    { type: 'worker', names: ["Корейка с кото", "Лемонучикомалесо", "Лелиша", "Цианпиг где"] },
                    { type: 'coin', amount: 2000000, icon: '💰' },
                    { type: 'coin', amount: 3000000, icon: '💰' },
                    { type: 'cosmic', names: ["Астрал", "Кайсу"], chance: 0.8 },
                    { type: 'exotic', names: ["Корейка с кото", "Лемонучикомалесо", "Лелиша", "Цианпиг где"] },
                    { type: 'ultimate', names: ["Стандофюр"], chance: 0.2 }
                ]
            },
            { 
                id: 19, 
                name: "Верховный кейс", 
                price: 7500000, 
                level: 19, 
                icon: "👑", 
                color: "#FFD700", 
                locked: false,
                rewards: [
                    { type: 'worker', names: ["Оченьдобренькийшахтер", "Эпикфейс", "Стандофюр"] },
                    { type: 'coin', amount: 3000000, icon: '💰' },
                    { type: 'coin', amount: 5000000, icon: '💰' },
                    { type: 'cosmic', names: ["Астрал", "Кайсу"], chance: 0.9 },
                    { type: 'beta-tester', names: ["Мондей"], chance: 0.3 },
                    { type: 'ultimate', names: ["Оченьдобренькийшахтер", "Эпикфейс", "Стандофюр", "MrCosmo", "Аврора Бореалиス"] },
                    { type: 'divine', names: ["Все божественные"], chance: 0.5 }
                ]
            },
            { 
                id: 20, 
                name: "КОРОЛЕВСКИЙ КЕЙС", 
                price: 10000000, 
                level: 20, 
                icon: "🎩", 
                color: "#9D4EDD", 
                locked: false,
                rewards: [
                    { type: 'worker', names: ["Все уникальные персонажи"] },
                    { type: 'coin', amount: 5000000, icon: '💰' },
                    { type: 'coin', amount: 10000000, icon: '💰' },
                    { type: 'cosmic', names: ["Астрал", "Кайсу"], chance: 1.0 },
                    { type: 'beta-tester', names: ["Мондей"], chance: 0.5 },
                    { type: 'ultimate', names: ["Все ультимативные персонажи"] },
                    { type: 'special', names: ["Секретный босс"], chance: 0.05 }
                ]
            }
        ];

        // Здания для города
        const buildings = [
            {
                id: 1,
                name: "Фабрика",
                icon: "🏭",
                description: "Увеличивает доход всех рабочих на 3%",
                price: 5000,
                bonus: 1.03,
                bonusType: "incomeMultiplier"
            },
            {
                id: 2,
                name: "Офисный центр",
                icon: "🏢",
                description: "Увеличивает скорость получения опыта на 5%",
                price: 7500,
                bonus: 1.05,
                bonusType: "experienceMultiplier"
            },
            {
                id: 3,
                name: "Банк",
                icon: "🏦",
                description: "Увеличивает пассивный доход на 2%",
                price: 10000,
                bonus: 1.02,
                bonusType: "passiveIncomeMultiplier"
            },
            {
                id: 4,
                name: "Торговый центр",
                icon: "🏬",
                description: "Снижает стоимость кейсов на 5%",
                price: 8000,
                bonus: 0.95,
                bonusType: "caseCostMultiplier"
            },
            {
                id: 5,
                name: "Лаборатория",
                icon: "🔬",
                description: "Увеличивает шанс редких рабочих на 3%",
                price: 12000,
                bonus: 1.03,
                bonusType: "rareChanceMultiplier"
            },
            {
                id: 6,
                name: "Электростанция",
                icon: "⚡",
                description: "Увеличивает доход редких рабочих на 4%",
                price: 15000,
                bonus: 1.04,
                bonusType: "rareIncomeMultiplier"
            },
            {
                id: 7,
                name: "Университет",
                icon: "🎓",
                description: "Увеличивает успех улучшений на 5%",
                price: 20000,
                bonus: 1.05,
                bonusType: "upgradeSuccessMultiplier"
            },
            {
                id: 8,
                name: "Космопорт",
                icon: "🚀",
                description: "Глобальный бонус ко всему на 2%",
                price: 25000,
                bonus: 1.02,
                bonusType: "globalMultiplier"
            },
            {
                id: 9,
                name: "Золотой рудник",
                icon: "⛏️",
                description: "Увеличивает доход всех рабочих на 2%",
                price: 18000,
                bonus: 1.02,
                bonusType: "incomeMultiplier"
            },
            {
                id: 10,
                name: "Академия",
                icon: "🏛️",
                description: "Увеличивает скорость получения опыта на 3%",
                price: 14000,
                bonus: 1.03,
                bonusType: "experienceMultiplier"
            },
            {
                id: 11,
                name: "Стальной завод",
                icon: "🏗️",
                description: "Увеличивает доход всех рабочих на 2%",
                price: 16000,
                bonus: 1.02,
                bonusType: "incomeMultiplier"
            },
            {
                id: 12,
                name: "Технопарк",
                icon: "💻",
                description: "Увеличивает шанс редких рабочих на 2%",
                price: 22000,
                bonus: 1.02,
                bonusType: "rareChanceMultiplier"
            }
        ];

        // Звуковые эффекты

        // Воспроизведение звука
        function playSound(soundId, volume = 1) {
            if (!gameSettings.sfxEnabled || gameSettings.sfxVolume <= 0) return;
            
            const sound = document.getElementById(soundId);
            if (sound) {
                sound.volume = Math.min(gameSettings.sfxVolume * volume, 1);
                sound.currentTime = 0;
                sound.play().catch(e => console.log("Sound error:", e));
            }
        }

        // Обновление музыки
        function updateMusic() {
            const music = document.getElementById('backgroundMusic');
            if (!music) return;
            
            if (gameSettings.musicEnabled && gameSettings.musicVolume > 0) {
                music.volume = gameSettings.musicVolume;
                if (music.paused) {
                    music.play().catch(e => console.log("Music autoplay blocked:", e));
                }
            } else {
                music.pause();
            }
        }

        // Открытие настроек
        function openSettings() {
            playSound('clickSound');
            document.getElementById('settingsModal').style.display = 'flex';
            document.getElementById('settingsNameInput').value = gameData.playerName;
            
            // Рендерим темы и иконки
            renderThemes();
            renderIcons();
            initSliders();
        }

        // Закрытие настроек
        function closeSettings() {
            playSound('clickSound');
            document.getElementById('settingsModal').style.display = 'none';
        }

        // Открытие достижений
        function openAchievements() {
            playSound('clickSound');
            renderAchievements();
            document.getElementById('achievementsModal').style.display = 'flex';
        }

        // Закрытие достижений
        function closeAchievements() {
            playSound('clickSound');
            document.getElementById('achievementsModal').style.display = 'none';
        }

        // Рендер достижений
        function renderAchievements() {
            const grid = document.getElementById('achievementsGrid');
            grid.innerHTML = '';
            
            checkAchievements();
            
            achievements.forEach(achievement => {
                const isUnlocked = achievement.unlocked;
                const progress = achievement.progress ? achievement.progress : 0;
                const maxProgress = achievement.maxProgress ? achievement.maxProgress : 1;
                const progressPercent = Math.min((progress / maxProgress) * 100, 100);
                
                const card = document.createElement('div');
                card.className = `achievement-card ${isUnlocked ? 'unlocked' : ''}`;
                card.innerHTML = `
                    <div class="achievement-icon">
                        <span>${achievement.icon}</span>
                        <span class="achievement-name">${achievement.name}</span>
                    </div>
                    <div class="achievement-description">${achievement.description}</div>
                    <div class="achievement-reward">Награда: ${formatNumber(achievement.reward)} монет</div>
                    ${!isUnlocked ? `
                        <div class="achievement-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progressPercent}%"></div>
                            </div>
                            <div class="progress-text">${Math.floor(progressPercent)}%</div>
                        </div>
                    ` : ''}
                `;
                grid.appendChild(card);
            });
        }

        // Проверка достижений
        function checkAchievements() {
            let newAchievements = false;
            
            achievements.forEach(achievement => {
                if (!achievement.unlocked) {
                    // Проверяем условие
                    if (achievement.condition(gameData)) {
                        achievement.unlocked = true;
                        gameData.achievements.push(achievement.id);
                        
                        // Выдаем награду
                        gameData.balance += achievement.reward;
                        updateBalance();
                        
                        // Показываем уведомление
                        showAchievementNotification(achievement);
                        newAchievements = true;
                    }
                    
                    // Устанавливаем прогресс для отображения
                    switch(achievement.id) {
                        case 1: // Первый кейс
                            achievement.progress = gameData.openedCases;
                            achievement.maxProgress = 1;
                            break;
                        case 2: // Первый рабочий
                            achievement.progress = gameData.workers.length;
                            achievement.maxProgress = 1;
                            break;
                        case 3: // Миллионер
                            achievement.progress = gameData.balance;
                            achievement.maxProgress = 1000000;
                            break;
                        case 4: // 10 рабочих
                            achievement.progress = gameData.workers.length;
                            achievement.maxProgress = 10;
                            break;
                        case 5: // 50 кейсов
                            achievement.progress = gameData.openedCases;
                            achievement.maxProgress = 50;
                            break;
                        case 6: // 5 зданий
                            achievement.progress = gameData.city.buildings.length;
                            achievement.maxProgress = 5;
                            break;
                        case 7: // Высота 10к
                            achievement.progress = gameData.rocket.maxHeight;
                            achievement.maxProgress = 10000;
                            break;
                        case 8: // Потеря рабочего
                            achievement.progress = gameData.rocket.crashes || 0;
                            achievement.maxProgress = 1;
                            break;
                        case 9: // Эксклюзивный рабочий
                            achievement.progress = gameData.rocket.exclusiveWorkers.length;
                            achievement.maxProgress = 1;
                            break;
                        case 10: // 10м монет
                            achievement.progress = gameData.totalEarned;
                            achievement.maxProgress = 10000000;
                            break;
                        case 11: // Редкий рабочий
                            achievement.progress = gameData.workers.some(w => ['legendary', 'mythic', 'cosmic', 'divine', 'exotic', 'ultimate', 'beta-tester', 'exclusive'].includes(w.rarity)) ? 1 : 0;
                            achievement.maxProgress = 1;
                            break;
                        case 12: // Уровень 10
                            const maxLevel = gameData.workers.length > 0 ? Math.max(...gameData.workers.map(w => w.level)) : 0;
                            achievement.progress = maxLevel;
                            achievement.maxProgress = 10;
                            break;
                    }
                }
            });
            
            if (newAchievements) {
                saveGame();
            }
        }

        // Показать уведомление о достижении
        function showAchievementNotification(achievement) {
            const notification = document.createElement('div');
            notification.className = 'achievement-notification';
            notification.innerHTML = `
                <span style="font-size: 32px;">${achievement.icon}</span>
                <div style="flex: 1;">
                    <div style="font-weight: 700; font-size: 18px;">Достижение разблокировано!</div>
                    <div style="font-size: 14px; opacity: 0.9;">${achievement.name}</div>
                    <div style="font-size: 12px; opacity: 0.7;">+${formatNumber(achievement.reward)} монет</div>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) reverse forwards';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 400);
            }, 5000);
            
            playSound('workerGetSound', 1.2);
        }

        // Инициализация слайдеров
        function initSliders() {
            initSlider('musicSlider', gameSettings.musicVolume * 100, (value) => {
                gameSettings.musicVolume = value / 100;
                document.getElementById('musicPercent').textContent = `${value}%`;
                updateMusic();
            });
            
            initSlider('sfxSlider', gameSettings.sfxVolume * 100, (value) => {
                gameSettings.sfxVolume = value / 100;
                document.getElementById('sfxPercent').textContent = `${value}%`;
            });
        }

        // Инициализация слайдера
        function initSlider(sliderId, initialValue, onChange) {
            const slider = document.getElementById(sliderId);
            const fill = slider.querySelector('.sound-slider-fill');
            const handle = slider.querySelector('.sound-slider-handle');
            const percent = sliderId === 'musicSlider' ? 'musicPercent' : 'sfxPercent';
            
            fill.style.width = `${initialValue}%`;
            handle.style.left = `${initialValue}%`;
            
            let isDragging = false;
            
            const updateSlider = (clientX) => {
                const rect = slider.getBoundingClientRect();
                let x = clientX - rect.left;
                x = Math.max(0, Math.min(x, rect.width));
                
                const percentValue = Math.round((x / rect.width) * 100);
                
                fill.style.width = `${percentValue}%`;
                handle.style.left = `${percentValue}%`;
                document.getElementById(percent).textContent = `${percentValue}%`;
                
                onChange(percentValue);
            };
            
            handle.addEventListener('mousedown', (e) => {
                isDragging = true;
                e.preventDefault();
            });
            
            slider.addEventListener('mousedown', (e) => {
                isDragging = true;
                updateSlider(e.clientX);
            });
            
            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    updateSlider(e.clientX);
                }
            });
            
            document.addEventListener('mouseup', () => {
                isDragging = false;
            });
            
            // Для мобильных устройств
            handle.addEventListener('touchstart', (e) => {
                isDragging = true;
                e.preventDefault();
            });
            
            slider.addEventListener('touchstart', (e) => {
                isDragging = true;
                updateSlider(e.touches[0].clientX);
            });
            
            document.addEventListener('touchmove', (e) => {
                if (isDragging) {
                    updateSlider(e.touches[0].clientX);
                }
            });
            
            document.addEventListener('touchend', () => {
                isDragging = false;
            });
        }

        // Выбор темы
        function selectTheme(themeId) {
            playSound('clickSound');
            gameSettings.theme = themeId;
            
            // Обновляем класс body
            document.body.className = `theme-${themeId}`;
            
            // Обновляем отображение тем
            renderThemes();
        }

        // Выбор иконки
        function selectIcon(icon) {
            playSound('clickSound');
            gameSettings.icon = icon;
            
            // Обновляем иконки в балансе
            document.querySelectorAll('.coin-icon').forEach(el => {
                el.textContent = icon;
            });
            
            // Обновляем отображение иконок
            renderIcons();
        }

        // Рендер тем
        function renderThemes() {
            const grid = document.getElementById('themesGrid');
            grid.innerHTML = '';
            
            themes.forEach(theme => {
                const card = document.createElement('div');
                card.className = `theme-card ${gameSettings.theme === theme.id ? 'active' : ''}`;
                card.onclick = () => selectTheme(theme.id);
                card.innerHTML = `
                    <div class="theme-color" style="background: ${theme.color};"></div>
                    <div class="theme-name">${theme.name}</div>
                `;
                grid.appendChild(card);
            });
        }

        // Рендер иконок
        function renderIcons() {
            const grid = document.getElementById('iconsGrid');
            grid.innerHTML = '';
            
            icons.forEach(icon => {
                const card = document.createElement('div');
                card.className = `icon-card ${gameSettings.icon === icon.icon ? 'active' : ''}`;
                card.onclick = () => selectIcon(icon.icon);
                card.innerHTML = `
                    <i>${icon.icon}</i>
                `;
                grid.appendChild(card);
            });
        }

        // Смена имени игрока
        function changePlayerName() {
            const nameInput = document.getElementById('settingsNameInput');
            const newName = nameInput.value.trim();
            
            if (!newName) {
                showNotification("Пожалуйста, введите новый никнейм!", 'warning');
                playSound('errorSound');
                return;
            }
            
            if (newName.length < 2 || newName.length > 20) {
                showNotification("Никнейм должен быть от 2 до 20 символов!", 'warning');
                playSound('errorSound');
                return;
            }
            
            gameData.playerName = newName;
            document.getElementById('playerNameDisplay').textContent = newName;
            
            showNotification(`Никнейм изменен на: ${newName}`, 'success');
            playSound('coinSound');
            
            updateLeaderboard();
            updateStats();
            saveGame();
        }

        // Сохранение настроек
        function saveSettings() {
            playSound('clickSound');
            
            const saveData = {
                theme: gameSettings.theme,
                icon: gameSettings.icon,
                musicVolume: gameSettings.musicVolume,
                sfxVolume: gameSettings.sfxVolume,
                musicEnabled: gameSettings.musicVolume > 0,
                sfxEnabled: gameSettings.sfxVolume > 0
            };
            
            localStorage.setItem('cornerEarningSettings', JSON.stringify(saveData));
            showNotification('Настройки сохранены!', 'success');
            closeSettings();
        }

        // Загрузка настроек
        function loadSettings() {
            const saved = localStorage.getItem('cornerEarningSettings');
            if (saved) {
                const loadedSettings = JSON.parse(saved);
                gameSettings = { ...gameSettings, ...loadedSettings };
                
                // Применяем настройки
                document.body.className = `theme-${gameSettings.theme}`;
                
                document.querySelectorAll('.coin-icon').forEach(el => {
                    el.textContent = gameSettings.icon;
                });
                
                updateMusic();
            }
        }

        // Сброс настроек
        function resetSettings() {
            playSound('clickSound');
            
            if (confirm('Вы уверены, что хотите сбросить все настройки к значениям по умолчанию?')) {
                gameSettings = {
                    theme: 'default',
                    icon: '💰',
                    musicVolume: 0.5,
                    sfxVolume: 0.7,
                    musicEnabled: true,
                    sfxEnabled: true
                };
                
                localStorage.removeItem('cornerEarningSettings');
                
                document.body.className = 'theme-default';
                document.querySelectorAll('.coin-icon').forEach(el => {
                    el.textContent = '💰';
                });
                
                updateMusic();
                renderThemes();
                renderIcons();
                initSliders();
                
                showNotification('Настройки сброшены!', 'success');
            }
        }

        // Старт игры
        function startGame() {
            const nameInput = document.getElementById('playerNameInput');
            const playerName = nameInput.value.trim();
            
            if (!playerName) {
                showNotification("Пожалуйста, введите никнейм!", 'warning');
                playSound('errorSound');
                return;
            }
            
            if (playerName.length < 2 || playerName.length > 20) {
                showNotification("Никнейм должен быть от 2 до 20 символов!", 'warning');
                playSound('errorSound');
                return;
            }
            
            playSound('clickSound');
            
            gameData.playerName = playerName;
            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('playerNameDisplay').textContent = playerName;
            
            // Показываем приветственное окно
            showWelcome();
        }

// Таймер опыта (глобальная функция)
function startExperienceTimer() {
    setInterval(() => {
        const experienceMultiplier = Math.min(getBuildingBonus('experienceMultiplier'), MAX_CITY_MULTIPLIER);
        
        gameData.workers.forEach(worker => {
            if (!worker.isRare && !worker.isSpecial) {
                const experienceGain = (worker.income / 10) * experienceMultiplier;
                worker.experience += experienceGain;
                
                if (worker.experience >= worker.maxExperience) {
                    worker.experience = worker.maxExperience;
                }
            }
        });
        
        if (document.getElementById('workers-tab')?.classList.contains('active')) {
            renderWorkers();
        }
        
        if (document.getElementById('upgrades-tab')?.classList.contains('active')) {
            renderUpgrades();
        }
    }, 1000);
}

// Пассивный доход (глобальная функция)
function startPassiveIncome() {
    setInterval(() => {
        const income = (Math.min(gameData.totalIncomePerSecond * gameData.city.totalBonus, MAX_INCOME_PER_SECOND)) / 10;
        gameData.balance += income;
        gameData.totalEarned += income;
        updateBalance();
    }, 100);
}

// Обновление пассивного дохода (глобальная функция)
function updatePassiveIncome() {
    let totalIncome = 0;
    
    gameData.workers.forEach(worker => {
        let workerIncome = worker.income;
        
        const incomeMultiplier = Math.min(getBuildingBonus('incomeMultiplier'), MAX_CITY_MULTIPLIER);
        workerIncome = workerIncome * incomeMultiplier;
        
        if (worker.isRare || worker.isSpecial) {
            const rareIncomeMultiplier = Math.min(getBuildingBonus('rareIncomeMultiplier'), MAX_CITY_MULTIPLIER);
            workerIncome = workerIncome * rareIncomeMultiplier;
        }
        
        const globalMultiplier = Math.min(getBuildingBonus('globalMultiplier'), MAX_CITY_MULTIPLIER);
        workerIncome = workerIncome * globalMultiplier;
        
        totalIncome += workerIncome;
    });
    
    // Добавляем бонус от ракетки, если она в полете
    if (gameData.rocket.isFlying && gameData.rocket.worker) {
        let rocketBonus = gameData.rocket.flightIncomeMultiplier;
        
        // Престиж бонус к ракетке
        if (prestigeData.prestigeUpgrades.includes('rocket_bonus')) {
            rocketBonus *= 1.25; // +25% к доходу ракетки
        }
        
        totalIncome = totalIncome * rocketBonus;
    }
    
    totalIncome = totalIncome * Math.min(gameData.city.totalBonus, MAX_CITY_MULTIPLIER);
    
    // Престиж бонус к доходу
    if (prestigeData.prestigeUpgrades.includes('income_boost')) {
        totalIncome *= 1.20; // +20% к доходу всех рабочих
    }
    
    gameData.totalIncomePerSecond = Math.min(totalIncome, MAX_INCOME_PER_SECOND);
    
    updateIncomePerSecond();
}

// Обновить отображение дохода (глобальная функция)
function updateIncomePerSecond() {
    const totalWithBonus = Math.min(gameData.totalIncomePerSecond * gameData.city.totalBonus, MAX_INCOME_PER_SECOND);
    const incomeElement = document.getElementById('incomePerSecond');
    if (incomeElement) {
        incomeElement.textContent = formatNumber(totalWithBonus);
    }
}

// Обновление баланса (глобальная функция)
let lastBalanceUpdate = 0;
function updateBalance() {
    const now = Date.now();
    if (now - lastBalanceUpdate < 100) return; // Обновляем не чаще чем раз в 100мс
    lastBalanceUpdate = now;
    
    const balanceElement = document.getElementById('balance');
    if (balanceElement) {
        balanceElement.textContent = formatNumber(Math.floor(gameData.balance));
    }
    
    // Обновляем иконку если настроена
    const balanceIcon = document.getElementById('balanceIcon');
    if (balanceIcon && gameSettings.icon) {
        balanceIcon.textContent = gameSettings.icon;
    }
    
    // Обновляем баланс Шардов
    const shardsElement = document.getElementById('shardsBalance');
    if (shardsElement) {
        shardsElement.textContent = formatNumber(gameData.shards);
    }
}

        // Инициализация после приветствия
        function initGameAfterStart() {
            document.getElementById('gameContainer').style.display = 'block';
            
            // Сохраняем имя и запускаем инициализацию
            saveGame();
            
            console.log('Initializing game after start...');
            
            // Обновляем интерфейс
            updateBalance();
            renderCases();
            renderWorkers();
            renderRocketWorkers();
            updatePassiveIncome();
            renderUpgrades();
            updateStats();
            
            // PvP инициализация
            updateStamina();
            updatePvpStats();
            checkPvpUnlock();
            
            // Аудио система инициализация
            initAudioSystem();
            
            // Запускаем пассивный доход
            startPassiveIncome();
            updatePassiveIncome();
            
            // Запускаем таймер опыта
            startExperienceTimer();
            
            // Обновляем UI престижа
            updatePrestigeUI();
            
            // Создаем частицы для баланса
            createBalanceParticles();
            
            // Применяем сохраненную тему
            if (gameSettings.theme) {
                applyTheme(gameSettings.theme);
            }
            
            console.log('Game started successfully!');
        }

        // Инициализация игры
        function initGame() {
            updateBalance();
            renderCases();
            loadGame();
            loadSettings();
            startPassiveIncome();
            updateIncomePerSecond();
            startExperienceTimer();
            setInterval(updatePassiveIncome, 1000);
            setInterval(saveGame, 30000);
            updateLeaderboard();
            updateStats();
            renderCity();
            renderAvailableBuildings();
            updateCityBonusDisplay();
            
            addPlayerToLeaderboard();
            checkAchievements();
            
            // Закрытие модальных окон при клике вне их
            document.getElementById('caseModal').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeCaseModal();
                }
            });
            
            document.getElementById('settingsModal').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeSettings();
                }
            });
            
            document.getElementById('achievementsModal').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeAchievements();
                }
            });
            
            // Закрытие PvP модального окна при клике вне его
            document.getElementById('pvpModal').addEventListener('click', function(e) {
                if (e.target === this) {
                    attemptClosePvpModal();
                }
            });
            
            // Блокировка Escape во время PvP битвы
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    const pvpModal = document.getElementById('pvpModal');
                    if (pvpModal.classList.contains('show')) {
                        attemptClosePvpModal();
                        e.preventDefault();
                    }
                }
            });
            
            // Запускаем музыку
            setTimeout(() => {
                updateMusic();
            }, 1000);
        }

        // Переключение вкладок
        function switchTab(tabName) {
            playSound('clickSound');
            
            // Кэшируем элементы для оптимизации
            const tabs = document.querySelectorAll('.tab');
            const contents = document.querySelectorAll('.tab-content');
            
            // Быстрое удаление классов
            tabs.forEach(tab => tab.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));
            
            // Добавляем активные классы
            const activeTab = document.querySelector(`.tab[onclick*="${tabName}"]`);
            const activeContent = document.getElementById(`${tabName}-tab`);
            
            if (activeTab) activeTab.classList.add('active');
            if (activeContent) activeContent.classList.add('active');
            
            // Оптимизированный рендеринг содержимого
            switch(tabName) {
                case 'workers':
                    renderWorkers();
                    break;
                case 'upgrades':
                    renderUpgrades();
                    break;
                case 'rocket':
                    renderRocketWorkers();
                    updateRocketStats();
                    break;
                case 'city':
                    renderCity();
                    renderAvailableBuildings();
                    break;
                case 'leaderboard':
                    updateLeaderboard();
                    break;
                case 'stats':
                    updateStats();
                    break;
                case 'pvp':
                    renderPvpWorkers();
                    updateStamina();
                    break;
            }
        }

        // Рендер рабочих для ракетки
        function renderRocketWorkers() {
            const container = document.getElementById('rocketWorkersGrid');
            container.innerHTML = '';
            
            if (gameData.workers.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">👨‍🚀</div>
                        <div class="empty-title">Рабочих пока нет</div>
                        <div class="empty-description">Сначала получите рабочих из кейсов!</div>
                        <button class="action-button" onclick="switchTab('cases')">
                            <span>🎁</span>
                            <span>Открыть кейсы</span>
                        </button>
                    </div>
                `;
                return;
            }
            
            const sortedWorkers = [...gameData.workers].sort((a, b) => {
                const rarityOrder = { 
                    'exclusive': 11,
                    'beta-tester': 10,
                    'ultimate': 9, 
                    'divine': 8, 
                    'exotic': 7, 
                    'mythic': 6, 
                    'cosmic': 5, 
                    'legendary': 4, 
                    'epic': 3, 
                    'rare': 2, 
                    'common': 1 
                };
                const aRarity = rarityOrder[a.rarity] || 0;
                const bRarity = rarityOrder[b.rarity] || 0;
                
                if (bRarity !== aRarity) return bRarity - aRarity;
                return b.income - a.income;
            });
            
            sortedWorkers.forEach(worker => {
                const isInRocket = gameData.rocket.worker && gameData.rocket.worker.id === worker.id;
                const isSelected = gameData.rocket.worker && gameData.rocket.worker.id === worker.id;
                
                const workerCard = document.createElement('div');
                workerCard.className = `rocket-worker-card ${isSelected ? 'selected' : ''} ${isInRocket ? 'in-rocket' : ''}`;
                workerCard.onclick = () => {
                    if (!isInRocket && !gameData.rocket.isFlying) {
                        playSound('clickSound');
                        selectRocketWorker(worker);
                    }
                };
                workerCard.innerHTML = `
                    <div class="rocket-worker-icon">${worker.icon}</div>
                    <div class="rocket-worker-name">${worker.name}</div>
                    <div class="rocket-worker-rarity ${worker.rarity}">${worker.rarity}</div>
                    <div class="rocket-worker-level">Ур. ${worker.level}</div>
                `;
                
                if (isInRocket) {
                    workerCard.style.opacity = '0.7';
                    workerCard.style.cursor = 'default';
                    workerCard.innerHTML += `<div style="font-size: 10px; color: #FF6B35; margin-top: 4px;">В ракетке</div>`;
                }
                
                container.appendChild(workerCard);
            });
        }

        // Выбор рабочего для ракетки
        function selectRocketWorker(worker) {
            if (gameData.rocket.isFlying) {
                showNotification('Сначала верните текущую ракету!', 'warning');
                playSound('errorSound');
                return;
            }
            
            gameData.rocket.worker = worker;
            
            // Обновляем отображение
            renderRocketWorkers();
            
            // Обновляем информацию о выбранном рабочем
            updateSelectedRocketWorkerInfo(worker);
            
            // Активируем кнопку запуска
            const launchButton = document.getElementById('launchButton');
            if (launchButton) {
                launchButton.disabled = false;
                launchButton.textContent = `Запустить ${worker.name} в ракету`;
            }
            
            showNotification(`Выбран рабочий: ${worker.name}`, 'success');
        }

        // Обновление информации о выбранном рабочем для ракетки
        function updateSelectedRocketWorkerInfo(worker) {
            const infoContainer = document.getElementById('selectedRocketWorkerInfo');
            
            infoContainer.innerHTML = `
                <div class="selected-worker-icon">${worker.icon}</div>
                <div class="selected-worker-name">${worker.name}</div>
                <div class="selected-worker-bonus">Доход: ${formatNumber(worker.income)}/сек</div>
            `;
        }

        // Запуск ракетки
        function launchRocket() {
            if (!gameData.rocket.worker) {
                showNotification('Выберите рабочего для запуска!', 'warning');
                playSound('errorSound');
                return;
            }
            
            if (gameData.rocket.isFlying) {
                showNotification('Ракета уже в полете!', 'warning');
                playSound('errorSound');
                return;
            }
            
            gameData.rocket.isFlying = true;
            gameData.rocket.launchTime = Date.now();
            gameData.rocket.dangerLevel = 0;
            gameData.rocket.height = 0;
            gameData.rocket.flightIncomeMultiplier = 1.0;
            
            playSound('rocketSound');
            showNotification(`${gameData.rocket.worker.name} отправляется в космос!`, 'success');
            
            // Обновляем интерфейс
            updateRocketInterface();
            startRocketFlight();
            
            // Скрываем пламя
            document.getElementById('rocketFlame').style.display = 'block';
            
            // Обновляем кнопки
            document.getElementById('launchButton').disabled = true;
            document.getElementById('landButton').disabled = false;
            
            saveGame();
        }

        // Запуск полета ракетки
        function startRocketFlight() {
            if (rocketFlightInterval) clearInterval(rocketFlightInterval);
            
            rocketFlightInterval = setInterval(() => {
                if (!gameData.rocket.isFlying) return;
                
                // Увеличиваем высоту
                const heightGain = 100 + Math.random() * 200;
                gameData.rocket.height += heightGain;
                
                // Обновляем максимальную высоту
                if (gameData.rocket.height > gameData.rocket.maxHeight) {
                    gameData.rocket.maxHeight = gameData.rocket.height;
                }
                
                // Увеличиваем XP
                gameData.rocket.xp += heightGain * ROCKET_XP_MULTIPLIER;
                
                // Увеличиваем множитель дохода
                gameData.rocket.flightIncomeMultiplier = 1.0 + (gameData.rocket.height / 10000);
                
                // Увеличиваем опасность
                gameData.rocket.dangerLevel = Math.min(gameData.rocket.height / 50000, 1.0);
                
                // Проверяем на падение (случайное событие)
                const crashChance = gameData.rocket.baseCrashChance * gameData.rocket.dangerLevel;
                if (Math.random() < crashChance) {
                    crashRocket();
                    return;
                }
                
                // Проверяем на получение эксклюзивного рабочего
                checkExclusiveWorker();
                
                // Обновляем интерфейс
                updateRocketInterface();
                
            }, 1000); // Обновляем каждую секунду
        }

        // Обновление интерфейса ракетки
        function updateRocketInterface() {
            // Обновляем высоту
            document.getElementById('rocketHeight').textContent = formatNumber(Math.floor(gameData.rocket.height));
            document.getElementById('currentHeight').textContent = formatNumber(Math.floor(gameData.rocket.height));
            
            // Обновляем XP
            document.getElementById('rocketXp').textContent = formatNumber(Math.floor(gameData.rocket.xp));
            
            // Обновляем множитель дохода
            document.getElementById('flightIncome').textContent = `x${gameData.rocket.flightIncomeMultiplier.toFixed(1)}`;
            
            // Обновляем опасность
            const dangerText = gameData.rocket.dangerLevel < 0.3 ? 'Низкая' : 
                              gameData.rocket.dangerLevel < 0.7 ? 'Средняя' : 'Высокая';
            document.getElementById('dangerLevel').textContent = dangerText;
            document.getElementById('dangerText').textContent = dangerText;
            
            // Обновляем позицию ракеты
            const rocketShip = document.getElementById('rocketShip');
            const maxVisualHeight = 350; // Максимальная визуальная высота
            const heightPercent = Math.min(gameData.rocket.height / ROCKET_MAX_HEIGHT, 1);
            const bottomPosition = 50 + (heightPercent * maxVisualHeight);
            rocketShip.style.bottom = `${bottomPosition}px`;
        }

        // Проверка на получение эксклюзивного рабочего
        function checkExclusiveWorker() {
            if (!gameData.rocket.isFlying || !gameData.rocket.worker) return;
            
            // Проверяем, можно ли получить эксклюзивного рабочего
            exclusiveRocketWorkers.forEach(exclusive => {
                if (!gameData.rocket.exclusiveWorkers.includes(exclusive.name)) {
                    if (gameData.rocket.xp >= exclusive.requirement.minXp && 
                        gameData.rocket.worker.level >= exclusive.requirement.minLevel) {
                        
                        // Шанс получения зависит от высоты и XP
                        const chance = (gameData.rocket.height / ROCKET_MAX_HEIGHT) * 0.1;
                        if (Math.random() < chance) {
                            getExclusiveWorker(exclusive);
                        }
                    }
                }
            });
        }

        // Получение эксклюзивного рабочего
        function getExclusiveWorker(exclusive) {
            const workerId = Date.now();
            const newWorker = {
                id: workerId,
                name: exclusive.name,
                icon: exclusive.icon,
                level: exclusive.level,
                income: exclusive.income,
                experience: 0,
                maxExperience: 100 * exclusive.level,
                rarity: exclusive.rarity,
                style: 'normal',
                isRare: true,
                isSpecial: true
            };
            
            gameData.workers.push(newWorker);
            gameData.rocket.exclusiveWorkers.push(exclusive.name);
            
            showNotification(`✨ НЕВЕРОЯТНО! Вы получили эксклюзивного рабочего: ${exclusive.name}!`, 'success');
            playSound('workerGetSound', 1.2);
            
            // Обновляем интерфейсы
            renderWorkers();
            renderUpgrades();
            renderRocketWorkers();
            updatePassiveIncome();
            updateStats();
            
            saveGame();
        }

        // Падение ракетки
        function crashRocket() {
            if (!gameData.rocket.isFlying || !gameData.rocket.worker) return;
            
            playSound('explosionSound', 0.8);
            
            const workerName = gameData.rocket.worker.name;
            
            // Удаляем рабочего
            const workerIndex = gameData.workers.findIndex(w => w.id === gameData.rocket.worker.id);
            if (workerIndex !== -1) {
                gameData.workers.splice(workerIndex, 1);
            }
            
            // Сбрасываем ракетку
            gameData.rocket.isFlying = false;
            gameData.rocket.worker = null;
            gameData.rocket.crashes = (gameData.rocket.crashes || 0) + 1;
            
            showNotification(`💥 КАТАСТРОФА! Ракета разбилась! ${workerName} погиб...`, 'error');
            
            // Обновляем интерфейс
            stopRocketFlight();
            updateRocketInterface();
            
            // Обновляем кнопки
            document.getElementById('launchButton').disabled = false;
            document.getElementById('landButton').disabled = true;
            
            // Сбрасываем выбор
            gameData.rocket.worker = null;
            document.getElementById('selectedRocketWorkerInfo').innerHTML = `
                <div class="selected-worker-icon">👨‍🚀</div>
                <div class="selected-worker-name">Выберите рабочего</div>
                <div class="selected-worker-bonus">Доход: 0/сек</div>
            `;
            
            // Обновляем рабочих
            renderWorkers();
            renderRocketWorkers();
            updatePassiveIncome();
            updateStats();
            
            checkAchievements();
            saveGame();
        }

        // Возврат ракетки
        function landRocket() {
            if (!gameData.rocket.isFlying || !gameData.rocket.worker) return;
            
            playSound('rocketSound', 0.5);
            
            // Начисляем бонусы
            const flightTime = Date.now() - gameData.rocket.launchTime;
            const hoursInFlight = flightTime / (1000 * 60 * 60);
            
            // Бонусные монеты за полет
            const bonusCoins = Math.floor(gameData.rocket.height * gameData.rocket.flightIncomeMultiplier);
            gameData.balance += bonusCoins;
            gameData.totalEarned += bonusCoins;
            
            // Улучшаем рабочего
            const worker = gameData.workers.find(w => w.id === gameData.rocket.worker.id);
            if (worker) {
                const xpGain = Math.floor(gameData.rocket.xp / 1000);
                worker.experience += xpGain;
                
                // Проверяем уровень
                if (worker.experience >= worker.maxExperience && worker.maxExperience > 0) {
                    worker.level++;
                    worker.experience = 0;
                    worker.income = Math.floor(worker.income * 1.5);
                    worker.maxExperience = Math.floor(worker.maxExperience * 1.5);
                    
                    showNotification(`🎉 ${worker.name} повысил уровень до ${worker.level}!`, 'success');
                }
            }
            
            showNotification(`🚀 Ракета успешно вернулась! Бонус: +${formatNumber(bonusCoins)} монет, XP: +${formatNumber(gameData.rocket.xp)}`, 'success');
            
            // Сбрасываем ракетку
            gameData.rocket.isFlying = false;
            gameData.rocket.worker = null;
            
            // Обновляем интерфейс
            stopRocketFlight();
            updateRocketInterface();
            
            // Обновляем кнопки
            document.getElementById('launchButton').disabled = false;
            document.getElementById('landButton').disabled = true;
            
            // Сбрасываем выбор
            selectedRocketWorker = null;
            document.getElementById('selectedRocketWorkerInfo').innerHTML = `
                <div class="selected-worker-icon">👨‍🚀</div>
                <div class="selected-worker-name">Выберите рабочего</div>
                <div class="selected-worker-bonus">Доход: 0/сек</div>
            `;
            
            // Скрываем пламя
            document.getElementById('rocketFlame').style.display = 'none';
            
            // Обновляем баланс
            updateBalance();
            
            // Обновляем рабочих
            renderWorkers();
            renderRocketWorkers();
            updatePassiveIncome();
            updateStats();
            
            saveGame();
        }

        // Остановка полета ракетки
        function stopRocketFlight() {
            if (rocketFlightInterval) {
                clearInterval(rocketFlightInterval);
                rocketFlightInterval = null;
            }
        }

        // Обновление статистики ракетки
        function updateRocketStats() {
            // Эта функция теперь обновляется в updateRocketInterface
        }

        // Рендер карты города
        function renderCity() {
            const grid = document.getElementById('cityGrid');
            grid.innerHTML = '';
            
            for (let i = 0; i < 25; i++) {
                const tile = document.createElement('div');
                tile.className = 'map-tile empty';
                tile.dataset.index = i;
                
                const buildingOnTile = gameData.city.buildings.find(b => b.position === i);
                
                if (buildingOnTile) {
                    const buildingInfo = buildings.find(b => b.id === buildingOnTile.buildingId);
                    if (buildingInfo) {
                        tile.className = 'map-tile built';
                        tile.innerHTML = `
                            <div class="building-icon">${buildingInfo.icon}</div>
                            <div class="building-name">${buildingInfo.name}</div>
                        `;
                        tile.onclick = () => selectTile(i, buildingOnTile);
                    }
                } else {
                    tile.innerHTML = '';
                    tile.onclick = () => selectTile(i, null);
                }
                
                grid.appendChild(tile);
            }
            
            selectedBuildingId = null;
            updateBuildingInfo();
        }

        // Рендер доступных зданий
        function renderAvailableBuildings() {
            const container = document.getElementById('availableBuildings');
            container.innerHTML = '';
            
            buildings.forEach(building => {
                const isBuilt = gameData.city.buildings.find(b => b.buildingId === building.id);
                
                const buildingCard = document.createElement('div');
                buildingCard.className = `building-card ${isBuilt ? 'built' : ''}`;
                if (!isBuilt) {
                    buildingCard.onclick = () => {
                        playSound('clickSound');
                        selectBuilding(building.id);
                    };
                }
                buildingCard.innerHTML = `
                    <div class="building-card-icon">${building.icon}</div>
                    <div class="building-card-name">${building.name}</div>
                    <div class="building-card-price">${isBuilt ? '✓ Построено' : formatNumber(building.price)}</div>
                `;
                
                if (isBuilt) {
                    buildingCard.style.opacity = '0.6';
                    buildingCard.style.cursor = 'default';
                } else if (selectedBuildingId === building.id) {
                    buildingCard.style.borderColor = 'var(--primary)';
                    buildingCard.style.background = 'rgba(99, 102, 241, 0.1)';
                }
                
                container.appendChild(buildingCard);
            });
        }

        // Выбрать участок
        function selectTile(index, building) {
            playSound('clickSound');
            selectedTileIndex = index;
            
            if (building) {
                selectedBuildingId = null;
            }
            
            updateBuildingInfo(building);
            
            document.querySelectorAll('.map-tile').forEach(tile => {
                tile.style.boxShadow = 'none';
            });
            
            const selectedTile = document.querySelector(`.map-tile[data-index="${index}"]`);
            if (selectedTile) {
                selectedTile.style.boxShadow = '0 0 0 3px var(--primary)';
            }
        }

        // Выбрать здание
        function selectBuilding(buildingId) {
            selectedBuildingId = buildingId;
            renderAvailableBuildings();
            updateBuildingInfo();
        }

        // Обновить информацию о здании
        function updateBuildingInfo(buildingOnTile = null) {
            const icon = document.getElementById('selectedBuildingIcon');
            const name = document.getElementById('selectedBuildingName');
            const description = document.getElementById('selectedBuildingDescription');
            const stats = document.getElementById('buildingStats');
            const actionButton = document.getElementById('buildingAction');
            
            if (buildingOnTile) {
                const buildingInfo = buildings.find(b => b.id === buildingOnTile.buildingId);
                if (buildingInfo) {
                    icon.textContent = buildingInfo.icon;
                    name.textContent = `${buildingInfo.name}`;
                    description.textContent = buildingInfo.description;
                    
                    stats.innerHTML = `
                        <div class="building-stat">
                            <div class="building-stat-label">Бонус</div>
                            <div class="building-stat-value">+${Math.round((buildingInfo.bonus - 1) * 100)}%</div>
                        </div>
                    `;
                    
                    actionButton.disabled = true;
                    actionButton.textContent = '✓ Уже построено';
                    actionButton.onclick = null;
                }
            } else if (selectedTileIndex !== null && selectedBuildingId !== null) {
                const buildingInfo = buildings.find(b => b.id === selectedBuildingId);
                if (buildingInfo) {
                    icon.textContent = buildingInfo.icon;
                    name.textContent = buildingInfo.name;
                    description.textContent = buildingInfo.description;
                    
                    stats.innerHTML = `
                        <div class="building-stat">
                            <div class="building-stat-label">Бонус</div>
                            <div class="building-stat-value">+${Math.round((buildingInfo.bonus - 1) * 100)}%</div>
                        </div>
                    `;
                    
                    const canBuild = gameData.balance >= buildingInfo.price && 
                                   !gameData.city.buildings.find(b => b.buildingId === buildingInfo.id);
                    
                    actionButton.disabled = !canBuild;
                    
                    if (!canBuild) {
                        if (gameData.city.buildings.find(b => b.buildingId === buildingInfo.id)) {
                            actionButton.textContent = '✓ Уже построено';
                        } else {
                            actionButton.textContent = `Недостаточно монет (${formatNumber(buildingInfo.price)})`;
                        }
                    } else {
                        actionButton.textContent = `Построить за ${formatNumber(buildingInfo.price)}`;
                    }
                    actionButton.onclick = buildSelectedBuilding;
                }
            } else {
                icon.textContent = '🏗️';
                name.textContent = 'Выберите участок';
                description.textContent = 'Нажмите на пустой участок (с плюсиком) для постройки здания';
                stats.innerHTML = '';
                actionButton.disabled = true;
                actionButton.textContent = 'Выберите участок и здание';
            }
        }

        // Построить здание
        function buildSelectedBuilding() {
            if (selectedTileIndex === null || selectedBuildingId === null) {
                showNotification('Выберите участок и здание!', 'warning');
                playSound('errorSound');
                return;
            }
            
            const buildingInfo = buildings.find(b => b.id === selectedBuildingId);
            if (!buildingInfo) return;
            
            if (gameData.city.buildings.find(b => b.buildingId === buildingInfo.id)) {
                showNotification('Это здание уже построено! Каждое здание можно построить только один раз.', 'warning');
                playSound('errorSound');
                return;
            }
            
            if (gameData.balance < buildingInfo.price) {
                showNotification('Недостаточно монет!', 'error');
                playSound('errorSound');
                return;
            }
            
            const existingBuilding = gameData.city.buildings.find(b => b.position === selectedTileIndex);
            if (existingBuilding) {
                showNotification('Этот участок уже занят!', 'error');
                playSound('errorSound');
                return;
            }
            
            gameData.balance -= buildingInfo.price;
            playSound('coinSound');
            
            const newBuilding = {
                id: Date.now(),
                buildingId: buildingInfo.id,
                level: 1,
                position: selectedTileIndex
            };
            
            gameData.city.buildings.push(newBuilding);
            
            showNotification(`Построено здание: ${buildingInfo.name}! Бонус: +${Math.round((buildingInfo.bonus - 1) * 100)}%`, 'success');
            
            updateBalance();
            renderCity();
            updateBuildingInfo();
            calculateCityBonus();
            updateCityBonusDisplay();
            updateStats();
            saveGame();
            
            selectedTileIndex = null;
            selectedBuildingId = null;
        }

        // Рассчитать бонус города
        function calculateCityBonus() {
            let totalMultiplier = 1.0;
            let totalBonusPercent = 0;
            
            gameData.city.buildings.forEach(cityBuilding => {
                const buildingInfo = buildings.find(b => b.id === cityBuilding.buildingId);
                if (buildingInfo) {
                    totalBonusPercent += Math.round((buildingInfo.bonus - 1) * 100);
                }
            });
            
            totalMultiplier = 1 + (totalBonusPercent / 100);
            
            if (totalMultiplier > MAX_CITY_MULTIPLIER) {
                totalMultiplier = MAX_CITY_MULTIPLIER;
                totalBonusPercent = (MAX_CITY_MULTIPLIER - 1) * 100;
            }
            
            gameData.city.totalBonus = totalMultiplier;
            gameData.city.totalBonusPercent = Math.round(totalBonusPercent);
            updatePassiveIncome();
            return totalMultiplier;
        }

        // Обновить отображение бонуса города
        function updateCityBonusDisplay() {
            const bonus = calculateCityBonus();
            const bonusPercent = gameData.city.totalBonusPercent || 0;
            
            document.getElementById('cityBonusPercent').textContent = bonusPercent;
            
            if (bonusPercent > 0) {
                document.getElementById('cityBonusDisplay').style.display = 'flex';
                
                if (bonusPercent >= (MAX_CITY_MULTIPLIER - 1) * 100) {
                    document.getElementById('cityBonusDisplay').style.background = 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';
                    document.getElementById('cityBonusDisplay').innerHTML = `
                        <span class="bonus-icon">⚠️</span>
                        <span>Максимальный бонус города достигнут!</span>
                    `;
                }
            } else {
                document.getElementById('cityBonusDisplay').style.display = 'none';
            }
        }

        // Получить бонус от зданий
        function getBuildingBonus(bonusType) {
            let totalBonus = 1.0;
            
            if (gameData.city && gameData.city.buildings) {
                gameData.city.buildings.forEach(cityBuilding => {
                    const buildingInfo = buildings.find(b => b.id === cityBuilding.buildingId);
                    if (buildingInfo && buildingInfo.bonusType === bonusType) {
                        totalBonus *= buildingInfo.bonus;
                    }
                });
            }
            
            return Math.min(totalBonus, MAX_CITY_MULTIPLIER);
        }

        // Получить цену кейса со скидкой
        function getCasePrice(caseItem) {
            let price = caseItem.price;
            
            // Престиж скидка -15%
            if (prestigeData.prestigeUpgrades.includes('case_discount')) {
                price = Math.floor(price * 0.85);
            }
            
            // Скидка от зданий
            const caseCostMultiplier = getBuildingBonus('caseCostMultiplier');
            if (caseCostMultiplier < 1) {
                price = Math.floor(price * caseCostMultiplier);
            }
            
            return price;
        }
        
        // Рендер кейсов
        function renderCases() {
            console.log('renderCases called');
            const container = document.getElementById('casesContainer');
            container.innerHTML = '';
            
            cases.forEach((caseItem, index) => {
                console.log('Creating case:', caseItem.name);
                const caseElement = document.createElement('div');
                caseElement.className = `case-card ${caseItem.locked ? 'locked' : ''}`;
                caseElement.innerHTML = `
                    <div class="case-icon">${caseItem.icon}</div>
                    <div class="case-name">${caseItem.name}</div>
                    <div class="case-price">${formatNumber(getCasePrice(caseItem))} 💎</div>
                `;
                
                if (!caseItem.locked) {
                    caseElement.onclick = () => {
                        console.log('Case clicked:', caseItem.name);
                        playSound('clickSound');
                        openCaseModal(caseItem);
                    };
                }
                
                container.appendChild(caseElement);
            });
        }

        // Открыть модальное окно кейса
        function openCaseModal(caseItem) {
            console.log('openCaseModal called with:', caseItem);
            console.log('Current balance:', gameData.balance);
            
            const casePrice = getCasePrice(caseItem);
            console.log('Case price after discount:', casePrice);
            
            if (gameData.balance < casePrice) {
                showNotification('Недостаточно монет!', 'error');
                playSound('errorSound');
                return;
            }

            currentCase = caseItem;
            isRouletteSpinning = false;
            selectedReward = null;
            
            const modalTitle = document.getElementById('modalCaseTitle');
            const modalSubtitle = document.getElementById('modalCaseSubtitle');
            const casePriceElement = document.getElementById('casePrice');
            const resultIcon = document.getElementById('resultIcon');
            const resultTitle = document.getElementById('resultTitle');
            const resultDescription = document.getElementById('resultDescription');
            
            if (modalTitle) modalTitle.textContent = `Открытие: ${caseItem.name}`;
            if (modalSubtitle) modalSubtitle.textContent = `Элитный кейс уровня ${caseItem.level}`;
            if (casePriceElement) casePriceElement.textContent = formatNumber(casePrice);
            
            generateRouletteItems(caseItem);
            
            if (resultIcon) resultIcon.textContent = '🎁';
            if (resultTitle) resultTitle.textContent = 'Готовы открыть кейс?';
            if (resultDescription) resultDescription.textContent = `Нажмите "Открыть" чтобы начать вращение`;
            
            const modal = document.getElementById('caseModal');
            console.log('Modal element:', modal);
            if (modal) {
                modal.style.display = 'flex';
                console.log('Modal display set to flex');
            } else {
                console.error('Modal element not found!');
            }
            
            const openButton = document.getElementById('openButton');
            if (openButton) {
                openButton.disabled = false;
                openButton.onclick = startRoulette;
                openButton.innerHTML = `Открыть за ${formatNumber(caseItem.price)} монет`;
            }
        }

        // Генерация элементов рулетки
        function generateRouletteItems(caseItem) {
            const container = document.getElementById('rouletteTrack');
            container.innerHTML = '';
            rouletteItems = [];
            
            container.style.transition = 'none';
            container.style.transform = 'translateX(0)';
            
            const allPossibleRewards = [];
            
            caseItem.rewards.forEach(reward => {
                if (reward.type === 'coin') {
                    allPossibleRewards.push({
                        type: 'coin',
                        amount: reward.amount,
                        icon: '💰',
                        name: `${formatNumber(reward.amount)} монет`,
                        rarity: 'common'
                    });
                } else if (reward.type === 'worker' || reward.type === 'rare' || reward.type === 'special' || 
                          reward.type === 'legendary' || reward.type === 'epic' || reward.type === 'mythic' ||
                          reward.type === 'cosmic' || reward.type === 'divine' || reward.type === 'exotic' ||
                          reward.type === 'ultimate' || reward.type === 'beta-tester') {
                    reward.names.forEach(workerName => {
                        const workerInfo = workerNames.find(w => w.name === workerName);
                        if (workerInfo) {
                            allPossibleRewards.push({
                                type: 'worker',
                                name: workerInfo.name,
                                icon: workerInfo.icon,
                                rarity: workerInfo.rarity,
                                income: workerInfo.income,
                                level: workerInfo.level || 1,
                                style: workerInfo.style
                            });
                        }
                    });
                }
            });
            
            if (allPossibleRewards.length === 0) {
                allPossibleRewards.push(
                    { type: 'coin', amount: 100, icon: '💰', name: '100 монет', rarity: 'common' },
                    { type: 'coin', amount: 200, icon: '💰', name: '200 монет', rarity: 'common' }
                );
            }
            
            for (let i = 0; i < 60; i++) {
                const reward = allPossibleRewards[i % allPossibleRewards.length];
                rouletteItems.push(reward);
                
                const itemElement = document.createElement('div');
                itemElement.className = 'roulette-item';
                itemElement.innerHTML = `
                    <div class="roulette-item-icon">${reward.icon}</div>
                    <div class="roulette-item-name">${reward.name}</div>
                `;
                container.appendChild(itemElement);
            }
        }

        // Начать вращение рулетки
        function startRoulette() {
            if (isRouletteSpinning || !currentCase) return;
            
            let finalPrice = currentCase.price;
            const caseCostMultiplier = getBuildingBonus('caseCostMultiplier');
            if (caseCostMultiplier < 1) {
                finalPrice = Math.floor(currentCase.price * caseCostMultiplier);
            }
            
            if (gameData.balance < finalPrice) {
                showNotification('Недостаточно монет!', 'error');
                playSound('errorSound');
                closeCaseModal();
                return;
            }

            gameData.balance -= finalPrice;
            gameData.openedCases++;
            playSound('coinSound');
            updateBalance();
            saveGame();

            isRouletteSpinning = true;
            const openButton = document.getElementById('openButton');
            openButton.disabled = true;
            openButton.textContent = 'Вращение...';
            
            const rouletteTrack = document.getElementById('rouletteTrack');
            rouletteTrack.style.transition = 'none';
            rouletteTrack.style.transform = 'translateX(0)';
            
            const random = Math.random();
            let rewardType = '';
            let chance = random;
            
            const rareChanceMultiplier = getBuildingBonus('rareChanceMultiplier');
            
            const caseLevel = currentCase.level;
            const baseChances = {
                'worker': 0.4,
                'coin': 0.3,
                'rare': 0.15 * rareChanceMultiplier,
                'epic': 0.08 * rareChanceMultiplier,
                'legendary': 0.04 * rareChanceMultiplier,
                'mythic': 0.02 * rareChanceMultiplier,
                'divine': 0.006 * rareChanceMultiplier,
                'exotic': 0.003 * rareChanceMultiplier,
                'ultimate': 0.001 * rareChanceMultiplier,
                'cosmic': 0.0005 * rareChanceMultiplier,
                'beta-tester': 0.0001 * rareChanceMultiplier
            };
            
            const levelMultiplier = Math.min(caseLevel / 10, 2);
            
            const availableTypes = [];
            currentCase.rewards.forEach(reward => {
                if (!availableTypes.includes(reward.type)) {
                    availableTypes.push(reward.type);
                }
            });
            
            const weightedChances = {};
            let totalWeight = 0;
            
            availableTypes.forEach(type => {
                const baseWeight = baseChances[type] || 0.1;
                const adjustedWeight = baseWeight * levelMultiplier;
                weightedChances[type] = adjustedWeight;
                totalWeight += adjustedWeight;
            });
            
            let cumulative = 0;
            let selectedType = 'worker';
            
            for (const [type, weight] of Object.entries(weightedChances)) {
                cumulative += weight / totalWeight;
                if (chance <= cumulative) {
                    selectedType = type;
                    break;
                }
            }
            
            rewardType = selectedType;
            
            let finalReward = null;
            
            if (rewardType === 'coin') {
                const coinRewards = currentCase.rewards.filter(r => r.type === 'coin');
                const reward = coinRewards[Math.floor(Math.random() * coinRewards.length)];
                finalReward = {
                    type: 'coin',
                    amount: reward.amount,
                    icon: '💰',
                    name: `${formatNumber(reward.amount)} монет`
                };
            } else {
                const rewards = currentCase.rewards.filter(r => r.type === rewardType);
                if (rewards.length === 0) {
                    const workerRewards = currentCase.rewards.filter(r => r.type === 'worker');
                    if (workerRewards.length > 0) {
                        const reward = workerRewards[Math.floor(Math.random() * workerRewards.length)];
                        const workerName = reward.names[Math.floor(Math.random() * reward.names.length)];
                        const workerInfo = workerNames.find(w => w.name === workerName);
                        finalReward = {
                            type: 'worker',
                            name: workerInfo.name,
                            icon: workerInfo.icon,
                            rarity: workerInfo.rarity || 'common',
                            income: workerInfo.income,
                            level: workerInfo.level || 1,
                            style: workerInfo.style
                        };
                    } else {
                        finalReward = {
                            type: 'coin',
                            amount: currentCase.price / 2,
                            icon: '💰',
                            name: `${formatNumber(currentCase.price / 2)} монет`
                        };
                    }
                } else {
                    const reward = rewards[Math.floor(Math.random() * rewards.length)];
                    const workerName = reward.names[Math.floor(Math.random() * reward.names.length)];
                    const workerInfo = workerNames.find(w => w.name === workerName);
                    finalReward = {
                        type: 'worker',
                        name: workerInfo.name,
                        icon: workerInfo.icon,
                        rarity: workerInfo.rarity || (rewardType === 'legendary' ? 'legendary' : 
                               rewardType === 'epic' ? 'epic' : 
                               rewardType === 'rare' ? 'rare' : 
                               rewardType === 'mythic' ? 'mythic' :
                               rewardType === 'divine' ? 'divine' :
                               rewardType === 'exotic' ? 'exotic' :
                               rewardType === 'ultimate' ? 'ultimate' :
                               rewardType === 'cosmic' ? 'cosmic' :
                               rewardType === 'beta-tester' ? 'beta-tester' : 'common'),
                        income: workerInfo.income,
                        level: workerInfo.level || 1,
                        style: workerInfo.style
                    };
                }
            }
            
            selectedReward = finalReward;
            
            const targetIndices = [];
            rouletteItems.forEach((item, index) => {
                if (item.type === finalReward.type) {
                    if (item.type === 'coin' && item.amount === finalReward.amount) {
                        targetIndices.push(index);
                    } else if (item.type === 'worker' && item.name === finalReward.name) {
                        targetIndices.push(index);
                    }
                }
            });
            
            const targetIndex = targetIndices.length > 0 
                ? targetIndices[Math.floor(Math.random() * targetIndices.length)]
                : Math.floor(Math.random() * rouletteItems.length);
            
            animateRoulette(targetIndex, finalReward);
        }

        // Анимация рулетки
        function animateRoulette(targetIndex, reward) {
            const container = document.getElementById('rouletteTrack');
            const items = container.querySelectorAll('.roulette-item');
            
            items.forEach(item => item.classList.remove('winner'));
            
            container.style.transition = 'transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)';
            
            const itemWidth = 180;
            const centerPosition = window.innerWidth / 2;
            const targetPosition = -(targetIndex * itemWidth) + centerPosition - (itemWidth / 2);
            const spins = 5 + Math.floor(currentCase.level / 5);
            const spinDistance = spins * (items.length * itemWidth);
            const startPosition = targetPosition - spinDistance;
            
            container.style.transform = `translateX(${startPosition}px)`;
            
            playSound('caseOpenSound', 0.7);
            
            setTimeout(() => {
                container.style.transform = `translateX(${targetPosition}px)`;
                
                setTimeout(() => {
                    const items = container.querySelectorAll('.roulette-item');
                    const containerRect = container.getBoundingClientRect();
                    
                    let winnerItem = null;
                    let winnerIndex = -1;
                    
                    items.forEach((item, index) => {
                        const itemRect = item.getBoundingClientRect();
                        const itemCenter = itemRect.left + itemRect.width / 2;
                        
                        if (Math.abs(itemCenter - centerPosition) < 50) {
                            winnerItem = item;
                            winnerIndex = index;
                        }
                    });
                    
                    if (winnerItem) {
                        winnerItem.classList.add('winner');
                        playSound('workerGetSound', 0.8);
                        
                        if (winnerIndex >= 0 && winnerIndex < rouletteItems.length) {
                            const actualReward = rouletteItems[winnerIndex];
                            selectedReward = {
                                type: actualReward.type,
                                name: actualReward.name,
                                icon: actualReward.icon,
                                rarity: actualReward.rarity,
                                income: actualReward.income,
                                level: actualReward.level || 1,
                                style: actualReward.style,
                                amount: actualReward.amount
                            };
                        }
                    }
                    
                    showRouletteResult(selectedReward);
                    
                    isRouletteSpinning = false;
                    const openButton = document.getElementById('openButton');
                    openButton.disabled = false;
                    openButton.textContent = 'Закрыть';
                    openButton.onclick = closeCaseModal;
                    
                    const currentIndex = cases.findIndex(c => c.id === currentCase.id);
                    if (currentIndex < cases.length - 1) {
                        cases[currentIndex + 1].locked = false;
                        renderCases();
                    }
                }, 4000);
            }, 50);
        }

        // Показать результат рулетки
        function showRouletteResult(reward) {
            const resultIcon = document.getElementById('resultIcon');
            const resultTitle = document.getElementById('resultTitle');
            const resultDescription = document.getElementById('resultDescription');
            
            if (!reward) {
                console.error('Нет награды для отображения!');
                return;
            }
            
            if (reward.type === 'coin') {
                resultIcon.textContent = '💰';
                resultTitle.textContent = `+${formatNumber(reward.amount)} монет!`;
                resultDescription.textContent = 'Поздравляем с выигрышем!';
                
                gameData.balance += reward.amount;
                gameData.totalEarned += reward.amount;
                playSound('coinSound', 0.5);
                showNotification(`Получено ${formatNumber(reward.amount)} монет!`, 'success');
            } else {
                resultIcon.textContent = reward.icon;
                
                const rarityTexts = {
                    'common': { prefix: '', color: '#94A3B8' },
                    'rare': { prefix: '🎯 РЕДКИЙ! ', color: '#8B5CF6' },
                    'epic': { prefix: '⭐ ЭПИЧЕСКИЙ! ', color: '#EC4899' },
                    'legendary': { prefix: '✨ ЛЕГЕНДАРНЫЙ! ', color: '#F59E0B' },
                    'mythic': { prefix: '🔥 МИФИЧЕСКИЙ! ', color: '#EF4444' },
                    'cosmic': { prefix: '🌀 КОСМИЧЕСКИЙ! ', color: '#06B6D4' },
                    'divine': { prefix: '🙏 БОЖЕСТВЕННЫЙ! ', color: '#FF6B9D' },
                    'exotic': { prefix: '🦄 ЭКЗОТИЧЕСКИЙ! ', color: '#00D4AA' },
                    'ultimate': { prefix: '👑 ВЕРХОВНЫЙ! ', color: '#9D4EDD' },
                    'beta-tester': { prefix: '🧪 BETA-TESTER! ', color: '#FF6B35' },
                    'exclusive': { prefix: '💎 ЭКСКЛЮЗИВ! ', color: '#FF00FF' }
                };
                
                const rarityInfo = rarityTexts[reward.rarity] || rarityTexts.common;
                
                resultTitle.textContent = `${rarityInfo.prefix}${reward.name}`;
                resultTitle.style.color = rarityInfo.color;
                
                let finalIncome = reward.income;
                const incomeMultiplier = Math.min(getBuildingBonus('incomeMultiplier'), MAX_CITY_MULTIPLIER);
                finalIncome = Math.floor(finalIncome * incomeMultiplier);
                
                if (['rare', 'epic', 'legendary', 'mythic', 'cosmic', 'divine', 'exotic', 'ultimate', 'beta-tester', 'exclusive'].includes(reward.rarity)) {
                    const rareIncomeMultiplier = Math.min(getBuildingBonus('rareIncomeMultiplier'), MAX_CITY_MULTIPLIER);
                    finalIncome = Math.floor(finalIncome * rareIncomeMultiplier);
                }
                
                resultDescription.textContent = `Невероятная удача! Доход: ${formatNumber(finalIncome)}/сек`;
                
                const workerId = Date.now();
                const newWorker = {
                    id: workerId,
                    name: reward.name,
                    icon: reward.icon,
                    level: reward.level || 1,
                    income: finalIncome,
                    experience: 0,
                    maxExperience: reward.rarity === 'beta-tester' || reward.rarity === 'exclusive' ? 100 * (reward.level || 1) : 100,
                    rarity: reward.rarity || 'common',
                    style: reward.style || 'normal',
                    isRare: ['rare', 'epic', 'legendary', 'mythic', 'cosmic', 'divine', 'exotic', 'ultimate', 'beta-tester', 'exclusive'].includes(reward.rarity || ''),
                    isSpecial: ['cosmic', 'beta-tester', 'exclusive'].includes(reward.rarity || '')
                };
                gameData.workers.push(newWorker);
                
                const rarityNames = {
                    'common': 'Обычный',
                    'rare': 'Редкий',
                    'epic': 'Эпический',
                    'legendary': 'Легендарный',
                    'mythic': 'Мифический',
                    'cosmic': 'Космический',
                    'divine': 'Божественный',
                    'exotic': 'Экзотический',
                    'ultimate': 'Верховный',
                    'beta-tester': 'BETA-TESTER',
                    'exclusive': 'ЭКСКЛЮЗИВНЫЙ'
                };
                
                const rarityName = rarityNames[reward.rarity] || 'Обычный';
                showNotification(`${rarityInfo.prefix}${rarityName} рабочий: ${reward.name}!`, 'success');
                
                if (['cosmic', 'beta-tester', 'exclusive'].includes(reward.rarity)) {
                    setTimeout(() => {
                        showNotification('✨ НЕВЕРОЯТНАЯ УДАЧА! Вы получили эксклюзивного рабочего!', 'success');
                    }, 1000);
                }
                
                playSound('workerGetSound');
                renderWorkers();
                renderUpgrades();
                renderRocketWorkers();
                updatePassiveIncome();
                updateStats();
                
                // Проверяем разблокировку PvP
                checkPvpUnlock();
            }
            
            updateBalance();
            saveGame();
            updateLeaderboard();
            checkAchievements();
        }

        // Закрыть модальное окно кейса
        function closeCaseModal() {
            console.log('closeCaseModal called');
            playSound('clickSound');
            const modal = document.getElementById('caseModal');
            if (modal) {
                modal.style.display = 'none';
                console.log('Modal closed');
            } else {
                console.error('Modal not found in closeCaseModal');
            }
            currentCase = null;
        }

        // Генерация элементов рулетки
        function generateRouletteItems(caseItem) {
            const container = document.getElementById('rouletteTrack');
            container.innerHTML = '';
            rouletteItems = [];
            
            container.style.transition = 'none';
            container.style.transform = 'translateX(0)';
            
            const winnerItems = container.querySelectorAll('.winner');
            winnerItems.forEach(item => item.classList.remove('winner'));
            
            // Создаем элементы рулетки из наград кейса
            const allRewards = [];
            
            caseItem.rewards.forEach(reward => {
                if (reward.type === 'coin') {
                    allRewards.push({
                        type: 'coins',
                        amount: reward.amount,
                        icon: '💎',
                        name: `${formatNumber(reward.amount)} монет`
                    });
                } else if (reward.type === 'worker' || reward.type === 'rare' || reward.type === 'special' || 
                          reward.type === 'legendary' || reward.type === 'epic' || reward.type === 'mythic' ||
                          reward.type === 'cosmic' || reward.type === 'divine' || reward.type === 'exotic' ||
                          reward.type === 'ultimate' || reward.type === 'beta-tester') {
                    if (reward.names) {
                        reward.names.forEach(name => {
                            const workerInfo = workerNames.find(w => w.name === name);
                            if (workerInfo) {
                                allRewards.push({
                                    type: 'worker',
                                    name: workerInfo.name,
                                    icon: workerInfo.icon,
                                    income: workerInfo.income,
                                    level: workerInfo.level || 1,
                                    rarity: workerInfo.rarity || 'common',
                                    style: workerInfo.style || 'normal'
                                });
                            }
                        });
                    }
                }
            });
            
            // Добавляем несколько копий каждой награды для лучшей рулетки
            const finalRewards = [];
            allRewards.forEach(reward => {
                // Добавляем 3-5 копий каждой награды
                const copies = Math.floor(Math.random() * 3) + 3;
                for (let i = 0; i < copies; i++) {
                    finalRewards.push({...reward});
                }
            });
            
            // Перемешиваем
            finalRewards.sort(() => Math.random() - 0.5);
            
            rouletteItems = finalRewards;
            
            // Отображаем элементы
            rouletteItems.forEach((reward, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'roulette-item';
                itemElement.innerHTML = `
                    <div class="roulette-item-icon">${reward.icon}</div>
                    <div class="roulette-item-name">${reward.name}</div>
                `;
                container.appendChild(itemElement);
            });
        }

        // Начать вращение рулетки
        function startRoulette() {
            if (isRouletteSpinning || !currentCase) return;
            
            let finalPrice = currentCase.price;
            
            if (gameData.balance < finalPrice) {
                showNotification('Недостаточно монет!', 'error');
                playSound('errorSound');
                closeCaseModal();
                return;
            }

            gameData.balance -= finalPrice;
            gameData.openedCases++;
            updateBalance();
            
            isRouletteSpinning = true;
            selectedReward = null;
            
            const openButton = document.getElementById('openButton');
            openButton.disabled = true;
            openButton.textContent = 'Крутится...';
            
            playSound('caseOpenSound');
            
            const container = document.getElementById('rouletteTrack');
            const items = container.querySelectorAll('.roulette-item');
            
            const winnerIndex = Math.floor(Math.random() * rouletteItems.length);
            const winnerReward = rouletteItems[winnerIndex];
            
            const itemWidth = 200;
            const containerWidth = container.offsetWidth;
            const centerPosition = containerWidth / 2;
            const targetPosition = centerPosition - (winnerIndex * itemWidth) - (itemWidth / 2);
            
            container.style.transition = 'transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)';
            container.style.transform = `translateX(${targetPosition}px)`;
            
            setTimeout(() => {
                items.forEach((item, index) => {
                    item.classList.remove('winner');
                    if (index === winnerIndex) {
                        item.classList.add('winner');
                    }
                });
                
                selectedReward = winnerReward;
                
                if (winnerReward.type === 'coins') {
                    gameData.balance += winnerReward.amount;
                    gameData.totalEarned += winnerReward.amount;
                    updateBalance();
                    showNotification(`Получено ${formatNumber(winnerReward.amount)} монет!`, 'success');
                } else if (winnerReward.type === 'worker') {
                    const newWorker = {
                        id: Date.now(),
                        name: winnerReward.name,
                        icon: winnerReward.icon,
                        income: winnerReward.income,
                        level: winnerReward.level || 1,
                        experience: 0,
                        maxExperience: 100,
                        rarity: winnerReward.rarity || 'common',
                        style: winnerReward.style || 'normal'
                    };
                    gameData.workers.push(newWorker);
                    renderWorkers();
                    renderUpgrades();
                    updatePassiveIncome();
                    showNotification(`Получен рабочий: ${winnerReward.name}!`, 'success');
                }
                
                playSound('workerGetSound');
                
                openButton.disabled = false;
                openButton.textContent = 'Закрыть';
                openButton.onclick = closeCaseModal;
                
                isRouletteSpinning = false;
                saveGame();
            }, 4000);
        }

        // Рендер рабочих
        function renderWorkers() {
            const container = document.getElementById('workersContainer');
            
            if (gameData.workers.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">👷</div>
                        <div class="empty-title">Рабочих пока нет</div>
                        <div class="empty-description">Откройте кейсы чтобы получить первых рабочих!</div>
                        <button class="action-button" onclick="switchTab('cases')">
                            <span>🎁</span>
                            <span>Открыть кейсы</span>
                        </button>
                    </div>
                `;
                return;
            }
            
            container.innerHTML = '';
            
            const sortedWorkers = [...gameData.workers].sort((a, b) => {
                const rarityOrder = { 
                    'exclusive': 11,
                    'beta-tester': 10,
                    'ultimate': 9, 
                    'divine': 8, 
                    'exotic': 7, 
                    'mythic': 6, 
                    'cosmic': 5, 
                    'legendary': 4, 
                    'epic': 3, 
                    'rare': 2, 
                    'common': 1 
                };
                const aRarity = rarityOrder[a.rarity] || 0;
                const bRarity = rarityOrder[b.rarity] || 0;
                
                if (bRarity !== aRarity) return bRarity - aRarity;
                return b.income - a.income;
            });
            
            sortedWorkers.forEach(worker => {
                const experiencePercent = worker.maxExperience > 0 ? Math.min((worker.experience / worker.maxExperience) * 100, 100) : 100;
                const experienceText = worker.isRare || worker.isSpecial ? 'MAX' : `${Math.floor(worker.experience)}/${worker.maxExperience}`;
                
                const workerElement = document.createElement('div');
                workerElement.className = `worker-card ${worker.style || ''}`;
                workerElement.onclick = () => {
                    playSound('clickSound');
                    selectWorkerForUpgrade(worker);
                };
                workerElement.innerHTML = `
                    <div class="worker-header">
                        <div class="worker-avatar">${worker.icon}</div>
                        <div class="worker-info">
                            <div class="worker-name">${worker.name}</div>
                            <div class="worker-meta">
                                <span class="worker-level">Ур. ${worker.level}</span>
                                <span class="worker-rarity ${worker.rarity}">${worker.rarity}</span>
                            </div>
                        </div>
                    </div>
                    <div class="worker-stats">
                        <div class="stat-item">
                            <div class="stat-label">Доход/сек</div>
                            <div class="stat-value">${formatNumber(worker.income)}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Опыт</div>
                            <div class="stat-value">${experienceText}</div>
                        </div>
                        <div class="progress-container">
                            <div class="progress-header">
                                <span>Прогресс улучшения</span>
                                <span>${Math.floor(experiencePercent)}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${experiencePercent}%"></div>
                            </div>
                        </div>
                    </div>
                    <div class="worker-actions">
                        <button class="upgrade-button ${experiencePercent < 100 ? 'disabled' : ''}" 
                                onclick="event.stopPropagation(); selectWorkerForUpgrade(gameData.workers.find(w => w.id === ${worker.id}))"
                                ${experiencePercent < 100 ? 'disabled' : ''}>
                            <span class="upgrade-icon">⬆️</span>
                            <span class="upgrade-text">${experiencePercent < 100 ? 'Нужно опыта' : 'Улучшить'}</span>
                        </button>
                    </div>
                `;
                
                container.appendChild(workerElement);
            });
        }

        // Рендер улучшений
        function renderUpgrades() {
            const listContainer = document.getElementById('workersUpgradeList');
            const detailsContainer = document.getElementById('upgradeDetails');
            
            // Быстрая проверка без лишних операций
            if (!gameData.workers || gameData.workers.length === 0) {
                listContainer.innerHTML = '';
                detailsContainer.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">⚡</div>
                        <div class="empty-title">Нет рабочих для улучшения</div>
                        <div class="empty-description">Сначала получите рабочих из кейсов!</div>
                        <button class="action-button" onclick="switchTab('cases')">
                            <span>🎁</span>
                            <span>Открыть кейсы</span>
                        </button>
                    </div>
                `;
                return;
            }
            
            // Очищаем контейнер один раз
            listContainer.innerHTML = '';
            
            // Оптимизированная сортировка
            const sortedWorkers = gameData.workers.slice().sort((a, b) => {
                const rarityOrder = { 
                    'exclusive': 11, 'beta-tester': 10, 'ultimate': 9, 'divine': 8, 
                    'exotic': 7, 'mythic': 6, 'cosmic': 5, 'legendary': 4, 
                    'epic': 3, 'rare': 2, 'common': 1 
                };
                const aRarity = rarityOrder[a.rarity] || 0;
                const bRarity = rarityOrder[b.rarity] || 0;
                
                if (bRarity !== aRarity) return bRarity - aRarity;
                return b.income - a.income;
            });
            
            // Оптимизированный рендеринг с DocumentFragment
            const fragment = document.createDocumentFragment();
            
            sortedWorkers.forEach(worker => {
                const experiencePercent = worker.maxExperience > 0 ? 
                    Math.min((worker.experience / worker.maxExperience) * 100, 100) : 100;
                const upgradeCost = calculateUpgradeCost(worker);
                
                const workerItem = document.createElement('div');
                workerItem.className = 'worker-list-item';
                workerItem.onclick = () => {
                    playSound('clickSound');
                    selectWorkerForUpgrade(worker);
                };
                
                workerItem.innerHTML = `
                    <div class="worker-item-avatar">${worker.icon}</div>
                    <div class="worker-item-info">
                        <div class="worker-item-name">${worker.name}</div>
                        <div class="worker-item-stats">
                            <span>Ур. ${worker.level}</span>
                            <span>•</span>
                            <span>${formatNumber(worker.income)}/сек</span>
                        </div>
                    </div>
                    <div class="worker-item-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${experiencePercent}%"></div>
                        </div>
                        <div class="upgrade-cost">
                            <span>💰 ${formatNumber(upgradeCost)}</span>
                        </div>
                    </div>
                `;
                
                fragment.appendChild(workerItem);
            });
            
            listContainer.appendChild(fragment);
            
            // Автовыбор первого рабочего
            if (sortedWorkers.length > 0 && !selectedWorker) {
                selectWorkerForUpgrade(sortedWorkers[0]);
            } else if (selectedWorker) {
                updateUpgradeDetails(selectedWorker);
            }
        }

        // Выбрать рабочего для улучшения
        function selectWorkerForUpgrade(worker, event) {
            if (!worker) return;
            
            selectedWorker = worker;
            
            // Переключаемся на вкладку улучшений
            switchTab('upgrades');
            
            // Обновляем детали улучшения
            updateUpgradeDetails(worker);
        }

        // Обновить детали улучшения
        function updateUpgradeDetails(worker) {
            const detailsIcon = document.getElementById('detailsIcon');
            const detailsName = document.getElementById('detailsName');
            const detailsDescription = document.getElementById('detailsDescription');
            const upgradeStats = document.getElementById('upgradeStats');
            const upgradeButton = document.getElementById('upgradeButton');
            
            const experiencePercent = worker.maxExperience > 0 ? Math.min((worker.experience / worker.maxExperience) * 100, 100) : 100;
            const upgradeCost = calculateUpgradeCost(worker);
            
            const upgradeExperienceMultiplier = Math.min(getBuildingBonus('experienceMultiplier'), MAX_CITY_MULTIPLIER);
            const adjustedMaxExperience = worker.maxExperience > 0 ? Math.floor(worker.maxExperience / upgradeExperienceMultiplier) : 0;
            
            detailsIcon.textContent = worker.icon;
            detailsName.textContent = worker.name;
            detailsDescription.textContent = `Уровень ${worker.level} • ${worker.rarity}`;
            
            // Особые рабочие не улучшаются через эту систему
            if (worker.isRare || worker.isSpecial) {
                const newIncome = Math.floor(worker.income * 1.5);
                
                upgradeStats.innerHTML = `
                    <div class="upgrade-stat">
                        <div class="upgrade-stat-label">Текущий доход</div>
                        <div class="upgrade-stat-value">${formatNumber(worker.income)}/сек</div>
                    </div>
                    <div class="upgrade-stat">
                        <div class="upgrade-stat-label">Редкость</div>
                        <div class="upgrade-stat-value" style="color: ${worker.rarity === 'cosmic' ? '#06B6D4' : worker.rarity === 'beta-tester' ? '#FF6B35' : worker.rarity === 'exclusive' ? '#FF00FF' : '#8B5CF6'};">${worker.rarity}</div>
                    </div>
                `;
                
                upgradeButton.disabled = true;
                upgradeButton.textContent = 'Особых нельзя улучшать';
            } else {
                const newIncome = Math.floor(worker.income * 1.8);
                
                upgradeStats.innerHTML = `
                    <div class="upgrade-stat">
                        <div class="upgrade-stat-label">Текущий доход</div>
                        <div class="upgrade-stat-value">${formatNumber(worker.income)}/сек</div>
                    </div>
                    <div class="upgrade-stat">
                        <div class="upgrade-stat-label">Новый доход</div>
                        <div class="upgrade-stat-value">${formatNumber(newIncome)}/сек</div>
                    </div>
                    <div class="upgrade-stat" style="grid-column: span 2;">
                        <div class="upgrade-stat-label">Опыт для улучшения</div>
                        <div class="upgrade-stat-value">${Math.floor(worker.experience)}/${adjustedMaxExperience}</div>
                        <div style="margin-top: 12px; width: 100%; height: 8px; background: rgba(99, 102, 241, 0.1); border-radius: 4px; overflow: hidden;">
                            <div style="width: ${Math.min(experiencePercent * upgradeExperienceMultiplier, 100)}%; height: 100%; background: linear-gradient(90deg, #10B981, #059669); border-radius: 4px;"></div>
                        </div>
                    </div>
                `;
                
                const canUpgrade = worker.experience >= adjustedMaxExperience && gameData.balance >= upgradeCost;
                upgradeButton.disabled = !canUpgrade;
                
                if (worker.experience < adjustedMaxExperience) {
                    upgradeButton.textContent = `Недостаточно опыта (${Math.floor(experiencePercent * upgradeExperienceMultiplier)}%)`;
                } else if (gameData.balance < upgradeCost) {
                    upgradeButton.textContent = `Недостаточно монет (${formatNumber(upgradeCost)})`;
                } else {
                    upgradeButton.textContent = `Улучшить за ${formatNumber(upgradeCost)} монет`;
                }
                upgradeButton.onclick = upgradeSelectedWorker;
            }
        }

        // Расчет стоимости улучшения
        function calculateUpgradeCost(worker) {
            const baseCost = worker.level * worker.income * 100;
            const rarityMultiplier = {
                'common': 1,
                'rare': 1.5,
                'epic': 2,
                'legendary': 3,
                'mythic': 4,
                'cosmic': 2.5,
                'divine': 6,
                'exotic': 7,
                'ultimate': 8,
                'beta-tester': 3,
                'exclusive': 10
            };
            const multiplier = rarityMultiplier[worker.rarity] || 1;
            return Math.floor(baseCost * multiplier);
        }

        // Улучшение рабочего
        function upgradeSelectedWorker() {
            if (!selectedWorker) return;
            
            const upgradeCost = calculateUpgradeCost(selectedWorker);
            
            // Обычные рабочие нуждаются в опыте
            const upgradeExperienceMultiplier = Math.min(getBuildingBonus('experienceMultiplier'), MAX_CITY_MULTIPLIER);
            const adjustedMaxExperience = selectedWorker.maxExperience > 0 ? 
                                         Math.floor(selectedWorker.maxExperience / upgradeExperienceMultiplier) : 0;
            const canUpgradeNormal = !selectedWorker.isRare && 
                                    gameData.balance >= upgradeCost && 
                                    selectedWorker.experience >= adjustedMaxExperience;
            
            if (!canUpgradeNormal) {
                if (gameData.balance < upgradeCost) {
                    showNotification('Недостаточно монет!', 'error');
                    playSound('errorSound');
                } else if (!selectedWorker.isRare && selectedWorker.experience < adjustedMaxExperience) {
                    showNotification('Недостаточно опыта!', 'error');
                    playSound('errorSound');
                }
                return;
            }
            
            gameData.balance -= upgradeCost;
            playSound('coinSound');
            
            // Обычные рабочие
            const upgradeSuccessMultiplier = Math.min(getBuildingBonus('upgradeSuccessMultiplier'), MAX_CITY_MULTIPLIER);
            const baseRareChance = 0.15;
            const adjustedRareChance = baseRareChance * upgradeSuccessMultiplier;
            
            if (Math.random() < adjustedRareChance) {
                const rareRarities = ['rare', 'epic', 'legendary', 'mythic'];
                const currentRarityIndex = rareRarities.indexOf(selectedWorker.rarity);
                const newRarityIndex = Math.min(currentRarityIndex + 1, rareRarities.length - 1);
                const newRarity = rareRarities[newRarityIndex];
                const rarityNames = { 
                    'rare': 'Редкий', 
                    'epic': 'Эпический', 
                    'legendary': 'Легендарный',
                    'mythic': 'Мифический'
                };
                
                selectedWorker.name = `${rarityNames[newRarity]} ${selectedWorker.name}`;
                selectedWorker.income *= 3;
                selectedWorker.rarity = newRarity;
                selectedWorker.isRare = true;
                selectedWorker.maxExperience = 0;
                selectedWorker.experience = 0;
                
                showNotification(`✨ ${selectedWorker.name} стал ${newRarity.toUpperCase()}!`, 'success');
                playSound('workerGetSound', 1.1);
            } else {
                selectedWorker.level++;
                selectedWorker.income = Math.floor(selectedWorker.income * 1.8);
                selectedWorker.experience = 0;
                selectedWorker.maxExperience = Math.floor(selectedWorker.maxExperience * 1.5);
                showNotification(`⚡ ${selectedWorker.name} улучшен до уровня ${selectedWorker.level}!`, 'success');
                playSound('upgradeSound');
            }
            
            updateBalance();
            renderWorkers();
            renderRocketWorkers();
            updatePassiveIncome();
            renderUpgrades();
            updateStats();
            saveGame();
            checkAchievements();
        }

        // Обновить таблицу лидеров
        function updateLeaderboard() {
            const tbody = document.getElementById('leaderboardBody');
            tbody.innerHTML = '';
            
            addPlayerToLeaderboard();
            const sortedLeaderboard = [...leaderboard].sort((a, b) => b.balance - a.balance);
            
            sortedLeaderboard.forEach((player, index) => {
                const row = document.createElement('tr');
                const rankClass = `rank-${index + 1}`;
                
                row.innerHTML = `
                    <td class="rank-cell ${rankClass}">${index + 1}</td>
                    <td>
                        <div class="player-cell">
                            <div class="player-avatar">${player.name.charAt(0)}</div>
                            <div>${player.name}</div>
                        </div>
                    </td>
                    <td>${formatNumber(player.balance)}</td>
                    <td>${player.workers}</td>
                    <td>${formatNumber(player.income)}/сек</td>
                `;
                tbody.appendChild(row);
            });
        }

        // Добавить игрока в таблицу лидеров
        function addPlayerToLeaderboard() {
            const playerIndex = leaderboard.findIndex(p => p.name === gameData.playerName);
            
            if (playerIndex === -1) {
                leaderboard.push({
                    name: gameData.playerName,
                    balance: gameData.balance,
                    workers: gameData.workers.length,
                    income: Math.floor(gameData.totalIncomePerSecond * gameData.city.totalBonus)
                });
            } else {
                leaderboard[playerIndex] = {
                    name: gameData.playerName,
                    balance: gameData.balance,
                    workers: gameData.workers.length,
                    income: Math.floor(gameData.totalIncomePerSecond * gameData.city.totalBonus)
                };
            }
        }

        // Обновить статистику
        function updateStats() {
            const container = document.getElementById('statsGrid');
            
            const rareWorkers = gameData.workers.filter(w => w.isRare);
            const ultraRareWorkers = gameData.workers.filter(w => ['mythic', 'cosmic', 'divine', 'exotic', 'ultimate', 'beta-tester', 'exclusive'].includes(w.rarity));
            const specialWorkers = gameData.workers.filter(w => ['cosmic', 'beta-tester', 'exclusive'].includes(w.rarity));
            
            const stats = [
                { icon: '👤', title: 'Никнейм', value: gameData.playerName },
                { icon: gameSettings.icon, title: 'Баланс', value: formatNumber(gameData.balance) },
                { icon: '📈', title: 'Общий заработок', value: formatNumber(gameData.totalEarned) },
                { icon: '👷', title: 'Рабочих', value: gameData.workers.length },
                { icon: '⚡', title: 'Доход/сек', value: formatNumber(Math.min(gameData.totalIncomePerSecond * gameData.city.totalBonus, MAX_INCOME_PER_SECOND)) },
                { icon: '🎁', title: 'Открыто кейсов', value: gameData.openedCases },
                { icon: '🏆', title: 'Место в топе', value: getPlayerRank() },
                { icon: '⭐', title: 'Редких рабочих', value: rareWorkers.length },
                { icon: '✨', title: 'Ультра-редких', value: ultraRareWorkers.length },
                { icon: '💎', title: 'Эксклюзивных', value: specialWorkers.length },
                { icon: '📊', title: 'Макс. уровень кейса', value: getMaxCaseLevel() },
                { icon: '🏙️', title: 'Построено зданий', value: gameData.city.buildings.length },
                { icon: '📈', title: 'Бонус города', value: `+${Math.round((gameData.city.totalBonus - 1) * 100)}%` },
                { icon: '👑', title: 'Макс. уровень рабочего', value: getMaxWorkerLevel() },
                { icon: '🚀', title: 'Макс. высота ракетки', value: formatNumber(gameData.rocket.maxHeight) + 'м' },
                { icon: '⭐', title: 'XP в ракетке', value: formatNumber(gameData.rocket.xp) },
                { icon: '💀', title: 'Аварий ракетки', value: gameData.rocket.crashes || 0 },
                { icon: '🏅', title: 'Достижений', value: gameData.achievements.length + '/' + achievements.length }
            ];
            
            container.innerHTML = '';
            stats.forEach(stat => {
                const card = document.createElement('div');
                card.className = 'stat-card';
                card.innerHTML = `
                    <div class="stat-icon">${stat.icon}</div>
                    <div class="stat-title">${stat.title}</div>
                    <div class="stat-value">${stat.value}</div>
                `;
                container.appendChild(card);
            });
        }

        // Получить максимальный уровень рабочего
        function getMaxWorkerLevel() {
            if (gameData.workers.length === 0) return 0;
            return Math.max(...gameData.workers.map(w => w.level));
        }

        // Получить место игрока в топе
        function getPlayerRank() {
            const sorted = [...leaderboard].sort((a, b) => b.balance - a.balance);
            const playerIndex = sorted.findIndex(p => p.name === gameData.playerName);
            return playerIndex !== -1 ? `#${playerIndex + 1}` : 'Не в топе';
        }

        // Получить максимальный уровень открытого кейса
        function getMaxCaseLevel() {
            const unlockedCases = cases.filter(c => !c.locked);
            if (unlockedCases.length === 0) return 0;
            return Math.max(...unlockedCases.map(c => c.level));
        }

        // Уведомления
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = 'notification';
            
            let icon = 'ℹ️';
            let borderColor = '#6366F1';
            
            if (type === 'success') {
                icon = '✅';
                borderColor = '#10B981';
            } else if (type === 'error') {
                icon = '❌';
                borderColor = '#EF4444';
            } else if (type === 'warning') {
                icon = '⚠️';
                borderColor = '#F59E0B';
            }
            
            notification.innerHTML = `
                <span>${icon}</span>
                <span>${message}</span>
            `;
            notification.style.borderLeftColor = borderColor;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) reverse forwards';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 400);
            }, 3000);
        }

        // Форматирование чисел
        function formatNumber(num) {
            if (num >= 1000000000) {
                return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
            }
            if (num >= 1000000) {
                return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
            }
            if (num >= 10000) {
                return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
            }
            return Math.floor(num).toLocaleString('ru-RU');
        }

        // Сохранение игры
        function saveGame() {
            const saveData = {
                gameData: gameData,
                prestigeData: prestigeData,
                unlockedCases: cases.filter(c => !c.locked).map(c => c.id),
                achievements: achievements.filter(a => a.unlocked).map(a => a.id),
                lastSave: Date.now(),
                version: "2.0"
            };
            
            try {
                localStorage.setItem('cornerEarningSave', JSON.stringify(saveData));
            } catch (e) {
                console.error('Ошибка сохранения:', e);
                showNotification('Ошибка сохранения! Место в localStorage закончилось.', 'error');
            }
        }

        // Загрузка игры
        function loadGame() {
            try {
                const saved = localStorage.getItem('cornerEarningSave');
                if (saved) {
                    const loadedData = JSON.parse(saved);
                    
                    // Проверяем версию сохранения
                    if (loadedData.version !== "2.0") {
                        migrateOldSave(loadedData);
                    } else {
                        if (loadedData.gameData) {
                            // Восстанавливаем все данные
                            Object.assign(gameData, loadedData.gameData);
                            
                            // Восстанавливаем престиж данные
                            if (loadedData.prestigeData) {
                                Object.assign(prestigeData, loadedData.prestigeData);
                            }
                            
                            // Убедимся, что все поля существуют
                            if (!gameData.city) gameData.city = { buildings: [], totalBonus: 1.0, totalBonusPercent: 0 };
                            if (!gameData.rocket) gameData.rocket = createDefaultRocket();
                            if (!gameData.achievements) gameData.achievements = [];
                            if (!gameData.rocket.crashes) gameData.rocket.crashes = 0;
                            if (!gameData.rocket.exclusiveWorkers) gameData.rocket.exclusiveWorkers = [];
                            if (!gameData.pvp) gameData.pvp = {
                                unlocked: false,
                                stamina: 30,
                                maxStamina: 30,
                                lastStaminaReset: Date.now(),
                                selectedWorker: null,
                                battles: 0,
                                wins: 0,
                                losses: 0
                            };
                            
                            // Инициализация Шардов и магазина
                            if (!gameData.shards) gameData.shards = 0;
                            if (!gameData.shop) gameData.shop = { purchasedItems: [] };
                            
                            // Восстанавливаем рабочих если они пропали
                            if (!gameData.workers || !Array.isArray(gameData.workers)) {
                                console.log('Workers array corrupted, creating default workers');
                                gameData.workers = [];
                                // Добавляем базовых рабочих
                                const defaultWorkers = [
                                    { name: 'Барсик', icon: '🐱', income: 10, level: 1, experience: 0, maxExperience: 100, rarity: 'common', style: 'normal', id: Date.now() + 1 },
                                    { name: 'Бензин', icon: '⛽', income: 15, level: 1, experience: 0, maxExperience: 100, rarity: 'common', style: 'normal', id: Date.now() + 2 }
                                ];
                                gameData.workers.push(...defaultWorkers);
                                showNotification('🔧 Рабочие восстановлены после ошибки!', 'warning');
                            }
                            
                            console.log(`Загружено рабочих: ${gameData.workers.length}`);
                            console.log('Рабочие:', gameData.workers);
                            
                            document.getElementById('playerNameDisplay').textContent = gameData.playerName;
                            updateBalance();
                            updatePassiveIncome();
                            updateCityBonusDisplay();
                            
                            console.log('Игра загружена (версия 2.0)');
                        }
                        
                        // Разблокируем кейсы
                        if (loadedData.unlockedCases) {
                            loadedData.unlockedCases.forEach(caseId => {
                                const caseItem = cases.find(c => c.id === caseId);
                                if (caseItem) {
                                    caseItem.locked = false;
                                }
                            });
                            renderCases();
                        }
                        
                        // Восстанавливаем достижения
                        if (loadedData.achievements) {
                            loadedData.achievements.forEach(achievementId => {
                                const achievement = achievements.find(a => a.id === achievementId);
                                if (achievement) {
                                    achievement.unlocked = true;
                                }
                            });
                        }
                        
                        // Восстанавливаем последнее время обновления
                        if (loadedData.lastSave) {
                            const timeDiff = Date.now() - loadedData.lastSave;
                            const secondsPassed = Math.floor(timeDiff / 1000);
                            
                            if (secondsPassed > 0) {
                                // Начисляем оффлайн доход
                                const offlineIncome = Math.floor(gameData.totalIncomePerSecond * secondsPassed * gameData.city.totalBonus);
                                if (offlineIncome > 0) {
                                    gameData.balance += offlineIncome;
                                    gameData.totalEarned += offlineIncome;
                                    
                                    showNotification(`Оффлайн доход: +${formatNumber(offlineIncome)} монет за ${Math.floor(secondsPassed / 60)} минут!`, 'success');
                                    updateBalance();
                                }
                            }
                        }
                    }
                }
            } catch (e) {
                console.error('Ошибка загрузки:', e);
                showNotification('Ошибка загрузки сохранения!', 'error');
            }
            
            // Проверяем разблокировку PvP после загрузки
            checkPvpUnlock();
        }

        // Экспорт сохранения
        function exportSave() {
            const saveData = {
                gameData: gameData,
                unlockedCases: cases.filter(c => !c.locked).map(c => c.id),
                achievements: achievements.filter(a => a.unlocked).map(a => a.id),
                version: '2.0'
            };
            
            const dataStr = JSON.stringify(saveData);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            
            const exportFileDefaultName = `corner_earning_save_${Date.now()}.json`;
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
            
            showNotification('Сохранение экспортировано!', 'success');
        }

        // Импорт сохранения
        function importSave() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            
            input.onchange = e => {
                const file = e.target.files[0];
                if (!file) return;
                
                const reader = new FileReader();
                reader.onload = function(event) {
                    try {
                        const importedData = JSON.parse(event.target.result);
                        
                        if (confirm('Заменить текущее сохранение импортированным?')) {
                            localStorage.setItem('cornerEarningSave', JSON.stringify(importedData));
                            location.reload();
                        }
                    } catch (error) {
                        showNotification('Ошибка при импорте файла!', 'error');
                        console.error('Ошибка импорта:', error);
                    }
                };
                reader.readAsText(file);
            };
            
            input.click();
        }

        // Сброс игры
        function resetGame() {
            if (confirm('Вы уверены, что хотите сбросить весь прогресс? Это действие нельзя отменить!')) {
                localStorage.removeItem('cornerEarningSave');
                location.reload();
            }
        }

        // Инициализация игры при загрузке страницы
        window.addEventListener('load', function() {
            // Проверяем сохранение
            loadGame();
            
            // Если есть сохранение, показываем стартовый экран с именем
            if (gameData.playerName) {
                document.getElementById('playerNameInput').value = gameData.playerName;
            }
            
            // Добавляем функции для дебага
            window.debug = {
                addMoney: (amount) => {
                    gameData.balance += amount || 1000000;
                    updateBalance();
                    showNotification(`Добавлено ${formatNumber(amount || 1000000)} монет!`, 'success');
                    saveGame();
                },
                unlockAll: () => {
                    cases.forEach(c => c.locked = false);
                    renderCases();
                    showNotification('Все кейсы разблокированы!', 'success');
                    saveGame();
                },
                addWorker: (rarity) => {
                    let workersByRarity;
                    if (rarity === 'exclusive') {
                        workersByRarity = exclusiveRocketWorkers;
                    } else {
                        workersByRarity = workerNames.filter(w => w.rarity === rarity);
                    }
                    
                    if (workersByRarity.length > 0) {
                        const workerInfo = workersByRarity[Math.floor(Math.random() * workersByRarity.length)];
                        const workerId = Date.now();
                        const newWorker = {
                            id: workerId,
                            name: workerInfo.name,
                            icon: workerInfo.icon,
                            level: workerInfo.level || 1,
                            income: workerInfo.income,
                            experience: 0,
                            maxExperience: 100,
                            rarity: workerInfo.rarity,
                            style: workerInfo.style || 'normal',
                            isRare: ['rare', 'epic', 'legendary', 'mythic', 'cosmic', 'divine', 'exotic', 'ultimate', 'beta-tester', 'exclusive'].includes(workerInfo.rarity || ''),
                            isSpecial: ['cosmic', 'beta-tester', 'exclusive'].includes(workerInfo.rarity || '')
                        };
                        gameData.workers.push(newWorker);
                        renderWorkers();
                        renderUpgrades();
                        renderRocketWorkers();
                        updatePassiveIncome();
                        showNotification(`Добавлен рабочий: ${workerInfo.name} (${rarity})!`, 'success');
                        saveGame();
                    }
                },
                addXp: (amount) => {
                    gameData.rocket.xp += amount || 10000;
                    updateRocketInterface();
                    showNotification(`Добавлено ${formatNumber(amount || 10000)} XP!`, 'success');
                    saveGame();
                },
                unlockAchievement: (id) => {
                    const achievement = achievements.find(a => a.id === id);
                    if (achievement && !achievement.unlocked) {
                        achievement.unlocked = true;
                        gameData.achievements.push(id);
                        gameData.balance += achievement.reward;
                        updateBalance();
                        showAchievementNotification(achievement);
                        saveGame();
                    }
                },
                exportSave: exportSave,
                importSave: importSave,
                reset: resetGame
            };
            
            console.log('Для дебага используйте window.debug');
            console.log('Доступные команды:');
            console.log('- debug.addMoney(amount) - добавить деньги');
            console.log('- debug.unlockAll() - разблокировать все кейсы');
            console.log('- debug.addWorker("rarity") - добавить рабочего определенной редкости');
            console.log('- debug.addXp(amount) - добавить XP для ракетки');
            console.log('- debug.unlockAchievement(id) - разблокировать достижение');
            console.log('- debug.exportSave() - экспорт сохранения');
            console.log('- debug.importSave() - импорт сохранения');
            console.log('- debug.reset() - сброс игры');
        });

        // Автосохранение при закрытии страницы
        window.addEventListener('beforeunload', function() {
            saveGame();
        });

        // Периодическое автосохранение
        setInterval(saveGame, 30000);

        // Инициализация после загрузки DOM
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM loaded, initializing game...');
            
            // Проверяем сохранение
            if (localStorage.getItem('cornerEarningSave')) {
                loadGame();
            } else {
                // Начальные значения для новых игроков
                gameData.balance = 1000;
                gameData.workers = [];
                gameData.openedCases = 0;
                gameData.totalEarned = 0;
                gameData.city = {
                    buildings: [],
                    totalBonus: 1.0
                };
                gameData.rocket.height = 0;
                gameData.rocket.maxHeight = 0;
                gameData.rocket.xp = 0;
                gameData.rocket.worker = null;
                gameData.rocket.isFlying = false;
                gameData.achievements = [];
                saveGame();
            }
            
            // Обновляем интерфейс
            updateBalance();
            renderCases();
            renderWorkers();
            renderRocketWorkers();
            updatePassiveIncome();
            renderUpgrades();
            updateStats();
            
            // Запускаем пассивный доход
            updatePassiveIncome();
            
            // Закрытие модальных окон при клике вне их
            const caseModal = document.getElementById('caseModal');
            if (caseModal) {
                caseModal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        closeCaseModal();
                    }
                });
            }
            
            // Запускаем таймер опыта
            startExperienceTimer();
            
            console.log('Game initialized successfully!');
        }); // Каждые 30 секунд