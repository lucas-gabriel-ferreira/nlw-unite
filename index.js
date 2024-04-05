//array
let participantes = [
  {
    nome: "Lucas Gabriel Ferreira",
    email: "lgf.lucas.8@gmail.com",
    dataInscricao: new Date(2024, 1, 22, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 01, 07, 20),
    dataCheckIn: new Date(2024, 2, 10, 10, 00)
  },
  {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 15, 14, 30),
    dataCheckIn: new Date(2024, 2, 20, 09, 45)
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 3, 02, 10, 00),
    dataCheckIn: null
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 3, 10, 16, 40),
    dataCheckIn: new Date(2024, 3, 15, 13, 15)
  },
  {
    nome: "Ana Rodrigues",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 3, 20, 08, 15),
    dataCheckIn: null
  },
  {
    nome: "Carlos Sousa",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 4, 01, 11, 45),
    dataCheckIn: new Date(2024, 4, 05, 15, 40)
  },
  {
    nome: "Mariana Costa",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2024, 4, 10, 13, 20),
    dataCheckIn: new Date(2024, 4, 15, 12, 00)
  },
  {
    nome: "Rafaela Martins",
    email: "rafaela@gmail.com",
    dataInscricao: new Date(2024, 4, 20, 17, 10),
    dataCheckIn: new Date(2024, 4, 25, 19, 30)
  },
  {
    nome: "Eduardo Almeida",
    email: "eduardo@gmail.com",
    dataInscricao: new Date(2024, 5, 01, 09, 00),
    dataCheckIn: null
  }
]

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
        
      >
        Confirmar Check-in
      </button>  
    `
  }
  
  return `
  <tr>
      <td>
        <strong>
        ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetição - loop
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  // substituir informações do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData =  new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o Check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  participante.dataCheckIn = new Date ()

  atualizarLista(participantes)
}