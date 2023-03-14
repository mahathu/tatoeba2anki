<div class="spinner-wrapper">
    <div class="spinner" />
</div>

<style>
    .spinner-wrapper {
        display: flex;
        justify-content: space-around;
    }
    .spinner {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 3px solid hsl(0, 0%, 89%);
        border-top-color: var(--link-color);
        animation: spin 1s cubic-bezier(0.34, 0, 0.45, 1) infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>
