document.getElementById('changeTextButton').addEventListener('click', function() {
    const title = document.getElementById('title');
    if (title.textContent === 'Hello, World!') {
        title.textContent = 'You clicked the button!';
    } else {
        title.textContent = 'Hello, World!';
    }
});
