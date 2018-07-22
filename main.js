const $ =  document.querySelector.bind(document);

const sprite = $('#sprite');
const meter = $('#meter');
const meterContainer = $('#meter-container');

const powerLevels = {
    100: {
        current: 'base',
        previous: null,
        next: 'ssj'
    },
    1000: {
        current: 'ssj',
        previous: 'base',
        next: null
    }
};

const fillMeter = (level) => {
    const limit = 100;

    if(level >= limit) {
        return;
    }

    const containerWidth = meterContainer.offsetWidth;
    const newWidth = (level/limit) * containerWidth;

    meter.style.width = `${newWidth}px`;
}

const main = () => {
    const { fromEvent } = rxjs;
    const { filter, map, scan, tap } = rxjs.operators;

    const start = fromEvent(document, 'keydown');
    const end = fromEvent(document, 'keyup');

    start.pipe(
        scan(level => level + 1, 1),
        tap(level => {
            console.log({ level });
            sprite.classList.add('powerup');
            fillMeter(level);
        }),
        map(level => powerLevels[level]),
        filter(level => level && level.next)
    )
    .subscribe(({ current, next }) => {
        sprite.classList.remove(current);
        sprite.classList.add(next);
    });

    end.subscribe(() => {
        sprite.classList.remove('powerup');
    });
}

main();

