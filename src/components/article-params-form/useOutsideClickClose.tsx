import { useEffect } from 'react';

type useOutsideClickCloseProps = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	onChange,
	rootRef,
	onClose,
}: useOutsideClickCloseProps) => {
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
				isOpen && onClose?.();
				onChange(false);
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [onChange, isOpen, onClose]);
};
