/* 

	类型：Javascripe
	班级：教务三班
	姓名：林威宏
	学号：15331204
	项目名称：mole

*/

var count = 0;  // 分数
var status = 0; 

window.onload = function() {
	Create_button();
	document.getElementById("start_stop").onclick = _control;
	button = document.getElementsByClassName("hole");
}

/* 计时器 */
_clock = 31;
function clock() {
	_clock = _clock-1;
	document.getElementById("time").value = _clock;
	time_value = setTimeout(clock, 1000);
	if (_clock == 0) {
		clearInterval(time_value);
		document.getElementById("result").value = "Gameover";
		alert("Game Over.\n Your score is: " + document.getElementById("score").value);
		status = 0;
	}
}

/* Start Game | Stop Game 按钮的处理器 */
function _control() {
	if (status == 0) {  // 初始化
		status = 1;
		count = 0;
		_clock = 31;
		Random_occur();
		document.getElementById("score").value = count;
		document.getElementById("time").value = _clock;
		document.getElementById("result").value = "Playing";
		clock();
	} else {
		alert("Game Over.\n Your score is: " + document.getElementById("score").value);
		document.getElementById("result").value = "Gameover";
		clearInterval(time_value);
		_clock = 0;
		status = 0;
	}
}

/* 产生随机数的函数 */
function Random_occur() {
	if (_clock != 0) { // 避免游戏结束后还能继续操作
		current = Math.round(Math.random()*60-1);  // 使范围处于0～59，减一是为了避免出现60的情况
		button[current].checked = true;
	}
}

/* 按钮处理器 */
function button_react(event) {
	if (_clock != 0) {
		if (before == true) { // before 是点击前的状态
			count++;
			this.checked = false;  // 取消点击状态
			Random_occur();
		} else {  // 非目标按钮
			count--;
			this.checked = false;
			button[current].checked = true; // 由于单选框的特性，点击其他按钮时原来的按钮也会消失，所以要给原来的按钮重新checked
		}
		document.getElementById("score").value = count;
	} else { // 避免接触后继续对按钮操作
		this.checked = false;
	}
}

/* mousedown 事件处理器 */
function before_button_react(event) {
	before = this.checked;
}

/* 产生按钮函数 */
function Create_button() {
	var _container = document.getElementById("container");
	for (var i = 0; i < 60; i++) {
		var new_button = document.createElement("input");
		new_button.setAttribute("type", "radio");
		new_button.setAttribute("name", "mouse");
		new_button.className = "hole";
		new_button.addEventListener('click', button_react);
		new_button.addEventListener('mousedown', before_button_react);
		_container.appendChild(new_button);
	}
}