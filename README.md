# Pokemon

## Installation/Usage
1. `git clone ...`
2. `npm i`
3. `ng s`

## Application Structure

- **Core**
	- Guards
	    - *auth.guard.ts*
	- Interceptor
	    - *token.interceptor.ts*
	    - *white-space.interceptor.ts*
	- Services
	    - *http.service.ts*
	- Components
	    - Navbar
	        - *navbar.component.html/css/ts*
	    - 404
	        - *404.component.html/css/ts*
	- Constants
	- Enums
	- Models
	- Utils
- **Features**
	- Feature A
	    - Components
	        - shared-scope-component
	        *shared-scope-component.html/css/ts*
	    - Directives
	    - Pages
	        - page-a
	        *page-a.component.html/css/ts*
	    - Models
	    - Services
	    - a-routing.module.ts
	    - a.module.ts
	    - a.component.html/css/ts
- **Shared**
    - Components
        - button
            - *button.component.html/css/ts*
    - Directives
        - shared-directive.ts
    - Pipes
        - shared-pipe.ts
