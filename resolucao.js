// Substituição de todos os "a" por "æ", "c" por "¢", "o" por "ø", "b" por "ß"
// Os preços dos produtos devem ser sempre do tipo number, mas alguns deles estão no tipo string. 
// É necessário transformar as strings novamente em number
// Nos produtos onde a quantidade em estoque era zero, o atributo "quantity" sumiu. 
// Ele precisa existir em todos os produtos, mesmo naqueles em que o estoque é 0.

// Ler o arquivo JSON
const brokenDatabase = require("../Teste_Rocky/broken-database.json")

// Corrigir nomes
// Utilização do método map "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map"
function fixName() {
    brokenDatabase.map((obj) => {

        for (let name of brokenDatabase) {
            obj.name = obj.name.replace('æ', 'a')
            obj.name = obj.name.replace('¢', 'c')
            obj.name = obj.name.replace('ø', 'o')
            obj.name = obj.name.replace('ß', 'b')
        }
    })
}

// Corrigir preços
function fixPrice() {
    brokenDatabase.map((obj) => {

        obj.price = Number(obj.price)
    })
}

// Corrigir quantidades
function fixQuantity() {
    brokenDatabase.map((obj) => {

        obj.quantity = obj.quantity

        if (obj.quantity < 0) {
            console.error('Estoque abaixo de 0');

        } else if (obj.quantity > 0) {
            obj.quantity = obj.quantity

        } else {
            obj.quantity = 0
        }
    })
}

fixName()
fixPrice()
fixQuantity()

// Exportar um arquivo JSON com o banco corrigido
// Utilizado a base de código do site "https://qastack.com.br/programming/36856232/write-add-data-in-json-file-using-node-js"
function exportJsonFile() {
    let fixedDataBase = JSON.stringify(brokenDatabase);

    const fs = require('fs');
    fs.writeFile('saida.json', fixedDataBase, 'utf8',function(err, result) {
        if(err) console.log('error', err)
    });
}

exportJsonFile()

// Validação - Imprimir a lista JSON com o nomes dos produtos, ordenados primeiro por categoria 
// em ordem alfabética e ordenados por id em ordem crescente. Obs: é apenas uma saída, ordenada pelos dois fatores citados acima.

function listProducts() {
    let products = [];

    for (let category of brokenDatabase) {
        if (products.indexOf(category.category) == -1) {
            products.push(category)
        }
    }
    // Utilizado a base de código do site "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort"
    // ordenar por id
    products.sort(function (a, b) {
        return a.id - b.id;
    });

    // ordenar por categoria
    products.sort(function (a, b) {
        var categoryA = a.category.toUpperCase();
        var categoryB = b.category.toUpperCase();
        if (categoryA < categoryB) {
            return -1;
        }
        if (categoryA > categoryB) {
            return 1;
        }
        return 0;
    });
    console.log(products)
}

listProducts()
// Uma função que calcula qual é o valor total do estoque por categoria, ou seja, 
// a soma do valor de todos os produtos em estoque de cada categoria, considerando a quantidade de cada produto. 

function warehouseValue() {
    let total
    brokenDatabase.map((obj) => {
        total = 0
        for (let name of brokenDatabase) {
            total = total + (name.price * name.quantity)
        }
    })
    console.log("Total no estoque: R$", total)
}

warehouseValue()