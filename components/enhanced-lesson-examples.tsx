import { CodeSnippet } from '@/components/ui/code-snippet'

export const enhancedLessonContent = `
  <h2>Advanced JavaScript Functions and Modern Syntax</h2>
  <p>Let's explore advanced JavaScript concepts with our enhanced code snippets that include syntax highlighting, copy functionality, and interactive features.</p>
  
  <h3>Arrow Functions and Destructuring</h3>
  <p>Modern JavaScript provides elegant syntax for common operations:</p>
`

// Example of how to use CodeSnippet in React components
export const ArrowFunctionExample = () => (
  <CodeSnippet 
    language="javascript" 
    filename="arrow-functions.js"
    highlightLines={[3, 7]}
  >
{`// Traditional function
function add(a, b) {
  return a + b;  // Highlighted line
}

// Arrow function - concise syntax
const add = (a, b) => a + b;  // Highlighted line

// Destructuring with arrow functions
const processUser = ({ name, age, email }) => {
  console.log(\`Processing user: \${name}, Age: \${age}\`);
  return { name, age, email: email.toLowerCase() };
};

// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first, second, rest);`}
  </CodeSnippet>
)

export const AsyncAwaitExample = () => (
  <CodeSnippet 
    language="javascript" 
    filename="async-await.js"
    showLineNumbers={true}
  >
{`// Modern async/await pattern
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
}

// Using the function
const loadUser = async () => {
  try {
    const user = await fetchUserData(123);
    console.log('User loaded:', user);
  } catch (error) {
    // Handle error appropriately
    showErrorMessage('Failed to load user');
  }
};`}
  </CodeSnippet>
)

export const ReactHookExample = () => (
  <CodeSnippet 
    language="tsx" 
    filename="custom-hook.tsx"
    highlightLines={[1, 8, 15]}
  >
{`import { useState, useEffect } from 'react';  // Highlighted

// Custom hook for API data fetching
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {  // Highlighted
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);  // Highlighted
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage in component
export function UserProfile({ userId }: { userId: string }) {
  const { data: user, loading, error } = useApi<User>(\`/api/users/\${userId}\`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}`}
  </CodeSnippet>
)

export const CSSExample = () => (
  <CodeSnippet 
    language="css" 
    filename="modern-css.css"
  >
{`/* Modern CSS with custom properties and grid */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --spacing-unit: 1rem;
  --border-radius: 0.5rem;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-unit);
  padding: calc(var(--spacing-unit) * 2);
}

.card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  }
}

.card__header {
  padding: var(--spacing-unit);
  border-bottom: 1px solid #e2e8f0;
}

.card__content {
  padding: var(--spacing-unit);
  color: var(--secondary-color);
}`}
  </CodeSnippet>
)