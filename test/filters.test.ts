import { customers } from "../src/api/customers";
import { createFilters, getPostalCodes } from "../src/filters";

describe("customers", () => {
    it("19 customers", () => {
        expect(customers.length).toEqual(19);
    });
});

describe("filters", () => {
    describe("createFilters()", () => {
        const distinctPostalCodes = [...new Set(getPostalCodes(customers))];

        it("returns correct number of filters", () => {
            const filterCount = Math.round(customers.length / 2);
            expect(
                createFilters(customers, filterCount).length
            ).toBeLessThanOrEqual(filterCount);

            expect(createFilters(customers, customers.length).length).toEqual(
                distinctPostalCodes.length
            );

            expect(
                createFilters(customers, customers.length + 10).length
            ).toEqual(distinctPostalCodes.length);
        });

        it("contains all customers", () => {
            const filters = createFilters(
                customers,
                Math.round(customers.length / 2)
            );

            const customersCount = filters.reduce((prev, curr) => {
                const filteredCustomers = customers.filter(
                    (customer) =>
                        customer.psc.replace(/ /g, "").indexOf(curr) === 0
                );
                return prev + filteredCustomers.length;
            }, 0);

            expect(customersCount).toEqual(customers.length);
        });

        it("doesn't overlap", () => {
            const filters = createFilters(
                customers,
                Math.round(customers.length / 2)
            );

            for (let i = 0; i < filters.length; i++) {
                for (let j = 0; i < filters.length; i++) {
                    if (i === j) continue;
                    if (filters[i].includes(filters[j])) fail();
                }
            }
        });
    });
});
