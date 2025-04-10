const messages = [
    'Fullført!',
    'Gratiz!',
    'GZ',
    'Nice 🤩',
    'Smil 😁', 
    'Fantastisk!',
    'Utrolig!',
    'Bra jobbet!',
    'Flott arbeid!',
    'Imponerende!',
    'Utmerket!',
];

export const getRandomCompleteMessage = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
};
