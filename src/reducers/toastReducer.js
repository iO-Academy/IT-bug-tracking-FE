export const toastReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return {
                ...state,
                toasts: [...state.toasts, action.payload],
            }
        case "REMOVE":
            const updatedToasts = state.toasts.filter(
                (toast) => toast.id !== action.payload
            )
            return {
                ...state,
                toasts: updatedToasts,
            }
        default:
            throw new Error(`Unhandled toast action: ${action.type}`);
    }
}
