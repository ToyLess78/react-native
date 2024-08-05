import axios from 'axios';
import { API } from '../enums';
import { GetQuoteResponseDto } from '../types';
import { Alert } from 'react-native';

export const getRandomQuote = async (): Promise<GetQuoteResponseDto> => {
	let quoteData: GetQuoteResponseDto = {
		quoteText: '',
		quoteAuthor: '',
		quoteLink: '',
	};

	try {
		let attempts = 0;
		const maxAttempts = 5;

		while (!quoteData.quoteText && attempts < maxAttempts) {
			const response = await axios.get<GetQuoteResponseDto>(API.QUOTE_URL, {
				params: { lang: 'en', format: 'json', method: 'getQuote' },
			});

			quoteData = response.data;

			attempts++;
		}

		if (!quoteData.quoteText) {
			Alert.alert('Failed to fetch a valid quote after multiple attempts');
		}

	} catch (error) {
		Alert.alert('Error while fetching quote');
	}

	return quoteData;
};
