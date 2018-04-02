function Product(name, price) {
    var self = this;

    self.name = ko.observable(name);
    self.price = ko.observable(price);
    self.discount = ko.observable(0); // in %
    self.finalPrice = ko.computed(function() {
        var initialPrice = self.price();
        return initialPrice - initialPrice * self.discount() / 100;
    })
}

function ProductsListViewModel() {
    var self = this;

    var productPriceId = "#productPrice";
    var discountId = "#discount";
    var totalPriceId = "#totalPrice";

    // catalog
    self.products = [
    	new Product("product 1", 1200),
    	new Product("product 2", 290),
    	new Product("product 3", 260),
    	new Product("product 4", 22),
    	new Product("product 5", 205),
    	new Product("product 6", 240)
    ];
    self.selectedProduct = ko.observable(self.products[0]);
    self.productsOrdered = ko.observableArray();
    self.addProduct = function(product) {
        self.productsOrdered.push(product);
    };
    self.removeProduct = function(product) {
    	self.productsOrdered.remove(product);
    };

    self.selectProduct = function(product){
self.selectedProduct(product);
    };

    self.isProductSelected = function(product) {
    	return self.selectedProduct() === product;
    }
}
ko.applyBindings(new ProductsListViewModel());