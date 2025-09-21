import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, PlayCircle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock course data - in a real app this would come from a database
const courseData = {
  1: {
    id: 1,
    title: "Introduction to React",
    description: "Learn the fundamentals of React development and build modern web applications",
    image: "/react-course-thumbnail.png",
    instructor: "Sarah Johnson",
    duration: "8 hours",
    level: "Beginner",
    rating: 4.8,
    students: 1250,
    enrolled: true,
    progress: 75,
    lessons: [
      {
        id: 1,
        title: "What is React?",
        duration: "8 min",
        type: "lesson" as const,
        completed: true,
        description: "Introduction to React and its core concepts",
        content: `React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage the state of their applications efficiently.

## Key Concepts

### Components
Components are the building blocks of a React application. They let you split the UI into independent, reusable pieces.

### JSX
JSX is a syntax extension for JavaScript that looks similar to XML or HTML.

### Props
Props are how components receive data from their parent components.

### State
State allows components to manage their own data.

## Example Component

\`\`\`javascript
import React from 'react';

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

export default Welcome;
\`\`\`

This is a simple React component that accepts a \`name\` prop and displays a greeting.`,
      },
      {
        id: 2,
        title: "Setting up Your Development Environment",
        duration: "10 min",
        type: "lesson" as const,
        completed: true,
        description: "Install Node.js, npm, and create your first React app",
        content: `Setting up your development environment is the first step to building React applications.

## Prerequisites

### Node.js and npm
React development relies on Node.js for package management and running development servers.

### Create React App
A command-line tool that scaffolds a new React project with sensible defaults.

## Installation Steps

\`\`\`bash
# Install Create React App globally
npm install -g create-react-app

# Create a new React project
npx create-react-app my-first-react-app

# Navigate to the project directory
cd my-first-react-app

# Start the development server
npm start
\`\`\`

Your React application will be available at \`http://localhost:3000\`.`,
      },
      {
        id: 3,
        title: "Understanding JSX",
        duration: "12 min",
        type: "lesson" as const,
        completed: true,
        description: "Learn JSX syntax and how to write React components",
        content: `JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code within your JavaScript files.

## JSX Basics

JSX makes it easier to write and add HTML in React:

\`\`\`jsx
const element = <h1>Hello, world!</h1>;

function App() {
  return (
    <div>
      <h2>Welcome to My App</h2>
      <p>This is a paragraph written in JSX.</p>
    </div>
  );
}
\`\`\`

## JSX Rules

1. JSX must return a single parent element
2. JSX elements must be properly closed
3. JSX attributes are written using camelCase

## Embedding Expressions

You can embed any JavaScript expression in JSX by wrapping it in curly braces:

\`\`\`jsx
const name = 'John';
const element = <h1>Hello, {name}</h1>;
\`\`\``,
      },
      {
        id: 4,
        title: "Components and Props",
        duration: "15 min",
        type: "lesson" as const,
        completed: false,
        description: "Create reusable components and pass data with props",
        content: `Components let you split the UI into independent, reusable pieces. Props (short for "properties") are how you pass data from a parent component to a child component.

## Function Components

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`

## Using Components

\`\`\`jsx
function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
      <Welcome name="Charlie" />
    </div>
  );
}
\`\`\`

## Props are Read-Only

Components must never modify their own props. They should act like pure functions with respect to their props.`,
      },
      {
        id: 5,
        title: "State and Event Handling",
        duration: "18 min",
        type: "lesson" as const,
        completed: false,
        description: "Manage component state and handle user interactions",
        content: `State allows a component to manage its own data. When state changes, React re-renders the component to reflect the new state.

## Using useState Hook

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Event Handling

React events are named using camelCase and you pass a function as the event handler:

\`\`\`jsx
function Button() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
\`\`\``,
      },
      {
        id: 6,
        title: "Practice Exercise: Todo App",
        duration: "30 min",
        type: "exercise" as const,
        completed: false,
        description: "Build a simple todo application using React",
        content: `Now it's time to apply what you've learned by building a simple todo application.

## Exercise Requirements

Build a todo app with the following features:

1. **Add new todos** - Input field to add new tasks
2. **Display todos** - List all todos
3. **Mark as complete** - Toggle todo completion status
4. **Delete todos** - Remove todos from the list

## Starter Code

\`\`\`jsx
import React, { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add</button>
      {/* Add your todo list here */}
    </div>
  );
}

export default TodoApp;
\`\`\`

Complete the implementation by adding the todo list display and toggle/delete functionality.`,
      },
    ],
  },
  2: {
    id: 2,
    title: "Advanced JavaScript",
    description: "Master advanced JavaScript concepts, patterns, and modern ES6+ features",
    image: "/javascript-course-thumbnail.png",
    instructor: "Mike Chen",
    duration: "18 hours",
    level: "Advanced",
    rating: 4.9,
    students: 890,
    enrolled: true,
    progress: 30,
    lessons: [
      {
        id: 101,
        title: "ES6+ Features and Modern Syntax",
        duration: "18 min",
        type: "lesson" as const,
        completed: true,
        description: "Explore arrow functions, destructuring, template literals, and more",
        content: `Modern JavaScript includes many powerful features that make code more concise and readable.

## Arrow Functions

Arrow functions provide a more concise syntax for writing functions:

\`\`\`javascript
// Traditional function
const add = function(a, b) {
  return a + b;
};

// Arrow function
const addArrow = (a, b) => a + b;

// Arrow function with single parameter
const square = x => x * x;

// Arrow function with no parameters
const greet = () => console.log('Hello!');
\`\`\`

## Destructuring

Extract values from arrays or properties from objects:

\`\`\`javascript
// Object destructuring
const person = { name: 'Alice', age: 30, city: 'New York' };
const { name, age } = person;
console.log(name); // 'Alice'

// Destructuring with default values
const { country = 'USA' } = person;

// Array destructuring
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log(first); // 1
console.log(rest); // [3, 4, 5]
\`\`\`

## Template Literals

Create strings with embedded expressions:

\`\`\`javascript
const name = 'Bob';
const age = 25;
const greeting = \`Hello, \${name}! You are \${age} years old.\`;

// Multi-line strings
const multiLine = \`
  This is a
  multi-line
  string
\`;
\`\`\`

## Spread and Rest Operators

\`\`\`javascript
// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Rest operator
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
\`\`\``,
      },
      {
        id: 102,
        title: "Asynchronous JavaScript Mastery",
        duration: "20 min",
        type: "lesson" as const,
        completed: true,
        description: "Master promises, async/await, and advanced asynchronous patterns",
        content: `Understanding advanced function concepts is crucial for mastering JavaScript.

## Closures

A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned:

\`\`\`javascript
function createCounter() {
  let count = 0;
  
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
\`\`\`

## Higher-Order Functions

Functions that take other functions as arguments or return functions:

\`\`\`javascript
// Function that takes another function as argument
function withLogging(fn) {
  return function(...args) {
    console.log('Calling function with args:', args);
    const result = fn(...args);
    console.log('Function returned:', result);
    return result;
  };
}

const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(2, 3); // Logs execution details
\`\`\`

## Partial Application and Currying

\`\`\`javascript
// Currying
function multiply(a) {
  return function(b) {
    return a * b;
  };
}

const double = multiply(2);
console.log(double(5)); // 10

// Using arrow functions
const curriedAdd = a => b => a + b;
const addFive = curriedAdd(5);
\`\`\`

## Function Composition

\`\`\`javascript
const compose = (f, g) => x => f(g(x));

const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;

const addOneThenDouble = compose(multiplyByTwo, addOne);
console.log(addOneThenDouble(3)); // 8 (3 + 1 = 4, 4 * 2 = 8)
\`\`\``,
      },
      {
        id: 103,
        title: "Advanced Object-Oriented JavaScript",
        duration: "22 min",
        type: "lesson" as const,
        completed: false,
        description: "Master promises, async/await, and advanced asynchronous patterns",
        content: `Asynchronous programming is essential for modern JavaScript development.

## Promises

Promises represent the eventual completion or failure of an asynchronous operation:

\`\`\`javascript
// Creating a promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        resolve('Data fetched successfully!');
      } else {
        reject(new Error('Failed to fetch data'));
      }
    }, 1000);
  });
};

// Using promises
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
\`\`\`

## Async/Await

Syntactic sugar for working with promises:

\`\`\`javascript
async function fetchUserData(userId) {
  try {
    const user = await fetch(\`/api/users/\${userId}\`);
    const userData = await user.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Using async function
(async () => {
  const user = await fetchUserData(123);
  console.log(user);
})();
\`\`\`

## Promise Combinators

\`\`\`javascript
// Promise.all - waits for all promises to resolve
const urls = ['/api/users', '/api/posts', '/api/comments'];
const requests = urls.map(url => fetch(url));

Promise.all(requests)
  .then(responses => Promise.all(responses.map(r => r.json())))
  .then(data => console.log('All data:', data));

// Promise.race - resolves with first completed promise
Promise.race([
  fetch('/api/data'),
  new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), 5000)
  )
]);
\`\`\`

## Error Handling

\`\`\`javascript
async function robustDataFetch() {
  const maxRetries = 3;
  let attempts = 0;
  
  while (attempts < maxRetries) {
    try {
      const data = await fetchData();
      return data;
    } catch (error) {
      attempts++;
      if (attempts === maxRetries) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
    }
  }
}
\`\`\``,
      },
      {
        id: 104,
        title: "Object-Oriented JavaScript and Prototypes",
        duration: "28 min",
        type: "video" as const,
        completed: false,
        description: "Understand prototypal inheritance, classes, and object creation patterns",
        content: `JavaScript uses prototypal inheritance, which is different from classical inheritance.

## Prototypal Inheritance

Every object in JavaScript has a prototype:

\`\`\`javascript
// Constructor function
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(\`\${this.name} makes a noise\`);
};

const dog = new Animal('Dog');
dog.speak(); // "Dog makes a noise"

// Checking prototype chain
console.log(dog.__proto__ === Animal.prototype); // true
\`\`\`

## ES6 Classes

Syntactic sugar over prototypal inheritance:

\`\`\`javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(\`\${this.name} makes a noise\`);
  }

  static getSpecies() {
    return 'Unknown';
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    console.log(\`\${this.name} barks\`);
  }

  wagTail() {
    console.log(\`\${this.name} wags tail\`);
  }
}

const myDog = new Dog('Buddy', 'Golden Retriever');
myDog.speak(); // "Buddy barks"
\`\`\`

## Object Creation Patterns

\`\`\`javascript
// Factory function
function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(\`Hi, I'm \${this.name}\`);
    }
  };
}

// Object.create pattern
const personPrototype = {
  greet() {
    console.log(\`Hi, I'm \${this.name}\`);
  }
};

const person = Object.create(personPrototype);
person.name = 'Alice';
\`\`\`

## Private Fields and Methods

\`\`\`javascript
class BankAccount {
  #balance = 0; // Private field

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  #validateAmount(amount) { // Private method
    return amount > 0;
  }

  deposit(amount) {
    if (this.#validateAmount(amount)) {
      this.#balance += amount;
    }
  }

  getBalance() {
    return this.#balance;
  }
}
\`\`\``,
      },
      {
        id: 105,
        title: "Advanced Array Methods and Data Manipulation",
        duration: "16 min",
        type: "lesson" as const,
        completed: false,
        description: "Master map, reduce, filter, and advanced data manipulation techniques",
        content: `Learn powerful methods for data transformation and manipulation.

## Array Methods Overview

The fundamental array methods for functional programming:

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map - transform each element
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// filter - select elements that match a condition
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

// reduce - combine all elements into a single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 55
\`\`\`

## Advanced Array Methods

\`\`\`javascript
const users = [
  { id: 1, name: 'Alice', age: 25, active: true },
  { id: 2, name: 'Bob', age: 30, active: false },
  { id: 3, name: 'Charlie', age: 35, active: true }
];

// find - get first matching element
const alice = users.find(user => user.name === 'Alice');

// findIndex - get index of first matching element
const bobIndex = users.findIndex(user => user.name === 'Bob');

// some - check if any element matches
const hasActiveUsers = users.some(user => user.active);

// every - check if all elements match
const allActive = users.every(user => user.active);

// flatMap - map and flatten
const userIds = users.flatMap(user => [user.id, \`user-\${user.id}\`]);
\`\`\`

## Complex Reduce Examples

\`\`\`javascript
// Group by property
const groupedByAge = users.reduce((groups, user) => {
  const ageGroup = user.age < 30 ? 'young' : 'older';
  if (!groups[ageGroup]) {
    groups[ageGroup] = [];
  }
  groups[ageGroup].push(user);
  return groups;
}, {});

// Count occurrences
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const fruitCount = fruits.reduce((count, fruit) => {
  count[fruit] = (count[fruit] || 0) + 1;
  return count;
}, {});
\`\`\`

## Object Methods

\`\`\`javascript
const obj = { a: 1, b: 2, c: 3 };

// Object.keys, Object.values, Object.entries
const keys = Object.keys(obj); // ['a', 'b', 'c']
const values = Object.values(obj); // [1, 2, 3]
const entries = Object.entries(obj); // [['a', 1], ['b', 2], ['c', 3]]

// Object.fromEntries
const doubled = Object.fromEntries(
  Object.entries(obj).map(([key, value]) => [key, value * 2])
);

// Object.assign and spread
const extended = { ...obj, d: 4, e: 5 };
\`\`\``,
      },
      {
        id: 106,
        title: "JavaScript Modules and Module Patterns",
        duration: "19 min",
        type: "lesson" as const,
        completed: false,
        description: "Learn ES6 modules, CommonJS, and modern bundling strategies",
        content: `Modules help organize and structure JavaScript applications.

## ES6 Modules

Modern JavaScript module system:

\`\`\`javascript
// math.js - Named exports
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// Default export
export default function subtract(a, b) {
  return a - b;
}
\`\`\`

\`\`\`javascript
// main.js - Importing
import subtract, { PI, add, multiply } from './math.js';

// Import all as namespace
import * as MathUtils from './math.js';

// Dynamic imports
const loadMath = async () => {
  const mathModule = await import('./math.js');
  return mathModule;
};
\`\`\`

## CommonJS (Node.js)

\`\`\`javascript
// math.js
const PI = 3.14159;

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = {
  PI,
  add,
  multiply
};

// Alternative syntax
exports.PI = PI;
exports.add = add;
\`\`\`

\`\`\`javascript
// main.js
const { PI, add, multiply } = require('./math');
const math = require('./math');
\`\`\`

## Module Patterns

\`\`\`javascript
// Revealing Module Pattern
const Calculator = (function() {
  let result = 0;

  function add(x) {
    result += x;
    return this;
  }

  function multiply(x) {
    result *= x;
    return this;
  }

  function getResult() {
    return result;
  }

  function reset() {
    result = 0;
    return this;
  }

  // Public API
  return {
    add,
    multiply,
    getResult,
    reset
  };
})();

// Usage
Calculator.add(5).multiply(2).getResult(); // 10
\`\`\`

## Singleton Pattern

\`\`\`javascript
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    
    this.connected = false;
    DatabaseConnection.instance = this;
  }

  connect() {
    this.connected = true;
    console.log('Connected to database');
  }
}

// Modern singleton with modules
let instance = null;

export default function getDatabase() {
  if (!instance) {
    instance = new DatabaseConnection();
  }
  return instance;
}
\`\`\``,
      },
      {
        id: 107,
        title: "Performance Optimization and Best Practices",
        duration: "17 min",
        type: "lesson" as const,
        completed: false,
        description: "Optimize JavaScript performance and follow industry best practices",
        content: `Learn techniques to write efficient, performant JavaScript code.

## Debouncing and Throttling

Control function execution frequency:

\`\`\`javascript
// Debouncing - delay execution until after calls have stopped
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Usage
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
\`\`\`

\`\`\`javascript
// Throttling - limit execution to once per time period
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage for scroll events
const throttledScroll = throttle(() => {
  console.log('Scroll event fired');
}, 100);

window.addEventListener('scroll', throttledScroll);
\`\`\`

## Memoization

Cache function results for expensive operations:

\`\`\`javascript
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Example: Expensive fibonacci calculation
const fibonacci = memoize(function(n) {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});
\`\`\`

## Memory Management

\`\`\`javascript
// Avoid memory leaks
class EventManager {
  constructor() {
    this.listeners = new Map();
  }

  addEventListener(element, event, handler) {
    if (!this.listeners.has(element)) {
      this.listeners.set(element, []);
    }
    
    this.listeners.get(element).push({ event, handler });
    element.addEventListener(event, handler);
  }

  removeAllListeners() {
    for (const [element, events] of this.listeners) {
      events.forEach(({ event, handler }) => {
        element.removeEventListener(event, handler);
      });
    }
    this.listeners.clear();
  }
}
\`\`\`

## Code Splitting and Lazy Loading

\`\`\`javascript
// Dynamic imports for code splitting
async function loadFeature() {
  try {
    const { default: Feature } = await import('./feature.js');
    return new Feature();
  } catch (error) {
    console.error('Failed to load feature:', error);
  }
}

// Lazy loading with intersection observer
const lazyLoad = (target, callback) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });
  
  observer.observe(target);
};
\`\`\`

## Best Practices Summary

1. **Use const and let** instead of var
2. **Prefer arrow functions** for callbacks
3. **Use destructuring** for cleaner code
4. **Implement proper error handling**
5. **Avoid global variables**
6. **Use meaningful variable names**
7. **Keep functions pure** when possible
8. **Minimize DOM manipulation**`,
      },
      {
        id: 108,
        title: "Practice Project: Advanced Todo Manager",
        duration: "30 min",
        type: "lesson" as const,
        completed: false,
        description: "Build a complex todo application using advanced JavaScript patterns",
        content: `Apply all the advanced JavaScript concepts you've learned by building a sophisticated todo manager.

## Project Requirements

Build a todo application with the following advanced features:

### Core Features
1. **Add, edit, and delete todos**
2. **Mark todos as complete/incomplete**
3. **Filter todos** (all, active, completed)
4. **Search functionality**
5. **Persistent storage** (localStorage)
6. **Drag and drop** reordering

### Advanced Features
7. **Categories/tags** for todos
8. **Due dates** with reminders
9. **Priority levels**
10. **Import/export** functionality
11. **Keyboard shortcuts**
12. **Undo/redo** operations

## Starter Architecture

\`\`\`javascript
// TodoManager - Main class using modern JavaScript patterns
class TodoManager {
  #todos = [];
  #history = [];
  #currentHistoryIndex = -1;

  constructor() {
    this.loadFromStorage();
    this.setupEventListeners();
  }

  // Private method for storage
  #saveToStorage() {
    localStorage.setItem('todos', JSON.stringify(this.#todos));
  }

  // Public API
  addTodo(todoData) {
    const todo = {
      id: crypto.randomUUID(),
      ...todoData,
      createdAt: new Date().toISOString(),
      completed: false
    };
    
    this.#todos.push(todo);
    this.#saveState();
    this.#saveToStorage();
    this.render();
  }

  // Implement other methods...
}
\`\`\`

## Advanced Patterns to Implement

### 1. Observer Pattern for State Management

\`\`\`javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}
\`\`\`

### 2. Command Pattern for Undo/Redo

\`\`\`javascript
class Command {
  execute() {
    throw new Error('Execute method must be implemented');
  }
  
  undo() {
    throw new Error('Undo method must be implemented');
  }
}

class AddTodoCommand extends Command {
  constructor(todoManager, todoData) {
    super();
    this.todoManager = todoManager;
    this.todoData = todoData;
    this.todoId = null;
  }

  execute() {
    this.todoId = this.todoManager.addTodo(this.todoData);
  }

  undo() {
    this.todoManager.removeTodo(this.todoId);
  }
}
\`\`\`

### 3. Strategy Pattern for Filtering

\`\`\`javascript
class FilterStrategy {
  filter(todos) {
    throw new Error('Filter method must be implemented');
  }
}

class ActiveFilter extends FilterStrategy {
  filter(todos) {
    return todos.filter(todo => !todo.completed);
  }
}

class CompletedFilter extends FilterStrategy {
  filter(todos) {
    return todos.filter(todo => todo.completed);
  }
}
\`\`\`

## Bonus Challenges

1. **Performance optimization** using virtual scrolling for large lists
2. **Real-time collaboration** using WebSockets
3. **Progressive Web App** features (service worker, offline support)
4. **Accessibility** improvements (ARIA labels, keyboard navigation)
5. **Internationalization** support

## Evaluation Criteria

- **Code Organization**: Use of classes, modules, and design patterns
- **Error Handling**: Proper try/catch blocks and user feedback
- **Performance**: Efficient DOM updates and memory usage
- **User Experience**: Smooth interactions and helpful feedback
- **Code Quality**: Clean, readable, and well-documented code

Good luck building your advanced todo manager! This project will showcase your mastery of modern JavaScript concepts.`,
      },
    ],
  },
}

