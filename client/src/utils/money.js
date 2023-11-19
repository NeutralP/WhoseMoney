function formatVietnameseCurrency(amount) {
    const amountStr = amount.toString();
    const reversedAmountStr = amountStr.split('').reverse().join('');
    const formattedReversedAmountStr = reversedAmountStr.replace(/(\d{3})(?=\d)/g, '$1.');
    return formattedReversedAmountStr.split('').reverse().join('');
}

export default {
    formatVietnameseCurrency,
}
