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
                     // Funkci "fail()" jsme neznal, diky.
                    if (filters[i].includes(filters[j])) fail();
                }
            }
        });
    });
});

describe("review", () => {
    // Pridavam testy, ktere ukazuji problem algoritmu vytvareni filtru.
    // Filtr budto vznikne jeden prazdny, nebo dva.
    describe("createFilters()", () => {
      let filters = [];
      let expectedFilters = [];
  
      it("filterCount -1", () => {
        filters = createFilters(customers, -1);
        expectedFilters = [""];
        expect(filters).toEqual(expectedFilters);
      });
      it("filterCount 1", () => {
        filters = createFilters(customers, 1);
        expectedFilters = [""];
        expect(filters).toEqual(expectedFilters);
      });
      it("filterCount 2", () => {
        filters = createFilters(customers, 2);
        expectedFilters = ["3", "1"];
        expect(filters).toEqual(expectedFilters);
      });
      it("filterCount 3", () => {
        filters = createFilters(customers, 3);
        expectedFilters = ["1", "3"]; // Proc jen dva?
        expect(filters).toEqual(expectedFilters);
      });
      it("filterCount 4", () => {
        filters = createFilters(customers, 4);
        expectedFilters = ["1", "3"]; // Proc jen dva?
        expect(filters).toEqual(expectedFilters);
      });
      it("filterCount 5", () => {
        filters = createFilters(customers, 5);
        expectedFilters = ["1", "3"]; // Proc jen dva?
        expect(filters).toEqual(expectedFilters);
      });
    });
  });