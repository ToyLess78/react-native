import axios from 'axios';
import { API } from '../enums';
import { getRandomNumber, showAlert } from '../helpers';
import type { GetImageResponseDto } from '../types';
import { ALERT_TYPE } from 'react-native-alert-notification';

const ImageIdRange = {
    min: 1,
    max: 1000,
};

export const getRandomImage = async (): Promise<GetImageResponseDto> => {
    const maxRetries = 5;
    let attempts = 0;
    let lastError: Error | null = null;

    while (attempts < maxRetries) {
        try {
            const randomImageId = getRandomNumber(ImageIdRange);

            const response = await axios.get<GetImageResponseDto>(
                `${API.IMAGE_URL}/id/${randomImageId}/info`
            );

            if (response.data.download_url) {
                return response.data;
            }
        } catch (error) {
            lastError = error instanceof Error ? error : new Error('Unknown error');
        }

        attempts += 1;
    }

    showAlert(ALERT_TYPE.DANGER, 'Error', 'Error while fetching random image');

    return {
        id: '0',
        download_url: '',
    };
};
