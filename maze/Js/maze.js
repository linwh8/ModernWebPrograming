/*
班级：教务三班
学号：15331204
姓名：林威宏
项目名称：The Amazing Mouse Maze
时间：Oct 14
*/

var S_flag = 0; // 标识是否经过起点
var Path_flag = [0, 0, 0, 0, 0];  // 标识是否经过各路段避免作弊
var E_flag = 0; // 标识是否经过终点
var Lose_flag = 0; // 标识是否碰到墙壁
var test_cheat = 0; // 标识是否经过测试结构

function addListener() { // 添加事件处理器
	var _wall = document.getElementsByClassName("wall");
	var _path = document.getElementsByClassName("path");
	for (var i = 0; i < 5; i++) {
		_wall[i].addEventListener('mouseover', error_func);  // 鼠标碰到墙触发的事件
		_wall[i].addEventListener('mouseout', my_reset);  // 鼠标离开墙触发的事件
		_path[i].addEventListener('mouseout', record); // 鼠标经过路径触发的事件
	}
	var _start = document.getElementById("start");
	var _end = document.getElementById("end");
	_start.addEventListener('mouseover', start_); // 鼠标经过起点触发的事件
	_end.addEventListener('mouseover', end_); // 鼠标经过终点触发的事件
	var _test = document.getElementById("test");
	_test.addEventListener('mouseover', test_); // 鼠标经过测试结构触发的事件
}


function test_(event) { // 如果经过测试结构，赋值为1
	if (S_flag == 1) {
		test_cheat = 1;
	}
}

function error_func(event) { // 如果鼠标触碰到墙壁
	if (S_flag == 1 && E_flag == 0) { // 在已经开始且未结束的情况下变色
		if (Lose_flag != 1) { // 同时还得在没有触碰到其他墙壁的情况下变色
			event.target.className += " error";  // 给出发事件的元素增加一个类，应用对应的css
		}
		document.getElementById("result").textContent = "You Lose!" // 修改输出的值
		Lose_flag = 1; // 失败的标识赋值为1，方便后续检测
		S_flag = 0; // 将开头标识赋值为0，方便初始化
	}
}

function my_reset(event) { // 鼠标离开墙壁后的重置
	event.target.className = "wall"; // 恢复原来的class值
}

function record(event) { // 鼠标经过跑道时作记号以便检测是否作弊
	if (event.target.id == "path_1") {
		Path_flag[0] = 1;
	} else if (event.target.id == "path_2") {
		Path_flag[1] = 1;
	} else if (event.target.id == "path_3") {
		Path_flag[2] = 1;
	} else if (event.target.id == "path_4") {
		Path_flag[3] = 1;
	} else if (event.target.id == "path_5") {
		Path_flag[4] = 1;
	}
}

function start_(event) { // 鼠标经过起点
	if (S_flag == 0) { // 如果起点标识为0，进行相关变量初始化
		document.getElementById("result").textContent = "Have A Try!";
		E_flag = 0;
		Lose_flag = 0;
		test_cheat = 0;
		for (var i = 0; i < 5; i++) {
			Path_flag[i] = 0;
		}
	}
	S_flag = 1; // 经过起点，起点标识赋值为1
}

function JudgeCheat() { // 检测是否经过整条path
	if (Path_flag[0] == 1 && Path_flag[1] == 1 && Path_flag[2] == 1
		&& Path_flag[3] == 1 && Path_flag[4] == 1) {
		return true;
	} else {
		return false;
	}
}

function end_(event) { // 鼠标经过终点
	E_flag = 1; // 结束的标识赋值为1
	if (Lose_flag != 1) { // 在不失败的情况下
		if (JudgeCheat()) { // 通过检测作弊的第一关
			if (test_cheat == 0) {  // 通过检测作弊的第二关
				document.getElementById("result").textContent = "You Win!";
			} else { // 没有通过检测，即为作弊
				document.getElementById("result").textContent
		    	= "Don't Cheat, you should start from the 'S' and move to the 'E' inside the maze!";		
			}
		} else { // 没有通过检测，即为作弊
			document.getElementById("result").textContent
		    = "Don't Cheat, you should start from the 'S' and move to the 'E' inside the maze!";
		}
		S_flag = 0;
	}
}

window.onload = function() { // 页面加载完毕后执行添加事件处理器函数。
	addListener();
}