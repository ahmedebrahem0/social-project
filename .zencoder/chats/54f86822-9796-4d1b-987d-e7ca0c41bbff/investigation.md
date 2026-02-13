# Bug Investigation: Import Error for useAppSelector

## Bug Summary
The application fails to compile with the error: "Export useAppSelector doesn't exist in target module" when trying to import from '@/store/hooks'. This prevents the login page from loading.

## Root Cause Analysis
The Redux store setup is incomplete:
- The `src/store/hooks.ts` file is empty, so no hooks are exported
- The `src/store/index.ts` file is empty, so no store configuration exists
- The `src/store/StoreProvider.tsx` file is empty, so no provider is set up
- Only the auth slice (`src/store/slices/auth.slice.ts`) is implemented

The LoginForm component is trying to import `useAppDispatch` and `useAppSelector` from '@/store/hooks', but since the file has no exports, the import fails.

## Affected Components
- `src/features/auth/components/LoginForm.tsx` - Uses Redux hooks for authentication state management
- Potentially other components that depend on Redux state

## Proposed Solution
Complete the Redux store setup by:
1. Creating the store configuration in `src/store/index.ts`
2. Setting up typed hooks in `src/store/hooks.ts`
3. Implementing the StoreProvider in `src/store/StoreProvider.tsx`
4. Ensuring the provider wraps the app (likely in a layout or _app.tsx)

This will provide the necessary `useAppDispatch` and `useAppSelector` hooks that components expect.

## Implementation Notes
1. Created store configuration in `src/store/index.ts` with `configureStore` and auth reducer
2. Set up typed hooks in `src/store/hooks.ts` using `TypedUseSelectorHook` for proper TypeScript support
3. Implemented `StoreProvider` component with 'use client' directive for Next.js compatibility
4. Integrated `StoreProvider` in the root layout to wrap the entire application
5. The Redux store now properly exports `useAppDispatch` and `useAppSelector` hooks

## Test Results
- Store configuration created successfully
- Typed hooks implemented and exported
- StoreProvider component created and integrated
- Fixed incorrect import path in LoginForm.tsx (changed from '@/services/api/authApi' to '@/services/auth.service')
- All required dependencies (API_ENDPOINTS, config) are present and properly configured
- LoginForm component should now be able to import and use Redux hooks without errors