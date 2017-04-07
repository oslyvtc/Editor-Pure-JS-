function sel(a) {
	return document.querySelector(a)
};

function selAll(a) {
	return document.querySelectorAll(a)
};

function show(a) {
	return a.style.display = 'block'
}

function showInlineBlock(a) {
	return a.style.display = 'inline-block'
}

function hide(a) {
	return a.style.display = 'none'
}

// Change font function

function changeFont(cssProperty, cssValue) {
	if (window.getSelection() == '') {
		if (!sel('.text').style[cssProperty]) {
			sel('.text').style[cssProperty]= cssValue;
		} else {
			sel('.text').style[cssProperty] = '';
		}
	} else {
		var range = document.getSelection().getRangeAt(0);
		var selectionContents = range.extractContents();
		var span = document.createElement('span');
		span.appendChild(selectionContents);
		span.style[cssProperty] = cssValue;
		range.insertNode(span);
	}
}

// Change fontWeight

sel('.bold').addEventListener('click', function() {
	changeFont('fontWeight', 'bold');
});

// Change fontStyle

sel('.italic').addEventListener('click', function() {
	changeFont('fontStyle', 'italic');
});

// Change text-decoration

sel('.underline').addEventListener('click', function() {
	changeFont('textDecoration', 'underline')
});

// Change font-size

sel('.font-size').addEventListener('change', function() {
	changeFont('fontSize', this.value);
})

// Change font-family

sel('.font-family').addEventListener('change', function() {
	changeFont('fontFamily', this.value);
})

// Change text-align

var textAlignInputs = selAll('input[name="text-align"]');

for (var i = 0; i < textAlignInputs.length; i++) {
	textAlignInputs[i].addEventListener('click', function() {
		sel('.text').style.textAlign = this.value;
	})
}

// Add colors

var colorsArr = ['red', 'blue', 'green','#00ffff', '#99ff33', '#ff6600','#663300', '#ffff00', '#660066'];
var textColorTd = selAll('.choose-text-color td');

for (var c = 0; c < textColorTd.length; c++) {
	textColorTd[c].style.backgroundColor = colorsArr[c];
};

var backgroundColorTd = selAll('.choose-background-color td');

for (var c = 1; c < backgroundColorTd.length; c++) {
	backgroundColorTd[c].style.backgroundColor = colorsArr[c - 1];
};

// Change text-color 

(function() {
	var bool = true;
	sel('.color').addEventListener('click', function() {
		if (bool) {
			show(sel('.eclipse'));
			sel('.choose-text-color').style.display = "table";
			bool = false;
			for (var c = 0; c < textColorTd.length; c++) {
				textColorTd[c].addEventListener('click',function() {
					//sel('.text').style.color = this.style.backgroundColor;
					changeFont('color', this.style.backgroundColor);
					hide(sel('.choose-text-color'));
					hide(sel('.eclipse'));
					bool = true;
				});
			};
		} else {
			hide(sel('.choose-text-color'));
			bool = true;
		};
	});

	sel('.eclipse').addEventListener('click', function() {
		hide(sel('.choose-text-color'));
		hide(sel('.eclipse'));
		bool = true;
	})
})();

// function changeBackground(tableClassName, forLoopNumber, tableDataName, cssProperty, cssValue) {
// 	var bool = true;
// 	sel('.color').addEventListener('click', function() {
// 		if (bool) {
// 			show(sel('.eclipse'));
// 			sel(tableClassName).style.display = "table";
// 			bool = false;
// 			for (var c = forLoopNumber; c < tableDataName.length; c++) {
// 				tableDataName[c].addEventListener('click',function() {
// 					sel('.text').style[cssProperty] = this.style[cssValue];
// 					hide(sel(tableClassName));
// 					hide(sel('.eclipse'));
// 					bool = true;
// 				});
// 			};
// 		} else {
// 			hide(sel(tableClassName));
// 			bool = true;
// 		};
// 	});
// 	sel('.eclipse').addEventListener('click', function() {
// 		hide(sel(tableClassName));
// 		hide(sel('.eclipse'));
// 		bool = true;
// 	})
// }
	
