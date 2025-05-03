import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="modal"
export default class extends Controller {
  static targets = [ "closeModal", "deleteModal", "passwordField" ]

  connect() {
    console.log("ModalController connected", this.element)
    // Listener para fechar com ESC
    this.escapeListener = (event) => {
      if (event.key === "Escape") {
        this.close(event) // Passa o evento para evitar comportamento padrão se necessário
      }
    }
    document.addEventListener("keydown", this.escapeListener)
    
    // Remover listener antigo se existir (precaução)
    if (this.boundHandleKeyup) {
      document.removeEventListener("keyup", this.boundHandleKeyup)
    }
  }

  disconnect() {
    console.log("ModalController disconnected")
    document.removeEventListener("keydown", this.escapeListener)
  }

  // Ação específica para abrir o modal de FECHAMENTO
  openCloseModal() {
    if (this.hasCloseModalTarget) {
      this.closeModalTarget.classList.remove('hidden')
      this.closeModalTarget.classList.add('flex')
    }
  }

  // Ação específica para abrir o modal de EXCLUSÃO
  openDeleteModal() {
    if (this.hasDeleteModalTarget) {
      this.deleteModalTarget.classList.remove('hidden')
      this.deleteModalTarget.classList.add('flex')
    }
  }

  // Fecha QUALQUER modal que esteja visível (chamado pelos botões/ESC)
  close(event) {
    if (event) event.preventDefault() // Previne comportamento padrão se chamado por evento
    console.log("ModalController close() action triggered")

    let closedSomething = false
    if (this.hasCloseModalTarget && !this.closeModalTarget.classList.contains('hidden')) {
      this.closeModalTarget.classList.add('hidden')
      this.closeModalTarget.classList.remove('flex')
      closedSomething = true
    }
    if (this.hasDeleteModalTarget && !this.deleteModalTarget.classList.contains('hidden')) {
      this.deleteModalTarget.classList.add('hidden')
      this.deleteModalTarget.classList.remove('flex')
      closedSomething = true
    }

    if (closedSomething && this.hasPasswordFieldTarget) {
        this.clearPasswordField() // Limpa senha se fechou um modal relevante
    }
    
    // Removida a lógica antiga que dependia de this.modalTarget e animações
  }
  
  // Fecha ao clicar no backdrop (agora apenas chama close)
  closeBackdrop(event) {
     // A lógica de preventBackgroundClose no div interno impede que cliques
     // no conteúdo do modal cheguem aqui. Clicar no backdrop (o div externo)
     // vai disparar esta ação.
     console.log("ModalController closeBackdrop() triggered")
     this.close() 
  }

  // Previne que o clique no card do modal feche o modal
  preventBackgroundClose(event) {
    event.stopPropagation()
  }

  // Limpa o campo de senha (mantido, caso seja usado pelo modal de perfil ainda)
  clearPasswordField() {
    console.log("ModalController clearPasswordField() called")
    if (this.hasPasswordFieldTarget) {
      this.passwordFieldTarget.value = ''
      console.log("Password field cleared")
    } else {
      // console.log("Password field target not found for clearing") // Comentado para reduzir ruído
    }
  }

  // Função submitForm mantida caso seja usada pelo modal de perfil
  submitForm() {
     console.log("ModalController submitForm() action triggered - Ensure this is intended for the correct form")
     // ... (código submitForm existente) ...
     const mainForm = document.getElementById("edit_user_form")
     if (!mainForm) {
       console.error("Formulário principal #edit_user_form não encontrado!")
       return
     }
 
     const currentPassword = this.passwordFieldTarget.value
     console.log("Current password entered:", currentPassword ? '******' : 'EMPTY')
     if (currentPassword === "") {
       alert("Por favor, digite sua senha atual.")
       this.passwordFieldTarget.focus()
       console.log("Password validation failed: empty")
       return
     }
 
     // Remove campo oculto anterior, se existir
     const existingHiddenInput = mainForm.querySelector("input[name='user[current_password]'][type='hidden']")
     if (existingHiddenInput) {
       console.log("Removing existing hidden current_password field")
       existingHiddenInput.remove()
     }
 
     // Cria um campo hidden para a senha atual dentro do form principal
     console.log("Creating hidden current_password field")
     const hiddenInput = document.createElement("input")
     hiddenInput.setAttribute("type", "hidden")
     hiddenInput.setAttribute("name", "user[current_password]")
     hiddenInput.setAttribute("value", currentPassword)
     mainForm.appendChild(hiddenInput)
 
     // Fecha o modal ANTES de submeter
     // Precisamos garantir que está fechando o modal correto se esta função
     // for usada por diferentes modais. Assumindo que só o modal de senha usa.
     if (this.modalTarget && !this.modalTarget.classList.contains('hidden')) { 
       this.close() 
     }
 
     // Pequeno delay para garantir que o modal fechou visualmente antes do submit (opcional)
     setTimeout(() => {
       console.log("Requesting main form submission...")
       mainForm.requestSubmit() // Use requestSubmit() para acionar validações HTML5 e eventos
     }, 50); // Delay mínimo
   }
}
