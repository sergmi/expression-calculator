function expressionCalculator(expr) {
	let a = expr.split(" ");
	let open_brackets = 0;
	let close_brackets = 0;
	let error_division = false;
	
	function multiplyCalculation(item_1, item_2, item_3) {
				if(item_2 === "*"){return Number(item_1) * Number(item_3);}
				if(item_2 === "/"){return Number(item_1) / Number(item_3);}
	}
	function additionCalculation(item_1, item_2, item_3) {
				if(item_2 === "+"){return Number(item_1) + Number(item_3);}
				if(item_2 === "-"){return Number(item_1) - Number(item_3);}
	}
	
	function mainCalculation(first,last){
		let count_subtraction = 0;
		
		for(i = first; i < last; i++){
			if(a[i]==="*"||a[i]==="/"){
				if(a[i]==="/"&&Number(a[i+1])===0){
					error_division = true;
					return;
				}
				let item = multiplyCalculation(a[i-1], a[i], a[i+1]);
				a.splice(i-1,3,item);
				i -= 2;
				last -= 2;				
			}
		}	
	
		for(i = first; i < last; i++){
			if(a[i]==="+"||a[i]==="-"){
				let item = additionCalculation(a[i-1], a[i], a[i+1]);
				a.splice(i-1,3,item);
				i -= 2;	
				last -= 2;
			}
		}
	}
	
	for(i = 0; i < a.length; i++){
		if(a[i]===""){
			a.splice(i,1);
			i--;
		}
		else if(a[i]==="("){
			open_brackets++;
		}
		else if(a[i]===")"){
			close_brackets++;
		}
	}
	if(open_brackets !== close_brackets){throw new Error("ExpressionError: Brackets must be paired");}
	else if(close_brackets !== 0){
		function findExpr(){
			for(k = 0; k < a.length; k++){
				if(a[k]===")"){
					last_symbol = k;
					for(s = k; s > -1; s--){
						if(a[s]==="("){
							first_symbol = s;
							a.splice(first_symbol,1);
							a.splice(last_symbol-1,1);
							mainCalculation(s,k-2);
							s = 0;
						}						
					}
					k = a.length;
				}
			}
			close_brackets--;
			if(close_brackets > 0){findExpr();}
		}
		findExpr();
		mainCalculation(0,a.length-1);
	}
	else{mainCalculation(0,a.length-1);}
	
	if(error_division === true){
		throw new Error("TypeError: Division by zero.");
		return;
	}
	return a[0];
}

module.exports = {
    expressionCalculator
}