// changeBackground('.choose-text-color', 0, textColorTd, 'color', 'backgroundColor')


///// Background

// Add img

var backgroundImage = ['img/img1.jpg','img/img2.jpg','img/img3.jpg','img/img4.jpg','img/img5.jpg','img/img6.jpg','img/img7.jpg','img/img8.jpg','img/img9.jpg'];
var backgroundImageTd = selAll('.choose-background-image td');

for (var c = 1; c < backgroundImageTd.length; c++) {
	backgroundImageTd[c].style.backgroundImage = 'url(' + backgroundImage[c-1] + ')';
};

// Download file

var inputTypeFile = sel('input[type="file"]');

inputTypeFile.addEventListener('change', readURL);
function readURL(){
  var file = inputTypeFile.files[0];
  var reader = new FileReader();
  reader.onloadend = function(){
    sel('.text').style.backgroundImage = "url(" + reader.result + ")";        
  }
  if(file){
    reader.readAsDataURL(file);
  }
}

/// Background modal windows

(function() {
	var boolOuter = true; // Show / hide background modal;
	var bool = true; // Toggle background image / color;

// Image

	(function() {
		sel('.background').addEventListener('click', function() {
			if (bool && boolOuter) {
				hide(sel('.choose-background-color'));
				show(sel('.eclipse'));
				sel('.choose-background-image').style.display = "table";
				bool = false;
				for (var c = 1; c < backgroundImageTd.length; c++) {
					backgroundImageTd[c].addEventListener('click',function() {
						sel('.text').style.backgroundImage = this.style.backgroundImage;
						hide(sel('.choose-background-image'));
						hide(sel('.eclipse'));
						bool = true;
					});
				};
			} else {
				hide(sel('.choose-background-image'));
				hide(sel('.choose-background-color'));
				bool = true;
			};
		});
	})();

// Color

	(function() {
		sel('.background-color-button').addEventListener('click', function() {
			bool = true;
			if (bool) {
				hide(sel('.choose-background-image'));
				sel('.choose-background-color').style.display = "table";
				bool = false;
				for (var c = 1; c < backgroundColorTd.length; c++) {
					backgroundColorTd[c].addEventListener('click',function() {
						sel('.text').style.backgroundImage = 'none';
						sel('.text').style.backgroundColor = this.style.backgroundColor;
						hide(sel('.choose-background-color'));
						hide(sel('.eclipse'));
						bool = true;
					});
				};
			} else {
				hide(sel('.choose-background-image'));
				bool = true;
		 	};
		});
	})();

// Color to image 

	sel('.background-image-button').addEventListener('click', function() {
		hide(sel('.choose-background-color'));
		sel('.choose-background-image').style.display = "table";
	});

// Hide Background modal windows

	sel('.eclipse').addEventListener('click', function() {
		hide(sel('.choose-background-color'));
		hide(sel('.choose-background-image'));
		hide(sel('.eclipse'));
		boolOuter = true;
		bool = true;
	})

})(); /// End Background modal windows

///// Page2

// Eclipse

sel('.eclipse2').addEventListener('click', function() {
	hide(sel('.table-form'));
	hide(sel('.list-form'));
	hide(sel('.eclipse2'));
})

// Show page2

sel('.edit').addEventListener('click', function() {
	hide(sel('.page1'));
	show(sel('.page2'));
	var textValue = sel('.text').innerHTML;
	sel('textarea').value = textValue;
})

// Show page1 

sel('.back').addEventListener('click', function() {
	hide(sel('.page2'));
	show(sel('.page1'));
})

// Show table form

sel('.choose-table').addEventListener('click', function() {
	hide(sel('.list-form'));
	show(sel('.table-form'));
	show(sel('.eclipse2'));
	clearFormTable();
})

