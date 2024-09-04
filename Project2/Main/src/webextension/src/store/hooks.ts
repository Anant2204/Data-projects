import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line no-duplicate-imports
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './reduxStore';

// See: https://redux-toolkit.js.org/tutorials/typescript#define-root-state-and-dispatch-types
// Partial content from above page:
// * For useSelector, it saves you the need to type (state: RootState) every time.
// * For useDispatch, the default Dispatch type does not know about thunks. In order to correctly dispatch
//   thunks, you need to use the specific customized AppDispatch type from the store that includes the thunk
//   middleware types, and use that with useDispatch. Adding a pre-typed useDispatch hook keeps you from
//   forgetting to import AppDispatch where it's needed.

// Use throughout your app instead of plain useDispatch and useSelector.
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
