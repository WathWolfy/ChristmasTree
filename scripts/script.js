$(document).ready(function () {
    const config = {
        question_number: 1,
        balls_number: 0
    };

    const questions_test = {
        question_holiday: "В России этот праздник отмечается каждый год. Семьи собираются за один большой стол, царит волшебная атмосфера. Как называется этот праздник?",
        question_symbol: "Символ праздника?",
        question_decoration: "Что вешают на ёлку?"
    }

    const redBalls = [
        'r-one-b',
        'r-two-b',
        'r-three-b'
    ];

    const blueBalls = [
        'bl-one-b',
        'bl-two-b',
        'bl-three-b'
    ];

    const yellowBalls = [
        'y-one-b',
        'y-two-b',
        'y-three-b'
    ];

    //Red Balls
    let question_array = Object.keys(questions_test);
    let questions_keys = [];

    $.each(redBalls, function (i) {

        let question_index = Math.floor(Math.random() * question_array.length);
        let random_question_key = question_array[question_index];

        while (questions_keys.indexOf(random_question_key) > -1) {
            question_index = Math.floor(Math.random() * question_array.length);
            random_question_key = question_array[question_index];
        }

        questions_keys.push(random_question_key);
        let random_question_value = questions_test[questions_keys[i]];
        let answers_list = "";

        switch (questions_keys[i]) {
            case 'question_holiday':
                answers_list = "<button class='answer'><div class='letter'>A</div><div class='answer-text'>Рождество</div></button><button class='answer'><div class='letter'>B</div><div class='answer-text'>Пасха</div></button><button class='answer r-a'><div class='letter'>C</div><div class='answer-text'>Новый год</div></button><button class='answer'><div class='letter'>D</div><div class='answer-text'>День рождения</div></button>";
                break;
            case 'question_symbol':
                answers_list = "<button class='answer'><div class='letter'>A</div><div class='answer-text'>Чучело</div></button><button class='answer r-a'><div class='letter'>B</div><div class='answer-text'>Ёлка</div></button><button class='answer'><div class='letter'>C</div><div class='answer-text'>Тыква</div></button><button class='answer'><div class='letter'>D</div><div class='answer-text'>Победа</div></button>";
                break;
            case 'question_decoration':
                answers_list = "<button class='answer r-a'><div class='letter'>A</div><div class='answer-text'>Шары</div></button><button class='answer'><div class='letter'>B</div><div class='answer-text'>Деньги</div></button><button class='answer'><div class='letter'>C</div><div class='answer-text'>Мандаринки</div></button><button class='answer'><div class='letter'>D</div><div class='answer-text'>Валентинки</div></button>";
                break;
        }
        $(".game-one-tests." + redBalls[i]).on('click', function () {
            if ($(".game-one-tests." + redBalls[i]).css('opacity') == '0.5') {
                $("#modal-test").fadeIn(500).removeClass('disabled');
                $(".modal-bg-test").html("<div class='close-modal-test'><img src='images/close-icon.svg' class='close-icon' alt=''></div>" + 'Вопрос №' + config.question_number + ': ' + random_question_value);
                $(".modal-t .answers").html(answers_list);

                let test = false;
                let ball = redBalls[i];
                let hasclass = false;

                $(".modal-t .answers .answer").each(function (i) {
                    if ($(".game-one-tests").hasClass(ball)) {
                        $(this).on('click', function () {
                            if (hasclass == false) {
                                let right_answer = -1;
                                if ($(this).hasClass('r-a')) {
                                    right_answer = i;
                                };
                                if (i == right_answer) {
                                    $(this).addClass("right-answer");
                                    $(this).siblings().addClass("wrong-answer");
                                    test = true;
                                    config.balls_number += 1;
                                    config.question_number += 1;
                                    $(".num-balls").html(config.balls_number);
                                } else {
                                    $(this).addClass("wrong-answer");
                                    test = false;
                                };
                            };
                            hasclass = true;
                        });
                    };
                });


                $(".modal-bg-test").on('click', '.close-modal-test', function () {
                    $("#modal-test").removeAttr('style').addClass('disabled');
                    if (test == false) {
                        $(".modal-t .answers .answer.wrong-answer").removeClass('wrong-answer');
                    } else {
                        $(".modal-t .answers .answer.right-answer").removeClass('right-answer');
                        $(".modal-t .answers .answer.wrong-answer").removeClass('wrong-answer');
                        $(".game-one-tests." + ball).css('opacity', '1');
                    }
                    hasclass = false;
                });
            }
        });
    });
    //End Red Balls

    //BlueBalls
    function randomLetter() {
        let alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ', word = '';
        word += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
        return word;
    }

    function compareNum(a, b) {
        if (a > b) return 1;
        if (a == b) return 0;
        if (a < b) return -1;
    }

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    const words = {
        salad: ['С', 'А', 'Л', 'А', 'Т', 'Ы'],
        decoration: ['У', 'К', 'Р', 'А', 'Ш', 'Е', 'Н', 'И', 'Я'],
        snow: ['С', 'Н', 'Е', 'Г']
    }

    let words_array = Object.keys(words);
    let words_keys = [];

    $.each(blueBalls, function (i) {

        let word_index = Math.floor(Math.random() * words_array.length);
        let random_word_key = words_array[word_index];

        while (words_keys.indexOf(random_word_key) > -1) {
            word_index = Math.floor(Math.random() * words_array.length);
            random_word_key = words_array[word_index];
        }

        words_keys.push(random_word_key);
        let random_word_value = words[words_keys[i]];
        let cells_list = "";
        let words_shuffle = [];
        let images_list = "";
        let certain_word = [];
        switch (words_keys[i]) {
            case 'salad':
                certain_word = ['С', 'А', 'Л', 'А', 'Т', 'Ы'];
                cells_list = "<div class='cell'></div><div class='cell'></div><div class='cell'></div><div class='cell'></div><div class='cell'></div><div class='cell'></div>";
                images_list = "<img src='images/salad.png' alt='' class='fw-image'><img src='images/salad1.png' alt='' class='fw-image'><img src='images/salad2.png' alt='' class='fw-image'><img src='images/salad3.png' alt='' class='fw-image'>";
                break;
            case 'decoration':
                certain_word = ['У', 'К', 'Р', 'А', 'Ш', 'Е', 'Н', 'И', 'Я'];
                cells_list = "<div class='cell'></div><div class='cell'></div><div class='cell'></div><div class='cell'></div><div class='cell'></div><div class='cell'></div><div class='cell'></div><div class='cell'></div><div class='cell'></div>";
                images_list = "<img src='images/decoration.png' alt='' class='fw-image'><img src='images/decoration1.png' alt='' class='fw-image'><img src='images/decoration2.png' alt='' class='fw-image'><img src='images/decoration3.png' alt='' class='fw-image'>";
                break;
            case 'snow':
                certain_word = ['С', 'Н', 'Е', 'Г'];
                cells_list = "<div class='cell'></div><div class='cell'></div><div class='cell'></div><div class='cell'></div>";
                images_list = "<img src='images/snow.png' alt='' class='fw-image'><img src='images/snow1.png' alt='' class='fw-image'><img src='images/snow2.png' alt='' class='fw-image'><img src='images/snow3.png' alt='' class='fw-image'>";
                break;
        }
        words_shuffle = words[random_word_key];
        shuffle(words_shuffle);
        let random_letter_cell_index = -1;
        const letter_cell_index_array = [];
        let j = 0;
        
        while (j < words[random_word_key].length) {
            random_letter_cell_index = Math.floor(Math.random() * 16);
            while (letter_cell_index_array.indexOf(random_letter_cell_index) > -1) {
                random_letter_cell_index = Math.floor(Math.random() * 16);
            }
            letter_cell_index_array.push(random_letter_cell_index);
            j += 1;
        }
        letter_cell_index_array.sort(compareNum);
        let letters_cells = [];
        let random_letter = '';
        $(".letter-cell").each(function (i) {
            random_letter = randomLetter();
            while (words_shuffle.indexOf(random_letter) > -1) {
                random_letter = randomLetter();
            };
            letters_cells.push(random_letter);
        })
        $.each(letters_cells, function (k) {
            $.each(letter_cell_index_array, function (l) {
                if (letter_cell_index_array[l] == k) {
                    letters_cells[letter_cell_index_array[l]] = words_shuffle[l];
                };
                l += 1;
            });
            k += 1;
        });

        $(".game-two-four-words-one-word." + blueBalls[i]).on('click', function () {
            if ($(".game-two-four-words-one-word." + blueBalls[i]).css('opacity') == '0.5') {
                $("#four-in-one").fadeIn(500).removeClass('disabled');
                $(".images-fio").html(images_list);
                $(".cells").html(cells_list);
                $(".letter-cell").each(function (i) {
                    $(this).html(letters_cells[i]);
                });

                let cell_length = words[random_word_key].length;
                let k = 0;
                let cell_array = [];
                let cell = '';
                let ballb = blueBalls[i];
                let four_in_one_success = false;
                let boolean_array_success = [];

                $('.letter-cell').each(function () {
                    if ($(".game-two-four-words-one-word").hasClass(ballb)) {
                        $(this).on('click', function () {
                            cell = $(this).html();
                            if (k < cell_length) {
                                cell_array.push(cell);
                            } else {
                                k -= 1;
                            };
                            $('.cell').each(function (j) {
                                if (j == k) {
                                    $(this).html(cell_array[k]);
                                }
                            });
                            k += 1;
                            if (k == cell_length) {
                                $('.cell').each(function (n) {
                                    if ($(this).html() == certain_word[n]) {
                                        $(this).addClass('green');
                                        boolean_array_success.push(true);
                                    } else {
                                        $(this).addClass('red');
                                        boolean_array_success.push(false);
                                    };
                                });
                                if (boolean_array_success.indexOf(false) == -1) {
                                    four_in_one_success = true;
                                } else {
                                    four_in_one_success = false
                                };
                            };
                        });
                    };
                });

                let letter_of_array = 0;

                $('.cell').each(function (s) {
                    $(this).on('click', function () {
                        if ($(this).html() != "") {
                            cell_array.splice(s, 1);
                            $('.cell').html('');
                            for (letter_of_array = 0; letter_of_array < cell_array.length; letter_of_array++) {
                                $('.cell').each(function (a) {
                                    if (a == letter_of_array) {
                                        $(this).html(cell_array[letter_of_array]);
                                    };
                                });
                            };
                            if (k == 0) {
                                k += 1;
                            };
                            k -= 1;
                            if (k <= cell_length) {
                                $('.cell').each(function () {
                                    $(this).removeClass('green');
                                    $(this).removeClass('red');
                                });
                                four_in_one_success = false;
                                boolean_array_success = [];
                            };
                        }
                    });
                });

                $(".modal-fio").on('click', '.close-modal-fw', function () {
                    $("#four-in-one").removeAttr('style').addClass('disabled');
                    if (four_in_one_success == true) {
                        config.balls_number += 1;
                        $(".num-balls").html(config.balls_number);
                        $(".game-two-four-words-one-word." + ballb).css('opacity', '1');
                    }
                    delete (k);
                    cell_array = [];
                    cell = '';
                    letter_of_array = 0;
                    cell_length = -1;
                    four_in_one_success = false;
                    boolean_array_success = [];
                });
            }
        });
    });
    // End BlueBalls


    // Yellow Balls
    const questions_suitable_words = {
        question_new_year_decoration: "Подберите подходящие слова к общему слову: “Новогодний декор”.",
        question_new_year_happiness: "Подберите подходящие слова к общему слову: “Новогодние забавы”.",
        question_new_year_table: "Подберите подходящие слова к общему слову: “Новогодний стол”."
    }

    let questions_sw_array = Object.keys(questions_suitable_words);
    let questions_sw_keys = [];

    $.each(yellowBalls, function (t) {
        let question_index_sw = Math.floor(Math.random() * questions_sw_array.length);
        let random_question_key_sw = questions_sw_array[question_index_sw];

        while (questions_sw_keys.indexOf(random_question_key_sw) > -1) {
            question_index_sw = Math.floor(Math.random() * questions_sw_array.length);
            random_question_key_sw = questions_sw_array[question_index_sw];
        }

        questions_sw_keys.push(random_question_key_sw);
        let random_question_value_sw = questions_suitable_words[questions_sw_keys[t]];

        let answers_list_sw = [];
        let right_answers = [];

        switch (questions_sw_keys[t]) {
            case 'question_new_year_decoration':
                answers_list_sw = [
                    'Ёлка',
                    'Пасхальные яйца',
                    'Гирлянды',
                    'Свечи',
                    'Тыква',
                    'Торт',
                    'Верба',
                    'Ёлочные игрушки'
                ];
                right_answers = [0, 2, 3, 7];
                break;
            case 'question_new_year_happiness':
                answers_list_sw = [
                    'Лепка снеговика',
                    'Постройка горы',
                    'Прятки',
                    'Царь горы',
                    'Купание',
                    'Катание на велосипеде',
                    'Гонки на санках',
                    'Песочная крепость'
                ];
                right_answers = [0, 1, 3, 6];
                break;
            case 'question_new_year_table':
                answers_list_sw = [
                    'Оливье',
                    'Суп с горохом',
                    'Суши',
                    'Рис',
                    'Курица',
                    'Картошка',
                    'Крабовый салат',
                    'Шампанское'
                ];
                right_answers = [0, 4, 5, 6, 7];
                break;
        }

        let ballY = yellowBalls[t];

        $(".game-three-suitable-words." + yellowBalls[t]).on('click', function () {
            if ($(".game-three-suitable-words." + yellowBalls[t]).css('opacity') == '0.5') {
                $("#collect-words").fadeIn(500).removeClass('disabled');
                $(".modal-cw .answers .answer").removeClass('disabled');
                $(".modal-bg-cw").html('<div class="close-modal-cw"><img src="images/close-icon.svg" class="close-icon" alt=""></div>' + 'Вопрос №' + config.question_number + ': ' + random_question_value_sw);

                $(".modal-cw .answers .answer .answer-text").each(function (i) {
                    if ($('.game-three-suitable-words').hasClass(ballY)) {
                        $(this).html(answers_list_sw[i])
                        for (let j = 0; j < right_answers.length; j++) {
                            if (i == right_answers[j]) {
                                $(this).parent().addClass('right-a');
                            };
                        };
                    };
                });

                let collect_word_success = false;
                let cw_boolean_success = [];

                $(".modal-cw .answers .answer").each(function (i) {
                    if ($('.game-three-suitable-words').hasClass(ballY)) {
                        $(this).on('click', function () {
                            $(this).addClass('disabled');
                            $('.right-a-left').addClass('disabled');
                            let right_a = '';
                            let index_answer = i;
                            if ($(this).hasClass('right-a')) {
                                right_a = "right-a";
                            }
                            $(this).removeClass('right-a');
                            $(".zone-for-words .answer").each(function (j) {
                                $(this).removeClass("green");
                                $(this).removeClass("red");
                                collect_word_success = false;
                                cw_boolean_success = [];
                                if (j == index_answer) {
                                    $(this).removeClass('disabled');
                                    $(this).children().siblings('.answer-text').html(answers_list_sw[j]);
                                    $(this).addClass(right_a);
                                }
                            })
                        })
                    }
                });

                $('.modal-cw .zone-for-words .answer').each(function (x) {
                    if ($('.game-three-suitable-words').hasClass(ballY)) {
                        $(this).on('click', function () {
                            $('.right-a-left').addClass('disabled');
                            $(".modal-cw .zone-for-words .answer").removeClass("green");
                            $(".modal-cw .zone-for-words .answer").removeClass("red");
                            collect_word_success = false;
                            cw_boolean_success = [];
                            $(this).addClass('disabled');
                            let right_answ = '';
                            if ($(this).hasClass('right-a')) {
                                right_answ = "right-a";
                            }
                            let index_a = x;
                            $(this).removeClass('right-a')
                            $(".modal-cw .answers .answer").each(function (index) {
                                if (index == index_a) {
                                    $(this).removeClass('disabled');
                                    $(this).children().siblings('.answer-text').html(answers_list_sw[index]);
                                    $(this).addClass(right_answ);
                                }
                            });
                        });
                    };
                });

                let right_answers_left = -1;
                let wrong_answers_left = -1;

                $(".modal-cw").on('click', '.done-btn', function () {
                    if ($('.modal-cw .answers .answer').hasClass('right-a') || (right_answers_left / 8) != 0 || $('.modal-cw .zone-for-words .answer').hasClass('red')) {
                        $('.right-a-left').removeClass('disabled');
                        wrong_answers_left = 0;
                        right_answers_left = 0;
                        $('.modal-cw .zone-for-words .answer').each(function (h) {
                            if ($(this).hasClass('right-a') && !$(this).hasClass('disabled')) {
                                $(this).addClass('green');
                                cw_boolean_success.push(true);
                            } else {
                                if (!$(this).hasClass('disabled'))
                                    $(this).addClass('red');
                                cw_boolean_success.push(false);
                            };
                            if ($(this).hasClass('red') && !($(this).hasClass('disabled'))) {
                                wrong_answers_left += 1;
                            }
                            if (cw_boolean_success.indexOf(false) == -1) {
                                collect_word_success = true;
                            } else {
                                collect_word_success = false;
                            };
                            if ($('.modal-cw .answers .answer').hasClass('right-a')) {
                                collect_word_success = false;
                                $('.modal-cw .answers .answer').each(function (v) {
                                    if ($(this).hasClass('right-a')) {
                                        right_answers_left += 1;
                                    }
                                });
                            };
                        });
                    }
                    $('.right-a-left').html('Правильных ответов осталось: ' + (right_answers_left / 8) + ', выбрали неверно: ' + (wrong_answers_left));
                })

                let modal_bg_cw = $(".modal-bg-cw");
                modal_bg_cw.off();
                $(".modal-bg-cw").on('click', '.close-modal-cw', function () {
                    if (((right_answers_left / 8) == 0) && (wrong_answers_left == 0) && !($('.modal-cw .zone-for-words .answer').hasClass('red'))) {
                        config.balls_number += 1;
                        config.question_number += 1;
                        $(".num-balls").html(config.balls_number);
                        $(".game-three-suitable-words." + ballY).css('opacity', '1');
                    }
                    $("#collect-words").removeAttr('style').addClass('disabled');
                    $('.right-a-left').addClass('disabled');
                    $('.right-a-left').html('');
                    $(".modal-cw .answers .answer").addClass('disabled');
                    $(".modal-cw .answers .answer").removeClass('right-a');
                    $(".modal-cw .answers .answer").removeClass('right-a');
                    $(".zone-for-words .answer").removeClass('right-a');
                    $(".zone-for-words .answer").addClass('disabled');
                    $(".zone-for-words .answer .answer-text").html("");
                });
            };
        });
    });
    //End YellowBalls
});