// Clear table form

var tableFormInputText = selAll('.table-form input[type="text"]');

function clearFormTable() {
	for (var i = 0; i < tableFormInputText.length - 1; i++) {
		var current = '.' + tableFormInputText[i].className;
		tableFormInputText[i].value = ''; 
		sel(current + '.error-number').innerHTML = '';
		sel(current + '.error-empty').innerHTML = '';
		sel(current + '.spliter').style.display = 'none';
		tableFormInputText[i].style.backgroundColor = 'white';
		sel('.create-table').disabled = true;
	};
	var colorInput = tableFormInputText[tableFormInputText.length - 1];
	var currentColor = '.' + colorInput.className;
	colorInput.value = ''; 
	sel(currentColor + '.error-color').innerHTML = '';
	sel(currentColor + '.error-empty').innerHTML = '';
	sel(currentColor + '.spliter').style.display = 'none';
	colorInput.style.backgroundColor = 'white';
	sel('.border-type').value = sel('.border-type')[0].value;
}

sel('.clear').addEventListener('click', clearFormTable);

// Create table function

var tableClose = '</table>';
var tableRowOpen = '<tr>';
var tableRowClose = '</tr>'

function addTable() {
	var rowNumber = selAll('.row-number')[1].value;
	var cellNumber = selAll('.cell-number')[1].value;
	var cellWidth = selAll('.cell-width')[1].value;
	var cellHeight = selAll('.cell-height')[1].value;
	var tableData = '<td style="width:' + cellWidth +
						  		'px; height:' + cellHeight + 'px"></td>';
	var borderWidth = selAll('.border-width')[1].value;
	var borderType = sel('.border-type').value;
	var borderColor = selAll('.border-color')[1].value;
	var tableOpen = '<table style="border:' + borderWidth + 
									'px ' + borderType + ' ' + borderColor + '">';
	var	table = sel('textarea').value + tableOpen;
	for (var i = 0; i < rowNumber; i++) {
		table += tableRowOpen;
		for (var t = 0; t < cellNumber; t++) {
			table += tableData
		}
    table += tableRowClose;
	}
  sel('textarea').value = table + tableClose;
}

// Add table

sel('.create-table').addEventListener('click', function() {
	addTable();
	hide(sel('.table-form'));
	hide(sel('.eclipse2'));
})

// Show list

sel('.choose-list').addEventListener('click', function() {
	hide(sel('.table-form'));
	show(sel('.list-form'));
	show(sel('.eclipse2'));
	clearFormList();
})

// Choose type of list
var inputListType = selAll('input[name="type-of-list"]');

inputListType[0].addEventListener('click', function() {
	hide(sel('.ordered-list-mark'));
	show(sel('.unordered-list-mark'));
})

inputListType[1].addEventListener('click', function() {
	hide(sel('.unordered-list-mark'));
	show(sel('.ordered-list-mark'));
})

// Add list function

function addList() {
	var listCount = selAll('.number-of-list')[1].value;
	var ulistMark = sel('.unordered-list-mark').value;
	var olistMark = sel('.ordered-list-mark').value;
	var li = '<li>Text</li>';
	var ulOpen = '<ul type=' + ulistMark + '>';
	var ulClose = '</ul>';
	var olOpen = '<ol style="list-style-type:' + olistMark + '">';
	var olClose = '</ol>';
	var list = '';
	var l = '';
	for (var i = 0; i < listCount; i++) {
		l += li;
	};
	if (inputListType[0].checked == true) {
		list = ulOpen + l + ulClose;
	} else {
		list = olOpen + l + olClose;
	}
	sel('textarea').value += list;
}

// Add list

sel('.create-list').addEventListener('click', function() {
	addList();
	hide(sel('.list-form'));
	hide(sel('.eclipse2'));
})

// Clear list form

var listFormInputText = selAll('.list-form input[type="text"]');

