var panels = document.querySelectorAll('.panel');

function toggleOpen() {
    this.classList.toggle('open');
}

function toggleActive(e) {
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
    }
}

panels.forEach(function (panel) {
    panel.addEventListener('click', toggleOpen);
});

panels.forEach(function (panel) {
    panel.addEventListener('transitionend', toggleActive);
});