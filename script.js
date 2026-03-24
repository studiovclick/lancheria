const telefone = "5551989727254"

const extras = [
{nome:"Queijo",preco:9},
{nome:"Bacon",preco:12},
{nome:"Cheddar",preco:10},
{nome:"Onions",preco:9},
{nome:"Maionese",preco:5},
{nome:"Batata Frita",preco:15}
]

const data = {

hamburguer_especial:[
{id:11,nome:"BURGUER GRATINADO",preco:39.99,img:"imagens/hburguer2.png"},
{id:12,nome:"BURGUER MISTERIOSO",preco:39.99,img:"imagens/misterioso.jpg"},
{id:13,nome:"BURGUER AGRIDOCE",preco:34.99,img:"imagens/hburguer3.png"},
{id:14,nome:"BURGUER CAMARÃO",preco:49.99,img:"imagens/camarao.png"}
],

hamburguer_tradicional:[
{id:15,nome:"BURGUER CARNE",preco:21.99,img:"imagens/burguercarne.jpg"},
{id:16,nome:"BURGUER DUPLO",preco:27.99,img:"imagens/hburguer5.png"},
{id:17,nome:"BURGUER ESPECIAL",preco:28.99,img:"imagens/especial.png"},
{id:18,nome:"BURGUER DORITOS",preco:29.99,img:"imagens/burguerdoritos.png"},
{id:19,nome:"BURGUER STROGONOFF",preco:28.99,img:"imagens/strogonoff.png"},
{id:20,nome:"BURGUER BACON",preco:29.99,img:"imagens/hbacon.png"},
{id:21,nome:"BURGUER KIDS",preco:19.99,img:"imagens/kids.png"}
],

xis:[
{id:1,nome:"XIS CARNE",preco:21.99,img:"imagens/xiscarne.png"},
{id:2,nome:"XIS CARNE ACEBOLADO",preco:24.99,img:"imagens/acebolado.png"},
{id:3,nome:"XIS CARNE DUPLO",preco:28.99,img:"imagens/xistudo.jpg"},
{id:4,nome:"XIS FRANGO",preco:22.99,img:"imagens/xisfrango.png"},
{id:6,nome:"XIS CALABRESA",preco:25.99,img:"imagens/xiscalabresa.png"},
{id:7,nome:"XIS CALABRESA/CARNE",preco:29.99,img:"imagens/calabresacomcarne.png"},
{id:8,nome:"XIS CORAÇÃO",preco:29.99,img:"imagens/xiscoracao.png"},
{id:9,nome:"XIS STROGONOFF",preco:31.99,img:"imagens/xisstrogonoff.png"},
{id:10,nome:"XIS TUDO",preco:34.99,img:"imagens/xistudo.jpg"}
],

porcoes:[
{id:22,nome:"Fritas Média",preco:23.99,img:"imagens/fritas1.png"},
{id:23,nome:"Onions P",preco:14.99,img:"imagens/onions.png"},
{id:24,nome:"Barca Burguer",preco:49.99,img:"imagens/barcaburguer.png"},
{id:25,nome:"Fritas Cheddar/Bacon",preco:37.99,img:"imagens/fritascombacon.png"}
],

bebidas:[
{id:31,nome:"Coca-Cola 2L",preco:15.99,img:"imagens/cocacola.png"},
{id:32,nome:"Guaraná Fruki 2L",preco:11.99,img:"imagens/guarana.png"}
]

}

let carrinho = []
let taxaEntrega = 0

function init() {

  const menu = document.getElementById("menu")

  for (let cat in data) {

    menu.innerHTML += `
      <div class="categoria">
        ${cat.replace("_", " ").toUpperCase()}
      </div>
    `

    data[cat].forEach(item => {

      let temExtra = cat.includes("hamburguer") || cat === "xis"
      let extrasHTML = ""

      if (temExtra) {
        extrasHTML = `<div class="extras-box">
          <p class="extras-titulo">Opcionais:</p>
          <ul class="extras-lista">`

        extras.forEach((ex, i) => {
          extrasHTML += `
            <li class="extra-item">
              <label>
                <input 
                  type="checkbox"
                  onchange="calcItem(${item.id})"
                  id="extra-${item.id}-${i}"
                >
                ${ex.nome} (+R$${ex.preco.toFixed(2)})
              </label>
            </li>
          `
        })

        extrasHTML += `</ul></div>`
      }

      menu.innerHTML += `
        <div class="item">

          <div 
            class="img" 
            style="background-image:url('${item.img}');">
          </div>

          <div class="info">

            <b>${item.nome}</b>

            <div class="preco" id="preco-${item.id}">
              R$ ${item.preco.toFixed(2)}
            </div>

            ${extrasHTML}

            <input 
              class="obs"
              id="obs-${item.id}"
              placeholder="Observação"
            >

            <button 
              class="btn-add"
              onclick="add(${item.id})"
            >
              Adicionar
            </button>

          </div>
        </div>
      `
    })
  }
}

function add(itemId) {

  const item = Object.values(data).flat().find(i => i.id === itemId)
  const obs = document.getElementById(`obs-${itemId}`).value

  narrar(item.nome + " adicionado ao carrinho")

  let preco = item.preco
  const extrasSelecionados = []

  extras.forEach((ex, i) => {
    const checkbox = document.getElementById(`extra-${itemId}-${i}`)
    if (checkbox && checkbox.checked) {
      preco += ex.preco
      extrasSelecionados.push(ex.nome)
    }
  })

  carrinho.push({
    id: itemId,
    nome: item.nome,
    preco,
    obs,
    extras: extrasSelecionados
  })

  atualizarCarrinho()
  showToast(`${item.nome} adicionado! ✓`)
}

