import { Seller } from "../src/14_interface";
import { Employee, Manager } from "../src/16_interface-extend";
import { Person } from "../src/17_interface-func";
import { Domain } from "../src/18_intersection-type";

describe("type interface", () => {
    it("should declare", () => {
        const seller: Seller = {
            id: 1,
            name: "eko",
            address: "jalan raya",
            nib: "123",
            npwp: "123"
        }

        console.log(seller);
    })

    it("should interface function", () => {
        interface AddFunction {
            (value1: number, value2: number): number
        }

        const add: AddFunction = (value1: number, value2: number): number => {
            return value1 + value2
        }

        console.log(add(1, 2));
        expect(add(1, 2)).toBe(3)
    })

    it("should interface array", () => {
        interface StringArray {
            [index: number]: string
        }

        const names: StringArray = ["eko", "budi"]

        expect(names[0]).toBe("eko")
        expect(names[1]).toBe("budi")
    })

    it("should interface object", () => {
        interface StringDictionary {
            [key: string]: string
        }

        const dictionary: StringDictionary = {
            "name": "eko",
            "address": "jalan raya",
        }

        expect(dictionary["name"]).toBe("eko")
        expect(dictionary["address"]).toBe("jalan raya")
    })

    it("should interface extends", () => {
        const employee: Employee = {
            id: "1",
            name: "eko",
            division: "IT"
        }

        const manager: Manager = {
            id: "2",
            name: "kurniawan",
            division: "IT",
            numberOfEmployees: 10
        }
    })

    it("should interface func", () => {
        const person: Person = {
            name: "eko",
            sayHeloo: (name: string): string => {
                return `hello ${name}, my name`
            }
        }
    })

    it("should support intersection types", () => {
        const domain: Domain = {
            id: "1",
            name: "eko",
        }

        console.log(domain)
    })

    it("should support types assertion", () => {
        const person: any = {
            name: "eko",
            age: 30
        }

        const person2: Person = person as Person
    })
  });
  