# AI Development Guidelines - React.js Project

> **These rules are mandatory. Every React.js code generated for this project must strictly follow this architecture. Never violate these rules.**

---

# 1. Project Architecture

Every component and page **must** be split into three files.

```
ComponentName/

├── ComponentName.jsx          // UI only
├── useComponentName.js        // Business Logic (Custom Hook)
├── ComponentNameStyle.js      // Styles (JS Object)
├── index.js
```

Example

```
Login/

├── Login.jsx
├── useLogin.js
├── LoginStyle.js
├── index.js
```

Another Example

```
UserCard/

├── UserCard.jsx
├── useUserCard.js
├── UserCardStyle.js
├── index.js
```

Never combine UI, styles, and business logic into one file.

---

# 2. Responsibilities

## ComponentName.jsx

Contains ONLY:

* JSX
* UI Rendering
* Props
* Import Styles
* Import Custom Hook

Never write:

* API Calls
* Axios
* Business Logic
* Validation
* Filtering
* Sorting
* Searching
* Data Manipulation
* Complex Functions

Example

```jsx
import useLogin from "./useLogin";
import styles from "./LoginStyle";

const Login = () => {

    const {
        email,
        password,
        loading,
        handleLogin,
        handleEmailChange,
        handlePasswordChange
    } = useLogin();

    return (
        <div style={styles.container}>
            ...
        </div>
    );
};

export default React.memo(Login);
```

---

## useComponentName.js

Contains ONLY

* Business Logic
* API Calls
* Axios Calls
* Service Calls
* useState
* useEffect
* useMemo
* useCallback
* Validation
* Event Handlers
* Navigation
* TanStack Query
* Redux/Zustand Logic
* Helper Functions

Never write JSX here.

Example

```jsx
const useLogin = () => {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = useCallback(() => {

    }, []);

    return {

        email,

        password,

        handleLogin,

        setEmail,

        setPassword

    };

};

export default useLogin;
```

---

## ComponentNameStyle.js

Contains ONLY JavaScript style objects.

Example

```jsx
const styles = {

    container: {

        display: "flex",

        flexDirection: "column",

        gap: "16px",

        padding: "24px"

    },

    button: {

        padding: "12px",

        borderRadius: "8px"

    }

};

export default styles;
```

Never write business logic inside Style files.

---

# 3. Folder Structure

```
src/

api/

axios.js

components/

Button/

Button.jsx

ButtonStyle.js

useButton.js

index.js

Card/

Card.jsx

CardStyle.js

useCard.js

index.js

pages/

Login/

Login.jsx

LoginStyle.js

useLogin.js

index.js

Dashboard/

Dashboard.jsx

DashboardStyle.js

useDashboard.js

index.js

hooks/

shared custom hooks only

services/

auth.service.js

user.service.js

product.service.js

utils/

constants/

contexts/

routes/

layouts/

assets/
```

---

# 4. UI Rules

Component JSX should contain ONLY UI.

Never perform

❌ API Requests

❌ Filtering

❌ Sorting

❌ Searching

❌ Expensive Calculations

❌ Validation

❌ Business Logic

Prepare everything inside the custom hook before rendering.

---

# 5. Styling Rules

Always keep styles inside

```
ComponentNameStyle.js
```

Example

```jsx
<div style={styles.container}>
```

Never write

```jsx
style={{

display:"flex"

}}
```

Use reusable style objects.

Never repeat style objects.

---

# 6. Business Logic Rules

Every page/component must have

```
use<ComponentName>.js
```

Examples

```
useLogin.js

useDashboard.js

useProfile.js

useUserCard.js
```

Business logic includes

* State
* API
* Validation
* Event Handlers
* Memoization
* Callbacks
* Navigation
* Data Formatting

---

# 7. API Architecture

Never call Axios inside JSX.

Correct Architecture

```
Component

↓

Custom Hook

↓

Service

↓

Axios Instance

↓

Backend
```

Example

