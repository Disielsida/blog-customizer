import { useState, CSSProperties } from 'react';

import { Article } from 'src/components/article/Article';
import { ArticleParamsForm } from 'src/components/article-params-form/ArticleParamsForm';

import styles from 'src/styles/index.module.scss';

import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

export const App = () => {
	const [currentArticleState, setCurrentArticleState] =
		useState(defaultArticleState);

	const handleStateChange = (state: ArticleStateType) => {
		setCurrentArticleState(state);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': currentArticleState.fontFamilyOption.value,
					'--font-size': currentArticleState.fontSizeOption.value,
					'--font-color': currentArticleState.fontColor.value,
					'--container-width': currentArticleState.contentWidth.value,
					'--bg-color': currentArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm handleStateChange={handleStateChange} />
			<Article />
		</main>
	);
};
