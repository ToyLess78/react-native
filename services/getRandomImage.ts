import axios from 'axios';

import { API } from '../enums';
import { getRandomNumber } from '../helpers';
import type { GetImageResponseDto } from '../types';

const ImageIdRange = {
    min: 1,
    max: 1000,
};

export const getRandomImage = async (): Promise<GetImageResponseDto> => {
    const maxRetries = 5;
    let attempts = 0;

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
            console.error('Error while fetching random image', error);
        }

        attempts += 1;
    }

    return {
        id: '0',
        download_url: '',
    };
};