```
Login.jsx

↓

useLogin.js

↓

auth.service.js

↓

axios.js

↓

Backend API
```

---

# 8. Performance Optimization

Always optimize React performance.

Use

✅ React.memo

✅ useMemo

✅ useCallback

✅ lazy()

✅ Suspense

✅ Dynamic Import

✅ Debounce

✅ Throttle

Avoid

❌ Duplicate State

❌ Unnecessary Re-renders

❌ Heavy JSX

❌ Large Components

---

# 9. useMemo Rules

Use for

* Filtering
* Searching
* Sorting
* Expensive Calculations
* Derived Data

Example

```jsx
const filteredUsers = useMemo(() => {

    return users.filter(user => user.active);

}, [users]);
```

Don't use for simple values.

---

# 10. useCallback Rules

Wrap callbacks passed to child components.

Example

```jsx
const handleDelete = useCallback((id) => {

}, []);
```

Don't overuse it.

---

# 11. React.memo

Wrap reusable UI components.

Example

```jsx
export default React.memo(UserCard);
```

---

# 12. Code Splitting

Always lazy load pages.

Example

```jsx
const Dashboard = lazy(() => import("../pages/Dashboard"));
```

Wrap with Suspense.

---

# 13. Custom Hooks

Reusable logic belongs inside hooks.

Examples

```
usePagination()

useSearch()

useModal()

useAuth()

useDebounce()

useProducts()

useUsers()

useTable()

useInfiniteScroll()
```

Never duplicate logic.

---

# 14. State Management

Small Project

Context API

Medium Project

Zustand

Large Project

Redux Toolkit

Server State

TanStack Query

---

# 15. Error Handling

Always handle

Loading

Success

Error

Empty State

Example

```jsx
try {

} catch (error) {

} finally {

}
```

---

# 16. File Size Rules

Maximum

JSX

```
200 lines
```

Hook

```
250 lines
```

Style

```
200 lines
```

Split large files into reusable components.

---

# 17. Reusable Components

Always reuse

* Button
* Input
* Select
* Modal
* Loader
* Card
* Table
* Avatar
* Badge
* Search
* Pagination
* Empty State
* Error State

Never duplicate UI.

---

# 18. Naming Convention

```
Login.jsx

LoginStyle.js

useLogin.js

UserCard.jsx

UserCardStyle.js

useUserCard.js
```

Components

PascalCase

Hooks

camelCase after `use`

---

# 19. Import Order

```
React

Third-party Libraries

Hooks

Services

Components

Utils

Styles
```

---

# 20. SOLID Principles

Always follow

* Single Responsibility Principle
* Open/Closed Principle
* Liskov Substitution Principle
* Interface Segregation Principle
* Dependency Inversion Principle

---

# 21. AI Code Generation Rules

Every generated code must

* Split UI, Style, and Logic
* Use reusable components
* Use custom hooks
* Use service layer
* Use Axios instance
* Use useMemo where needed
* Use useCallback where needed
* Use React.memo where needed
* Use lazy loading
* Use code splitting
* Follow SOLID
* Follow DRY
* Follow KISS
* Follow Clean Code principles
* Write scalable and production-ready code

Never generate monolithic components.

---

# 22. Final Architecture

```
UI (Component.jsx)

↓

Custom Hook (useComponent.js)

↓

Service Layer

↓

Axios Instance

↓

Backend API
```

---

# 23. Final Checklist

Before generating code, ensure:

☑ Component JSX contains UI only.

☑ Styles are inside `<ComponentName>Style.js`.

☑ Business logic is inside `use<ComponentName>.js`.

☑ Services contain API logic.

☑ Axios is never called directly from JSX.

☑ React.memo is used for reusable components.

☑ useMemo is used for expensive derived data.

☑ useCallback is used for callback optimization.

☑ Components are split and reusable.

☑ No duplicated code.

☑ Clean folder structure.

☑ Responsive UI.

☑ Production-ready code.

☑ Maintainable and scalable architecture.
