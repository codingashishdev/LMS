import { LessonViewer } from "@/components/lesson-viewer"
// Header now handled globally by HeaderRouter
// import { DashboardHeader } from "@/components/dashboard-header"

// Mock lesson data
const lessonData = {
  1: {
    id: 1,
    title: "What is React?",
    duration: "12 min",
    type: "video" as const,
    videoUrl: "/placeholder-video.mp4",
    content: `
      <h2>Welcome to React!</h2>
      <p>React is a JavaScript library for building user interfaces. It was created by Facebook and is now maintained by Meta and the open-source community.</p>
      
      <blockquote>
        <p><strong>Key Concept:</strong> React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.</p>
      </blockquote>
      
      <h3>Key Features of React:</h3>
      <ul>
        <li><strong>Component-Based:</strong> Build encapsulated components that manage their own state</li>
        <li><strong>Declarative:</strong> React makes it painless to create interactive UIs</li>
        <li><strong>Learn Once, Write Anywhere:</strong> You can develop new features without rewriting existing code</li>
        <li><strong>Virtual DOM:</strong> Efficiently updates only the parts of the UI that have changed</li>
      </ul>
      
      <h3>Why Use React?</h3>
      <p>React allows developers to create large web applications that can change data, without reloading the page. The main purpose of React is to be fast, scalable, and simple.</p>
      
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">
        <h4 style="margin: 0 0 0.5rem 0; color: white;">🚀 Getting Started</h4>
        <p style="margin: 0; opacity: 0.9;">Ready to build your first React application? Let's set up your development environment in the next lesson.</p>
      </div>
    `,
    courseId: 1,
    courseTitle: "Introduction to React",
    nextLesson: 2,
    prevLesson: null,
    completed: true,
  },
  2: {
    id: 2,
    title: "Setting up Your Development Environment",
    duration: "15 min",
    type: "video" as const,
    videoUrl: "/placeholder-video.mp4",
    content: `
      <h2>Development Environment Setup</h2>
      <p>Before we start building React applications, we need to set up our development environment.</p>
      
      <h3>Prerequisites:</h3>
      <ol>
        <li>Install Node.js (version 14 or higher)</li>
        <li>Install a code editor (VS Code recommended)</li>
        <li>Basic knowledge of HTML, CSS, and JavaScript</li>
      </ol>
      
      <h3>Creating Your First React App:</h3>
      <pre><code>npx create-react-app my-app
cd my-app
npm start</code></pre>
      
      <p>This will create a new React application and start the development server.</p>
    `,
    courseId: 1,
    courseTitle: "Introduction to React",
    nextLesson: 3,
    prevLesson: 1,
    completed: true,
  },
  3: {
    id: 3,
    title: "Understanding JSX",
    duration: "18 min",
    type: "video" as const,
    videoUrl: "/placeholder-video.mp4",
    content: `
      <h2>Understanding JSX</h2>
      <p>JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. React uses JSX to describe what the UI should look like.</p>
      
      <h3>JSX Basics:</h3>
      <ul>
        <li>JSX looks like HTML but it's actually JavaScript</li>
        <li>JSX gets compiled to React.createElement() calls</li>
        <li>You can embed JavaScript expressions in JSX using curly braces {}</li>
      </ul>
      
      <h3>JSX Examples:</h3>
      <pre><code>// Simple JSX element
const element = &lt;h1&gt;Hello, World!&lt;/h1&gt;;

// JSX with expressions
const name = 'Sarah';
const greeting = &lt;h1&gt;Hello, {name}!&lt;/h1&gt;;

// JSX with attributes
const image = &lt;img src="avatar.jpg" alt="User Avatar" /&gt;;

// Multi-line JSX (use parentheses)
const content = (
  &lt;div&gt;
    &lt;h1&gt;Welcome to React&lt;/h1&gt;
    &lt;p&gt;This is a paragraph.&lt;/p&gt;
  &lt;/div&gt;
);</code></pre>
      
      <h3>JSX Rules:</h3>
      <ol>
        <li>JSX elements must have a closing tag or be self-closing</li>
        <li>JSX elements must return a single parent element</li>
        <li>Use <code>className</code> instead of <code>class</code></li>
        <li>Use camelCase for attribute names</li>
      </ol>
      
      <h3>JSX vs HTML Differences:</h3>
      <table>
        <thead>
          <tr>
            <th>HTML</th>
            <th>JSX</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>&lt;div class="container"&gt;</code></td>
            <td><code>&lt;div className="container"&gt;</code></td>
          </tr>
          <tr>
            <td><code>&lt;label for="name"&gt;</code></td>
            <td><code>&lt;label htmlFor="name"&gt;</code></td>
          </tr>
          <tr>
            <td><code>&lt;input type="text" /&gt;</code></td>
            <td><code>&lt;input type="text" /&gt;</code></td>
          </tr>
        </tbody>
      </table>
    `,
    courseId: 1,
    courseTitle: "Introduction to React",
    nextLesson: 4,
    prevLesson: 2,
    completed: true,
  },
  4: {
    id: 4,
    title: "Components and Props",
    duration: "22 min",
    type: "video" as const,
    videoUrl: "/placeholder-video.mp4",
    content: `
      <h2>React Components and Props</h2>
      <p>Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.</p>
      
      <h3>Function Components:</h3>
      <pre><code>function Welcome(props) {
  return &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;;
}

// Arrow function syntax
const Welcome = (props) =&gt; {
  return &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;;
};

// Shortened arrow function
const Welcome = (props) =&gt; &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;;</code></pre>
      
      <h3>Props (Properties):</h3>
      <p>Props are how you pass data from parent components to child components. They are read-only and help make components reusable.</p>
      
      <h3>Destructuring Props:</h3>
      <pre><code>// Without destructuring
function Welcome(props) {
  return &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;;
}

// With destructuring
function Welcome({ name, age }) {
  return (
    &lt;div&gt;
      &lt;h1&gt;Hello, {name}!&lt;/h1&gt;
      &lt;p&gt;You are {age} years old.&lt;/p&gt;
    &lt;/div&gt;
  );
}</code></pre>
      
      <h3>Example Usage:</h3>
      <pre><code>&lt;Welcome name="Sarah" age={25} /&gt;
&lt;Welcome name="Mike" age={30} /&gt;</code></pre>
      
      <h3>Props with Children:</h3>
      <pre><code>function Card({ title, children }) {
  return (
    &lt;div className="card"&gt;
      &lt;h2&gt;{title}&lt;/h2&gt;
      {children}
    &lt;/div&gt;
  );
}

// Usage
&lt;Card title="My Card"&gt;
  &lt;p&gt;This is the card content.&lt;/p&gt;
  &lt;button&gt;Click me&lt;/button&gt;
&lt;/Card&gt;</code></pre>
    `,
    courseId: 1,
    courseTitle: "Introduction to React",
    nextLesson: 5,
    prevLesson: 3,
    completed: false,
  },
  5: {
    id: 5,
    title: "State and Event Handling",
    duration: "25 min",
    type: "video" as const,
    videoUrl: "/placeholder-video.mp4",
    content: `
      <h2>State and Event Handling</h2>
      <p>State allows React components to remember information and update the UI when that information changes. Event handling lets components respond to user interactions.</p>
      
      <h3>The useState Hook:</h3>
      <p>useState is a React Hook that lets you add state to functional components.</p>
      <pre><code>import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
      
      <h3>State Rules:</h3>
      <ul>
        <li>State is immutable - never modify state directly</li>
        <li>Use the setter function to update state</li>
        <li>State updates are asynchronous</li>
        <li>State updates trigger re-renders</li>
      </ul>
      
      <h3>Event Handling:</h3>
      <p>React events are SyntheticEvents that wrap native events for consistency across browsers.</p>
      <pre><code>function Button() {
  const handleClick = (event) =&gt; {
    event.preventDefault();
    console.log('Button clicked!');
  };

  const handleSubmit = (event) =&gt; {
    event.preventDefault();
    // Handle form submission
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;button onClick={handleClick}&gt;
        Click me
      &lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
      
      <h3>Multiple State Variables:</h3>
      <pre><code>function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    &lt;div&gt;
      &lt;input 
        value={name}
        onChange={(e) =&gt; setName(e.target.value)}
        placeholder="Name"
      /&gt;
      &lt;input 
        value={email}
        onChange={(e) =&gt; setEmail(e.target.value)}
        placeholder="Email"
      /&gt;
      &lt;input 
        type="number"
        value={age}
        onChange={(e) =&gt; setAge(parseInt(e.target.value))}
        placeholder="Age"
      /&gt;
    &lt;/div&gt;
  );
}</code></pre>
      
      <h3>State with Objects:</h3>
      <pre><code>function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const handleInputChange = (field, value) =&gt; {
    setUser(prevUser =&gt; ({
      ...prevUser,
      [field]: value
    }));
  };

  return (
    &lt;div&gt;
      &lt;input 
        value={user.name}
        onChange={(e) =&gt; handleInputChange('name', e.target.value)}
        placeholder="Name"
      /&gt;
      &lt;input 
        value={user.email}
        onChange={(e) =&gt; handleInputChange('email', e.target.value)}
        placeholder="Email"
      /&gt;
    &lt;/div&gt;
  );
}</code></pre>
    `,
    courseId: 1,
    courseTitle: "Introduction to React",
    nextLesson: 6,
    prevLesson: 4,
    completed: false,
  },
  6: {
    id: 6,
    title: "Practice Exercise: Todo App",
    duration: "30 min",
    type: "exercise" as const,
    content: `
      <h2>Practice Exercise: Building a Todo App</h2>
      <p>In this exercise, you'll build a simple Todo application using React. This will help you practice components, props, state, and event handling.</p>
      
      <h3>What You'll Build:</h3>
      <ul>
        <li>A todo list that displays tasks</li>
        <li>An input field to add new tasks</li>
        <li>Checkboxes to mark tasks as complete</li>
        <li>A delete button for each task</li>
        <li>A counter showing total tasks</li>
      </ul>
      
      <h3>Step 1: Create the App Component</h3>
      <pre><code>import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  return (
    &lt;div className="App"&gt;
      &lt;h1&gt;My Todo App&lt;/h1&gt;
      {/* We'll add more components here */}
    &lt;/div&gt;
  );
}

export default App;</code></pre>
      
      <h3>Step 2: Create the Todo Item Component</h3>
      <pre><code>function TodoItem({ todo, onToggle, onDelete }) {
  return (
    &lt;div className="todo-item"&gt;
      &lt;input
        type="checkbox"
        checked={todo.completed}
        onChange={() =&gt; onToggle(todo.id)}
      /&gt;
      &lt;span 
        className={todo.completed ? 'completed' : ''}
      &gt;
        {todo.text}
      &lt;/span&gt;
      &lt;button onClick={() =&gt; onDelete(todo.id)}&gt;
        Delete
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
      
      <h3>Step 3: Add Todo Form Component</h3>
      <pre><code>function TodoForm({ onAdd }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) =&gt; {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input
        type="text"
        value={inputValue}
        onChange={(e) =&gt; setInputValue(e.target.value)}
        placeholder="Enter a new todo..."
      /&gt;
      &lt;button type="submit"&gt;Add Todo&lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
      
      <h3>Step 4: Complete App Component</h3>
      <pre><code>function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) =&gt; {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) =&gt; {
    setTodos(todos.map(todo =&gt;
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) =&gt; {
    setTodos(todos.filter(todo =&gt; todo.id !== id));
  };

  const completedCount = todos.filter(todo =&gt; todo.completed).length;

  return (
    &lt;div className="App"&gt;
      &lt;h1&gt;My Todo App&lt;/h1&gt;
      &lt;TodoForm onAdd={addTodo} /&gt;
      &lt;div className="todo-stats"&gt;
        Total: {todos.length} | Completed: {completedCount}
      &lt;/div&gt;
      &lt;div className="todo-list"&gt;
        {todos.map(todo =&gt; (
          &lt;TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          /&gt;
        ))}
      &lt;/div&gt;
    &lt;/div&gt;
  );
}</code></pre>
      
      <h3>Challenge Enhancements:</h3>
      <ol>
        <li>Add a filter to show only active or completed todos</li>
        <li>Add the ability to edit existing todos</li>
        <li>Add local storage to persist todos</li>
        <li>Add due dates to todos</li>
        <li>Add categories or tags to todos</li>
      </ol>
      
      <h3>CSS Styling (Optional):</h3>
      <pre><code>.App {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.todo-stats {
  margin: 20px 0;
  font-weight: bold;
}</code></pre>
    `,
    courseId: 1,
    courseTitle: "Introduction to React",
    nextLesson: 7,
    prevLesson: 5,
    completed: false,
  },
  // Advanced JavaScript Course Lessons (Course ID: 2)
  101: {
    id: 101,
    title: "ES6+ Features and Modern Syntax",
    duration: "25 min",
    type: "video" as const,
    videoUrl: "/placeholder-video.mp4",
    content: `
      <h2>ES6+ Features and Modern JavaScript Syntax</h2>
      <p>Modern JavaScript (ES6 and beyond) introduced powerful features that make code more readable, maintainable, and expressive.</p>
      
      <h3>Arrow Functions:</h3>
      <p>Arrow functions provide a concise syntax and lexical 'this' binding.</p>
      <pre><code>// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function - concise syntax
const add = (a, b) =&gt; a + b;

// Arrow function - with block body
const multiply = (a, b) =&gt; {
  console.log('Multiplying:', a, b);
  return a * b;
};

// Array methods with arrow functions
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n =&gt; n * 2);
const evens = numbers.filter(n =&gt; n % 2 === 0);

// Lexical 'this' binding
function Timer() {
  this.seconds = 0;
  
  // Traditional function loses 'this' context
  setInterval(function() {
    this.seconds++; // 'this' is undefined
  }, 1000);
  
  // Arrow function preserves 'this' context
  setInterval(() =&gt; {
    this.seconds++; // 'this' refers to Timer instance
  }, 1000);
}</code></pre>
      
      <h3>Destructuring Assignment:</h3>
      <pre><code>// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest);  // [3, 4, 5]

// Object destructuring
const user = { name: 'John', age: 30, city: 'New York' };
const { name, age, city = 'Unknown' } = user;

// Function parameter destructuring
function greet({ name, age }) {
  return \`Hello \${name}, you are \${age} years old\`;
}

// Nested destructuring
const data = {
  user: { name: 'Alice', details: { age: 25 } }
};
const { user: { name: userName, details: { age } } } = data;</code></pre>
      
      <h3>Template Literals:</h3>
      <pre><code>const name = 'World';
const greeting = \`Hello, \${name}!\`;

// Multi-line strings
const html = \`
  &lt;div class="card"&gt;
    &lt;h1&gt;\${title}&lt;/h1&gt;
    &lt;p&gt;\${description}&lt;/p&gt;
  &lt;/div&gt;
\`;

// Tagged template literals
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => {
    return result + string + (values[i] ? \`&lt;mark&gt;\${values[i]}&lt;/mark&gt;\` : '');
  }, '');
}

const message = highlight\`Hello \${name}, you have \${count} messages\`;</code></pre>
      
      <h3>Default Parameters and Rest/Spread:</h3>
      <pre><code>// Default parameters
function greet(name = 'Guest', greeting = 'Hello') {
  return \`\${greeting}, \${name}!\`;
}

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };</code></pre>
    `,
    courseId: 2,
    courseTitle: "Advanced JavaScript",
    nextLesson: 102,
    prevLesson: null,
    completed: true,
  },
  102: {
    id: 102,
    title: "Advanced Functions and Closures",
    duration: "30 min",
    type: "video" as const,
    videoUrl: "/placeholder-video.mp4",
    content: `
      <h2>Advanced Functions and Closures</h2>
      <p>Understanding closures and advanced function concepts is crucial for mastering JavaScript and functional programming patterns.</p>
      
      <h3>Understanding Closures:</h3>
      <p>A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has finished executing.</p>
      <pre><code>function outerFunction(x) {
  // This is the outer function's scope
  
  function innerFunction(y) {
    // This inner function has access to 'x'
    return x + y;
  }
  
  return innerFunction;
}

const addFive = outerFunction(5);
console.log(addFive(3)); // 8 - 'x' is still accessible!

// Practical closure example: Private variables
function createCounter() {
  let count = 0;
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.getValue());  // 1
// count is private - cannot be accessed directly</code></pre>
      
      <h3>Higher-Order Functions:</h3>
      <p>Functions that take other functions as arguments or return functions.</p>
      <pre><code>// Function that returns a function
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// Function that takes a function as argument
function withLogging(fn) {
  return function(...args) {
    console.log('Calling function with args:', args);
    const result = fn(...args);
    console.log('Result:', result);
    return result;
  };
}

const loggedAdd = withLogging((a, b) => a + b);
loggedAdd(2, 3); // Logs and returns 5</code></pre>
      
      <h3>Function Composition:</h3>
      <pre><code>// Compose functions together
const compose = (f, g) => (x) => f(g(x));

const addOne = x => x + 1;
const double = x => x * 2;

const addOneThenDouble = compose(double, addOne);
console.log(addOneThenDouble(3)); // 8 (3 + 1 = 4, 4 * 2 = 8)

// Pipe function (left to right composition)
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

const doubleAddOneThenSquare = pipe(
  double,
  addOne,
  x => x * x
);

console.log(doubleAddOneThenSquare(3)); // 49</code></pre>
      
      <h3>Currying:</h3>
      <pre><code>// Manual currying
function add(a) {
  return function(b) {
    return a + b;
  };
}

const addFive = add(5);
console.log(addFive(3)); // 8

// Generic curry function
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

const multiply = (a, b, c) => a * b * c;
const curriedMultiply = curry(multiply);

console.log(curriedMultiply(2)(3)(4)); // 24
console.log(curriedMultiply(2, 3)(4)); // 24</code></pre>
    `,
    courseId: 2,
    courseTitle: "Advanced JavaScript",
    nextLesson: 103,
    prevLesson: 101,
    completed: true,
  },
  103: {
    id: 103,
    title: "Asynchronous JavaScript Mastery",
    duration: "35 min",
    type: "video" as const,
    videoUrl: "/placeholder-video.mp4",
    content: `
      <h2>Asynchronous JavaScript Mastery</h2>
      <p>Master promises, async/await, and advanced patterns for handling asynchronous operations in JavaScript.</p>
      
      <h3>Understanding Promises:</h3>
      <p>Promises represent the eventual completion or failure of an asynchronous operation.</p>
      <pre><code>// Creating a basic promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        resolve({ data: 'Successfully fetched!' });
      } else {
        reject(new Error('Failed to fetch data'));
      }
    }, 1000);
  });
};

// Using promises
fetchData()
  .then(result => console.log(result.data))
  .catch(error => console.error(error.message))
  .finally(() => console.log('Request completed'));

// Promise chaining
fetch('/api/user')
  .then(response => response.json())
  .then(user => fetch(\`/api/posts/\${user.id}\`))
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(error => console.error('Error:', error));</code></pre>
      
      <h3>Async/Await Syntax:</h3>
      <pre><code>// Converting promise chain to async/await
async function fetchUserPosts() {
  try {
    const userResponse = await fetch('/api/user');
    const user = await userResponse.json();
    
    const postsResponse = await fetch(\`/api/posts/\${user.id}\`);
    const posts = await postsResponse.json();
    
    return posts;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Using async function
async function main() {
  try {
    const posts = await fetchUserPosts();
    console.log(posts);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
}

// Async functions always return promises
const result = fetchUserPosts(); // This is a Promise</code></pre>
      
      <h3>Advanced Promise Patterns:</h3>
      <pre><code>// Promise.all - Wait for all promises to resolve
const urls = ['/api/users', '/api/posts', '/api/comments'];
const requests = urls.map(url => fetch(url));

Promise.all(requests)
  .then(responses => Promise.all(responses.map(r => r.json())))
  .then(data => {
    const [users, posts, comments] = data;
    console.log({ users, posts, comments });
  });

// Promise.allSettled - Wait for all promises to settle
Promise.allSettled(requests)
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(\`Request \${index} succeeded:, result.value\`);
      } else {
        console.log(\`Request \${index} failed:, result.reason\`);
      }
    });
  });

// Promise.race - First promise to resolve/reject wins
const timeout = new Promise((_, reject) => 
  setTimeout(() => reject(new Error('Timeout')), 5000)
);

Promise.race([fetchData(), timeout])
  .then(result => console.log('Got result before timeout'))
  .catch(error => console.log('Operation timed out or failed'));</code></pre>
      
      <h3>Advanced Async Patterns:</h3>
      <pre><code>// Sequential vs Parallel execution
async function sequentialProcessing(items) {
  const results = [];
  for (const item of items) {
    const result = await processItem(item); // Wait for each
    results.push(result);
  }
  return results;
}

async function parallelProcessing(items) {
  const promises = items.map(item => processItem(item));
  return Promise.all(promises); // Process all simultaneously
}

// Async iterators and generators
async function* asyncGenerator() {
  for (let i = 0; i < 5; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield i;
  }
}

async function useAsyncGenerator() {
  for await (const value of asyncGenerator()) {
    console.log(value); // Logs 0, 1, 2, 3, 4 with 1 second delays
  }
}

// Rate limiting with async
class RateLimiter {
  constructor(maxConcurrent = 3) {
    this.maxConcurrent = maxConcurrent;
    this.running = 0;
    this.queue = [];
  }
  
  async add(asyncFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ asyncFn, resolve, reject });
      this.process();
    });
  }
  
  async process() {
    if (this.running >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }
    
    this.running++;
    const { asyncFn, resolve, reject } = this.queue.shift();
    
    try {
      const result = await asyncFn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.process();
    }
  }
}</code></pre>
    `,
    courseId: 2,
    courseTitle: "Advanced JavaScript",
    nextLesson: 104,
    prevLesson: 102,
    completed: false,
  },
  104: {
    id: 104,
    title: "Object-Oriented JavaScript and Prototypes",
    duration: "28 min",
    type: "video" as const,
    videoUrl: "/placeholder-video.mp4",
    content: `
      <h2>Object-Oriented JavaScript and Prototypes</h2>
      <p>Understanding prototypal inheritance, classes, and object creation patterns is essential for mastering JavaScript's object-oriented capabilities.</p>
      
      <h3>Understanding Prototypes:</h3>
      <p>JavaScript uses prototypal inheritance, where objects inherit properties and methods from other objects.</p>
      <pre><code>// Every object has a prototype
const person = { name: 'John' };
console.log(person.__proto__); // Object.prototype

// Constructor functions
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Adding methods to prototype
Person.prototype.greet = function() {
  return \`Hello, my name is \${this.name}\`;
};

const john = new Person('John', 30);
console.log(john.greet()); // "Hello, my name is John"

// Prototype chain
console.log(john.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true</code></pre>
      
      <h3>ES6 Classes:</h3>
      <p>ES6 introduced class syntax as syntactic sugar over prototypal inheritance.</p>
      <pre><code>class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, my name is \${this.name}\`;
  }
  
  // Static methods
  static createAnonymous() {
    return new Person('Anonymous', 0);
  }
  
  // Getters and setters
  get fullName() {
    return this.name;
  }
  
  set fullName(value) {
    this.name = value;
  }
}

// Inheritance
class Employee extends Person {
  constructor(name, age, position) {
    super(name, age);
    this.position = position;
  }
  
  work() {
    return \`\${this.name} is working as \${this.position}\`;
  }
}

const employee = new Employee('Alice', 25, 'Developer');
console.log(employee.greet()); // "Hello, my name is Alice"
console.log(employee.work()); // "Alice is working as Developer"</code></pre>
      
      <h3>Object Creation Patterns:</h3>
      <pre><code>// Factory pattern
function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      return \`Hello, I'm \${this.name}\`;
    }
  };
}

// Constructor pattern
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    return \`Hello, I'm \${this.name}\`;
  };
}

// Prototype pattern
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  return \`Hello, I'm \${this.name}\`;
};

// Object.create pattern
const personPrototype = {
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
};

function createPerson(name, age) {
  const person = Object.create(personPrototype);
  person.name = name;
  person.age = age;
  return person;
}</code></pre>
      
      <h3>Mixins and Composition:</h3>
      <pre><code>// Mixin pattern
const canWalk = {
  walk() {
    return \`\${this.name} is walking\`;
  }
};

const canSwim = {
  swim() {
    return \`\${this.name} is swimming\`;
  }
};

// Using Object.assign for mixins
function Person(name) {
  this.name = name;
}

Object.assign(Person.prototype, canWalk, canSwim);

const person = new Person('John');
console.log(person.walk()); // "John is walking"
console.log(person.swim()); // "John is swimming"

// Composition over inheritance
function Walker(name) {
  this.name = name;
}

Walker.prototype.walk = function() {
  return \`\${this.name} is walking\`;
};

function Swimmer(name) {
  this.name = name;
}

Swimmer.prototype.swim = function() {
  return \`\${this.name} is swimming\`;
};

function Athlete(name) {
  this.walker = new Walker(name);
  this.swimmer = new Swimmer(name);
}

Athlete.prototype.walk = function() {
  return this.walker.walk();
};

Athlete.prototype.swim = function() {
  return this.swimmer.swim();
};</code></pre>
    `,
    courseId: 2,
    courseTitle: "Advanced JavaScript",
    nextLesson: 105,
    prevLesson: 103,
    completed: false,
  },
  105: {
    id: 105,
    title: "Advanced Array and Object Methods",
    duration: "22 min",
    type: "video" as const,
    videoUrl: "/placeholder-video.mp4",
    content: `
      <h2>Advanced Array and Object Methods</h2>
      <p>Master powerful array and object manipulation techniques that will make your code more efficient and expressive.</p>
      
      <h3>Advanced Array Methods:</h3>
      <pre><code>const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map() - Transform each element
const doubled = numbers.map(n => n * 2);
const squares = numbers.map(n => n ** 2);

// filter() - Select elements based on condition
const evenNumbers = numbers.filter(n => n % 2 === 0);
const greaterThan5 = numbers.filter(n => n > 5);

// reduce() - Accumulate values
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
const max = numbers.reduce((acc, curr) => Math.max(acc, curr));
const grouped = numbers.reduce((acc, n) => {
  const key = n % 2 === 0 ? 'even' : 'odd';
  acc[key] = (acc[key] || []).concat(n);
  return acc;
}, {});

// find() and findIndex()
const firstEven = numbers.find(n => n % 2 === 0);
const firstEvenIndex = numbers.findIndex(n => n % 2 === 0);

// some() and every()
const hasEven = numbers.some(n => n % 2 === 0);
const allEven = numbers.every(n => n % 2 === 0);

// flat() and flatMap()
const nested = [[1, 2], [3, 4], [5, 6]];
const flattened = nested.flat(); // [1, 2, 3, 4, 5, 6]
const flatMapped = nested.flatMap(arr => arr.map(n => n * 2)); // [2, 4, 6, 8, 10, 12]</code></pre>
      
      <h3>Array Manipulation Techniques:</h3>
      <pre><code>// Sorting
const fruits = ['banana', 'apple', 'cherry', 'date'];
const sortedFruits = [...fruits].sort(); // Alphabetical
const sortedByLength = [...fruits].sort((a, b) => a.length - b.length);

// Reversing
const reversed = [...numbers].reverse();

// Slicing and splicing
const firstThree = numbers.slice(0, 3);
const middle = numbers.slice(2, 8);
const lastThree = numbers.slice(-3);

// Removing elements
const withoutFirst = numbers.slice(1);
const withoutLast = numbers.slice(0, -1);

// Inserting elements
const withExtra = [...numbers.slice(0, 3), 99, ...numbers.slice(3)];

// Chunking arrays
function chunk(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

const chunked = chunk(numbers, 3); // [[1,2,3], [4,5,6], [7,8,9], [10]]

// Unique values
const duplicates = [1, 2, 2, 3, 4, 4, 5];
const unique = [...new Set(duplicates)];

// Shuffle array
function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}</code></pre>
      
      <h3>Advanced Object Methods:</h3>
      <pre><code>const user = {
  name: 'John',
  age: 30,
  email: 'john@example.com',
  address: {
    street: '123 Main St',
    city: 'New York'
  }
};

// Object.keys(), Object.values(), Object.entries()
const keys = Object.keys(user); // ['name', 'age', 'email', 'address']
const values = Object.values(user); // ['John', 30, 'john@example.com', {...}]
const entries = Object.entries(user); // [['name', 'John'], ['age', 30], ...]

// Converting between formats
const objFromEntries = Object.fromEntries(entries);
const mapFromObj = new Map(entries);

// Object.assign() and spread operator
const defaults = { theme: 'light', language: 'en' };
const userPrefs = { theme: 'dark' };
const merged = { ...defaults, ...userPrefs };

// Deep cloning
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const cloned = {};
    Object.keys(obj).forEach(key => {
      cloned[key] = deepClone(obj[key]);
    });
    return cloned;
  }
}

const clonedUser = deepClone(user);

// Object freezing and sealing
const frozen = Object.freeze(user); // Cannot add/modify/delete properties
const sealed = Object.seal(user); // Cannot add/delete properties, but can modify

// Property descriptors
const descriptor = Object.getOwnPropertyDescriptor(user, 'name');
// { value: 'John', writable: true, enumerable: true, configurable: true }

Object.defineProperty(user, 'fullName', {
  get() {
    return this.name;
  },
  set(value) {
    this.name = value;
  },
  enumerable: true
});</code></pre>
      
      <h3>Practical Examples:</h3>
      <pre><code>// Data transformation pipeline
const users = [
  { id: 1, name: 'John', age: 25, active: true },
  { id: 2, name: 'Jane', age: 30, active: false },
  { id: 3, name: 'Bob', age: 35, active: true }
];

const activeUsers = users
  .filter(user => user.active)
  .map(user => ({
    ...user,
    displayName: user.name.toUpperCase()
  }))
  .sort((a, b) => a.age - b.age);

// Grouping data
const groupedByAge = users.reduce((acc, user) => {
  const ageGroup = Math.floor(user.age / 10) * 10;
  acc[ageGroup] = acc[ageGroup] || [];
  acc[ageGroup].push(user);
  return acc;
}, {});

// Finding duplicates
const findDuplicates = arr => {
  const seen = new Set();
  const duplicates = new Set();
  
  arr.forEach(item => {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  });
  
  return [...duplicates];
};

// Memoization helper
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

const expensiveFunction = memoize((n) => {
  console.log('Computing...');
  return n * n;
});</code></pre>
    `,
    courseId: 2,
    courseTitle: "Advanced JavaScript",
    nextLesson: 106,
    prevLesson: 104,
    completed: false,
  },
  106: {
    id: 106,
    title: "JavaScript Modules and Module Patterns",
    duration: "26 min",
    type: "video" as const,
    videoUrl: "/placeholder-video.mp4",
    content: `
      <h2>JavaScript Modules and Module Patterns</h2>
      <p>Learn modern ES6 modules, CommonJS, and various module patterns for organizing and structuring your JavaScript code.</p>
      
      <h3>ES6 Modules:</h3>
      <p>ES6 introduced a standardized module system for JavaScript.</p>
      <pre><code>// math.js - Exporting module
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// Default export
export default function calculateArea(radius) {
  return PI * radius * radius;
}

// app.js - Importing module
import calculateArea, { PI, add, multiply } from './math.js';

console.log(add(2, 3)); // 5
console.log(multiply(4, 5)); // 20
console.log(calculateArea(10)); // 314.159

// Importing everything
import * as MathUtils from './math.js';
console.log(MathUtils.add(1, 2)); // 3

// Dynamic imports
async function loadMathModule() {
  const math = await import('./math.js');
  console.log(math.add(5, 10));
}</code></pre>
      
      <h3>CommonJS Modules:</h3>
      <p>CommonJS is the module system used in Node.js.</p>
      <pre><code>// math.js
const PI = 3.14159;

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function calculateArea(radius) {
  return PI * radius * radius;
}

module.exports = {
  PI,
  add,
  multiply,
  calculateArea
};

// Alternative syntax
module.exports.PI = PI;
module.exports.add = add;

// app.js
const math = require('./math');

console.log(math.add(2, 3)); // 5
console.log(math.multiply(4, 5)); // 20

// Destructuring
const { PI, add } = require('./math');
console.log(add(1, 2)); // 3</code></pre>
      
      <h3>Module Patterns:</h3>
      <pre><code>// IIFE (Immediately Invoked Function Expression)
const Calculator = (function() {
  let result = 0;
  
  function add(value) {
    result += value;
    return this;
  }
  
  function subtract(value) {
    result -= value;
    return this;
  }
  
  function getResult() {
    return result;
  }
  
  function reset() {
    result = 0;
    return this;
  }
  
  return {
    add,
    subtract,
    getResult,
    reset
  };
})();

Calculator.add(5).subtract(2).add(10);
console.log(Calculator.getResult()); // 13

// Revealing Module Pattern
const Logger = (function() {
  let logs = [];
  
  function log(message) {
    const timestamp = new Date().toISOString();
    const entry = \`[\${timestamp}] \${message}\`;
    logs.push(entry);
    console.log(entry);
  }
  
  function getLogs() {
    return [...logs];
  }
  
  function clearLogs() {
    logs = [];
  }
  
  return {
    log,
    getLogs,
    clearLogs
  };
})();

// Constructor Pattern
function EventEmitter() {
  this.events = {};
}

EventEmitter.prototype.on = function(event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

EventEmitter.prototype.emit = function(event, ...args) {
  if (this.events[event]) {
    this.events[event].forEach(callback => callback(...args));
  }
};

EventEmitter.prototype.off = function(event, callback) {
  if (this.events[event]) {
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }
};</code></pre>
      
      <h3>Advanced Module Concepts:</h3>
      <pre><code>// Circular dependencies
// moduleA.js
import { methodB } from './moduleB.js';

export function methodA() {
  console.log('Method A');
  methodB();
}

// moduleB.js
import { methodA } from './moduleA.js';

export function methodB() {
  console.log('Method B');
  // methodA(); // This would cause infinite recursion
}

// Tree shaking
// Only imported functions are included in the bundle
import { add } from './math.js'; // Only 'add' function is bundled
// 'multiply' and other exports are not included

// Code splitting
// Dynamic imports for lazy loading
async function loadHeavyModule() {
  const { HeavyComponent } = await import('./HeavyComponent.js');
  return HeavyComponent;
}

// With React
import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent.js'));

function App() {
  return (
    &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
      &lt;LazyComponent /&gt;
    &lt;/Suspense&gt;
  );
}</code></pre>
      
      <h3>Module Bundlers:</h3>
      <pre><code>// Webpack configuration example
// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};

// Rollup configuration
// rollup.config.js
export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es'
  },
  plugins: [
    resolve(),
    commonjs(),
    terser()
  ]
};</code></pre>
      
      <h3>Best Practices:</h3>
      <ul>
        <li>Use ES6 modules for modern browsers and bundlers</li>
        <li>Keep modules focused on a single responsibility</li>
        <li>Use named exports for better tree shaking</li>
        <li>Avoid circular dependencies</li>
        <li>Use dynamic imports for code splitting</li>
        <li>Consider using a module bundler for production</li>
      </ul>
    `,
    courseId: 2,
    courseTitle: "Advanced JavaScript",
    nextLesson: 107,
    prevLesson: 105,
    completed: false,
  },
  107: {
    id: 107,
    title: "Performance Optimization and Best Practices",
    duration: "24 min",
    type: "video" as const,
    videoUrl: "/placeholder-video.mp4",
    content: `
      <h2>Performance Optimization and Best Practices</h2>
      <p>Learn techniques to optimize JavaScript performance and follow industry best practices for writing efficient, maintainable code.</p>
      
      <h3>JavaScript Engine Optimization:</h3>
      <p>Understanding how JavaScript engines work can help you write more performant code.</p>
      <pre><code>// V8 (Chrome/Node.js) optimization tips

// 1. Use consistent types
function add(a, b) {
  return a + b; // V8 can optimize this if types are consistent
}

// Avoid type confusion
function badAdd(a, b) {
  if (typeof a === 'string') {
    return a + b; // String concatenation
  }
  return a + b; // Numeric addition
}

// 2. Avoid deoptimization
const arr = [1, 2, 3];
arr.push(4); // Fast
arr[10] = 5; // Creates sparse array, slower

// 3. Use monomorphic operations
const objects = [
  { type: 'user', name: 'John' },
  { type: 'user', name: 'Jane' }
]; // All objects have same shape

// Avoid polymorphic operations
const mixed = [
  { type: 'user', name: 'John' },
  { type: 'admin', role: 'moderator' } // Different shape
];</code></pre>
      
      <h3>Memory Management:</h3>
      <pre><code>// Avoid memory leaks

// 1. Clean up event listeners
class Component {
  constructor() {
    this.handleClick = this.handleClick.bind(this);
  }
  
  mount() {
    document.addEventListener('click', this.handleClick);
  }
  
  unmount() {
    document.removeEventListener('click', this.handleClick);
  }
}

// 2. Clear timers
class TimerComponent {
  constructor() {
    this.timer = null;
  }
  
  startTimer() {
    this.timer = setInterval(() => {
      console.log('Timer tick');
    }, 1000);
  }
  
  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

// 3. Avoid circular references
// WeakMap for caching without memory leaks
const cache = new WeakMap();

function expensiveOperation(obj) {
  if (cache.has(obj)) {
    return cache.get(obj);
  }
  
  const result = /* expensive computation */;
  cache.set(obj, result);
  return result;
}

// 4. Use appropriate data structures
// Array vs Set for lookups
const array = [1, 2, 3, 4, 5];
const set = new Set([1, 2, 3, 4, 5]);

// Array lookup: O(n)
const foundInArray = array.includes(3);

// Set lookup: O(1)
const foundInSet = set.has(3);</code></pre>
      
      <h3>Code Optimization Techniques:</h3>
      <pre><code>// 1. Debouncing
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
const debouncedSearch = debounce(searchFunction, 300);

// 2. Throttling
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 3. Memoization
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

const fibonacci = memoize(function(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

// 4. Lazy loading
class LazyImage {
  constructor(src, placeholder) {
    this.src = src;
    this.placeholder = placeholder;
    this.img = null;
  }
  
  load() {
    if (!this.img) {
      this.img = new Image();
      this.img.src = this.placeholder;
      
      this.img.onload = () => {
        this.img.src = this.src; // Load actual image
      };
    }
    return this.img;
  }
}</code></pre>
      
      <h3>Best Practices:</h3>
      <pre><code>// 1. Use const and let instead of var
const PI = 3.14159; // Block-scoped, immutable reference
let counter = 0; // Block-scoped, mutable

// 2. Prefer arrow functions for callbacks
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

// 3. Use template literals
const name = 'John';
const greeting = \`Hello, \${name}!\`;

// 4. Destructuring
const user = { name: 'John', age: 30 };
const { name, age } = user;

// Array destructuring
const [first, second] = [1, 2];

// 5. Default parameters
function greet(name = 'Guest') {
  return \`Hello, \${name}!\`;
}

// 6. Rest and spread operators
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];

// 7. Async/await over promises
async function fetchUserData() {
  try {
    const response = await fetch('/api/user');
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

// 8. Error handling
try {
  riskyOperation();
} catch (error) {
  console.error('An error occurred:', error.message);
  // Handle error appropriately
} finally {
  // Cleanup code that always runs
  cleanup();
}</code></pre>
      
      <h3>Performance Monitoring:</h3>
      <pre><code>// Performance API
// Measure execution time
const start = performance.now();

expensiveOperation();

const end = performance.now();
console.log(\`Operation took \${end - start} milliseconds\`);

// Mark and measure
performance.mark('start');
doSomething();
performance.mark('end');
performance.measure('operation', 'start', 'end');

const measure = performance.getEntriesByName('operation')[0];
console.log(\`Operation took \${measure.duration} milliseconds\`);

// Memory usage (Chrome DevTools)
if (performance.memory) {
  console.log('Memory usage:', {
    used: performance.memory.usedJSHeapSize,
    total: performance.memory.totalJSHeapSize,
    limit: performance.memory.jsHeapSizeLimit
  });
}

// RequestAnimationFrame for smooth animations
function animate() {
  // Animation logic
  requestAnimationFrame(animate);
}

animate();</code></pre>
      
      <h3>Bundle Optimization:</h3>
      <pre><code>// Webpack optimization
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimize: true,
    minimizer: [\`...\`]
  }
};

// Code splitting
// Dynamic imports
const loadDashboard = () => import('./Dashboard.js');
const loadReports = () => import('./Reports.js');

// Route-based splitting
const routes = {
  '/dashboard': loadDashboard,
  '/reports': loadReports
};

// Tree shaking
// Only import what you need
import { add, multiply } from './math.js'; // Only these functions are bundled
// subtract and divide are not included

// Bundle analysis
// Use webpack-bundle-analyzer to identify large dependencies
// npm install --save-dev webpack-bundle-analyzer</code></pre>
    `,
    courseId: 2,
    courseTitle: "Advanced JavaScript",
    nextLesson: 108,
    prevLesson: 106,
    completed: false,
  },
  108: {
    id: 108,
    title: "Practice Project: Advanced Todo Manager",
    duration: "45 min",
    type: "exercise" as const,
    content: `
      <h2>Practice Project: Advanced Todo Manager</h2>
      <p>Build a comprehensive todo application that demonstrates advanced JavaScript concepts including ES6+ features, asynchronous programming, and modern patterns.</p>
      
      <h3>Project Requirements:</h3>
      <ul>
        <li>Create, read, update, and delete todos</li>
        <li>Categorize todos with tags</li>
        <li>Set due dates and priorities</li>
        <li>Filter and search functionality</li>
        <li>Persistent storage (localStorage)</li>
        <li>Export/import functionality</li>
        <li>Responsive design</li>
      </ul>
      
      <h3>Technical Requirements:</h3>
      <ul>
        <li>Use ES6+ features (classes, modules, async/await)</li>
        <li>Implement proper error handling</li>
        <li>Use modern array methods and object manipulation</li>
        <li>Apply performance optimization techniques</li>
        <li>Follow JavaScript best practices</li>
      </ul>
      
      <h3>Project Structure:</h3>
      <pre><code>// File structure
todo-manager/
├── src/
│   ├── models/
│   │   ├── Todo.js
│   │   └── TodoList.js
│   ├── services/
│   │   ├── StorageService.js
│   │   └── ExportService.js
│   ├── utils/
│   │   ├── dateUtils.js
│   │   └── validationUtils.js
│   ├── components/
│   │   ├── TodoItem.js
│   │   ├── TodoForm.js
│   │   ├── TodoList.js
│   │   └── FilterBar.js
│   ├── app.js
│   └── index.html
├── styles/
│   └── main.css
└── package.json</code></pre>
      
      <h3>Implementation Guide:</h3>
      <pre><code>// models/Todo.js
class Todo {
  constructor(title, description = '', dueDate = null, priority = 'medium') {
    this.id = Date.now().toString();
    this.title = title;
    this.description = description;
    this.completed = false;
    this.dueDate = dueDate;
    this.priority = priority;
    this.tags = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  
  toggleComplete() {
    this.completed = !this.completed;
    this.updatedAt = new Date();
  }
  
  update(updates) {
    Object.assign(this, updates);
    this.updatedAt = new Date();
  }
  
  addTag(tag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }
  
  removeTag(tag) {
    this.tags = this.tags.filter(t => t !== tag);
  }
  
  isOverdue() {
    if (!this.dueDate) return false;
    return new Date(this.dueDate) &lt; new Date() && !this.completed;
  }
  
  toJSON() {
    return {
      ...this,
      dueDate: this.dueDate?.toISOString(),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }
  
  static fromJSON(data) {
    const todo = new Todo(data.title, data.description, data.dueDate, data.priority);
    Object.assign(todo, data);
    todo.dueDate = data.dueDate ? new Date(data.dueDate) : null;
    todo.createdAt = new Date(data.createdAt);
    todo.updatedAt = new Date(data.updatedAt);
    return todo;
  }
}

// models/TodoList.js
class TodoList {
  constructor() {
    this.todos = [];
    this.filters = {
      completed: null, // null = show all, true = completed only, false = active only
      priority: null,
      tags: [],
      search: ''
    };
  }
  
  addTodo(todo) {
    this.todos.push(todo);
  }
  
  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
  
  getTodo(id) {
    return this.todos.find(todo => todo.id === id);
  }
  
  updateTodo(id, updates) {
    const todo = this.getTodo(id);
    if (todo) {
      todo.update(updates);
    }
  }
  
  toggleTodo(id) {
    const todo = this.getTodo(id);
    if (todo) {
      todo.toggleComplete();
    }
  }
  
  setFilter(filterType, value) {
    this.filters[filterType] = value;
  }
  
  getFilteredTodos() {
    return this.todos.filter(todo => {
      // Completion filter
      if (this.filters.completed !== null && todo.completed !== this.filters.completed) {
        return false;
      }
      
      // Priority filter
      if (this.filters.priority && todo.priority !== this.filters.priority) {
        return false;
      }
      
      // Tags filter
      if (this.filters.tags.length > 0) {
        const hasMatchingTag = this.filters.tags.some(tag => todo.tags.includes(tag));
        if (!hasMatchingTag) return false;
      }
      
      // Search filter
      if (this.filters.search) {
        const searchTerm = this.filters.search.toLowerCase();
        const matchesTitle = todo.title.toLowerCase().includes(searchTerm);
        const matchesDescription = todo.description.toLowerCase().includes(searchTerm);
        const matchesTags = todo.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        if (!matchesTitle && !matchesDescription && !matchesTags) {
          return false;
        }
      }
      
      return true;
    });
  }
  
  getStats() {
    const total = this.todos.length;
    const completed = this.todos.filter(todo => todo.completed).length;
    const active = total - completed;
    const overdue = this.todos.filter(todo => todo.isOverdue()).length;
    
    return { total, completed, active, overdue };
  }
}</code></pre>
      
      <h3>Storage and Export Services:</h3>
      <pre><code>// services/StorageService.js
class StorageService {
  static STORAGE_KEY = 'advanced-todo-manager';
  
  static saveTodoList(todoList) {
    try {
      const data = {
        todos: todoList.todos.map(todo => todo.toJSON()),
        filters: todoList.filters
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save todos:', error);
      throw new Error('Failed to save data to local storage');
    }
  }
  
  static loadTodoList() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) return null;
      
      const parsed = JSON.parse(data);
      const todoList = new TodoList();
      
      todoList.todos = parsed.todos.map(todoData => Todo.fromJSON(todoData));
      todoList.filters = parsed.filters || todoList.filters;
      
      return todoList;
    } catch (error) {
      console.error('Failed to load todos:', error);
      return null;
    }
  }
  
  static clearStorage() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

// services/ExportService.js
class ExportService {
  static exportToJSON(todoList) {
    const data = {
      todos: todoList.todos.map(todo => todo.toJSON()),
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    this.downloadBlob(blob, 'todos-export.json');
  }
  
  static exportToCSV(todoList) {
    const headers = ['ID', 'Title', 'Description', 'Completed', 'Due Date', 'Priority', 'Tags', 'Created', 'Updated'];
    const rows = todoList.todos.map(todo => [
      todo.id,
      todo.title,
      todo.description,
      todo.completed,
      todo.dueDate?.toISOString() || '',
      todo.priority,
      todo.tags.join('; '),
      todo.createdAt.toISOString(),
      todo.updatedAt.toISOString()
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(field => \`"\${field}"\`).join(','))
      .join('\\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    this.downloadBlob(blob, 'todos-export.csv');
  }
  
  static async importFromJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          const todoList = new TodoList();
          
          if (data.todos && Array.isArray(data.todos)) {
            todoList.todos = data.todos.map(todoData => Todo.fromJSON(todoData));
          }
          
          resolve(todoList);
        } catch (error) {
          reject(new Error('Invalid JSON file format'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }
  
  static downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}</code></pre>
      
      <h3>UI Components:</h3>
      <pre><code>// components/TodoForm.js
class TodoForm {
  constructor(onSubmit) {
    this.onSubmit = onSubmit;
    this.element = null;
  }
  
  render() {
    this.element = document.createElement('form');
    this.element.className = 'todo-form';
    this.element.innerHTML = \`
      &lt;div class="form-group"&gt;
        &lt;input type="text" id="title" placeholder="Todo title" required /&gt;
      &lt;/div&gt;
      &lt;div class="form-group"&gt;
        &lt;textarea id="description" placeholder="Description (optional)"&gt;&lt;/textarea&gt;
      &lt;/div&gt;
      &lt;div class="form-row"&gt;
        &lt;div class="form-group"&gt;
          &lt;label for="dueDate"&gt;Due Date:&lt;/label&gt;
          &lt;input type="date" id="dueDate" /&gt;
        &lt;/div&gt;
        &lt;div class="form-group"&gt;
          &lt;label for="priority"&gt;Priority:&lt;/label&gt;
          &lt;select id="priority"&gt;
            &lt;option value="low"&gt;Low&lt;/option&gt;
            &lt;option value="medium" selected&gt;Medium&lt;/option&gt;
            &lt;option value="high"&gt;High&lt;/option&gt;
          &lt;/select&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div class="form-group"&gt;
        &lt;input type="text" id="tags" placeholder="Tags (comma-separated)" /&gt;
      &lt;/div&gt;
      &lt;button type="submit" class="btn btn-primary"&gt;Add Todo&lt;/button&gt;
    \`;
    
    this.element.addEventListener('submit', this.handleSubmit.bind(this));
    return this.element;
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.element);
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const dueDate = formData.get('dueDate') || null;
    const priority = formData.get('priority');
    const tagsInput = formData.get('tags');
    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
    
    if (!title) return;
    
    const todo = new Todo(title, description, dueDate, priority);
    tags.forEach(tag => todo.addTag(tag));
    
    this.onSubmit(todo);
    this.element.reset();
  }
}

// components/TodoItem.js
class TodoItem {
  constructor(todo, onToggle, onEdit, onDelete) {
    this.todo = todo;
    this.onToggle = onToggle;
    this.onEdit = onEdit;
    this.onDelete = onDelete;
  }
  
  render() {
    const element = document.createElement('div');
    element.className = \`todo-item \${this.todo.completed ? 'completed' : ''} \${this.todo.isOverdue() ? 'overdue' : ''}\`;
    
    element.innerHTML = \`
      &lt;div class="todo-content"&gt;
        &lt;div class="todo-header"&gt;
          &lt;h3 class="todo-title"&gt;\${this.todo.title}&lt;/h3&gt;
          &lt;span class="todo-priority priority-\${this.todo.priority}"&gt;\${this.todo.priority}&lt;/span&gt;
        &lt;/div&gt;
        \${this.todo.description ? \`&lt;p class="todo-description"&gt;\${this.todo.description}&lt;/p&gt;\` : ''}
        \${this.todo.dueDate ? \`&lt;p class="todo-due-date"&gt;Due: \${new Date(this.todo.dueDate).toLocaleDateString()}&lt;/p&gt;\` : ''}
        \${this.todo.tags.length > 0 ? \`&lt;div class="todo-tags"&gt;\${this.todo.tags.map(tag => \`&lt;span class="tag"&gt;\${tag}&lt;/span&gt;\`).join('')}&lt;/div&gt;\` : ''}
      &lt;/div&gt;
      &lt;div class="todo-actions"&gt;
        &lt;button class="btn btn-sm btn-toggle" data-action="toggle"&gt;
          \${this.todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
        &lt;/button&gt;
        &lt;button class="btn btn-sm btn-edit" data-action="edit"&gt;Edit&lt;/button&gt;
        &lt;button class="btn btn-sm btn-delete" data-action="delete"&gt;Delete&lt;/button&gt;
      &lt;/div&gt;
    \`;
    
    element.addEventListener('click', this.handleAction.bind(this));
    return element;
  }
  
  handleAction(e) {
    const action = e.target.dataset.action;
    if (!action) return;
    
    switch (action) {
      case 'toggle':
        this.onToggle(this.todo.id);
        break;
      case 'edit':
        this.onEdit(this.todo.id);
        break;
      case 'delete':
        this.onDelete(this.todo.id);
        break;
    }
  }
}</code></pre>
      
      <h3>Main Application:</h3>
      <pre><code>// app.js
class TodoApp {
  constructor() {
    this.todoList = StorageService.loadTodoList() || new TodoList();
    this.todoForm = new TodoForm(this.addTodo.bind(this));
    this.filterBar = new FilterBar(this.updateFilters.bind(this));
    this.todoListComponent = new TodoListComponent(
      this.toggleTodo.bind(this),
      this.editTodo.bind(this),
      this.deleteTodo.bind(this)
    );
    
    this.init();
  }
  
  init() {
    this.render();
    this.updateDisplay();
  }
  
  render() {
    const app = document.getElementById('app');
    app.innerHTML = \`
      &lt;header class="app-header"&gt;
        &lt;h1&gt;Advanced Todo Manager&lt;/h1&gt;
        &lt;div class="app-actions"&gt;
          &lt;button id="export-json" class="btn btn-secondary"&gt;Export JSON&lt;/button&gt;
          &lt;button id="export-csv" class="btn btn-secondary"&gt;Export CSV&lt;/button&gt;
          &lt;label class="btn btn-secondary"&gt;
            Import JSON
            &lt;input type="file" id="import-json" accept=".json" style="display: none;" /&gt;
          &lt;/label&gt;
        &lt;/div&gt;
      &lt;/header&gt;
      
      &lt;div class="stats-bar"&gt;
        &lt;div id="stats"&gt;&lt;/div&gt;
      &lt;/div&gt;
      
      &lt;div class="filter-section"&gt;
        &lt;div id="filter-bar"&gt;&lt;/div&gt;
      &lt;/div&gt;
      
      &lt;div class="form-section"&gt;
        &lt;h2&gt;Add New Todo&lt;/h2&gt;
        &lt;div id="todo-form"&gt;&lt;/div&gt;
      &lt;/div&gt;
      
      &lt;div class="list-section"&gt;
        &lt;h2&gt;Your Todos&lt;/h2&gt;
        &lt;div id="todo-list"&gt;&lt;/div&gt;
      &lt;/div&gt;
    \`;
    
    document.getElementById('filter-bar').appendChild(this.filterBar.render());
    document.getElementById('todo-form').appendChild(this.todoForm.render());
    
    // Event listeners
    document.getElementById('export-json').addEventListener('click', () => {
      ExportService.exportToJSON(this.todoList);
    });
    
    document.getElementById('export-csv').addEventListener('click', () => {
      ExportService.exportToCSV(this.todoList);
    });
    
    document.getElementById('import-json').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        this.importTodos(file);
      }
    });
  }
  
  addTodo(todo) {
    this.todoList.addTodo(todo);
    this.saveAndUpdate();
  }
  
  toggleTodo(id) {
    this.todoList.toggleTodo(id);
    this.saveAndUpdate();
  }
  
  editTodo(id) {
    // Implementation for editing todos
    const todo = this.todoList.getTodo(id);
    if (todo) {
      // Show edit form (implementation not shown for brevity)
      console.log('Editing todo:', todo);
    }
  }
  
  deleteTodo(id) {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoList.removeTodo(id);
      this.saveAndUpdate();
    }
  }
  
  updateFilters(filters) {
    Object.entries(filters).forEach(([key, value]) => {
      this.todoList.setFilter(key, value);
    });
    this.updateDisplay();
  }
  
  async importTodos(file) {
    try {
      const importedList = await ExportService.importFromJSON(file);
      this.todoList = importedList;
      this.saveAndUpdate();
      alert('Todos imported successfully!');
    } catch (error) {
      alert('Failed to import todos: ' + error.message);
    }
  }
  
  saveAndUpdate() {
    StorageService.saveTodoList(this.todoList);
    this.updateDisplay();
  }
  
  updateDisplay() {
    const stats = this.todoList.getStats();
    document.getElementById('stats').innerHTML = \`
      Total: \${stats.total} | Active: \${stats.active} | Completed: \${stats.completed}
      \${stats.overdue > 0 ? \` | Overdue: \${stats.overdue}\` : ''}
    \`;
    
    const filteredTodos = this.todoList.getFilteredTodos();
    const listElement = document.getElementById('todo-list');
    listElement.innerHTML = '';
    
    if (filteredTodos.length === 0) {
      listElement.innerHTML = '&lt;p class="empty-state"&gt;No todos found. Add one above!&lt;/p&gt;';
    } else {
      filteredTodos.forEach(todo => {
        const todoItem = new TodoItem(
          todo,
          this.toggleTodo.bind(this),
          this.editTodo.bind(this),
          this.deleteTodo.bind(this)
        );
        listElement.appendChild(todoItem.render());
      });
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
});</code></pre>
      
      <h3>Styling (CSS):</h3>
      <pre><code>/* styles/main.css */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
  padding: 20px;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.app-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
}

.stats-bar {
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.todo-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.todo-item {
  background: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.todo-item.completed .todo-title {
  text-decoration: line-through;
  color: #6c757d;
}

.todo-item.overdue {
  border-left: 4px solid #dc3545;
}

.todo-actions {
  display: flex;
  gap: 5px;
  flex-shrink: 0;
}

.tag {
  display: inline-block;
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
  margin-right: 5px;
}

.empty-state {
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 40px;
}

/* Responsive design */
@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    gap: 15px;
  }
  
  .form-row {
    flex-direction: column;
  }
  
  .todo-item {
    flex-direction: column;
    gap: 10px;
  }
}</code></pre>
      
      <h3>Next Steps:</h3>
      <ul>
        <li>Add user authentication</li>
        <li>Implement real-time synchronization</li>
        <li>Add drag-and-drop reordering</li>
        <li>Create a mobile app version</li>
        <li>Add collaboration features</li>
      </ul>
      
      <p>This project demonstrates advanced JavaScript concepts and provides a solid foundation for building complex web applications. Focus on code organization, performance, and user experience.</p>
    `,
    courseId: 2,
    courseTitle: "Advanced JavaScript",
    nextLesson: null,
    prevLesson: 107,
    completed: false,
  },
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>
}) {
  const { lessonId } = await params
  const lesson = lessonData[Number.parseInt(lessonId) as keyof typeof lessonData]

  if (!lesson) {
    return <div>Lesson not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header rendered by layout */}
      {/* <DashboardHeader /> */}
      <LessonViewer lesson={lesson} />
    </div>
  )
}
