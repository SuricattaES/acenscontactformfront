import { helpers } from '@vuelidate/validators';

export const istrue = {
    $validator: function(value)  {
        if(helpers.req(value)) {
            return value == true;
        } else {
            return true;
        }
    },
    $message: 'Field should be true.',
};

export const acensphone = {
    $validator: function(value)  {
        if(helpers.req(value)) {
            return /^[6789][0-9]{8}$/.test(value);
        } else {
            return true;
        }
    },
    $message: 'Phone should start in 6, 7, 8 or 9.',
};

export const acensnifcifformat = {
    $validator: function(value)  {
        if(helpers.req(value)) {
            return /^[A-Z][0-9]{7}[A-Z0-9]|[0-9]{8}[A-z]$/gmi.test(value);
        } else {
            return true;
        }
    },
    $message: 'VAT ID should be in spanish format.',
};

export const acensnifciffreal = {
    $validator: function(value)  {
        if(helpers.req(value)) {
            let isCorrect = false;

            // Spanish DNI
            let spdninumber = value.substr(0, value.length-1) % 23;
            let spdnichar = value.substr(value.length-1, 1);
            let spdnicalcchar = 'TRWAGMYFPDXBNJZSQVHLCKET'.substring(spdninumber, spdninumber + 1);

            if(spdnichar.toUpperCase() == spdnicalcchar) {
                isCorrect = true;
            }

            // Spanish NIF / CIF
            if(isValidCif(value)) {
                isCorrect = true;
            }

            return isCorrect;
        } else {
            return true;
        }
    },
    $message: 'VAT ID should be existent.',
};

function isValidCif(cif) {
	if (!cif || cif.length !== 9) {
		return false;
	}

	var letters = [
'J', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'
];
	var digits = cif.substr(1, cif.length - 2);
	var letter = cif.substr(0, 1);
	var control = cif.substr(cif.length - 1);
	var sum = 0;
  var i;
	var digit;

	if (!letter.match(/[A-Z]/)) {
		return false;
	}

	for (i = 0; i < digits.length; ++i) {
		digit = parseInt(digits[i]);

		if (isNaN(digit)) {
			return false;
		}

		if (i % 2 === 0) {
			digit *= 2;
			if (digit > 9) {
				digit = parseInt(digit / 10) + (digit % 10);
			}

			sum += digit;
		} else {
			sum += digit;
		}
	}

	sum %= 10;
	if (sum !== 0) {
		digit = 10 - sum;
	} else {
		digit = sum;
	}

	if (letter.match(/[ABEH]/)) {
		return String(digit) === control;
	}
	if (letter.match(/[NPQRSW]/)) {
		return letters[digit] === control;
	}

	return String(digit) === control || letters[digit] === control;
}