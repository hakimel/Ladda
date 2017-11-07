export interface LaddaButton {
    start(): LaddaButton,
    startAfter(delay: number): LaddaButton,
    stop(): LaddaButton,
    toggle(): LaddaButton,
    setProgress(progress: number): void,
    isLoading(): boolean,
    remove(): void,
}

export interface BindOptions {
    /**
     * Number of milliseconds to wait before automatically cancelling the animation.
     */
    timeout?: number,

    /**
     * A function to be called with the Ladda instance when a target button is clicked.
     */
    callback?: (instance: LaddaButton) => void,
}

/**
 * Creates a new instance of Ladda which wraps the target button element.
 */
export function create(button: HTMLButtonElement): LaddaButton;

/**
 * Binds the target buttons to automatically enter the loading state when clicked.
 * @param target Either an HTML element or a CSS selector.
 */
export function bind(target: HTMLElement | string, options?: BindOptions): void;

/**
 * Stops all current loading animations.
 */
export function stopAll(): void;
