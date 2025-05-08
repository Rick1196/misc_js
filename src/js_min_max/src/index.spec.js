const { evaluateBounds } = require(".")

describe("Min and Max bounds", () => {
    describe("evaluate bounds no decimals allowed, no negative values allowed", () => {
        it("out of min bound", () => {
            const result = evaluateBounds({ value: 5, min: 10 })
            expect(result).toBe(1)
        })

        it("out of min bound and negative", () => {
            const result = evaluateBounds({ value: -5, min: 5 })
            expect(result).toBe(1)
        })

        it("out of min bound and decimal", () => {
            const result = evaluateBounds({ value: 5.67, min: 10 });
            expect(result).toBe(1);
        })

        it("negatives not allowed but min bound defined, should return 1", () => {
            const result = evaluateBounds({ value: -5, min: 3, disallowNegativeValues: true })
            expect(result).toBe(1)
        })

        it("out of max bound", () => {
            const result = evaluateBounds({ value: 100, max: 57 })
            expect(result).toBe(2);
        })

        it("out of max bounds and decimal", () => {
            const result = evaluateBounds({ value: 123.45, max: 120 });
            expect(result).toBe(2);
        })

        it("in bounds", () => {
            const result = evaluateBounds({ value: 55, max: 120, min: 10 });
            expect(result).toBe(0)
        })

        it("in bounds but decimal", () => {
            const result = evaluateBounds({ value: 56.78, min: 5, max: 350 });
            expect(result).toBe(3)
        })

        it("no bounds but decimal", () => {
            const result = evaluateBounds({ value: 54.67 });
            expect(result).toBe(3);
        })

        it("no bounds but 0 and cero is not allowed", () => {
            const result = evaluateBounds({ value: 0, disallowCero: true });
            expect(result).toBe(4)
        })

        it("no bounds and negative value", () => {
            const result = evaluateBounds({ value: -4 });
            expect(result).toBe(-1)
        })
    })
    describe("evaluate bounds decimals allowed", () => {
        it("out of min bound by decimals", () => {
            const result = evaluateBounds({ value: 5.67, min: 6 });
            expect(result).toBe(1);
        })
        it("out of max bound by decimals", () => {
            const result = evaluateBounds({ value: 250.34, max: 250 })
            expect(result).toBe(2)
        })
    })

    // TODO: change the order of evluation, first no cero allowed, first no decimal allowed, first no negative allowed, then min max bounds
    describe("override order of evaluation", () => {
        it("first check decimal value then min max, then negatives and cero", () => {
            const result = evaluateBounds({ value: 5.4, min: 6, max: 10, orderOfEvaluations: ['decimals', 'min', 'max', 'negatives', 'cero'] })
            expect(result).toBe(3)
        })

        it("first check for negative then decimals, then min max", () => {
            const result = evaluateBounds({ value: -5.4, min: -4, max: 10, disallowNegativeValues: true, disallowDecimalValues: true, orderOfEvaluations: ['negatives', 'decimals', 'min', 'max', 'cero'] })
            expect(result).toBe(-1)
        })
    })
})