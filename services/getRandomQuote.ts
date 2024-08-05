import axios from 'axios';
import { API } from '../enums';
import { GetQuoteResponseDto } from '../types';

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

			if (!quoteData.quoteText) {
				console.warn('Received empty quoteText, retrying...');
			}

			attempts++;
		}

		if (!quoteData.quoteText) {
			console.error('Failed to fetch a valid quote after multiple attempts');
		}

	} catch (error) {
		console.error('Error while fetching quote', error);
	}

	return quoteData;
};
