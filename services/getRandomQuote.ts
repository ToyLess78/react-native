import axios from 'axios';
import { API } from '../enums';
import { GetQuoteResponseDto } from '../types';
import { ALERT_TYPE } from 'react-native-alert-notification';
import { showAlert } from '../helpers';

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
			showAlert(ALERT_TYPE.WARNING, 'Failed to Fetch', 'Failed to fetch a valid quote after multiple attempts');
		}

	} catch (error) {
		showAlert(ALERT_TYPE.DANGER, 'Error', 'Error while fetching quote');
	}

	return quoteData;
};
