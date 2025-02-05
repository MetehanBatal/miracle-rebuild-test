<!-- Timer.svelte -->

<script>
    import { onMount, onDestroy } from "svelte";

    let remainingTime = 900; // Başlangıçta 10 dakika
    let timerInterval;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            if (remainingTime > 0) {
                remainingTime -= 1;
            } else {
                clearInterval(timerInterval); // Timer tamamlandığında interval'ı temizleyin
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    onMount(startTimer); // Sayfa açıldığında timer'ı başlat

    onDestroy(() => {
        stopTimer(); // Bileşen yok edildiğinde timer'ı durdur
    });
</script>

{#if remainingTime > 0}
    <span>{formatTime(remainingTime)}</span>
{/if}

<style>
</style>
