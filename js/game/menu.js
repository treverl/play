﻿function Start(){

	$ = {};
	
	/////// SET UP SCENE ////////

	Show("background","coffeehouse");
	Show("cup","cup_steam",{x:44,y:359});
	Show("nicky","coffee_nicky_still");

	PlaySound("bg","coffeehouse",{loop:-1, volume:0.7});

	//////////////////////////////

	N("<b>КАМИНГ-АУТ СИМУЛЯТОР 2014</b>");
	N("Полу-правдивая игра о полу-правде.");
	N("Приветствую. Рад уделить тебе следующие 20 минут.");
	N("Что ты предпочтёшь сделать сейчас?");

	Choose({
		"Давай скорее поиграем!": Play,
		"Кто ты? (Титры).": function(){
			Credits("Расскажи немного о себе.");
		},
		"Хм, расскажи больше Про Игру.": function(){
			About("Поговорим про игру? .");
		}
	});

}

function SipCoffee(message){
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	PlaySound("sfx","coffee_sip");
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");
}

function Play(message){
	
	SipCoffee(message);

	// Asked neither
	if(!$.asked_about && !$.asked_credits){
		N("Отлично! Сразу начнём игру?");
		N("Не теряя времени, не желая узнать, кто я и почему создал эту игру -- ") ;
		p("Умолкни, пожалуйста.");
		N("Чудненько.");
	}
	// Asked both
	if($.asked_about && $.asked_credits){
		p(". . .");
		p("Почему ты сделал  единственный оставшийся вариант интерактивным!?");
		N("НЕТ ИДЕЙ");
	// Asked either
	}else if($.asked_about || $.asked_credits){
		N("Да, погнали!");
	}

	N("Итак, вернемся на четыре года назад, в 2010 год...");
	p("Это произошло ЧЕТЫРЕ года назад?!");
	N("... вечер, который изменил мою жизнь навсегда.");

	N("Скажи, дорогой игрок, как ты думаешь, чем всё это закончится?");

	Choose({
		"Цветами и радугой и милыми единорогами?": function(message){
			$.main_menu_convo_1 = 1;

			p(message);
			N("Да.Именно так заканчивается эта игра.");
			p("Правда что ли?");
			N("Нет.");
			Play_2();
		},
		"Видимо, ты никогда  не завершишь игру... ": function(message){
			$.main_menu_convo_1 = 2;

			p(message);
			p("... пытаясь написать её в Старбаксе.");
			N("Эй, о чём ты говоришь!? ");
            N("Я кодирую на ноутбуке");
            N("Превращаю историю своего созревания в эту игру.");
			p("Неа, ты надолго затягиваешь.");
			N("Смотрите, кто заговорил.");
			p("Touché, douché .");
			N("В любом случае...");
			Play_2();
		},
		"ВСЁ ЗАКОНЧИТСЯ КРОВЬЮ": function(message){
			$.main_menu_convo_1 = 3;

			p(message);
			N("Ах, по сравнению с этим, моя история не такая уж и трагичная.");
			N("Хотя она имеет нескольких толкований.");
			p("Я просто хотел зрелищ.");
			N("Кстати...");
			Play_2();
		}
	});

}

function Play_2(){

	if(!$.asked_about){
		N("Если бы ты не пропускал титры, то узнал бы, что эта игра - моя личная история.");
		p("Ну...допустим.");
	}

	N("Здесь будут фразы, которые я, мои родители и мой бывший парень по правде произносили.");
	N("Это игра о том, что мы сказали, чего не сказали, и чего могли бы друг другу не говорить.");
	N("И вообще, неважно, что есть что!");
	N("Уже неважно.");

	Choose({
		"Как я смогу выиграть без правильных ответов?": function(message){
			$.main_menu_convo_2 = 2;

			p(message);
			N("Именно.");
			p(". . .");
			Play_3();
		},
		"Ты немного зануда, ведь так?": function(message){
			$.main_menu_convo_2 = 1;

			p(message);
			N("ЖИЗНЬ немного угнетает.");
			p("О, да.");
			Play_3();
		},
		"Эта 'правдивая' игра полна лжи?": function(message){
			$.main_menu_convo_2 = 3;

			p(message);
			N("Даже если диалог был на 100% точным, это все равно будет 100% ложь.");
			p(". . .");
			Play_3();
		}
	});

}

