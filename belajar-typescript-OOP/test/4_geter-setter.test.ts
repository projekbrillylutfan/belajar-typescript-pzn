describe("Getter and Setter", () => {
    it("should create getter and setter", () => {
        class Category {
            _name?: string

            get name(): string {
                if (this._name) {
                    return this._name
                } else {
                    return "no name"
                }
            }

            set name(value: string) {
                if (value.length > 0) {
                    this._name = value
                }
            }
        }

        const category = new Category();

        console.log(category.name)

        category.name = "Laptop"
        console.log(category.name)

        category.name = ""
        console.log(category.name)
    })
})