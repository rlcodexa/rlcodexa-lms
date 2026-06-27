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
              javascript: `function evenOrOdd(n) {\n    return n % 2 === 0 ? 'Even' : 'Odd';\n}\n`
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
              javascript: `function checkSign(n) {\n    if (n > 0) return 'Positive';\n    else if (n < 0) return 'Negative';\n    return 'Zero';\n}\n`
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
              javascript: `function isVowel(ch) {\n    return 'aeiou'.includes(ch) ? 'Vowel' : 'Consonant';\n}\n`
            },
            verifyKeyword: (code) => code.includes('aeiou') || code.includes('vowel') || code.includes('Vowel')
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
              javascript: `function rightTriangle(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        lines.push('*'.repeat(i));\n    }\n    return lines.join('\\n');\n}\n`
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
              javascript: `function pyramid(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        const spaces = ' '.repeat(n - i);\n        const stars = '*'.repeat(2 * i - 1);\n        lines.push(spaces + stars);\n    }\n    return lines.join('\\n');\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('*') && (code.includes('spaces') || code.includes(' '))
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
              javascript: `function hollowSquare(n) {\n    const lines = [];\n    for (let i = 0; i < n; i++) {\n        if (i === 0 || i === n - 1) {\n            lines.push('*'.repeat(n));\n        } else {\n            lines.push('*' + ' '.repeat(n - 2) + '*');\n        }\n    }\n    return lines.join('\\n');\n}\n`
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
              javascript: `function diamond(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        lines.push(' '.repeat(n - i) + '*'.repeat(2 * i - 1));\n    }\n    for (let i = n - 1; i >= 1; i--) {\n        lines.push(' '.repeat(n - i) + '*'.repeat(2 * i - 1));\n    }\n    return lines.join('\\n');\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && code.includes('*') && (code.includes('i--') || code.includes('i - 1'))
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
              javascript: `function floydsTriangle(n) {\n    const lines = [];\n    let num = 1;\n    for (let i = 1; i <= n; i++) {\n        const row = [];\n        for (let j = 0; j < i; j++) {\n            row.push(num++);\n        }\n        lines.push(row.join(' '));\n    }\n    return lines.join('\\n');\n}\n`
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
              javascript: `function numberPyramid(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        const spaces = ' '.repeat(n - i);\n        const nums = [];\n        for (let j = 1; j <= i; j++) nums.push(j);\n        lines.push(spaces + nums.join(' '));\n    }\n    return lines.join('\\n');\n}\n`
            },
            verifyKeyword: (code) => code.includes('for') && (code.includes('spaces') || code.includes('nums'))
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
              javascript: `function alphaTriangle(n) {\n    const lines = [];\n    for (let i = 0; i < n; i++) {\n        lines.push(String.fromCharCode(65 + i).repeat(i + 1));\n    }\n    return lines.join('\\n');\n}\n`
            },
            verifyKeyword: (code) => code.includes('chr') || code.includes('fromCharCode') || (code.includes('65') && code.includes('repeat'))
          },
          {
            id: 'cond-alpha-2',
            title: 'Alphabet Pyramid (Hard)',
            desc: 'Write a function that prints a pyramid of letters. Row i has letters from A to the ith letter, centered.',
            inputExample: 'n = 4',
            outputExample: '   A\\n  AB\\n ABC\\nABCD',
            constraints: ['1 <= n <= 26'],
            templates: {
              python: `def alpha_pyramid(n):\n    lines = []\n    for i in range(1, n + 1):\n        spaces = ' ' * (n - i)\n        letters = ''.join(chr(65 + j) for j in range(i))\n        lines.append(spaces + letters)\n    return '\\n'.join(lines)\n`,
              javascript: `function alphaPyramid(n) {\n    const lines = [];\n    for (let i = 1; i <= n; i++) {\n        const spaces = ' '.repeat(n - i);\n        let letters = '';\n        for (let j = 0; j < i; j++) letters += String.fromCharCode(65 + j);\n        lines.push(spaces + letters);\n    }\n    return lines.join('\\n');\n}\n`
            },
            verifyKeyword: (code) => code.includes('chr') || code.includes('fromCharCode') || code.includes('65')
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
    modules: JAVA_MODULES
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    icon: '🟨',
    description: 'JavaScript is the language of the web. Master variables, functions, arrays, objects, and DOM manipulation with hands-on exercises.',
    color: '#F7DF1E',
    modules: JS_MODULES
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
