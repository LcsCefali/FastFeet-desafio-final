const _20200206203201_deliveries_problems = require("./20200206203201-deliveries_problems")
// @ponicode
describe("_20200206203201_deliveries_problems.up", () => {
    test("0", () => {
        let callFunction = () => {
            _20200206203201_deliveries_problems.up({ createTable: () => 9876 }, { INTEGER: false, STRING: "\"#'{7855663]}ééàà", DATE: "01-01-2030" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            _20200206203201_deliveries_problems.up({ createTable: () => 12345 }, { INTEGER: false, STRING: "Hello, world!", DATE: "01-13-2020" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            _20200206203201_deliveries_problems.up({ createTable: () => "da7588892" }, { INTEGER: false, STRING: "\"#'{7855663]}ééàà", DATE: "01-01-2020" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            _20200206203201_deliveries_problems.up({ createTable: () => "da7588892" }, { INTEGER: true, STRING: "This is a String1", DATE: "01-01-2030" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            _20200206203201_deliveries_problems.up({ createTable: () => "bc23a9d531064583ace8f67dad60f6bb" }, { INTEGER: false, STRING: "p", DATE: "32-01-2020" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            _20200206203201_deliveries_problems.up(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_20200206203201_deliveries_problems.down", () => {
    test("0", () => {
        let callFunction = () => {
            _20200206203201_deliveries_problems.down({ dropTable: () => "Harbors" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            _20200206203201_deliveries_problems.down({ dropTable: () => "Expressway" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            _20200206203201_deliveries_problems.down({ dropTable: () => "Extensions" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            _20200206203201_deliveries_problems.down({ dropTable: () => "Port" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            _20200206203201_deliveries_problems.down({ dropTable: () => "Lights" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            _20200206203201_deliveries_problems.down(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
