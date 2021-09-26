//functions
//reverse Strings
const reverseString = (str) => {
  return str.split("").reverse().join("");
};
const checkPalindrome = (str) => {
  return str === reverseString(str);
};
// convert date to string
const dateToString = ({ day, month, year }) => {
  let dateStr = {
    day: "",
    month: "",
    year: "",
  };
  if (day < 10) {
    dateStr.day = "0" + day;
  } else {
    dateStr.day = String(day);
  }
  if (month < 10) {
    dateStr.month = "0" + month;
  } else {
    dateStr.month = String(month);
  }
  dateStr.year = String(year);

  return dateStr;
};

//get date in all format to check palindrome
const dateInAllFormat = (date) => {
  let { day, month, year } = dateToString(date);
  let [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd] = [
    day + month + year,
    month + day + year,
    year + month + day,
    day + month + year.slice(-2),
    month + day + year.slice(-2),
    year.slice(-2) + month + day,
  ];
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

//check palindrome for all date format
const checkPalindromeForDateFormat = (date) => {
  let dateFormat = dateInAllFormat(date);
  let isPalindrome = false;
  for (let i = 0; i < dateFormat.length; i++) {
    if (checkPalindrome(dateFormat[i])) {
      isPalindrome = true;
      break;
    }
  }
  return isPalindrome;
};

//check for leap year
const leapYear = (year) => {
  if (year % 400 === 0 || year % 4 === 0) {
    return true;
  }
  return false;
};
//get next date
const getNextDate = (date) => {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;
  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    //check leap year
    if (leapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day,
    month,
    year,
  };
};
//get next palindrome
const getNextPalindrome = (date) => {
  let count = 0;
  let nextDate = getNextDate(date);
  while (1) {
    count++;
    let isPalindrome = checkPalindromeForDateFormat(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [count, nextDate];
};

let date = { day: 30, month: 9, year: 2021 };

const dateOfBirth = document.querySelector("#dateOfBirth");
const checkBtn = document.querySelector(".btn");
const outputBox = document.querySelector("#outputBox");

const clickHandler = (e) => {
  let birthdate = dateOfBirth.value;
  if (birthdate !== "") {
    let separatedBirthdate = birthdate.split("-");
    let date = {
      day: Number(separatedBirthdate[2]),
      month: Number(separatedBirthdate[1]),
      year: Number(separatedBirthdate[0]),
    };
    let isPalindrome = checkPalindromeForDateFormat(date);
    if (isPalindrome) {
      outputBox.value = "Your Birthday is a Palindrome";
    } else {
      let [count, nextDate] = getNextPalindrome(date);
      outputBox.value = `The next palindrome is ${nextDate.day}-${nextDate.month}-${nextDate.year}.You Missed it by ${count} days`;
      outputBox.style.backgroundColor = "#fff";
    }
  } else {
    outputBox.value = "Please select date";
    outputBox.style.backgroundColor = "red";
  }
};

checkBtn.addEventListener("click", clickHandler);
