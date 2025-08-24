<script lang="ts">
	import { quizConfig, getRandomQuestions, type Question } from '$lib/quiz.config';
	import { fade, fly, scale } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';
	import { Howl } from 'howler';

	let current = 0;
	let selected: string | null = null;
	let submitted = false;
	let correct: boolean | null = null;
	let score = 0;
	let questions: Question[] = getRandomQuestions(quizConfig.questionsPerRound);

	let backgroundMusic: Howl | null = null;
	let correctSound: Howl | null = null;
	let incorrectSound: Howl | null = null;
	let musicEnabled = false;
	let soundEffectsEnabled = true;
	let showSettings = false;

	function normalize(word: string) {
		return word.toUpperCase();
	}

	function submit() {
		if (selected) {
			submitted = true;
			correct = selected === questions[current].answer;
			if (correct) score++;
			playSound(correct);
		}
	}

	function next() {
		selected = null;
		submitted = false;
		correct = null;
		current++;
	}

	function restart() {
		current = 0;
		selected = null;
		submitted = false;
		correct = null;
		score = 0;
		questions = getRandomQuestions(quizConfig.questionsPerRound);
	}

	onMount(() => {
		// Load settings from localStorage
		loadAudioSettings();

		// Initialize background music
		backgroundMusic = new Howl({
			src: ['sounds/njosnavelin.mp3'],
			loop: true,
			volume: 0.15,
			html5: true
		});

		// Initialize sound effects
		correctSound = new Howl({
			src: [quizConfig.sounds.correct],
			volume: 0.8
		});

		incorrectSound = new Howl({
			src: [quizConfig.sounds.incorrect],
			volume: 0.8
		});

		// Start background music if enabled
		if (musicEnabled) {
			backgroundMusic.play();
		}
	});

	function loadAudioSettings() {
		if (typeof window !== 'undefined') {
			const savedMusicEnabled = localStorage.getItem('quiz-music-enabled');
			const savedSoundEffectsEnabled = localStorage.getItem('quiz-sound-effects-enabled');

			musicEnabled = savedMusicEnabled ? JSON.parse(savedMusicEnabled) : false;
			soundEffectsEnabled = savedSoundEffectsEnabled ? JSON.parse(savedSoundEffectsEnabled) : true;
		}
	}

	function saveAudioSettings() {
		if (typeof window !== 'undefined') {
			localStorage.setItem('quiz-music-enabled', JSON.stringify(musicEnabled));
			localStorage.setItem('quiz-sound-effects-enabled', JSON.stringify(soundEffectsEnabled));
		}
	}

	onDestroy(() => {
		// Clean up audio when component is destroyed
		backgroundMusic?.stop();
		correctSound?.stop();
		incorrectSound?.stop();
	});

	function toggleBackgroundMusic() {
		if (!backgroundMusic) return;

		if (musicEnabled) {
			backgroundMusic.pause();
			musicEnabled = false;
		} else {
			backgroundMusic.play();
			musicEnabled = true;
		}
		saveAudioSettings();
	}

	function toggleSoundEffects() {
		soundEffectsEnabled = !soundEffectsEnabled;
		saveAudioSettings();
	}

	function openSettings() {
		showSettings = true;
	}

	function closeSettings() {
		showSettings = false;
	}

	function playSound(isCorrect: boolean) {
		if (!soundEffectsEnabled) return;

		if (isCorrect) {
			correctSound?.play();
		} else {
			incorrectSound?.play();
		}
	}
</script>

