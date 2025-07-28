
$('#theme-selector').on('click', function() {
    $('body').toggleClass('light dark');
    
    let now = ($('body').hasClass('dark')) ? 'dark' : 'light';
    let next = ($('body').hasClass('dark')) ? 'light' : 'dark';

    $('#theme-selector img').attr('src', `img/${next}-mode/theme-selector.svg`);

    $('#start img').attr('src', `img/${now}-mode/play.svg`);
    $('#pause img').attr('src', `img/${now}-mode/pause.svg`);
    $('#stop img').attr('src', `img/${now}-mode/stop.svg`);
});

$('.timer input').on('change', function() {
    let value = $(this).val();
    let id = $(this).attr('id');
    
    value = value.replace(/\D/g, ''); // Remove o que não for número
    if ((id === 'minute' || id === 'second') && parseInt(value) > 59) {
        $(this).val('59');
    } else {
        $(this).val(value.padStart(2, '0')); // Para manter sempre dois dígitos
    }
});

// Variável para armazenar o intervalo do timer
var timerInterval = null;


function getSeconds() {
    return parseInt($('#second').val()) 
           + 60 * parseInt($('#minute').val()) 
           + 3600 * parseInt($('#hour').val());
}


// Função que decrementa o tempo do timer
function timer() {
    let total_seconds = getSeconds()--;

    $('#hour').val(Math.floor(total_seconds / 3600).toString().padStart(2, '0'));
    $('#minute').val(Math.floor((total_seconds / 60) % 60).toString().padStart(2, '0'));
    iSe$('#second').val((total_seconds % 60).toString().padStart(2, '0'));

    if (total_seconds == 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        alert('Tempo esgotado!');
        return;
    }
}

function startTimer() {
    timerInterval = setInterval(timer, 1000);
    $('.timer input').attr('readonly', true);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();

    $('#second').val('00');
    $('#minute').val('00');
    $('#hour').val('00');
}

$('#start').on('click', function() {
    if (timerInterval === null && getSeconds() > 0) {
        startTimer();
    }
});

$('#pause').on('click', function() {
    pauseTimer();
});

$('#stop').on('click', function() {
    if (timerInterval !== null) {
        resetTimer();
    }
});