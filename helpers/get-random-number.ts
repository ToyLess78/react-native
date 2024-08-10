type Range = {
    min?: number,
    max?: number,
};


const getRandomNumber = ({min, max}: Range): number => {
    if (min && max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return Math.floor(Math.random() * 100);
}

export { getRandomNumber };