function calcItem(itemId) {

  const item = Object.values(data).flat().find(i => i.id === itemId)
  let preco = item.preco

  extras.forEach((ex, i) => {
    const checkbox = document.getElementById(`extra-${itemId}-${i}`)
    if (checkbox && checkbox.checked) {
      preco += ex.preco
    }
  })

  document.getElementById(`preco-${itemId}`).textContent = `R$ ${preco.toFixed(2)}`
}

function atualizarCarrinho() {

  let total = 0
  let html = ""

  if (carrinho.length === 0) {
    html = '<div class="cart-empty" style="text-align:center; padding:40px; color:#999;">Carrinho vazio</div>'
  } else {
    carrinho.forEach((item, i) => {
      total += item.preco
      
      html += `
        <div class="cart-item">
          <b>${item.nome}</b><br>
          <span style="display:inline-block; margin: 5px 0;"><strong>✨ Extras:</strong> ${item.extras.length ? item.extras.join(", ") : "Nenhum"}</span><br>
          <span style="display:inline-block; margin: 5px 0;"><strong>📝 Obs:</strong> ${item.obs || "Nenhuma"}</span><br>
          <b>💰 R$ ${item.preco.toFixed(2)}</b>
          <button onclick="removerCarrinho(${i})" class="btn-remover">
            🗑️ Remover
          </button>
        </div>
      `
    })
  }

  document.getElementById("cart").innerHTML = html
  document.getElementById("total-bar").textContent = `R$ ${total.toFixed(2)}`
  document.getElementById("total").textContent = `R$ ${(total + taxaEntrega).toFixed(2)}`
}

function removerCarrinho(index) {
  const itemRemovido = carrinho[index]
  carrinho.splice(index, 1)
  atualizarCarrinho()
  showToast(`${itemRemovido.nome} removido!`)
}

function toggleCarrinho() {
  narrar("Abrindo carrinho")
  const modal = document.getElementById("modal")
  modal.style.display = modal.style.display === "none" ? "block" : "none"
}

function calcEntrega() {

  const bairro = document.getElementById("bairro")
  const tax = bairro.options[bairro.selectedIndex].dataset.tax

  taxaEntrega = tax ? parseFloat(tax) : 0

  document.getElementById("taxa").textContent = `R$ ${taxaEntrega.toFixed(2)}`

  let total = carrinho.reduce((sum, item) => sum + item.preco, 0)

  document.getElementById("total").textContent = `R$ ${(total + taxaEntrega).toFixed(2)}`
}

function enviar() {

  const nome = document.getElementById("cli-nome").value
  const tel = document.getElementById("cli-tel").value
  const rua = document.getElementById("cli-rua").value
  const numero = document.getElementById("cli-numero").value
  const bairroSelect = document.getElementById("bairro")
  const bairro = bairroSelect.options[bairroSelect.selectedIndex].text

  if (!nome || !tel || !rua || !numero || !bairroSelect.value) {
    showToast("Preencha todos os dados!")
    return
  }

  if (carrinho.length === 0) {
    showToast("Carrinho vazio!")
    return
  }

  let mensagem = `*🍔 PEDIDO LANCheria DA PRI 🍔*\n\n`
  mensagem += `*👤 Cliente:* ${nome}\n`
  mensagem += `*📱 Telefone:* ${tel}\n`
  mensagem += `*📍 Endereço:* ${rua}, ${numero} - ${bairro}\n\n`
  mensagem += `*📋 ITENS DO PEDIDO:*\n`
  mensagem += `━━━━━━━━━━━━━━━━━━━━\n\n`

  let total = 0

  carrinho.forEach(item => {
    total += item.preco
    
    mensagem += `*🍔 ${item.nome}*\n`
    mensagem += `   *💰 Valor:* R$ ${item.preco.toFixed(2)}\n`

    if (item.extras.length) {
      mensagem += `   *✨ Extras:* _${item.extras.join(", ")}_\n`
    }

    if (item.obs) {
      mensagem += `   *📝 Obs:* _${item.obs}_\n`
    }
    
    mensagem += `\n`
  })

  mensagem += `━━━━━━━━━━━━━━━━━━━━\n`
  mensagem += `*🚚 Taxa de entrega:* R$ ${taxaEntrega.toFixed(2)}\n`
  mensagem += `*💰 TOTAL DO PEDIDO:* R$ ${(total + taxaEntrega).toFixed(2)}\n\n`
  mensagem += `*✅ Obrigado pelo pedido!* 🍔`

  const link = `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`
  window.open(link)
}

function showToast(msg) {

  const toast = document.getElementById("toast")
  toast.textContent = msg
  toast.style.display = "block"

  setTimeout(() => {
    toast.style.display = "none"
  }, 3000)
}

// TEMA + CARREGAMENTO
document.addEventListener("DOMContentLoaded", () => {

  init()

  const btnTheme = document.getElementById("toggle-theme")

  function atualizarIcone(){
    if(document.documentElement.classList.contains("dark")){
      btnTheme.textContent = "☀️"
    }else{
      btnTheme.textContent = "🌙"
    }
  }

  btnTheme.addEventListener("click", () => {

    document.documentElement.classList.toggle("dark")

    if(document.documentElement.classList.contains("dark")){
      localStorage.setItem("tema","dark")
    }else{
      localStorage.setItem("tema","light")
    }

    atualizarIcone()
  })

  if(localStorage.getItem("tema") === "dark"){
    document.documentElement.classList.add("dark")
  }

  atualizarIcone()
})

// NARRADOR
function narrar(texto){
  const fala = new SpeechSynthesisUtterance(texto)
  fala.lang = "pt-BR"
  fala.rate = 1
  fala.pitch = 1
  speechSynthesis.cancel()
  speechSynthesis.speak(fala)
}