function Play_3(){

	N("Ты будешь играть в роли меня, в 2010");
	if(!$.asked_credits){
		N("И поскольку ты пропустил Титры... моё (вымышленное) имя - Никки Кейс. Просто прими к сведению.");
		p("Хватит болтать.");
	}

	var whatISay;
	switch($.main_menu_convo_1){
		case 1: whatISay = "Эта игра не заканчивается весёлыми единорогами. "; break;
		case 2: whatISay = "Эта игра - выход, личностный рост и падение в реальность."; break;
		case 3: whatISay = "Она заканчивается не кровью, а слезами. "; break;
	}
	switch($.main_menu_convo_2){
		case 1: whatISay += "Извини, что был нудным."; break;
		case 2: whatISay += "Здесь нет правильных ответов."; break;
		case 3: whatISay += "Игра полна лжи."; break;
	}
	N(whatISay);

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);

	p("Я же просто сказал это!");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);

	Wait(500);
	Show("nicky","coffee_nicky_throw");
	PlaySound("sfx","coffee_throw");
	
	Wait(1000);
	Show("nicky","coffee_nicky_still_2");
	Wait(500);
	
	N("Когда играешь...");
	N("Выбирай слова с умом.");
	N("Каждый персонаж помнит всё, что ты говоришь. Или промолчи.");
	p("Ага. Ты даже упомянул мои ответы пару реплик назад.");
	N("Именно так.");

    N(". . .");
    N("Некоторые вещи трудно не помнить.");
	
	Clear();
	Start_Jack_1();

}

function Credits(message){

	$.asked_credits = true;
	
	if($.asked_about){
		SipCoffee(message);
	}else{
		SipCoffee("Кто ты?");
	}
	
	N("Ах, как грубо с моей стороны! Позвольте представиться.");
	N("Я Никки Кейс.");
	N("Таков мой псевдоним, но будь добр и прими его за моё НАСТОЯЩЕЕ имя.");

	p("Очень странная просьба, чувак.");
	if($.asked_about){
		p("Неужели ты поведаешь мне свою личную историю?");
	}else{
		p("И ты создатель этой игры?");
	}

	N("Угу, Я сам писал сценарий, программировал, рисовал игру.");

	if($.asked_about){
		p("Всё это сделано в одиночку?");
		p("Я говорил раньше и повторюсь снова...");
		p("Очевидно! Ты нарцисс.");
		N("Ладно, игра не ПОЛНОСТЬЮ моя.");
		N("Звуки и музыка без авторских прав и взяты из свободных источников .");
	}else{
		N("Музыкальная часть взята из свободных ресурсов.");
	}

	N("И хотя, в основном только я сижу за своей игрой...");
	N("...но за её историей  стоит много людей.");
    

	if($.asked_about){
		Choose({
			"Кстати, давай сыграем! Сейчас же!": Play
		});
	}else{
		Choose({
			"Сыграем сейчас?": Play,
			"Почему ты создал её? (Про Игру) ": function(){
				About("Почему ты создал её?");
			}
		});
	}

}

function About(message){

	$.asked_about = true;

	SipCoffee(message);

	if($.asked_credits){
		N("Хотел поведать свою историю.");
	}else{
		N("Игра...");
		N("...больше похожа на симулятор общения...");
		N("...очень личная история.");
	}
	
	p("Разумеется. Ты же нарцисс.");
	N("Ха, это про меня.");

	if($.asked_credits){
		p("А по существу - нет. Нарциссы  используют только своё настоящее имя.");
		N("Я вроде говорил ранее, что ЭТО моё настоящее и--");
		p("Так уж и быть, таинственный незнакомец))");
	}

	N("Я создавал своё творение для конкурса-геймджема #Nar8.");
    N("Отличный повод, чтобы сделать эту игру в короткий срок!");
	p("Ты откладывал до последнего дня, не так ли?");
	N("По правде говоря, да.");
	N("И напоследок: игра не защищена авторским правом. Она полностью принадлежит публике.");
	N("Так что исходный код открыт как моя сексуальность.");

    p("Уф, ужасный каламбур.");



	if($.asked_credits){
		Choose({
			"Давай сыграем наконец.": Play
		});
	}else{
		Choose({
			"Отбросим дурные шутки, давай играть?": Play,
			"Мне интересно узнать о тебе (Титры).": function(){
				Credits("Расскажи о себе.");
			}
		});
	}

}
