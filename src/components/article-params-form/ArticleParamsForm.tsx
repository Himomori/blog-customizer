import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { Separator } from 'components/separator';
import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, defaultArticleState, ArticleStateType, OptionType } from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	defaultSettings: ArticleStateType;
	applySettings: (newState: ArticleStateType) => void;
  };

export const ArticleParamsForm = ({ defaultSettings, applySettings }: ArticleParamsFormProps) => {

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(defaultSettings);
	const rootRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onChange: setIsMenuOpen,
	})

	const toggleForm = () => {
		setIsMenuOpen((prevOpen) => !prevOpen)
	};

	const handleSubmitSidebar = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
    	applySettings(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
    	applySettings(defaultArticleState);
	};

	function handleOptionChange(optionKey: keyof ArticleStateType, value: OptionType) {
		setFormState(prevState => ({ ...prevState, [optionKey]: value }));
	}

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={toggleForm} state={isMenuOpen} />
			<aside className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form className={styles.form}
					onSubmit={handleSubmitSidebar}
					onReset={handleReset}
				>
					<Text as='h2' weight={800} size={31} align='center'>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(value) => handleOptionChange('fontFamilyOption', value)}
					/>
					<RadioGroup
						title='размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) => handleOptionChange('fontSizeOption', value)}
					/>
					<Select
						title='цвет шрифта'

						options={fontColors}
						selected={formState.fontColor}
						onChange={(value) => handleOptionChange('fontColor', value)}
					/>
					<Separator />
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(value) => handleOptionChange('backgroundColor', value)}
					/>
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(value) => handleOptionChange('contentWidth', value)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
