
//Defining the Generic Interface
interface InventoryItem<T> {
    id: number;
    quantity: number;
    details: T;
}

//specific item types using the Interface
const bookItem: InventoryItem<{ title: string; author: string }> = {
    id: 1,
    quantity: 5,
    details: { title: "TypeScript Guide", author: "John Doe" }
}

const electronicItem: InventoryItem<{ brand: string; model: string }> = {

    id: 2,
    quantity: 3,
    details: { brand: "TechCorp", model: "X200" }
}

//adds items to an inventory with spread operator 

function addItem<T>(inventory: InventoryItem<T>[], newItem: InventoryItem<T>): InventoryItem<T>[] {
    return [...inventory, newItem];
}

//Working with specific inventories
const bookInventory = [bookItem];
const newBook: InventoryItem<{ title: string; author: string }> = {
    id: 4,
    quantity: 2,
    details: { title: "Advanced TypeScript", author: "Jane Smith" }
}

const updatedBookInventory = addItem(bookInventory, newBook);

const electronicInventory = [electronicItem];

const newElectronic: InventoryItem<{ brand: string; model: string }> = {
    id: 5,
    quantity: 1,
    details: { brand: "GadgetCorp", model: "Z500" }
}
const updatedElectronicInventory = addItem(electronicInventory, newElectronic);

//find Item by ID with search function
function findItemById<T>(inventory: InventoryItem<T>[], id: number): InventoryItem<T> | undefined {
    return inventory.find(item => item.id === id);
}

//Type Aliases for cleaner code
type Book = { title: string; author: string };
type Electronic = { brand: string; model: string };

type BookItem = InventoryItem<Book>;

type ElectronicItem = InventoryItem<Electronic>;

const bookStore: BookItem[] = [
    { id: 100, quantity: 8, details: { title: "Clean Code", author: "Robert Martin" } }
];

//Type Guard Function if-in
function getItemDetails(item: InventoryItem<any>): void {
    if ("title" in item.details) {
        console.log(`Book: ${item.details.title} by ${item.details.author}`);
    } 
    else if ("brand" in item.details) {
        console.log(`Electronic: ${item.details.brand} ${item.details.model}`);
    } 
    else {
        console.log("Unknown item type");
    }
}

//Testing and Printing Outputs
const testBook: InventoryItem<any> = {
    id: 300,
    quantity: 6,
    details: { title: "TypeScript Handbook", author: "Microsoft Team" }
}

const testElectronic: InventoryItem<any> = {
    id: 400,
    quantity: 2,
    details: { brand: "Dell", model: "XPS 14" }
}

const unknownItem: InventoryItem<any> = {
  id: 500,
  quantity: 1,
  details: { color: "Red", size: "Large" }
};

console.log("--- Testing Details ---");
getItemDetails(testBook);
getItemDetails(testElectronic);

console.log("--- unknown ---");
getItemDetails(unknownItem);

console.log("\n--- Searching Items ---");
//check if item exists before printing details

const foundBook = findItemById(updatedBookInventory, 4);
if (foundBook) {
    getItemDetails(foundBook);
} else {
    console.log("Book not found.");
}


const foundElectronic = findItemById(updatedElectronicInventory, 5);
if (foundElectronic) {
    getItemDetails(foundElectronic);
} else {
    console.log("Electronic item not found.");
}

//that's it