const defaultOrderOfEvaluations = ['min', 'max', 'negatives', 'decimals', 'cero']

const evaluateMinBound = ({ value, min }) => {
    if (value < min) {
        return 1;
    }
    return 0;
}

const evaluateMaxBound = ({ value, max }) => {
    if (value > max) {
        return 2;
    }
    return 0;
}

const evaluateNegativeValues = ({ value, disallowNegativeValues }) => {
    if (disallowNegativeValues && value < 0) {
        return -1;
    }
    return 0
}

const evaluateDecimalValues = ({ value, disallowDecimalValues }) => {
    if (disallowDecimalValues && value % 1 !== 0) {
        return 3
    }
    return 0
}

const evaluateCero = ({ value, disallowCero }) => {
    if (disallowCero && value === 0) {
        return 4
    }
    return 0
}

const evaluationFunctions = {
    min: evaluateMinBound,
    max: evaluateMaxBound,
    negatives: evaluateNegativeValues,
    decimals: evaluateDecimalValues,
    cero: evaluateCero
}

/*
* Check if value is in bounds
* if value is in bounds returns 0
* if disallowNegativeValues and value < 0 returns -1
* if value < min returns 1
* if value > max return 2
* if value is decimal and disallowDecimalValues is true returns 3
* if disallowCero and value  is 0 returns 4
*/
const evaluateBounds = ({ value, min, max, disallowNegativeValues = true, disallowDecimalValues = true, disallowCero = false, orderOfEvaluations = defaultOrderOfEvaluations }) => {
    let result = 0
    for (evaluation of orderOfEvaluations) {
        result = evaluationFunctions[evaluation]({ value, min, max, disallowNegativeValues, disallowDecimalValues, disallowCero })
        if (result !== 0) break
    }
    return result;
}

module.exports = { evaluateBounds }