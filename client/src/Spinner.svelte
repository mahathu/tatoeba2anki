<div class="spinner" />

<style>
    .spinner {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 5px solid rgba(0, 0, 0, 0.1);
        border-top-color: #000;
        animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>
