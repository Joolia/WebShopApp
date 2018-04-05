function Product(id, name, price) {
    var self = this;
    self.id = ko.observable(id);
    self.name = ko.observable(name);
    self.price = ko.observable(price);
    self.discount = ko.observable(0); // in %
    self.finalPrice = ko.computed(function() {
        var initialPrice = self.price();
        return initialPrice - initialPrice * self.discount() / 100;
    });
}

function ProductsListViewModel() {
    var self = this;

    var productPriceId = "#productPrice";
    var discountId = "#discount";
    var totalPriceId = "#totalPrice";

    // catalog
    self.products = [
        new Product(1, "product 1", 1200),
        new Product(2, "product 2", 290),
        new Product(3, "product 3", 260),
        new Product(4, "product 4", 22),
        new Product(5, "product 5", 205),
        new Product(6, "product 6", 240)
    ];
    self.selectedProduct = ko.observable(self.products[0]);

    self.productsInOrder = ko.observableArray();

    self.addProduct = function(product) {
        var newIndex = self.productsInOrder().length + 1;
        self.productsInOrder.push(new Product(newIndex, product.name(), product.finalPrice()));
    };

    self.refreshIds = function() {
        for (var i = 0; i < self.productsInOrder().length; i++) {
            self.productsInOrder()[i].id(i + 1);
        }
    }

    self.removeProduct = function(product) {
        self.productsInOrder.remove(product);
        self.refreshIds();
    };

    self.selectProduct = function(product) {
        self.selectedProduct(product);
    };

    self.isProductSelected = function(product) {
        return self.selectedProduct() === product;
    };
}
ko.applyBindings(new ProductsListViewModel());