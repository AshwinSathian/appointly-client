const colors = [
    'darkblue', 'darkmagenta', 'darkgreen', 'darkorchid', 'darkviolet'
];

export const dashboardActions = [
    {
        name: 'My Slots',
        description: 'Set and/or update the slots during the day when you\'ll be active and available for appointments',
        background: generateRandomColour(),
        route: '/slots'
    },
    {
        name: 'My Appointments',
        description: 'View all your upcoming appointments',
        background: generateRandomColour(),
        route: '/appointments'
    }
];

function generateRandomColour() {
    return colors[Math.floor(Math.random() * 5)];
}