function clearFormList() {
	for (var i = 0; i < listFormInputText.length; i++) {
		var current = '.' + listFormInputText[i].className;
		listFormInputText[i].value = ''; 
		sel(current + '.error-number').innerHTML = '';
		sel(current + '.error-empty').innerHTML = '';
		sel(current + '.spliter').style.display = 'none';
		listFormInputText[i].style.backgroundColor = 'white';
		sel('.create-list').disabled = true;
	}
	hide(sel('.ordered-list-mark'));
	show(sel('.unordered-list-mark'));
	sel('input[value="ul"]').checked = true;
	sel('.unordered-list-mark').value = sel('.unordered-list-mark')[0].value;
}

sel('.clear-list').addEventListener('click', clearFormList)

// Save

sel('.save').addEventListener('click', function() {
	hide(sel('.page2'));
	show(sel('.page1'));
	sel('.text').innerHTML = sel('textarea').value;
})

// Validation

function validate(chooseInputFieldsWrapper) {
	var inputFields = chooseInputFieldsWrapper;
	var current = '.' + inputFields.className;
	if (inputFields.value < 99 && inputFields.value > 0 && !isNaN(inputFields.value)) {
		sel(current + '.error-number').innerHTML = '';
		sel(current + '.error-empty').innerHTML = '';
		sel(current + '.spliter').style.display = 'none';
		inputFields.style.backgroundColor = 'green';
	} else if (inputFields.value > 99 || isNaN(inputFields.value)) {
		sel(current + '.error-empty').innerHTML = '';
		sel(current + '.error-number').innerHTML = 'Only numbers <br> (0 to 99)';
		sel(current + '.spliter').style.display = 'block';
		inputFields.style.backgroundColor = 'red';
	} else {
		sel(current + '.error-number').innerHTML = '';
		sel(current + '.error-empty').innerHTML = 'This field can not be empty';
		sel(current + '.spliter').style.display = 'block';
		inputFields.style.backgroundColor = 'red';
	};
};

// Enable create button

function enableCreateButton(chooseInputFieldsWrapper, chooseButtonName, number){
	var inputFields = chooseInputFieldsWrapper;
	var buttonName = chooseButtonName;
	var validateBoolean = false;
	for (var i = 0; i < inputFields.length - number; i++) {
		inputFields[i].addEventListener('input', function(i) {
			validate(this);
			for (var d = 0; d < inputFields.length - number; d++) {
				if (inputFields[d].style.backgroundColor == 'green') {
					validateBoolean = true;
				} else {
					validateBoolean = false;
					break;
				};
			};
			if (validateBoolean) {
				buttonName.disabled = false;
			} else {
				buttonName.disabled = true;
			};
  	});
	};
};

enableCreateButton(selAll('.table-form input'), sel('.create-table'), 1);
enableCreateButton(selAll('.list-form input[type="text"]'), sel('.create-list'), 0);

// Table input color validation

function validateColor() {
	var colorInputCurrent = selAll('.table-form input').length - 1;
	var colorInput = selAll('.table-form input')[colorInputCurrent];
	colorInput.addEventListener('input', function() {
		if (isNaN(colorInput.value)) {
			sel('.error-color').innerHTML = '';
			sel('.border-color.error-empty').innerHTML = '';
			sel('.border-color.spliter').style.display = 'none';
			colorInput.style.backgroundColor = 'green';
		} else if (!isNaN(colorInput.value)) {
			sel('.error-empty').innerHTML = '';
		  sel('.border-color.error-color').innerHTML = 'Write color name';
			sel('.border-color.spliter').style.display = 'block';
			colorInput.style.backgroundColor = 'red';
		} else {
			sel('.error-color').innerHTML = '';
			sel('.border-color.error-empty').innerHTML = 'This field can not be empty';
			sel(colorInput + '.spliter').style.display = 'block';
			colorInput.style.backgroundColor = 'red';
		}
	});
};

validateColor();
