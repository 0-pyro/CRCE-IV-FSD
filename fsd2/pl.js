const inventory = [
    { id: 1, name: "Laptop", price: 999.99, category: "Electronics" },
    { id: 2, name: "Coffee Maker", price: 49.50, category: "Appliances" },
    { id: 3, name: "Desk Chair", price: 150.00, category: "Furniture" },
    { id: 4, name: "Wireless Mouse", price: 25.00, category: "Electronics" },
    { id: 5, name: "Monitor", price: 200.00, category: "Electronics" }
];

function displayProducts(productList) {
    if (productList.length === 0) {
        console.log("No products match the criteria.");
        return;
    }

    productList.forEach(product => {
        console.log(
            `[ID: ${product.id}] ${product.name.padEnd(15)} | ` +
            `Price: $${product.price.toFixed(2).padStart(8)} | ` +
            `Category: ${product.category}`
        );
    });
}

function filterProductsByPrice(productList, minPrice) {
    return productList.filter(product => product.price >= minPrice);
}

const threshold = 100.00;

console.log("--- Full Product Catalog ---");
displayProducts(inventory);

console.log(`\n--- Products >= $${threshold} ---`);
const filtered = filterProductsByPrice(inventory, threshold);
displayProducts(filtered);