# Investigation: Hydration Mismatch in LoginForm

## Bug Summary
A hydration error occurs in the browser console when rendering the `LoginForm` component: 
`A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used: <LoginForm />`

## Root Cause Analysis
Several potential causes were identified:
1. **Redundant Centering/Layout**: Both `AuthLayout` and `LoginPage` implement full-screen centering logic with `min-h-screen`/`min-h-dvh` and `flex items-center justify-center`. This nesting is unnecessary and `min-h-dvh` can sometimes cause issues during hydration if it resolves differently on the server vs client.
2. **Whitespace in ClassNames**: Template literals in `LoginForm.tsx` (lines 48-50, 70-72) include significant whitespace and newlines, which are preserved in the rendered HTML. React or the browser might normalize these differently, leading to attribute mismatches.
3. **Redundant Containers**: `AuthLayout` already provides a `max-w-md` container for its children. `LoginForm` also wraps itself in a `max-w-md` container, which is redundant when used within `AuthLayout`.
4. **HTML Special Characters**: Use of `&apos;` inside the form.

## Affected Components
- `src/app/(auth)/layout.tsx`: Provides the primary auth layout.
- `src/app/(auth)/login/page.tsx`: Wraps `LoginForm` in redundant layout logic.
- `src/features/auth/components/LoginForm.tsx`: Contains whitespace-heavy class names and redundant containers.

## Implementation Notes
- Removed redundant layout from `LoginPage`.
- Normalized template literals in `LoginForm` to prevent whitespace hydration issues.
- Removed redundant `max-w-md` container in `LoginForm`.
- Cleaned up HTML entities.