<main>
	<div class="container">
		<header>
			<div class="logo-section">
				<div class="logo-ikea">IKEA</div>
				<div class="logo-or">or</div>
				<div class="logo-sigur">Sigur Rós</div>
			</div>
			<p class="tagline">Can you tell Swedish furniture from Icelandic art rock?</p>
		</header>

		{#if current < questions.length}
			<div class="quiz-section" in:fade={{ duration: 300 }}>
				<div class="progress-bar">
					<div
						class="progress-fill"
						style="width: {((current + 1) / questions.length) * 100}%"
					></div>
				</div>

				<div class="quiz-card">
					<div class="question-number">
						Question {current + 1} of {questions.length}
					</div>

					<h2 class="word" in:fly={{ y: 20, duration: 400 }}>
						{normalize(questions[current].word)}
					</h2>

					<form on:submit|preventDefault={submit}>
						<div class="options">
							<label
								class="option {selected === 'IKEA' ? 'selected' : ''} {submitted ? 'disabled' : ''}"
							>
								<input
									type="radio"
									name="answer"
									value="IKEA"
									bind:group={selected}
									disabled={submitted}
								/>
								<div class="option-card ikea-option">
									<div class="option-icon">🪑</div>
									<div class="option-text">
										<div class="option-title">IKEA</div>
										<div class="option-subtitle">Swedish furniture</div>
									</div>
								</div>
							</label>

							<label
								class="option {selected === 'SIGUR_ROS' ? 'selected' : ''} {submitted
									? 'disabled'
									: ''}"
							>
								<input
									type="radio"
									name="answer"
									value="SIGUR_ROS"
									bind:group={selected}
									disabled={submitted}
								/>
								<div class="option-card sigur-option">
									<div class="option-icon">🎵</div>
									<div class="option-text">
										<div class="option-title">Sigur Rós</div>
										<div class="option-subtitle">Icelandic band</div>
									</div>
								</div>
							</label>
						</div>

						{#if !submitted}
							<button type="submit" class="submit-btn" disabled={!selected}> Submit Answer </button>
						{:else}
							<div class="result" in:scale={{ duration: 300 }}>
								<div class="result-message {correct ? 'correct' : 'incorrect'}">
									{#if correct}
										<div class="result-icon">✓</div>
										<div class="result-text">Correct!</div>
									{:else}
										<div class="result-icon">✗</div>
										<div class="result-text">Not quite!</div>
									{/if}
								</div>
								<button type="button" class="next-btn" on:click={next}> Next Question → </button>
							</div>
						{/if}
					</form>
				</div>

				<div class="score-display">
					<div class="score-label">Score</div>
					<div class="score-value">{score}/{questions.length}</div>
				</div>
				
				<button class="settings-button mt-8" on:click={openSettings}> ⚙️ Settings </button>
			</div>
		{:else}
			<div class="completion-section" in:fade={{ duration: 500 }}>
				<div class="completion-card">
					<div class="completion-icon">🎉</div>
					<h2 class="completion-title">Quiz Complete!</h2>
					<div class="final-score">
						<div class="final-score-label">Your Final Score</div>
						<div class="final-score-value">
							{score} / {questions.length}
						</div>
						<div class="final-score-percentage">
							{Math.round((score / questions.length) * 100)}%
						</div>
					</div>
					<div class="completion-message">
						{#if score === questions.length}
							Perfect! You're a true Nordic expert! 🌟
						{:else if score >= questions.length * 0.8}
							Excellent work! You know your IKEA from your Sigur Rós! 👏
						{:else if score >= questions.length * 0.6}
							Good job! You've got a decent grasp of Nordic culture! 👍
						{:else if score >= questions.length * 0.4}
							Not bad! With a bit more practice, you'll master it! 💪
						{:else}
							Keep trying! Nordic names can be tricky! 🤔
						{/if}
					</div>
					<button class="restart-btn" on:click={restart}> Play Again </button>
				</div>
			</div>
		{/if}

		<footer class="attribution">
			<div class="made-with-love">
				Made with ❤️ by <a href="http://www.danlouren.co" target="_blank" rel="noopener noreferrer"
					>Dan Lourenço</a
				>
			</div>
		</footer>
	</div>

	{#if showSettings}
		<div class="settings-overlay" on:click={closeSettings} transition:fade={{ duration: 200 }}>
			<div class="settings-modal" on:click|stopPropagation transition:scale={{ duration: 200 }}>
				<div class="settings-header">
					<h3>Settings</h3>
					<button class="close-button" on:click={closeSettings}>✕</button>
				</div>
				<div class="settings-content">
					<div class="setting-item">
						<label class="setting-label">
							<span class="setting-text">Background Music</span>
							<button
								class="toggle-switch {musicEnabled ? 'active' : ''}"
								on:click={toggleBackgroundMusic}
							>
								<span class="toggle-slider"></span>
							</button>
						</label>
					</div>
					<div class="setting-item">
						<label class="setting-label">
							<span class="setting-text">Sound Effects</span>
							<button
								class="toggle-switch {soundEffectsEnabled ? 'active' : ''}"
								on:click={toggleSoundEffects}
							>
								<span class="toggle-slider"></span>
							</button>
						</label>
					</div>
				</div>
			</div>
		</div>
	{/if}
</main>

<style>
	main {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem 1rem 4rem 1rem;
	}
	

	.container {
		width: 100%;
		max-width: 600px;
	}

	header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.logo-section {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 0.5rem;
		flex-wrap: wrap;
	}

	.logo-ikea {
		font-size: 2.5rem;
		font-weight: 900;
		color: var(--ikea-blue);
		background: var(--ikea-yellow);
		padding: 0.25rem 1rem;
		border-radius: 0.25rem;
		letter-spacing: 0.05em;
	}

	.logo-or {
		font-size: 1.25rem;
		color: var(--text-light);
		font-style: italic;
	}

	.logo-sigur {
		font-size: 2.5rem;
		font-weight: 300;
		background: linear-gradient(135deg, var(--iceland-blue), var(--iceland-red));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		letter-spacing: -0.02em;
	}

	.tagline {
		color: var(--text-light);
		font-size: 1rem;
		margin-top: 0.5rem;
		margin-bottom: 1rem;
	}

	.settings-button {
		background: rgba(255, 255, 255, 0.2);
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 2rem;
		padding: 0.5rem 1rem;
		color: var(--text-dark);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 2rem;
	}

	.settings-button:hover {
		background: rgba(255, 255, 255, 0.3);
		border-color: rgba(255, 255, 255, 0.5);
		transform: translateY(-1px);
	}

	.settings-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2000;
		padding: 1rem;
	}

	.settings-modal {
		background: white;
		border-radius: 1rem;
		padding: 0;
		max-width: 400px;
		width: 100%;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
	}

	.settings-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem;
		border-bottom: 1px solid #eee;
	}

	.settings-header h3 {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-dark);
	}

	.close-button {
		background: none;
		border: none;
		font-size: 1.25rem;
		cursor: pointer;
		color: var(--text-light);
		padding: 0.25rem;
		border-radius: 0.25rem;
		transition: all 0.2s ease;
	}

	.close-button:hover {
		background: #f0f0f0;
		color: var(--text-dark);
	}

	.settings-content {
		padding: 1.5rem;
	}

	.setting-item {
		margin-bottom: 1.5rem;
	}

	.setting-item:last-child {
		margin-bottom: 0;
	}

	.setting-label {
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
	}

	.setting-text {
		font-size: 1rem;
		color: var(--text-dark);
		font-weight: 500;
	}

	.toggle-switch {
		position: relative;
		width: 48px;
		height: 26px;
		background: #ccc;
		border: none;
		border-radius: 13px;
		cursor: pointer;
		transition: background 0.3s ease;
	}

	.toggle-switch.active {
		background: var(--ikea-blue);
	}

	.toggle-slider {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 22px;
		height: 22px;
		background: white;
		border-radius: 50%;
		transition: transform 0.3s ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.toggle-switch.active .toggle-slider {
		transform: translateX(22px);
	}

	.quiz-section {
		position: relative;
	}

	.progress-bar {
		width: 100%;
		height: 4px;
		background: rgba(0, 0, 0, 0.1);
		border-radius: 2px;
		overflow: hidden;
		margin-bottom: 2rem;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--ikea-blue), var(--iceland-blue));
		transition: width 0.5s ease;
		border-radius: 2px;
	}

	.quiz-card {
		background: white;
		border-radius: 1.5rem;
		padding: 3rem 2rem;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
		position: relative;
	}

	.question-number {
		position: absolute;
		top: 1.5rem;
		right: 2rem;
		color: var(--text-light);
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.word {
		font-size: 3rem;
		font-weight: 700;
		text-align: center;
		margin-bottom: 3rem;
		letter-spacing: 0.02em;
		color: var(--text-dark);
	}

	.options {
		display: grid;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.option {
		cursor: pointer;
		display: block;
	}

	.option.disabled {
		cursor: not-allowed;
		opacity: 0.7;
	}

	.option input {
		position: absolute;
		opacity: 0;
	}

	.option-card {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding: 1.5rem;
		border: 2px solid #e0e0e0;
		border-radius: 1rem;
		transition: all 0.3s ease;
		background: white;
	}

	.option:hover:not(.disabled) .option-card {
		border-color: #b0b0b0;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.option.selected .ikea-option {
		border-color: var(--ikea-blue);
		background: linear-gradient(135deg, rgba(255, 219, 0, 0.1), rgba(0, 88, 163, 0.05));
	}

	.option.selected .sigur-option {
		border-color: var(--iceland-blue);
		background: linear-gradient(135deg, rgba(2, 82, 156, 0.05), rgba(220, 30, 53, 0.05));
	}

	.option-icon {
		font-size: 2rem;
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--nordic-gray);
		border-radius: 0.75rem;
	}

	.option-text {
		flex: 1;
	}

	.option-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-dark);
		margin-bottom: 0.25rem;
	}

	.option-subtitle {
		font-size: 0.875rem;
		color: var(--text-light);
	}

	.submit-btn,
	.next-btn,
	.restart-btn {
		width: 100%;
		padding: 1rem 2rem;
		font-size: 1.125rem;
		font-weight: 600;
		border: none;
		border-radius: 0.75rem;
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.submit-btn {
		background: linear-gradient(135deg, var(--ikea-blue), var(--iceland-blue));
		color: white;
	}

	.submit-btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 88, 163, 0.3);
	}

	.submit-btn:disabled {
		background: #d0d0d0;
		cursor: not-allowed;
		transform: none;
	}

	.next-btn {
		background: var(--text-dark);
		color: white;
		margin-top: 1rem;
	}

	.next-btn:hover {
		background: #333;
		transform: translateY(-2px);
	}

	.result {
		text-align: center;
	}

	.result-message {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 1.5rem;
		border-radius: 0.75rem;
		margin-bottom: 1rem;
	}

	.result-message.correct {
		background: linear-gradient(135deg, #d4f4dd, #b8e6c7);
		color: #2d7a3e;
	}

	.result-message.incorrect {
		background: linear-gradient(135deg, #fde2e2, #fac7c7);
		color: #c73e3e;
	}

	.result-icon {
		font-size: 2rem;
		font-weight: bold;
	}

	.result-text {
		font-size: 1.5rem;
		font-weight: 600;
	}

	.score-display {
		text-align: center;
		margin-top: 2rem;
		padding: 1rem;
		background: white;
		border-radius: 0.75rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.score-label {
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-light);
		margin-bottom: 0.25rem;
	}

	.score-value {
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-dark);
	}

	.completion-section {
		text-align: center;
	}

	.completion-card {
		background: white;
		border-radius: 1.5rem;
		padding: 3rem 2rem;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
	}

	.completion-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
	}

	.completion-title {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--text-dark);
		margin-bottom: 2rem;
	}

	.final-score {
		background: var(--nordic-gray);
		border-radius: 1rem;
		padding: 2rem;
		margin-bottom: 2rem;
	}

	.final-score-label {
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-light);
		margin-bottom: 0.5rem;
	}

	.final-score-value {
		font-size: 3rem;
		font-weight: 900;
		color: var(--text-dark);
		margin-bottom: 0.5rem;
	}

	.final-score-percentage {
		font-size: 1.5rem;
		font-weight: 600;
		background: linear-gradient(135deg, var(--ikea-blue), var(--iceland-blue));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.completion-message {
		font-size: 1.125rem;
		color: var(--text-light);
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.restart-btn {
		background: linear-gradient(135deg, var(--ikea-yellow), #ffc700);
		color: var(--text-dark);
		font-weight: 700;
	}

	.restart-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(255, 219, 0, 0.4);
	}

	.attribution {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 0.75rem 0;
		text-align: center;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		z-index: 1000;
	}

	.made-with-love {
		color: var(--text-light);
		font-size: 0.875rem;
	}

	.made-with-love a {
		color: var(--ikea-blue);
		text-decoration: none;
		font-weight: 600;
		transition: color 0.3s ease;
	}

	.made-with-love a:hover {
		color: var(--iceland-blue);
		text-decoration: underline;
	}

	@media (max-width: 640px) {
		main {
			align-items: flex-start;
			padding: 0.5rem 1rem 4rem 1rem;
		}
		
		.container {
			margin-top: 1rem;
		}
		
		header {
			margin-bottom: 1rem;
		}
		
		.logo-ikea,
		.logo-sigur {
			font-size: 1.75rem;
		}
		
		.logo-or {
			font-size: 1rem;
		}
		
		.tagline {
			display: none;
		}

		.word {
			font-size: 2rem;
			margin-bottom: 2rem;
		}

		.quiz-card {
			padding: 1.5rem 1rem;
		}
		
		.question-number {
			top: 1rem;
			right: 1rem;
			font-size: 0.75rem;
		}

		.option-card {
			padding: 1rem;
			gap: 1rem;
		}
		
		.option-icon {
			width: 2.5rem;
			height: 2.5rem;
			font-size: 1.5rem;
		}
		
		.option-title {
			font-size: 1.125rem;
		}
		
		.option-subtitle {
			font-size: 0.8rem;
		}
		
		.submit-btn,
		.next-btn {
			padding: 0.875rem 1.5rem;
			font-size: 1rem;
		}
		
		.score-display {
			margin-top: 1rem;
			padding: 0.75rem;
		}
		
		.score-value {
			font-size: 1.5rem;
		}

		.final-score-value {
			font-size: 2rem;
		}

		.settings-button {
			font-size: 0.75rem;
			padding: 0.4rem 0.8rem;
		}
		
		
		.progress-bar {
			margin-bottom: 1.5rem;
		}
	}
</style>
