<script>
    export let question;
    export let answer;
</script>

<details class="faq-question">
    <summary>
        <p>{question || 'Lorem ipsum'}</p>

        <img class="arrow-icon" src="/assets/icons/faq-down-arrow.svg" alt="Dropdown Icon">
    </summary>
    <div class="faq-answer">
        <p>{@html answer || 'Lorem ipsum'}</p>
    </div>
</details>

<style>
    .faq-question {
        width: 100%;

        margin-bottom: 8px;
        padding-left: 0;
        padding-right: 0;

        cursor: pointer;
    }

    summary {
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: 100%;
        min-height: 72px;
    }

    summary p {
        font-size: 20px;
        font-weight: 600;
        line-height: 24px;
    }
</style>