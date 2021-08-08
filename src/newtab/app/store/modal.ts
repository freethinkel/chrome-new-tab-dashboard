import { createStore, update } from 'nanostores';

export enum ModalSize {
	xs,
	md,
	lg,
}

export type Modal = {
	name?: string;
	component?: JSX.Element;
	enabled?: boolean;
	size: ModalSize;
};

export const store = createStore<Modal>(() => {
	store.set({ enabled: false, size: ModalSize.xs });
});

export const openModal = (payload: Partial<Modal>) => {
	update(store, (current) => ({ ...current, ...payload, enabled: true }));
};
export const closeModal = () => {
	update(store, (current) => ({ ...current, enabled: false }));
};
