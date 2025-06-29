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
	ArtcileStateKey,
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

	const handleOptionChange = (
		optionKey: ArtcileStateKey,
		option: OptionType
	) => {
		changeFormState({ ...formState, [optionKey]: option });
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
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							handleOptionChange(ArtcileStateKey.FontFamily, option)
						}
					/>
					<RadioGroup
						name='fontSizeGroup'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='Размер шрифта'
						onChange={(option) =>
							handleOptionChange(ArtcileStateKey.FontSize, option)
						}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) =>
							handleOptionChange(ArtcileStateKey.FontColor, option)
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							handleOptionChange(ArtcileStateKey.BackgroundColor, option)
						}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							handleOptionChange(ArtcileStateKey.ContentWidth, option)
						}
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
