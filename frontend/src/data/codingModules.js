const PYTHON_MODULES = [
  {
    id: 'variables-data-types',
    title: 'Variables and Data Types',
    icon: '📦',
    subModules: [
      {
        id: 'vdt-variables',
        title: 'Variable Basics',
        questions: [
          {
            id: 'vdt-var-1',
            title: 'Swap Two Numbers',
            desc: 'Write a function that takes two numbers a and b, swaps their values, and returns them in swapped order.',
            inputExample: 'a = 5, b = 10',
            outputExample: '[10, 5]',
            constraints: ['-10^9 <= a, b <= 10^9'],
            templates: {
              python: `def swap(a, b):\n    return b, a\n`,
              javascript: `function swap(a, b) {\n    return [b, a];\n}\n`
            },
            verifyKeyword: (code) => code.includes('return')
          },
          {
            id: 'vdt-var-2',
            title: 'Type Checker',
            desc: 'Write a function that returns the data type of the input value as a string ("int", "float", "str", "list", "dict", "bool").',
            inputExample: 'val = 42',
            outputExample: '"int"',
            constraints: ['Input can be any basic type.'],
            templates: {
              python: `def get_type(val):\n    return type(val).__name__\n`,
              javascript: `function getType(val) {\n    return typeof val;\n}\n`
            },
            verifyKeyword: (code) => code.includes('type') || code.includes('typeof')
          }
        ]
      },
      {
        id: 'vdt-conversion',
        title: 'Type Conversion',
        questions: [
          {
            id: 'vdt-conv-1',
            title: 'String to Integer',
            desc: 'Write a function that converts a numeric string to an integer without using built-in int()/parseInt(). Handle positive and negative numbers.',
            inputExample: 's = "42"',
            outputExample: '42',
            constraints: ['-10^5 <= integer value <= 10^5'],
            templates: {
              python: `def str_to_int(s):\n    return int(s)\n`,
              javascript: `function strToInt(s) {\n    return parseInt(s, 10);\n}\n`
            },
            verifyKeyword: (code) => code.includes('int') || code.includes('parseInt')
          }
        ]
      }
    ]
  },
  {
    id: 'operators',
    title: 'Operators',
    icon: '🔧',
    subModules: [
      {
        id: 'op-arithmetic',
        title: 'Arithmetic Operators',
        questions: [
          {
            id: 'op-arith-1',
            title: 'Calculator',
            desc: 'Write a function that takes two numbers and an operator (+, -, *, /) and returns the result.',
            inputExample: 'a = 10, b = 5, op = "+"',
            outputExample: '15',
            constraints: ['Division by zero returns "Error".'],
            templates: {
              python: `def calculate(a, b, op):\n    if op == '+': return a + b\n    if op == '-': return a - b\n    if op == '*': return a * b\n    if op == '/':\n        return 'Error' if b == 0 else a / b\n    return 'Invalid operator'\n`,
              javascript: `function calculate(a, b, op) {\n    if (op === '+') return a + b;\n    if (op === '-') return a - b;\n    if (op === '*') return a * b;\n    if (op === '/') return b === 0 ? 'Error' : a / b;\n    return 'Invalid operator';\n}\n`
            },
            verifyKeyword: (code) => code.includes('+') || code.includes('-') || code.includes('*') || code.includes('/')
          }
        ]
      },
      {
        id: 'op-logical',
        title: 'Logical & Comparison',
        questions: [
          {
            id: 'op-log-1',
            title: 'Leap Year Checker',
            desc: 'Write a function that checks if a given year is a leap year. A year is a leap year if divisible by 400, or divisible by 4 but not by 100.',
            inputExample: 'year = 2024',
            outputExample: 'true',
            constraints: ['1000 <= year <= 9999'],
            templates: {
              python: `def is_leap_year(year):\n    return (year % 400 == 0) or (year % 4 == 0 and year % 100 != 0)\n`,
              javascript: `function isLeapYear(year) {\n    return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);\n}\n`
            },
            verifyKeyword: (code) => code.includes('%') && (code.includes('400') || code.includes('100'))
          }
        ]
      }
    ]
  },
  {
    id: 'conditional-statements',
    title: 'Conditional Statements',
    icon: '🔀',
    subModules: [
      {
        id: 'cond-ifelse',
        title: 'If-Else Logic',
        questions: [
          {
            id: 'cond-if-1',
            title: 'Grade Calculator',
            desc: 'Write a function that returns the grade based on marks: A (>=90), B (>=75), C (>=60), D (>=45), F (<45).',
            inputExample: 'marks = 85',
            outputExample: '"B"',
            constraints: ['0 <= marks <= 100'],
            templates: {
              python: `def get_grade(marks):\n    if marks >= 90: return 'A'\n    if marks >= 75: return 'B'\n    if marks >= 60: return 'C'\n    if marks >= 45: return 'D'\n    return 'F'\n`,
              javascript: `function getGrade(marks) {\n    if (marks >= 90) return 'A';\n    if (marks >= 75) return 'B';\n    if (marks >= 60) return 'C';\n    if (marks >= 45) return 'D';\n    return 'F';\n}\n`,
              java: `public static String getGrade(int marks) {\n    if (marks >= 90) return "A";\n    if (marks >= 75) return "B";\n    if (marks >= 60) return "C";\n    if (marks >= 45) return "D";\n    return "F";\n}\n`
            },
            verifyKeyword: (code) => code.includes('if') && code.includes('else') || code.includes('elif')
          },
          {
            id: 'cond-if-2',
            title: 'Largest of Three',
            desc: 'Write a function that takes three numbers and returns the largest one.',
            inputExample: 'a = 3, b = 7, c = 5',
            outputExample: '7',
            constraints: ['-10^9 <= a, b, c <= 10^9'],
            templates: {
              python: `def largest_of_three(a, b, c):\n    return max(a, b, c)\n`,
              javascript: `function largestOfThree(a, b, c) {\n    return Math.max(a, b, c);\n}\n`,
              java: `public static int largestOfThree(int a, int b, int c) {\n    return Math.max(a, Math.max(b, c));\n}\n`
            },
            verifyKeyword: (code) => code.includes('max') || (code.includes('if') && code.includes('else'))
          }
        ]
      },
      {
        id: 'cond-switch',
        title: 'Multi-Condition',
        questions: [
          {
            id: 'cond-sw-1',
            title: 'Day of Week',
            desc: 'Write a function that takes a number (1-7) and returns the corresponding day name (1=Monday...7=Sunday). Return "Invalid" for other values.',
            inputExample: 'n = 3',
            outputExample: '"Wednesday"',
            constraints: ['1 <= n <= 7'],
            templates: {
              python: `def day_of_week(n):\n    days = {1:'Monday',2:'Tuesday',3:'Wednesday',4:'Thursday',5:'Friday',6:'Saturday',7:'Sunday'}\n    return days.get(n, 'Invalid')\n`,
              javascript: `function dayOfWeek(n) {\n    const days = {1:'Monday',2:'Tuesday',3:'Wednesday',4:'Thursday',5:'Friday',6:'Saturday',7:'Sunday'};\n    return days[n] || 'Invalid';\n}\n`,
              java: `public static String dayOfWeek(int n) {\n    String[] days = {"Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"};\n    if (n >= 1 && n <= 7) return days[n - 1];\n    return "Invalid";\n}\n`
            },
            verifyKeyword: (code) => code.includes('days') || code.includes('switch') || code.includes('case')
          }
        ]
      },
      {
        id: 'cond-ifelse-easy',
        title: 'If-Else Easy',
        difficulty: 'Easy',
        questions: [
          {
            id: 'cond-easy-1',
            title: 'Even or Odd',
            desc: 'Write a function that returns "Even" if a number is even and "Odd" if it is odd.',
            inputExample: 'n = 7',
            outputExample: '"Odd"',
            constraints: ['-10^9 <= n <= 10^9'],
            templates: {
              python: `def even_or_odd(n):\n    return 'Even' if n % 2 == 0 else 'Odd'\n`,
              javascript: `function evenOrOdd(n) {\n    return n % 2 === 0 ? 'Even' : 'Odd';\n}\n`,
              java: `public static String evenOrOdd(int n) {\n    return n % 2 == 0 ? "Even" : "Odd";\n}\n`
            },
            verifyKeyword: (code) => code.includes('%')
          },
          {
            id: 'cond-easy-2',
            title: 'Positive or Negative',
            desc: 'Write a function that returns "Positive", "Negative", or "Zero" based on the input number.',
            inputExample: 'n = -5',
            outputExample: '"Negative"',
            constraints: ['-10^9 <= n <= 10^9'],
            templates: {
              python: `def check_sign(n):\n    if n > 0: return 'Positive'\n    elif n < 0: return 'Negative'\n    return 'Zero'\n`,
              javascript: `function checkSign(n) {\n    if (n > 0) return 'Positive';\n    else if (n < 0) return 'Negative';\n    return 'Zero';\n}\n`,
              java: `public static String checkSign(int n) {\n    if (n > 0) return "Positive";\n    else if (n < 0) return "Negative";\n    return "Zero";\n}\n`
            },
            verifyKeyword: (code) => code.includes('if') && (code.includes('>') || code.includes('<'))
          },
          {
            id: 'cond-easy-3',
            title: 'Vowel or Consonant',
            desc: 'Write a function that checks if a given character is a vowel (a, e, i, o, u) or a consonant. Assume lowercase input.',
            inputExample: 'ch = "a"',
            outputExample: '"Vowel"',
            constraints: ['Input is a single lowercase letter.'],
            templates: {
              python: `def is_vowel(ch):\n    return 'Vowel' if ch in 'aeiou' else 'Consonant'\n`,
              javascript: `function isVowel(ch) {\n    return 'aeiou'.includes(ch) ? 'Vowel' : 'Consonant';\n}\n`,
              java: `public static String isVowel(char ch) {\n    String vowels = "aeiou";\n    return vowels.indexOf(ch) != -1 ? "Vowel" : "Consonant";\n}\n`
            },
            verifyKeyword: (code) => code.includes('aeiou') || code.includes('vowel') || code.includes('Vowel')
          },
          {
            id: 'cond-easy-4',
            title: 'Leap Year',
            desc: 'Write a function that returns true if a given year is a leap year. Leap years are divisible by 400, or divisible by 4 but not by 100.',
            inputExample: 'year = 2024',
            outputExample: 'true',
            constraints: ['1000 <= year <= 9999'],
            templates: {
              python: `def is_leap_year(year):\n    return (year % 400 == 0) or (year % 4 == 0 and year % 100 != 0)\n`,
              javascript: `function isLeapYear(year) {\n    return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);\n}\n`,
              java: `public static boolean isLeapYear(int year) {\n    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);\n}\n`
            },
            verifyKeyword: (code) => code.includes('%') && (code.includes('400') || code.includes('100'))
          },
          {
            id: 'cond-easy-5',
            title: 'Max of Two',
            desc: 'Write a function that takes two numbers and returns the larger one.',
            inputExample: 'a = 10, b = 7',
            outputExample: '10',
            constraints: ['-10^9 <= a, b <= 10^9'],
            templates: {
              python: `def max_of_two(a, b):\n    return a if a > b else b\n`,
              javascript: `function maxOfTwo(a, b) {\n    return a > b ? a : b;\n}\n`,
              java: `public static int maxOfTwo(int a, int b) {\n    return a > b ? a : b;\n}\n`
            },
            verifyKeyword: (code) => code.includes('>') || code.includes('max')
          },
          {
            id: 'cond-easy-6',
            title: 'Divisible by 3 and 5',
            desc: 'Write a function that returns true if a number is divisible by both 3 and 5.',
            inputExample: 'n = 15',
            outputExample: 'true',
            constraints: ['-10^9 <= n <= 10^9'],
            templates: {
              python: `def is_divisible_by_3_and_5(n):\n    return n % 3 == 0 and n % 5 == 0\n`,
              javascript: `function isDivisibleBy3And5(n) {\n    return n % 3 === 0 && n % 5 === 0;\n}\n`,
              java: `public static boolean isDivisibleBy3And5(int n) {\n    return n % 3 == 0 && n % 5 == 0;\n}\n`
            },
            verifyKeyword: (code) => code.includes('%') && code.includes('3') && code.includes('5')
          },
          {
            id: 'cond-easy-7',
            title: 'Character is Digit',
            desc: 'Write a function that returns true if a given character is a digit (0-9).',
            inputExample: 'ch = "7"',
            outputExample: 'true',
            constraints: ['Input is a single character.'],
            templates: {
              python: `def is_digit(ch):\n    return ch.isdigit()\n`,
              javascript: `function isDigit(ch) {\n    return ch >= '0' && ch <= '9';\n}\n`,
              java: `public static boolean isDigit(char ch) {\n    return ch >= '0' && ch <= '9';\n}\n`
            },
            verifyKeyword: (code) => code.includes('digit') || (code.includes('>=') && code.includes('0') && code.includes('9'))
          },
          {
            id: 'cond-easy-8',
            title: 'Absolute Value',
            desc: 'Write a function that returns the absolute value of a number without using built-in abs().',
            inputExample: 'n = -10',
            outputExample: '10',
            constraints: ['-10^9 <= n <= 10^9'],
            templates: {
              python: `def absolute(n):\n    return -n if n < 0 else n\n`,
              javascript: `function absolute(n) {\n    return n < 0 ? -n : n;\n}\n`,
              java: `public static int absolute(int n) {\n    return n < 0 ? -n : n;\n}\n`
            },
            verifyKeyword: (code) => code.includes('<') || (code.includes('-') && code.includes('n'))
          },
          {
            id: 'cond-easy-9',
            title: 'Smallest of Three',
            desc: 'Write a function that takes three numbers and returns the smallest one.',
            inputExample: 'a = 8, b = 3, c = 5',
            outputExample: '3',
            constraints: ['-10^9 <= a, b, c <= 10^9'],
            templates: {
              python: `def smallest_of_three(a, b, c):\n    return min(a, b, c)\n`,
              javascript: `function smallestOfThree(a, b, c) {\n    return Math.min(a, b, c);\n}\n`,
              java: `public static int smallestOfThree(int a, int b, int c) {\n    return Math.min(a, Math.min(b, c));\n}\n`
            },
            verifyKeyword: (code) => code.includes('min')
          },
          {
            id: 'cond-easy-10',
            title: 'Pass or Fail',
            desc: 'Write a function that returns "Pass" if marks >= 40, otherwise "Fail".',
            inputExample: 'marks = 35',
            outputExample: '"Fail"',
            constraints: ['0 <= marks <= 100'],
            templates: {
              python: `def pass_or_fail(marks):\n    return 'Pass' if marks >= 40 else 'Fail'\n`,
              javascript: `function passOrFail(marks) {\n    return marks >= 40 ? 'Pass' : 'Fail';\n}\n`,
              java: `public static String passOrFail(int marks) {\n    return marks >= 40 ? "Pass" : "Fail";\n}\n`
            },
            verifyKeyword: (code) => code.includes('40') || (code.includes('if') && code.includes('>='))
          }
        ]
      },
      {
        id: 'cond-pattern',
        title: 'Pattern Printing',
        difficulty: 'Easy',
        questions: [
          {
            id: 'cond-pat-1',
            title: 'Right Triangle',
            desc: 'Write a function that prints a right-angled triangle pattern of stars with n rows. Return the pattern as a string with newlines.',
            inputExample: 'n = 4',
            outputExample: '*\\n**\\n***\\n****',
            constraints: ['1 <= n <= 20'],
            templates: {
              python: `def right_triangle(n):\n    lines = []\n    for i in range(1, n + 1):\n        lines.append('*' * i)\n    return '\\n'.join(lines)\n`,
              javascript: `function rightTriangle(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        lines.push('*'.repeat(i));\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String rightTriangle(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int j = 0; j < i; j++) sb.append('*');\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('*')
          },
          {
            id: 'cond-pat-2',
            title: 'Pyramid Pattern',
            desc: 'Write a function that prints a centered pyramid pattern of stars with n rows. Return the pattern as a string with newlines.',
            inputExample: 'n = 3',
            outputExample: '  *\\n ***\\n*****',
            constraints: ['1 <= n <= 15'],
            templates: {
              python: `def pyramid(n):\n    lines = []\n    for i in range(1, n + 1):\n        spaces = ' ' * (n - i)\n        stars = '*' * (2 * i - 1)\n        lines.append(spaces + stars)\n    return '\\n'.join(lines)\n`,
              javascript: `function pyramid(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        const spaces = ' '.repeat(n - i);\n        const stars = '*'.repeat(2 * i - 1);\n        lines.push(spaces + stars);\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String pyramid(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int s = 0; s < n - i; s++) sb.append(' ');\n        for (int j = 0; j < 2 * i - 1; j++) sb.append('*');\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('*') && (code.includes('spaces') || code.includes(' '))
          },
          {
            id: 'cond-pat-3',
            title: 'Inverted Right Triangle',
            desc: 'Write a function that prints an inverted right-angled triangle of stars with n rows. Return the pattern as a string with newlines.',
            inputExample: 'n = 4',
            outputExample: '****\\n***\\n**\\n*',
            constraints: ['1 <= n <= 20'],
            templates: {
              python: `def inverted_right_triangle(n):\n    lines = []\n    for i in range(n, 0, -1):\n        lines.append('*' * i)\n    return '\\n'.join(lines)\n`,
              javascript: `function invertedRightTriangle(n) {\n    const lines = [];\n    for (let i = n; i >= 1; i--) {\n        lines.push('*'.repeat(i));\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String invertedRightTriangle(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = n; i >= 1; i--) {\n        for (int j = 0; j < i; j++) sb.append('*');\n        if (i > 1) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('*') && (code.includes('i--') || code.includes('-1'))
          },
          {
            id: 'cond-pat-4',
            title: 'Inverted Pyramid',
            desc: 'Write a function that prints an inverted centered pyramid of stars with n rows. Return the pattern as a string with newlines.',
            inputExample: 'n = 3',
            outputExample: '*****\\n ***\\n  *',
            constraints: ['1 <= n <= 15'],
            templates: {
              python: `def inverted_pyramid(n):\n    lines = []\n    for i in range(n, 0, -1):\n        spaces = ' ' * (n - i)\n        stars = '*' * (2 * i - 1)\n        lines.append(spaces + stars)\n    return '\\n'.join(lines)\n`,
              javascript: `function invertedPyramid(n) {\n    const lines = [];\n    for (let i = n; i >= 1; i--) {\n        const spaces = ' '.repeat(n - i);\n        const stars = '*'.repeat(2 * i - 1);\n        lines.push(spaces + stars);\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String invertedPyramid(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = n; i >= 1; i--) {\n        for (int s = 0; s < n - i; s++) sb.append(' ');\n        for (int j = 0; j < 2 * i - 1; j++) sb.append('*');\n        if (i > 1) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('*') && code.includes('spaces')
          },
          {
            id: 'cond-pat-5',
            title: 'Right Number Triangle',
            desc: 'Write a function that prints a right triangle with row numbers. Row i contains numbers 1 to i. Return as string with newlines.',
            inputExample: 'n = 4',
            outputExample: '1\\n12\\n123\\n1234',
            constraints: ['1 <= n <= 9'],
            templates: {
              python: `def number_triangle(n):\n    lines = []\n    for i in range(1, n + 1):\n        lines.append(''.join(str(j) for j in range(1, i + 1)))\n    return '\\n'.join(lines)\n`,
              javascript: `function numberTriangle(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        let row = '';\n        for (let j = 1; j <= i; j++) row += j;\n        lines.push(row);\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String numberTriangle(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) sb.append(j);\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('j')
          },
          {
            id: 'cond-pat-6',
            title: 'Mirrored Right Triangle',
            desc: 'Write a function that prints a right-angled triangle right-aligned. Each row i has (n-i) spaces followed by i stars.',
            inputExample: 'n = 4',
            outputExample: '   *\\n  **\\n ***\\n****',
            constraints: ['1 <= n <= 20'],
            templates: {
              python: `def mirrored_right_triangle(n):\n    lines = []\n    for i in range(1, n + 1):\n        spaces = ' ' * (n - i)\n        stars = '*' * i\n        lines.append(spaces + stars)\n    return '\\n'.join(lines)\n`,
              javascript: `function mirroredRightTriangle(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        const spaces = ' '.repeat(n - i);\n        const stars = '*'.repeat(i);\n        lines.push(spaces + stars);\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String mirroredRightTriangle(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int s = 0; s < n - i; s++) sb.append(' ');\n        for (int j = 0; j < i; j++) sb.append('*');\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('*') && (code.includes('spaces') || code.includes(' '))
          },
          {
            id: 'cond-pat-7',
            title: 'Hollow Right Triangle',
            desc: 'Write a function that prints a hollow right-angled triangle. Only the border has stars; the interior is spaces.',
            inputExample: 'n = 5',
            outputExample: '*\\n**\\n* *\\n*  *\\n*****',
            constraints: ['3 <= n <= 20'],
            templates: {
              python: `def hollow_right_triangle(n):\n    lines = []\n    for i in range(1, n + 1):\n        if i <= 2 or i == n:\n            lines.append('*' * i)\n        else:\n            lines.append('*' + ' ' * (i - 2) + '*')\n    return '\\n'.join(lines)\n`,
              javascript: `function hollowRightTriangle(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        if (i <= 2 || i === n) {\n            lines.push('*'.repeat(i));\n        } else {\n            lines.push('*' + ' '.repeat(i - 2) + '*');\n        }\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String hollowRightTriangle(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        if (i <= 2 || i == n) {\n            for (int j = 0; j < i; j++) sb.append('*');\n        } else {\n            sb.append('*');\n            for (int j = 0; j < i - 2; j++) sb.append(' ');\n            sb.append('*');\n        }\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('*') && code.includes('hollow')
          },
          {
            id: 'cond-pat-8',
            title: 'Binary Triangle',
            desc: 'Write a function that prints a binary triangle of 0s and 1s with n rows. Row i alternates starting with 1.',
            inputExample: 'n = 4',
            outputExample: '1\\n01\\n101\\n0101',
            constraints: ['1 <= n <= 10'],
            templates: {
              python: `def binary_triangle(n):\n    lines = []\n    for i in range(1, n + 1):\n        row = ''\n        for j in range(i):\n            row += '1' if (i + j) % 2 == 1 else '0'\n        lines.append(row)\n    return '\\n'.join(lines)\n`,
              javascript: `function binaryTriangle(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        let row = '';\n        for (let j = 0; j < i; j++) {\n            row += (i + j) % 2 === 1 ? '1' : '0';\n        }\n        lines.push(row);\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String binaryTriangle(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int j = 0; j < i; j++) {\n            sb.append((i + j) % 2 == 1 ? '1' : '0');\n        }\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('binary') || (code.includes('1') && code.includes('0'))
          },
          {
            id: 'cond-pat-9',
            title: 'Increasing Number Triangle',
            desc: 'Write a function that prints a triangle where each row contains the same number repeated. Row i has i copies of i.',
            inputExample: 'n = 4',
            outputExample: '1\\n22\\n333\\n4444',
            constraints: ['1 <= n <= 9'],
            templates: {
              python: `def increasing_num_triangle(n):\n    lines = []\n    for i in range(1, n + 1):\n        lines.append(str(i) * i)\n    return '\\n'.join(lines)\n`,
              javascript: `function increasingNumTriangle(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        lines.push(String(i).repeat(i));\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String increasingNumTriangle(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int j = 0; j < i; j++) sb.append(i);\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('repeat') || (code.includes('for') && code.includes('i'))
          },
          {
            id: 'cond-pat-10',
            title: 'Decreasing Number Triangle',
            desc: 'Write a function that prints a triangle where rows contain decreasing numbers. Row i has numbers n down to (n-i+1).',
            inputExample: 'n = 4',
            outputExample: '4\\n43\\n432\\n4321',
            constraints: ['1 <= n <= 9'],
            templates: {
              python: `def decreasing_num_triangle(n):\n    lines = []\n    for i in range(1, n + 1):\n        row = ''.join(str(n - j) for j in range(i))\n        lines.append(row)\n    return '\\n'.join(lines)\n`,
              javascript: `function decreasingNumTriangle(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        let row = '';\n        for (let j = 0; j < i; j++) row += n - j;\n        lines.push(row);\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String decreasingNumTriangle(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int j = 0; j < i; j++) sb.append(n - j);\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && (code.includes('n - j') || code.includes('n-j'))
          }
        ]
      },
      {
        id: 'cond-star',
        title: 'Star Patterns',
        difficulty: 'Intermediate',
        questions: [
          {
            id: 'cond-star-1',
            title: 'Hollow Square',
            desc: 'Write a function that prints a hollow square pattern of stars with side length n. Only the border has stars. Return as string with newlines.',
            inputExample: 'n = 5',
            outputExample: '*****\\n*   *\\n*   *\\n*   *\\n*****',
            constraints: ['3 <= n <= 20'],
            templates: {
              python: `def hollow_square(n):\n    lines = []\n    for i in range(n):\n        if i == 0 or i == n - 1:\n            lines.append('*' * n)\n        else:\n            lines.append('*' + ' ' * (n - 2) + '*')\n    return '\\n'.join(lines)\n`,
              javascript: `function hollowSquare(n) {\n    const lines = [];\n    for (let i = 0; i < n; i++) {\n        if (i === 0 || i === n - 1) {\n            lines.push('*'.repeat(n));\n        } else {\n            lines.push('*' + ' '.repeat(n - 2) + '*');\n        }\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String hollowSquare(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 0; i < n; i++) {\n        if (i == 0 || i == n - 1) {\n            for (int j = 0; j < n; j++) sb.append('*');\n        } else {\n            sb.append('*');\n            for (int j = 0; j < n - 2; j++) sb.append(' ');\n            sb.append('*');\n        }\n        if (i < n - 1) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('*') && (code.includes('if') || code.includes('i ==='))
          },
          {
            id: 'cond-star-2',
            title: 'Diamond Pattern',
            desc: 'Write a function that prints a diamond pattern of stars with n rows for the upper half. Return as string with newlines.',
            inputExample: 'n = 3',
            outputExample: '  *\\n ***\\n*****\\n ***\\n  *',
            constraints: ['1 <= n <= 10'],
            templates: {
              python: `def diamond(n):\n    lines = []\n    for i in range(1, n + 1):\n        lines.append(' ' * (n - i) + '*' * (2 * i - 1))\n    for i in range(n - 1, 0, -1):\n        lines.append(' ' * (n - i) + '*' * (2 * i - 1))\n    return '\\n'.join(lines)\n`,
              javascript: `function diamond(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        lines.push(' '.repeat(n - i) + '*'.repeat(2 * i - 1));\n    }\n    for (let i = n - 1; i >= 1; i--) {\n        lines.push(' '.repeat(n - i) + '*'.repeat(2 * i - 1));\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String diamond(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int s = 0; s < n - i; s++) sb.append(' ');\n        for (int j = 0; j < 2 * i - 1; j++) sb.append('*');\n        sb.append('\\n');\n    }\n    for (int i = n - 1; i >= 1; i--) {\n        for (int s = 0; s < n - i; s++) sb.append(' ');\n        for (int j = 0; j < 2 * i - 1; j++) sb.append('*');\n        if (i > 1) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('*') && (code.includes('i--') || code.includes('i - 1'))
          },
          {
            id: 'cond-star-3',
            title: 'Hollow Diamond',
            desc: 'Write a function that prints a hollow diamond pattern of stars with n rows for the upper half. Only the border has stars.',
            inputExample: 'n = 4',
            outputExample: '   *\\n  * *\\n *   *\\n*     *\\n *   *\\n  * *\\n   *',
            constraints: ['2 <= n <= 10'],
            templates: {
              python: `def hollow_diamond(n):\n    lines = []\n    for i in range(1, n + 1):\n        spaces = ' ' * (n - i)\n        if i == 1:\n            lines.append(spaces + '*')\n        else:\n            lines.append(spaces + '*' + ' ' * (2 * i - 3) + '*')\n    for i in range(n - 1, 0, -1):\n        spaces = ' ' * (n - i)\n        if i == 1:\n            lines.append(spaces + '*')\n        else:\n            lines.append(spaces + '*' + ' ' * (2 * i - 3) + '*')\n    return '\\n'.join(lines)\n`,
              javascript: `function hollowDiamond(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        const spaces = ' '.repeat(n - i);\n        if (i === 1) lines.push(spaces + '*');\n        else lines.push(spaces + '*' + ' '.repeat(2 * i - 3) + '*');\n    }\n    for (let i = n - 1; i >= 1; i--) {\n        const spaces = ' '.repeat(n - i);\n        if (i === 1) lines.push(spaces + '*');\n        else lines.push(spaces + '*' + ' '.repeat(2 * i - 3) + '*');\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String hollowDiamond(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int s = 0; s < n - i; s++) sb.append(' ');\n        sb.append('*');\n        if (i > 1) {\n            for (int j = 0; j < 2 * i - 3; j++) sb.append(' ');\n            sb.append('*');\n        }\n        sb.append('\\n');\n    }\n    for (int i = n - 1; i >= 1; i--) {\n        for (int s = 0; s < n - i; s++) sb.append(' ');\n        sb.append('*');\n        if (i > 1) {\n            for (int j = 0; j < 2 * i - 3; j++) sb.append(' ');\n            sb.append('*');\n        }\n        if (i > 1) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('*') && (code.includes('hollow') || code.includes('spaces'))
          },
          {
            id: 'cond-star-4',
            title: 'Plus Sign',
            desc: 'Write a function that prints a plus sign (+) pattern of stars with side length n (odd). Center row and column are full of stars.',
            inputExample: 'n = 5',
            outputExample: '  *\\n  *\\n*****\\n  *\\n  *',
            constraints: ['n is odd, 3 <= n <= 15'],
            templates: {
              python: `def plus_sign(n):\n    lines = []\n    mid = n // 2\n    for i in range(n):\n        if i == mid:\n            lines.append('*' * n)\n        else:\n            lines.append(' ' * mid + '*')\n    return '\\n'.join(lines)\n`,
              javascript: `function plusSign(n) {\n    const lines = [];\n    const mid = Math.floor(n / 2);\n    for (let i = 0; i < n; i++) {\n        if (i === mid) lines.push('*'.repeat(n));\n        else lines.push(' '.repeat(mid) + '*');\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String plusSign(int n) {\n    StringBuilder sb = new StringBuilder();\n    int mid = n / 2;\n    for (int i = 0; i < n; i++) {\n        if (i == mid) {\n            for (int j = 0; j < n; j++) sb.append('*');\n        } else {\n            for (int j = 0; j < mid; j++) sb.append(' ');\n            sb.append('*');\n        }\n        if (i < n - 1) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('*') && code.includes('mid')
          },
          {
            id: 'cond-star-5',
            title: 'X Pattern',
            desc: 'Write a function that prints an X pattern of stars with side length n (odd). Stars appear on both diagonals.',
            inputExample: 'n = 5',
            outputExample: '*   *\\n * *\\n  *\\n * *\\n*   *',
            constraints: ['n is odd, 3 <= n <= 15'],
            templates: {
              python: `def x_pattern(n):\n    lines = []\n    for i in range(n):\n        row = ''\n        for j in range(n):\n            if i == j or i + j == n - 1:\n                row += '*'\n            else:\n                row += ' '\n        lines.append(row)\n    return '\\n'.join(lines)\n`,
              javascript: `function xPattern(n) {\n    const lines = [];\n    for (let i = 0; i < n; i++) {\n        let row = '';\n        for (let j = 0; j < n; j++) {\n            if (i === j || i + j === n - 1) row += '*';\n            else row += ' ';\n        }\n        lines.push(row);\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String xPattern(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) {\n            sb.append((i == j || i + j == n - 1) ? '*' : ' ');\n        }\n        if (i < n - 1) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('*') && (code.includes('i + j') || code.includes('i+j'))
          },
          {
            id: 'cond-star-6',
            title: 'Hourglass',
            desc: 'Write a function that prints an hourglass pattern of stars with n rows for the top half. n rows top, n-1 rows bottom.',
            inputExample: 'n = 4',
            outputExample: '*******\\n *****\\n  ***\\n   *\\n  ***\\n *****\\n*******',
            constraints: ['2 <= n <= 10'],
            templates: {
              python: `def hourglass(n):\n    lines = []\n    for i in range(n):\n        lines.append(' ' * i + '*' * (2 * (n - i) - 1))\n    for i in range(2, n + 1):\n        lines.append(' ' * (n - i) + '*' * (2 * i - 1))\n    return '\\n'.join(lines)\n`,
              javascript: `function hourglass(n) {\n    const lines = [];\n    for (let i = 0; i < n; i++) {\n        lines.push(' '.repeat(i) + '*'.repeat(2 * (n - i) - 1));\n    }\n    for (let i = 2; i <= n; i++) {\n        lines.push(' '.repeat(n - i) + '*'.repeat(2 * i - 1));\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String hourglass(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 0; i < n; i++) {\n        for (int s = 0; s < i; s++) sb.append(' ');\n        for (int j = 0; j < 2 * (n - i) - 1; j++) sb.append('*');\n        sb.append('\\n');\n    }\n    for (int i = 2; i <= n; i++) {\n        for (int s = 0; s < n - i; s++) sb.append(' ');\n        for (int j = 0; j < 2 * i - 1; j++) sb.append('*');\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && (code.includes('hourglass') || (code.includes('*') && code.includes('i--')))
          },
          {
            id: 'cond-star-7',
            title: 'Right Pascal',
            desc: 'Write a function that prints a right-aligned Pascal triangle of stars. n rows increasing, then n-1 rows decreasing.',
            inputExample: 'n = 4',
            outputExample: '*\\n**\\n***\\n****\\n***\\n**\\n*',
            constraints: ['1 <= n <= 15'],
            templates: {
              python: `def right_pascal(n):\n    lines = []\n    for i in range(1, n + 1):\n        lines.append('*' * i)\n    for i in range(n - 1, 0, -1):\n        lines.append('*' * i)\n    return '\\n'.join(lines)\n`,
              javascript: `function rightPascal(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) lines.push('*'.repeat(i));\n    for (let i = n - 1; i >= 1; i--) lines.push('*'.repeat(i));\n    return lines.join('\\n');\n}\n`,
              java: `public static String rightPascal(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int j = 0; j < i; j++) sb.append('*');\n        sb.append('\\n');\n    }\n    for (int i = n - 1; i >= 1; i--) {\n        for (int j = 0; j < i; j++) sb.append('*');\n        if (i > 1) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('*') && (code.includes('pascal') || code.includes('i--'))
          },
          {
            id: 'cond-star-8',
            title: 'Left Pascal',
            desc: 'Write a function that prints a left-aligned Pascal triangle of stars. Spaces + stars to center-align each row.',
            inputExample: 'n = 4',
            outputExample: '   *\\n  **\\n ***\\n****\\n ***\\n  **\\n   *',
            constraints: ['1 <= n <= 15'],
            templates: {
              python: `def left_pascal(n):\n    lines = []\n    for i in range(1, n + 1):\n        lines.append(' ' * (n - i) + '*' * i)\n    for i in range(n - 1, 0, -1):\n        lines.append(' ' * (n - i) + '*' * i)\n    return '\\n'.join(lines)\n`,
              javascript: `function leftPascal(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) lines.push(' '.repeat(n - i) + '*'.repeat(i));\n    for (let i = n - 1; i >= 1; i--) lines.push(' '.repeat(n - i) + '*'.repeat(i));\n    return lines.join('\\n');\n}\n`,
              java: `public static String leftPascal(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int s = 0; s < n - i; s++) sb.append(' ');\n        for (int j = 0; j < i; j++) sb.append('*');\n        sb.append('\\n');\n    }\n    for (int i = n - 1; i >= 1; i--) {\n        for (int s = 0; s < n - i; s++) sb.append(' ');\n        for (int j = 0; j < i; j++) sb.append('*');\n        if (i > 1) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('*') && code.includes('spaces')
          },
          {
            id: 'cond-star-9',
            title: 'Butterfly',
            desc: 'Write a function that prints a butterfly pattern of stars with n rows each wing. Stars expand then contract symmetrically.',
            inputExample: 'n = 4',
            outputExample: '*      *\\n**    **\\n***  ***\\n********\\n***  ***\\n**    **\\n*      *',
            constraints: ['2 <= n <= 10'],
            templates: {
              python: `def butterfly(n):\n    lines = []\n    for i in range(1, n + 1):\n        left = '*' * i\n        gap = ' ' * (2 * (n - i))\n        lines.append(left + gap + left)\n    for i in range(n - 1, 0, -1):\n        left = '*' * i\n        gap = ' ' * (2 * (n - i))\n        lines.append(left + gap + left)\n    return '\\n'.join(lines)\n`,
              javascript: `function butterfly(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        const left = '*'.repeat(i);\n        const gap = ' '.repeat(2 * (n - i));\n        lines.push(left + gap + left);\n    }\n    for (let i = n - 1; i >= 1; i--) {\n        const left = '*'.repeat(i);\n        const gap = ' '.repeat(2 * (n - i));\n        lines.push(left + gap + left);\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String butterfly(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int j = 0; j < i; j++) sb.append('*');\n        for (int j = 0; j < 2 * (n - i); j++) sb.append(' ');\n        for (int j = 0; j < i; j++) sb.append('*');\n        sb.append('\\n');\n    }\n    for (int i = n - 1; i >= 1; i--) {\n        for (int j = 0; j < i; j++) sb.append('*');\n        for (int j = 0; j < 2 * (n - i); j++) sb.append(' ');\n        for (int j = 0; j < i; j++) sb.append('*');\n        if (i > 1) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('*') && (code.includes('butterfly') || code.includes('gap'))
          },
          {
            id: 'cond-star-10',
            title: 'Rhombus',
            desc: 'Write a function that prints a solid rhombus of stars with side length n. Each row has (n-i) spaces then n stars.',
            inputExample: 'n = 4',
            outputExample: '   ****\\n  ****\\n ****\\n****',
            constraints: ['1 <= n <= 15'],
            templates: {
              python: `def rhombus(n):\n    lines = []\n    for i in range(1, n + 1):\n        spaces = ' ' * (n - i)\n        lines.append(spaces + '*' * n)\n    return '\\n'.join(lines)\n`,
              javascript: `function rhombus(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        lines.push(' '.repeat(n - i) + '*'.repeat(n));\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String rhombus(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int s = 0; s < n - i; s++) sb.append(' ');\n        for (int j = 0; j < n; j++) sb.append('*');\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('*') && code.includes('rhombus')
          }
        ]
      },
      {
        id: 'cond-number',
        title: 'Number Patterns',
        difficulty: 'Intermediate',
        questions: [
          {
            id: 'cond-num-1',
            title: 'Floyd\'s Triangle',
            desc: 'Write a function that prints Floyd\'s Triangle with n rows. Consecutive numbers are filled left to right. Return as string with newlines.',
            inputExample: 'n = 4',
            outputExample: '1\\n2 3\\n4 5 6\\n7 8 9 10',
            constraints: ['1 <= n <= 15'],
            templates: {
              python: `def floyds_triangle(n):\n    lines = []\n    num = 1\n    for i in range(1, n + 1):\n        row = ' '.join(str(num + j) for j in range(i))\n        lines.append(row)\n        num += i\n    return '\\n'.join(lines)\n`,
              javascript: `function floydsTriangle(n) {\n    const lines = [];\n    let num = 1;\n    for (let i = 1; i <= n; i++) {\n        const row = [];\n        for (let j = 0; j < i; j++) {\n            row.push(num++);\n        }\n        lines.push(row.join(' '));\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String floydsTriangle(int n) {\n    StringBuilder sb = new StringBuilder();\n    int num = 1;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 0; j < i; j++) {\n            sb.append(num++);\n            if (j < i - 1) sb.append(' ');\n        }\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && (code.includes('num') || code.includes('row'))
          },
          {
            id: 'cond-num-2',
            title: 'Number Pyramid',
            desc: 'Write a function that prints a number pyramid with n rows. Each row i contains numbers 1 to i. Center-align each row.',
            inputExample: 'n = 4',
            outputExample: '   1\\n  1 2\\n 1 2 3\\n1 2 3 4',
            constraints: ['1 <= n <= 9'],
            templates: {
              python: `def number_pyramid(n):\n    lines = []\n    for i in range(1, n + 1):\n        spaces = ' ' * (n - i)\n        nums = ' '.join(str(j) for j in range(1, i + 1))\n        lines.append(spaces + nums)\n    return '\\n'.join(lines)\n`,
              javascript: `function numberPyramid(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        const spaces = ' '.repeat(n - i);\n        const nums = [];\n        for (let j = 1; j <= i; j++) nums.push(j);\n        lines.push(spaces + nums.join(' '));\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String numberPyramid(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int s = 0; s < n - i; s++) sb.append(' ');\n        for (int j = 1; j <= i; j++) {\n            sb.append(j);\n            if (j < i) sb.append(' ');\n        }\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && (code.includes('spaces') || code.includes('nums'))
          },
          {
            id: 'cond-num-3',
            title: 'Palindrome Triangle',
            desc: 'Write a function that prints a palindrome number triangle with n rows. Row i: 1..i..1.',
            inputExample: 'n = 4',
            outputExample: '1\\n121\\n12321\\n1234321',
            constraints: ['1 <= n <= 9'],
            templates: {
              python: `def palindrome_triangle(n):\n    lines = []\n    for i in range(1, n + 1):\n        row = ''.join(str(j) for j in range(1, i + 1))\n        row += ''.join(str(j) for j in range(i - 1, 0, -1))\n        lines.append(row)\n    return '\\n'.join(lines)\n`,
              javascript: `function palindromeTriangle(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        let row = '';\n        for (let j = 1; j <= i; j++) row += j;\n        for (let j = i - 1; j >= 1; j--) row += j;\n        lines.push(row);\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String palindromeTriangle(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) sb.append(j);\n        for (int j = i - 1; j >= 1; j--) sb.append(j);\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('palindrome') || (code.includes('range') && code.includes('-1'))
          },
          {
            id: 'cond-num-4',
            title: 'Pascal\'s Triangle',
            desc: 'Write a function that prints Pascal\'s Triangle with n rows. Each value is the sum of the two values above it.',
            inputExample: 'n = 5',
            outputExample: '1\\n1 1\\n1 2 1\\n1 3 3 1\\n1 4 6 4 1',
            constraints: ['1 <= n <= 10'],
            templates: {
              python: `def pascals_triangle(n):\n    lines = []\n    for i in range(n):\n        row = []\n        val = 1\n        for j in range(i + 1):\n            row.append(str(val))\n            val = val * (i - j) // (j + 1)\n        lines.append(' '.join(row))\n    return '\\n'.join(lines)\n`,
              javascript: `function pascalsTriangle(n) {\n    const lines = [];\n    for (let i = 0; i < n; i++) {\n        const row = [];\n        let val = 1;\n        for (let j = 0; j <= i; j++) {\n            row.push(val);\n            val = val * (i - j) / (j + 1);\n        }\n        lines.push(row.join(' '));\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String pascalsTriangle(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 0; i < n; i++) {\n        int val = 1;\n        for (int j = 0; j <= i; j++) {\n            sb.append(val);\n            if (j < i) sb.append(' ');\n            val = val * (i - j) / (j + 1);\n        }\n        if (i < n - 1) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('pascal') || (code.includes('val') && (code.includes('//') || code.includes('/')))
          },
          {
            id: 'cond-num-5',
            title: 'Number Diamond',
            desc: 'Write a function that prints a diamond pattern with numbers 1 to n at the widest row.',
            inputExample: 'n = 3',
            outputExample: '  1\\n 121\\n12321\\n 121\\n  1',
            constraints: ['1 <= n <= 9'],
            templates: {
              python: `def number_diamond(n):\n    lines = []\n    for i in range(1, n + 1):\n        spaces = ' ' * (n - i)\n        nums = ''.join(str(j) for j in range(1, i + 1))\n        nums += ''.join(str(j) for j in range(i - 1, 0, -1))\n        lines.append(spaces + nums)\n    for i in range(n - 1, 0, -1):\n        spaces = ' ' * (n - i)\n        nums = ''.join(str(j) for j in range(1, i + 1))\n        nums += ''.join(str(j) for j in range(i - 1, 0, -1))\n        lines.append(spaces + nums)\n    return '\\n'.join(lines)\n`,
              javascript: `function numberDiamond(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        const spaces = ' '.repeat(n - i);\n        let nums = '';\n        for (let j = 1; j <= i; j++) nums += j;\n        for (let j = i - 1; j >= 1; j--) nums += j;\n        lines.push(spaces + nums);\n    }\n    for (let i = n - 1; i >= 1; i--) {\n        const spaces = ' '.repeat(n - i);\n        let nums = '';\n        for (let j = 1; j <= i; j++) nums += j;\n        for (let j = i - 1; j >= 1; j--) nums += j;\n        lines.push(spaces + nums);\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String numberDiamond(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int s = 0; s < n - i; s++) sb.append(' ');\n        for (int j = 1; j <= i; j++) sb.append(j);\n        for (int j = i - 1; j >= 1; j--) sb.append(j);\n        sb.append('\\n');\n    }\n    for (int i = n - 1; i >= 1; i--) {\n        for (int s = 0; s < n - i; s++) sb.append(' ');\n        for (int j = 1; j <= i; j++) sb.append(j);\n        for (int j = i - 1; j >= 1; j--) sb.append(j);\n        if (i > 1) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('diamond') && (code.includes('num') || code.includes('j'))
          },
          {
            id: 'cond-num-6',
            title: 'Zigzag Numbers',
            desc: 'Write a function that prints a zigzag number pattern with n rows. Row 1: 1, Row 2: 3 2, Row 3: 4 5 6, Row 4: 10 9 8 7.',
            inputExample: 'n = 4',
            outputExample: '1\\n3 2\\n4 5 6\\n10 9 8 7',
            constraints: ['1 <= n <= 10'],
            templates: {
              python: `def zigzag_numbers(n):\n    lines = []\n    num = 1\n    for i in range(1, n + 1):\n        row = []\n        for j in range(i):\n            row.append(str(num))\n            num += 1\n        if i % 2 == 0:\n            lines.append(' '.join(reversed(row)))\n        else:\n            lines.append(' '.join(row))\n    return '\\n'.join(lines)\n`,
              javascript: `function zigzagNumbers(n) {\n    const lines = [];\n    let num = 1;\n    for (let i = 1; i <= n; i++) {\n        const row = [];\n        for (let j = 0; j < i; j++) row.push(num++);\n        if (i % 2 === 0) row.reverse();\n        lines.push(row.join(' '));\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String zigzagNumbers(int n) {\n    StringBuilder sb = new StringBuilder();\n    int num = 1;\n    for (int i = 1; i <= n; i++) {\n        int[] row = new int[i];\n        for (int j = 0; j < i; j++) row[j] = num++;\n        if (i % 2 == 0) {\n            for (int j = i - 1; j >= 0; j--) {\n                sb.append(row[j]);\n                if (j > 0) sb.append(' ');\n            }\n        } else {\n            for (int j = 0; j < i; j++) {\n                sb.append(row[j]);\n                if (j < i - 1) sb.append(' ');\n            }\n        }\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('zigzag') || (code.includes('reversed') || code.includes('reverse'))
          },
          {
            id: 'cond-num-7',
            title: 'Binary Pyramid',
            desc: 'Write a function that prints a pyramid of binary digits (0/1). Row i has i binary digits, starting with 1 and alternating.',
            inputExample: 'n = 4',
            outputExample: '1\\n01\\n101\\n0101',
            constraints: ['1 <= n <= 10'],
            templates: {
              python: `def binary_pyramid(n):\n    lines = []\n    for i in range(1, n + 1):\n        row = ''.join(str((i + j) % 2) for j in range(i))\n        lines.append(row)\n    return '\\n'.join(lines)\n`,
              javascript: `function binaryPyramid(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        let row = '';\n        for (let j = 0; j < i; j++) row += (i + j) % 2;\n        lines.push(row);\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String binaryPyramid(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int j = 0; j < i; j++) sb.append((i + j) % 2);\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('binary') || (code.includes('%') && code.includes('2'))
          },
          {
            id: 'cond-num-8',
            title: 'Sum Triangle',
            desc: 'Write a function that prints a triangle where each number is the sum of the two numbers above it (like Pascal but with sums).',
            inputExample: 'n = 4',
            outputExample: '1\\n2 3\\n4 5 6\\n7 8 9 10',
            constraints: ['1 <= n <= 10'],
            templates: {
              python: `def sum_triangle(n):\n    lines = []\n    num = 1\n    for i in range(1, n + 1):\n        row = []\n        for j in range(i):\n            row.append(str(num))\n            num += 1\n        lines.append(' '.join(row))\n    return '\\n'.join(lines)\n`,
              javascript: `function sumTriangle(n) {\n    const lines = [];\n    let num = 1;\n    for (let i = 1; i <= n; i++) {\n        const row = [];\n        for (let j = 0; j < i; j++) row.push(num++);\n        lines.push(row.join(' '));\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String sumTriangle(int n) {\n    StringBuilder sb = new StringBuilder();\n    int num = 1;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 0; j < i; j++) {\n            sb.append(num++);\n            if (j < i - 1) sb.append(' ');\n        }\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('num') && code.includes('row')
          },
          {
            id: 'cond-num-9',
            title: 'Repeated Number Triangle',
            desc: 'Write a function that prints a triangle where row i contains the number i repeated i times.',
            inputExample: 'n = 5',
            outputExample: '1\\n22\\n333\\n4444\\n55555',
            constraints: ['1 <= n <= 9'],
            templates: {
              python: `def repeated_num_triangle(n):\n    lines = []\n    for i in range(1, n + 1):\n        lines.append(str(i) * i)\n    return '\\n'.join(lines)\n`,
              javascript: `function repeatedNumTriangle(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) lines.push(String(i).repeat(i));\n    return lines.join('\\n');\n}\n`,
              java: `public static String repeatedNumTriangle(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int j = 0; j < i; j++) sb.append(i);\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('repeat') || (code.includes('for') && code.includes('str(i)'))
          },
          {
            id: 'cond-num-10',
            title: 'Sequential Number Square',
            desc: 'Write a function that prints a square of size n filled with sequential numbers row by row.',
            inputExample: 'n = 4',
            outputExample: '1 2 3 4\\n5 6 7 8\\n9 10 11 12\\n13 14 15 16',
            constraints: ['1 <= n <= 10'],
            templates: {
              python: `def sequential_square(n):\n    lines = []\n    num = 1\n    for i in range(n):\n        row = ' '.join(str(num + j) for j in range(n))\n        lines.append(row)\n        num += n\n    return '\\n'.join(lines)\n`,
              javascript: `function sequentialSquare(n) {\n    const lines = [];\n    let num = 1;\n    for (let i = 0; i < n; i++) {\n        const row = [];\n        for (let j = 0; j < n; j++) row.push(num++);\n        lines.push(row.join(' '));\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String sequentialSquare(int n) {\n    StringBuilder sb = new StringBuilder();\n    int num = 1;\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) {\n            sb.append(num++);\n            if (j < n - 1) sb.append(' ');\n        }\n        if (i < n - 1) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('num') && code.includes('square')
          }
        ]
      },
      {
        id: 'cond-alphabet',
        title: 'Alphabet Patterns',
        difficulty: 'Hard',
        questions: [
          {
            id: 'cond-alpha-1',
            title: 'Alphabet Triangle',
            desc: 'Write a function that prints a triangle pattern with letters A, B, C, ... Each row i repeats the ith letter i times.',
            inputExample: 'n = 4',
            outputExample: 'A\\nBB\\nCCC\\nDDDD',
            constraints: ['1 <= n <= 26'],
            templates: {
              python: `def alpha_triangle(n):\n    lines = []\n    for i in range(n):\n        lines.append(chr(65 + i) * (i + 1))\n    return '\\n'.join(lines)\n`,
              javascript: `function alphaTriangle(n) {\n    const lines = [];\n    for (let i = 0; i < n; i++) {\n        lines.push(String.fromCharCode(65 + i).repeat(i + 1));\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String alphaTriangle(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j <= i; j++) sb.append((char)(65 + i));\n        if (i < n - 1) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('chr') || code.includes('fromCharCode') || (code.includes('65') && code.includes('repeat'))
          },
          {
            id: 'cond-alpha-2',
            title: 'Alphabet Pyramid',
            desc: 'Write a function that prints a pyramid of letters. Row i has letters from A to the ith letter, centered.',
            inputExample: 'n = 4',
            outputExample: '   A\\n  AB\\n ABC\\nABCD',
            constraints: ['1 <= n <= 26'],
            templates: {
              python: `def alpha_pyramid(n):\n    lines = []\n    for i in range(1, n + 1):\n        spaces = ' ' * (n - i)\n        letters = ''.join(chr(65 + j) for j in range(i))\n        lines.append(spaces + letters)\n    return '\\n'.join(lines)\n`,
              javascript: `function alphaPyramid(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        const spaces = ' '.repeat(n - i);\n        let letters = '';\n        for (let j = 0; j < i; j++) letters += String.fromCharCode(65 + j);\n        lines.push(spaces + letters);\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String alphaPyramid(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int s = 0; s < n - i; s++) sb.append(' ');\n        for (int j = 0; j < i; j++) sb.append((char)(65 + j));\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('chr') || code.includes('fromCharCode') || code.includes('65')
          },
          {
            id: 'cond-alpha-3',
            title: 'Reverse Alphabet Triangle',
            desc: 'Write a function that prints a reversed alphabet triangle. Row i has letters from the (n-i)th letter downwards.',
            inputExample: 'n = 4',
            outputExample: 'ABCD\\nABC\\nAB\\nA',
            constraints: ['1 <= n <= 26'],
            templates: {
              python: `def reverse_alpha_triangle(n):\n    lines = []\n    for i in range(n, 0, -1):\n        letters = ''.join(chr(65 + j) for j in range(i))\n        lines.append(letters)\n    return '\\n'.join(lines)\n`,
              javascript: `function reverseAlphaTriangle(n) {\n    const lines = [];\n    for (let i = n; i >= 1; i--) {\n        let letters = '';\n        for (let j = 0; j < i; j++) letters += String.fromCharCode(65 + j);\n        lines.push(letters);\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String reverseAlphaTriangle(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = n; i >= 1; i--) {\n        for (int j = 0; j < i; j++) sb.append((char)(65 + j));\n        if (i > 1) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('chr') || code.includes('fromCharCode') || code.includes('65')
          },
          {
            id: 'cond-alpha-4',
            title: 'Alphabet Diamond',
            desc: 'Write a function that prints a diamond-shaped alphabet pattern. Top half expands, bottom half contracts.',
            inputExample: 'n = 3',
            outputExample: '  A\\n ABA\\nABCBA\\n ABA\\n  A',
            constraints: ['1 <= n <= 13'],
            templates: {
              python: `def alpha_diamond(n):\n    lines = []\n    for i in range(1, n + 1):\n        spaces = ' ' * (n - i)\n        left = ''.join(chr(65 + j) for j in range(i))\n        right = ''.join(chr(65 + j) for j in range(i - 2, -1, -1))\n        lines.append(spaces + left + right)\n    for i in range(n - 1, 0, -1):\n        spaces = ' ' * (n - i)\n        left = ''.join(chr(65 + j) for j in range(i))\n        right = ''.join(chr(65 + j) for j in range(i - 2, -1, -1))\n        lines.append(spaces + left + right)\n    return '\\n'.join(lines)\n`,
              javascript: `function alphaDiamond(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        const spaces = ' '.repeat(n - i);\n        let left = '', right = '';\n        for (let j = 0; j < i; j++) left += String.fromCharCode(65 + j);\n        for (let j = i - 2; j >= 0; j--) right += String.fromCharCode(65 + j);\n        lines.push(spaces + left + right);\n    }\n    for (let i = n - 1; i >= 1; i--) {\n        const spaces = ' '.repeat(n - i);\n        let left = '', right = '';\n        for (let j = 0; j < i; j++) left += String.fromCharCode(65 + j);\n        for (let j = i - 2; j >= 0; j--) right += String.fromCharCode(65 + j);\n        lines.push(spaces + left + right);\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String alphaDiamond(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int s = 0; s < n - i; s++) sb.append(' ');\n        for (int j = 0; j < i; j++) sb.append((char)(65 + j));\n        for (int j = i - 2; j >= 0; j--) sb.append((char)(65 + j));\n        sb.append('\\n');\n    }\n    for (int i = n - 1; i >= 1; i--) {\n        for (int s = 0; s < n - i; s++) sb.append(' ');\n        for (int j = 0; j < i; j++) sb.append((char)(65 + j));\n        for (int j = i - 2; j >= 0; j--) sb.append((char)(65 + j));\n        if (i > 1) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('diamond') && (code.includes('chr') || code.includes('fromCharCode'))
          },
          {
            id: 'cond-alpha-5',
            title: 'Continuous Alphabet Pyramid',
            desc: 'Write a function that prints a pyramid where letters continue sequentially across rows. Row 1: A, Row 2: BC, Row 3: DEF.',
            inputExample: 'n = 4',
            outputExample: 'A\\nBC\\nDEF\\nGHIJ',
            constraints: ['1 <= n <= 26'],
            templates: {
              python: `def continuous_alpha_pyramid(n):\n    lines = []\n    ch = 0\n    for i in range(1, n + 1):\n        row = ''.join(chr(65 + ch + j) for j in range(i))\n        lines.append(row)\n        ch += i\n    return '\\n'.join(lines)\n`,
              javascript: `function continuousAlphaPyramid(n) {\n    const lines = [];\n    let ch = 0;\n    for (let i = 1; i <= n; i++) {\n        let row = '';\n        for (let j = 0; j < i; j++) row += String.fromCharCode(65 + ch + j);\n        lines.push(row);\n        ch += i;\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String continuousAlphaPyramid(int n) {\n    StringBuilder sb = new StringBuilder();\n    int ch = 0;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 0; j < i; j++) sb.append((char)(65 + ch + j));\n        ch += i;\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('chr') || code.includes('fromCharCode') || code.includes('65')
          },
          {
            id: 'cond-alpha-6',
            title: 'Letter Frequency Triangle',
            desc: 'Write a function that prints a triangle where row i contains letter i repeated i times.',
            inputExample: 'n = 4',
            outputExample: 'A\\nBB\\nCCC\\nDDDD',
            constraints: ['1 <= n <= 26'],
            templates: {
              python: `def letter_freq_triangle(n):\n    lines = []\n    for i in range(1, n + 1):\n        lines.append(chr(64 + i) * i)\n    return '\\n'.join(lines)\n`,
              javascript: `function letterFreqTriangle(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        lines.push(String.fromCharCode(64 + i).repeat(i));\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String letterFreqTriangle(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 1; i <= n; i++) {\n        for (int j = 0; j < i; j++) sb.append((char)(64 + i));\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('chr') || code.includes('fromCharCode') || code.includes('64')
          },
          {
            id: 'cond-alpha-7',
            title: 'Vowel-Consonant Pattern',
            desc: 'Write a function that prints a triangle alternating between vowels (A, E, I, O, U) and consonants. Use letters sequentially but mark V/C.',
            inputExample: 'n = 4',
            outputExample: 'A(V)\\nB(C) C(C)\\nD(C) E(V) F(C)\\nG(C) H(C) I(V) J(C)',
            constraints: ['1 <= n <= 10'],
            templates: {
              python: `def vowel_consonant_pattern(n):\n    vowels = set('AEIOU')\n    lines = []\n    ch = 0\n    for i in range(1, n + 1):\n        row = []\n        for j in range(i):\n            letter = chr(65 + ch)\n            label = 'V' if letter in vowels else 'C'\n            row.append(f'{letter}({label})')\n            ch += 1\n        lines.append(' '.join(row))\n    return '\\n'.join(lines)\n`,
              javascript: `function vowelConsonantPattern(n) {\n    const vowels = new Set(['A','E','I','O','U']);\n    const lines = [];\n    let ch = 0;\n    for (let i = 1; i <= n; i++) {\n        const row = [];\n        for (let j = 0; j < i; j++) {\n            const letter = String.fromCharCode(65 + ch);\n            const label = vowels.has(letter) ? 'V' : 'C';\n            row.push(letter + '(' + label + ')');\n            ch++;\n        }\n        lines.push(row.join(' '));\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String vowelConsonantPattern(int n) {\n    StringBuilder sb = new StringBuilder();\n    String vowels = "AEIOU";\n    int ch = 0;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 0; j < i; j++) {\n            char letter = (char)(65 + ch);\n            String label = vowels.indexOf(letter) != -1 ? "V" : "C";\n            sb.append(letter).append('(').append(label).append(')');\n            if (j < i - 1) sb.append(' ');\n            ch++;\n        }\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('vowel') || code.includes('Vowel') || code.includes('AEIOU')
          },
          {
            id: 'cond-alpha-8',
            title: 'Alphabet Hourglass',
            desc: 'Write a function that prints an hourglass pattern of letters. Top half expands from A, bottom half contracts back.',
            inputExample: 'n = 3',
            outputExample: 'ABCBA\\n ABA\\n  A',
            constraints: ['1 <= n <= 13'],
            templates: {
              python: `def alpha_hourglass(n):\n    lines = []\n    for i in range(n, 0, -1):\n        spaces = ' ' * (n - i)\n        left = ''.join(chr(65 + j) for j in range(i))\n        right = ''.join(chr(65 + j) for j in range(i - 2, -1, -1))\n        lines.append(spaces + left + right)\n    return '\\n'.join(lines)\n`,
              javascript: `function alphaHourglass(n) {\n    const lines = [];\n    for (let i = n; i >= 1; i--) {\n        const spaces = ' '.repeat(n - i);\n        let left = '', right = '';\n        for (let j = 0; j < i; j++) left += String.fromCharCode(65 + j);\n        for (let j = i - 2; j >= 0; j--) right += String.fromCharCode(65 + j);\n        lines.push(spaces + left + right);\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String alphaHourglass(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = n; i >= 1; i--) {\n        for (int s = 0; s < n - i; s++) sb.append(' ');\n        for (int j = 0; j < i; j++) sb.append((char)(65 + j));\n        for (int j = i - 2; j >= 0; j--) sb.append((char)(65 + j));\n        if (i > 1) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('chr') || code.includes('fromCharCode') || (code.includes('hourglass') && code.includes('65'))
          },
          {
            id: 'cond-alpha-9',
            title: 'Letter Bridge',
            desc: 'Write a function that prints a bridge pattern of letters. Row 1: all letters, each subsequent row removes the first and last letter.',
            inputExample: 'n = 4',
            outputExample: 'ABCD\\n BC\\n  C',
            constraints: ['2 <= n <= 13'],
            templates: {
              python: `def letter_bridge(n):\n    lines = []\n    for i in range((n + 1) // 2):\n        spaces = ' ' * i\n        letters = ''.join(chr(65 + j) for j in range(i, n - i))\n        lines.append(spaces + letters)\n    return '\\n'.join(lines)\n`,
              javascript: `function letterBridge(n) {\n    const lines = [];\n    for (let i = 0; i < Math.ceil(n / 2); i++) {\n        const spaces = ' '.repeat(i);\n        let letters = '';\n        for (let j = i; j < n - i; j++) letters += String.fromCharCode(65 + j);\n        lines.push(spaces + letters);\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String letterBridge(int n) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 0; i < (n + 1) / 2; i++) {\n        for (int s = 0; s < i; s++) sb.append(' ');\n        for (int j = i; j < n - i; j++) sb.append((char)(65 + j));\n        if (i < (n + 1) / 2 - 1) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('chr') || code.includes('fromCharCode') || code.includes('bridge')
          },
          {
            id: 'cond-alpha-10',
            title: 'Zigzag Alphabet',
            desc: 'Write a function that prints a zigzag alphabet pattern with n rows. Odd rows go left-to-right, even rows go right-to-left.',
            inputExample: 'n = 4',
            outputExample: 'A\\nCB\\nDEF\\nJIHG',
            constraints: ['1 <= n <= 10'],
            templates: {
              python: `def zigzag_alpha(n):\n    lines = []\n    ch = 0\n    for i in range(1, n + 1):\n        row = [chr(65 + ch + j) for j in range(i)]\n        if i % 2 == 0:\n            row.reverse()\n        lines.append(''.join(row))\n        ch += i\n    return '\\n'.join(lines)\n`,
              javascript: `function zigzagAlpha(n) {\n    const lines = [];\n    let ch = 0;\n    for (let i = 1; i <= n; i++) {\n        const row = [];\n        for (let j = 0; j < i; j++) row.push(String.fromCharCode(65 + ch + j));\n        if (i % 2 === 0) row.reverse();\n        lines.push(row.join(''));\n        ch += i;\n    }\n    return lines.join('\\n');\n}\n`,
              java: `public static String zigzagAlpha(int n) {\n    StringBuilder sb = new StringBuilder();\n    int ch = 0;\n    for (int i = 1; i <= n; i++) {\n        char[] row = new char[i];\n        for (int j = 0; j < i; j++) row[j] = (char)(65 + ch + j);\n        if (i % 2 == 0) {\n            for (int j = i - 1; j >= 0; j--) sb.append(row[j]);\n        } else {\n            for (int j = 0; j < i; j++) sb.append(row[j]);\n        }\n        ch += i;\n        if (i < n) sb.append('\\n');\n    }\n    return sb.toString();\n}\n`
            },
            verifyKeyword: (code) => code.includes('chr') || code.includes('fromCharCode') || (code.includes('zigzag') && code.includes('reverse'))
          }
        ]
      }
    ]
  },
  {
    id: 'loops',
    title: 'Loops',
    icon: '🔄',
    subModules: [
      {
        id: 'loop-for',
        title: 'For Loops',
        questions: [
          {
            id: 'loop-for-1',
            title: 'Sum of N Numbers',
            desc: 'Write a function that returns the sum of all numbers from 1 to n using a loop.',
            inputExample: 'n = 10',
            outputExample: '55',
            constraints: ['1 <= n <= 1000'],
            templates: {
              python: `def sum_to_n(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\n`,
              javascript: `function sumToN(n) {\n    let total = 0;\n    for (let i = 1; i <= n; i++) {\n        total += i;\n    }\n    return total;\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && (code.includes('range') || code.includes('i++') || code.includes('i <='))
          },
          {
            id: 'loop-for-2',
            title: 'Factorial',
            desc: 'Write a function that computes the factorial of a number n (n!) using a loop.',
            inputExample: 'n = 5',
            outputExample: '120',
            constraints: ['0 <= n <= 20'],
            templates: {
              python: `def factorial(n):\n    result = 1\n    for i in range(2, n + 1):\n        result *= i\n    return result\n`,
              javascript: `function factorial(n) {\n    let result = 1;\n    for (let i = 2; i <= n; i++) {\n        result *= i;\n    }\n    return result;\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('range') || code.includes('i++')
          }
        ]
      },
      {
        id: 'loop-while',
        title: 'While Loops',
        questions: [
          {
            id: 'loop-while-1',
            title: 'Count Digits',
            desc: 'Write a function that counts the number of digits in a positive integer using a while loop.',
            inputExample: 'n = 12345',
            outputExample: '5',
            constraints: ['1 <= n <= 10^9'],
            templates: {
              python: `def count_digits(n):\n    count = 0\n    while n > 0:\n        n //= 10\n        count += 1\n    return count\n`,
              javascript: `function countDigits(n) {\n    let count = 0;\n    while (n > 0) {\n        n = Math.floor(n / 10);\n        count++;\n    }\n    return count;\n}\n`
            },
            verifyKeyword: (code) => code.includes('while')
          }
        ]
      }
    ]
  },
  {
    id: 'functions',
    title: 'Functions',
    icon: '⚡',
    subModules: [
      {
        id: 'func-basics',
        title: 'Function Basics',
        questions: [
          {
            id: 'func-basic-1',
            title: 'Even or Odd',
            desc: 'Write a function that returns "Even" if a number is even and "Odd" if it is odd.',
            inputExample: 'n = 7',
            outputExample: '"Odd"',
            constraints: ['-10^9 <= n <= 10^9'],
            templates: {
              python: `def even_or_odd(n):\n    return 'Even' if n % 2 == 0 else 'Odd'\n`,
              javascript: `function evenOrOdd(n) {\n    return n % 2 === 0 ? 'Even' : 'Odd';\n}\n`
            },
            verifyKeyword: (code) => code.includes('%') || code.includes('Even') || code.includes('Odd')
          },
          {
            id: 'func-basic-2',
            title: 'Palindrome Check',
            desc: 'Write a function that checks if a given string is a palindrome (reads the same forwards and backwards).',
            inputExample: 's = "racecar"',
            outputExample: 'true',
            constraints: ['1 <= s.length <= 1000'],
            templates: {
              python: `def is_palindrome(s):\n    return s == s[::-1]\n`,
              javascript: `function isPalindrome(s) {\n    return s === s.split('').reverse().join('');\n}\n`
            },
            verifyKeyword: (code) => code.includes('[::-1]') || code.includes('reverse') || code.includes('split')
          }
        ]
      },
      {
        id: 'func-scope',
        title: 'Scope & Recursion',
        questions: [
          {
            id: 'func-recur-1',
            title: 'Fibonacci (Recursive)',
            desc: 'Write a recursive function that returns the nth Fibonacci number. F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2).',
            inputExample: 'n = 6',
            outputExample: '8',
            constraints: ['0 <= n <= 30'],
            templates: {
              python: `def fibonacci(n):\n    if n <= 1: return n\n    return fibonacci(n - 1) + fibonacci(n - 2)\n`,
              javascript: `function fibonacci(n) {\n    if (n <= 1) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}\n`
            },
            verifyKeyword: (code) => code.includes('fibonacci') && (code.includes('n-1') || code.includes('n - 1'))
          }
        ]
      }
    ]
  },
  {
    id: 'strings',
    title: 'Strings',
    icon: '📝',
    subModules: [
      {
        id: 'str-basics',
        title: 'String Manipulation',
        questions: [
          {
            id: 'str-basic-1',
            title: 'Reverse a String',
            desc: 'Write a function that reverses a given string.',
            inputExample: 's = "hello"',
            outputExample: '"olleh"',
            constraints: ['1 <= s.length <= 1000'],
            templates: {
              python: `def reverse_string(s):\n    return s[::-1]\n`,
              javascript: `function reverseString(s) {\n    return s.split('').reverse().join('');\n}\n`
            },
            verifyKeyword: (code) => code.includes('[::-1]') || (code.includes('reverse') && code.includes('split'))
          },
          {
            id: 'str-basic-2',
            title: 'Count Vowels',
            desc: 'Write a function that counts the number of vowels (a, e, i, o, u) in a given string (case-insensitive).',
            inputExample: 's = "Hello World"',
            outputExample: '3',
            constraints: ['1 <= s.length <= 10^4'],
            templates: {
              python: `def count_vowels(s):\n    vowels = 'aeiou'\n    return sum(1 for c in s.lower() if c in vowels)\n`,
              javascript: `function countVowels(s) {\n    const vowels = 'aeiou';\n    return s.toLowerCase().split('').filter(c => vowels.includes(c)).length;\n}\n`
            },
            verifyKeyword: (code) => code.includes('vowels') || code.includes('aeiou')
          }
        ]
      },
      {
        id: 'str-advanced',
        title: 'Advanced Strings',
        questions: [
          {
            id: 'str-adv-1',
            title: 'Anagram Checker',
            desc: 'Write a function that checks if two strings are anagrams (contain the same characters in any order).',
            inputExample: 's1 = "listen", s2 = "silent"',
            outputExample: 'true',
            constraints: ['1 <= s1.length, s2.length <= 5000'],
            templates: {
              python: `def are_anagrams(s1, s2):\n    return sorted(s1) == sorted(s2)\n`,
              javascript: `function areAnagrams(s1, s2) {\n    return s1.split('').sort().join('') === s2.split('').sort().join('');\n}\n`
            },
            verifyKeyword: (code) => code.includes('sorted') || (code.includes('sort') && code.includes('join'))
          }
        ]
      }
    ]
  },
  {
    id: 'collections',
    title: 'Lists, Tuples, Sets, Dictionaries',
    icon: '🗂️',
    subModules: [
      {
        id: 'coll-list',
        title: 'Lists & Tuples',
        questions: [
          {
            id: 'coll-list-1',
            title: 'Find Second Largest',
            desc: 'Write a function that finds the second largest element in a list of integers.',
            inputExample: 'nums = [3, 1, 4, 1, 5, 9, 2]',
            outputExample: '5',
            constraints: ['2 <= list length <= 10^4', '-10^6 <= elements <= 10^6'],
            templates: {
              python: `def second_largest(nums):\n    unique = sorted(set(nums))\n    return unique[-2] if len(unique) >= 2 else None\n`,
              javascript: `function secondLargest(nums) {\n    const unique = [...new Set(nums)].sort((a, b) => a - b);\n    return unique.length >= 2 ? unique[unique.length - 2] : null;\n}\n`
            },
            verifyKeyword: (code) => code.includes('sorted') || code.includes('sort')
          },
          {
            id: 'coll-list-2',
            title: 'List Average',
            desc: 'Write a function that computes the average of a list of numbers. Return 0 for empty lists.',
            inputExample: 'nums = [10, 20, 30]',
            outputExample: '20.0',
            constraints: ['0 <= list length <= 10^4'],
            templates: {
              python: `def list_average(nums):\n    return sum(nums) / len(nums) if nums else 0\n`,
              javascript: `function listAverage(nums) {\n    return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;\n}\n`
            },
            verifyKeyword: (code) => code.includes('sum') || code.includes('reduce') || code.includes('/')
          }
        ]
      },
      {
        id: 'coll-set-dict',
        title: 'Sets & Dictionaries',
        questions: [
          {
            id: 'coll-set-1',
            title: 'Remove Duplicates',
            desc: 'Write a function that removes duplicate values from a list while preserving order.',
            inputExample: 'nums = [1, 2, 2, 3, 1, 4]',
            outputExample: '[1, 2, 3, 4]',
            constraints: ['1 <= list length <= 1000'],
            templates: {
              python: `def remove_duplicates(nums):\n    seen = set()\n    result = []\n    for x in nums:\n        if x not in seen:\n            seen.add(x)\n            result.append(x)\n    return result\n`,
              javascript: `function removeDuplicates(nums) {\n    return [...new Set(nums)];\n}\n`
            },
            verifyKeyword: (code) => code.includes('set') || code.includes('Set')
          },
          {
            id: 'coll-dict-1',
            title: 'Word Frequency',
            desc: 'Write a function that takes a sentence string and returns a dictionary/map of word frequencies.',
            inputExample: 's = "the quick brown fox jumps over the lazy dog"',
            outputExample: '{the: 2, quick: 1, brown: 1, fox: 1, jumps: 1, over: 1, lazy: 1, dog: 1}',
            constraints: ['1 <= s.length <= 10000'],
            templates: {
              python: `def word_frequency(s):\n    words = s.split()\n    freq = {}\n    for w in words:\n        freq[w] = freq.get(w, 0) + 1\n    return freq\n`,
              javascript: `function wordFrequency(s) {\n    const words = s.split(' ');\n    const freq = {};\n    for (let w of words) {\n        freq[w] = (freq[w] || 0) + 1;\n    }\n    return freq;\n}\n`
            },
            verifyKeyword: (code) => code.includes('freq') || code.includes('get') || code.includes('split')
          }
        ]
      }
    ]
  },
  {
    id: 'exception-handling',
    title: 'Exception Handling',
    icon: '🛡️',
    subModules: [
      {
        id: 'exc-trycatch',
        title: 'Try-Except / Try-Catch',
        questions: [
          {
            id: 'exc-try-1',
            title: 'Safe Division',
            desc: 'Write a function that divides two numbers safely. Return "Error" if division by zero or invalid input occurs.',
            inputExample: 'a = 10, b = 0',
            outputExample: '"Error"',
            constraints: ['Use try-except/try-catch to handle errors.'],
            templates: {
              python: `def safe_divide(a, b):\n    try:\n        return a / b\n    except:\n        return 'Error'\n`,
              javascript: `function safeDivide(a, b) {\n    try {\n        return a / b;\n    } catch {\n        return 'Error';\n    }\n}\n`
            },
            verifyKeyword: (code) => code.includes('try') && (code.includes('except') || code.includes('catch'))
          },
          {
            id: 'exc-try-2',
            title: 'Parse Integer Safely',
            desc: 'Write a function that safely parses a string to an integer. Return None/null if parsing fails.',
            inputExample: 's = "42"',
            outputExample: '42',
            constraints: ['Use exception handling for invalid strings.'],
            templates: {
              python: `def safe_parse(s):\n    try:\n        return int(s)\n    except:\n        return None\n`,
              javascript: `function safeParse(s) {\n    try {\n        return parseInt(s, 10);\n    } catch {\n        return null;\n    }\n}\n`
            },
            verifyKeyword: (code) => code.includes('try') && (code.includes('except') || code.includes('catch'))
          }
        ]
      },
      {
        id: 'exc-custom',
        title: 'Custom Validation',
        questions: [
          {
            id: 'exc-val-1',
            title: 'Age Validator',
            desc: 'Write a function that validates age input. Raise an exception if age is negative or > 150. Return "Valid" otherwise.',
            inputExample: 'age = 25',
            outputExample: '"Valid"',
            constraints: ['Use exception handling for validation.'],
            templates: {
              python: `def validate_age(age):\n    if age < 0 or age > 150:\n        raise ValueError('Invalid age')\n    return 'Valid'\n`,
              javascript: `function validateAge(age) {\n    if (age < 0 || age > 150) {\n        throw new Error('Invalid age');\n    }\n    return 'Valid';\n}\n`
            },
            verifyKeyword: (code) => code.includes('raise') || code.includes('throw') || (code.includes('if') && code.includes('age'))
          }
        ]
      }
    ]
  }
];

const JAVA_MODULES = [
  {
    id: 'java-variables',
    title: 'Variables and Data Types',
    icon: '📦',
    subModules: [
      {
        id: 'java-var-basics',
        title: 'Variable Declaration',
        questions: [
          {
            id: 'java-var-1',
            title: 'Swap Two Numbers',
            desc: 'Write a Java method that swaps two integers and returns them in an array.',
            inputExample: 'a = 5, b = 10',
            outputExample: '[10, 5]',
            constraints: ['-10^9 <= a, b <= 10^9'],
            templates: {
              python: `def swap(a, b):\n    return b, a\n`,
              javascript: `function swap(a, b) {\n    return [b, a];\n}\n`
            },
            verifyKeyword: (code) => code.includes('return')
          }
        ]
      },
      {
        id: 'java-data-types',
        title: 'Primitive Types',
        questions: [
          {
            id: 'java-types-1',
            title: 'Type Conversion',
            desc: 'Write a method that converts a String to an int. Return -1 if the string is not a valid number.',
            inputExample: 's = "42"',
            outputExample: '42',
            constraints: ['-10^5 <= value <= 10^5'],
            templates: {
              python: `def str_to_int(s):\n    try:\n        return int(s)\n    except:\n        return -1\n`,
              javascript: `function strToInt(s) {\n    const n = parseInt(s, 10);\n    return isNaN(n) ? -1 : n;\n}\n`
            },
            verifyKeyword: (code) => code.includes('int') || code.includes('parseInt')
          }
        ]
      }
    ]
  },
  {
    id: 'java-control',
    title: 'Control Flow',
    icon: '🔀',
    subModules: [
      {
        id: 'java-ifelse',
        title: 'If-Else',
        questions: [
          {
            id: 'java-if-1',
            title: 'Grade Calculator',
            desc: 'Write a method that returns a grade (A/B/C/D/F) based on marks.',
            inputExample: 'marks = 85',
            outputExample: 'B',
            constraints: ['0 <= marks <= 100'],
            templates: {
              python: `def get_grade(marks):\n    if marks >= 90: return 'A'\n    if marks >= 75: return 'B'\n    if marks >= 60: return 'C'\n    if marks >= 45: return 'D'\n    return 'F'\n`,
              javascript: `function getGrade(marks) {\n    if (marks >= 90) return 'A';\n    if (marks >= 75) return 'B';\n    if (marks >= 60) return 'C';\n    if (marks >= 45) return 'D';\n    return 'F';\n}\n`
            },
            verifyKeyword: (code) => code.includes('if')
          }
        ]
      },
      {
        id: 'java-loops',
        title: 'Loops',
        questions: [
          {
            id: 'java-loop-1',
            title: 'Sum of N Numbers',
            desc: 'Write a method that sums numbers from 1 to n using a loop.',
            inputExample: 'n = 10',
            outputExample: '55',
            constraints: ['1 <= n <= 1000'],
            templates: {
              python: `def sum_to_n(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\n`,
              javascript: `function sumToN(n) {\n    let total = 0;\n    for (let i = 1; i <= n; i++) total += i;\n    return total;\n}\n`
            },
            verifyKeyword: (code) => code.includes('for')
          }
        ]
      }
    ]
  },
  {
    id: 'java-oop',
    title: 'OOP Basics',
    icon: '🧩',
    subModules: [
      {
        id: 'java-class',
        title: 'Classes & Objects',
        questions: [
          {
            id: 'java-class-1',
            title: 'Rectangle Area',
            desc: 'Write functions/methods to compute the area of a rectangle given length and width. Use OOP approach with a class.',
            inputExample: 'length = 5, width = 3',
            outputExample: '15',
            constraints: ['1 <= length, width <= 10^6'],
            templates: {
              python: `class Rectangle:\n    def __init__(self, l, w):\n        self.l = l\n        self.w = w\n    def area(self):\n        return self.l * self.w\n\ndef rect_area(l, w):\n    return Rectangle(l, w).area()\n`,
              javascript: `class Rectangle {\n    constructor(l, w) {\n        this.l = l;\n        this.w = w;\n    }\n    area() { return this.l * this.w; }\n}\nfunction rectArea(l, w) {\n    return new Rectangle(l, w).area();\n}\n`
            },
            verifyKeyword: (code) => code.includes('class') && code.includes('__init__') || code.includes('constructor')
          }
        ]
      }
    ]
  },
  {
    id: 'java-exception',
    title: 'Exception Handling',
    icon: '🛡️',
    subModules: [
      {
        id: 'java-trycatch',
        title: 'Try-Catch',
        questions: [
          {
            id: 'java-exc-1',
            title: 'Safe Division',
            desc: 'Write a method that divides two numbers safely. Return -1 if division by zero occurs.',
            inputExample: 'a = 10, b = 0',
            outputExample: '-1',
            constraints: ['Use try-catch for error handling.'],
            templates: {
              python: `def safe_divide(a, b):\n    try:\n        return a / b\n    except:\n        return -1\n`,
              javascript: `function safeDivide(a, b) {\n    try {\n        return a / b;\n    } catch {\n        return -1;\n    }\n}\n`
            },
            verifyKeyword: (code) => code.includes('try') && (code.includes('except') || code.includes('catch'))
          }
        ]
      }
    ]
  }
];

const JS_MODULES = [
  {
    id: 'js-variables',
    title: 'Variables and Data Types',
    icon: '📦',
    subModules: [
      {
        id: 'js-var-basics',
        title: 'let, const & var',
        questions: [
          {
            id: 'js-var-1',
            title: 'Swap Two Numbers',
            desc: 'Write a function that swaps two numbers using destructuring assignment.',
            inputExample: 'a = 5, b = 10',
            outputExample: '[10, 5]',
            constraints: ['-10^9 <= a, b <= 10^9'],
            templates: {
              python: `def swap(a, b):\n    return b, a\n`,
              javascript: `function swap(a, b) {\n    return [b, a];\n}\n`
            },
            verifyKeyword: (code) => code.includes('return')
          },
          {
            id: 'js-var-2',
            title: 'Typeof Check',
            desc: 'Write a function that returns the type of the given value as a string.',
            inputExample: 'val = 42',
            outputExample: '"number"',
            constraints: ['Input can be any JavaScript type.'],
            templates: {
              python: `def get_type(val):\n    return type(val).__name__\n`,
              javascript: `function getType(val) {\n    return typeof val;\n}\n`
            },
            verifyKeyword: (code) => code.includes('typeof')
          }
        ]
      },
      {
        id: 'js-coercion',
        title: 'Type Coercion',
        questions: [
          {
            id: 'js-coerce-1',
            title: 'String to Number',
            desc: 'Write a function that converts a string to a number. Return NaN for invalid input.',
            inputExample: 's = "42"',
            outputExample: '42',
            constraints: ['Input is a string.'],
            templates: {
              python: `def to_number(s):\n    try: return int(s)\n    except: return float('nan')\n`,
              javascript: `function toNumber(s) {\n    return Number(s);\n}\n`
            },
            verifyKeyword: (code) => code.includes('Number') || code.includes('parseInt') || code.includes('parseFloat')
          }
        ]
      }
    ]
  },
  {
    id: 'js-functions',
    title: 'Functions & Arrow Functions',
    icon: '⚡',
    subModules: [
      {
        id: 'js-func-basics',
        title: 'Function Basics',
        questions: [
          {
            id: 'js-func-1',
            title: 'Even or Odd',
            desc: 'Write an arrow function that returns "Even" or "Odd".',
            inputExample: 'n = 7',
            outputExample: '"Odd"',
            constraints: ['-10^9 <= n <= 10^9'],
            templates: {
              python: `def even_or_odd(n):\n    return 'Even' if n % 2 == 0 else 'Odd'\n`,
              javascript: `const evenOrOdd = (n) => n % 2 === 0 ? 'Even' : 'Odd';\n`
            },
            verifyKeyword: (code) => code.includes('=>') || code.includes('%')
          }
        ]
      },
      {
        id: 'js-callback',
        title: 'Callbacks & Array Methods',
        questions: [
          {
            id: 'js-cb-1',
            title: 'Filter Even Numbers',
            desc: 'Write a function that takes an array and returns only the even numbers using the filter method.',
            inputExample: 'arr = [1, 2, 3, 4, 5, 6]',
            outputExample: '[2, 4, 6]',
            constraints: ['1 <= arr.length <= 1000'],
            templates: {
              python: `def filter_even(nums):\n    return [x for x in nums if x % 2 == 0]\n`,
              javascript: `function filterEven(nums) {\n    return nums.filter(n => n % 2 === 0);\n}\n`
            },
            verifyKeyword: (code) => code.includes('filter')
          }
        ]
      }
    ]
  },
  {
    id: 'js-arrays-objects',
    title: 'Arrays & Objects',
    icon: '🗂️',
    subModules: [
      {
        id: 'js-array',
        title: 'Array Operations',
        questions: [
          {
            id: 'js-arr-1',
            title: 'Find Max',
            desc: 'Write a function that finds the maximum value in an array using the spread operator.',
            inputExample: 'arr = [3, 7, 2, 9, 1]',
            outputExample: '9',
            constraints: ['1 <= arr.length <= 1000'],
            templates: {
              python: `def find_max(nums):\n    return max(nums)\n`,
              javascript: `function findMax(nums) {\n    return Math.max(...nums);\n}\n`
            },
            verifyKeyword: (code) => code.includes('Math.max') || code.includes('max')
          }
        ]
      },
      {
        id: 'js-object',
        title: 'Object Manipulation',
        questions: [
          {
            id: 'js-obj-1',
            title: 'Merge Objects',
            desc: 'Write a function that merges two objects using the spread operator.',
            inputExample: 'obj1 = {a: 1}, obj2 = {b: 2}',
            outputExample: '{a: 1, b: 2}',
            constraints: ['Objects contain primitive values.'],
            templates: {
              python: `def merge_dicts(d1, d2):\n    return {**d1, **d2}\n`,
              javascript: `function mergeObjects(obj1, obj2) {\n    return {...obj1, ...obj2};\n}\n`
            },
            verifyKeyword: (code) => code.includes('...') || code.includes('spread')
          }
        ]
      }
    ]
  },
  {
    id: 'js-dom',
    title: 'DOM Basics',
    icon: '🌐',
    subModules: [
      {
        id: 'js-dom-basics',
        title: 'DOM Manipulation',
        questions: [
          {
            id: 'js-dom-1',
            title: 'Change Text Content',
            desc: 'Write a function that changes the text content of an element by its ID.',
            inputExample: 'elementId = "title", newText = "Hello"',
            outputExample: 'Element text updated',
            constraints: ['Assume DOM environment.'],
            templates: {
              python: `# Python: not applicable for DOM\n# Use JavaScript version\npass\n`,
              javascript: `function changeText(elementId, newText) {\n    document.getElementById(elementId).textContent = newText;\n}\n`
            },
            verifyKeyword: (code) => code.includes('getElementById') || code.includes('textContent')
          }
        ]
      }
    ]
  }
];

const DSA_MODULES = [
  {
    id: 'dsa-arrays',
    title: 'Arrays',
    icon: '📊',
    subModules: [
      {
        id: 'dsa-arr-traversal',
        title: 'Array Traversal',
        questions: [
          {
            id: 'dsa-arr-1',
            title: 'Linear Search',
            desc: 'Write a function that searches for a target value in an array and returns its index, or -1 if not found.',
            inputExample: 'arr = [4, 2, 7, 1, 9], target = 7',
            outputExample: '2',
            constraints: ['1 <= arr.length <= 10^4'],
            templates: {
              python: `def linear_search(arr, target):\n    for i, val in enumerate(arr):\n        if val == target:\n            return i\n    return -1\n`,
              javascript: `function linearSearch(arr, target) {\n    for (let i = 0; i < arr.length; i++) {\n        if (arr[i] === target) return i;\n    }\n    return -1;\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && (code.includes('enumerate') || code.includes('i++'))
          },
          {
            id: 'dsa-arr-2',
            title: 'Reverse Array',
            desc: 'Write a function that reverses an array in-place.',
            inputExample: 'arr = [1, 2, 3, 4, 5]',
            outputExample: '[5, 4, 3, 2, 1]',
            constraints: ['1 <= arr.length <= 10^4'],
            templates: {
              python: `def reverse_array(arr):\n    return arr[::-1]\n`,
              javascript: `function reverseArray(arr) {\n    return arr.reverse();\n}\n`
            },
            verifyKeyword: (code) => code.includes('[::-1]') || code.includes('reverse')
          }
        ]
      },
      {
        id: 'dsa-arr-two-pointer',
        title: 'Two Pointer Technique',
        questions: [
          {
            id: 'dsa-tp-1',
            title: 'Two Sum (Sorted)',
            desc: 'Write a function that finds two numbers in a sorted array that add up to a target. Return their indices. Use two-pointer technique.',
            inputExample: 'arr = [2, 7, 11, 15], target = 9',
            outputExample: '[0, 1]',
            constraints: ['Array is sorted in ascending order.'],
            templates: {
              python: `def two_sum_sorted(arr, target):\n    l, r = 0, len(arr) - 1\n    while l < r:\n        s = arr[l] + arr[r]\n        if s == target: return [l, r]\n        elif s < target: l += 1\n        else: r -= 1\n    return []\n`,
              javascript: `function twoSumSorted(arr, target) {\n    let l = 0, r = arr.length - 1;\n    while (l < r) {\n        const s = arr[l] + arr[r];\n        if (s === target) return [l, r];\n        else if (s < target) l++;\n        else r--;\n    }\n    return [];\n}\n`
            },
            verifyKeyword: (code) => code.includes('while') && (code.includes('l < r') || code.includes('l+=1') || code.includes('l++'))
          }
        ]
      }
    ]
  },
  {
    id: 'dsa-linkedlist',
    title: 'Linked Lists',
    icon: '🔗',
    subModules: [
      {
        id: 'dsa-ll-basics',
        title: 'Singly Linked List',
        questions: [
          {
            id: 'dsa-ll-1',
            title: 'Find Middle',
            desc: 'Write a function that finds the middle element of a linked list using the two-pointer (slow/fast) technique.',
            inputExample: 'list = [1, 2, 3, 4, 5]',
            outputExample: '3',
            constraints: ['1 <= list length <= 10^4', 'Use slow/fast pointer approach.'],
            templates: {
              python: `class Node:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef find_middle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    return slow.val if slow else None\n`,
              javascript: `class Node {\n    constructor(val = 0, next = null) {\n        this.val = val;\n        this.next = next;\n    }\n}\nfunction findMiddle(head) {\n    let slow = head, fast = head;\n    while (fast && fast.next) {\n        slow = slow.next;\n        fast = fast.next.next;\n    }\n    return slow ? slow.val : null;\n}\n`
            },
            verifyKeyword: (code) => code.includes('slow') && code.includes('fast') && code.includes('next')
          }
        ]
      },
      {
        id: 'dsa-ll-reverse',
        title: 'Reverse',
        questions: [
          {
            id: 'dsa-ll-rev-1',
            title: 'Reverse Linked List',
            desc: 'Write a function that reverses a linked list iteratively.',
            inputExample: 'list = [1, 2, 3, 4, 5]',
            outputExample: '[5, 4, 3, 2, 1]',
            constraints: ['Use iterative approach.'],
            templates: {
              python: `def reverse_list(head):\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev\n`,
              javascript: `function reverseList(head) {\n    let prev = null, curr = head;\n    while (curr) {\n        const nxt = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = nxt;\n    }\n    return prev;\n}\n`
            },
            verifyKeyword: (code) => code.includes('curr') && code.includes('next') && code.includes('prev')
          }
        ]
      }
    ]
  },
  {
    id: 'dsa-stack-queue',
    title: 'Stacks & Queues',
    icon: '📚',
    subModules: [
      {
        id: 'dsa-stack',
        title: 'Stack',
        questions: [
          {
            id: 'dsa-stack-1',
            title: 'Valid Parentheses',
            desc: 'Write a function that checks if a string of brackets is valid using a stack.',
            inputExample: 's = "()[]{}"',
            outputExample: 'true',
            constraints: ['String contains only brackets: ()[]{}'],
            templates: {
              python: `def is_valid(s):\n    stack = []\n    pairs = {')': '(', '}': '{', ']': '['}\n    for c in s:\n        if c in pairs:\n            if not stack or stack.pop() != pairs[c]:\n                return False\n        else:\n            stack.append(c)\n    return not stack\n`,
              javascript: `function isValid(s) {\n    const stack = [];\n    const pairs = {')': '(', '}': '{', ']': '['};\n    for (let c of s) {\n        if (c in pairs) {\n            if (!stack.length || stack.pop() !== pairs[c]) return false;\n        } else {\n            stack.push(c);\n        }\n    }\n    return stack.length === 0;\n}\n`
            },
            verifyKeyword: (code) => code.includes('stack') && (code.includes('pop') || code.includes('push'))
          }
        ]
      },
      {
        id: 'dsa-queue',
        title: 'Queue',
        questions: [
          {
            id: 'dsa-queue-1',
            title: 'Implement Queue',
            desc: 'Write functions to enqueue and dequeue elements using a list/array. Implement FIFO behavior.',
            inputExample: 'enqueue(1), enqueue(2), dequeue()',
            outputExample: '1',
            constraints: ['Implement using list/array.'],
            templates: {
              python: `class Queue:\n    def __init__(self):\n        self.items = []\n    def enqueue(self, x):\n        self.items.append(x)\n    def dequeue(self):\n        return self.items.pop(0) if self.items else None\n`,
              javascript: `class Queue {\n    constructor() { this.items = []; }\n    enqueue(x) { this.items.push(x); }\n    dequeue() { return this.items.length ? this.items.shift() : null; }\n}\n`
            },
            verifyKeyword: (code) => code.includes('enqueue') && code.includes('dequeue') && (code.includes('pop') || code.includes('shift'))
          }
        ]
      }
    ]
  },
  {
    id: 'dsa-sorting',
    title: 'Sorting',
    icon: '🔀',
    subModules: [
      {
        id: 'dsa-sort-bubble',
        title: 'Bubble Sort',
        questions: [
          {
            id: 'dsa-sort-1',
            title: 'Bubble Sort',
            desc: 'Write a function that sorts an array using the bubble sort algorithm.',
            inputExample: 'arr = [64, 34, 25, 12, 22, 11, 90]',
            outputExample: '[11, 12, 22, 25, 34, 64, 90]',
            constraints: ['1 <= arr.length <= 1000'],
            templates: {
              python: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr\n`,
              javascript: `function bubbleSort(arr) {\n    const n = arr.length;\n    for (let i = 0; i < n; i++) {\n        for (let j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n            }\n        }\n    }\n    return arr;\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && (code.includes('j+1') || code.includes('j + 1'))
          }
        ]
      },
      {
        id: 'dsa-sort-merge',
        title: 'Merge Sort',
        questions: [
          {
            id: 'dsa-sort-merge-1',
            title: 'Merge Two Sorted Arrays',
            desc: 'Write a function that merges two sorted arrays into one sorted array.',
            inputExample: 'arr1 = [1, 3, 5], arr2 = [2, 4, 6]',
            outputExample: '[1, 2, 3, 4, 5, 6]',
            constraints: ['Both arrays are sorted in ascending order.'],
            templates: {
              python: `def merge_sorted(arr1, arr2):\n    result = []\n    i = j = 0\n    while i < len(arr1) and j < len(arr2):\n        if arr1[i] < arr2[j]:\n            result.append(arr1[i])\n            i += 1\n        else:\n            result.append(arr2[j])\n            j += 1\n    result.extend(arr1[i:])\n    result.extend(arr2[j:])\n    return result\n`,
              javascript: `function mergeSorted(arr1, arr2) {\n    const result = [];\n    let i = 0, j = 0;\n    while (i < arr1.length && j < arr2.length) {\n        if (arr1[i] < arr2[j]) result.push(arr1[i++]);\n        else result.push(arr2[j++]);\n    }\n    return [...result, ...arr1.slice(i), ...arr2.slice(j)];\n}\n`
            },
            verifyKeyword: (code) => code.includes('while') && (code.includes('i <') || code.includes('j <'))
          }
        ]
      }
    ]
  }
];

const SQL_MODULES = [
  // ============================================================
  // MODULE 1: DATABASE & SCHEMA BASICS
  // ============================================================
  {
    id: 'sql-db-basics',
    title: 'Database & Schema Basics',
    icon: '📁',
    subModules: [
      {
        id: 'sql-intro-rdbms',
        title: 'Intro & RDBMS Basics',
        questions: [
          {
            id: 'sql-intro-1',
            title: 'Check Engine Version',
            desc: 'Write an SQL query to retrieve the current database/SQLite engine version.',
            inputExample: 'Execute standard version query.',
            outputExample: 'e.g. "3.39.4"',
            constraints: ['Return a single value.'],
            templates: { sql: `-- Write your SQL query here\nSELECT sqlite_version();\n` },
            verifyKeyword: (code) => code.includes('select') && code.includes('sqlite_version')
          }
        ]
      },
      {
        id: 'sql-tables-dtypes',
        title: 'Tables & Data Types',
        questions: [
          {
            id: 'sql-tbl-1',
            title: 'List Employee Columns',
            desc: 'Write a query to retrieve the schema definitions/column names of the "employees" table using PRAGMA.',
            inputExample: 'Table: employees',
            outputExample: 'List of column details',
            constraints: ['Use SQLite table_info pragma.'],
            templates: { sql: `-- Write your SQL query here\nPRAGMA table_info(` },
            verifyKeyword: (code) => code.includes('pragma') && code.includes('table_info') && code.includes('employees')
          }
        ]
      },
      {
        id: 'sql-keys-constraints',
        title: 'Keys & Constraints',
        questions: [
          {
            id: 'sql-key-1',
            title: 'Create Primary Key Table',
            desc: 'Write a query to create a table named "users" with an "id" column as an INTEGER PRIMARY KEY, and "username" as TEXT UNIQUE NOT NULL.',
            inputExample: 'Table definition specifications',
            outputExample: 'Successful table schema creation',
            constraints: ['Apply PRIMARY KEY, UNIQUE, and NOT NULL.'],
            templates: { sql: `-- Write your CREATE TABLE query here\nCREATE TABLE users (\n    ` },
            verifyKeyword: (code) => code.includes('create') && code.includes('table') && code.includes('primary') && code.includes('key') && code.includes('unique') && code.includes('not') && code.includes('null')
          }
        ]
      }
    ]
  },

  // ============================================================
  // MODULE 2: SQL COMMANDS & OPERATORS
  // ============================================================
  {
    id: 'sql-commands-operators',
    title: 'SQL Commands & Operators',
    icon: '⌨️',
    subModules: [
      {
        id: 'sql-ddl-dml',
        title: 'DDL & DML commands',
        questions: [
          {
            id: 'sql-cmd-insert',
            title: 'Insert New Department',
            desc: 'Write a query to insert a new department named "Marketing" with id 4 into the "departments" table.',
            inputExample: 'Table: departments (id, name)',
            outputExample: 'Row inserted',
            constraints: ['Use INSERT INTO syntax.'],
            templates: { sql: `-- Write your SQL query here\nINSERT INTO departments ` },
            verifyKeyword: (code) => code.includes('insert') && code.includes('into') && code.includes('departments') && code.includes('values')
          },
          {
            id: 'sql-cmd-update',
            title: 'Update Employee Salary',
            desc: 'Write a query to update the salary of employee with id 10 to 65000 in the "employees" table.',
            inputExample: 'Table: employees (id, name, salary)',
            outputExample: 'Salary updated to 65000',
            constraints: ['Filter exactly id = 10.'],
            templates: { sql: `-- Write your SQL query here\nUPDATE employees ` },
            verifyKeyword: (code) => code.includes('update') && code.includes('employees') && code.includes('set') && code.includes('salary') && code.includes('where') && code.includes('10')
          },
          {
            id: 'sql-cmd-delete',
            title: 'Delete Inactive Projects',
            desc: 'Write a query to delete all projects from the "projects" table where the status is "inactive".',
            inputExample: 'Table: projects (id, name, status)',
            outputExample: 'Row(s) deleted',
            constraints: ['Filter on status = "inactive".'],
            templates: { sql: `-- Write your SQL query here\nDELETE FROM projects ` },
            verifyKeyword: (code) => code.includes('delete') && code.includes('from') && code.includes('projects') && code.includes('where') && code.includes('inactive')
          }
        ]
      },
      {
        id: 'sql-operators-select',
        title: 'Operators',
        questions: [
          {
            id: 'sql-op-calc',
            title: 'Calculate Annual Raise',
            desc: 'Write a query to select employee name and their monthly salary multiplied by 1.1 (representing a 10% raise) as "new_salary" from the "employees" table.',
            inputExample: 'Table: employees (name, salary)',
            outputExample: 'List of names and calculated raise columns',
            constraints: ['Alias the calculated column as new_salary.'],
            templates: { sql: `-- Write your SQL query here\nSELECT name, salary * ` },
            verifyKeyword: (code) => code.includes('select') && code.includes('salary') && (code.includes('*') || code.includes('1.1')) && code.includes('as') && code.includes('new_salary')
          }
        ]
      }
    ]
  },

  // ============================================================
  // MODULE 3: FILTERING, SORTING & AGGREGATIONS
  // ============================================================
  {
    id: 'sql-filter-aggregation',
    title: 'Filtering & Aggregations',
    icon: '🔍',
    subModules: [
      {
        id: 'sql-filter-sort',
        title: 'Filtering & Sorting Data',
        questions: [
          {
            id: 'sql-filt-where',
            title: 'Multiple Filter Conditions',
            desc: 'Write a query to retrieve all columns from the "employees" table where the department ID is 2 and salary is greater than 45000.',
            inputExample: 'Table: employees (id, name, salary, dept_id)',
            outputExample: 'Rows matching conditions',
            constraints: ['Use AND comparison.'],
            templates: { sql: `-- Write your SQL query here\nSELECT * FROM employees WHERE ` },
            verifyKeyword: (code) => code.includes('select') && code.includes('where') && code.includes('dept_id') && code.includes('salary') && code.includes('and')
          },
          {
            id: 'sql-sort-order',
            title: 'Sorting Results',
            desc: 'Write a query to retrieve employee names and salaries, sorted by salary in descending order.',
            inputExample: 'Table: employees (name, salary)',
            outputExample: 'Sorted list of names and salaries',
            constraints: ['Use ORDER BY and DESC.'],
            templates: { sql: `-- Write your SQL query here\nSELECT name, salary FROM employees ORDER BY ` },
            verifyKeyword: (code) => code.includes('order') && code.includes('by') && code.includes('salary') && code.includes('desc')
          }
        ]
      },
      {
        id: 'sql-aggregates',
        title: 'Aggregate Functions',
        questions: [
          {
            id: 'sql-agg-avg',
            title: 'Average and Maximum Salary',
            desc: 'Write a query to retrieve the average salary (as avg_sal) and maximum salary (as max_sal) of all employees.',
            inputExample: 'Table: employees (salary)',
            outputExample: 'avg_sal, max_sal values',
            constraints: ['Use AVG() and MAX() with appropriate aliases.'],
            templates: { sql: `-- Write your SQL query here\nSELECT AVG(` },
            verifyKeyword: (code) => code.includes('avg') && code.includes('max') && code.includes('salary')
          }
        ]
      }
    ]
  },

  // ============================================================
  // MODULE 4: GROUPING & JOINS
  // ============================================================
  {
    id: 'sql-groups-joins',
    title: 'Grouping & Joins',
    icon: '🔗',
    subModules: [
      {
        id: 'sql-grouping-having',
        title: 'Grouping Data',
        questions: [
          {
            id: 'sql-grp-count',
            title: 'Department Size Filter',
            desc: 'Write a query to list the department ID and count of employees (as emp_count) for departments with more than 3 employees.',
            inputExample: 'Table: employees (dept_id)',
            outputExample: 'dept_id, emp_count list',
            constraints: ['Use GROUP BY and HAVING COUNT(id) > 3.'],
            templates: { sql: `-- Write your SQL query here\nSELECT dept_id, COUNT(*) as emp_count FROM employees GROUP BY ` },
            verifyKeyword: (code) => code.includes('group') && code.includes('by') && code.includes('having') && code.includes('count') && code.includes('3')
          }
        ]
      },
      {
        id: 'sql-joins-all',
        title: 'Relational Joins',
        questions: [
          {
            id: 'sql-join-inner',
            title: 'INNER JOIN',
            desc: 'Write a query to fetch the employee name and department name matching on dept_id.',
            inputExample: 'Tables: employees (name, dept_id), departments (id, dept_name)',
            outputExample: 'Employee-Department names matched',
            constraints: ['Use INNER JOIN.'],
            templates: { sql: `-- Write your SQL query here\nSELECT e.name, d.dept_name FROM employees e INNER JOIN departments d ` },
            verifyKeyword: (code) => code.includes('inner') && code.includes('join') && code.includes('on')
          },
          {
            id: 'sql-join-left',
            title: 'LEFT JOIN',
            desc: 'Write a query to fetch all employee names and their department names, showing NULL for departments that do not match.',
            inputExample: 'Tables: employees (name, dept_id), departments (id, dept_name)',
            outputExample: 'All employees, matched department names',
            constraints: ['Use LEFT JOIN.'],
            templates: { sql: `-- Write your SQL query here\nSELECT e.name, d.dept_name FROM employees e LEFT JOIN departments d ` },
            verifyKeyword: (code) => code.includes('left') && code.includes('join') && code.includes('on')
          }
        ]
      }
    ]
  },

  // ============================================================
  // MODULE 5: SUBQUERIES & SET OPERATORS
  // ============================================================
  {
    id: 'sql-advanced-queries',
    title: 'Advanced SQL Queries',
    icon: '🚀',
    subModules: [
      {
        id: 'sql-subqueries-nested',
        title: 'Subqueries',
        questions: [
          {
            id: 'sql-sub-nested',
            title: 'Above Average Salary',
            desc: 'Write a query to retrieve names and salaries of employees who earn more than the average salary of the entire company.',
            inputExample: 'Table: employees (name, salary)',
            outputExample: 'Employees with above average salaries',
            constraints: ['Use a subquery with AVG().'],
            templates: { sql: `-- Write your SQL query here\nSELECT name, salary FROM employees WHERE salary > (\n    SELECT ` },
            verifyKeyword: (code) => code.includes('select') && code.includes('salary') && code.includes('where') && code.includes('avg')
          }
        ]
      },
      {
        id: 'sql-set-operators',
        title: 'Set Operators',
        questions: [
          {
            id: 'sql-set-union',
            title: 'UNION Customer & Supplier Cities',
            desc: 'Write a query to retrieve all unique cities where either a customer or a supplier resides.',
            inputExample: 'Tables: customers (city), suppliers (city)',
            outputExample: 'List of unique cities',
            constraints: ['Use UNION to combine results without duplicates.'],
            templates: { sql: `-- Write your SQL query here\nSELECT city FROM customers\nUNION\nSELECT ` },
            verifyKeyword: (code) => code.includes('union') && code.includes('select') && code.includes('city') && code.includes('customers') && code.includes('suppliers')
          },
          {
            id: 'sql-set-intersect',
            title: 'INTERSECT Common Branch Offices',
            desc: 'Write a query to find cities that have both an active customer branch office and an active supplier branch office.',
            inputExample: 'Tables: customers (city), suppliers (city)',
            outputExample: 'Common cities list',
            constraints: ['Use INTERSECT to retrieve matching rows.'],
            templates: { sql: `-- Write your SQL query here\nSELECT city FROM customers\nINTERSECT\nSELECT ` },
            verifyKeyword: (code) => code.includes('intersect') && code.includes('select') && code.includes('city')
          }
        ]
      }
    ]
  }
];

export const CODING_LANGUAGES = [
  {
    id: 'python',
    title: 'Python',
    icon: '🐍',
    description: 'Python is a high-level, interpreted programming language known for its readability and versatility. Practice Python fundamentals from variables to exception handling.',
    color: '#3776AB',
    modules: PYTHON_MODULES
  },
  {
    id: 'java',
    title: 'Java',
    icon: '☕',
    description: 'Java is a class-based, object-oriented language designed for portability. Learn Java syntax, OOP concepts, control flow, and exception handling.',
    color: '#ED8B00',
    modules: PYTHON_MODULES
  },
  {
    id: 'sql',
    title: 'SQL',
    icon: '🗄️',
    description: 'SQL is the standard language for relational database management. Write queries, joins, aggregates, and data filtering exercises.',
    color: '#00D2FC',
    modules: SQL_MODULES
  },
  {
    id: 'dsa',
    title: 'DSA',
    icon: '🧠',
    description: 'Data Structures & Algorithms — the foundation of problem-solving. Practice arrays, linked lists, stacks, queues, and sorting algorithms.',
    color: '#6C5CE7',
    modules: DSA_MODULES
  }
];

