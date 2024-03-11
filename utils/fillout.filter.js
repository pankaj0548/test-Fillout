const compareFilterClause = (questionValue, filterCondition, filterValue) => {
    if (typeof questionValue === 'string' && questionValue.includes('T')) {
        questionValue = new Date(questionValue);
    }
    if (typeof filterValue === 'string' && filterValue.includes('T')) {
        filterValue = new Date(filterValue);
    }
    switch (filterCondition) {
        case 'equals':
            return questionValue === filterValue;
        case 'does_not_equal':
            return questionValue !== filterValue;
        case 'greater_than':
            return questionValue > filterValue;
        case 'less_than':
            return questionValue < filterValue;
        default:
            return false;
    }

}

module.exports = {
    compareFilterClause
}