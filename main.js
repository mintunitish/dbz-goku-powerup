const $ =  document.querySelector.bind(document);

const sprite = $('#sprite');
const meter = $('#meter');
const meterContainer = $('#meter-container');

const main = () => {
    const { fromEvent } = rxjs;

    const start = fromEvent(document, 'keydown');
    const end = fromEvent(document, 'keyup');

    start.subscribe(() => {
        sprite.classList.add('powerup');
    });

    end.subscribe(() => {
        sprite.classList.remove('powerup');
    });
}

main();

