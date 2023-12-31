class CaixaDaLanchonete 
{
    constructor() 
    {
        this.cardapio = {
            cafe: { descricao: "Café", valor: 3.00 },
            chantily: { descricao: "Chantily (extra do Café)", valor: 1.50, principal: 'cafe' },
            suco: { descricao: "Suco Natural", valor: 6.20 },
            sanduiche: { descricao: "Sanduíche", valor: 6.50 },
            queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00, principal: 'sanduiche' },
            salgado: { descricao: "Salgado", valor: 7.25 },
            combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
            combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 }
        };
    }

    /**
     * Recebe um item do menu, aplica regras de validações, 
     * realiza o cálculo do valor total da compra 
     * e retorna o valor formatado.
     * 
     * @param {string} metodoDePagamento 
     * @param {Array} itens 
     * @returns String
     */
    calcularValorDaCompra(metodoDePagamento, itens) 
    {
        let valorTotal = 0;
        let itensPrincipais = new Set(['cafe', 'suco', 'sanduiche', 'salgado','combo1','combo2']);
        let extrasPedidos = new Set();
        let principaisSemExtras = new Set();

        // Verifica se o método de pagamento
        if (!['dinheiro', 'debito', 'credito'].includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }
        
        // Verifica se a lista de itens está vazia.
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        for (let i = 0; i < itens.length; i++) {
            let item = itens[i];
            let [codigo, quantidade] = item.split(',');
            let menu = this.cardapio[codigo];

            // Verifica se o código do item corresponde a um item no cardápio
            if (!menu) {
                return "Item inválido!";
            }

            // Verifica se a quantidade do item é menor ou igual a zero.
            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }

            // Verifica se um item extra está sendo pedido sem o item principal
            if (itensPrincipais.has(codigo)) { 
                principaisSemExtras.add(codigo);
            } else {
                extrasPedidos.add(codigo);

                if (!principaisSemExtras.has(menu.principal)) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }

            valorTotal += menu.valor * quantidade;
        }

        // Verifica método de pagamento para aplicar 5% desconto ou 3% acréscimo
        if (metodoDePagamento === 'dinheiro') {
            valorTotal *= 0.95;
        } else if (metodoDePagamento === 'credito') {
            valorTotal *= 1.03;
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };