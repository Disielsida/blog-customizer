import { useState, useRef } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import { useOutsideClickClose } from './useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';

import clsx from 'clsx';

import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	ArticleStateType,
	fontColors,
	defaultArticleState,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	handleStateChange: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	handleStateChange,
}: ArticleParamsFormProps) => {
	const rootRef = useRef<HTMLElement>(null);

	const [formState, changeFormState] = useState(defaultArticleState);

	const [isFormOpen, setIsFormOpen] = useState(false);

	const toggleForm = () => {
		setIsFormOpen(!isFormOpen);
	};

	useOutsideClickClose({
		isOpen: isFormOpen,
		onChange: setIsFormOpen,
		rootRef,
		onClose: () => setIsFormOpen(false),
	});

	const [currentFont, setCurrentFont] = useState(fontFamilyOptions[0]);

	const handleFontChange = (option: OptionType) => {
		setCurrentFont(option);
		changeFormState({ ...formState, fontFamilyOption: option });
	};

	const [currentFontSize, setCurrentFontSize] = useState(fontSizeOptions[0]);

	const handleFontSizeChange = (option: OptionType) => {
		setCurrentFontSize(option);
		changeFormState({ ...formState, fontSizeOption: option });
	};

	const [currentFontColor, setCurrentFontColor] = useState(fontColors[0]);

	const handleFontColorChange = (option: OptionType) => {
		setCurrentFontColor(option);
		changeFormState({ ...formState, fontColor: option });
	};

	const [currentBackgroundColor, setCurrentBackgroundColor] = useState(
		backgroundColors[0]
	);

	const handleBackgroundChange = (option: OptionType) => {
		setCurrentBackgroundColor(option);
		changeFormState({ ...formState, backgroundColor: option });
	};

	const [currentContentWidth, setCurrentContentWidth] = useState(
		contentWidthArr[0]
	);

	const handleContentWidthChange = (option: OptionType) => {
		setCurrentContentWidth(option);
		changeFormState({ ...formState, contentWidth: option });
	};

	const handleSubmitForm = () => {
		handleStateChange(formState);
		setIsFormOpen(false);
	};

	const resetForm = () => {
		setIsFormOpen(false);
		changeFormState(defaultArticleState);
		handleStateChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
						e.preventDefault();
					}}>
					<Text size={31} weight={800} uppercase as='h1'>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={currentFont}
						options={fontFamilyOptions}
						onChange={handleFontChange}
					/>
					<RadioGroup
						name='fontSizeGroup'
						options={fontSizeOptions}
						selected={currentFontSize}
						title='Размер шрифта'
						onChange={handleFontSizeChange}
					/>
					<Select
						title='Цвет шрифта'
						selected={currentFontColor}
						options={fontColors}
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={currentBackgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundChange}
					/>
					<Select
						title='Ширина контента'
						selected={currentContentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetForm}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleSubmitForm}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