interface Lesson {
  id: number
  title: string
  duration: string
  type: "video" | "exercise" | "reading"
  completed: boolean
  description: string
  content: string
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>
}) {
  const { id, lessonId } = await params
  const course = courseData[Number(id) as keyof typeof courseData]
  const lesson = course?.lessons.find(
    (lesson) => lesson.id === Number(lessonId)
  )

  if (!course || !lesson) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <div className="mb-8">
          <Link href={`/course/${course.id}`}>
            <Button variant="ghost" className="mb-6 hover:bg-muted/50 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
          </Link>
          
          {/* Lesson Header */}
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant={lesson.type === 'video' ? 'default' : lesson.type === 'exercise' ? 'secondary' : 'outline'}>
                {lesson.type === 'video' && <PlayCircle className="w-3 h-3 mr-1" />}
                {lesson.type === 'exercise' && <FileText className="w-3 h-3 mr-1" />}
                {lesson.type}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {lesson.duration}
              </Badge>
            </div>
            
            <h1 className="text-3xl font-bold mb-3 text-foreground">{lesson.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{lesson.description}</p>
          </div>
        </div>
        
        {/* Lesson Content */}
        <div className="bg-card rounded-lg p-8 shadow-sm border">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="lesson-content space-y-6">
              <div
                className="[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:dark:text-slate-100 [&_h2]:mt-12 [&_h2]:mb-8 [&_h2]:pb-3 [&_h2]:border-b-2 [&_h2]:border-slate-200 [&_h2]:dark:border-slate-700 [&_h2]:flex [&_h2]:items-center [&_h2]:scroll-mt-[120px]
                [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-slate-900 [&_h3]:dark:text-slate-100 [&_h3]:mt-10 [&_h3]:mb-6 [&_h3]:border-l-4 [&_h3]:border-blue-500 [&_h3]:pl-4 [&_h3]:bg-blue-50 [&_h3]:dark:bg-blue-950/20 [&_h3]:py-2 [&_h3]:rounded-r [&_h3]:scroll-mt-[120px]
                [&_p]:text-slate-700 [&_p]:dark:text-slate-300 [&_p]:mb-6 [&_p]:text-base [&_p]:leading-[1.8]
                [&_strong]:font-semibold [&_strong]:text-slate-900 [&_strong]:dark:text-slate-100 [&_strong]:bg-yellow-100 [&_strong]:dark:bg-yellow-900/30 [&_strong]:px-1 [&_strong]:rounded
                [&_ul]:my-6 [&_ul]:pl-0 [&_li]:ml-6 [&_li]:mb-3 [&_li]:text-slate-700 [&_li]:dark:text-slate-300 [&_li]:relative [&_li]:list-none [&_li]:leading-[1.7]
                [&_.code-block-wrapper]:my-8 [&_.code-block-wrapper]:rounded-xl [&_.code-block-wrapper]:overflow-hidden [&_.code-block-wrapper]:shadow-lg [&_.code-block-wrapper]:border [&_.code-block-wrapper]:border-slate-200 [&_.code-block-wrapper]:dark:border-slate-700 [&_.code-block-wrapper]:bg-white [&_.code-block-wrapper]:dark:bg-slate-900
                [&_.code-block-header]:bg-slate-50 [&_.code-block-header]:dark:bg-slate-800 [&_.code-block-header]:px-6 [&_.code-block-header]:py-4 [&_.code-block-header]:text-sm [&_.code-block-header]:font-medium [&_.code-block-header]:text-slate-700 [&_.code-block-header]:dark:text-slate-300 [&_.code-block-header]:border-b [&_.code-block-header]:border-slate-200 [&_.code-block-header]:dark:border-slate-700 [&_.code-block-header]:flex [&_.code-block-header]:items-center [&_.code-block-header]:justify-between [&_.code-block-header]:min-h-[60px]
                [&_.code-block]:bg-slate-950 [&_.code-block]:text-slate-100 [&_.code-block]:p-6 [&_.code-block]:overflow-x-auto [&_.code-block]:border-0 [&_.code-block]:font-mono [&_.code-block]:text-[14px] [&_.code-block]:leading-[1.6] [&_.code-block]:min-h-[120px] [&_.code-block]:whitespace-pre [&_.code-block]:font-normal
                [&_.code-block>code]:display-block [&_.code-block>code]:w-full [&_.code-block>code]:font-mono [&_.code-block>code]:text-[14px] [&_.code-block>code]:leading-[1.6] [&_.code-block>code]:whitespace-pre [&_.code-block>code]:font-normal [&_.code-block>code]:color-inherit
                [&_.inline-code]:bg-slate-100 [&_.inline-code]:dark:bg-slate-800 [&_.inline-code]:text-slate-800 [&_.inline-code]:dark:text-slate-200 [&_.inline-code]:px-2 [&_.inline-code]:py-1 [&_.inline-code]:rounded-md [&_.inline-code]:text-sm [&_.inline-code]:font-mono [&_.inline-code]:border [&_.inline-code]:border-slate-200 [&_.inline-code]:dark:border-slate-700 [&_.inline-code]:font-medium [&_.inline-code]:whitespace-nowrap"
                dangerouslySetInnerHTML={{
                  __html: lesson.content
                    // Handle code blocks with syntax highlighting
                    .replace(/```(\w+)\n([\s\S]*?)```/g, (match, lang, code) => {
                      const trimmedCode = code.trim();
                      const lines = trimmedCode.split('\n');
                      const formattedCode = lines.map((line: string) => line.replace(/</g, '&lt;').replace(/>/g, '&gt;')).join('\n');
                      
                      return `<div class="code-block-wrapper">
                        <div class="code-block-header">
                          <span class="flex items-center gap-2">
                            <span class="w-3 h-3 bg-red-500 rounded-full"></span>
                            <span class="w-3 h-3 bg-yellow-500 rounded-full"></span>
                            <span class="w-3 h-3 bg-green-500 rounded-full"></span>
                            <span class="ml-2 font-mono text-sm">${lang.toUpperCase()}</span>
                          </span>
                          <span class="text-xs opacity-75 bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">Code Example</span>
                        </div>
                        <pre class="code-block"><code class="language-${lang} block whitespace-pre font-mono">${formattedCode}</code></pre>
                      </div>`;
                    })
                    // Handle inline code
                    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
                    // Handle headings with better styling
                    .replace(/### (.*)/g, '<h3><span class="text-blue-500 mr-2">▶</span>$1</h3>')
                    .replace(/## (.*)/g, '<h2><span class="mr-2">📚</span><span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">$1</span></h2>')
                    // Handle paragraphs with proper spacing
                    .replace(/\n\n/g, '</p><p>')
                    // Handle ordered lists
                    .replace(/^\d+\.\s(.+)$/gm, '<li><span class="absolute -left-6 top-0 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">•</span>$1</li>')
                    // Handle unordered lists
                    .replace(/^-\s(.+)$/gm, '<li><span class="absolute -left-6 top-1 w-2 h-2 bg-blue-500 rounded-full"></span>$1</li>')
                    // Handle bold text
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    // Wrap content in paragraph
                    .replace(/^/, '<p>')
                    .replace(/$/, '</p>')
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
