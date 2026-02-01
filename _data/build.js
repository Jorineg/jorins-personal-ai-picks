module.exports = () => {
    const now = new Date();
    return {
        formattedDate: new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(now)
    };
}; 