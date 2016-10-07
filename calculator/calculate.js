var display = ""; // store the result

/* response to users */
window.onload = function() {
	document.getElementById("zero").onclick=function() {
		display += "0";
		document.getElementById("result").value = display;
	}
	document.getElementById("one").onclick=function() {
		display += "1";
		document.getElementById("result").value = display
	}
	document.getElementById("two").onclick=function() {
		display += "2";
		document.getElementById("result").value = display;
	}
	document.getElementById("three").onclick=function() {
		display += "3";
		document.getElementById("result").value = display;
	}
	document.getElementById("four").onclick=function() {
		display += "4";
		document.getElementById("result").value = display;
	}
	document.getElementById("five").onclick=function() {
		display += "5";
		document.getElementById("result").value = display;
	}
	document.getElementById("six").onclick=function() {
		display += "6";
		document.getElementById("result").value = display;
	}
	document.getElementById("seven").onclick=function() {
		display += "7";
		document.getElementById("result").value = display;
	}
	document.getElementById("eight").onclick=function() {
		display += "8";
		document.getElementById("result").value = display;
	}
	document.getElementById("nine").onclick=function() {
		display += "9";
		document.getElementById("result").value = display;
	}
	document.getElementById("plus").onclick=function() {
		display += "+";
		document.getElementById("result").value = display;
	}
	document.getElementById("subtract").onclick=function() {
		display += "-";
		document.getElementById("result").value = display;
	}
	document.getElementById("multiply").onclick=function() {
		display += "*";
		document.getElementById("result").value = display;
	}
	document.getElementById("divide").onclick=function() {
		display += "/";
		document.getElementById("result").value = display;
	}
	document.getElementById("point").onclick=function() {
		display += ".";
		document.getElementById("result").value = display;
	}
	document.getElementById("delete_one").onclick=function() {
		display = display.substring(0, display.length-1);
		document.getElementById("result").value = display;
	}
	document.getElementById("delete_all").onclick=function() {
		display = " ";
		document.getElementById("result").value = display;
	}
	document.getElementById("left_bracket").onclick=function() {
		display += "(";
		document.getElementById("result").value = display;
	}
	document.getElementById("right_bracket").onclick=function() {
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
		document.getElementById("result").value = display;
	}
}