var display = ""; // store the result
var check = 0;
var expression = "";
/* response to users */
window.onload = function() {
	document.getElementById("clean").innerText = "clean";
	document.getElementById("clean").onclick=function() {
		expression = "";
		document.getElementById("record").innerText = expression;
	}
	document.getElementById("zero").onclick=function() {
		if (check == 1) {
			display = "";
			document.getElementById("result").value = display;
			check = 0;
		}
		display += "0";
		document.getElementById("result").value = display;
	}
	document.getElementById("one").onclick=function() {
		if (check == 1) {
			display = "";
			document.getElementById("result").value = display;
			check = 0;
		}
		display += "1";
		document.getElementById("result").value = display;
	}
	document.getElementById("two").onclick=function() {
		if (check == 1) {
			display = "";
			document.getElementById("result").value = display;
			check = 0;
		}
		display += "2";
		document.getElementById("result").value = display;
	}
	document.getElementById("three").onclick=function() {
		if (check == 1) {
			display = "";
			document.getElementById("result").value = display;
			check = 0;
		}
		display += "3";
		document.getElementById("result").value = display;
	}
	document.getElementById("four").onclick=function() {
		if (check == 1) {
			display = "";
			document.getElementById("result").value = display;
			check = 0;
		}
		display += "4";
		document.getElementById("result").value = display;
	}
	document.getElementById("five").onclick=function() {
		if (check == 1) {
			display = "";
			document.getElementById("result").value = display;
			check = 0;
		}
		display += "5";
		document.getElementById("result").value = display;
	}
	document.getElementById("six").onclick=function() {
		if (check == 1) {
			display = "";
			document.getElementById("result").value = display;
			check = 0;
		}
		display += "6";
		document.getElementById("result").value = display;
	}
	document.getElementById("seven").onclick=function() {
		if (check == 1) {
			display = "";
			document.getElementById("result").value = display;
			check = 0;
		}
		display += "7";
		document.getElementById("result").value = display;
	}
	document.getElementById("eight").onclick=function() {
		if (check == 1) {
			display = "";
			document.getElementById("result").value = display;
			check = 0;
		}
		display += "8";
		document.getElementById("result").value = display;
	}
	document.getElementById("nine").onclick=function() {
		if (check == 1) {
			display = "";
			document.getElementById("result").value = display;
			check = 0;
		}
		display += "9";
		document.getElementById("result").value = display;
	}
	document.getElementById("plus").onclick=function() {
		if (check == 1) {
			check = 0;
		}
		if (display[display.length-1] == '+') return;
		display += "+";
		document.getElementById("result").value = display;
	}
	document.getElementById("subtract").onclick=function() {
		if (check == 1) {
			check = 0;
		}
		if (display[display.length-1] == '-') return;
		display += "-";
		document.getElementById("result").value = display;
	}
	document.getElementById("multiply").onclick=function() {
		if (check == 1) {
			check = 0;
		}
		if (display[display.length-1] == '*') return;
		display += "*";
		document.getElementById("result").value = display;
	}
	document.getElementById("divide").onclick=function() {
		if (check == 1) {
			check = 0;
		}
		if (display[display.length-1] == '/') return;
		display += "/";
		document.getElementById("result").value = display;
	}
	document.getElementById("point").onclick=function() {
		if (check == 1) {
			display = "";
			document.getElementById("result").value = display;
			check = 0;
		}
		display += ".";
		document.getElementById("result").value = display;
	}
	document.getElementById("delete_one").onclick=function() {
		if (check == 1) {
			return;
		}
		display = display.substring(0, display.length-1);
		document.getElementById("result").value = display;
	}
	document.getElementById("delete_all").onclick=function() {
		display = "";
		document.getElementById("result").value = display;
	}
	document.getElementById("left_bracket").onclick=function() {
		if (check == 1) {
			display = "";
			document.getElementById("result").value = display;
			check = 0;
		}
		display += "(";
		document.getElementById("result").value = display;
	}
	document.getElementById("right_bracket").onclick=function() {
		if (check == 1) {
			display = "";
			document.getElementById("result").value = display;
			check = 0;
		}
		display += ")";
		document.getElementById("result").value = display;
	}
	document.getElementById("equal").onclick=function() {
		/* using try...catch... with eval() to realize calculate */
		try {
			display = eval(display);
		}
		catch(exception) {
			alert("Invalid arithmetic expressions!");
		}
		expression += document.getElementById("result").value + "=" + display + '\n';
		document.getElementById("result").value = display;
		check = 1;
		document.getElementById("record").innerText = expression;
	}
}
