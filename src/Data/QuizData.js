const QuizData = {
  Javascript: [
    {
      question: "Which keyword is used to declare variables in JavaScript?",
      options: ["var", "int", "string", "let"],
      correct_answer: "var",
    },
    {
      question:
        "What is the output of the following JavaScript code?\n\n```\nconsole.log(2 + '2');\n```\n",
      options: ["22", "4", "NaN", "TypeError"],
      correct_answer: "22",
    },
    {
      question:
        "Which method is used to add a new item to the end of an array in JavaScript?",
      options: ["append()", "push()", "addToEnd()", "insert()"],
      correct_answer: "push()",
    },
    {
      question:
        "What will the following JavaScript code output?\n\n```\nconsole.log(typeof NaN);\n```\n",
      options: ["number", "NaN", "undefined", "string"],
      correct_answer: "number",
    },
    {
      question:
        "In JavaScript, which function is used to parse a string into an integer?",
      options: ["parseInt()", "parseInteger()", "intParse()", "toInteger()"],
      correct_answer: "parseInt()",
    },
  ],
  Python: [
    {
      question:
        "Which of the following is a correct way to comment a single line in Python?",
      options: ["/* comment */", "# comment", "// comment", "*/ comment /*"],
      correct_answer: "# comment",
    },
    {
      question:
        "What is the output of the following Python code?\n\n```\nprint('hello'[::-1])\n```\n",
      options: ["hello", "olleh", "SyntaxError", "None of the above"],
      correct_answer: "olleh",
    },
    {
      question: "Which data type in Python is mutable?",
      options: ["int", "list", "tuple", "str"],
      correct_answer: "list",
    },
    {
      question: "What does the 'range()' function return in Python?",
      options: ["a list", "a tuple", "an iterator", "a dictionary"],
      correct_answer: "an iterator",
    },
    {
      question:
        "Which of the following is used to create a function in Python?",
      options: ["def", "fun", "function", "define"],
      correct_answer: "def",
    },
  ],
};

export default QuizData;
