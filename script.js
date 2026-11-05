listarMarcas();

async function listarMarcas() {
    const status = document.getElementById("status");

    status.textContent = "Carregando...";

    try {
        const response = await fetch("https://brasilapi.com.br/api/fipe/marcas/v1/carros");
        if (!response.ok) {
            throw new Error("Erro ao buscar marcas");
        }

        const marcas = await response.json();
        renderMarcas(marcas);
        status.textContent = "";
    } catch (error) {
        status.textContent = error.message;
    }
}

function renderMarcas(marcas) {
    const selectMarca = document.getElementById("marca");
    selectMarca.innerHTML = '<option value="">Selecione uma marca</option>';

    marcas.forEach(m => {
        const option = document.createElement("option");
        option.value = m.valor;
        option.textContent = m.nome;
        selectMarca.appendChild(option);
    });
}

async function listarModelos() {
    const status = document.getElementById("status");
    const marca = document.getElementById("marca").value;

    if (!marca) return;

    status.textContent = "Carregando...";

    try {
        const response = await fetch(`https://brasilapi.com.br/api/fipe/veiculos/v1/carros/${marca}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar modelos");
        }

        const modelos = await response.json();
        renderModelos(modelos);
        status.textContent = "";
    } catch (error) {
        status.textContent = error.message;
    }
}

function renderModelos(modelos) {
    const selectModelo = document.getElementById("modelo");
    selectModelo.innerHTML = '<option value="">Selecione um modelo</option>';

    modelos.forEach(m => {
        const option = document.createElement("option");
        option.value = m.valor;
        option.textContent = m.modelo || m.nome;
        selectModelo.appendChild(option);
    });
}

async function listarAnos() {
    const status = document.getElementById("status");
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;

    if (!modelo) return;

    status.textContent = "Carregando...";

    try {
        const response = await fetch(`https://brasilapi.com.br/api/fipe/anos/v1/carros/${marca}/${modelo}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar anos");
        }

        const anos = await response.json();
        renderAnos(anos);
        status.textContent = "";
    } catch (error) {
        status.textContent = error.message;
    }
}

function renderAnos(anos) {
    const selectAno = document.getElementById("ano");
    selectAno.innerHTML = '<option value="">Selecione o ano</option>';

    anos.forEach(a => {
        const option = document.createElement("option");
        option.value = a.valor;
        option.textContent = a.nome;
        selectAno.appendChild(option);
    });
}

async function consultarPreco() {
    const status = document.getElementById("status");
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const ano = document.getElementById("ano").value;

    if (!marca || !modelo || !ano) {
        status.textContent = "Selecione a marca, o modelo e o ano!";
        return;
    }

    status.textContent = "Carregando...";

    try {
        const response = await fetch(`https://brasilapi.com.br/api/fipe/detalhes/v1/carros/${marca}/${modelo}/${ano}`);
        if (!response.ok) {
            throw new Error("Erro ao consultar preço");
        }

        const preco = await response.json();
        renderPreco(preco);
        status.textContent = "";
    } catch (error) {
        status.textContent = error.message;
    }
}

function renderPreco(dados) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `
        <h2>${dados.marca} ${dados.modelo}</h2>
        <p>Preço FIPE: <strong>${dados.valor}</strong></p>
        <p>Ano Modelo: ${dados.anoModelo} (${dados.combustivel})</p>
        <p>Código FIPE: ${dados.codigoFipe}</p>
        <p>Mês de Referência: ${dados.mesReferencia}</p>
    `;
}
