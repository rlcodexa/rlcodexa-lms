import React, { useState, useContext, useEffect } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import { ChevronLeft, ChevronRight, Send, CheckCircle, Brain, BookOpen, ArrowLeft } from 'lucide-react';

// Aptitude modules data
const APTITUDE_MODULES = [
  {
    id: 'number-system',
    title: 'Number System',
    icon: '🔢',
    subModules: [
      {
        id: 'ns-basics',
        title: 'Basics & Properties',
        groups: [
          {
            id: 'ns-basics-mod1',
            title: 'Module 1',
            questions: [
              { q: 'What is the sum of the first 20 natural numbers?', options: ['190', '210', '200', '220'], answer: 1 },
              { q: 'Which of the following is a prime number?', options: ['87', '89', '91', '93'], answer: 1 },
              { q: 'The value of 5! (5 factorial) is:', options: ['60', '120', '24', '720'], answer: 1 },
              { q: 'How many factors does the number 36 have?', options: ['6', '7', '8', '9'], answer: 2 },
              { q: 'What is the place value of 6 in 4,56,789?', options: ['6000', '60000', '600', '6'], answer: 0 }
            ]
          },
          {
            id: 'ns-basics-mod2',
            title: 'Module 2',
            questions: [
              { q: 'The smallest 3-digit prime number is:', options: ['101', '103', '107', '109'], answer: 0 },
              { q: 'How many factors does 48 have?', options: ['10', '8', '12', '9'], answer: 0 },
              { q: 'What is the sum of first 10 even numbers?', options: ['110', '100', '90', '120'], answer: 0 },
              { q: 'Which is the largest 4-digit number?', options: ['9999', '9998', '10000', '99999'], answer: 0 },
              { q: 'What is the face value of 7 in 3,75,621?', options: ['7', '70000', '7000', '700'], answer: 0 }
            ]
          },
          {
            id: 'ns-basics-mod3',
            title: 'Module 3',
            questions: [
              { q: 'The number of zeroes in 100! (100 factorial) at the end is:', options: ['24', '20', '22', '25'], answer: 0 },
              { q: 'What is the smallest composite number?', options: ['4', '2', '1', '6'], answer: 0 },
              { q: 'How many prime numbers are between 1 and 50?', options: ['15', '12', '18', '10'], answer: 0 },
              { q: 'The sum of first 15 natural numbers is:', options: ['120', '105', '110', '130'], answer: 0 },
              { q: 'What is the product of first 4 prime numbers?', options: ['210', '120', '240', '180'], answer: 0 }
            ]
          }
        ]
      },
      {
        id: 'ns-properties',
        title: 'Number Properties',
        questions: [
          { q: 'Which of the following is an irrational number?', options: ['√2', '4', '0.5', '22/7'], answer: 0 },
          { q: 'The smallest prime number is:', options: ['2', '1', '3', '0'], answer: 0 },
          { q: 'How many whole numbers are between 32 and 53?', options: ['20', '21', '22', '19'], answer: 0 },
          { q: 'Which is the only even prime number?', options: ['2', '4', '1', '3'], answer: 0 },
          { q: 'The sum of first 5 odd numbers is:', options: ['25', '15', '20', '30'], answer: 0 },
          { q: 'A number divisible by both 2 and 3 is divisible by:', options: ['6', '5', '4', '8'], answer: 0 },
          { q: 'How many prime numbers are between 50 and 100?', options: ['10', '12', '8', '15'], answer: 0 },
          { q: 'The only prime number that is even is:', options: ['2', '4', '1', '3'], answer: 0 },
          { q: 'A number divisible by 5 ends with:', options: ['0 or 5', '0 or 2', '5 or 10', '0 or 1'], answer: 0 },
          { q: 'Which of the following is a composite number?', options: ['21', '23', '29', '31'], answer: 0 }
        ]
      },
      {
        id: 'ns-odd-even',
        title: 'Odd, Even & Divisibility',
        questions: [
          { q: 'Which number is divisible by 11?', options: ['121', '131', '141', '151'], answer: 0 },
          { q: 'The product of three consecutive odd numbers is always divisible by:', options: ['3', '6', '9', '12'], answer: 0 },
          { q: 'How many 3-digit numbers are divisible by 7?', options: ['128', '129', '127', '130'], answer: 0 },
          { q: 'If n is an odd integer, which is always even?', options: ['n + 1', '2n + 1', 'n²', 'n³'], answer: 0 },
          { q: 'The difference between a 2-digit number and its reverse is always divisible by:', options: ['3', '9', '11', '7'], answer: 1 },
          { q: 'A number is divisible by 9 if the sum of its digits is divisible by:', options: ['9', '3', '5', '7'], answer: 0 },
          { q: 'How many odd numbers are between 1 and 20?', options: ['10', '9', '11', '12'], answer: 0 },
          { q: 'Which is divisible by 6?', options: ['42', '44', '46', '40'], answer: 0 },
          { q: 'If a number is divisible by 8, it is always divisible by:', options: ['4', '2', 'Both 4 and 2', 'Neither'], answer: 2 },
          { q: 'The smallest 3-digit number divisible by 5 is:', options: ['100', '105', '110', '95'], answer: 0 }
        ]
      },
      {
        id: 'ns-squares',
        title: 'Squares & Roots',
        questions: [
          { q: 'What is √(144) + √(169)?', options: ['25', '23', '27', '21'], answer: 0 },
          { q: 'Which is NOT a perfect square?', options: ['1024', '1296', '1444', '1458'], answer: 3 },
          { q: 'What is the square of 35?', options: ['1125', '1225', '1325', '1025'], answer: 1 },
          { q: '√(0.0169) = ?', options: ['0.13', '0.013', '1.3', '0.0013'], answer: 0 },
          { q: 'If x² = 289, what is x?', options: ['17', '19', '13', '23'], answer: 0 },
          { q: 'What is the cube root of 27?', options: ['3', '9', '6', '12'], answer: 0 },
          { q: '√(625) is:', options: ['25', '35', '15', '45'], answer: 0 },
          { q: 'Which is a perfect cube?', options: ['27', '25', '32', '30'], answer: 0 },
          { q: 'Square of 99 is:', options: ['9801', '9901', '9799', '10001'], answer: 0 },
          { q: '√(196) + √(225) = ?', options: ['29', '31', '27', '33'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'lcm-hcf',
    title: 'LCM & HCF',
    icon: '📐',
    subModules: [
      {
        id: 'lcm-basics',
        title: 'LCM Basics',
        questions: [
          { q: 'LCM of 12 and 18 is:', options: ['36', '72', '24', '48'], answer: 0 },
          { q: 'HCF of 24 and 36 is:', options: ['6', '12', '8', '18'], answer: 1 },
          { q: 'Product of two numbers is 432 and HCF is 6. What is LCM?', options: ['72', '36', '48', '60'], answer: 0 },
          { q: 'LCM of two numbers is 120 and HCF is 5. If one number is 25, the other is:', options: ['24', '20', '28', '30'], answer: 0 },
          { q: 'Three bells ring at intervals of 6, 9, 12 mins. When will they ring together again?', options: ['36 min', '24 min', '18 min', '48 min'], answer: 0 }
        ]
      },
      {
        id: 'hcf-applications',
        title: 'HCF Applications',
        questions: [
          { q: 'Largest number dividing 245 and 305 leaving remainder 5 each time:', options: ['15', '20', '25', '30'], answer: 1 },
          { q: 'HCF of 0.12, 0.18, 0.24 is:', options: ['0.06', '0.04', '0.02', '0.08'], answer: 0 },
          { q: 'Two numbers are in ratio 3:4 and their HCF is 5. LCM is:', options: ['60', '50', '70', '80'], answer: 0 },
          { q: 'HCF of 144 and 198 is:', options: ['18', '12', '24', '36'], answer: 0 },
          { q: 'Greatest number that divides 43, 91, 183 leaving same remainder:', options: ['4', '7', '9', '13'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'percentage',
    title: 'Percentage',
    icon: '💯',
    subModules: [
      {
        id: 'pct-basics',
        title: 'Basic Percentage',
        questions: [
          { q: '25% of 240 is:', options: ['60', '50', '70', '40'], answer: 0 },
          { q: 'What % of 80 is 20?', options: ['25%', '20%', '30%', '15%'], answer: 0 },
          { q: 'If 75% of a number is 300, the number is:', options: ['400', '350', '450', '500'], answer: 0 },
          { q: '0.01% of 10,000 is:', options: ['1', '10', '0.1', '100'], answer: 0 },
          { q: 'Express 3/5 as percentage:', options: ['60%', '75%', '40%', '80%'], answer: 0 }
        ]
      },
      {
        id: 'pct-profit-loss',
        title: 'Profit, Loss & Discount',
        questions: [
          { q: 'A shirt costing ₹500 is sold at ₹400. Loss % is:', options: ['20%', '25%', '15%', '10%'], answer: 0 },
          { q: 'If SP = ₹180 and profit = 20%, CP is:', options: ['₹150', '₹144', '₹160', '₹120'], answer: 0 },
          { q: 'A 20% discount on ₹1500 gives sale price of:', options: ['₹1200', '₹1350', '₹1250', '₹1300'], answer: 0 },
          { q: 'Two successive discounts of 10% and 20% are equal to a single discount of:', options: ['28%', '30%', '25%', '32%'], answer: 0 },
          { q: 'If CP = ₹80 and gain = 12.5%, SP is:', options: ['₹90', '₹85', '₹95', '₹100'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'profit-loss',
    title: 'Profit & Loss',
    icon: '💰',
    subModules: [
      {
        id: 'pl-basics',
        title: 'Basic P&L',
        questions: [
          { q: 'A vendor buys ₹1000 worth of goods and sells at ₹1200. Profit % is:', options: ['20%', '25%', '15%', '10%'], answer: 0 },
          { q: 'If SP = ₹250 and loss = 10%, CP is:', options: ['₹277.78', '₹275', '₹225', '₹300'], answer: 0 },
          { q: 'An item marked at ₹500 is sold for ₹425. Discount % is:', options: ['15%', '20%', '12%', '18%'], answer: 0 },
          { q: 'When CP = SP, there is:', options: ['No profit no loss', 'Profit', 'Loss', 'Cannot determine'], answer: 0 },
          { q: 'A trader sells at 20% profit. If CP is ₹200, SP is:', options: ['₹240', '₹250', '₹220', '₹260'], answer: 0 }
        ]
      },
      {
        id: 'pl-advanced',
        title: 'Advanced P&L',
        questions: [
          { q: 'A sells to B at 10% profit, B sells to C at 5% profit. If C pays ₹231, A\'s cost is:', options: ['₹200', '₹210', '₹220', '₹190'], answer: 0 },
          { q: 'By selling 8 articles, a trader gains CP of 2 articles. Gain % is:', options: ['25%', '20%', '16.67%', '30%'], answer: 0 },
          { q: 'A dishonest dealer sells goods at CP but uses 900g instead of 1kg. Profit % is:', options: ['11.11%', '10%', '12.5%', '9.09%'], answer: 0 },
          { q: 'If % profit = % of CP = % of SP, find the %:', options: ['0%', '50%', '100%', '25%'], answer: 0 },
          { q: 'A man sold two articles for ₹500 each. One at 20% profit, other at 20% loss. Overall:', options: ['Loss ₹41.67', 'Profit ₹41.67', 'No loss no profit', 'Loss ₹50'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'interest',
    title: 'Simple & Compound Interest',
    icon: '📊',
    subModules: [
      {
        id: 'si-basics',
        title: 'Simple Interest',
        questions: [
          { q: 'SI on ₹1000 at 10% for 2 years is:', options: ['₹200', '₹100', '₹150', '₹250'], answer: 0 },
          { q: 'Rate when ₹600 gives ₹120 SI in 2 years:', options: ['10%', '12%', '8%', '15%'], answer: 0 },
          { q: 'Time for ₹800 at 5% to become ₹1000:', options: ['5 years', '4 years', '6 years', '3 years'], answer: 0 },
          { q: 'Sum that yields ₹450 SI at 9% in 2 years:', options: ['₹2500', '₹2000', '₹3000', '₹3500'], answer: 0 },
          { q: 'At what rate does a sum double in 10 years at SI?', options: ['10%', '5%', '12%', '8%'], answer: 0 }
        ]
      },
      {
        id: 'ci-basics',
        title: 'Compound Interest',
        questions: [
          { q: 'CI on ₹1000 at 10% for 2 years is:', options: ['₹210', '₹200', '₹220', '₹190'], answer: 0 },
          { q: 'Amount on ₹5000 at 8% for 2 years compounded annually:', options: ['₹5832', '₹5400', '₹5800', '₹5600'], answer: 0 },
          { q: 'CI - SI for ₹1000 at 10% for 2 years:', options: ['₹10', '₹20', '₹5', '₹15'], answer: 0 },
          { q: 'If CI for 2 years is ₹410 and rate is 5%, the principal is:', options: ['₹4000', '₹3500', '₹4500', '₹5000'], answer: 0 },
          { q: 'A sum triples in 5 years at SI. Rate % is:', options: ['40%', '30%', '50%', '20%'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'time-speed-distance',
    title: 'Time, Speed & Distance',
    icon: '🚄',
    subModules: [
      {
        id: 'tsd-basics',
        title: 'Basic TSD',
        questions: [
          { q: 'Speed of 60 km/h in m/s is:', options: ['16.67', '18', '20', '15'], answer: 0 },
          { q: 'Time to cover 150 km at 30 km/h:', options: ['5 h', '4 h', '6 h', '3 h'], answer: 0 },
          { q: 'Distance covered at 20 m/s for 2 hours:', options: ['144 km', '120 km', '160 km', '100 km'], answer: 0 },
          { q: 'A train 200m long passes a pole in 10s. Speed is:', options: ['20 m/s', '18 m/s', '22 m/s', '15 m/s'], answer: 0 },
          { q: 'Walking at 3/4 of usual speed, a person is 20 min late. Usual time is:', options: ['60 min', '45 min', '30 min', '50 min'], answer: 0 }
        ]
      },
      {
        id: 'tsd-trains',
        title: 'Trains & Platforms',
        questions: [
          { q: 'Train 300m long at 72 km/h crosses a platform 200m in:', options: ['25 s', '20 s', '30 s', '35 s'], answer: 0 },
          { q: 'Two trains 200m and 300m run at 60 and 40 km/h towards each other. Time to cross:', options: ['18 s', '20 s', '15 s', '25 s'], answer: 0 },
          { q: 'A train crosses a man in 12s and a platform 150m in 27s. Train length is:', options: ['120 m', '150 m', '100 m', '180 m'], answer: 0 },
          { q: 'Two trains running same direction at 50 and 30 km/h. Faster crosses slower in 36s. Length of faster:', options: ['200 m', '180 m', '250 m', '150 m'], answer: 0 },
          { q: 'A train passes a bridge 500m long in 30s and a signal in 10s. Train length:', options: ['250 m', '200 m', '300 m', '350 m'], answer: 0 }
        ]
      },
      {
        id: 'tsd-boats',
        title: 'Boats & Streams',
        questions: [
          { q: 'Speed of boat in still water is 10 km/h and stream is 2 km/h. Downstream speed:', options: ['12 km/h', '8 km/h', '10 km/h', '14 km/h'], answer: 0 },
          { q: 'Upstream speed = 6 km/h, downstream = 10 km/h. Speed of boat in still water:', options: ['8 km/h', '7 km/h', '9 km/h', '6 km/h'], answer: 0 },
          { q: 'A boat travels 24 km upstream in 4h and 36 km downstream in 3h. Speed of stream:', options: ['2 km/h', '3 km/h', '1 km/h', '4 km/h'], answer: 1 },
          { q: 'Speed of stream is 3 km/h. Downstream speed is 15 km/h. Speed upstream:', options: ['9 km/h', '12 km/h', '10 km/h', '8 km/h'], answer: 0 },
          { q: 'A boat covers 12 km upstream in 3h and 20 km downstream in 2h. Boat speed:', options: ['7 km/h', '6 km/h', '8 km/h', '5 km/h'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'time-work',
    title: 'Time & Work',
    icon: '⚙️',
    subModules: [
      {
        id: 'tw-basics',
        title: 'Basic Time & Work',
        questions: [
          { q: 'A does a work in 10 days, B in 15 days. Together they finish in:', options: ['6 days', '5 days', '7 days', '8 days'], answer: 0 },
          { q: 'A is twice as efficient as B. A takes 20 days less. Days taken by A:', options: ['20', '15', '25', '30'], answer: 0 },
          { q: 'Pipes A and B fill a tank in 6 and 8 hours. Together they fill in:', options: ['24/7 h', '7 h', '5 h', '10/3 h'], answer: 0 },
          { q: '4 men or 6 women can do a work in 12 days. 6 men and 6 women in:', options: ['4.8 days', '5 days', '6 days', '7.2 days'], answer: 0 },
          { q: 'A can do 1/3 of work in 5 days. B can do 2/5 in 10 days. Together in:', options: ['9.375 days', '8 days', '10 days', '7.5 days'], answer: 0 }
        ]
      },
      {
        id: 'tw-wages',
        title: 'Work & Wages',
        questions: [
          { q: 'A, B, C together earn ₹600 in 5 days. A and B earn ₹200 in 5 days. C\'s daily wage:', options: ['₹80', '₹60', '₹100', '₹120'], answer: 0 },
          { q: 'A and B together do a work in 12 days, B and C in 15, A and C in 20. All together:', options: ['10 days', '8 days', '12 days', '9 days'], answer: 0 },
          { q: 'If 5 men or 7 women earn ₹1050 in 6 days, 7 men and 5 women earn in 8 days:', options: ['₹3080', '₹2800', '₹3500', '₹3200'], answer: 0 },
          { q: 'A is thrice as good as B. Together they finish in 15 days. B alone takes:', options: ['60 days', '45 days', '30 days', '50 days'], answer: 0 },
          { q: 'Pipe A fills in 20 min, B empties in 30 min. If both open, tank fills in:', options: ['60 min', '50 min', '40 min', '30 min'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'ratio-proportion',
    title: 'Ratio & Proportion',
    icon: '⚖️',
    subModules: [
      {
        id: 'rp-basics',
        title: 'Basic Ratio',
        questions: [
          { q: 'Ratio 15:25 simplified is:', options: ['3:5', '5:3', '3:4', '5:6'], answer: 0 },
          { q: 'If A:B = 2:3 and B:C = 4:5, A:C = ?', options: ['8:15', '2:5', '4:7', '6:5'], answer: 0 },
          { q: 'Divide ₹500 in ratio 2:3. Larger share is:', options: ['₹300', '₹200', '₹250', '₹350'], answer: 0 },
          { q: 'Fourth proportional to 6, 9, 12 is:', options: ['18', '15', '20', '16'], answer: 0 },
          { q: 'Mean proportional between 9 and 25 is:', options: ['15', '17', '12', '20'], answer: 0 }
        ]
      },
      {
        id: 'rp-mixtures',
        title: 'Mixtures & Alligations',
        questions: [
          { q: 'Mix rice ₹12/kg and ₹15/kg in ratio 2:1. Cost of mixture per kg:', options: ['₹13', '₹14', '₹13.50', '₹12.50'], answer: 0 },
          { q: 'A 20L mixture has milk:water = 3:1. Milk to add to make 4:1:', options: ['5L', '4L', '6L', '3L'], answer: 0 },
          { q: 'In what ratio must ₹5/kg and ₹8/kg rice be mixed to get ₹6.20/kg?', options: ['3:2', '2:3', '1:1', '4:3'], answer: 0 },
          { q: 'A 40L mixture has milk:water = 5:3. Water to add to make 1:1:', options: ['10L', '8L', '12L', '6L'], answer: 0 },
          { q: 'Two alloys have gold:copper = 1:2 and 2:3. Mix in ratio 1:1. New ratio:', options: ['7:13', '3:5', '5:7', '13:7'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'average',
    title: 'Average',
    icon: '📈',
    subModules: [
      {
        id: 'avg-basics',
        title: 'Basic Averages',
        questions: [
          { q: 'Average of 15, 20, 25, 30, 35 is:', options: ['25', '20', '30', '35'], answer: 0 },
          { q: 'Average of first 10 natural numbers:', options: ['5.5', '5', '6', '4.5'], answer: 0 },
          { q: 'Average age of 5 students is 15. If teacher included, average is 16. Teacher\'s age:', options: ['21', '20', '18', '24'], answer: 0 },
          { q: 'Average of 10 numbers is 25. If each number is doubled, new average:', options: ['50', '25', '75', '100'], answer: 0 },
          { q: 'Average of 5 numbers is 20. If one number is removed, average is 18. Removed number:', options: ['28', '22', '25', '30'], answer: 0 }
        ]
      },
      {
        id: 'avg-advanced',
        title: 'Advanced Averages',
        questions: [
          { q: 'Average of 20 numbers is 0. How many numbers can be > 0 at most?', options: ['19', '18', '20', '10'], answer: 0 },
          { q: 'Average weight of 6 men increases by 2 kg when one (80kg) leaves. New man\'s weight:', options: ['92 kg', '84 kg', '88 kg', '90 kg'], answer: 0 },
          { q: 'Average of 50 numbers is 30. Sum of first 30 is 900. Average of remaining:', options: ['30', '25', '35', '28'], answer: 0 },
          { q: 'Average marks of 30 students is 45. If 5 students leave, average is 48. Average of those 5:', options: ['30', '35', '28', '42'], answer: 0 },
          { q: 'Average speed of a car going at 40 km/h and returning at 60 km/h:', options: ['48 km/h', '50 km/h', '45 km/h', '52 km/h'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'data-interpretation',
    title: 'Data Interpretation',
    icon: '📊',
    subModules: [
      {
        id: 'di-tables',
        title: 'Tables & Charts',
        questions: [
          { q: 'A table shows 2018: 120, 2019: 150, 2020: 180. 2019-2020 growth %:', options: ['20%', '25%', '15%', '30%'], answer: 0 },
          { q: 'In a pie chart, angle of 25% is:', options: ['90°', '45°', '60°', '120°'], answer: 0 },
          { q: 'From 2018(120) to 2020(180), 2-year growth %:', options: ['50%', '33.3%', '66.7%', '40%'], answer: 0 },
          { q: 'A bar graph shows sales: 40, 60, 80, 100. Average sales:', options: ['70', '60', '80', '75'], answer: 0 },
          { q: 'Number of students: 2018(200), 2019(250), 2020(300). % increase 2018-2020:', options: ['50%', '33.3%', '40%', '25%'], answer: 0 }
        ]
      },
      {
        id: 'di-graphs',
        title: 'Graph Analysis',
        questions: [
          { q: 'Production: Jan(500), Feb(600), Mar(550). Feb-Mar change %:', options: ['-8.33%', '8.33%', '-9.09%', '9.09%'], answer: 0 },
          { q: 'If imports are 20% of exports, export:import = ?', options: ['5:1', '1:5', '4:1', '1:4'], answer: 0 },
          { q: 'Revenue Q1=200, Q2=250, Q3=300, Q4=350. Quarter with 20% growth:', options: ['Q2', 'Q3', 'Q4', 'None'], answer: 0 },
          { q: 'Line chart shows profit: 10, 20, 15, 25. Highest profit year exceeds lowest by:', options: ['150%', '100%', '200%', '50%'], answer: 0 },
          { q: 'A pie chart has 4 sectors with angles 90°, 120°, 80°, 70°. Largest sector %:', options: ['33.33%', '30%', '35%', '40%'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'permutation-combination',
    title: 'Permutation & Combination',
    icon: '🎲',
    subModules: [
      {
        id: 'pc-permutations',
        title: 'Permutations',
        questions: [
          { q: 'Number of ways to arrange 5 books on a shelf:', options: ['120', '60', '240', '25'], answer: 0 },
          { q: 'How many 3-digit numbers can be formed from 1,2,3,4,5 without repetition?', options: ['60', '125', '120', '100'], answer: 0 },
          { q: 'P(7,3) = ?', options: ['210', '35', '840', '70'], answer: 0 },
          { q: 'Number of ways to arrange letters of "APPLE":', options: ['60', '120', '30', '240'], answer: 0 },
          { q: 'In how many ways can 4 people sit in 6 chairs?', options: ['360', '120', '720', '180'], answer: 0 }
        ]
      },
      {
        id: 'pc-combinations',
        title: 'Combinations',
        questions: [
          { q: 'C(8,3) = ?', options: ['56', '336', '28', '112'], answer: 0 },
          { q: 'Number of ways to choose 2 from 5 fruits:', options: ['10', '20', '5', '15'], answer: 0 },
          { q: 'A committee of 3 from 10 members. Ways:', options: ['120', '720', '240', '60'], answer: 0 },
          { q: 'If C(n,3) = 35, n = ?', options: ['7', '6', '8', '5'], answer: 0 },
          { q: 'Number of diagonals in a hexagon:', options: ['9', '6', '12', '15'], answer: 0 }
        ]
      }
    ]
  }
];

const Aptitude = ({ setCurrentPage }) => {
  const { currentUser, saveAssessmentResult, isModuleCompleted, addActivityLog } = useContext(AssessmentContext);

  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubModule, setSelectedSubModule] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    addActivityLog(currentUser?.name || 'Student', 'student', 'APTITUDE_START', 'Opened Aptitude Assessment hub.');
  }, []);

  const activeQuestions = selectedGroup ? selectedGroup.questions : (selectedSubModule?.questions || []);
  const completionId = selectedGroup ? selectedGroup.id : (selectedSubModule?.id || '');

  const handleSelectAnswer = (qIdx, optIdx) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [`${completionId}-${qIdx}`]: optIdx
    }));
  };

  const handleSubmit = () => {
    if (!activeQuestions.length) return;
    let correct = 0;
    activeQuestions.forEach((q, idx) => {
      const key = `${completionId}-${idx}`;
      if (selectedAnswers[key] === q.answer) correct++;
    });
    const pct = Math.round((correct / activeQuestions.length) * 100);
    setScore(pct);
    setSubmitted(true);
    saveAssessmentResult('aptitude', completionId, pct);
  };

  const handleBackToModules = () => {
    if (selectedGroup) {
      setSelectedGroup(null);
    } else {
      setSelectedSubModule(null);
    }
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(null);
  };

  const handleBackToTopics = () => {
    setSelectedModule(null);
    setSelectedSubModule(null);
    setSelectedGroup(null);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(null);
  };

  const handleBackToSubModules = () => {
    setSelectedGroup(null);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(null);
  };

  // Module selection view
  if (!selectedModule) {
    return (
      <div>
        <button
          onClick={() => setCurrentPage('quizhub')}
          className="btn-neon"
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            marginBottom: '16px',
            borderColor: 'var(--primary-blue)',
            color: '#fff'
          }}
        >
          <ArrowLeft size={14} style={{ marginRight: '6px' }} /> Back to Quiz Hub
        </button>
        <div className="page-header" style={{ marginBottom: '20px' }}>
          <div>
            <div className="cyber-badge" style={{ marginBottom: '8px' }}>
              <Brain size={12} style={{ marginRight: '4px' }} /> APTITUDE ASSESSMENT
            </div>
            <h1 className="page-title">
              Aptitude <span>Modules</span>
            </h1>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
          Select a module to begin. Each module has 2-3 sub-modules with 5 questions each.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {APTITUDE_MODULES.map(mod => {
            const completed = mod.subModules.every(sm => {
              if (sm.groups) return sm.groups.every(g => isModuleCompleted('aptitude', g.id));
              return isModuleCompleted('aptitude', sm.id);
            });
            return (
              <div
                key={mod.id}
                className="glass-panel"
                style={{
                  padding: '20px',
                  borderTop: `3px solid ${completed ? '#10b981' : 'var(--primary-blue)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setSelectedModule(mod)}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{mod.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>
                  {mod.title}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <span>{mod.subModules.length} sub-modules</span>
                  {completed && <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14} /> Complete</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const isSubModuleComplete = (sm) => {
    if (sm.groups) {
      return sm.groups.every(g => isModuleCompleted('aptitude', g.id));
    }
    return isModuleCompleted('aptitude', sm.id);
  };

  const subModuleQsCount = (sm) => {
    if (sm.groups) {
      return sm.groups.reduce((sum, g) => sum + g.questions.length, 0);
    }
    return sm.questions.length;
  };

  // Sub-module selection view
  if (!selectedSubModule) {
    return (
      <div>
        <div className="page-header" style={{ marginBottom: '20px' }}>
          <div>
            <div className="cyber-badge" style={{ marginBottom: '8px' }}>
              <Brain size={12} style={{ marginRight: '4px' }} /> {selectedModule.icon} {selectedModule.title}
            </div>
            <h1 className="page-title">
              {selectedModule.title} <span>Sub-Modules</span>
            </h1>
          </div>
          <button className="btn-cyber-outline" onClick={handleBackToTopics} style={{ padding: '8px 16px', fontSize: '13px' }}>
            <ArrowLeft size={14} /> Back to Modules
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {selectedModule.subModules.map(sm => {
            const done = isSubModuleComplete(sm);
            return (
              <div
                key={sm.id}
                className="glass-panel"
                style={{
                  padding: '20px',
                  borderTop: `3px solid ${done ? '#10b981' : 'var(--secondary-cyan)'}`,
                  opacity: done ? 0.7 : 1,
                  cursor: done ? 'default' : 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => { if (!done) setSelectedSubModule(sm); }}
                onMouseEnter={(e) => { if (!done) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '700' }}>{sm.title}</h3>
                  {done ? (
                    <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                      <CheckCircle size={14} /> Done
                    </span>
                  ) : (
                    <span style={{ color: 'var(--secondary-cyan)', fontSize: '12px' }}>{subModuleQsCount(sm)} Qs</span>
                  )}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                  {sm.groups ? `${sm.groups.length} modules • Score tracked` : '5 multiple choice questions • Score tracked'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Group selection view (for sub-modules with groups)
  if (selectedSubModule.groups && !selectedGroup) {
    return (
      <div>
        <div className="page-header" style={{ marginBottom: '20px' }}>
          <div>
            <div className="cyber-badge" style={{ marginBottom: '8px' }}>
              <Brain size={12} style={{ marginRight: '4px' }} /> {selectedModule.icon} {selectedModule.title}
            </div>
            <h1 className="page-title">
              {selectedSubModule.title} <span>Modules</span>
            </h1>
          </div>
          <button className="btn-cyber-outline" onClick={handleBackToModules} style={{ padding: '8px 16px', fontSize: '13px' }}>
            <ArrowLeft size={14} /> Back to Sub-Modules
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {selectedSubModule.groups.map(g => {
            const done = isModuleCompleted('aptitude', g.id);
            return (
              <div
                key={g.id}
                className="glass-panel"
                style={{
                  padding: '20px',
                  borderTop: `3px solid ${done ? '#10b981' : 'var(--primary-blue)'}`,
                  opacity: done ? 0.7 : 1,
                  cursor: done ? 'default' : 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => { if (!done) setSelectedGroup(g); }}
                onMouseEnter={(e) => { if (!done) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '700' }}>{g.title}</h3>
                  {done ? (
                    <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                      <CheckCircle size={14} /> Done
                    </span>
                  ) : (
                    <span style={{ color: 'var(--primary-blue)', fontSize: '12px' }}>{g.questions.length} Qs</span>
                  )}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                  5 multiple choice questions
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Question view
  console.log('[Aptitude Debug]', {
    selectedGroup: selectedGroup?.id,
    selectedGroupTitle: selectedGroup?.title,
    selectedSubModule: selectedSubModule?.id,
    activeQuestionsCount: activeQuestions?.length,
    hasQuestions: !!activeQuestions?.length,
    currentIdx,
    submitted
  });

  const currentQuestion = activeQuestions[currentIdx];
  const progressPct = ((currentIdx + 1) / activeQuestions.length) * 100;

  const headerTitle = selectedGroup ? selectedGroup.title : selectedSubModule.title;
  const headerBadge = selectedGroup
    ? `${selectedModule.title} / ${selectedSubModule.title} / ${selectedGroup.title}`
    : `${selectedModule.title} / ${selectedSubModule.title}`;
  const backHandler = selectedGroup ? handleBackToSubModules : handleBackToModules;

  return (
    <div>
      <div className="page-header" style={{ marginBottom: '16px' }}>
        <div>
          <div className="cyber-badge" style={{ marginBottom: '8px' }}>
            <BookOpen size={12} style={{ marginRight: '4px' }} /> {headerBadge}
          </div>
          <h1 className="page-title" style={{ fontSize: '22px' }}>
            {headerTitle}
          </h1>
        </div>
        <button className="btn-cyber-outline" onClick={backHandler} style={{ padding: '8px 16px', fontSize: '13px' }}>
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      {submitted ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: score >= 60 ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
            border: `1px solid ${score >= 60 ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <CheckCircle size={36} color={score >= 60 ? '#10b981' : '#f59e0b'} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Assessment Submitted!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '8px' }}>
            {headerTitle} — {selectedModule.title}
          </p>
          <div style={{ fontSize: '42px', fontWeight: '800', color: score >= 60 ? '#10b981' : '#f59e0b', margin: '16px 0' }}>
            {score}%
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
            Score saved to your record. Points added to your profile.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn-cyber-outline" onClick={backHandler} style={{ padding: '10px 20px' }}>
              Back to {selectedGroup ? 'Modules' : 'Sub-Modules'}
            </button>
            <button className="btn-neon" onClick={handleBackToTopics} style={{ padding: '10px 20px' }}>
              Back to Module Selection
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
              <span>Progress</span>
              <span>Question {currentIdx + 1} of {activeQuestions.length}</span>
            </div>
            <div className="progress-track" style={{ height: '6px' }}>
              <div className="progress-bar-fill" style={{ width: `${progressPct}%`, background: 'var(--primary-blue)' }}></div>
            </div>
          </div>

          <div style={{ minHeight: '80px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: '600', lineHeight: '1.6' }}>
              {currentQuestion.q}
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {currentQuestion.options.map((opt, oi) => {
              const isSelected = selectedAnswers[`${completionId}-${currentIdx}`] === oi;
              return (
                <div
                  key={oi}
                  className={`quiz-option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectAnswer(currentIdx, oi)}
                  style={{
                    padding: '14px 18px',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    border: `1px solid ${isSelected ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                    background: isSelected ? 'rgba(0,191,255,0.08)' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      border: `2px solid ${isSelected ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '13px', fontWeight: 'bold',
                      color: isSelected ? '#fff' : 'var(--text-muted)',
                      background: isSelected ? 'var(--primary-blue)' : 'transparent'
                    }}>
                      {String.fromCharCode(65 + oi)}
                    </div>
                    <span style={{ fontSize: '15px', color: isSelected ? '#fff' : 'var(--text-muted)' }}>{opt}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            <button
              className="btn-cyber-outline"
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              style={{ padding: '10px 20px', fontSize: '14px' }}
            >
              <ChevronLeft size={16} /> Previous
            </button>

            {currentIdx === activeQuestions.length - 1 ? (
              <button className="btn-neon" onClick={handleSubmit} style={{ padding: '10px 24px', fontSize: '14px', background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                Submit Assessment <Send size={16} />
              </button>
            ) : (
              <button
                className="btn-neon"
                onClick={() => setCurrentIdx(prev => Math.min(activeQuestions.length - 1, prev + 1))}
                style={{ padding: '10px 24px', fontSize: '14px' }}
              >
                Next <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Aptitude;
